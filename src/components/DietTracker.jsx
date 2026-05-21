import React from 'react';
import { VEGETARIAN_MEALS, DIET_TARGETS } from '../utils/presets';
import { 
  Droplet, 
  Flame, 
  Egg, 
  Beef, 
  Apple, 
  Check, 
  Plus, 
  Minus, 
  UtensilsCrossed 
} from 'lucide-react';

export default function DietTracker({ 
  todayDate, 
  dietLogs, 
  saveDietLog 
}) {
  // Fetch current log for this date, or set default
  const dateStr = todayDate;
  const currentLog = dietLogs[dateStr] || {
    meals: {
      breakfast: false,
      mid_morning: false,
      lunch: false,
      pre_workout: false,
      post_workout: false,
      snack: false,
      dinner: false,
      before_bed: false
    },
    water: 0
  };

  // Toggle meal checkbox
  const handleMealToggle = (mealId) => {
    const updatedMeals = {
      ...currentLog.meals,
      [mealId]: !currentLog.meals[mealId]
    };
    saveDietLog(dateStr, {
      ...currentLog,
      meals: updatedMeals
    });
  };

  // Water increment / decrement
  const updateWater = (amount) => {
    const newWater = Math.max(0, currentLog.water + amount);
    saveDietLog(dateStr, {
      ...currentLog,
      water: newWater
    });
  };

  // Calculate current macros based on checked meals
  const totals = VEGETARIAN_MEALS.reduce((acc, meal) => {
    if (currentLog.meals[meal.id]) {
      acc.protein += meal.protein;
      acc.carbs += meal.carbs;
      acc.fat += meal.fat;
      acc.calories += meal.calories;
    }
    return acc;
  }, { protein: 0, carbs: 0, fat: 0, calories: 0 });

  // Get percentage of targets
  const getPercent = (value, target) => Math.min(100, Math.round((value / target) * 100));

  const proteinPct = getPercent(totals.protein, DIET_TARGETS.protein);
  const carbsPct = getPercent(totals.carbs, DIET_TARGETS.carbs);
  const fatPct = getPercent(totals.fat, DIET_TARGETS.fat);
  const caloriesPct = getPercent(totals.calories, DIET_TARGETS.calories);
  const waterPct = getPercent(currentLog.water, 3500); // 3.5L target

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <span className="text-neon font-mono text-sm tracking-wider uppercase">Diet Protocol</span>
        <h1 className="text-2xl font-bold text-dark-textLight mt-1">Vegetarian Nutrition</h1>
        <p className="text-xs text-dark-textMuted mt-1">
          High-protein vegetarian menu designed to drop body fat. Hit 145g protein and stay within 2050 kcal.
        </p>
      </div>

      {/* Calories & Macros Cards */}
      <div className="bg-dark-card border border-dark-border rounded-3xl p-5 space-y-4">
        {/* Calorie Goal Summary */}
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[10px] text-dark-textMuted font-mono uppercase tracking-wider block">Calorie Intake</span>
            <div className="text-3xl font-extrabold text-dark-textLight font-mono">
              {totals.calories} <span className="text-sm font-normal text-dark-textMuted">/ {DIET_TARGETS.calories} kcal</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-neon font-mono font-bold text-sm bg-neon/10 border border-neon/20 px-2 py-0.5 rounded-lg">
              {caloriesPct}% Target
            </span>
          </div>
        </div>

        {/* Calorie Progress Bar */}
        <div className="w-full bg-dark-bg h-3 rounded-full overflow-hidden border border-dark-border">
          <div 
            className="bg-neon h-full transition-all duration-500 ease-out" 
            style={{ width: `${caloriesPct}%` }}
          ></div>
        </div>

        {/* Detailed Macros Progress Grid */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          {/* Protein */}
          <div className="bg-dark-bg/60 border border-dark-border/60 rounded-2xl p-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-dark-textMuted uppercase">Protein</span>
              <div className="text-lg font-bold text-dark-textLight font-mono mt-0.5">
                {totals.protein}g
              </div>
              <span className="text-[10px] text-dark-textMuted block">Target: {DIET_TARGETS.protein}g</span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-[9px] font-mono text-neon font-semibold mb-1">
                <span>Abs</span>
                <span>{proteinPct}%</span>
              </div>
              <div className="w-full bg-dark-card h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-neon h-full transition-all duration-500" 
                  style={{ width: `${proteinPct}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Carbs */}
          <div className="bg-dark-bg/60 border border-dark-border/60 rounded-2xl p-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-dark-textMuted uppercase">Carbs</span>
              <div className="text-lg font-bold text-dark-textLight font-mono mt-0.5">
                {totals.carbs}g
              </div>
              <span className="text-[10px] text-dark-textMuted block">Target: {DIET_TARGETS.carbs}g</span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-[9px] font-mono text-neon font-semibold mb-1">
                <span>Energy</span>
                <span>{carbsPct}%</span>
              </div>
              <div className="w-full bg-dark-card h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-neon h-full transition-all duration-500" 
                  style={{ width: `${carbsPct}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Fat */}
          <div className="bg-dark-bg/60 border border-dark-border/60 rounded-2xl p-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-dark-textMuted uppercase">Fats</span>
              <div className="text-lg font-bold text-dark-textLight font-mono mt-0.5">
                {totals.fat}g
              </div>
              <span className="text-[10px] text-dark-textMuted block">Target: {DIET_TARGETS.fat}g</span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-[9px] font-mono text-neon font-semibold mb-1">
                <span>Hormones</span>
                <span>{fatPct}%</span>
              </div>
              <div className="w-full bg-dark-card h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-neon h-full transition-all duration-500" 
                  style={{ width: `${fatPct}%` }}
                ></div>
              </div>
            </div>
          </div>
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
              {(currentLog.water / 1000).toFixed(2)}L <span className="text-xs text-dark-textMuted font-sans font-normal">/ 3.50L Target</span>
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

      {/* Pre-loaded Meal Checklist */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-dark-textLight flex items-center gap-2">
          <UtensilsCrossed size={16} className="text-neon" />
          Vegetarian Shred Menu Logs
        </h3>

        <div className="space-y-2">
          {VEGETARIAN_MEALS.map(meal => {
            const isChecked = !!currentLog.meals[meal.id];
            return (
              <div 
                key={meal.id}
                onClick={() => handleMealToggle(meal.id)}
                className={`p-4 border rounded-2xl flex items-center justify-between gap-4 cursor-pointer select-none transition-all ${
                  isChecked 
                    ? 'bg-neon/5 border-neon/30 shadow-[0_2px_12px_rgba(200,255,0,0.05)]' 
                    : 'bg-dark-card border-dark-border/80 hover:border-dark-border'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-dark-textLight">{meal.name}</span>
                    <span className="text-[10px] font-mono font-semibold text-neon bg-neon/10 px-1.5 py-0.5 rounded">
                      {meal.calories} kcal
                    </span>
                  </div>
                  <p className="text-xs text-dark-textMuted leading-snug">{meal.description}</p>
                  
                  {/* Small macros details badge */}
                  <div className="flex gap-2.5 text-[9px] font-mono text-dark-textMuted font-medium pt-1">
                    <span>P: <span className="text-dark-textLight font-semibold">{meal.protein}g</span></span>
                    <span>C: <span className="text-dark-textLight font-semibold">{meal.carbs}g</span></span>
                    <span>F: <span className="text-dark-textLight font-semibold">{meal.fat}g</span></span>
                  </div>
                </div>

                {/* Checkbox button */}
                <button
                  type="button"
                  className={`w-7 h-7 rounded-xl flex items-center justify-center border shrink-0 transition-all ${
                    isChecked
                      ? 'bg-neon border-neon text-dark-bg'
                      : 'border-dark-border text-transparent'
                  }`}
                >
                  <Check size={14} strokeWidth={3} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
