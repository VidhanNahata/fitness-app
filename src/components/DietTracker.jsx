import React, { useState } from 'react';
import { 
  Droplet, 
  Target,
  Plus, 
  Minus,
  Pill,
  Flame,
  Activity,
  Edit2
} from 'lucide-react';

export default function DietTracker({ 
  todayDate, 
  dietLogs, 
  saveDietLog 
}) {
  const dateStr = todayDate;
  
  // Base default state
  const currentLog = dietLogs[dateStr] || {
    calories: 0,
    target: 2000,
    water: 0,
    supplements: {
      protein: false,
      creatine: false,
      d3k2: false,
      b12: false
    }
  };

  const [inputCalories, setInputCalories] = useState('');
  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [targetInput, setTargetInput] = useState(currentLog.target || 2000);

  // Update calorie target
  const handleSaveTarget = () => {
    const val = parseInt(targetInput) || 2000;
    saveDietLog(dateStr, { ...currentLog, target: val });
    setIsEditingTarget(false);
  };

  // Add calories
  const handleAddCalories = (e) => {
    e.preventDefault();
    const val = parseInt(inputCalories);
    if (!val || val <= 0) return;
    saveDietLog(dateStr, { ...currentLog, calories: (currentLog.calories || 0) + val });
    setInputCalories('');
  };

  // Water increment / decrement
  const updateWater = (amount) => {
    const newWater = Math.max(0, (currentLog.water || 0) + amount);
    saveDietLog(dateStr, { ...currentLog, water: newWater });
  };

  // Toggle supplement
  const handleSuppToggle = (suppId) => {
    const currentSupps = currentLog.supplements || { protein: false, creatine: false, d3k2: false, b12: false };
    saveDietLog(dateStr, {
      ...currentLog,
      supplements: {
        ...currentSupps,
        [suppId]: !currentSupps[suppId]
      }
    });
  };

  const calories = currentLog.calories || 0;
  const target = currentLog.target || 2000;
  const caloriesPct = Math.min(100, Math.round((calories / target) * 100));
  const waterPct = Math.min(100, Math.round(((currentLog.water || 0) / 3500) * 100));
  const currentSupps = currentLog.supplements || {};

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <span className="text-neon font-mono text-sm tracking-wider uppercase">Diet Protocol</span>
        <h1 className="text-2xl font-bold text-dark-textLight mt-1">Calorie & Supplements</h1>
        <p className="text-xs text-dark-textMuted mt-1">
          Set your daily targets, track your calorie intake, and log your essential supplements.
        </p>
      </div>

      {/* Calorie Tracker Card */}
      <div className="bg-dark-card border border-dark-border rounded-3xl p-5 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] text-dark-textMuted font-mono uppercase tracking-wider block">Calorie Intake</span>
            <div className="text-3xl font-extrabold text-dark-textLight font-mono mt-1">
              {calories} <span className="text-sm font-normal text-dark-textMuted">/ {target} kcal</span>
            </div>
          </div>
          <div>
            {isEditingTarget ? (
              <div className="flex items-center gap-2">
                <input 
                  type="number"
                  value={targetInput}
                  onChange={(e) => setTargetInput(e.target.value)}
                  className="w-20 bg-dark-bg border border-dark-border rounded px-2 py-1 text-xs text-dark-textLight outline-none focus:border-neon"
                />
                <button onClick={handleSaveTarget} className="text-xs text-neon font-bold">Save</button>
              </div>
            ) : (
              <button 
                onClick={() => setIsEditingTarget(true)} 
                className="text-[10px] flex items-center gap-1 text-dark-textMuted hover:text-neon transition-colors"
              >
                <Edit2 size={12} /> Edit Target
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-dark-bg h-3 rounded-full overflow-hidden border border-dark-border">
          <div 
            className="bg-neon h-full transition-all duration-500 ease-out" 
            style={{ width: `${caloriesPct}%` }}
          ></div>
        </div>

        {/* Quick Add Form */}
        <form onSubmit={handleAddCalories} className="flex gap-2 pt-2">
          <input 
            type="number"
            placeholder="+ Add Calories..."
            value={inputCalories}
            onChange={(e) => setInputCalories(e.target.value)}
            className="flex-1 bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-sm text-dark-textLight outline-none focus:border-neon transition-colors"
          />
          <button 
            type="submit"
            disabled={!inputCalories}
            className="bg-neon text-dark-bg px-6 rounded-xl font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#a6ff00] transition-colors"
          >
            Add
          </button>
        </form>
      </div>

      {/* Supplements Tracker */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-dark-textLight flex items-center gap-2">
          <Pill size={16} className="text-neon" />
          Daily Supplements
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'protein', name: 'Whey Protein', desc: 'Post-workout / Daily' },
            { id: 'creatine', name: 'Creatine Monohydrate', desc: '5g Daily' },
            { id: 'd3k2', name: 'Vitamin D3 + K2', desc: 'Immunity & Bones' },
            { id: 'b12', name: 'Vitamin B12', desc: 'Energy & Nerves' }
          ].map(supp => (
            <div 
              key={supp.id}
              onClick={() => handleSuppToggle(supp.id)}
              className={`p-3 border rounded-2xl flex flex-col gap-2 cursor-pointer select-none transition-all ${
                currentSupps[supp.id]
                  ? 'bg-neon/5 border-neon/30 shadow-[0_2px_12px_rgba(200,255,0,0.05)]' 
                  : 'bg-dark-card border-dark-border/80 hover:border-dark-border'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg border ${
                  currentSupps[supp.id] ? 'bg-neon/15 text-neon border-neon/25' : 'bg-dark-bg text-dark-textMuted border-dark-border'
                }`}>
                  <Activity size={14} />
                </div>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                  currentSupps[supp.id] ? 'bg-neon border-neon text-dark-bg' : 'border-dark-border text-transparent'
                }`}>
                  <Target size={12} strokeWidth={4} />
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-dark-textLight">{supp.name}</div>
                <div className="text-[9px] text-dark-textMuted mt-0.5">{supp.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Water Intake Tracker */}
      <div className="bg-dark-card border border-dark-border rounded-3xl p-5 flex flex-col sm:flex-row items-center gap-6 justify-between relative overflow-hidden">
        {/* Subtle drop shadow light */}
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-neon/5 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="p-3 bg-dark-accent rounded-2xl text-dark-textLight border border-dark-border shrink-0">
            <Droplet size={20} className="fill-dark-textMuted" />
          </div>
          <div>
            <span className="text-[10px] text-neon font-mono uppercase tracking-wider block">Hydration Goal</span>
            <h3 className="text-lg font-bold text-dark-textLight font-mono">
              {((currentLog.water || 0) / 1000).toFixed(2)}L <span className="text-xs text-dark-textMuted font-sans font-normal">/ 3.50L Target</span>
            </h3>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <button 
            onClick={() => updateWater(-250)}
            className="p-2.5 bg-dark-bg hover:bg-dark-accent border border-dark-border rounded-xl text-dark-textMuted hover:text-dark-textLight transition-all active:scale-90"
          >
            <Minus size={16} />
          </button>
          
          <button 
            onClick={() => updateWater(250)}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-dark-accent/60 hover:bg-dark-accent border border-dark-border text-xs font-bold text-dark-textLight flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <Plus size={16} /> Add 250ml
          </button>
          
          <button 
            onClick={() => updateWater(500)}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-neon text-dark-bg font-extrabold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <Plus size={16} /> Add 500ml
          </button>
        </div>
      </div>

    </div>
  );
}
