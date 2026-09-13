// Default workout, diet, habits, and metrics configuration

export const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const WORKOUT_SPLITS = {
  Mon: {
    focus: 'Chest + Triceps',
    exercises: [
      { id: 'c1', name: 'Gymleco 321 Seated Wide Chest Press', sets: 4, reps: '8-10', baseWeight: 40 },
      { id: 'c2', name: 'Gymleco 326 Standing Pec Fly', sets: 3, reps: '12', baseWeight: 15 },
      { id: 'c3', name: 'Half Rack Incline Barbell Press', sets: 3, reps: '8-10', baseWeight: 40 },
      { id: 'c4', name: 'Gymleco 215DK Cable Cross (Lower Chest Focus)', sets: 3, reps: '12', baseWeight: 15 },
      { id: 't1', name: 'Triceps Rope Pushdowns', sets: 3, reps: '12', baseWeight: 20 },
      { id: 't2', name: 'Single D-Handle Cable Pushdown', sets: 3, reps: '12', baseWeight: 15 },
    ]
  },
  Tue: {
    focus: 'Back + Biceps',
    exercises: [
      { id: 'b1', name: 'Gymleco 116 Incline T-Bar Row', sets: 4, reps: '8-10', baseWeight: 30 },
      { id: 'b2', name: 'Gymleco 310 Seated Row', sets: 3, reps: '10', baseWeight: 45 },
      { id: 'b3', name: 'Gymleco 324 Pullover', sets: 3, reps: '12', baseWeight: 30 },
      { id: 'b4', name: 'Gymleco 010 Back Raise', sets: 3, reps: '15', baseWeight: 0 },
      { id: 'bi1', name: 'Gymleco 350 Biceps Curl Machine', sets: 3, reps: '10', baseWeight: 20 },
      { id: 'bi2', name: 'EZ Curl Bar Biceps', sets: 3, reps: '12', baseWeight: 15 },
    ]
  },
  Wed: {
    focus: 'Legs + Core',
    exercises: [
      { id: 'l1', name: 'Half Rack Barbell Back Squats', sets: 4, reps: '8', baseWeight: 60 },
      { id: 'l2', name: 'Gymleco 243 Leg Press 45°', sets: 3, reps: '10', baseWeight: 100 },
      { id: 'l3', name: 'Gymleco 349 Leg Extension', sets: 3, reps: '12', baseWeight: 35 },
      { id: 'l4', name: 'Gymleco 342 Lying Leg Curl', sets: 3, reps: '12', baseWeight: 30 },
      { id: 'a1', name: 'Gymleco 070 Abdominal Bench', sets: 3, reps: '15', baseWeight: 0 },
    ]
  },
  Thu: {
    focus: 'Shoulders + Posture Correction',
    exercises: [
      { id: 's1', name: 'Gymleco 330 Shoulder Press', sets: 4, reps: '8-10', baseWeight: 30 },
      { id: 's2', name: 'Gymleco 334 Standing Side Lateral', sets: 4, reps: '12-15', baseWeight: 15 },
      { id: 's3', name: 'Gymleco 335 Rear Deltoid', sets: 4, reps: '15', baseWeight: 20 },
      { id: 's4', name: 'Gymleco 038 Viking Press', sets: 3, reps: '10', baseWeight: 20 },
      { id: 's5', name: 'Gymleco 356 Forearm Machine', sets: 3, reps: '12', baseWeight: 15 },
    ]
  },
  Fri: {
    focus: 'Full Body + Abs Focus',
    exercises: [
      { id: 'fb1', name: 'Gymleco 082 Belt Squat Machine', sets: 3, reps: '10', baseWeight: 40 },
      { id: 'fb2', name: 'Gymleco 117 Seal Row Bench', sets: 3, reps: '10', baseWeight: 30 },
      { id: 'fb3', name: 'Gymleco 028 Standing Chest Press', sets: 3, reps: '10', baseWeight: 25 },
      { id: 'fb4', name: 'Gymleco 360 Gluteus, One Leg Kick', sets: 3, reps: '12', baseWeight: 20 },
      { id: 'a2', name: 'Gymleco 072 Ab Roll Up', sets: 3, reps: '15', baseWeight: 0 },
    ]
  },
  Sat: {
    focus: 'Cardio & Active Recovery',
    exercises: [
      { id: 'car1', name: 'Stairmaster (Steady State)', sets: 1, reps: '30 mins', baseWeight: 0 },
      { id: 'car2', name: 'Jogging Machine (Intervals)', sets: 1, reps: '15 mins', baseWeight: 0 },
    ]
  },
  Sun: {
    focus: 'Rest Day (Stretching & Recovery)',
    exercises: [
      { id: 'res1', name: 'Full-Body Static Stretching Protocol', sets: 1, reps: '20 mins', baseWeight: 0 },
    ]
  }
};

