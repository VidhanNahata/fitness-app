const fs = require('fs');
const content = fs.readFileSync('src/components/ExerciseVisualizer.jsx', 'utf8');
const match = content.match(/export const EXERCISE_GUIDES = {([\s\S]*?)};/);
if (match) {
  const guideBlock = match[1];
  const lines = guideBlock.split('\n');
  const exercises = [];
  let cur = null;
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.endsWith(': {') && !trimmed.startsWith('instructions')) {
      if (cur) exercises.push(cur);
      const name = trimmed.replace(': {', '').replace(/"/g, '').replace(/'/g, '').trim();
      cur = { name, muscles: '', alternatives: [] };
    } else if (trimmed.startsWith('muscles:')) {
      const mMatch = trimmed.match(/: ['"]([^'"]+)['"]/);
      if (mMatch && cur) cur.muscles = mMatch[1];
    } else if (trimmed.startsWith('alternatives:')) {
      const aMatch = trimmed.match(/\[([\s\S]*?)\]/);
      if (aMatch && cur) {
        cur.alternatives = aMatch[1].split(',').map(s => s.trim().replace(/"/g, '').replace(/'/g, ''));
      }
    }
  });
  if (cur) exercises.push(cur);
  console.log(JSON.stringify(exercises, null, 2));
} else {
  console.log("Could not find EXERCISE_GUIDES");
}
