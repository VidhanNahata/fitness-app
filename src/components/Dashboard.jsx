import React, { useState, useEffect } from 'react';
import { getQuoteForDay } from '../utils/quotes';
import { WORKOUT_SPLITS } from '../utils/presets';
import { getLocalDateString, parseLocalDate, getWeekdayName } from '../utils/dateUtils';
import { 
  Calendar, 
  Flame, 
  Target, 
  Activity, 
  TrendingDown, 
  CalendarDays, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  Settings
} from 'lucide-react';

export default function Dashboard({ 
  startDate, 
  setStartDate, 
  todayDate, 
  metricsHistory, 
  habitLogs,
  setActiveTab,
  workoutSplits,
  onResetData
}) {
  const [showSettings, setShowSettings] = useState(false);

  // Calculate day of transformation
  const start = parseLocalDate(startDate);
  const today = parseLocalDate(todayDate);
  const diffTime = today - start;
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;
  const dayNum = Math.max(1, Math.min(90, diffDays));
  const completionPercentage = Math.round((dayNum / 90) * 100);

  // Get current day split
  const dayOfWeek = getWeekdayName(todayDate);
  const todaySplit = (workoutSplits && workoutSplits[dayOfWeek]) || WORKOUT_SPLITS[dayOfWeek] || { focus: 'Rest Day', exercises: [] };

  // Current weight and BF% (latest from history or starting presets)
  const currentMetrics = metricsHistory[metricsHistory.length - 1] || { weight: 77.0, bf: 24.0 };
  const initialMetrics = metricsHistory[0] || { weight: 77.0, bf: 24.0 };
  const weightChange = (currentMetrics.weight - initialMetrics.weight).toFixed(1);
  const bfChange = (currentMetrics.bf - initialMetrics.bf).toFixed(1);

  // Calculate streak based on daily habits completed (consecutive days with at least 3 habits completed)
  const calculateStreak = () => {
    let streak = 0;
    
    // Check from today downwards
    let checkDate = parseLocalDate(todayDate);
    
    for (let i = 0; i < 90; i++) {
      const dateStr = getLocalDateString(checkDate);
      const habitsDone = habitLogs[dateStr] ? Object.values(habitLogs[dateStr]).filter(Boolean).length : 0;
      
      // If we did at least 3 habits, count as day complete for streak
      if (habitsDone >= 3) {
        streak++;
      } else {
        // If it's today and 0 habits are done, don't break streak yet, check yesterday
        if (i === 0 && habitsDone === 0) {
          checkDate.setDate(checkDate.getDate() - 1);
          continue;
        }
        break;
      }
      checkDate.setDate(checkDate.getDate() - 1);
    }
    return streak;
  };

  const streak = calculateStreak();
  const quote = getQuoteForDay(dayNum);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format today's date and time
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <span className="text-neon font-mono text-sm tracking-wider uppercase">90-Day Shred Protocol</span>
          <h1 className="text-2xl font-bold text-dark-textLight mt-1">{formattedDate}</h1>
          <p className="text-xs text-dark-textMuted font-mono mt-0.5">Real-time: {formattedTime}</p>
        </div>
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 bg-dark-card border border-dark-border rounded-xl text-dark-textMuted hover:text-neon hover:border-neon transition-all"
          title="Adjust Start Date"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Start Date Settings Panel */}
      {showSettings && (
        <div className="p-4 bg-dark-card border border-neon/30 rounded-2xl animate-fadeIn">
          <h3 className="text-sm font-semibold text-neon flex items-center gap-2 mb-3">
            <CalendarDays size={16} />
            Timeline Settings
          </h3>
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1 w-full">
              <label className="text-xs text-dark-textMuted block mb-1">Transformation Start Date</label>
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-dark-bg border border-dark-border focus:border-neon rounded-xl px-3 py-2 text-sm text-dark-textLight focus:outline-none"
              />
            </div>
            <button 
              onClick={() => setShowSettings(false)}
              className="w-full sm:w-auto px-4 py-2 bg-neon text-dark-bg font-bold rounded-xl text-sm hover:brightness-110 transition-all"
            >
              Save & Apply
            </button>
          </div>
          <p className="text-xs text-dark-textMuted mt-2">
            Tip: Adjust the start date backward (e.g., 15 days ago) to simulate progress and populate charts/history.
          </p>
          {onResetData && (
            <div className="mt-4 pt-4 border-t border-dark-border/60">
              <h4 className="text-xs font-bold text-red-400 mb-1">Reset Application</h4>
              <p className="text-[11px] text-dark-textMuted mb-2.5">
                Want to start over? Clearing the app data resets the timeline, wipes all history logs, and prepares the app for a brand new user.
              </p>
              <button
                onClick={onResetData}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 rounded-xl text-xs font-extrabold text-red-400 transition-all active:scale-95"
              >
                Reset to New User State
              </button>
            </div>
          )}
        </div>
      )}

      {/* Hero Progress Ring and Day Counter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-dark-card border border-dark-border rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Subtle glowing ambient light */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-neon/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-3 text-center sm:text-left z-10">
            <span className="px-3 py-1 bg-neon/10 border border-neon/20 rounded-full text-neon text-xs font-mono font-semibold uppercase">
              Phase {dayNum <= 28 ? '1: Form' : dayNum <= 56 ? '2: Overload' : '3: Shred'}
            </span>
            <h2 className="text-3xl font-extrabold text-dark-textLight tracking-tight">
              Day <span className="text-neon font-mono text-4xl">{dayNum}</span> <span className="text-dark-textMuted text-lg font-normal">of 90</span>
            </h2>
            <p className="text-dark-textMuted text-sm max-w-sm">
              Your goal is to drop from <span className="text-dark-textLight font-semibold">24% to 12-15% body fat</span> and expose clean, visible abs. You are currently {completionPercentage}% of the way there.
            </p>
          </div>

          {/* Visual Progress Ring */}
          <div className="relative flex items-center justify-center shrink-0">
            <svg className="w-32 h-32">
              <circle 
                cx="64" 
                cy="64" 
                r="52" 
                className="stroke-dark-border fill-transparent" 
                strokeWidth="8"
              />
              <circle 
                cx="64" 
                cy="64" 
                r="52" 
                className="stroke-neon fill-transparent transition-all duration-1000 ease-out" 
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 52}
                strokeDashoffset={2 * Math.PI * 52 * (1 - completionPercentage / 100)}
                strokeLinecap="round"
                transform="rotate(-90 64 64)"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-neon font-mono">{completionPercentage}%</span>
              <span className="text-[10px] text-dark-textMuted uppercase font-bold tracking-wider">Done</span>
            </div>
          </div>
        </div>

        {/* Streak & Consistency Card */}
        <div className="bg-dark-card border border-dark-border rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-neon/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center justify-between">
            <span className="text-dark-textMuted text-sm font-semibold">Consistency Streak</span>
            <div className="p-2 bg-neon/10 rounded-xl text-neon border border-neon/20">
              <Flame size={20} className="fill-neon/30 animate-pulse" />
            </div>
          </div>
          <div className="my-4">
            <div className="text-5xl font-black font-mono text-dark-textLight flex items-baseline gap-1">
              {streak}
              <span className="text-lg font-medium text-dark-textMuted font-sans">days</span>
            </div>
            <p className="text-xs text-dark-textMuted mt-1">
              Earned by ticking off at least 3 habits daily. Keep the chain going!
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('habits')}
            className="w-full py-2 bg-dark-bg hover:bg-dark-accent border border-dark-border rounded-xl text-xs font-semibold text-dark-textLight flex items-center justify-center gap-1 hover:border-neon transition-all"
          >
            Track Habits <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Weight Card */}
        <div className="bg-dark-card border border-dark-border rounded-2xl p-4">
          <div className="flex justify-between items-center text-dark-textMuted text-xs font-medium mb-2">
            <span>Weight</span>
            <Activity size={16} className="text-neon" />
          </div>
          <div className="text-2xl font-bold text-dark-textLight font-mono">
            {currentMetrics.weight.toFixed(1)} <span className="text-sm font-normal text-dark-textMuted">kg</span>
          </div>
          <div className="text-[10px] mt-1 flex items-center gap-1 font-semibold">
            {weightChange <= 0 ? (
              <span className="text-neon flex items-center gap-0.5"><TrendingDown size={12} /> {weightChange} kg</span>
            ) : (
              <span className="text-red-400 flex items-center gap-0.5"><TrendingUp size={12} /> +{weightChange} kg</span>
            )}
            <span className="text-dark-textMuted">from start</span>
          </div>
        </div>

        {/* Body Fat Card */}
        <div className="bg-dark-card border border-dark-border rounded-2xl p-4">
          <div className="flex justify-between items-center text-dark-textMuted text-xs font-medium mb-2">
            <span>Est. Body Fat</span>
            <Target size={16} className="text-neon" />
          </div>
          <div className="text-2xl font-bold text-dark-textLight font-mono">
            {currentMetrics.bf.toFixed(1)} <span className="text-sm font-normal text-dark-textMuted">%</span>
          </div>
          <div className="text-[10px] mt-1 flex items-center gap-1 font-semibold">
            {bfChange <= 0 ? (
              <span className="text-neon flex items-center gap-0.5"><TrendingDown size={12} /> {bfChange}%</span>
            ) : (
              <span className="text-red-400 flex items-center gap-0.5"><TrendingUp size={12} /> +{bfChange}%</span>
            )}
            <span className="text-dark-textMuted">from start</span>
          </div>
        </div>

        {/* Waist Measurement Card */}
        <div className="bg-dark-card border border-dark-border rounded-2xl p-4">
          <div className="flex justify-between items-center text-dark-textMuted text-xs font-medium mb-2">
            <span>Waist Size</span>
            <Activity size={16} className="text-neon" />
          </div>
          <div className="text-2xl font-bold text-dark-textLight font-mono">
            {currentMetrics.waist?.toFixed(1) || '34.0'} <span className="text-sm font-normal text-dark-textMuted">in</span>
          </div>
          <div className="text-[10px] text-dark-textMuted mt-1">
            Abs reveal target: &lt;30 in
          </div>
        </div>

        {/* Target BF Card */}
        <div className="bg-dark-card border border-dark-border rounded-2xl p-4">
          <div className="flex justify-between items-center text-dark-textMuted text-xs font-medium mb-2">
            <span>Fat Loss Goal</span>
            <Target size={16} className="text-neon" />
          </div>
          <div className="text-2xl font-bold text-neon font-mono">
            12-15 <span className="text-sm font-normal text-dark-textMuted">%</span>
          </div>
          <div className="text-[10px] text-dark-textMuted mt-1">
            Current: {((currentMetrics.bf - 12)).toFixed(1)}% to abs limit
          </div>
        </div>
      </div>

      {/* Today's Focus split card */}
      <div className="bg-dark-card border border-dark-border rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-neon/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs text-dark-textMuted font-mono uppercase tracking-wider block">Today's Workout Target</span>
            <h3 className="text-xl font-bold text-dark-textLight flex items-center gap-2">
              <Calendar size={20} className="text-neon" />
              {dayOfWeek} Split: <span className="text-neon">{todaySplit.focus}</span>
            </h3>
            <p className="text-sm text-dark-textMuted">
              {todaySplit.exercises.length > 0 
                ? `${todaySplit.exercises.length} key exercises preloaded with progressive overload suggestor.` 
                : 'Rest and focus on full recovery, stretching, and nutrition targets.'
              }
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('workout')}
            className="px-5 py-3 bg-neon text-dark-bg font-bold rounded-2xl text-sm flex items-center justify-center gap-1 hover:brightness-110 active:scale-95 transition-all self-start sm:self-center shrink-0"
          >
            Start Workout <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="bg-dark-card border border-dark-border rounded-3xl p-6 flex items-start gap-4">
        <div className="p-3 bg-neon/10 rounded-2xl text-neon border border-neon/20 shrink-0">
          <Sparkles size={20} />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase text-neon tracking-wider">Transformation Spark</span>
          <p className="text-dark-textLight font-medium italic text-base leading-relaxed">
            "{quote}"
          </p>
        </div>
      </div>
    </div>
  );
}