export const DIET_TARGETS = {
  calories: 2050,
  protein: 145,
  carbs: 220,
  fat: 65
};

export const HABITS_LIST = [
  { id: 'posture', name: 'Wore posture belt 4hr+', icon: 'ShieldAlert' },
  { id: 'sleep', name: '8hrs quality sleep', icon: 'Moon' },
  { id: 'creatine', name: 'Took creatine 5g', icon: 'Sparkles' },
  { id: 'water', name: 'Drank 3.5L water', icon: 'Droplet' },
  { id: 'clean_eating', name: 'No junk food / sugars', icon: 'FlameKindling' },
  { id: 'cardio', name: 'Daily cardio complete', icon: 'Footprints' }
];

export const INITIAL_METRICS = {
  weight: 77.0,
  bf: 24.0,
  chest: 38.5,
  waist: 34.0,
  hip: 39.5,
  notes: 'Start of 90-day transformation. Focus on posture correction, progressive overload, and hitting 145g protein daily.'
};

export const TIPS_LIBRARY = [
  {
    category: 'Man Boobs Reduction',
    title: 'Focus on Upper Chest & Fat Loss',
    content: 'Gynecomastia-like appearance is often chest fat (lipomastia) combined with poor posture. Focus on heavy incline presses (dumbbell & barbell) to build the upper chest shelf, and cable cross-overs to squeeze. Crucially, stay in a caloric deficit to burn overall body fat.'
  },
  {
    category: 'Posture Correction',
    title: 'Fix Rounded Shoulders & Forward Head',
    content: 'Sitting long hours leads to tight chests and weak upper back muscles. Use your posture belt for 4 hours daily. In the gym, focus on rear delt Face Pulls and Y-raises to strengthen the lower/mid traps. Stretch your chest daily.'
  },
  {
    category: 'Hip Fat Strategy',
    title: 'Love Handles & Lower Back Fat',
    content: 'Lower back and hip fat are usually the last to go for men due to alpha-receptor density. There is no spot reduction. Focus on consistent fat loss by maintaining the 2050 kcal target, doing Saturday cardio, and building your upper back/shoulders to create a V-taper.'
  },
  {
    category: 'Vegetarian Protein',
    title: 'Hitting 145g Without Excess Fats',
    content: 'As a vegetarian, it is easy to overshoot fat targets when eating paneer or nuts. Balance this by utilizing 2.5 scoops of Whey Protein daily, egg whites, low-fat tofu, yellow lentils (dal), and kidney beans (rajma). Keep paneer portioned to 100g.'
  }
];

export const WEEK_SPECIFIC_ADVICE = [
  {
    weeks: 'Weeks 1–4',
    phase: 'Form Focus & Habit Building',
    advice: 'Priority is mind-muscle connection. Master the form on your new Gymleco machines and free weights. Ensure you log every workout. Do not rush to lift heavy yet. Build the habit of tracking your calories.'
  },
  {
    weeks: 'Weeks 5–8',
    phase: 'Progressive Overload Phase',
    advice: 'Now that form is locked, push for progressive overload. Attempt to add weight on the machines weekly or increase reps. Keep your protein high (145g) to recover and repair.'
  },
  {
    weeks: 'Weeks 9–12',
    phase: 'Definition & Shred Phase',
    advice: 'Final push. We are sharpening the details. Strict calorie adherence (2050 kcal), absolutely zero cheat meals. Add an extra 10 mins of incline walking on cardio days to reveal those abs.'
  }
];
