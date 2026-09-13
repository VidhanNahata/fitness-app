import React, { useState, useEffect } from 'react';
import { INITIAL_METRICS, WORKOUT_SPLITS } from './utils/presets';
import { getLocalDateString } from './utils/dateUtils';

// Import components
import Dashboard from './components/Dashboard';
import WorkoutTracker from './components/WorkoutTracker';
import DietTracker from './components/DietTracker';
import BodyMetricsLog from './components/BodyMetricsLog';
import HabitTracker from './components/HabitTracker';
import ProgressPhotos from './components/ProgressPhotos';

// Icons
import { 
  LayoutDashboard, 
  Dumbbell, 
  Utensils, 
  LineChart, 
  CheckSquare, 
  Camera,
  Bot
} from 'lucide-react';

import TrainerAgent from './components/TrainerAgent';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // 1. Start Date (Transformation Timeline) - Defaults to today's date for a new user
  const [startDate, setStartDateState] = useState(() => {
    const saved = localStorage.getItem('fit_startDate');
    if (saved) return saved;
    return getLocalDateString();
  });

  const setStartDate = (date) => {
    setStartDateState(date);
    localStorage.setItem('fit_startDate', date);
  };

  // 2. Today's Date (Ticking state-updating timer and event listeners to stay updated in real time)
  const [todayDate, setTodayDate] = useState(() => getLocalDateString());

  useEffect(() => {
    const updateDateIfNeeded = () => {
      const current = getLocalDateString();
      setTodayDate(prev => {
        if (prev !== current) {
          return current;
        }
        return prev;
      });
    };

    // Check periodically
    const timer = setInterval(updateDateIfNeeded, 10000);

    // Refresh immediately when window is focused or tab becomes visible
    window.addEventListener('focus', updateDateIfNeeded);
    document.addEventListener('visibilitychange', updateDateIfNeeded);

    return () => {
      clearInterval(timer);
      window.removeEventListener('focus', updateDateIfNeeded);
      document.removeEventListener('visibilitychange', updateDateIfNeeded);
    };
  }, []);

  // Force date sync on tab switch
  useEffect(() => {
    setTodayDate(getLocalDateString());
  }, [activeTab]);

  // 3. Custom Workout Splits state (to allow manual reorganization of days)
  const [customSplits, setCustomSplits] = useState(() => {
    // FORCE UPDATE: Clear old splits to sync with Gymleco equipment overhaul
    const isOverhauled = localStorage.getItem('fit_v2_equipment_sync');
    if (!isOverhauled) {
      localStorage.setItem('fit_v2_equipment_sync', 'true');
      return WORKOUT_SPLITS;
    }
    const saved = localStorage.getItem('fit_workoutSplits');
    return saved ? JSON.parse(saved) : WORKOUT_SPLITS;
  });

  // 4. Workout Logs (Active Session Sets log) - Start empty for new user
  const [workoutLogs, setWorkoutLogs] = useState(() => {
    const saved = localStorage.getItem('fit_workoutLogs');
    return saved ? JSON.parse(saved) : {};
  });

  // 5. Workout History (Saves completed workouts) - Start empty for new user
  const [workoutHistory, setWorkoutHistory] = useState(() => {
    const saved = localStorage.getItem('fit_workoutHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // 6. Diet Logs (Water + Meals checkboxes) - Start empty for new user
  const [dietLogs, setDietLogs] = useState(() => {
    const saved = localStorage.getItem('fit_dietLogs');
    return saved ? JSON.parse(saved) : {};
  });

  // 7. Habit Logs (heatmaps) - Start empty for new user
  const [habitLogs, setHabitLogs] = useState(() => {
    const saved = localStorage.getItem('fit_habitLogs');
    return saved ? JSON.parse(saved) : {};
  });

  // 8. Body Metrics History - Preload exactly ONE entry: starting baseline
  const [metricsHistory, setMetricsHistory] = useState(() => {
    const saved = localStorage.getItem('fit_metricsHistory');
    if (saved) return JSON.parse(saved);

    return [
      {
        date: startDate,
        weight: INITIAL_METRICS.weight,
        bf: INITIAL_METRICS.bf,
        chest: INITIAL_METRICS.chest,
        waist: INITIAL_METRICS.waist,
        hip: INITIAL_METRICS.hip,
        notes: INITIAL_METRICS.notes
      }
    ];
  });

  // 9. Progress Photos History - Start empty for new user
  const [photosHistory, setPhotosHistory] = useState(() => {
    const saved = localStorage.getItem('fit_photosHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // 10. Deferred Exercises State
  const [deferredExercises, setDeferredExercises] = useState(() => {
    const saved = localStorage.getItem('fit_deferredExercises');
    return saved ? JSON.parse(saved) : [];
  });

  // 11. Trainer Chat History State
  const [trainerChatHistory, setTrainerChatHistory] = useState(() => {
    const saved = localStorage.getItem('fit_trainerChatHistory');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'welcome',
        sender: 'coach',
        text: `Hey! Coach Apex here. I'm your interactive personal trainer and coach for this 90-day transformation.\n\nI can help you:\n1. Explain exercise form step-by-step.\n2. Adjust your workouts dynamically if you're tired, stiff, or in pain.\n3. Keep track of deferred exercises and help you catch up on them later.\n\nLet me know how you're feeling today, or ask me any fitness/diet questions!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  // 12. Trainer Agent modal open state
  const [isTrainerOpen, setIsTrainerOpen] = useState(false);

  // Sync state with localStorage on change
  useEffect(() => {
    localStorage.setItem('fit_workoutLogs', JSON.stringify(workoutLogs));
  }, [workoutLogs]);

  useEffect(() => {
    localStorage.setItem('fit_workoutSplits', JSON.stringify(customSplits));
  }, [customSplits]);

  useEffect(() => {
    localStorage.setItem('fit_workoutHistory', JSON.stringify(workoutHistory));
  }, [workoutHistory]);

  useEffect(() => {
    localStorage.setItem('fit_dietLogs', JSON.stringify(dietLogs));
  }, [dietLogs]);

  useEffect(() => {
    localStorage.setItem('fit_habitLogs', JSON.stringify(habitLogs));
  }, [habitLogs]);

  useEffect(() => {
    localStorage.setItem('fit_metricsHistory', JSON.stringify(metricsHistory));
  }, [metricsHistory]);

  useEffect(() => {
    localStorage.setItem('fit_photosHistory', JSON.stringify(photosHistory));
  }, [photosHistory]);

  useEffect(() => {
    localStorage.setItem('fit_deferredExercises', JSON.stringify(deferredExercises));
  }, [deferredExercises]);

  useEffect(() => {
    localStorage.setItem('fit_trainerChatHistory', JSON.stringify(trainerChatHistory));
  }, [trainerChatHistory]);

  // Global methods to update states
  const saveWorkoutLog = (date, dayName, logData) => {
    setWorkoutLogs(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        [dayName]: logData
      }
    }));
  };

  const completeWorkout = (date, dayName, logData, focus) => {
    setWorkoutLogs(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        [dayName]: logData
      }
    }));

    // Find active exercises to map their names
    const activeExercises = customSplits[dayName]?.exercises || [];
    const exerciseNames = {};
    Object.keys(logData).forEach(exId => {
      const found = activeExercises.find(e => e.id === exId);
      if (found) {
        exerciseNames[exId] = found.name;
      }
    });

    // Add to workout history as a completed session
    const entry = {
      date,
      dayName,
      splitFocus: focus || 'Active Session',
      exercises: logData,
      exerciseNames,
      completedAt: new Date().toLocaleString()
    };
    
    // Check if this date+day is already logged in history, if so overwrite, else append
    setWorkoutHistory(prev => {
      const filtered = prev.filter(h => !(h.date === date && h.dayName === dayName));
      return [...filtered, entry];
    });
  };

  const handleResetData = () => {
    if (window.confirm("Are you sure you want to clear all workout history, logged weights, habits, progress photos, and start fresh as a brand new user? This cannot be undone.")) {
      localStorage.clear();
      
      const initialStart = getLocalDateString();
      setStartDateState(initialStart);
      setCustomSplits(WORKOUT_SPLITS);
      setWorkoutLogs({});
      setWorkoutHistory([]);
      setDietLogs({});
      setHabitLogs({});
      setMetricsHistory([
        {
          date: initialStart,
          weight: INITIAL_METRICS.weight,
          bf: INITIAL_METRICS.bf,
          chest: INITIAL_METRICS.chest,
          waist: INITIAL_METRICS.waist,
          hip: INITIAL_METRICS.hip,
          notes: INITIAL_METRICS.notes
        }
      ]);
      setPhotosHistory([]);
      setDeferredExercises([]);
      setTrainerChatHistory([
        {
          id: 'welcome',
          sender: 'coach',
          text: `Hey! Coach Apex here. I'm your interactive personal trainer and coach for this 90-day transformation.\n\nI can help you:\n1. Explain exercise form step-by-step.\n2. Adjust your workouts dynamically if you're tired, stiff, or in pain.\n3. Keep track of deferred exercises and help you catch up on them later.\n\nLet me know how you're feeling today, or ask me any fitness/diet questions!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTrainerOpen(false);
      setActiveTab('dashboard');
      alert("App data reset successfully! You are now set up as a brand new user.");
    }
  };

  const saveDietLog = (date, logData) => {
    setDietLogs(prev => ({
      ...prev,
      [date]: logData
    }));
  };

  const saveHabitLog = (date, logData) => {
    setHabitLogs(prev => ({
      ...prev,
      [date]: logData
    }));
  };

  const addMetricsEntry = (entry) => {
    setMetricsHistory(prev => {
      // Overwrite if entry on same day exists, else append
      const filtered = prev.filter(m => m.date !== entry.date);
      return [...filtered, entry].sort((a, b) => new Date(a.date) - new Date(b.date));
    });
  };

  const savePhotosEntry = (weekNum, angle, base64) => {
    setPhotosHistory(prev => {
      const existing = prev.find(p => p.week === weekNum);
      if (existing) {
        const updated = { ...existing, [angle]: base64 };
        return prev.map(p => p.week === weekNum ? updated : p);
      } else {
        const newEntry = {
          week: weekNum,
          date: getLocalDateString(),
          front: null,
          side: null,
          back: null,
          [angle]: base64
        };
        return [...prev, newEntry];
      }
    });
  };

  // Mutate active workout splits based on trainer requests
  const modifyActiveWorkout = (dayName, type, options = {}) => {
    setCustomSplits(prevSplits => {
      const splitToModify = prevSplits[dayName];
      if (!splitToModify) return prevSplits;

      const modifiedSplit = JSON.parse(JSON.stringify(splitToModify));

      // Backup original exercises if not already backed up
      if (!modifiedSplit.isAltered || !modifiedSplit.originalExercises) {
        modifiedSplit.originalExercises = JSON.parse(JSON.stringify(splitToModify.exercises));
      }

      let newDeferred = [];

      if (type === 'tired') {
        modifiedSplit.isAltered = true;
        modifiedSplit.alterationType = 'tired';
        modifiedSplit.exercises = modifiedSplit.originalExercises.map(ex => {
          const isBodyweight = ex.baseWeight === 0;
          // Reduce weight by 20%
          const newWeight = isBodyweight ? 0 : Math.round(ex.baseWeight * 0.8 * 2) / 2;
          
          // Drop 1 set if sets > 1
          let newSets = ex.sets;
          if (ex.sets > 1) {
            newSets = ex.sets - 1;
            // Add deferred set
            newDeferred.push({
              id: `def_${Date.now()}_${ex.id}`,
              name: ex.name,
              sets: 1,
              reps: ex.reps,
              originalWeight: ex.baseWeight,
              dateDeferred: new Date().toLocaleDateString()
            });
          }

          return {
            ...ex,
            baseWeight: newWeight,
            sets: newSets
          };
        });
      } else if (type === 'pain') {
        const painArea = options.painArea || 'general';
        modifiedSplit.isAltered = true;
        modifiedSplit.alterationType = `pain_${painArea}`;

        modifiedSplit.exercises = [];

        modifiedSplit.originalExercises.forEach(ex => {
          let shouldReplace = false;
          let replacement = null;

          if (painArea === 'shoulder') {
            if (ex.name === 'Flat Barbell Bench Press') {
              shouldReplace = true;
              replacement = { id: `${ex.id}_sub`, name: 'Dumbbell Decline Bench Press', sets: 3, reps: '10', baseWeight: 16 };
            } else if (ex.name === 'Incline Dumbbell Press') {
              shouldReplace = true;
              replacement = { id: `${ex.id}_sub`, name: 'Chest Dips', sets: 3, reps: '10', baseWeight: 0 };
            } else if (ex.name === 'Seated Barbell Overhead Press') {
              shouldReplace = true;
              replacement = { id: `${ex.id}_sub`, name: 'Cable Lateral Raise', sets: 4, reps: '12-15', baseWeight: 8 };
            }
          } else if (painArea === 'back') {
            if (ex.name === 'Barbell Rows') {
              shouldReplace = true;
              replacement = { id: `${ex.id}_sub`, name: 'Cable Seated Row', sets: 3, reps: '10', baseWeight: 35 };
            } else if (ex.name === 'Romanian Deadlifts (RDL)') {
              shouldReplace = true;
              replacement = { id: `${ex.id}_sub`, name: 'Glute Bridge', sets: 3, reps: '15', baseWeight: 0 };
            }
          } else if (painArea === 'knee') {
            if (ex.name === 'Barbell Back Squats' || ex.name === 'Dumbbell Goblet Squats') {
              shouldReplace = true;
              replacement = { id: `${ex.id}_sub`, name: 'Glute Bridge', sets: 3, reps: '15', baseWeight: 0 };
            } else if (ex.name === 'Leg Extensions') {
              shouldReplace = true;
              replacement = { id: `${ex.id}_sub`, name: 'Lying Leg Curls', sets: 3, reps: '12', baseWeight: 25 };
            }
          } else if (painArea === 'wrist') {
            if (ex.name === 'Incline Dumbbell Curls' || ex.name === 'Dumbbell Hammer Curls') {
              shouldReplace = true;
              replacement = { id: `${ex.id}_sub`, name: 'Lying Leg Raise', sets: 3, reps: '15', baseWeight: 0 };
            }
          }

          if (shouldReplace && replacement) {
            newDeferred.push({
              id: `def_${Date.now()}_${ex.id}`,
              name: ex.name,
              sets: ex.sets,
              reps: ex.reps,
              originalWeight: ex.baseWeight,
              dateDeferred: new Date().toLocaleDateString()
            });
            modifiedSplit.exercises.push(replacement);
          } else {
            modifiedSplit.exercises.push(ex);
          }
        });
      } else if (type === 'catchup') {
        modifiedSplit.isAltered = true;
        modifiedSplit.alterationType = 'catchup';

        const catchupExercises = deferredExercises.map(defEx => ({
          id: `${defEx.id.replace('def_', 'catchup_')}`,
          name: `${defEx.name} (Catchup)`,
          sets: defEx.sets,
          reps: defEx.reps,
          baseWeight: defEx.originalWeight,
          isCatchup: true
        }));

        modifiedSplit.exercises = [...modifiedSplit.exercises, ...catchupExercises];
        setDeferredExercises([]);
      } else if (type === 'swap_exercise') {
        const { exerciseToReplace, replacementExerciseName } = options;
        modifiedSplit.isAltered = true;
        if (!modifiedSplit.alterationType) {
          modifiedSplit.alterationType = 'swapped';
        }

        // Helper to find default presets weight for the new exercise
        const getPresetBaseWeight = (name) => {
          for (const day of Object.values(WORKOUT_SPLITS)) {
            const found = day.exercises.find(ex => ex.name === name);
            if (found) return found.baseWeight;
          }
          const defaults = {
            "Dumbbell Bicep Curls": 10,
            "Triceps Kickbacks": 8,
            "Lying Leg Curls": 25,
            "Dumbbell Lunges": 12,
            "Push-Ups": 0,
            "Concentration Curls": 10,
            "Dumbbell Shoulder Press": 12,
            "Leg Press": 100,
            "Glute Bridge": 0,
            "Triceps Dips": 0,
            "Dumbbell Decline Bench Press": 16,
            "Barbell Decline Bench Press": 50,
            "Dumbbell Lat Pullover": 14,
            "Close Grip Bench Press": 40,
            "Cable Seated Row": 35,
            "Inverted Row": 0,
            "Preacher Curl": 15,
            "Step-Ups": 10,
            "Single-Leg Romanian Deadlift": 12,
            "Hanging Leg Raise": 0,
            "Cable Reverse Crunch": 15,
            "Lying Leg Raise": 0,
            "Dumbbell Arnold Press": 10,
            "Cable Upright Row": 15,
            "Dumbbell Rear Delt Raise": 6,
            "Dumbbell Lying Rear Lateral Raise": 6,
            "Walk Elliptical Cross Trainer": 0,
            "Exercise Ball Seated Hamstring Stretch": 0,
            "Overhead Triceps Stretch": 0,
            "Neck Side Stretch": 0,
            "Chest Dips": 0,
            "Incline Barbell Bench Press": 50,
            "Incline Cable Chest Flyes": 12,
            "Dumbbell Reverse Curls": 8,
            "Cable Lateral Raise": 8,
            "Cable Rear Delt Flyes": 10,
            "Barbell Shrugs": 45,
            "Cable Shrugs": 30,
            "Rowing Machine Cardio": 0,
            "Stationary Bike Steady State": 0,
            // 12 new non-preset alternative exercises
            "Cable Pushdown": 20,
            "Inverted Row Bent Knees": 0,
            "Barbell Curl": 20,
            "Barbell Front Squat": 50,
            "Dumbbell Romanian Deadlift": 14,
            "Dead Bug": 0,
            "Wheel Rollerout": 0,
            "Dumbbell Front Raise": 6,
            "Barbell Rear Delt Row": 30,
            "Barbell Upright Row": 20,
            "Lying Side Quads Stretch": 0,
            "Spine Stretch": 0
          };
          return defaults[name] !== undefined ? defaults[name] : 0;
        };

        modifiedSplit.exercises = modifiedSplit.exercises.map(ex => {
          if (ex.name === exerciseToReplace) {
            const newBaseWeight = getPresetBaseWeight(replacementExerciseName);
            return {
              ...ex,
              id: `${ex.id.split('_')[0]}_swap_${Date.now()}`,
              name: replacementExerciseName,
              baseWeight: newBaseWeight
            };
          }
          return ex;
        });
      } else if (type === 'reset') {
        modifiedSplit.isAltered = false;
        modifiedSplit.alterationType = null;
        if (modifiedSplit.originalExercises) {
          modifiedSplit.exercises = JSON.parse(JSON.stringify(modifiedSplit.originalExercises));
          delete modifiedSplit.originalExercises;
        } else {
          const defaultSplit = WORKOUT_SPLITS[dayName];
          if (defaultSplit) {
            modifiedSplit.exercises = JSON.parse(JSON.stringify(defaultSplit.exercises));
          }
        }
      }

      if (newDeferred.length > 0) {
        setDeferredExercises(prev => [...prev, ...newDeferred]);
      }

      return {
        ...prevSplits,
        [dayName]: modifiedSplit
      };
    });
  };

  // Switch tabs
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            startDate={startDate}
            setStartDate={setStartDate}
            todayDate={todayDate}
            metricsHistory={metricsHistory}
            habitLogs={habitLogs}
            setActiveTab={setActiveTab}
            workoutSplits={customSplits}
            onResetData={handleResetData}
          />
        );
      case 'workout':
        return (
          <WorkoutTracker 
            todayDate={todayDate}
            workoutLogs={workoutLogs}
            saveWorkoutLog={saveWorkoutLog}
            completeWorkout={completeWorkout}
            workoutHistory={workoutHistory}
            workoutSplits={customSplits}
            setWorkoutSplits={setCustomSplits}
            modifyActiveWorkout={modifyActiveWorkout}
          />
        );
      case 'diet':
        return (
          <DietTracker 
            todayDate={todayDate}
            dietLogs={dietLogs}
            saveDietLog={saveDietLog}
          />
        );
      case 'metrics':
        return (
          <BodyMetricsLog 
            metricsHistory={metricsHistory}
            addMetricsEntry={addMetricsEntry}
          />
        );
      case 'habits':
        return (
          <HabitTracker 
            startDate={startDate}
            todayDate={todayDate}
            habitLogs={habitLogs}
            saveHabitLog={saveHabitLog}
          />
        );
      case 'photos':
        return (
          <ProgressPhotos 
            photosHistory={photosHistory}
            savePhotosEntry={savePhotosEntry}
          />
        );
      default:
        return <div className="text-center py-10">View Not Found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-dark-textLight font-sans pb-24">
      {/* Outer frame styling for desktop scaling */}
      <div className="max-w-md mx-auto px-4 pt-6">
        
        {/* Main Content Area */}
        <div className="min-h-[calc(100vh-140px)]">
          {renderActiveView()}
        </div>

        {/* Secondary Navigation (Photos Shortcut) for Dashboard Shortcut access */}
        {activeTab === 'dashboard' && (
          <div className="mt-2 mb-8 flex justify-center">
            <button
              onClick={() => setActiveTab('photos')}
              className="w-full bg-dark-card hover:bg-dark-accent border border-dark-border hover:border-neon/60 rounded-3xl p-5 flex flex-col items-center justify-center gap-2 transition-all active:scale-95 group text-center"
            >
              <div className="p-3 bg-neon/10 rounded-2xl text-neon border border-neon/20 group-hover:scale-105 transition-transform">
                <Camera size={20} />
              </div>
              <div>
                <span className="text-xs font-bold text-dark-textLight block">Progress Photos</span>
                <span className="text-[10px] text-dark-textMuted font-mono uppercase">Side-by-side comparison</span>
              </div>
            </button>
          </div>
        )}

        {/* Back to Dashboard bar for non-primary views */}
        {activeTab === 'photos' && (
          <button
            onClick={() => setActiveTab('dashboard')}
            className="w-full py-3 mb-8 bg-dark-card hover:bg-dark-accent border border-dark-border hover:border-neon rounded-2xl text-xs font-semibold text-dark-textLight text-center transition-all"
          >
            ← Back to Dashboard
          </button>
        )}

        {/* Floating Trainer Coach Widget */}
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-md pointer-events-none z-40 px-4 flex justify-end">
          <button 
            onClick={() => setIsTrainerOpen(true)}
            className="pointer-events-auto w-14 h-14 bg-neon hover:brightness-110 active:scale-95 text-dark-bg rounded-2xl shadow-[0_8px_30px_rgba(200,255,0,0.3)] flex items-center justify-center border border-neon/50 transition-all hover:scale-105 group relative"
            title="Chat with Coach Apex (AI Trainer)"
          >
            <Bot size={24} className="group-hover:rotate-12 transition-transform duration-300 text-dark-bg" />
            {deferredExercises.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-500 text-dark-bg font-mono font-bold text-[10px] rounded-full flex items-center justify-center border border-dark-bg animate-bounce">
                {deferredExercises.length}
              </span>
            )}
          </button>
        </div>

        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto bg-dark-card/90 border-t border-dark-border backdrop-blur-md px-6 py-3 flex justify-between items-center shadow-[0_-10px_30px_rgba(8,12,8,0.8)]">
          {/* Dashboard */}
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'dashboard' ? 'text-neon scale-105' : 'text-dark-textMuted hover:text-dark-textLight'
            }`}
          >
            <LayoutDashboard size={20} />
            <span className="text-[9px] font-bold">Home</span>
          </button>

          {/* Workout */}
          <button 
            onClick={() => setActiveTab('workout')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'workout' ? 'text-neon scale-105' : 'text-dark-textMuted hover:text-dark-textLight'
            }`}
          >
            <Dumbbell size={20} />
            <span className="text-[9px] font-bold">Workout</span>
          </button>

          {/* Diet */}
          <button 
            onClick={() => setActiveTab('diet')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'diet' ? 'text-neon scale-105' : 'text-dark-textMuted hover:text-dark-textLight'
            }`}
          >
            <Utensils size={20} />
            <span className="text-[9px] font-bold">Diet</span>
          </button>

          {/* Metrics */}
          <button 
            onClick={() => setActiveTab('metrics')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'metrics' ? 'text-neon scale-105' : 'text-dark-textMuted hover:text-dark-textLight'
            }`}
          >
            <LineChart size={20} />
            <span className="text-[9px] font-bold">Metrics</span>
          </button>

          {/* Habits */}
          <button 
            onClick={() => setActiveTab('habits')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'habits' ? 'text-neon scale-105' : 'text-dark-textMuted hover:text-dark-textLight'
            }`}
          >
            <CheckSquare size={20} />
            <span className="text-[9px] font-bold">Habits</span>
          </button>
        </nav>

        {/* Trainer Agent Overlay */}
        <TrainerAgent 
          isOpen={isTrainerOpen}
          onClose={() => setIsTrainerOpen(false)}
          todayDate={todayDate}
          customSplits={customSplits}
          modifyActiveWorkout={modifyActiveWorkout}
          deferredExercises={deferredExercises}
          chatHistory={trainerChatHistory}
          setChatHistory={setTrainerChatHistory}
          metricsHistory={metricsHistory}
          startDate={startDate}
        />

      </div>
    </div>
  );
}
