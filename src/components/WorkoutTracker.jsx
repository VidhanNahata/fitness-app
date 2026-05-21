import React, { useState, useEffect } from 'react';
import { WORKOUT_SPLITS as DEFAULT_SPLITS, DAYS_OF_WEEK } from '../utils/presets';
import ExerciseVisualizer, { EXERCISE_GUIDES } from './ExerciseVisualizer';
import { getWeekdayName } from '../utils/dateUtils';
import { 
  Dumbbell, 
  CheckCircle2, 
  History, 
  ArrowUpRight, 
  Calendar,
  Check,
  Settings,
  X
} from 'lucide-react';

export default function WorkoutTracker({ 
  todayDate, 
  workoutLogs, 
  saveWorkoutLog, 
  completeWorkout,
  workoutHistory,
  workoutSplits,
  setWorkoutSplits,
  modifyActiveWorkout
}) {
  // Determine today's day of the week
  const todayDayName = getWeekdayName(todayDate);
  
  // Selected day tab (defaults to today's workout split)
  const [selectedDay, setSelectedDay] = useState(todayDayName);

  // Sync selectedDay tab when today's day name changes (e.g. date roll-over)
  useEffect(() => {
    setSelectedDay(todayDayName);
  }, [todayDayName]);
  
  // Controls settings modal/panel for customizing splits
  const [isCustomizing, setIsCustomizing] = useState(false);
  
  // State for active workout values (weights and completions per set)
  // Structured as: { [exerciseId]: [ { weight: number, completed: boolean } ] }
  const [currentLog, setCurrentLog] = useState({});
  const [activeSwapExId, setActiveSwapExId] = useState(null);

  const currentSplit = workoutSplits[selectedDay] || { focus: 'Rest Day', exercises: [] };

  // Helper to find the last weight lifted for an exercise in history
  const getLastWeekWeight = (exerciseId, exerciseName) => {
    // Search backwards in workoutHistory for this exercise
    for (let i = workoutHistory.length - 1; i >= 0; i--) {
      const historyEntry = workoutHistory[i];
      let exEntry = historyEntry.exercises && historyEntry.exercises[exerciseId];
      
      // Fallback: match by exerciseName if the ID changed
      if (!exEntry && exerciseName && historyEntry.exerciseNames) {
        const matchingId = Object.keys(historyEntry.exerciseNames).find(
          id => historyEntry.exerciseNames[id] === exerciseName
        );
        if (matchingId) {
          exEntry = historyEntry.exercises[matchingId];
        }
      }
      
      if (exEntry) {
        const setsArray = Array.isArray(exEntry) ? exEntry : (exEntry.sets || []);
        const maxWeight = Math.max(...setsArray.map(s => s.weight || 0));
        if (maxWeight > 0) return maxWeight;
      }
    }
    // Fallback to presets baseWeight
    const presetEx = currentSplit.exercises.find(e => e.id === exerciseId);
    return presetEx ? presetEx.baseWeight : 0;
  };

  // Load existing log for the selected day if it exists, otherwise initialize it
  useEffect(() => {
    const dateStr = todayDate; // Use current date for logging
    const existingLog = workoutLogs[dateStr] && workoutLogs[dateStr][selectedDay];

    if (existingLog) {
      const mergedLog = { ...existingLog };
      let updated = false;

      currentSplit.exercises.forEach(ex => {
        if (!mergedLog[ex.id]) {
          const lastWeight = getLastWeekWeight(ex.id, ex.name);
          const suggestedWeight = lastWeight > 0 ? lastWeight + (ex.baseWeight === 0 ? 0 : 2.5) : ex.baseWeight;
          
          mergedLog[ex.id] = Array.from({ length: ex.sets }, () => ({
            weight: suggestedWeight,
            completed: false
          }));
          updated = true;
        }
      });

      setCurrentLog(mergedLog);
      if (updated) {
        saveWorkoutLog(todayDate, selectedDay, mergedLog);
      }
    } else {
      // Initialize with suggested overload weights
      const initialLog = {};
      currentSplit.exercises.forEach(ex => {
        const lastWeight = getLastWeekWeight(ex.id, ex.name);
        const suggestedWeight = lastWeight > 0 ? lastWeight + (ex.baseWeight === 0 ? 0 : 2.5) : ex.baseWeight;
        
        initialLog[ex.id] = Array.from({ length: ex.sets }, () => ({
          weight: suggestedWeight,
          completed: false
        }));
      });
      setCurrentLog(initialLog);
    }
  }, [selectedDay, todayDate, workoutHistory, workoutSplits]);

  // Handle changes to set weight
  const handleWeightChange = (exerciseId, setIndex, val) => {
    const numVal = parseFloat(val) || 0;
    setCurrentLog(prev => {
      const updatedEx = [...(prev[exerciseId] || [])];
      updatedEx[setIndex] = { ...updatedEx[setIndex], weight: numVal };
      const newLog = { ...prev, [exerciseId]: updatedEx };
      saveWorkoutLog(todayDate, selectedDay, newLog);
      return newLog;
    });
  };

  // Toggle set completion
  const handleSetToggle = (exerciseId, setIndex) => {
    setCurrentLog(prev => {
      const updatedEx = [...(prev[exerciseId] || [])];
      const isCompleted = !updatedEx[setIndex].completed;
      updatedEx[setIndex] = { ...updatedEx[setIndex], completed: isCompleted };
      const newLog = { ...prev, [exerciseId]: updatedEx };
      saveWorkoutLog(todayDate, selectedDay, newLog);
      return newLog;
    });
  };

  // Fast fill suggested weight for all sets in an exercise
  const applySuggestedOverload = (exerciseId, suggestedWeight) => {
    setCurrentLog(prev => {
      const updatedEx = (prev[exerciseId] || []).map(set => ({
        ...set,
        weight: suggestedWeight
      }));
      const newLog = { ...prev, [exerciseId]: updatedEx };
      saveWorkoutLog(todayDate, selectedDay, newLog);
      return newLog;
    });
  };

  // Save the current workout log to history (and localStorage)
  const handleWorkoutComplete = () => {
    completeWorkout(todayDate, selectedDay, currentLog, currentSplit.focus);
    alert(`Workout for ${currentSplit.focus} on ${selectedDay} saved successfully!`);
  };

  // Re-assign routine template to day
  const handleSplitFocusChange = (day, newFocus) => {
    // Find which template in DEFAULT_SPLITS matches the new focus
    const matchDay = Object.keys(DEFAULT_SPLITS).find(
      key => DEFAULT_SPLITS[key].focus === newFocus
    );
    
    if (matchDay) {
      const updatedSplits = {
        ...workoutSplits,
        [day]: JSON.parse(JSON.stringify(DEFAULT_SPLITS[matchDay]))
      };
      setWorkoutSplits(updatedSplits);
    }
  };

  // Count total and completed sets
  const getProgressStats = () => {
    let total = 0;
    let completed = 0;
    Object.values(currentLog).forEach(sets => {
      sets.forEach(set => {
        total++;
        if (set.completed) completed++;
      });
    });
    return { total, completed };
  };

  const { total: totalSets, completed: completedSets } = getProgressStats();
  const completionRate = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

  // List of all standard routines to choose from
  const routinesList = Object.values(DEFAULT_SPLITS).map(s => s.focus);

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <span className="text-neon font-mono text-sm tracking-wider uppercase">Active Tracker</span>
          <h1 className="text-2xl font-bold text-dark-textLight mt-1">Workout Logger</h1>
        </div>
        <button 
          onClick={() => setIsCustomizing(!isCustomizing)}
          className={`p-2 bg-dark-card border rounded-xl flex items-center justify-center gap-1.5 transition-all text-xs font-bold ${
            isCustomizing 
              ? 'border-neon text-neon' 
              : 'border-dark-border text-dark-textMuted hover:text-dark-textLight hover:border-dark-border'
          }`}
        >
          <Settings size={16} /> Customize Split
        </button>
      </div>

      {/* Customize splits settings panel */}
      {isCustomizing && (
        <div className="p-5 bg-dark-card border border-neon/30 rounded-3xl animate-fadeIn relative">
          <button 
            onClick={() => setIsCustomizing(false)}
            className="absolute top-4 right-4 p-1 text-dark-textMuted hover:text-dark-textLight"
          >
            <X size={16} />
          </button>
          <h3 className="text-sm font-extrabold text-neon flex items-center gap-1.5 mb-3">
            <Calendar size={16} />
            Reassign Weekly Workouts
          </h3>
          <p className="text-[11px] text-dark-textMuted mb-4">
            Rearrange focus days to match your schedule. Changing a day's target will automatically load its exercises template.
          </p>
          
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {DAYS_OF_WEEK.map(day => {
              const currentFocus = workoutSplits[day]?.focus || 'Rest Day';
              return (
                <div key={day} className="flex items-center justify-between gap-3 p-2 bg-dark-bg/60 border border-dark-border/40 rounded-2xl">
                  <span className="w-12 font-bold font-mono text-xs text-neon text-center bg-neon/10 py-1 rounded-xl">
                    {day}
                  </span>
                  <select
                    value={currentFocus}
                    onChange={(e) => handleSplitFocusChange(day, e.target.value)}
                    className="flex-1 max-w-[210px] bg-dark-bg border border-dark-border focus:border-neon text-xs font-bold text-dark-textLight rounded-xl px-2 py-1.5 focus:outline-none"
                  >
                    {routinesList.map(routine => (
                      <option key={routine} value={routine}>{routine}</option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Days Tabs selector */}
      <div className="bg-dark-card border border-dark-border rounded-2xl p-1.5 flex gap-1 overflow-x-auto no-scrollbar">
        {DAYS_OF_WEEK.map(day => {
          const isActive = selectedDay === day;
          const isRealToday = todayDayName === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-1 min-w-[50px] py-2 text-center rounded-xl text-xs font-bold transition-all relative ${
                isActive 
                  ? 'bg-neon text-dark-bg' 
                  : 'text-dark-textMuted hover:text-dark-textLight hover:bg-dark-accent'
              }`}
            >
              {day}
              {isRealToday && !isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-neon rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Focus split banner */}
      <div className="bg-dark-card border border-dark-border rounded-3xl p-5 flex items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-neon/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-neon/10 rounded-2xl text-neon border border-neon/20">
            <Dumbbell size={20} />
          </div>
          <div>
            <span className="text-[10px] text-neon font-mono uppercase tracking-wider block">Target Schedule Focus</span>
            <h3 className="text-lg font-bold text-dark-textLight">{currentSplit.focus}</h3>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-neon font-mono">{completionRate}%</span>
          <span className="text-[10px] text-dark-textMuted block uppercase font-bold tracking-wider">Sets Completed</span>
        </div>
      </div>

      {/* AI Alteration Status Banner */}
      {currentSplit.isAltered && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-start gap-2.5">
            <span className="text-lg shrink-0 mt-0.5">⚡</span>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-neon block">AI Coach Modification Active</span>
              <p className="text-xs text-dark-textLight font-semibold mt-0.5">
                {currentSplit.alterationType === 'tired' && "Workout modified for fatigue: weights reduced by 20% & volume decreased."}
                {currentSplit.alterationType?.startsWith('pain_') && `Workout modified for ${currentSplit.alterationType.split('_')[1]} discomfort. Swapped with safer movements.`}
                {currentSplit.alterationType === 'catchup' && "Recovery catch-up active! Deferred sets added back to today's session."}
                {!currentSplit.alterationType && "Workout modified by Coach Apex."}
              </p>
            </div>
          </div>
          <button 
            onClick={() => {
              if (modifyActiveWorkout) {
                modifyActiveWorkout(selectedDay, 'reset');
                alert("Restored original preset routine.");
              }
            }}
            className="px-3.5 py-1.5 bg-dark-bg hover:bg-dark-accent border border-dark-border hover:border-neon text-dark-textMuted hover:text-dark-textLight rounded-2xl text-[10px] font-extrabold whitespace-nowrap transition-all self-end sm:self-center uppercase tracking-wider"
          >
            Restore Preset
          </button>
        </div>
      )}

      {/* Exercises list */}
      <div className="space-y-6">
        {currentSplit.exercises.length === 0 || currentSplit.focus.includes('Rest Day') ? (
          <div className="bg-dark-card border border-dark-border rounded-3xl p-8 text-center space-y-3">
            <div className="mx-auto w-12 h-12 bg-dark-accent rounded-full flex items-center justify-center text-dark-textMuted">
              <Calendar size={24} />
            </div>
            <h4 className="text-dark-textLight font-semibold">Active Rest & Recovery Day</h4>
            <p className="text-xs text-dark-textMuted max-w-sm mx-auto">
              No weights scheduled today. Prioritize stretching, eating clean vegetarian proteins (paneer, dal), and sleeping at least 8 hours.
            </p>
          </div>
        ) : (
          currentSplit.exercises.map(ex => {
            const lastWeekWeight = getLastWeekWeight(ex.id, ex.name);
            const isBodyweight = ex.baseWeight === 0;
            const suggestedOverload = isBodyweight ? 0 : lastWeekWeight > 0 ? lastWeekWeight + 2.5 : ex.baseWeight;
            
            return (
              <div key={ex.id} className="bg-dark-card border border-dark-border rounded-3xl p-5 space-y-4">
                {/* Exercise title, animation & suggested weight */}
                <div className="flex gap-3 border-b border-dark-border/50 pb-3">
                  {/* CSS-Animated SVG Visualizer */}
                  <ExerciseVisualizer exerciseName={ex.name} />

                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-dark-textLight text-sm sm:text-base leading-tight">{ex.name}</h4>
                        <ExerciseVisualizer exerciseName={ex.name} mode="link" />
                        {EXERCISE_GUIDES[ex.name]?.alternatives && (
                          <button
                            onClick={() => {
                              setActiveSwapExId(activeSwapExId === ex.id ? null : ex.id);
                            }}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 border text-[10px] font-bold rounded-lg transition-all ${
                              activeSwapExId === ex.id
                                ? 'bg-neon border-neon text-dark-bg'
                                : 'bg-dark-accent/60 hover:bg-dark-accent border-dark-border hover:border-neon/40 text-dark-textMuted hover:text-neon'
                            }`}
                            title="Swap exercise for a safer alternative"
                          >
                            Swap
                          </button>
                        )}
                      </div>
                      <span className="text-xs text-dark-textMuted font-mono block mt-0.5">
                        Target: {ex.sets} Sets × {ex.reps} Reps
                      </span>
                    </div>
                    {!isBodyweight && (
                      <div className="flex items-center gap-1.5 self-start sm:self-center">
                        <div className="bg-dark-accent border border-dark-border rounded-xl px-2 py-0.5 text-right">
                          <span className="text-[9px] text-dark-textMuted block font-semibold leading-tight">Previous</span>
                          <span className="text-xs text-dark-textLight font-mono font-bold">
                            {lastWeekWeight > 0 ? `${lastWeekWeight} kg` : 'N/A'}
                          </span>
                        </div>
                        <div 
                          onClick={() => applySuggestedOverload(ex.id, suggestedOverload)}
                          className="bg-neon/10 hover:bg-neon/20 border border-neon/20 rounded-xl px-2 py-0.5 text-left cursor-pointer transition-all flex items-center gap-0.5 group"
                          title="Tap to autofill all sets with suggestion"
                        >
                          <div>
                            <span className="text-[9px] text-neon block font-bold leading-tight flex items-center gap-0.5">
                              Target <ArrowUpRight size={8} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </span>
                            <span className="text-xs text-neon font-mono font-extrabold">
                              +{isBodyweight ? '0' : '2.5'} kg ({suggestedOverload} kg)
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Swap alternatives dropdown/list */}
                {activeSwapExId === ex.id && EXERCISE_GUIDES[ex.name]?.alternatives && (
                  <div className="p-3.5 bg-dark-bg border border-dark-border rounded-2xl animate-fadeIn space-y-2">
                    <span className="text-[10px] text-neon font-mono uppercase tracking-wider block">Can't do this exercise? Swap for:</span>
                    <div className="flex flex-col gap-2">
                      {EXERCISE_GUIDES[ex.name].alternatives.map((altName) => (
                        <button
                          key={altName}
                          onClick={() => {
                            modifyActiveWorkout(selectedDay, 'swap_exercise', {
                              exerciseToReplace: ex.name,
                              replacementExerciseName: altName
                            });
                            setActiveSwapExId(null);
                          }}
                          className="w-full text-left px-3.5 py-2.5 bg-dark-card hover:bg-dark-accent border border-dark-border hover:border-neon text-xs text-dark-textLight font-semibold rounded-xl flex items-center justify-between group transition-all"
                        >
                          <span>{altName}</span>
                          <span className="text-[10px] text-dark-textMuted group-hover:text-neon font-mono font-bold">Select Alternative →</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sets inputs */}
                <div className="space-y-2">
                  {currentLog[ex.id]?.map((set, setIndex) => (
                    <div 
                      key={setIndex}
                      className={`flex items-center justify-between gap-3 p-2 rounded-2xl border transition-all ${
                        set.completed 
                          ? 'bg-neon/5 border-neon/30' 
                          : 'bg-dark-bg/40 border-dark-border/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 text-center text-xs font-mono font-bold text-dark-textMuted bg-dark-accent/60 py-1 rounded-lg">
                          S{setIndex + 1}
                        </span>
                        <span className="text-xs text-dark-textLight font-semibold">
                          Target: {ex.reps} reps
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Weight input */}
                        {!isBodyweight ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              step="0.5"
                              value={set.weight || ''}
                              onChange={(e) => handleWeightChange(ex.id, setIndex, e.target.value)}
                              disabled={set.completed}
                              className="w-16 bg-dark-bg border border-dark-border focus:border-neon disabled:opacity-50 text-center font-mono font-bold text-xs text-dark-textLight rounded-xl py-1 focus:outline-none"
                            />
                            <span className="text-[10px] text-dark-textMuted font-mono uppercase">kg</span>
                          </div>
                        ) : (
                          <span className="text-xs text-dark-textMuted font-mono pr-2">Bodyweight</span>
                        )}

                        {/* Completed Checkbox */}
                        <button
                          onClick={() => handleSetToggle(ex.id, setIndex)}
                          className={`w-7 h-7 rounded-xl flex items-center justify-center border transition-all ${
                            set.completed
                              ? 'bg-neon border-neon text-dark-bg'
                              : 'border-dark-border text-transparent hover:border-neon/50'
                          }`}
                        >
                          <Check size={14} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Submit Button */}
      {currentSplit.exercises.length > 0 && !currentSplit.focus.includes('Rest Day') && (
        <button
          onClick={handleWorkoutComplete}
          className="w-full py-4 bg-neon hover:brightness-110 active:scale-[0.98] text-dark-bg font-black rounded-2xl shadow-[0_4px_20px_rgba(200,255,0,0.15)] flex items-center justify-center gap-2 transition-all text-base"
        >
          <CheckCircle2 size={20} />
          Workout Complete
        </button>
      )}

      {/* Workout History Summary Section */}
      <div className="bg-dark-card border border-dark-border rounded-3xl p-5 space-y-4">
        <h4 className="font-bold text-dark-textLight text-sm flex items-center gap-2">
          <History size={16} className="text-neon" />
          Recent Workout History
        </h4>
        {workoutHistory.length === 0 ? (
          <p className="text-xs text-dark-textMuted italic">No workouts logged yet. Complete today's session to start logging history!</p>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {workoutHistory.slice().reverse().map((hist, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs p-2 bg-dark-bg/60 border border-dark-border/40 rounded-xl">
                <div>
                  <span className="font-semibold text-dark-textLight block">{hist.splitFocus}</span>
                  <span className="text-[10px] text-dark-textMuted font-mono block mt-0.5">
                    {hist.completedAt ? `Completed: ${hist.completedAt}` : `${hist.date} (${hist.dayName})`}
                  </span>
                </div>
                <span className="text-neon font-mono font-bold bg-neon/10 px-2 py-0.5 rounded-full text-[10px]">
                  Saved
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
