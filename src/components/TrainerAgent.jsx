import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, X, Sparkles, MessageSquare, Dumbbell, AlertTriangle, ArrowRight, Key } from 'lucide-react';
import { EXERCISE_GUIDES } from './ExerciseVisualizer';
import { getWeekdayName } from '../utils/dateUtils';

export default function TrainerAgent({
  isOpen,
  onClose,
  todayDate,
  customSplits,
  modifyActiveWorkout,
  deferredExercises,
  chatHistory,
  setChatHistory,
  metricsHistory,
  startDate
}) {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const [apiKey, setApiKey] = useState(() => {
    const saved = localStorage.getItem('fit_geminiApiKey');
    return saved && saved.trim() !== '' ? saved : '';
  });
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [keyInput, setKeyInput] = useState(apiKey);

  // Get active day name
  const todayDayName = getWeekdayName(todayDate);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [chatHistory, isOpen, isTyping]);

  if (!isOpen) return null;

  // Suggestion Chips
  const suggestionChips = [
    { text: "I'm tired today", action: "tired" },
    { text: "My shoulders hurt", action: "pain_shoulder" },
    { text: "My lower back is stiff", action: "pain_back" },
    { text: "Catch up on skipped sets", action: "catchup" },
    { text: "How to do Bench Press?", action: "explain_bench" },
    { text: "Show my deferred exercises", action: "show_deferred" }
  ];

  // Send message handler
  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    if (apiKey) {
      try {
        const currentMetrics = metricsHistory[metricsHistory.length - 1] || { weight: 77.0, bf: 24.0 };
        const initialMetrics = metricsHistory[0] || { weight: 77.0, bf: 24.0 };
        
        const exerciseAlternativesMap = {};
        Object.keys(EXERCISE_GUIDES).forEach(name => {
          exerciseAlternativesMap[name] = EXERCISE_GUIDES[name].alternatives;
        });

        const systemInstructionText = `You are Coach Apex, an elite personal trainer and expert coach helping a 20-year-old vegetarian male (height: 5'7", weight: ${currentMetrics.weight}kg (started at ${initialMetrics.weight}kg), body fat: ${currentMetrics.bf}% (started at ${initialMetrics.bf}%), 3-month goal: 12-15% BF and visible abs).
Today's local date and time is ${new Date().toLocaleString()}.
The transformation started on ${startDate}. Today's day name is ${todayDayName}.

You must act as their personal trainer. Under the hood, this application has commands it can execute when you return a specific JSON-command block.
If the user indicates a condition that requires modifying their workout, you MUST output a json-command block in this format:
\`\`\`json-command
{
  "type": "command_type",
  "parameter": "value"
}
\`\`\`

Available commands and when to use them:
1. If the user is tired, exhausted, has low energy, or says "I'm tired", output:
\`\`\`json-command
{
  "type": "tired"
}
\`\`\`
This will reduce their weights by 20% and drop 1 set.

2. If the user reports pain, stiffness, or discomfort (e.g. shoulders hurt, back is stiff, knee pain, wrist strain), output:
\`\`\`json-command
{
  "type": "pain",
  "painArea": "shoulder" // or "back", "knee", "wrist", "general" depending on where the discomfort is
}
\`\`\`
This will swap problematic movements with safer ones.

3. If the user wants to catch up on skipped or deferred sets, output:
\`\`\`json-command
{
  "type": "catchup"
}
\`\`\`
This will add their deferred sets to today's active routine.

4. If the user requests to swap a specific exercise for an alternative (e.g. "Can I swap Bench Press for Push-Ups?"), output:
\`\`\`json-command
{
  "type": "swap_exercise",
  "exerciseToReplace": "Flat Barbell Bench Press",
  "replacementExerciseName": "Push-Ups"
}
\`\`\`
CRITICAL: You can ONLY swap an exercise for one of its predefined alternatives. Here is the map of valid alternatives:
${JSON.stringify(exerciseAlternativesMap, null, 2)}
Never suggest or perform a swap unless the replacement exercise is in the target exercise's alternatives list.

5. If the user wants to reset or restore their workout back to the original preset splits, output:
\`\`\`json-command
{
  "type": "reset"
}
\`\`\`

Current Workout Split (Today's Scheduled Focus: ${customSplits[todayDayName]?.focus || 'Rest'}):
${JSON.stringify(customSplits[todayDayName] || {}, null, 2)}

Deferred sets list (Sets they skipped previously that they can catch up on):
${JSON.stringify(deferredExercises, null, 2)}

Weekly Schedule Overview:
- Mon: Chest + Triceps
- Tue: Back + Biceps
- Wed: Legs + Core
- Thu: Shoulders + Posture Correction
- Fri: Full Body + Abs Focus
- Sat: Cardio & Active Recovery
- Sun: Rest Day (Stretching & Recovery)

Diet Target:
- 2050 kcal deficit target
- 145g Protein (from vegetarian sources: whey, egg whites, paneer, dal, tofu)
- 220g Carbs, 65g Fat

Instructions:
- Keep your conversational responses motivating, encouraging, and clear.
- Use bullet points for steps and bold text for key terms.
- Keep your answers relatively short and concise for mobile viewing.
- If you output a json-command block, explain to the user in your message what you have adjusted for them (e.g. "I've reduced the weight by 20% since you're feeling tired...").
- Do NOT output the json-command block inside normal text; separate it clearly.`;

        const recentHistory = chatHistory.slice(-10).map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }));

        recentHistory.push({
          role: 'user',
          parts: [{ text: text }]
        });

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              contents: recentHistory,
              systemInstruction: {
                parts: [
                  { text: systemInstructionText }
                ]
              }
            })
          }
        );

        if (!response.ok) {
          throw new Error(`Gemini API returned status ${response.status}`);
        }

        const data = await response.json();
        const rawResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        
        if (!rawResponse) {
          throw new Error("Empty response from Gemini API");
        }

        const commandMatch = rawResponse.match(/```json-command\s*([\s\S]*?)\s*```/);
        let cleanedText = rawResponse.replace(/```json-command\s*([\s\S]*?)\s*```/g, '').trim();

        if (commandMatch) {
          try {
            const command = JSON.parse(commandMatch[1].trim());
            console.log("Gemini Command Executing:", command);
            if (command.type === 'tired') {
              modifyActiveWorkout(todayDayName, 'tired');
            } else if (command.type === 'pain') {
              modifyActiveWorkout(todayDayName, 'pain', { painArea: command.painArea || 'general' });
            } else if (command.type === 'catchup') {
              modifyActiveWorkout(todayDayName, 'catchup');
            } else if (command.type === 'swap_exercise') {
              modifyActiveWorkout(todayDayName, 'swap_exercise', {
                exerciseToReplace: command.exerciseToReplace,
                replacementExerciseName: command.replacementExerciseName
              });
            } else if (command.type === 'reset') {
              modifyActiveWorkout(todayDayName, 'reset');
            }
          } catch (jsonErr) {
            console.error("Failed to parse JSON-command block from Gemini:", jsonErr);
          }
        }

        const coachMsg = {
          id: `coach_${Date.now()}`,
          sender: 'coach',
          text: cleanedText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChatHistory(prev => [...prev, coachMsg]);
      } catch (err) {
        console.error("Gemini API Error, falling back to offline trainer:", err);
        const fallbackText = processResponse(text.toLowerCase());
        const coachMsg = {
          id: `coach_${Date.now()}`,
          sender: 'coach',
          text: `[Offline Backup Mode - Gemini Connection Error]: ${fallbackText}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatHistory(prev => [...prev, coachMsg]);
      } finally {
        setIsTyping(false);
      }
    } else {
      setTimeout(() => {
        const responseText = processResponse(text.toLowerCase());
        
        const coachMsg = {
          id: `coach_${Date.now()}`,
          sender: 'coach',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChatHistory(prev => [...prev, coachMsg]);
        setIsTyping(false);
      }, 1200);
    }
  };

  // Natural Language Matching Engine
  const processResponse = (rawText) => {
    const text = rawText.toLowerCase();

    // 1. Fatigue Handler
    if (text.includes('tired') || text.includes('exhausted') || text.includes('no energy') || text.includes('fatigue') || text.includes('cant lift') || text.includes("can't lift")) {
      modifyActiveWorkout(todayDayName, 'tired');
      return `I hear you, champ. Fitness is a marathon, not a sprint. I've modified today's split to **Light Mode**:
- Reduced target weights by **20%** across the board.
- Dropped **1 set** from compound movements to lower overall volume.
- Logged the remaining sets as **deferred** so we can catch up when you're fresh.

Focus on slow, controlled reps and mind-muscle connection today. Get home, drink your whey protein, and rest!`;
    }

    // 2. Pain Handlers
    if (text.includes('pain') || text.includes('hurt') || text.includes('stiff') || text.includes('ache') || text.includes('injury')) {
      let painArea = 'general';
      let msg = '';

      if (text.includes('shoulder') || text.includes('neck') || text.includes('collar')) {
        painArea = 'shoulder';
        msg = `Shoulder safety is absolutely critical for your chest/push days. I've swapped out heavy overhead and incline presses in today's split for lighter lateral raises or stretching, and deferred the original sets.`;
      } else if (text.includes('back') || text.includes('spine') || text.includes('lower back') || text.includes('lats')) {
        painArea = 'back';
        msg = `Lower back safety is non-negotiable. I have swapped out heavy compound rows/hinges for core plank stabilizers and static stretching, and moved the original sets to your deferred log.`;
      } else if (text.includes('knee') || text.includes('quad') || text.includes('leg')) {
        painArea = 'knee';
        msg = `Knee joints take high shear forces on squats. I've swapped today's squats and leg extensions with isometric core planks to keep tension active without loading the knee joint. The original squat sets are deferred.`;
      } else if (text.includes('wrist') || text.includes('hand') || text.includes('forearm')) {
        painArea = 'wrist';
        msg = `Wrist strain often comes from straight bar curls or heavy grip loads. I've replaced grip-heavy movements in today's list with hanging knee raises to unload the wrists while targeting abs, deferring the arm curls.`;
      } else {
        msg = `I understand you have some discomfort. I have modified today's workout to replace heavy compound lifts with lower-impact core stability holds and general stretching, and deferred the main sets. Please stop immediately if you feel sharp pain!`;
      }

      modifyActiveWorkout(todayDayName, 'pain', { painArea });
      return `${msg}\n\nI've saved the skipped movements in your deferred log so we can recover them later. Take it easy!`;
    }

    // 3. Catch Up Handler
    if (text.includes('catch up') || text.includes('catchup') || text.includes('skipped') || text.includes('deferred') || text.includes('reschedule')) {
      if (text.includes('show') || text.includes('what are') || text.includes('list')) {
        if (deferredExercises.length === 0) {
          return "You have no deferred exercises in your log! You are fully on track with your weekly routine. Outstanding job!";
        }
        const listStr = deferredExercises.map((ex, i) => `${i+1}. ${ex.name} (${ex.sets} sets deferred on ${ex.dateDeferred})`).join('\n');
        return `Here are your deferred exercises currently waiting in the recovery log:\n\n${listStr}\n\nTo re-integrate them into today's active workout, type "catch up on skipped sets" or click the Catch Up chip.`;
      }

      if (deferredExercises.length === 0) {
        return "Excellent! You have 0 deferred exercises. No catch-ups are required. Continue with today's scheduled split!";
      }

      modifyActiveWorkout(todayDayName, 'catchup');
      return `Let's make up for that lost volume! I have successfully added your deferred exercises to the bottom of today's workout tracker. They are marked as 'Catchup' items. Double down on your hydration and let's get after it!`;
    }

    // 4. Exercise Explanations
    for (const [key, value] of Object.entries(EXERCISE_GUIDES)) {
      const alias = key.toLowerCase();
      if (text.includes(alias) || (alias.length > 5 && text.includes(alias.substring(0, 10)))) {
        const steps = value.instructions.map((step, i) => `${i + 1}. ${step}`).join('\n');
        return `Here is how to properly perform the **${key}**:\n\n**Targets:** ${value.muscles}\n\n**Form Guide:**\n${steps}\n\n**Breathing:** ${value.breathing}\n\n**Coach Tip:** ${value.postureTip}`;
      }
    }

    // Check partial matches for exercises
    if (text.includes('bench press') || text.includes('bench')) {
      return processResponse('flat barbell bench press');
    }
    if (text.includes('squat') || text.includes('squats')) {
      return processResponse('barbell back squats');
    }
    if (text.includes('deadlift') || text.includes('rdl')) {
      return processResponse('romanian deadlifts (rdl)');
    }
    if (text.includes('row') || text.includes('rows')) {
      return processResponse('barbell rows');
    }
    if (text.includes('pulldown') || text.includes('lats')) {
      return processResponse('lat pulldowns');
    }
    if (text.includes('curl') || text.includes('curls')) {
      return processResponse('incline dumbbell curls');
    }

    // 5. Diet Advice
    if (text.includes('diet') || text.includes('protein') || text.includes('vegetarian') || text.includes('eat') || text.includes('meal')) {
      return `To hit your target of **145g of protein** as a 20-year-old vegetarian without shooting up your fats, follow these key tips:
1. **Whey Protein**: Take 1.5 to 2.5 scoops daily (provides 36-60g pure protein).
2. **Egg Whites / Whole Eggs**: Eggs are pre-loaded in your plan. If eating eggs, 3 boiled eggs are great. 
3. **Paneer Bhurji**: Portion it to 100g Paneer (approx. 18-20g protein). Use low-fat paneer if possible.
4. **Legumes & Lentils**: Eat Yellow Dal and Rajma alongside complex carbs like brown rice.
5. **No Junk Food**: Keep carbs clean to reduce lipomastia (chest fat) and reveal your abs.

Let me know if you want me to explain any specific meal inside your Diet tab!`;
    }

    // 6. Generic Personal Trainer Chats
    if (text.includes('hello') || text.includes('hi') || text.includes('hey') || text.includes('yo')) {
      return `Hey! Coach Apex here. Ready to dominate today's workout? Today is a **${todayDayName}** schedule focusing on **${customSplits[todayDayName]?.focus || 'Rest'}**. Let me know how you're feeling or if you need to modify the exercises!`;
    }

    if (text.includes('abs') || text.includes('stomach') || text.includes('fat') || text.includes('handles')) {
      return `Getting visible abs requires dropping from your starting 24% body fat down to **12-15%**. 
- There is no spot reduction for belly fat or love handles. It comes down to staying in your **2050 kcal deficit**.
- Perform core stability work (Planks and Hanging Knee Raises) to build abdominal density.
- Do your Saturday Incline Treadmill Walk to boost fat oxidation.
Keep up the daily habit streak!`;
    }

    if (text.includes('posture') || text.includes('belt') || text.includes('round')) {
      return `To correct rounded shoulders and forward head posture:
1. Wear your posture belt for **4+ hours daily** (log this in your Habits tab!).
2. Strengthen your upper back and rear delts with **Cable Face Pulls** and **Incline Y-Raises**.
3. Stretch your chest muscles daily so they don't pull your shoulders forward.
Keep at it; posture correction makes your chest look flatter and raises your height presence!`;
    }

    return `I'm on it! As your personal trainer, I want to make sure you succeed. You can ask me to:
- Explain exercise forms (e.g. "How do I do Rows?")
- Lower intensity when you're exhausted ("I'm tired")
- Prevent joint pain ("My shoulders hurt")
- Re-schedule deferred items ("Catch up on skipped sets")
- Check your nutrition tips ("Help with diet")

What's our goal today?`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4 bg-dark-bg/80 backdrop-blur-sm animate-fadeIn">
      {/* Tap outside to close (desktop only) */}
      <div className="absolute inset-0 hidden sm:block" onClick={onClose} />

      {/* Chat Container */}
      <div className="w-full max-w-md h-[90vh] sm:h-[80vh] bg-dark-card border-t sm:border border-dark-border rounded-t-[32px] sm:rounded-[32px] overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative z-10">
        
        {/* Header */}
        <div className="p-5 border-b border-dark-border/60 bg-dark-bg/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-neon/15 border border-neon/30 text-neon rounded-2xl flex items-center justify-center">
                <Bot size={20} className="animate-pulse" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-neon rounded-full border-2 border-dark-card"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm text-dark-textLight leading-tight">Coach Apex</h3>
                <span className="px-1.5 py-0.5 bg-neon/10 text-neon text-[8px] font-mono font-bold rounded uppercase tracking-wider">AI Trainer</span>
              </div>
              <p className="text-[10px] text-dark-textMuted mt-0.5">Online • Ready to coach</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowKeyModal(true)}
              className={`p-2 rounded-xl border transition-all ${
                apiKey ? 'bg-neon/10 border-neon/30 text-neon' : 'bg-dark-accent border-dark-border text-dark-textMuted hover:text-dark-textLight'
              }`}
              title="Configure Gemini API Key"
            >
              <Key size={16} />
            </button>
            <button 
              onClick={onClose}
              className="p-2 bg-dark-accent rounded-xl text-dark-textMuted hover:text-dark-textLight transition-all"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Info Strip (Deferred Count) */}
        {deferredExercises.length > 0 && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-5 py-2.5 flex items-center justify-between text-xs text-amber-300">
            <div className="flex items-center gap-2">
              <AlertTriangle size={14} className="text-amber-400 shrink-0" />
              <span>You have <strong>{deferredExercises.length} sets</strong> deferred for recovery.</span>
            </div>
            <button 
              onClick={() => handleSendMessage("catch up on skipped sets")}
              className="text-[10px] font-extrabold uppercase text-neon tracking-wider flex items-center gap-0.5 hover:underline"
            >
              Catch Up <ArrowRight size={10} />
            </button>
          </div>
        )}

        {/* Message Scrolling Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
          {chatHistory.map((msg) => {
            const isCoach = msg.sender === 'coach';
            return (
              <div 
                key={msg.id} 
                className={`flex gap-3 max-w-[85%] ${isCoach ? 'self-start mr-auto' : 'self-end ml-auto flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                  isCoach 
                    ? 'bg-dark-accent border-dark-border text-dark-textMuted' 
                    : 'bg-neon/10 border-neon/20 text-neon'
                }`}>
                  {isCoach ? <Bot size={15} /> : <User size={15} />}
                </div>

                {/* Bubble */}
                <div className="space-y-1">
                  <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
                    isCoach 
                      ? 'bg-dark-bg/60 border border-dark-border text-dark-textLight rounded-tl-sm' 
                      : 'bg-neon text-dark-bg font-bold rounded-tr-sm'
                  }`}>
                    {/* Preserve line breaks for list displays */}
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                  <span className={`text-[8px] font-mono text-dark-textMuted block ${!isCoach && 'text-right'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 max-w-[85%] self-start mr-auto items-center">
              <div className="w-8 h-8 rounded-xl bg-dark-accent border border-dark-border text-dark-textMuted flex items-center justify-center">
                <Bot size={15} />
              </div>
              <div className="bg-dark-bg/60 border border-dark-border/60 p-4 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-neon rounded-full animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 bg-neon rounded-full animate-bounce delay-200"></span>
                <span className="w-1.5 h-1.5 bg-neon rounded-full animate-bounce delay-300"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips Bar */}
        <div className="px-4 py-2 border-t border-dark-border/40 bg-dark-bg/20 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth shrink-0">
          {suggestionChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip.text)}
              className="px-3.5 py-1.5 bg-dark-bg hover:bg-dark-accent border border-dark-border hover:border-neon/40 text-dark-textMuted hover:text-dark-textLight rounded-full text-[10px] font-bold whitespace-nowrap transition-all flex items-center gap-1 shrink-0"
            >
              <Sparkles size={10} className="text-neon" />
              {chip.text}
            </button>
          ))}
        </div>

        {/* Input Form Bar */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputText);
          }}
          className="p-4 border-t border-dark-border bg-dark-bg/60 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type 'I am tired' or ask about form..."
            className="flex-1 bg-dark-bg border border-dark-border focus:border-neon rounded-2xl px-4 py-3 text-xs text-dark-textLight placeholder:text-dark-textMuted focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-3 bg-neon text-dark-bg rounded-2xl disabled:opacity-55 hover:brightness-110 transition-all flex items-center justify-center shrink-0"
          >
            <Send size={14} />
          </button>
        </form>

        {showKeyModal && (
          <div className="absolute inset-0 z-50 bg-dark-bg/95 backdrop-blur-md flex flex-col justify-center p-6 animate-fadeIn">
            <div className="space-y-4 max-w-sm mx-auto w-full">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-neon/10 border border-neon/30 text-neon rounded-2xl flex items-center justify-center mx-auto">
                  <Key size={24} />
                </div>
                <h3 className="text-base font-extrabold text-dark-textLight">Gemini API Key</h3>
                <p className="text-xs text-dark-textMuted leading-relaxed">
                  Enter your Google Gemini API Key to enable real-time personalized AI coaching. Your key is stored locally in your browser.
                </p>
              </div>

              <div className="space-y-2">
                <input
                  type="password"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full bg-dark-card border border-dark-border focus:border-neon rounded-2xl px-4 py-3 text-xs text-dark-textLight placeholder:text-dark-textMuted focus:outline-none"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.setItem('fit_geminiApiKey', keyInput);
                      setApiKey(keyInput);
                      setShowKeyModal(false);
                      alert("Gemini API Key saved successfully!");
                    }}
                    className="flex-1 py-3 bg-neon text-dark-bg font-black rounded-xl text-xs hover:brightness-110 transition-all uppercase tracking-wider"
                  >
                    Save Key
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem('fit_geminiApiKey');
                      setApiKey('');
                      setKeyInput('');
                      setShowKeyModal(false);
                      alert("Gemini API Key cleared. Falling back to offline coach.");
                    }}
                    className="px-4 py-3 bg-dark-accent border border-dark-border text-dark-textMuted hover:text-dark-textLight rounded-xl text-xs font-bold transition-all uppercase tracking-wider"
                  >
                    Clear
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  className="w-full py-2.5 text-center text-xs text-dark-textMuted hover:text-dark-textLight transition-all"
                >
                  Cancel
                </button>
              </div>
              <div className="text-[10px] text-dark-textMuted text-center bg-dark-card/50 p-3 rounded-xl border border-dark-border/40">
                Don't have a key? Get one for free at the <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="text-neon underline hover:brightness-110">Google AI Studio</a>.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
