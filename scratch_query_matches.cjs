const fs = require('fs');

const matches = JSON.parse(fs.readFileSync('C:\\Users\\Vidhan\\.gemini\\antigravity\\brain\\516fd508-100f-46bc-8fc4-d690943eb1da\\scratch\\matches.json', 'utf8'));

// Print all keys (categories) in matches
console.log("Preset search keys:", Object.keys(matches));

// Also let's load new_keyword_matches.json and extra_matches.json
const extra = JSON.parse(fs.readFileSync('C:\\Users\\Vidhan\\.gemini\\antigravity\\brain\\516fd508-100f-46bc-8fc4-d690943eb1da\\scratch\\extra_matches.json', 'utf8'));
const newKeywords = JSON.parse(fs.readFileSync('C:\\Users\\Vidhan\\.gemini\\antigravity\\brain\\516fd508-100f-46bc-8fc4-d690943eb1da\\scratch\\new_keyword_matches.json', 'utf8'));

console.log("Extra categories:", Object.keys(extra));
console.log("New keywords categories:", Object.keys(newKeywords));
