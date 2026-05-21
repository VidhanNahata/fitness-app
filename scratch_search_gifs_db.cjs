const fs = require('fs');

const matches = JSON.parse(fs.readFileSync('C:\\Users\\Vidhan\\.gemini\\antigravity\\brain\\516fd508-100f-46bc-8fc4-d690943eb1da\\scratch\\matches.json', 'utf8'));
const extra = JSON.parse(fs.readFileSync('C:\\Users\\Vidhan\\.gemini\\antigravity\\brain\\516fd508-100f-46bc-8fc4-d690943eb1da\\scratch\\extra_matches.json', 'utf8'));
const newKeywords = JSON.parse(fs.readFileSync('C:\\Users\\Vidhan\\.gemini\\antigravity\\brain\\516fd508-100f-46bc-8fc4-d690943eb1da\\scratch\\new_keyword_matches.json', 'utf8'));

const results = {};

function addResult(category, name, gifUrl, muscle, bodyPart) {
  if (!results[category]) results[category] = [];
  // check duplicate
  if (!results[category].some(r => r.name.toLowerCase() === name.toLowerCase())) {
    results[category].push({ name, gifUrl, muscle, bodyPart });
  }
}

// 1. Search for Triceps
for (const [key, val] of Object.entries(matches)) {
  val.forEach(ex => {
    if (ex.muscle === 'triceps' || ex.bodyPart === 'arms' && ex.name.toLowerCase().includes('tricep')) {
      addResult('triceps', ex.name, ex.gifUrl, ex.muscle, ex.bodyPart);
    }
  });
}

// 2. Search for Biceps
for (const [key, val] of Object.entries(matches)) {
  val.forEach(ex => {
    if (ex.muscle === 'biceps' || ex.bodyPart === 'arms' && ex.name.toLowerCase().includes('curl')) {
      addResult('biceps', ex.name, ex.gifUrl, ex.muscle, ex.bodyPart);
    }
  });
}

// 3. Search for Legs (Quads / Glutes / Calves / Hamstrings)
for (const [key, val] of Object.entries(matches)) {
  val.forEach(ex => {
    if (ex.bodyPart === 'legs' || ['quads', 'glutes', 'calves', 'hamstrings'].includes(ex.muscle)) {
      addResult('legs', ex.name, ex.gifUrl, ex.muscle, ex.bodyPart);
    }
  });
}

// 4. Search in extra and newKeywords for more
for (const [key, list] of Object.entries(extra)) {
  list.forEach(ex => {
    if (ex.muscle === 'triceps' || ex.name.toLowerCase().includes('tricep')) {
      addResult('triceps', ex.name, ex.gifUrl, ex.muscle, 'arms');
    }
    if (ex.muscle === 'biceps' || ex.name.toLowerCase().includes('curl')) {
      addResult('biceps', ex.name, ex.gifUrl, ex.muscle, 'arms');
    }
    if (['abs', 'core'].includes(ex.muscle) || ex.name.toLowerCase().includes('crunch') || ex.name.toLowerCase().includes('plank')) {
      addResult('abs', ex.name, ex.gifUrl, ex.muscle, 'core');
    }
  });
}

for (const [key, list] of Object.entries(newKeywords)) {
  list.forEach(ex => {
    if (ex.muscle === 'triceps' || ex.name.toLowerCase().includes('tricep')) {
      addResult('triceps', ex.name, ex.gifUrl, ex.muscle, ex.bodyPart);
    }
    if (ex.muscle === 'biceps' || ex.name.toLowerCase().includes('curl')) {
      addResult('biceps', ex.name, ex.gifUrl, ex.muscle, ex.bodyPart);
    }
    if (ex.bodyPart === 'core' || ex.muscle === 'abs') {
      addResult('abs', ex.name, ex.gifUrl, ex.muscle, ex.bodyPart);
    }
    if (ex.bodyPart === 'legs' || ['quads', 'glutes', 'calves', 'hamstrings'].includes(ex.muscle)) {
      addResult('legs', ex.name, ex.gifUrl, ex.muscle, ex.bodyPart);
    }
  });
}

console.log("Found results count:");
for (const [cat, list] of Object.entries(results)) {
  console.log(`- ${cat}: ${list.length}`);
}

// Let's write them to scratch/discovered_exercises.json so we can inspect them
fs.writeFileSync('C:\\Users\\Vidhan\\.gemini\\antigravity\\brain\\516fd508-100f-46bc-8fc4-d690943eb1da\\scratch\\discovered_exercises.json', JSON.stringify(results, null, 2));
console.log("Saved discovered exercises to scratch/discovered_exercises.json");
