// Default workout, diet, habits, and metrics configuration

export const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const WORKOUT_SPLITS = {
  Mon: {
    focus: 'Chest + Triceps',
    exercises: [
      { id: 'c1', name: 'Flat Barbell Bench Press', sets: 4, reps: '8-10', baseWeight: 60 },
      { id: 'c2', name: 'Incline Dumbbell Press', sets: 3, reps: '10', baseWeight: 18 },
      { id: 'c3', name: 'Cable Chest Flyes (Lower Chest Focus)', sets: 3, reps: '12', baseWeight: 15 },
      { id: 't1', name: 'Overhead Dumbbell Extension', sets: 3, reps: '10', baseWeight: 14 },
      { id: 't2', name: 'Cable Rope Pushdowns', sets: 3, reps: '12', baseWeight: 20 },
    ]
  },
  Tue: {
    focus: 'Back + Biceps',
    exercises: [
      { id: 'b1', name: 'Lat Pulldowns', sets: 4, reps: '10', baseWeight: 45 },
      { id: 'b2', name: 'Barbell Rows', sets: 3, reps: '8', baseWeight: 40 },
      { id: 'b3', name: 'Single-Arm Dumbbell Rows', sets: 3, reps: '10', baseWeight: 16 },
      { id: 'bi1', name: 'Incline Dumbbell Curls', sets: 3, reps: '10', baseWeight: 10 },
      { id: 'bi2', name: 'Dumbbell Hammer Curls', sets: 3, reps: '12', baseWeight: 12 },
    ]
  },
  Wed: {
    focus: 'Legs + Core',
    exercises: [
      { id: 'l1', name: 'Barbell Back Squats', sets: 4, reps: '8', baseWeight: 70 },
      { id: 'l2', name: 'Romanian Deadlifts (RDL)', sets: 3, reps: '10', baseWeight: 60 },
      { id: 'l3', name: 'Leg Extensions', sets: 3, reps: '12', baseWeight: 35 },
      { id: 'a1', name: 'Hanging Knee Raises', sets: 3, reps: '15', baseWeight: 0 },
      { id: 'a2', name: 'Plank Hold', sets: 3, reps: '60s', baseWeight: 0 },
    ]
  },
  Thu: {
    focus: 'Shoulders + Posture Correction',
    exercises: [
      { id: 's1', name: 'Seated Barbell Overhead Press', sets: 4, reps: '8', baseWeight: 35 },
      { id: 's2', name: 'Standing Dumbbell Lateral Raises', sets: 4, reps: '12-15', baseWeight: 8 },
      { id: 's3', name: 'Cable Face Pulls (Rotator Cuff/Rear Delts)', sets: 4, reps: '15', baseWeight: 17.5 },
      { id: 's4', name: 'Incline Dumbbell Y-Raises (Lower Traps)', sets: 3, reps: '12', baseWeight: 5 },
      { id: 's5', name: 'Dumbbell Shrugs (Upper Traps)', sets: 3, reps: '10', baseWeight: 16 },
    ]
  },
  Fri: {
    focus: 'Full Body + Abs Focus',
    exercises: [
      { id: 'fb1', name: 'Dumbbell Goblet Squats', sets: 3, reps: '12', baseWeight: 20 },
      { id: 'fb2', name: 'Dumbbell Floor Bench Press', sets: 3, reps: '10', baseWeight: 18 },
      { id: 'fb3', name: 'Pull-Ups / Assisted Pull-Ups', sets: 3, reps: 'Max', baseWeight: 0 },
      { id: 'a3', name: 'Bicycle Crunches', sets: 3, reps: '20', baseWeight: 0 },
      { id: 'a4', name: 'Russian Twists', sets: 3, reps: '20', baseWeight: 5 },
    ]
  },
  Sat: {
    focus: 'Cardio & Active Recovery',
    exercises: [
      { id: 'car1', name: 'Incline Treadmill Walk (12% Incline, 5km/h)', sets: 1, reps: '30 mins', baseWeight: 0 },
      { id: 'car2', name: 'HIIT Spin Bike (Sprints)', sets: 1, reps: '15 mins', baseWeight: 0 },
    ]
  },
  Sun: {
    focus: 'Rest Day (Stretching & Recovery)',
    exercises: [
      { id: 'res1', name: 'Full-Body Static Stretching Protocol', sets: 1, reps: '20 mins', baseWeight: 0 },
    ]
  }
};

export const VEGETARIAN_MEALS = [
  { id: 'breakfast', name: 'Breakfast (8:00 AM)', description: '3 Boiled Eggs + 2 slices Whole Wheat Toast + Coffee', protein: 22, carbs: 26, fat: 15, calories: 330 },
  { id: 'mid_morning', name: 'Mid-Morning (11:00 AM)', description: '1 scoop Whey Protein + 1 Banana + 15g Almonds', protein: 30, carbs: 32, fat: 9, calories: 330 },
  { id: 'lunch', name: 'Lunch (1:30 PM)', description: 'Paneer Bhurji (100g paneer) + 1 cup Yellow Dal + 1 Chapati + Green Salad', protein: 32, carbs: 45, fat: 22, calories: 510 },
  { id: 'pre_workout', name: 'Pre-Workout (4:30 PM)', description: 'Black Coffee + 2 Rice Cakes + 1 tbsp Peanut Butter', protein: 5, carbs: 20, fat: 8, calories: 170 },
  { id: 'post_workout', name: 'Post-Workout (6:30 PM)', description: '1.5 scoop Whey Protein + Water', protein: 36, carbs: 3, fat: 2, calories: 170 },
  { id: 'snack', name: 'Evening Snack (7:30 PM)', description: '30g Roasted Chana (Chickpeas)', protein: 6, carbs: 18, fat: 2, calories: 110 },
  { id: 'dinner', name: 'Dinner (9:00 PM)', description: 'Tofu Stir-fry (100g tofu) + Rajma (1/2 cup) + 1/2 cup Brown Rice + Broccoli', protein: 20, carbs: 45, fat: 8, calories: 330 },
  { id: 'before_bed', name: 'Before Bed (10:30 PM)', description: '150ml Low-fat Milk or Casein Protein Shake', protein: 10, carbs: 7, fat: 2, calories: 86 }
];

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
    advice: 'Priority is mind-muscle connection. Master the form on bench press, squats, and rows. Ensure you log every workout. Do not rush to lift heavy yet. Build the habit of wearing your posture belt and tracking food.'
  },
  {
    weeks: 'Weeks 5–8',
    phase: 'Progressive Overload Phase',
    advice: 'Now that form is locked, push for progressive overload. Attempt to add +2.5kg to your compound lifts weekly or increase reps. Keep your protein high (145g) to recover and repair.'
  },
  {
    weeks: 'Weeks 9–12',
    phase: 'Definition & Shred Phase',
    advice: 'Final push. We are sharpening the details. Strict calorie adherence (2050 kcal), absolutely zero cheat meals. Add an extra 10 mins of incline walking on cardio days to reveal those abs.'
  }
];
