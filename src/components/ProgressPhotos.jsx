import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Sparkles, AlertCircle, ArrowLeftRight, HelpCircle } from 'lucide-react';

export default function ProgressPhotos({ 
  photosHistory, 
  savePhotosEntry 
}) {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [compareWeekA, setCompareWeekA] = useState(1);
  const [compareWeekB, setCompareWeekB] = useState(1);
  const [compareAngle, setCompareAngle] = useState('front'); // 'front' | 'side' | 'back'

  // Compress image helper using canvas
  const handlePhotoUpload = (e, angle) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Target dimensions for extreme compression while keeping visibility
        const maxW = 350;
        const maxH = 350;
        let w = img.width;
        let h = img.height;

        if (w > h) {
          if (w > maxW) {
            h = Math.round((h * maxW) / w);
            w = maxW;
          }
        } else {
          if (h > maxH) {
            w = Math.round((w * maxH) / h);
            h = maxH;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);

        // Export as JPEG with 0.65 quality (highly compressed)
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.65);
        savePhotosEntry(selectedWeek, angle, compressedBase64);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Find photos for a given week
  const getWeekPhotos = (weekNum) => {
    return photosHistory.find(p => p.week === weekNum) || {
      week: weekNum,
      front: null,
      side: null,
      back: null
    };
  };

  const currentWeekPhotos = getWeekPhotos(selectedWeek);
  const weekAPhotos = getWeekPhotos(compareWeekA);
  const weekBPhotos = getWeekPhotos(compareWeekB);

  // Available weeks in dropdowns (up to week 12)
  const weeksList = Array.from({ length: 12 }, (_, i) => i + 1);

  // Stylized Vector SVG Silhouettes for default templates
  const Silhouette = ({ angle }) => {
    if (angle === 'front') {
      return (
        <svg viewBox="0 0 100 120" className="w-full h-full stroke-neon/30 fill-none opacity-40">
          {/* Head & Neck */}
          <circle cx="50" cy="20" r="8" strokeWidth="1.5" />
          <path d="M 47 28 L 47 33 M 53 28 L 53 33" strokeWidth="1.5" />
          {/* Torso Outline */}
          <path d="M 35 38 C 42 35, 58 35, 65 38 C 65 50, 62 70, 58 85 C 55 90, 45 90, 42 85 C 38 70, 35 50, 35 38 Z" strokeWidth="1.5" />
          {/* Shoulders / Arms */}
          <path d="M 35 38 C 28 42, 28 65, 30 75" strokeWidth="1.5" />
          <path d="M 65 38 C 72 42, 72 65, 70 75" strokeWidth="1.5" />
          {/* Chest lines */}
          <path d="M 38 48 C 45 52, 55 52, 62 48" strokeWidth="1.5" />
          <line x1="50" y1="36" x2="50" y2="78" strokeWidth="1" strokeDasharray="2 2" />
          {/* Abdominal Outline (Grid of six pack) */}
          <path d="M 44 60 C 47 61, 53 61, 56 60 M 44 66 C 47 67, 53 67, 56 66 M 44 72 C 47 73, 53 73, 56 72" strokeWidth="1" />
          <text x="50" y="112" className="text-[7px] font-mono text-neon/40 text-center" textAnchor="middle" fill="currentColor">FRONT POSE</text>
        </svg>
      );
    }
    if (angle === 'side') {
      return (
        <svg viewBox="0 0 100 120" className="w-full h-full stroke-neon/30 fill-none opacity-40">
          {/* Head & Spine Curve */}
          <circle cx="48" cy="20" r="8" strokeWidth="1.5" />
          {/* Posture alignment target spine curve */}
          <path d="M 48 28 C 43 38, 48 55, 45 80 C 42 95, 46 100, 45 105" strokeWidth="1.5" />
          {/* Side Torso Outline */}
          <path d="M 44 33 C 55 35, 60 48, 55 60 C 52 66, 45 75, 45 85 Z" strokeWidth="1.5" />
          {/* Chest contour */}
          <path d="M 52 40 C 60 44, 58 50, 52 54" strokeWidth="1.5" />
          {/* Posture alignment guideline (plumb line) */}
          <line x1="50" y1="8" x2="50" y2="108" className="stroke-neon/15" strokeWidth="1" strokeDasharray="3 3" />
          <text x="50" y="112" className="text-[7px] font-mono text-neon/40 text-center" textAnchor="middle" fill="currentColor">SIDE POSE</text>
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 100 120" className="w-full h-full stroke-neon/30 fill-none opacity-40">
        {/* Head & Neck */}
        <circle cx="50" cy="20" r="8" strokeWidth="1.5" />
        <path d="M 47 28 L 47 33 M 53 28 L 53 33" strokeWidth="1.5" />
        {/* V-Taper Back Torso Outline */}
        <path d="M 33 38 C 42 35, 58 35, 67 38 C 65 52, 60 72, 57 85 C 55 88, 45 88, 43 85 C 40 72, 35 52, 33 38 Z" strokeWidth="1.5" />
        {/* Traps & Shoulders */}
        <path d="M 33 38 C 42 43, 58 43, 67 38" strokeWidth="1.5" />
        {/* Lats wings lines */}
        <path d="M 38 46 C 44 58, 50 64, 46 76" strokeWidth="1" />
        <path d="M 62 46 C 56 58, 50 64, 54 76" strokeWidth="1" />
        <line x1="50" y1="36" x2="50" y2="85" strokeWidth="1.5" />
        <text x="50" y="112" className="text-[7px] font-mono text-neon/40 text-center" textAnchor="middle" fill="currentColor">BACK POSE</text>
      </svg>
    );
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <span className="text-neon font-mono text-sm tracking-wider uppercase">Visual Logs</span>
        <h1 className="text-2xl font-bold text-dark-textLight mt-1">Progress Photos</h1>
        <p className="text-xs text-dark-textMuted mt-1">
          Take weekly photos in identical lighting and posture. Images are compressed automatically to keep localStorage usage small.
        </p>
      </div>

      {/* Week Photo Selector / Upload */}
      <div className="bg-dark-card border border-dark-border rounded-3xl p-5 space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-xs text-dark-textMuted font-semibold">Select Week to View/Upload</label>
          <select 
            value={selectedWeek} 
            onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
            className="bg-dark-bg border border-dark-border focus:border-neon text-xs font-bold text-dark-textLight rounded-xl px-3 py-1.5 focus:outline-none"
          >
            {weeksList.map(w => (
              <option key={w} value={w}>Week {w}</option>
            ))}
          </select>
        </div>

        {/* Upload grid */}
        <div className="grid grid-cols-3 gap-3">
          {/* Front Angle */}
          <div className="space-y-2">
            <span className="text-[10px] text-dark-textMuted font-mono uppercase tracking-wider block text-center">Front Angle</span>
            <div className="aspect-[3/4] bg-dark-bg border border-dark-border rounded-2xl relative overflow-hidden flex flex-col items-center justify-center p-2 group">
              {currentWeekPhotos.front ? (
                <img 
                  src={currentWeekPhotos.front} 
                  alt={`Week ${selectedWeek} Front`} 
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <Silhouette angle="front" />
              )}
              <label className="absolute bottom-2 right-2 p-2 bg-dark-card/90 border border-dark-border hover:border-neon text-dark-textMuted hover:text-neon rounded-xl cursor-pointer transition-all active:scale-90">
                <Camera size={14} />
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handlePhotoUpload(e, 'front')} 
                  className="hidden" 
                />
              </label>
            </div>
          </div>

          {/* Side Angle */}
          <div className="space-y-2">
            <span className="text-[10px] text-dark-textMuted font-mono uppercase tracking-wider block text-center">Side Angle</span>
            <div className="aspect-[3/4] bg-dark-bg border border-dark-border rounded-2xl relative overflow-hidden flex flex-col items-center justify-center p-2 group">
              {currentWeekPhotos.side ? (
                <img 
                  src={currentWeekPhotos.side} 
                  alt={`Week ${selectedWeek} Side`} 
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <Silhouette angle="side" />
              )}
              <label className="absolute bottom-2 right-2 p-2 bg-dark-card/90 border border-dark-border hover:border-neon text-dark-textMuted hover:text-neon rounded-xl cursor-pointer transition-all active:scale-90">
                <Camera size={14} />
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handlePhotoUpload(e, 'side')} 
                  className="hidden" 
                />
              </label>
            </div>
          </div>

          {/* Back Angle */}
          <div className="space-y-2">
            <span className="text-[10px] text-dark-textMuted font-mono uppercase tracking-wider block text-center">Back Angle</span>
            <div className="aspect-[3/4] bg-dark-bg border border-dark-border rounded-2xl relative overflow-hidden flex flex-col items-center justify-center p-2 group">
              {currentWeekPhotos.back ? (
                <img 
                  src={currentWeekPhotos.back} 
                  alt={`Week ${selectedWeek} Back`} 
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <Silhouette angle="back" />
              )}
              <label className="absolute bottom-2 right-2 p-2 bg-dark-card/90 border border-dark-border hover:border-neon text-dark-textMuted hover:text-neon rounded-xl cursor-pointer transition-all active:scale-90">
                <Camera size={14} />
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handlePhotoUpload(e, 'back')} 
                  className="hidden" 
                />
              </label>
            </div>
          </div>
        </div>

        <div className="bg-dark-bg/60 p-3 rounded-2xl border border-dark-border/40 flex gap-2 items-start text-[10px] text-dark-textMuted leading-relaxed">
          <AlertCircle size={14} className="text-neon shrink-0 mt-0.5" />
          <span>
            Adding files replaces the current photo for Week {selectedWeek}. Photos remain stored in your local browser cache.
          </span>
        </div>
      </div>

      {/* Side-by-Side Comparison Slider */}
      <div className="bg-dark-card border border-dark-border rounded-3xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-dark-textLight flex items-center gap-1.5">
          <ArrowLeftRight size={16} className="text-neon" />
          Side-by-Side Comparison (Timeline)
        </h3>

        {/* Compare Controls */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-[9px] text-dark-textMuted block mb-1">Week A (Baseline)</label>
            <select
              value={compareWeekA}
              onChange={(e) => setCompareWeekA(parseInt(e.target.value))}
              className="w-full bg-dark-bg border border-dark-border text-xs font-bold text-dark-textLight rounded-xl px-2.5 py-1.5 focus:outline-none"
            >
              {weeksList.map(w => (
                <option key={w} value={w}>Week {w}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[9px] text-dark-textMuted block mb-1">Week B (Current)</label>
            <select
              value={compareWeekB}
              onChange={(e) => setCompareWeekB(parseInt(e.target.value))}
              className="w-full bg-dark-bg border border-dark-border text-xs font-bold text-dark-textLight rounded-xl px-2.5 py-1.5 focus:outline-none"
            >
              {weeksList.map(w => (
                <option key={w} value={w}>Week {w}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[9px] text-dark-textMuted block mb-1">Angle View</label>
            <select
              value={compareAngle}
              onChange={(e) => setCompareAngle(e.target.value)}
              className="w-full bg-dark-bg border border-dark-border text-xs font-bold text-dark-textLight rounded-xl px-2.5 py-1.5 focus:outline-none"
            >
              <option value="front">Front Angle</option>
              <option value="side">Side Angle</option>
              <option value="back">Back Angle</option>
            </select>
          </div>
        </div>

        {/* Compare Display */}
        <div className="grid grid-cols-2 gap-4">
          {/* Week A Card */}
          <div className="space-y-2">
            <span className="text-[10px] text-neon font-mono uppercase tracking-wider block text-center">Week {compareWeekA}</span>
            <div className="aspect-[3/4] bg-dark-bg border border-dark-border rounded-2xl relative overflow-hidden flex items-center justify-center p-2">
              {weekAPhotos[compareAngle] ? (
                <img 
                  src={weekAPhotos[compareAngle]} 
                  alt={`Week ${compareWeekA} comparison`} 
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="text-center p-2 text-dark-textMuted">
                  <Silhouette angle={compareAngle} />
                  <span className="text-[9px] block mt-1">No Image</span>
                </div>
              )}
            </div>
          </div>

          {/* Week B Card */}
          <div className="space-y-2">
            <span className="text-[10px] text-neon font-mono uppercase tracking-wider block text-center">Week {compareWeekB}</span>
            <div className="aspect-[3/4] bg-dark-bg border border-dark-border rounded-2xl relative overflow-hidden flex items-center justify-center p-2">
              {weekBPhotos[compareAngle] ? (
                <img 
                  src={weekBPhotos[compareAngle]} 
                  alt={`Week ${compareWeekB} comparison`} 
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="text-center p-2 text-dark-textMuted">
                  <Silhouette angle={compareAngle} />
                  <span className="text-[9px] block mt-1">No Image</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
