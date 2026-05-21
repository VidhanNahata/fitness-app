const fs = require('fs');

// Load presets WORKOUT_SPLITS
const presets = require('./src/utils/presets.js');
const WORKOUT_SPLITS = presets.WORKOUT_SPLITS;

// Get all daily exercises
const dailyExercises = new Set();
for (const day in WORKOUT_SPLITS) {
  WORKOUT_SPLITS[day].exercises.forEach(ex => {
    dailyExercises.add(ex.name);
  });
}

console.log("Daily exercises:", Array.from(dailyExercises));

// Parse ExerciseVisualizer.jsx guides
const content = fs.readFileSync('src/components/ExerciseVisualizer.jsx', 'utf8');
const match = content.match(/export const EXERCISE_GUIDES = {([\s\S]*?)};/);
if (match) {
  // Let's parse the keys and alternatives
  const lines = match[1].split('\n');
  let currentKey = '';
  let overlapCount = 0;
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.endsWith(': {') && !trimmed.startsWith('instructions')) {
      currentKey = trimmed.replace(': {', '').replace(/"/g, '').replace(/'/g, '').trim();
    }
    if (trimmed.startsWith('alternatives:')) {
      // Extract array
      const altMatch = trimmed.match(/\[([\s\S]*?)\]/);
      if (altMatch) {
        const alts = altMatch[1].split(',').map(s => s.trim().replace(/"/g, '').replace(/'/g, ''));
        alts.forEach(alt => {
          if (dailyExercises.has(alt)) {
            console.log(`Overlap found! Exercise "${currentKey}" has alternative "${alt}" which is a daily exercise.`);
            overlapCount++;
          }
        });
      }
    }
  });
  console.log(`Total overlaps found: ${overlapCount}`);
} else {
  console.log("Could not parse EXERCISE_GUIDES");
}
