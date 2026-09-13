const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(targetPath, 'utf8');

const additionalWeights = `
    "Gymleco 321 Seated Wide Chest Press": 40,
    "Gymleco 326 Standing Pec Fly": 15,
    "Half Rack Incline Barbell Press": 40,
    "Gymleco 215DK Cable Cross (Lower Chest Focus)": 15,
    "Triceps Rope Pushdowns": 20,
    "Single D-Handle Cable Pushdown": 15,
    "Gymleco 116 Incline T-Bar Row": 30,
    "Gymleco 310 Seated Row": 45,
    "Gymleco 324 Pullover": 30,
    "Gymleco 010 Back Raise": 0,
    "Gymleco 350 Biceps Curl Machine": 20,
    "EZ Curl Bar Biceps": 15,
    "Half Rack Barbell Back Squats": 60,
    "Gymleco 243 Leg Press 45°": 100,
    "Gymleco 349 Leg Extension": 35,
    "Gymleco 342 Lying Leg Curl": 30,
    "Gymleco 070 Abdominal Bench": 0,
    "Gymleco 330 Shoulder Press": 30,
    "Gymleco 334 Standing Side Lateral": 15,
    "Gymleco 335 Rear Deltoid": 20,
    "Gymleco 038 Viking Press": 20,
    "Gymleco 356 Forearm Machine": 15,
    "Gymleco 082 Belt Squat Machine": 40,
    "Gymleco 117 Seal Row Bench": 30,
    "Gymleco 028 Standing Chest Press": 25,
    "Gymleco 360 Gluteus, One Leg Kick": 20,
    "Gymleco 072 Ab Roll Up": 0,
    "Stairmaster (Steady State)": 0,
    "Jogging Machine (Intervals)": 0,`;

if (!content.includes('Gymleco 321 Seated Wide Chest Press')) {
  // Find where weights are defined inside getPresetBaseWeight
  // We can just inject it after `const weights = {`
  content = content.replace(/const weights = {/, 'const weights = {\n' + additionalWeights);
  
  // Another fix: In App.jsx, I should also ensure that the user gets the new WORKOUT_SPLITS since their localStorage might have the old ones cached.
  // When they reload, they might still see the old `customSplits`. Let's add a versioning check or just a script to clear fit_workoutSplits in localstorage for this update.
  // We can do this by modifying the initial state logic for customSplits in App.jsx.

  // Let's replace the customSplits initialization to always prefer the new presets if we detect it's an old version (or just force it for this update).
  const oldSplitLogic = `const [customSplits, setCustomSplits] = useState(() => {
    const saved = localStorage.getItem('fit_workoutSplits');
    return saved ? JSON.parse(saved) : WORKOUT_SPLITS;
  });`;
  
  const newSplitLogic = `const [customSplits, setCustomSplits] = useState(() => {
    // FORCE UPDATE: Clear old splits to sync with Gymleco equipment overhaul
    const isOverhauled = localStorage.getItem('fit_v2_equipment_sync');
    if (!isOverhauled) {
      localStorage.setItem('fit_v2_equipment_sync', 'true');
      return WORKOUT_SPLITS;
    }
    const saved = localStorage.getItem('fit_workoutSplits');
    return saved ? JSON.parse(saved) : WORKOUT_SPLITS;
  });`;

  content = content.replace(oldSplitLogic, newSplitLogic);
  
  fs.writeFileSync(targetPath, content, 'utf8');
  console.log('Successfully updated App.jsx weights and forced split sync');
} else {
  console.log('Already injected in App.jsx');
}
