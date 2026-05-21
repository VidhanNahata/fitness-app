const fs = require('fs');

// Mock React
global.React = { useState: () => {}, useEffect: () => {}, useRef: () => {} };

// Read presets.js
const presetsContent = fs.readFileSync('src/utils/presets.js', 'utf8');
const cleanPresets = presetsContent
  .replace(/export const/g, 'const')
  .replace(/import .*/g, '');
const presetsEval = new Function(cleanPresets + '\nreturn { WORKOUT_SPLITS };')();
const { WORKOUT_SPLITS } = presetsEval;

const dailyExercises = new Set();
for (const day of Object.values(WORKOUT_SPLITS)) {
  for (const ex of day.exercises) {
    dailyExercises.add(ex.name);
  }
}

// Read ExerciseVisualizer.jsx
const visualizerContent = fs.readFileSync('src/components/ExerciseVisualizer.jsx', 'utf8');
const startIdx = visualizerContent.indexOf('export const EXERCISE_GUIDES = {');
if (startIdx === -1) {
  console.error('Could not find EXERCISE_GUIDES in ExerciseVisualizer.jsx');
  process.exit(1);
}

const endIdx = visualizerContent.indexOf('export default function ExerciseVisualizer');
const guidesSub = visualizerContent.substring(startIdx, endIdx);
const cleanGuides = guidesSub
  .replace('export const EXERCISE_GUIDES =', 'const EXERCISE_GUIDES =')
  .replace(/import .*/g, '');

const guidesEval = new Function(cleanGuides + '\nreturn { EXERCISE_GUIDES };')();
const { EXERCISE_GUIDES } = guidesEval;

console.log('--- DETAILED REPORT ON PRESETS & ALTERNATIVES ---');

let success = true;

for (const presetName of dailyExercises) {
  console.log(`\nPreset Exercise: "${presetName}"`);
  const guide = EXERCISE_GUIDES[presetName];
  if (!guide) {
    console.log(`  [FAIL] Missing guide in EXERCISE_GUIDES`);
    success = false;
    continue;
  }
  const alternatives = guide.alternatives || [];
  console.log(`  Alternatives: ${JSON.stringify(alternatives)}`);
  
  if (alternatives.length < 2) {
    console.log(`  [FAIL] Has ${alternatives.length} alternatives (expected at least 2)`);
    success = false;
  }
  
  for (const alt of alternatives) {
    if (dailyExercises.has(alt)) {
      console.log(`  [FAIL] Alternative "${alt}" is a daily preset exercise!`);
      success = false;
    }
    
    const altGuide = EXERCISE_GUIDES[alt];
    if (!altGuide) {
      console.log(`  [FAIL] Alternative "${alt}" has no guide defined in EXERCISE_GUIDES!`);
      success = false;
    }
  }
}

if (success) {
  console.log('\nAll daily presets have at least 2 alternatives that are non-presets and have guides.');
} else {
  console.log('\nSome errors were found.');
}
