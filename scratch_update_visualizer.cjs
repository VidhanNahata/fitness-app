const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src', 'components', 'ExerciseVisualizer.jsx');
let content = fs.readFileSync(targetPath, 'utf8');

const newExercises = `
  // --- GYMLECO & NEW SPECIFIC EQUIPMENT (Req 3) ---
  "Gymleco 321 Seated Wide Chest Press": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/chest/lever-seated-chest-press.gif",
    muscles: "Pectoralis Major, Anterior Deltoid, Triceps",
    instructions: [
      "Adjust the seat so the handles align with your mid-chest.",
      "Sit back firmly against the pad with your feet flat on the floor.",
      "Grip the wide handles and press forward until your arms are fully extended.",
      "Squeeze your chest at the top of the movement.",
      "Slowly return the handles to the starting position without letting the weight stack drop."
    ],
    breathing: "Exhale as you press forward; inhale as you return.",
    postureTip: "Keep your chest up and shoulder blades pulled back. Do not roll your shoulders forward at the top of the press.",
    alternatives: ["Flat Barbell Bench Press", "Gymleco 028 Standing Chest Press", "Dumbbell Floor Bench Press"]
  },
  "Gymleco 326 Standing Pec Fly": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/chest/lever-pec-deck-fly.gif",
    muscles: "Pectoralis Major (Inner Chest)",
    instructions: [
      "Stand facing away from the machine, gripping the fly handles.",
      "Keep a slight bend in your elbows and your chest puffed out.",
      "Bring the handles together in a hugging motion until your hands meet.",
      "Squeeze your chest hard for a second.",
      "Slowly open your arms back to the starting position, feeling the stretch."
    ],
    breathing: "Exhale as you bring your hands together; inhale as you open your arms.",
    postureTip: "Do not let your elbows drop. Keep the movement strictly in the horizontal plane.",
    alternatives: ["Cable Chest Flyes (Lower Chest Focus)", "Incline Cable Chest Flyes"]
  },
  "Half Rack Incline Barbell Press": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/chest/barbell-incline-bench-press.gif",
    muscles: "Upper Pectoralis Major, Anterior Deltoids, Triceps",
    instructions: [
      "Set an adjustable bench to a 30-45 degree incline inside the half rack.",
      "Unrack the barbell and hold it straight over your upper chest.",
      "Lower the bar slowly to your upper chest (just below the collarbone).",
      "Press the bar back up in a straight line to full extension."
    ],
    breathing: "Inhale as you lower the bar; exhale as you press up.",
    postureTip: "Keep your feet planted and maintain a slight natural arch in your lower back.",
    alternatives: ["Incline Dumbbell Press", "Gymleco 321 Seated Wide Chest Press"]
  },
  "Gymleco 215DK Cable Cross (Lower Chest Focus)": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/chest/cable-low-fly.gif",
    muscles: "Lower Pectoralis Major",
    instructions: [
      "Set the pulleys to the highest position on the cable cross machine.",
      "Grab a D-handle in each hand and step forward to create tension.",
      "With a slight bend in your elbows, pull the handles down and across your body.",
      "Cross your wrists at the bottom to maximize the inner/lower chest squeeze.",
      "Slowly return to the top stretched position."
    ],
    breathing: "Exhale as you pull down; inhale as you let your arms rise.",
    postureTip: "Keep your torso stationary with a slight forward lean.",
    alternatives: ["Cable Chest Flyes (Lower Chest Focus)", "Chest Dips"]
  },
  "Triceps Rope Pushdowns": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/triceps/cable-pushdown-with-rope-attachment.gif",
    muscles: "Triceps (Lateral and Long Heads)",
    instructions: [
      "Attach a rope to a high pulley.",
      "Keep your elbows pinned to your sides and push the rope down.",
      "Spread the rope apart at the bottom to fully contract the triceps.",
      "Return the rope until your forearms are parallel to the floor."
    ],
    breathing: "Exhale as you push down; inhale on the way up.",
    postureTip: "Do not use momentum or let your elbows drift forward.",
    alternatives: ["Cable Rope Pushdowns", "Cable Pushdown", "Overhead Dumbbell Extension"]
  },
  "Single D-Handle Cable Pushdown": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/triceps/cable-one-arm-tricep-extension.gif",
    muscles: "Triceps",
    instructions: [
      "Attach a single D-handle to a high pulley.",
      "Grip the handle with one hand (underhand or overhand) and pin your elbow.",
      "Push the handle down to full extension.",
      "Slowly return to the start."
    ],
    breathing: "Exhale on extension; inhale on return.",
    postureTip: "Isolating one arm helps correct strength imbalances.",
    alternatives: ["Triceps Rope Pushdowns", "Cable Pushdown"]
  },
  "Gymleco 116 Incline T-Bar Row": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/upper-back/lever-t-bar-row.gif",
    muscles: "Latissimus Dorsi, Rhomboids, Traps",
    instructions: [
      "Lie chest-down on the incline T-bar row machine pad.",
      "Grip the handles and pull the weight up towards your torso.",
      "Squeeze your shoulder blades together at the top.",
      "Lower the weight under control until your arms are fully extended."
    ],
    breathing: "Exhale as you pull; inhale as you lower.",
    postureTip: "Keep your chest pressed against the pad to prevent cheating with momentum.",
    alternatives: ["Barbell Rows", "Gymleco 310 Seated Row"]
  },
  "Gymleco 310 Seated Row": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/upper-back/lever-seated-row.gif",
    muscles: "Latissimus Dorsi, Mid-Back",
    instructions: [
      "Sit on the machine with your chest against the support pad.",
      "Grip the handles and pull them straight back.",
      "Squeeze your back muscles, keeping your elbows close to your sides.",
      "Slowly release the handles forward."
    ],
    breathing: "Exhale as you pull; inhale as you release.",
    postureTip: "Do not let your shoulders shrug up during the pull.",
    alternatives: ["Cable Seated Row", "Gymleco 116 Incline T-Bar Row"]
  },
  "Gymleco 324 Pullover": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/lats/lever-pullover.gif",
    muscles: "Latissimus Dorsi, Serratus Anterior",
    instructions: [
      "Sit down and secure yourself in the pullover machine.",
      "Grip the overhead bar or place your elbows on the pads.",
      "Pull the bar/pads over and down towards your abdomen in a sweeping motion.",
      "Return slowly to feel a deep stretch in your lats."
    ],
    breathing: "Exhale as you pull down; inhale as you return.",
    postureTip: "Focus on pulling with your elbows rather than your hands.",
    alternatives: ["Dumbbell Lat Pullover", "Lat Pulldowns"]
  },
  "Gymleco 010 Back Raise": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/lower-back/hyperextension.gif",
    muscles: "Erector Spinae (Lower Back), Glutes, Hamstrings",
    instructions: [
      "Position yourself on the back raise (hyperextension) bench.",
      "Lower your torso down as far as comfortable.",
      "Raise your torso back up until your body forms a straight line.",
      "Do not over-extend (arch backwards) past a neutral spine."
    ],
    breathing: "Inhale as you lower; exhale as you raise.",
    postureTip: "Keep your core braced to protect your spine.",
    alternatives: ["Romanian Deadlifts (RDL)", "Gymleco 342 Lying Leg Curl"]
  },
  "Gymleco 350 Biceps Curl Machine": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/biceps/lever-preacher-curl.gif",
    muscles: "Biceps Brachii",
    instructions: [
      "Adjust the seat so your triceps rest flat on the arm pad.",
      "Grip the handles and curl the weight towards your shoulders.",
      "Squeeze the biceps at the peak contraction.",
      "Lower the weight smoothly until your arms are nearly fully extended."
    ],
    breathing: "Exhale as you curl; inhale as you lower.",
    postureTip: "Do not lean back to heave the weight up. Keep your armpits wedged into the pad.",
    alternatives: ["Preacher Curl", "EZ Curl Bar Biceps"]
  },
  "EZ Curl Bar Biceps": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/biceps/barbell-curl.gif",
    muscles: "Biceps Brachii",
    instructions: [
      "Hold an EZ curl bar with an underhand grip using the cambered (curved) sections.",
      "Keep your elbows tucked into your sides.",
      "Curl the bar up to your chest.",
      "Lower it back down with control."
    ],
    breathing: "Exhale as you curl up; inhale as you lower.",
    postureTip: "The EZ bar reduces wrist strain compared to a straight bar. Keep your wrists locked.",
    alternatives: ["Barbell Curl", "Gymleco 350 Biceps Curl Machine"]
  },
  "Half Rack Barbell Back Squats": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/quads/barbell-squat.gif",
    muscles: "Quadriceps, Glutes, Hamstrings, Core",
    instructions: [
      "Set the J-hooks in the half rack to chest height and rest the barbell on your upper traps.",
      "Unrack the bar and take two steps back. Keep your chest up.",
      "Squat down by pushing your hips back and bending your knees.",
      "Drive back up through your mid-foot to the starting position."
    ],
    breathing: "Take a deep breath and brace before descending; exhale as you push up.",
    postureTip: "Always use the safety spotter arms on the half rack.",
    alternatives: ["Barbell Back Squats", "Gymleco 243 Leg Press 45°", "Gymleco 082 Belt Squat Machine"]
  },
  "Gymleco 243 Leg Press 45°": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/quads/sled-45-degree-leg-press.gif",
    muscles: "Quadriceps, Glutes, Hamstrings",
    instructions: [
      "Sit in the 45-degree leg press machine and place your feet shoulder-width apart on the sled.",
      "Unlock the safety handles and lower the sled by bending your knees.",
      "Lower until your knees are at a 90-degree angle.",
      "Press the weight back up through your heels and mid-foot."
    ],
    breathing: "Inhale as you lower the weight; exhale as you press it up.",
    postureTip: "Do not lock out your knees violently at the top. Keep a slight bend.",
    alternatives: ["Leg Press", "Half Rack Barbell Back Squats"]
  },
  "Gymleco 349 Leg Extension": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/quads/lever-leg-extension.gif",
    muscles: "Quadriceps",
    instructions: [
      "Adjust the machine so your knee aligns with the pivot point.",
      "Sit back and grab the handles. Extend your legs straight out.",
      "Squeeze your quads at the top of the movement.",
      "Lower the weight back down slowly."
    ],
    breathing: "Exhale on extension; inhale on the way down.",
    postureTip: "Focus on the mind-muscle connection with the teardrop muscle of the quad.",
    alternatives: ["Leg Extensions", "Gymleco 243 Leg Press 45°"]
  },
  "Gymleco 342 Lying Leg Curl": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/hamstrings/lever-lying-leg-curl.gif",
    muscles: "Hamstrings",
    instructions: [
      "Lie face down on the machine, with the ankle pad resting on your achilles tendons.",
      "Keep your hips pressed into the bench and curl your legs up towards your glutes.",
      "Squeeze your hamstrings at the top.",
      "Lower the weight back to the starting position."
    ],
    breathing: "Exhale as you curl up; inhale as you lower.",
    postureTip: "Do not arch your lower back excessively to heave the weight.",
    alternatives: ["Lying Leg Curls", "Romanian Deadlifts (RDL)"]
  },
  "Gymleco 070 Abdominal Bench": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/decline-crunch.gif",
    muscles: "Rectus Abdominis",
    instructions: [
      "Hook your feet under the pads of the decline abdominal bench.",
      "Place your hands across your chest or lightly behind your ears.",
      "Crunch your torso up towards your knees.",
      "Slowly lower yourself back down, maintaining tension in the abs."
    ],
    breathing: "Exhale as you crunch up; inhale as you lower.",
    postureTip: "Do not pull on your neck.",
    alternatives: ["Bicycle Crunches", "Gymleco 072 Ab Roll Up"]
  },
  "Gymleco 330 Shoulder Press": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/lever-shoulder-press.gif",
    muscles: "Anterior Deltoids, Triceps",
    instructions: [
      "Adjust the seat so the handles are at shoulder level.",
      "Sit firmly against the back pad and grip the handles.",
      "Press the weight overhead until your arms are extended.",
      "Lower the handles back to the start under control."
    ],
    breathing: "Exhale as you press up; inhale as you lower.",
    postureTip: "Keep your lower back pressed against the pad.",
    alternatives: ["Seated Barbell Overhead Press", "Dumbbell Shoulder Press"]
  },
  "Gymleco 334 Standing Side Lateral": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/cable-lateral-raise.gif",
    muscles: "Lateral Deltoids",
    instructions: [
      "Stand in the machine or use the cables, gripping the handles at your sides.",
      "Raise your arms straight out to the sides until they are parallel to the floor.",
      "Pause and squeeze the side delts.",
      "Lower back down slowly."
    ],
    breathing: "Exhale as you raise; inhale as you lower.",
    postureTip: "Lead with your elbows and imagine pouring water from a pitcher at the top.",
    alternatives: ["Standing Dumbbell Lateral Raises", "Cable Lateral Raise"]
  },
  "Gymleco 335 Rear Deltoid": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/lever-reverse-fly.gif",
    muscles: "Rear Deltoids, Rhomboids",
    instructions: [
      "Sit facing the machine pad (reverse pec deck configuration).",
      "Grip the handles and keep your arms slightly bent.",
      "Pull the handles back by squeezing your rear deltoids.",
      "Return the handles slowly to the front."
    ],
    breathing: "Exhale as you pull back; inhale as you return.",
    postureTip: "Avoid shrugging your traps; focus entirely on the back of the shoulder.",
    alternatives: ["Cable Face Pulls (Rotator Cuff/Rear Delts)", "Dumbbell Rear Delt Raise"]
  },
  "Gymleco 038 Viking Press": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/lever-shoulder-press.gif",
    muscles: "Anterior Deltoids, Triceps, Core",
    instructions: [
      "Stand facing the Viking press handles. Grip them securely.",
      "Brace your core and press the handles overhead and slightly forward.",
      "Lower the weight back to shoulder level under control."
    ],
    breathing: "Exhale as you press; inhale as you lower.",
    postureTip: "Do not excessively lean back; use your core for stability.",
    alternatives: ["Gymleco 330 Shoulder Press", "Seated Barbell Overhead Press"]
  },
  "Gymleco 356 Forearm Machine": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/forearms/wrist-roller.gif",
    muscles: "Forearms (Flexors and Extensors)",
    instructions: [
      "Grip the roller or handles of the forearm machine.",
      "Roll or curl your wrists to contract the forearm muscles.",
      "Reverse the motion under control."
    ],
    breathing: "Breathe normally throughout the continuous motion.",
    postureTip: "Keep your arms stationary and isolate the movement strictly to the wrists.",
    alternatives: ["Dumbbell Reverse Curls", "EZ Curl Bar Biceps"]
  },
  "Gymleco 082 Belt Squat Machine": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/quads/lever-squat.gif",
    muscles: "Quadriceps, Glutes",
    instructions: [
      "Secure the belt around your hips and clip it to the machine's cable/lever.",
      "Stand on the platform with a comfortable squat stance.",
      "Squat down by bending your knees and pushing your hips back.",
      "Drive back up to a standing position."
    ],
    breathing: "Inhale descending; exhale driving up.",
    postureTip: "The belt squat removes spinal loading, making it great if your lower back is fatigued.",
    alternatives: ["Half Rack Barbell Back Squats", "Gymleco 243 Leg Press 45°"]
  },
  "Gymleco 117 Seal Row Bench": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/upper-back/barbell-lying-cambered-row.gif",
    muscles: "Mid Back, Lats, Rhomboids",
    instructions: [
      "Lie face down on the elevated seal row bench.",
      "Grip the barbell or dumbbells resting below you.",
      "Pull the weight up until it touches the underside of the bench.",
      "Lower it back down until your arms are straight."
    ],
    breathing: "Exhale pulling up; inhale lowering down.",
    postureTip: "Do not lift your chest off the pad; keep the movement strict.",
    alternatives: ["Gymleco 116 Incline T-Bar Row", "Gymleco 310 Seated Row"]
  },
  "Gymleco 028 Standing Chest Press": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/chest/cable-standing-chest-press.gif",
    muscles: "Pectoralis Major",
    instructions: [
      "Stand facing away from the machine, gripping the handles.",
      "Step forward with one foot for stability.",
      "Press the handles straight out in front of you.",
      "Return the handles under control."
    ],
    breathing: "Exhale pressing out; inhale returning.",
    postureTip: "Keep your core tight to prevent your torso from twisting.",
    alternatives: ["Gymleco 321 Seated Wide Chest Press", "Flat Barbell Bench Press"]
  },
  "Gymleco 360 Gluteus, One Leg Kick": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/glutes/cable-glute-kickback.gif",
    muscles: "Gluteus Maximus",
    instructions: [
      "Stand facing the machine and attach the pad/strap to one leg or push against the lever.",
      "Keep your upper body stationary and kick your leg straight back.",
      "Squeeze your glute hard at the peak of the kick.",
      "Return the leg slowly."
    ],
    breathing: "Exhale as you kick back; inhale as you return.",
    postureTip: "Do not swing your lower back; the movement must come from the hip joint.",
    alternatives: ["Romanian Deadlifts (RDL)", "Gymleco 010 Back Raise"]
  },
  "Gymleco 072 Ab Roll Up": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/wheel-rollerout.gif",
    muscles: "Rectus Abdominis, Core",
    instructions: [
      "Use the ab roller machine or a free wheel.",
      "Kneel and roll the wheel forward, extending your body.",
      "Brace your core tight and do not let your lower back sag.",
      "Pull the wheel back to the starting position."
    ],
    breathing: "Inhale rolling out; exhale forcefully pulling back.",
    postureTip: "Keep a slight hollow-body position (rounded upper back) to protect the spine.",
    alternatives: ["Gymleco 070 Abdominal Bench", "Plank Hold"]
  },
  "Stairmaster (Steady State)": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/cardio/walk-elliptical-cross-trainer.gif",
    muscles: "Cardio, Glutes, Quads, Calves",
    instructions: [
      "Step onto the Stairmaster and select a steady pace.",
      "Keep an upright posture and avoid leaning heavily on the rails.",
      "Step fully onto each stair with your whole foot."
    ],
    breathing: "Maintain a steady, rhythmic breathing pattern.",
    postureTip: "Leaning on the rails reduces calorie burn by up to 30%. Stand tall.",
    alternatives: ["Jogging Machine (Intervals)", "Incline Treadmill Walk (12% Incline, 5km/h)"]
  },
  "Jogging Machine (Intervals)": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/cardio/run-treadmill.gif",
    muscles: "Cardio, Legs",
    instructions: [
      "Warm up with a light jog.",
      "Alternate between 1 minute of high-intensity running and 2 minutes of walking.",
      "Repeat for the duration of the workout."
    ],
    breathing: "Breathe rhythmically with your strides.",
    postureTip: "Keep your chest up and look forward, not down at your feet.",
    alternatives: ["Stairmaster (Steady State)", "HIIT Spin Bike (Sprints)"]
  }
`;

if (!content.includes('Gymleco 321')) {
  content = content.replace(/};\s*export default function ExerciseVisualizer/, 
    newExercises + '\n};\n\nexport default function ExerciseVisualizer'
  );
  fs.writeFileSync(targetPath, content, 'utf8');
  console.log('Successfully injected Gymleco exercises into ExerciseVisualizer.jsx');
} else {
  console.log('Already injected.');
}
