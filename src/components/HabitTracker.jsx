import React from 'react';
import { HABITS_LIST } from '../utils/presets';
import { getLocalDateString, parseLocalDate } from '../utils/dateUtils';
import { 
  CalendarDays, 
  Flame, 
  Check,
  Moon, 
  Droplet, 
  Sparkles, 
  ShieldAlert, 
  FlameKindling, 
  Footprints,
  HelpCircle
} from 'lucide-react';

// Maps preset icon names to Lucide icons
const IconMap = {
  ShieldAlert: ShieldAlert,
  Moon: Moon,
  Sparkles: Sparkles,
  Droplet: Droplet,
  FlameKindling: FlameKindling,
  Footprints: Footprints
};

export default function HabitTracker({ 
  startDate, 
  todayDate, 
  habitLogs, 
  saveHabitLog 
}) {
  const dateStr = todayDate;
  const currentLog = habitLogs[dateStr] || {};

  // Toggle habit check state
  const handleHabitToggle = (habitId) => {
    const updatedLog = {
      ...currentLog,
      [habitId]: !currentLog[habitId]
    };
    saveHabitLog(dateStr, updatedLog);
  };

  // Calculate streak for a specific habit
  const getHabitStreak = (habitId) => {
    let streak = 0;
    let checkDate = parseLocalDate(todayDate);
    
    for (let i = 0; i < 90; i++) {
      const dayStr = getLocalDateString(checkDate);
      const isDone = habitLogs[dayStr] && habitLogs[dayStr][habitId];
      
      if (isDone) {
        streak++;
      } else {
        // If it's today and not done, don't break streak yet; check yesterday
        if (i === 0) {
          checkDate.setDate(checkDate.getDate() - 1);
          continue;
        }
        break;
      }
      checkDate.setDate(checkDate.getDate() - 1);
    }
    return streak;
  };

  // Generate 90-day grid data for heatmap
  const getHeatmapData = () => {
    const daysData = [];
    const start = parseLocalDate(startDate);
    
    // Find the Monday preceding the start date to align the columns properly like GitHub
    const startDay = start.getDay(); // 0 is Sunday, 1 is Monday
    const offset = startDay === 0 ? 6 : startDay - 1; // days to subtract to get to Monday
    
    const alignStartDate = new Date(start.getTime());
    alignStartDate.setDate(alignStartDate.getDate() - offset);

    // Create 13 weeks * 7 days = 91 cells
    for (let i = 0; i < 91; i++) {
      const cellDate = new Date(alignStartDate.getTime());
      cellDate.setDate(alignStartDate.getDate() + i);
      const cellDateStr = getLocalDateString(cellDate);
      
      // Calculate how many habits completed on this date
      const habitsDone = habitLogs[cellDateStr] 
        ? Object.values(habitLogs[cellDateStr]).filter(Boolean).length 
        : 0;
      
      // Is this date within our 90-day transformation?
      const diffTime = cellDate - start;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
      const isWithinTransformation = diffDays >= 1 && diffDays <= 90;

      daysData.push({
        date: cellDateStr,
        dayNum: diffDays,
        habitsDone,
        active: isWithinTransformation,
        isToday: cellDateStr === todayDate
      });
    }
    return daysData;
  };

  const heatmapCells = getHeatmapData();

  // Helper to color heatmap cells
  const getCellBg = (cell) => {
    if (!cell.active) return 'bg-[#0c0c0c] border-transparent opacity-20';
    if (cell.habitsDone === 0) return 'bg-dark-accent border-dark-border/40';
    if (cell.habitsDone <= 2) return 'bg-neon/20 border-neon/10';
    if (cell.habitsDone <= 4) return 'bg-neon/50 border-neon/20';
    return 'bg-neon border-neon text-dark-bg font-bold'; // full completions
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <span className="text-neon font-mono text-sm tracking-wider uppercase">Consistency Audit</span>
        <h1 className="text-2xl font-bold text-dark-textLight mt-1">Daily Habit Tracker</h1>
        <p className="text-xs text-dark-textMuted mt-1">
          Perform these 6 crucial daily routines. Tracking habits builds discipline, corrects posture, and guarantees your 90-day core results.
        </p>
      </div>

      {/* GitHub Contributions-style Heatmap */}
      <div className="bg-dark-card border border-dark-border rounded-3xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-dark-textLight flex items-center gap-1.5">
          <CalendarDays size={16} className="text-neon" />
          90-Day Habit Heatmap
        </h3>

        {/* Heatmap Grid */}
        <div className="flex flex-col space-y-2">
          {/* Heatmap grid scroll wrapper for mobile */}
          <div className="overflow-x-auto no-scrollbar">
            <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[340px] pb-1 select-none">
              {heatmapCells.map((cell, index) => {
                const titleText = `${cell.date}${cell.active ? ` (Day ${cell.dayNum}): ${cell.habitsDone}/6 habits done` : ' (Out of Range)'}`;
                return (
                  <div
                    key={index}
                    title={titleText}
                    className={`w-6 h-6 rounded-md border flex items-center justify-center text-[9px] transition-all ${getCellBg(cell)} ${
                      cell.isToday ? 'ring-2 ring-neon/60 scale-105' : ''
                    }`}
                  >
                    {cell.active && cell.habitsDone > 0 && (
                      <span className={cell.habitsDone >= 5 ? 'text-dark-bg font-extrabold' : 'text-neon font-bold'}>
                        {cell.habitsDone}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Map legend */}
          <div className="flex justify-between items-center text-[10px] text-dark-textMuted pt-1 font-semibold">
            <span className="font-mono">Week 1 → Week 13</span>
            <div className="flex items-center gap-1">
              <span>Less</span>
              <div className="w-3.5 h-3.5 rounded bg-dark-accent border border-dark-border"></div>
              <div className="w-3.5 h-3.5 rounded bg-neon/20 border border-neon/10"></div>
              <div className="w-3.5 h-3.5 rounded bg-neon/50 border border-neon/20"></div>
              <div className="w-3.5 h-3.5 rounded bg-neon border border-neon"></div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      {/* Habits Checklist */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-dark-textLight">Daily Checklist</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {HABITS_LIST.map(habit => {
            const isChecked = !!currentLog[habit.id];
            const streak = getHabitStreak(habit.id);
            const HabitIcon = IconMap[habit.icon] || HelpCircle;

            return (
              <div
                key={habit.id}
                onClick={() => handleHabitToggle(habit.id)}
                className={`p-4 border rounded-2xl flex items-center justify-between gap-4 cursor-pointer select-none transition-all ${
                  isChecked
                    ? 'bg-neon/5 border-neon/30 shadow-[0_2px_12px_rgba(200,255,0,0.05)]'
                    : 'bg-dark-card border-dark-border/80 hover:border-dark-border'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border shrink-0 ${
                    isChecked 
                      ? 'bg-neon/15 text-neon border-neon/25' 
                      : 'bg-dark-bg text-dark-textMuted border-dark-border'
                  }`}>
                    <HabitIcon size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-dark-textLight block">{habit.name}</span>
                    <span className="text-[10px] text-dark-textMuted flex items-center gap-1 font-medium mt-0.5">
                      <Flame size={12} className={streak > 0 ? 'text-neon fill-neon/20' : 'text-dark-textMuted'} />
                      Streak: <strong className={streak > 0 ? 'text-neon' : 'text-dark-textMuted'}>{streak} days</strong>
                    </span>
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
