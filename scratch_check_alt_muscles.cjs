const fs = require('fs');

// Parse ExerciseVisualizer.jsx guides
const content = fs.readFileSync('src/components/ExerciseVisualizer.jsx', 'utf8');
const match = content.match(/export const EXERCISE_GUIDES = {([\s\S]*?)};/);

if (!match) {
  console.log("Could not parse EXERCISE_GUIDES");
  process.exit(1);
}

const guideBlock = match[1];

// Let's parse all exercises and their muscles and alternatives
const lines = guideBlock.split('\n');
const exercises = {};
let currentKey = '';

lines.forEach(line => {
  const trimmed = line.trim();
  if (trimmed.endsWith(': {') && !trimmed.startsWith('instructions')) {
    currentKey = trimmed.replace(': {', '').replace(/"/g, '').replace(/'/g, '').trim();
    exercises[currentKey] = { muscles: '', alternatives: [] };
  }
  if (trimmed.startsWith('muscles:')) {
    const musclesMatch = trimmed.match(/: ['"]([^'"]+)['"]/);
    if (musclesMatch && currentKey) {
      exercises[currentKey].muscles = musclesMatch[1].toLowerCase();
    }
  }
  if (trimmed.startsWith('alternatives:')) {
    const altMatch = trimmed.match(/\[([\s\S]*?)\]/);
    if (altMatch && currentKey) {
      const alts = altMatch[1].split(',').map(s => s.trim().replace(/"/g, '').replace(/'/g, ''));
      exercises[currentKey].alternatives = alts;
    }
  }
});

let mismatchCount = 0;
for (const [name, data] of Object.entries(exercises)) {
  const mainMuscle = data.muscles;
  data.alternatives.forEach(alt => {
    const altData = exercises[alt];
    if (altData) {
      const altMuscle = altData.muscles;
      // Check if muscles overlap
      // e.g. mainMuscle might be "chest" and altMuscle might be "chest"
      // or "triceps" and "triceps"
      // Let's do simple substring check or exact match
      const isMatch = mainMuscle.split(',').some(m1 => 
        altMuscle.split(',').some(m2 => 
          m1.trim().includes(m2.trim()) || m2.trim().includes(m1.trim())
        )
      );
      if (!isMatch) {
        console.log(`Muscle mismatch: Exercise "${name}" (${mainMuscle}) has alternative "${alt}" (${altMuscle}).`);
        mismatchCount++;
      }
    } else {
      console.log(`Alternative "${alt}" for exercise "${name}" is not in guides.`);
    }
  });
}

console.log(`Total muscle mismatches: ${mismatchCount}`);
