const fs = require('fs');
const path = require('path');

// Mock browser/import environments for Node
global.React = { useState: () => {}, useEffect: () => {}, useRef: () => {} };

// Read presets.js
const presetsContent = fs.readFileSync('src/utils/presets.js', 'utf8');
// Clean exports for evaluation
const cleanPresets = presetsContent
  .replace(/export const/g, 'const')
  .replace(/import .*/g, '');
const presetsEval = new Function(cleanPresets + '\nreturn { WORKOUT_SPLITS };')();
const { WORKOUT_SPLITS } = presetsEval;

// Get all daily exercises
const dailyExercises = new Set();
for (const day of Object.values(WORKOUT_SPLITS)) {
  for (const ex of day.exercises) {
    dailyExercises.add(ex.name);
  }
}

console.log('--- DAILY PRESET EXERCISES (28 total) ---');
console.log(Array.from(dailyExercises));
console.log('Total unique preset exercises:', dailyExercises.size);

// Read ExerciseVisualizer.jsx to extract EXERCISE_GUIDES
const visualizerContent = fs.readFileSync('src/components/ExerciseVisualizer.jsx', 'utf8');
// Extract the EXERCISE_GUIDES object
const startIdx = visualizerContent.indexOf('export const EXERCISE_GUIDES = {');
if (startIdx === -1) {
  console.error('Could not find EXERCISE_GUIDES in ExerciseVisualizer.jsx');
  process.exit(1);
}

// Simple parsing using regex/eval or sub-string evaluation
const endIdx = visualizerContent.indexOf('export default function ExerciseVisualizer');
const guidesSub = visualizerContent.substring(startIdx, endIdx);
const cleanGuides = guidesSub
  .replace('export const EXERCISE_GUIDES =', 'const EXERCISE_GUIDES =')
  .replace(/import .*/g, '');

const guidesEval = new Function(cleanGuides + '\nreturn { EXERCISE_GUIDES };')();
const { EXERCISE_GUIDES } = guidesEval;

console.log('\n--- ANALYZING ALTERNATIVES ---');
let overlapCount = 0;
let totalExercises = 0;

for (const [name, guide] of Object.entries(EXERCISE_GUIDES)) {
  totalExercises++;
  const alternatives = guide.alternatives || [];
  const overlaps = alternatives.filter(alt => dailyExercises.has(alt));
  
  if (overlaps.length > 0) {
    console.log(`[OVERLAP] "${name}" has daily presets in alternatives:`, overlaps);
    overlapCount += overlaps.length;
  }
  
  if (alternatives.length < 2) {
    console.log(`[FEW ALTS] "${name}" has less than 2 alternatives:`, alternatives);
  }
  
  // Check if alternative exists in EXERCISE_GUIDES
  for (const alt of alternatives) {
    if (!EXERCISE_GUIDES[alt]) {
      console.log(`[MISSING GUIDE] Alternative "${alt}" of exercise "${name}" is not defined in EXERCISE_GUIDES!`);
    }
  }
}

console.log(`\nAnalysis complete. Found ${overlapCount} overlapping alternative exercises.`);
