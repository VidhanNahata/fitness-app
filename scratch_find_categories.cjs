const fs = require('fs');
const content = fs.readFileSync('src/components/ExerciseVisualizer.jsx', 'utf8');
const lines = content.split('\n');
lines.forEach((line, index) => {
  if (line.includes('// ---')) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});
