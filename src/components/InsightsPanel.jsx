import React, { useState } from 'react';
import { TIPS_LIBRARY, WEEK_SPECIFIC_ADVICE } from '../utils/presets';
import { 
  Sparkles, 
  Flame, 
  ShieldAlert, 
  Lightbulb, 
  CheckCircle,
  HelpCircle,
  Dumbbell,
  Target
} from 'lucide-react';

export default function InsightsPanel({ todayDate, startDate }) {
  const [activeTipTab, setActiveTipTab] = useState(0);

  // Calculate current week of transformation
  const start = new Date(startDate);
  const today = new Date(todayDate);
  const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1;
  const currentWeek = Math.max(1, Math.min(13, Math.ceil(diffDays / 7)));

  // Helper to determine if a phase matches the current week
  const getPhaseHighlight = (phaseIndex) => {
    if (phaseIndex === 0 && currentWeek >= 1 && currentWeek <= 4) return 'border-neon bg-neon/5 ring-1 ring-neon/20';
    if (phaseIndex === 1 && currentWeek >= 5 && currentWeek <= 8) return 'border-neon bg-neon/5 ring-1 ring-neon/20';
    if (phaseIndex === 2 && currentWeek >= 9 && currentWeek <= 12) return 'border-neon bg-neon/5 ring-1 ring-neon/20';
    return 'border-dark-border bg-dark-bg/40 opacity-70';
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <span className="text-neon font-mono text-sm tracking-wider uppercase">Strategic Counsel</span>
        <h1 className="text-2xl font-bold text-dark-textLight mt-1">Insights & Tips</h1>
        <p className="text-xs text-dark-textMuted mt-1">
          Review advice tailored specifically to your body fat targets, posture objectives, and vegetarian diet.
        </p>
      </div>

      {/* Interactive Tabs for Target Areas */}
      <div className="bg-dark-card border border-dark-border rounded-3xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-dark-textLight flex items-center gap-1.5">
          <Lightbulb size={16} className="text-neon" />
          Targeted Advice
        </h3>

        {/* Tip selector tabs */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar border-b border-dark-border pb-3">
          {TIPS_LIBRARY.map((tip, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTipTab(idx)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold shrink-0 transition-all ${
                activeTipTab === idx 
                  ? 'bg-neon/15 text-neon border border-neon/25' 
                  : 'text-dark-textMuted hover:text-dark-textLight hover:bg-dark-bg border border-transparent'
              }`}
            >
              {tip.category}
            </button>
          ))}
        </div>

        {/* Display selected tip */}
        <div className="space-y-2 animate-fadeIn">
          <h4 className="font-extrabold text-dark-textLight text-sm text-neon flex items-center gap-1">
            <Sparkles size={14} />
            {TIPS_LIBRARY[activeTipTab].title}
          </h4>
          <p className="text-xs text-dark-textMuted leading-relaxed pt-1">
            {TIPS_LIBRARY[activeTipTab].content}
          </p>
        </div>
      </div>

      {/* Program Timeline Phases */}
      <div className="bg-dark-card border border-dark-border rounded-3xl p-5 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-dark-textLight flex items-center gap-1.5">
            <Target size={16} className="text-neon" />
            90-Day Timeline Guide
          </h3>
          <span className="text-[10px] text-neon font-mono font-bold bg-neon/10 border border-neon/20 px-2 py-0.5 rounded-full">
            Week {currentWeek} of 13
          </span>
        </div>

        {/* Timeline Steps */}
        <div className="space-y-3">
          {WEEK_SPECIFIC_ADVICE.map((phase, idx) => {
            const isCurrentPhase = 
              (idx === 0 && currentWeek >= 1 && currentWeek <= 4) ||
              (idx === 1 && currentWeek >= 5 && currentWeek <= 8) ||
              (idx === 2 && currentWeek >= 9 && currentWeek <= 12);

            return (
              <div 
                key={idx} 
                className={`p-4 border rounded-2xl transition-all relative ${getPhaseHighlight(idx)}`}
              >
                {/* Active Phase Badge */}
                {isCurrentPhase && (
                  <span className="absolute -top-2.5 right-4 bg-neon text-dark-bg text-[8px] font-black font-mono uppercase px-2 py-0.5 rounded-full shadow-[0_2px_10px_rgba(200,255,0,0.3)] flex items-center gap-0.5">
                    <Flame size={8} className="fill-current" /> Active Phase
                  </span>
                )}

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold font-mono text-neon bg-neon/10 px-1.5 py-0.5 rounded">
                      {phase.weeks}
                    </span>
                    <h4 className="text-xs font-extrabold text-dark-textLight">{phase.phase}</h4>
                  </div>
                  <p className="text-xs text-dark-textMuted leading-relaxed pt-1">
                    {phase.advice}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
