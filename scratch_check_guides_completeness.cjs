const fs = require('fs');

// Parse ExerciseVisualizer.jsx guides
const content = fs.readFileSync('src/components/ExerciseVisualizer.jsx', 'utf8');
const match = content.match(/export const EXERCISE_GUIDES = {([\s\S]*?)};/);

if (!match) {
  console.log("Could not parse EXERCISE_GUIDES");
  process.exit(1);
}

// Extract keys in EXERCISE_GUIDES
const exerciseGuidesKeys = new Set();
const guideRegex = /"([^"]+)"\s*:\s*{/g;
let m;
const guideBlock = match[1];
while ((m = guideRegex.exec(guideBlock)) !== null) {
  exerciseGuidesKeys.add(m[1]);
}

// Check that every alternative listed in any guide is also in EXERCISE_GUIDES
const lines = guideBlock.split('\n');
let currentKey = '';
let missingAlts = 0;

lines.forEach(line => {
  const trimmed = line.trim();
  if (trimmed.endsWith(': {') && !trimmed.startsWith('instructions')) {
    currentKey = trimmed.replace(': {', '').replace(/"/g, '').replace(/'/g, '').trim();
  }
  if (trimmed.startsWith('alternatives:')) {
    const altMatch = trimmed.match(/\[([\s\S]*?)\]/);
    if (altMatch) {
      const alts = altMatch[1].split(',').map(s => s.trim().replace(/"/g, '').replace(/'/g, ''));
      alts.forEach(alt => {
        if (!exerciseGuidesKeys.has(alt)) {
          console.log(`Missing alternative guide: Exercise "${currentKey}" has alternative "${alt}" but "${alt}" is not in EXERCISE_GUIDES.`);
          missingAlts++;
        }
      });
    }
  }
});

console.log(`Total missing alternative exercises in guides: ${missingAlts}`);
