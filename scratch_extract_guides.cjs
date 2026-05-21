const fs = require('fs');
const content = fs.readFileSync('src/components/ExerciseVisualizer.jsx', 'utf8');

// Find EXERCISE_GUIDES block
const match = content.match(/export const EXERCISE_GUIDES = {([\s\S]*?)};/);
if (match) {
  const lines = match[1].split('\n');
  const output = [];
  let currentKey = '';
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.endsWith(': {') && !trimmed.startsWith('instructions')) {
      currentKey = trimmed.replace(': {', '');
    }
    if (trimmed.startsWith('alternatives:')) {
      output.push(`${currentKey}: ${trimmed}`);
    }
  });
  console.log(output.join('\n'));
} else {
  console.log("Could not find EXERCISE_GUIDES");
}
