const fs = require('fs');

// Mock browser/import environments for Node
global.React = { useState: () => {}, useEffect: () => {}, useRef: () => {} };

const visualizerContent = fs.readFileSync('src/components/ExerciseVisualizer.jsx', 'utf8');
const startIdx = visualizerContent.indexOf('export const EXERCISE_GUIDES = {');
if (startIdx === -1) {
  console.error('Could not find EXERCISE_GUIDES');
  process.exit(1);
}
const endIdx = visualizerContent.indexOf('export default function ExerciseVisualizer');
const guidesSub = visualizerContent.substring(startIdx, endIdx);
const cleanGuides = guidesSub
  .replace('export const EXERCISE_GUIDES =', 'const EXERCISE_GUIDES =')
  .replace(/import .*/g, '');

const guidesEval = new Function(cleanGuides + '\nreturn { EXERCISE_GUIDES };')();
const { EXERCISE_GUIDES } = guidesEval;

console.log("--- GIF AUDIT REPORT ---");
let totalGifs = 0;
let missingGifs = 0;
let placeholderGifs = 0;

for (const [name, guide] of Object.entries(EXERCISE_GUIDES)) {
  totalGifs++;
  const url = guide.gifUrl;
  if (!url) {
    console.log(`[MISSING GIF] "${name}" has no gifUrl property!`);
    missingGifs++;
  } else if (url.includes('placeholder') || url.trim() === '' || url.includes('example.com')) {
    console.log(`[PLACEHOLDER GIF] "${name}" has a placeholder or empty gifUrl: "${url}"`);
    placeholderGifs++;
  } else {
    // Check if CDN or standard URL
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      console.log(`[INVALID URL] "${name}" has invalid URL format: "${url}"`);
      placeholderGifs++;
    }
  }
}

console.log(`\nAudit complete: ${totalGifs} exercises found. Missing: ${missingGifs}, Placeholders/Invalid: ${placeholderGifs}`);
