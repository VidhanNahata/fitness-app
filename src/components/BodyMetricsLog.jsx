import React, { useState } from 'react';
import { getLocalDateString } from '../utils/dateUtils';
import { 
  Activity, 
  Plus, 
  History, 
  ClipboardList, 
  TrendingDown, 
  HelpCircle,
  TrendingUp,
  Maximize2
} from 'lucide-react';

export default function BodyMetricsLog({ 
  metricsHistory, 
  addMetricsEntry 
}) {
  const [weight, setWeight] = useState('');
  const [bf, setBf] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [notes, setNotes] = useState('');
  const [activeTooltip, setActiveTooltip] = useState(null);

  // Default targets for abs
  const targetBF = 12.0;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!weight || !bf || !chest || !waist || !hip) {
      alert('Please fill out all metric fields!');
      return;
    }

    const entry = {
      date: getLocalDateString(),
      weight: parseFloat(weight),
      bf: parseFloat(bf),
      chest: parseFloat(chest),
      waist: parseFloat(waist),
      hip: parseFloat(hip),
      notes: notes || 'Weekly progression update.'
    };

    addMetricsEntry(entry);
    
    // Reset form
    setWeight('');
    setBf('');
    setChest('');
    setWaist('');
    setHip('');
    setNotes('');

    alert('Weekly weigh-in logged successfully!');
  };

  const startingMetrics = metricsHistory[0] || { weight: 77, bf: 24, chest: 38.5, waist: 34, hip: 39.5, notes: '' };
  const currentMetrics = metricsHistory[metricsHistory.length - 1] || startingMetrics;

  // Calculations for chart sizing
  const svgWidth = 500;
  const svgHeight = 220;
  const paddingLeft = 45;
  const paddingRight = 45;
  const paddingTop = 25;
  const paddingBottom = 30;

  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;

  // Extract weights and BF percentages for plotting
  const dataPoints = metricsHistory.map((d, index) => ({
    week: `W${index + 1}`,
    weight: d.weight,
    bf: d.bf,
    date: d.date,
    waist: d.waist,
    notes: d.notes
  }));

  // Find min/max values for scaling
  const weights = dataPoints.map(d => d.weight);
  const bfs = dataPoints.map(d => d.bf);

  const minWeight = Math.min(...weights, 70) - 1;
  const maxWeight = Math.max(...weights, 78) + 1;
  const minBf = Math.min(...bfs, 12) - 2;
  const maxBf = Math.max(...bfs, 25) + 2;

  // Scaling helper functions
  const getX = (index) => {
    if (dataPoints.length <= 1) return paddingLeft + chartWidth / 2;
    return paddingLeft + (index / (dataPoints.length - 1)) * chartWidth;
  };

  const getYWeight = (val) => {
    const scale = (val - minWeight) / (maxWeight - minWeight);
    return paddingTop + chartHeight - scale * chartHeight;
  };

  const getYBf = (val) => {
    const scale = (val - minBf) / (maxBf - minBf);
    return paddingTop + chartHeight - scale * chartHeight;
  };

  // Generate SVG path for Weight
  const weightPath = dataPoints.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getYWeight(d.weight)}`).join(' ');
  // Generate SVG path for Body Fat
  const bfPath = dataPoints.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getYBf(d.bf)}`).join(' ');

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <span className="text-neon font-mono text-sm tracking-wider uppercase">Vitals Log</span>
        <h1 className="text-2xl font-bold text-dark-textLight mt-1">Body Metrics Log</h1>
        <p className="text-xs text-dark-textMuted mt-1">
          Log measurements every Monday. Track critical metrics like waist circumference to monitor abdominal fat loss.
        </p>
      </div>

      {/* Interactive Line Chart */}
      <div className="bg-dark-card border border-dark-border rounded-3xl p-5 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-dark-textLight flex items-center gap-1.5">
            <Activity size={16} className="text-neon" />
            12-Week Progression Chart
          </h3>
          <div className="flex gap-4 text-xs">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="w-2.5 h-2.5 bg-neon rounded-full"></span> Weight (kg)
            </span>
            <span className="flex items-center gap-1.5 font-bold">
              <span className="w-2.5 h-2.5 bg-dark-textMuted rounded-full border border-dark-border"></span> Body Fat (%)
            </span>
          </div>
        </div>

        {/* SVG Wrapper */}
        <div className="relative">
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible select-none">
            {/* Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
              const y = paddingTop + ratio * chartHeight;
              return (
                <line 
                  key={i} 
                  x1={paddingLeft} 
                  y1={y} 
                  x2={svgWidth - paddingRight} 
                  y2={y} 
                  className="stroke-dark-border/40" 
                  strokeDasharray="4 4"
                />
              );
            })}

            {/* X Axis Labels */}
            {dataPoints.map((d, i) => (
              <text
                key={i}
                x={getX(i)}
                y={svgHeight - paddingBottom + 18}
                className="text-[10px] font-bold font-mono fill-dark-textMuted text-anchor-middle"
                textAnchor="middle"
              >
                {d.week}
              </text>
            ))}

            {/* Left Y Axis (Weight) */}
            <text x={paddingLeft - 8} y={paddingTop + 4} className="text-[9px] font-mono fill-neon" textAnchor="end">
              {maxWeight.toFixed(0)}kg
            </text>
            <text x={paddingLeft - 8} y={paddingTop + chartHeight + 4} className="text-[9px] font-mono fill-neon" textAnchor="end">
              {minWeight.toFixed(0)}kg
            </text>

            {/* Right Y Axis (Body Fat) */}
            <text x={svgWidth - paddingRight + 8} y={paddingTop + 4} className="text-[9px] font-mono fill-dark-textMuted" textAnchor="start">
              {maxBf.toFixed(0)}%
            </text>
            <text x={svgWidth - paddingRight + 8} y={paddingTop + chartHeight + 4} className="text-[9px] font-mono fill-dark-textMuted" textAnchor="start">
              {minBf.toFixed(0)}%
            </text>

            {dataPoints.length > 1 && (
              <>
                {/* Weight Trend Line */}
                <path d={weightPath} fill="none" className="stroke-neon" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* BF Trend Line (Dashed for monochrome B&W readability) */}
                <path d={bfPath} fill="none" className="stroke-dark-textMuted" strokeWidth="2.5" strokeDasharray="4 4" strokeLinecap="round" strokeLinejoin="round" />
              </>
            )}

            {/* Interactive Data Nodes */}
            {dataPoints.map((d, i) => {
              const x = getX(i);
              const yWeight = getYWeight(d.weight);
              const yBf = getYBf(d.bf);
              return (
                <g key={i}>
                  {/* Weight Dot */}
                  <circle
                    cx={x}
                    cy={yWeight}
                    r={activeTooltip === i ? 6 : 4}
                    className="fill-dark-card stroke-neon stroke-2 cursor-pointer transition-all hover:r-6"
                    onClick={() => setActiveTooltip(activeTooltip === i ? null : i)}
                    onMouseEnter={() => setActiveTooltip(i)}
                  />

                  {/* Body Fat Dot */}
                  <circle
                    cx={x}
                    cy={yBf}
                    r={activeTooltip === i ? 6 : 4}
                    className="fill-dark-card stroke-dark-textMuted stroke-2 cursor-pointer transition-all hover:r-6"
                    onClick={() => setActiveTooltip(activeTooltip === i ? null : i)}
                    onMouseEnter={() => setActiveTooltip(i)}
                  />
                </g>
              );
            })}
          </svg>

          {/* Interactive Tooltip Card overlay */}
          {activeTooltip !== null && dataPoints[activeTooltip] && (
            <div className="absolute top-1 left-1/2 -translate-x-1/2 bg-dark-card/95 border border-neon/50 px-4 py-2.5 rounded-2xl text-xs space-y-1 shadow-2xl backdrop-blur-md max-w-[280px]">
              <div className="flex justify-between items-center border-b border-dark-border pb-1 font-bold">
                <span className="text-neon font-mono">{dataPoints[activeTooltip].week} Log</span>
                <span className="text-[10px] text-dark-textMuted font-mono">{dataPoints[activeTooltip].date}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 font-mono pt-1 text-[11px]">
                <span className="text-dark-textMuted">Weight: <strong className="text-dark-textLight">{dataPoints[activeTooltip].weight.toFixed(1)}kg</strong></span>
                <span className="text-dark-textMuted">Body Fat: <strong className="text-dark-textLight">{dataPoints[activeTooltip].bf.toFixed(1)}%</strong></span>
                <span className="text-dark-textMuted">Waist: <strong className="text-dark-textLight">{dataPoints[activeTooltip].waist ? `${dataPoints[activeTooltip].waist}in` : 'N/A'}</strong></span>
              </div>
              {dataPoints[activeTooltip].notes && (
                <p className="text-[10px] text-dark-textMuted italic pt-1 border-t border-dark-border/40 mt-1 leading-tight">
                  "{dataPoints[activeTooltip].notes}"
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Compare Metrics Before/After */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Starting metrics */}
        <div className="bg-dark-card border border-dark-border rounded-3xl p-5 space-y-3">
          <span className="text-[10px] text-neon font-mono uppercase tracking-wider block">Before (Week 1 Baseline)</span>
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-dark-bg/60 p-2.5 rounded-xl border border-dark-border/50">
              <span className="text-dark-textMuted block text-[10px]">Weight</span>
              <strong className="text-dark-textLight text-sm">{startingMetrics.weight.toFixed(1)} kg</strong>
            </div>
            <div className="bg-dark-bg/60 p-2.5 rounded-xl border border-dark-border/50">
              <span className="text-dark-textMuted block text-[10px]">Body Fat %</span>
              <strong className="text-dark-textLight text-sm">{startingMetrics.bf.toFixed(1)} %</strong>
            </div>
            <div className="bg-dark-bg/60 p-2.5 rounded-xl border border-dark-border/50">
              <span className="text-dark-textMuted block text-[10px]">Waist Line</span>
              <strong className="text-dark-textLight text-sm">{startingMetrics.waist.toFixed(1)} in</strong>
            </div>
            <div className="bg-dark-bg/60 p-2.5 rounded-xl border border-dark-border/50">
              <span className="text-dark-textMuted block text-[10px]">Chest/Hip</span>
              <strong className="text-dark-textLight text-sm">{startingMetrics.chest.toFixed(1)}/{startingMetrics.hip.toFixed(1)} in</strong>
            </div>
          </div>
          <p className="text-[11px] text-dark-textMuted italic leading-relaxed">
            "{startingMetrics.notes}"
          </p>
        </div>

        {/* Current metrics */}
        <div className="bg-dark-card border border-dark-border rounded-3xl p-5 space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-neon/5 rounded-full blur-xl pointer-events-none"></div>
          <span className="text-[10px] text-neon font-mono uppercase tracking-wider block">Current Status (Latest Log)</span>
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-dark-bg/60 p-2.5 rounded-xl border border-dark-border/50">
              <span className="text-dark-textMuted block text-[10px]">Weight</span>
              <strong className="text-neon text-sm">{currentMetrics.weight.toFixed(1)} kg</strong>
            </div>
            <div className="bg-dark-bg/60 p-2.5 rounded-xl border border-dark-border/50">
              <span className="text-dark-textMuted block text-[10px]">Body Fat %</span>
              <strong className="text-neon text-sm">{currentMetrics.bf.toFixed(1)} %</strong>
            </div>
            <div className="bg-dark-bg/60 p-2.5 rounded-xl border border-dark-border/50">
              <span className="text-dark-textMuted block text-[10px]">Waist Line</span>
              <strong className="text-neon text-sm">{currentMetrics.waist.toFixed(1)} in</strong>
            </div>
            <div className="bg-dark-bg/60 p-2.5 rounded-xl border border-dark-border/50">
              <span className="text-dark-textMuted block text-[10px]">Chest/Hip</span>
              <strong className="text-neon text-sm">{currentMetrics.chest.toFixed(1)}/{currentMetrics.hip.toFixed(1)} in</strong>
            </div>
          </div>
          <p className="text-[11px] text-dark-textMuted italic leading-relaxed">
            "{currentMetrics.notes}"
          </p>
        </div>
      </div>

      {/* Log Weekly Weight-in Form */}
      <div className="bg-dark-card border border-dark-border rounded-3xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-dark-textLight flex items-center gap-1.5">
          <Plus size={16} className="text-neon" />
          Log Weekly Weigh-In
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {/* Weight */}
            <div>
              <label className="text-[10px] text-dark-textMuted block mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                required
                placeholder="77.0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-dark-bg border border-dark-border focus:border-neon rounded-xl px-3 py-2 text-xs text-dark-textLight focus:outline-none font-mono"
              />
            </div>
            {/* Body Fat % */}
            <div>
              <label className="text-[10px] text-dark-textMuted block mb-1">Body Fat %</label>
              <input
                type="number"
                step="0.1"
                required
                placeholder="24.0"
                value={bf}
                onChange={(e) => setBf(e.target.value)}
                className="w-full bg-dark-bg border border-dark-border focus:border-neon rounded-xl px-3 py-2 text-xs text-dark-textLight focus:outline-none font-mono"
              />
            </div>
            {/* Waist */}
            <div>
              <label className="text-[10px] text-dark-textMuted block mb-1">Waist (in)</label>
              <input
                type="number"
                step="0.1"
                required
                placeholder="34.0"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                className="w-full bg-dark-bg border border-dark-border focus:border-neon rounded-xl px-3 py-2 text-xs text-dark-textLight focus:outline-none font-mono"
              />
            </div>
            {/* Chest */}
            <div>
              <label className="text-[10px] text-dark-textMuted block mb-1">Chest (in)</label>
              <input
                type="number"
                step="0.1"
                required
                placeholder="38.5"
                value={chest}
                onChange={(e) => setChest(e.target.value)}
                className="w-full bg-dark-bg border border-dark-border focus:border-neon rounded-xl px-3 py-2 text-xs text-dark-textLight focus:outline-none font-mono"
              />
            </div>
            {/* Hip */}
            <div className="col-span-2 sm:col-span-1">
              <label className="text-[10px] text-dark-textMuted block mb-1">Hip (in)</label>
              <input
                type="number"
                step="0.1"
                required
                placeholder="39.5"
                value={hip}
                onChange={(e) => setHip(e.target.value)}
                className="w-full bg-dark-bg border border-dark-border focus:border-neon rounded-xl px-3 py-2 text-xs text-dark-textLight focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-dark-textMuted block mb-1">Weekly Notes / Progression Observations</label>
            <textarea
              placeholder="e.g. Feeling lighter. Energy levels high. Posture feels straight. Abs slightly visible under pump."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-dark-bg border border-dark-border focus:border-neon rounded-xl px-3 py-2 text-xs text-dark-textLight focus:outline-none h-16 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-neon text-dark-bg font-extrabold rounded-2xl text-xs hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <ClipboardList size={16} /> Log Entry
          </button>
        </form>
      </div>
    </div>
  );
}
