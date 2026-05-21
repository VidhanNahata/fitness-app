import React, { useState } from 'react';
import { X, Sparkles, Activity } from 'lucide-react';

export const EXERCISE_GUIDES = {
  // --- CHEST EXERCISES ---
  "Flat Barbell Bench Press": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/barbell-bench-press.gif",
    muscles: "Lower & Mid Chest, Triceps, Anterior Deltoids",
    instructions: [
      "Lie flat on the bench, keeping feet firmly planted on the floor for stability.",
      "Retract and depress your scapulae (squeeze shoulder blades back and pull them down).",
      "Grip the bar slightly wider than shoulder width and lift it off the rack.",
      "Lower the barbell under control to your lower-middle chest (sternum level), keeping elbows tucked at about 45 degrees.",
      "Press the weight up in a slight diagonal arch towards your face until arms are fully extended."
    ],
    breathing: "Inhale deeply as you lower the bar; exhale forcefully as you press the bar up.",
    postureTip: "Avoid flaring your elbows at a 90-degree angle; this places immense strain on the rotator cuff. Keep shoulders pinned.",
    alternatives: ["Dumbbell Decline Bench Press", "Push-Ups", "Chest Dips", "Barbell Decline Bench Press"]
  },
  "Incline Dumbbell Press": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/dumbbell-incline-bench-press.gif",
    muscles: "Upper Chest (Clavicular Head), Anterior Deltoids, Triceps",
    instructions: [
      "Set the bench incline to 30-45 degrees. Sit with a dumbbell in each hand on your thighs.",
      "Kick the weights up to your shoulders as you lie back, keeping elbows at 45 degrees.",
      "Press the dumbbells straight up above your chest, squeezing your chest at the top.",
      "Lower the dumbbells until they are level with your chest, keeping a controlled tempo.",
      "Push back to the start, focusing on pushing your upper chest up towards the ceiling."
    ],
    breathing: "Inhale on the way down (stretch phase); exhale as you press up (contraction phase).",
    postureTip: "Keep your lower back slightly arched but do not slip off the seat. Focus on building the upper chest 'shelf'.",
    alternatives: ["Incline Barbell Bench Press", "Incline Cable Chest Flyes", "Chest Dips", "Push-Ups"]
  },
  "Cable Chest Flyes (Lower Chest Focus)": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/cable-low-fly.gif",
    muscles: "Lower Chest (Sternal Head), Inner Pectorals",
    instructions: [
      "Set the cable pulleys to a high position. Stand in the center and grip the handles.",
      "Take a step forward to create tension, with one foot ahead for balance. Keep elbows slightly bent.",
      "Bring your hands down and forward in a wide sweeping arch, meeting at the bottom in front of your hips.",
      "Squeeze your lower chest hard for a second at the bottom of the movement.",
      "Return to the starting position slowly, feeling a deep stretch across your pectorals."
    ],
    breathing: "Inhale as you open your arms wide; exhale as you bring them together at the bottom.",
    postureTip: "Do not let the weight pull your shoulders backwards. Keep your shoulders rolled back and chest proud.",
    alternatives: ["Chest Dips", "Dumbbell Decline Bench Press", "Incline Cable Chest Flyes", "Push-Ups"]
  },
  "Dumbbell Floor Bench Press": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/dumbbell-bench-press.gif",
    muscles: "Pectorals, Triceps, Anterior Deltoids",
    instructions: [
      "Lie flat on the floor with your knees bent and feet flat on the floor.",
      "Hold a dumbbell in each hand, with your upper arms resting flat on the floor, elbows at 45 degrees.",
      "Press the dumbbells straight up over your chest.",
      "Lower the weights slowly until your upper arms rest flat on the floor again.",
      "Pause for a split second on the floor before pressing up again."
    ],
    breathing: "Exhale as you press up; inhale as you lower the dumbbells to the floor.",
    postureTip: "The floor limits the range of motion, saving the shoulder joints while still building chest and triceps.",
    alternatives: ["Dumbbell Decline Bench Press", "Push-Ups", "Chest Dips", "Barbell Decline Bench Press"]
  },
  "Push-Ups": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/push-up.gif",
    muscles: "Lower & Mid Chest, Anterior Deltoids, Triceps",
    instructions: [
      "Place your hands slightly wider than shoulder-width on the floor.",
      "Lower your body until your chest is close to the floor, keeping your body in a straight line.",
      "Push back up to the start position, locking your elbows at the top."
    ],
    breathing: "Inhale as you lower; exhale as you press back up.",
    postureTip: "Do not let your hips sag or your butt stick up in the air.",
    alternatives: ["Dumbbell Decline Bench Press", "Barbell Decline Bench Press"]
  },
  "Dumbbell Decline Bench Press": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/dumbbell-decline-bench-press.gif",
    muscles: "Lower Chest, Triceps, Anterior Deltoids",
    instructions: [
      "Lie on a decline bench with your feet secured under the pads.",
      "Hold a dumbbell in each hand at your chest with a 45-degree elbow angle.",
      "Press the weights straight up towards the ceiling.",
      "Lower them slowly back to chest level, feeling the stretch in the lower chest."
    ],
    breathing: "Inhale as you lower; exhale as you press up.",
    postureTip: "Keep your shoulder blades retracted and pinned to the bench throughout.",
    alternatives: ["Push-Ups", "Barbell Decline Bench Press"]
  },
  "Barbell Decline Bench Press": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/barbell-decline-bench-press.gif",
    muscles: "Lower Chest, Triceps, Anterior Deltoids",
    instructions: [
      "Lie on a decline bench with your feet secured under the pads.",
      "Grip the barbell slightly wider than shoulder-width and unrack it.",
      "Lower the bar slowly to your lower chest/sternum.",
      "Press the bar straight up to lockout."
    ],
    breathing: "Inhale on the way down; exhale as you press up.",
    postureTip: "Do not let the barbell bounce off your chest. Maintain tight form.",
    alternatives: ["Push-Ups", "Dumbbell Decline Bench Press"]
  },
  "Dumbbell Lat Pullover": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/dumbbell-pullover.gif",
    muscles: "Lats, Upper Chest, Serratus Anterior",
    instructions: [
      "Lie across a flat bench, supporting your upper back. Place feet flat on the floor.",
      "Hold a dumbbell with both hands directly above your chest, arms slightly bent.",
      "Lower the weight slowly behind your head in an arc until your arms are in line with your torso.",
      "Pull the dumbbell back over your chest, squeezing your lats and chest."
    ],
    breathing: "Inhale as you lower the dumbbell; exhale as you pull it up.",
    postureTip: "Keep your hips low throughout the movement to maintain a deep stretch in the lats.",
    alternatives: ["Push-Ups", "Barbell Decline Bench Press"]
  },

  // --- TRICEPS EXERCISES ---
  "Overhead Dumbbell Extension": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/triceps/dumbbell-decline-triceps-extension.gif",
    muscles: "Triceps (Long Head Focus)",
    instructions: [
      "Sit on a seat or stand. Hold a dumbbell with both hands under the inner rim of the plate.",
      "Lift the dumbbell straight overhead, keeping your elbows tucked close to your ears.",
      "Lower the weight slowly behind your head by bending only at the elbows, feeling the stretch in the triceps.",
      "Go down until your forearms are just past parallel to the floor.",
      "Contract your triceps to push the weight back up to the top, keeping elbows pointing forward."
    ],
    breathing: "Inhale as you lower the weight behind your head; exhale as you press it overhead.",
    postureTip: "Do not let your elbows flare out to the sides. Keep your core braced so your lower back doesn't over-arch.",
    alternatives: ["Triceps Kickbacks", "Close Grip Bench Press", "Triceps Dips", "Cable Pushdown"]
  },
  "Cable Rope Pushdowns": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/triceps/cable-pushdown-with-rope-attachment.gif",
    muscles: "Triceps (Lateral and Medial Heads)",
    instructions: [
      "Attach a rope to a high pulley. Grip the rope close to the knots.",
      "Stand close to the machine, lean slightly forward, and pin your elbows to your ribcage.",
      "Push the rope down towards your thighs by extending your arms.",
      "At the bottom, pull the rope ends apart (flaring them outwards) to maximize triceps contraction.",
      "Control the rope back up to chest level, keeping your elbows locked in place."
    ],
    breathing: "Inhale as the hands rise to chest level; exhale as you push down and flare the rope.",
    postureTip: "Ensure your shoulders do not shrug up. Keep your upper arms completely stationary; only the forearms should move.",
    alternatives: ["Triceps Dips", "Close Grip Bench Press", "Triceps Kickbacks", "Cable Pushdown"]
  },
  "Triceps Kickbacks": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/triceps/dumbbell-kickback.gif",
    muscles: "Triceps (Lateral and Long Head)",
    instructions: [
      "Hinge forward at the hips, keeping your back flat. Bend your elbows to 90 degrees.",
      "Extend your arms fully behind you, locking your upper arms in place.",
      "Squeeze your triceps at full extension, then return to starting position."
    ],
    breathing: "Exhale as you extend your arm; inhale as you return to 90 degrees.",
    postureTip: "Keep your upper arm parallel to the floor throughout.",
    alternatives: ["Triceps Dips", "Close Grip Bench Press"]
  },
  "Triceps Dips": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/triceps/bench-dip.gif",
    muscles: "Triceps, Pectorals, Anterior Deltoids",
    instructions: [
      "Position your hands shoulder-width apart on the edge of a bench or chair.",
      "Extend your legs out in front and lift your butt off the bench.",
      "Lower your hips by bending your elbows until your upper arms are parallel to the floor.",
      "Push back up by extending your arms fully."
    ],
    breathing: "Inhale as you lower; exhale as you press up.",
    postureTip: "Keep your back close to the bench throughout the movement to avoid shoulder strain.",
    alternatives: ["Triceps Kickbacks", "Close Grip Bench Press"]
  },
  "Close Grip Bench Press": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/triceps/barbell-close-grip-bench-press.gif",
    muscles: "Triceps, Chest, Anterior Deltoids",
    instructions: [
      "Lie flat on a bench and grip the barbell with hands about shoulder-width apart.",
      "Lower the bar slowly to your lower chest, keeping your elbows tucked close to your sides.",
      "Press the bar straight up to lockout by contracting your triceps."
    ],
    breathing: "Inhale as you lower the bar; exhale as you press it up.",
    postureTip: "Do not place your hands too close together (less than 8 inches), as this places excessive strain on the wrists.",
    alternatives: ["Triceps Kickbacks", "Triceps Dips"]
  },

  // --- BACK EXERCISES ---
  "Lat Pulldowns": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/lats/cable-pulldown.gif",
    muscles: "Latissimus Dorsi (Lats), Upper Back, Biceps",
    instructions: [
      "Sit at the pulldown station and adjust the knee pads. Grip the bar wider than shoulder width.",
      "Leaning back slightly (10-15 degrees), pull the bar down towards your upper chest.",
      "Drive your elbows down and back, imagining bringing your elbows into your back pockets.",
      "Squeeze your shoulder blades together at the bottom of the movement.",
      "Slowly extend your arms back up to the starting position, letting the weight stretch your lats."
    ],
    breathing: "Exhale as you pull the bar down; inhale as you slowly release it back to the top.",
    postureTip: "Do not use momentum to swing and pull the bar. Focus on pulling with your back, not your arms.",
    alternatives: ["Cable Seated Row", "Inverted Row", "Dumbbell Lat Pullover", "Inverted Row Bent Knees"]
  },
  "Barbell Rows": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/upper-back/barbell-incline-row.gif",
    muscles: "Upper Back, Lats, Rear Deltoids, Core",
    instructions: [
      "Stand with feet shoulder-width apart. Hold a barbell with an overhand grip.",
      "Hinge at the hips, keeping your back completely flat, until your torso is at a 45-degree angle.",
      "Pull the barbell up towards your lower chest/belly button, driving your elbows back.",
      "Squeeze your upper back muscles at the peak of the contraction.",
      "Lower the bar slowly under control to the starting position, fully extending your arms."
    ],
    breathing: "Inhale before initiating; exhale as you pull the bar to your torso; inhale as you lower it.",
    postureTip: "Keep your spine completely neutral. Do not round your lower back under weight, as this causes spinal pressure.",
    alternatives: ["Cable Seated Row", "Inverted Row", "Dumbbell Lat Pullover", "Inverted Row Bent Knees"]
  },
  "Single-Arm Dumbbell Rows": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/upper-back/dumbbell-incline-row.gif",
    muscles: "Latissimus Dorsi, Rhomboids, Lower Traps",
    instructions: [
      "Place one knee and same-side hand on a flat bench. Keep your back flat and parallel to the bench.",
      "Hold a dumbbell in your free hand, letting it hang straight down.",
      "Row the dumbbell up towards your hip pocket, keeping your elbow tucked close to your torso.",
      "Squeeze your lat muscle at the top of the lift.",
      "Lower the dumbbell slowly to the starting position, letting it stretch the upper back."
    ],
    breathing: "Exhale as you pull the dumbbell up; inhale as you lower it back down.",
    postureTip: "Do not twist your torso at the top to cheat the weight. Keep your shoulders square to the bench.",
    alternatives: ["Cable Seated Row", "Inverted Row", "Dumbbell Lat Pullover", "Inverted Row Bent Knees"]
  },
  "Pull-Ups / Assisted Pull-Ups": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/lats/assisted-pull-up.gif",
    muscles: "Lats, Upper Back, Biceps, Core",
    instructions: [
      "Grip the pull-up bar with an overhand grip, wider than shoulder-width.",
      "Hang with arms fully extended (dead hang), keeping your shoulders active (don't sag).",
      "Pull your body up by driving your elbows down, chest pointing up towards the bar.",
      "Raise yourself until your chin clears the bar.",
      "Lower your body under control back to a dead hang."
    ],
    breathing: "Exhale as you pull your body up; inhale as you slowly lower yourself.",
    postureTip: "Do not swing or kick your legs (kipping). If needed, use a resistance band or assisted machine for support.",
    alternatives: ["Cable Seated Row", "Inverted Row", "Dumbbell Lat Pullover", "Inverted Row Bent Knees"]
  },
  "Cable Seated Row": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/upper-back/cable-seated-row.gif",
    muscles: "Upper Back, Lats, Rhomboids, Biceps",
    instructions: [
      "Sit at a cable row station with feet on platform and knees slightly bent.",
      "Grip the attachment (V-bar) and sit tall with shoulders back.",
      "Pull the handle towards your lower abdomen, driving your elbows back.",
      "Squeeze your back muscles, then slowly return to the start."
    ],
    breathing: "Exhale as you pull; inhale as you return.",
    postureTip: "Keep your spine neutral and avoid swinging your torso to pull the weight.",
    alternatives: ["Inverted Row", "Dumbbell Lat Pullover"]
  },
  "Inverted Row": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/upper-back/inverted-row.gif",
    muscles: "Lats, Rhomboids, Rear Delts, Core",
    instructions: [
      "Set a barbell in a rack at waist height.",
      "Lie underneath the bar and grip it with an overhand grip slightly wider than shoulders.",
      "Keep your body in a straight line, heels on the floor.",
      "Pull your chest up to the bar by driving your elbows down.",
      "Lower yourself slowly back to the starting position."
    ],
    breathing: "Exhale as you pull up; inhale as you lower down.",
    postureTip: "Keep your glutes and core braced so your body stays rigid like a plank.",
    alternatives: ["Cable Seated Row", "Dumbbell Lat Pullover"]
  },

  // --- BICEPS EXERCISES ---
  "Incline Dumbbell Curls": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/biceps/dumbbell-incline-biceps-curl.gif",
    muscles: "Biceps Brachii (Short Head Focus)",
    instructions: [
      "Set an incline bench to 45 degrees. Sit back with a dumbbell in each hand, arms hanging straight down.",
      "Keep your shoulders rolled back and palms facing forward.",
      "Curl the dumbbells up towards your shoulders, keeping your elbows pinned in place behind your torso.",
      "Squeeze your biceps hard at the peak of the movement.",
      "Lower the weights slowly, maintaining tension, back to a dead hang."
    ],
    breathing: "Exhale as you curl the weights; inhale as you lower them with control.",
    postureTip: "Ensure your elbows do not swing forward. The incline isolates the biceps specifically because the elbow stays back.",
    alternatives: ["Dumbbell Bicep Curls", "Preacher Curl", "Concentration Curls", "Barbell Curl"]
  },
  "Dumbbell Hammer Curls": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/biceps/dumbbell-hammer-curl.gif",
    muscles: "Biceps (Brachialis & Brachioradialis), Forearms",
    instructions: [
      "Stand tall, holding a dumbbell in each hand with palms facing each other (neutral grip).",
      "Pin your elbows close to your torso.",
      "Curl the dumbbells up while maintaining the neutral grip (thumbs pointing up).",
      "Contract your biceps and forearms at the top.",
      "Lower the weights back down slowly, keeping tension on the arms."
    ],
    breathing: "Exhale as you lift; inhale as you return the weights under control.",
    postureTip: "Do not swing your body to lift the weight. Stand firm and keep your wrists straight.",
    alternatives: ["Dumbbell Reverse Curls", "Preacher Curl", "Concentration Curls", "Barbell Curl"]
  },
  "Dumbbell Bicep Curls": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/biceps/dumbbell-biceps-curl.gif",
    muscles: "Biceps Brachii",
    instructions: [
      "Stand tall with dumbbells at your sides, palms facing forward.",
      "Curl the weights up while keeping your elbows locked at your sides.",
      "Squeeze your biceps at the peak, then lower back down slowly."
    ],
    breathing: "Exhale as you curl up; inhale as you lower the weights.",
    postureTip: "Do not swing your back to lift the dumbbells.",
    alternatives: ["Concentration Curls", "Preacher Curl"]
  },
  "Concentration Curls": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/biceps/dumbbell-concentration-curl.gif",
    muscles: "Biceps Brachii (Short Head Focus)",
    instructions: [
      "Sit on a bench with your feet flat on the floor, wider than shoulder-width.",
      "Hold a dumbbell in one hand and lean forward slightly, resting your elbow against the inside of your thigh.",
      "Curl the dumbbell up towards your shoulder, focusing on isolating the bicep.",
      "Squeeze at the top, then lower the weight slowly to the start position."
    ],
    breathing: "Exhale as you curl the weight; inhale as you lower it.",
    postureTip: "Do not swing your torso or shoulder. The elbow should remain pinned against the inner thigh for complete isolation.",
    alternatives: ["Dumbbell Bicep Curls", "Preacher Curl"]
  },
  "Preacher Curl": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/biceps/barbell-preacher-curl.gif",
    muscles: "Biceps Brachii (Short Head Focus)",
    instructions: [
      "Sit at a preacher bench and rest your upper arms flat on the pad.",
      "Grip an EZ-bar or barbell at shoulder-width, palms up.",
      "Curl the bar up towards your chin, keeping your arms flat on the pad.",
      "Squeeze at the top, then slowly lower the bar back to full extension."
    ],
    breathing: "Exhale as you curl up; inhale as you lower down.",
    postureTip: "Do not lift your elbows off the pad. Keep your wrists straight.",
    alternatives: ["Dumbbell Bicep Curls", "Concentration Curls"]
  },

  // --- LEGS / QUAD / GLUTE EXERCISES ---
  "Barbell Back Squats": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/glutes/barbell-full-squat.gif",
    muscles: "Quadriceps, Gluteus Maximus, Hamstrings, Core",
    instructions: [
      "Rest the barbell on your upper traps. Stand with feet slightly wider than shoulder-width, toes angled slightly out.",
      "Brace your core, push your hips back, and bend your knees to squat down.",
      "Descend until your thighs are at least parallel to the floor, keeping your chest up and back flat.",
      "Push through your mid-foot and heels to drive back up to the starting position.",
      "Squeeze your glutes at the top of the lift."
    ],
    breathing: "Take a deep breath and brace your core before squatting down; exhale as you push up past the stick-point.",
    postureTip: "Keep your knees tracking in line with your toes. Do not let your knees collapse inwards (valgus collapse).",
    alternatives: ["Leg Press", "Step-Ups", "Dumbbell Lunges", "Barbell Front Squat"]
  },
  "Dumbbell Goblet Squats": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/quads/dumbbell-goblet-squat.gif",
    muscles: "Quadriceps, Glutes, Core, Forearms",
    instructions: [
      "Hold a dumbbell vertically by one end under your chin, keeping it close to your chest.",
      "Stand with feet shoulder-width apart, toes pointing slightly out.",
      "Push your hips back and squat down, keeping your torso upright and back flat.",
      "Push your knees out so your elbows can slide down inside your knees at the bottom.",
      "Drive back up by pushing through your feet, squeezing your glutes at the top."
    ],
    breathing: "Inhale as you squat down; exhale as you stand up.",
    postureTip: "Keep the dumbbell pinned close to your chest. If it drifts forward, it will strain your lower back.",
    alternatives: ["Leg Press", "Step-Ups", "Dumbbell Lunges", "Barbell Front Squat"]
  },
  "Leg Extensions": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/quads/lever-leg-extension.gif",
    muscles: "Quadriceps (Isolated)",
    instructions: [
      "Sit on the machine, adjust the pad to rest on top of your lower shins/ankles, and grab the side handles.",
      "Contract your quads to extend your legs fully until they are straight in front of you.",
      "Squeeze your quadriceps hard at the peak for 1 second.",
      "Lower the weight slowly under control back to the starting position.",
      "Avoid letting the weight stack crash at the bottom."
    ],
    breathing: "Exhale as you extend your legs; inhale as you slowly lower the weight.",
    postureTip: "Keep your hips flat on the seat. Hold the handles tightly to prevent your body from rising up.",
    alternatives: ["Leg Press", "Step-Ups", "Dumbbell Lunges", "Barbell Front Squat"]
  },
  "Dumbbell Lunges": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/quads/dumbbell-lunge.gif",
    muscles: "Quadriceps, Glutes, Hamstrings",
    instructions: [
      "Stand tall, holding dumbbells at your sides.",
      "Step forward with one leg and lower your hips until both knees are bent at 90 degrees.",
      "Push back up to the starting position and repeat on the other side."
    ],
    breathing: "Inhale as you step forward and lower; exhale as you push back up.",
    postureTip: "Keep your front knee directly above your ankle; do not let it pass your toes.",
    alternatives: ["Leg Press", "Step-Ups"]
  },
  "Leg Press": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/quads/sled-leg-press.gif",
    muscles: "Quadriceps, Glutes, Hamstrings",
    instructions: [
      "Sit on the leg press machine and place your feet shoulder-width apart on the platform.",
      "Release the safety keys and lower the platform towards your chest by bending your knees to 90 degrees.",
      "Push the platform away by extending your legs, keeping your feet flat on the sled."
    ],
    breathing: "Inhale as you lower the platform; exhale as you push it away.",
    postureTip: "Never fully lock out your knees at the top of the movement. Keep your hips firmly pressed into the seat.",
    alternatives: ["Dumbbell Lunges", "Step-Ups"]
  },
  "Step-Ups": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/glutes/dumbbell-step-up.gif",
    muscles: "Quadriceps, Glutes, Hamstrings",
    instructions: [
      "Stand in front of a flat bench or box, holding dumbbells at your sides.",
      "Place one foot flat on the bench, then drive through the heel to step up.",
      "Bring your trailing foot onto the bench, then step back down slowly under control.",
      "Repeat for reps, then swap legs."
    ],
    breathing: "Exhale as you step up; inhale as you step down.",
    postureTip: "Do not push off the floor with your trailing foot. Force the lead leg to do all the work.",
    alternatives: ["Leg Press", "Dumbbell Lunges"]
  },

  // --- HAMSTRINGS / GLUTES ---
  "Romanian Deadlifts (RDL)": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/glutes/barbell-romanian-deadlift.gif",
    muscles: "Hamstrings, Glutes, Lower Back, Core",
    instructions: [
      "Stand holding a barbell at hip level with an overhand grip. Feet should be hip-width apart.",
      "Keep a slight bend in your knees. Push your hips back and hinge forward at your waist.",
      "Lower the bar down the front of your legs, keeping it close to your shins, until you feel a deep stretch in your hamstrings.",
      "Ensure your spine remains flat and shoulders are pinned back.",
      "Drive your hips forward and squeeze your glutes to return to a standing position."
    ],
    breathing: "Inhale as you hinge forward and lower the bar; exhale as you drive hips forward to stand.",
    postureTip: "Do not squat the weight down. This is a hinge movement. Keep the bar touching your legs throughout.",
    alternatives: ["Lying Leg Curls", "Single-Leg Romanian Deadlift", "Glute Bridge", "Dumbbell Romanian Deadlift"]
  },
  "Glute Bridge": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/glutes/bodyweight-glute-bridge.gif",
    muscles: "Gluteus Maximus, Hamstrings, Core",
    instructions: [
      "Lie on your back with knees bent and feet flat on the floor, hip-width apart.",
      "Drive through your heels to lift your hips towards the ceiling, squeezing your glutes hard at the top.",
      "Keep a straight line from your shoulders to your knees.",
      "Lower your hips slowly back to the floor."
    ],
    breathing: "Exhale as you lift your hips; inhale as you lower them.",
    postureTip: "Do not arch your lower back excessively at the top. Focus the drive and contraction in your glutes.",
    alternatives: ["Lying Leg Curls", "Single-Leg Romanian Deadlift"]
  },
  "Lying Leg Curls": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/hamstrings/lever-lying-leg-curl.gif",
    muscles: "Hamstrings",
    instructions: [
      "Lie face down on the machine, placing the pad just below your calves.",
      "Pull your heels toward your glutes, keeping your hips pressed down.",
      "Squeeze your hamstrings at the top, then slowly lower to starting position."
    ],
    breathing: "Exhale as you curl your legs up; inhale as you lower them.",
    postureTip: "Do not let your lower back arch excessively to cheat the weight.",
    alternatives: ["Single-Leg Romanian Deadlift", "Glute Bridge"]
  },
  "Single-Leg Romanian Deadlift": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/glutes/dumbbell-romanian-deadlift.gif",
    muscles: "Hamstrings, Glutes, Core Stabilizers",
    instructions: [
      "Stand tall holding a dumbbell in the opposite hand of your standing leg.",
      "Hinge forward from the hip, keeping your back flat and standing leg slightly bent.",
      "Extend your trailing leg straight behind you for balance.",
      "Lower the weight towards the floor, then squeeze your glute to stand up."
    ],
    breathing: "Inhale as you hinge forward; exhale as you return to standing.",
    postureTip: "Keep your hips square to the floor. Do not let your pelvis rotate outwards.",
    alternatives: ["Lying Leg Curls", "Glute Bridge"]
  },

  // --- ABS / CORE ---
  "Hanging Knee Raises": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/assisted-hanging-knee-raise.gif",
    muscles: "Lower Rectus Abdominis, Hip Flexors",
    instructions: [
      "Hang from a pull-up bar with an overhand grip, arms straight and body relaxed.",
      "Brace your abs and lift your knees up towards your chest, bending your knees to 90 degrees.",
      "Tilt your pelvis upward at the top to engage the lower abs, rather than just lifting your legs.",
      "Squeeze your core at the peak.",
      "Lower your legs slowly under control to prevent swinging."
    ],
    breathing: "Exhale as you tuck your knees up; inhale as you slowly lower them.",
    postureTip: "Minimize momentum. Avoid swinging back and forth. Perform the movement with strict, slow core control.",
    alternatives: ["Hanging Leg Raise", "Cable Reverse Crunch", "Lying Leg Raise", "Wheel Rollerout"]
  },
  "Plank Hold": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/front-plank-with-twist.gif",
    muscles: "Transverse Abdominis, Core Stabilizers, Shoulders",
    instructions: [
      "Place your forearms on the floor, elbows aligned directly under your shoulders.",
      "Extend your legs behind you, resting your weight on your toes. Keep your body in a straight line.",
      "Squeeze your glutes, brace your core, and push down through your elbows.",
      "Do not let your hips sag towards the floor or push your butt up in the air.",
      "Hold this rigid position for the target duration."
    ],
    breathing: "Take steady, shallow breaths while maintaining full abdominal bracing tension.",
    postureTip: "Keep your neck neutral by looking at the floor slightly in front of your hands. Keep your abs pulled in.",
    alternatives: ["Hanging Leg Raise", "Lying Leg Raise", "Dead Bug", "Wheel Rollerout"]
  },
  "Bicycle Crunches": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/band-bicycle-crunch.gif",
    muscles: "Rectus Abdominis, Obliques",
    instructions: [
      "Lie on the floor, lower back pressed down. Place your hands lightly behind your head.",
      "Lift your shoulder blades off the floor, raising your knees to 90 degrees.",
      "Pedal your legs: extend one leg straight out while twisting your torso to bring opposite elbow to opposite knee.",
      "Twist to the other side: touch the other elbow and knee, extending the opposite leg.",
      "Maintain a steady, controlled rhythm."
    ],
    breathing: "Exhale as you twist and touch elbow to knee; inhale as you switch sides.",
    postureTip: "Do not pull on your neck with your hands. Focus on rotating from your core/obliques.",
    alternatives: ["Cable Reverse Crunch", "Lying Leg Raise", "Hanging Leg Raise", "Dead Bug"]
  },
  "Russian Twists": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/russian-twist.gif",
    muscles: "Obliques, Core Stabilizers, Hip Flexors",
    instructions: [
      "Sit on the floor with knees bent. Lean back slightly (45 degrees), keeping your spine straight.",
      "Lift your feet off the floor slightly to balance on your sit bones. Hold a weight with both hands.",
      "Twist your torso to the right, tapping the weight on the floor beside your hip.",
      "Twist back to the left, tapping the weight on the left side.",
      "Keep your movement controlled and rotate your shoulders."
    ],
    breathing: "Exhale on each twist to the side; inhale as you transition through the center.",
    postureTip: "Avoid rounding your spine. If you feel back pain, place your feet flat on the floor for stability.",
    alternatives: ["Cable Reverse Crunch", "Lying Leg Raise", "Hanging Leg Raise", "Dead Bug"]
  },
  "Hanging Leg Raise": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/hanging-leg-raise.gif",
    muscles: "Rectus Abdominis, Obliques, Hip Flexors",
    instructions: [
      "Hang from a pull-up bar with an overhand grip, arms straight.",
      "Keep your legs straight and raise them up until they are parallel to the floor.",
      "Lower your legs slowly back to the starting position without swinging."
    ],
    breathing: "Exhale as you raise your legs; inhale as you lower them.",
    postureTip: "Avoid swinging. Use your abs to control the ascent and descent.",
    alternatives: ["Cable Reverse Crunch", "Lying Leg Raise"]
  },
  "Cable Reverse Crunch": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/cable-reverse-crunch.gif",
    muscles: "Lower Abs, Core Stabilizers",
    instructions: [
      "Lie on your back near a low pulley with ankle straps attached to your ankles.",
      "Keep your knees bent at 90 degrees and arms flat at your sides.",
      "Pull your knees towards your chest, lifting your hips slightly off the floor.",
      "Slowly extend your legs back to the starting position under control."
    ],
    breathing: "Exhale as you pull your knees in; inhale as you return.",
    postureTip: "Focus on rolling your pelvis up to engage the lower abdominal wall.",
    alternatives: ["Hanging Leg Raise", "Lying Leg Raise"]
  },
  "Lying Leg Raise": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/lying-leg-raise-flat-bench.gif",
    muscles: "Lower Abs, Rectus Abdominis, Hip Flexors",
    instructions: [
      "Lie flat on your back on a bench or floor, gripping the bench behind your head for support.",
      "Keep your legs straight and raise them up until they are vertical.",
      "Slowly lower your legs back down until they are just above the floor, maintaining lower back contact."
    ],
    breathing: "Exhale as you raise your legs; inhale as you lower them.",
    postureTip: "Press your lower back firmly into the bench or floor to prevent back strain.",
    alternatives: ["Hanging Leg Raise", "Cable Reverse Crunch"]
  },

  // --- SHOULDERS / POSTURE ---
  "Seated Barbell Overhead Press": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/barbell-seated-overhead-press.gif",
    muscles: "Anterior Deltoids, Upper Chest, Triceps",
    instructions: [
      "Sit on an upright bench. Hold the barbell on your upper chest, hands slightly wider than shoulder-width.",
      "Brace your core and press the barbell straight up overhead.",
      "As the bar clears your forehead, press your head forward slightly so the bar ends directly above the back of your skull.",
      "Lock out your arms at the top.",
      "Lower the bar back under control to your upper chest."
    ],
    breathing: "Inhale and brace at the bottom; exhale as you push the bar overhead; inhale as you lower the bar.",
    postureTip: "Do not arch your lower back excessively off the bench pad. Pin your butt and upper back to the bench.",
    alternatives: ["Dumbbell Shoulder Press", "Dumbbell Arnold Press", "Cable Upright Row", "Dumbbell Front Raise"]
  },
  "Standing Dumbbell Lateral Raises": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/dumbbell-lateral-raise.gif",
    muscles: "Lateral Deltoids (Side Shoulders)",
    instructions: [
      "Stand tall, holding a dumbbell in each hand at your sides. Lean slightly forward from your hips.",
      "Raise your arms out to the sides in a wide arc, leading with your elbows.",
      "Slightly tilt the dumbbells at the top (like pouring water out of a pitcher) to target the side delts.",
      "Raise the weights until your arms are parallel to the floor.",
      "Lower the dumbbells slowly, resisting gravity, back to your sides."
    ],
    breathing: "Exhale as you raise the dumbbells; inhale as you lower them with control.",
    postureTip: "Do not shrug your shoulders up to lift the weights. Keep your neck relaxed and swing wide, not up.",
    alternatives: ["Cable Lateral Raise", "Dumbbell Shoulder Press", "Dumbbell Arnold Press", "Dumbbell Front Raise"]
  },
  "Dumbbell Shoulder Press": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/dumbbell-seated-shoulder-press.gif",
    muscles: "Anterior Deltoids, Lateral Deltoids, Triceps",
    instructions: [
      "Sit on a bench with back support, holding a dumbbell in each hand at shoulder height, palms facing forward.",
      "Brace your core and press the dumbbells straight up overhead until your arms are fully extended.",
      "Slowly lower the dumbbells back down to shoulder level, keeping your elbows at about a 45-degree angle."
    ],
    breathing: "Exhale as you press up; inhale as you lower the weights.",
    postureTip: "Do not let the dumbbells clank together at the top. Keep your back flat against the bench pad.",
    alternatives: ["Dumbbell Arnold Press", "Cable Upright Row"]
  },
  "Dumbbell Arnold Press": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/dumbbell-arnold-press.gif",
    muscles: "Anterior Deltoids, Lateral Deltoids, Triceps",
    instructions: [
      "Sit on a bench with back support. Hold dumbbells in front of your shoulders, palms facing you.",
      "As you press the weights overhead, rotate your wrists so your palms face forward at the top.",
      "Lower the weights back down, rotating your wrists back to the start position."
    ],
    breathing: "Exhale as you press up; inhale as you lower down.",
    postureTip: "Keep the rotation smooth and controlled. Do not rush the movement.",
    alternatives: ["Cable Upright Row", "Dumbbell Shoulder Press"]
  },
  "Cable Upright Row": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/cable-upright-row.gif",
    muscles: "Lateral Deltoids, Traps, Biceps",
    instructions: [
      "Attach a straight or EZ-bar to a low pulley and stand close to it.",
      "Grip the bar with an overhand grip, slightly narrower than shoulder-width.",
      "Pull the bar straight up towards your chin, leading with your elbows.",
      "Keep the bar close to your body and lower it under control."
    ],
    breathing: "Exhale as you pull up; inhale as you lower.",
    postureTip: "Ensure your elbows remain higher than your forearms at all times.",
    alternatives: ["Dumbbell Arnold Press", "Dumbbell Shoulder Press"]
  },

  // --- POSTURE / REAR DELTS / TRAPS ---
  "Cable Face Pulls (Rotator Cuff/Rear Delts)": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/cable-kneeling-rear-delt-row-with-rope-male.gif",
    muscles: "Rear Deltoids, Rotator Cuff, Rhomboids, Upper Traps",
    instructions: [
      "Attach a rope to a cable pulley at upper chest/face level. Hold rope ends with thumbs pointing back.",
      "Step back to create tension. Pull the rope towards your nose.",
      "As you pull, flare your elbows out and pull your hands apart, rotating your shoulders outwards.",
      "Squeeze your shoulder blades together at the peak.",
      "Extend your arms back slowly, letting the weight pull your shoulder blades open."
    ],
    breathing: "Exhale as you pull towards your face; inhale as you return to the starting position.",
    postureTip: "Excellent for correcting rounded shoulders. Keep your head stationary; do not push your neck forward.",
    alternatives: ["Dumbbell Rear Delt Raise", "Dumbbell Lying Rear Lateral Raise", "Cable Rear Delt Flyes", "Barbell Rear Delt Row"]
  },
  "Incline Dumbbell Y-Raises (Lower Traps)": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/upper-back/dumbbell-incline-y-raise.gif",
    muscles: "Lower Traps, Rear Deltoids, Rotator Cuff",
    instructions: [
      "Lie chest-down on an incline bench set to 30 degrees. Hold light dumbbells in your hands.",
      "Let your arms hang straight down, thumbs pointing up towards the ceiling.",
      "Raise your arms up and out in a 'Y' shape (roughly a 45-degree angle from your body).",
      "Squeeze your lower traps at the top of the movement.",
      "Lower the weights slowly, maintaining shoulder alignment."
    ],
    breathing: "Exhale as you raise arms into the 'Y' shape; inhale as you lower them.",
    postureTip: "This is a rehabilitation & posture movement. Do not use heavy weights. Focus on lower trap squeeze.",
    alternatives: ["Dumbbell Rear Delt Raise", "Dumbbell Lying Rear Lateral Raise", "Cable Rear Delt Flyes", "Barbell Rear Delt Row"]
  },
  "Dumbbell Shrugs (Upper Traps)": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/traps/dumbbell-shrug.gif",
    muscles: "Upper Trapezius",
    instructions: [
      "Stand tall, holding a heavy dumbbell in each hand at your sides.",
      "Lift your shoulders straight up towards your ears as high as possible.",
      "Squeeze your traps hard at the peak for 1 second.",
      "Do not roll your shoulders backwards or forwards; move them straight up and down.",
      "Lower the dumbbells slowly back to the starting position, stretching the traps."
    ],
    breathing: "Exhale as you shrug up; inhale as you lower the weights.",
    postureTip: "Keep your neck straight. Avoid poking your head forward to reach your shoulders, as this causes neck strain.",
    alternatives: ["Barbell Shrugs", "Cable Shrugs", "Barbell Upright Row", "Cable Upright Row"]
  },
  "Dumbbell Rear Delt Raise": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/dumbbell-rear-delt-raise.gif",
    muscles: "Rear Deltoids, Rhomboids, Traps",
    instructions: [
      "Stand with feet shoulder-width apart, knees slightly bent, and hinge forward from your hips.",
      "Hold dumbbells hanging down, palms facing each other.",
      "Raise your arms out to the sides, keeping a slight bend in your elbows.",
      "Squeeze your rear delts at the top, then slowly lower the weights."
    ],
    breathing: "Exhale as you raise the weights; inhale as you lower them.",
    postureTip: "Do not swing the weights or use momentum. Keep your back flat.",
    alternatives: ["Dumbbell Lying Rear Lateral Raise", "Cable Rear Delt Flyes"]
  },
  "Dumbbell Lying Rear Lateral Raise": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/dumbbell-lying-rear-lateral-raise.gif",
    muscles: "Rear Deltoids, Rhomboids, Traps",
    instructions: [
      "Lie chest-down on a flat or incline bench.",
      "Hold dumbbells hanging down with palms facing each other.",
      "Raise your arms out to the sides, leading with your elbows.",
      "Lower the weights slowly back to the starting position under control."
    ],
    breathing: "Exhale as you raise the weights; inhale as you lower.",
    postureTip: "Resting your chest on the bench eliminates cheating and isolates the rear delts.",
    alternatives: ["Dumbbell Rear Delt Raise", "Cable Rear Delt Flyes"]
  },

  // --- CARDIO ---
  "Incline Treadmill Walk (12% Incline, 5km/h)": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/cardio/walking-on-incline-treadmill.gif",
    muscles: "Cardiovascular System, Glutes, Calves, Hamstrings",
    instructions: [
      "Set the treadmill incline to 12% and the speed to 5.0 km/h.",
      "Walk with a natural stride, focusing on stepping with your heels and driving off the toes.",
      "Keep your body upright; do not lean heavily forward or hold onto the rails.",
      "Brace your core slightly to support your posture.",
      "Maintain this steady cardio pace for 30 minutes."
    ],
    breathing: "Maintain deep, steady breathing, matching your breaths to your footsteps (e.g. inhale for 4 steps, exhale for 4).",
    postureTip: "Holding onto the treadmill handles reduces the calorie burn by up to 30%. Walk freely for maximum fat loss.",
    alternatives: ["Walk Elliptical Cross Trainer", "Stationary Bike Steady State"]
  },
  "HIIT Spin Bike (Sprints)": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/cardio/stationary-bike-run-v-3.gif",
    muscles: "Legs, Heart, Lungs, Glutes",
    instructions: [
      "Adjust the bike seat so your leg is almost straight (5-10 degree bend) at the bottom of the pedal stroke.",
      "Warm up for 2 minutes at a moderate pace.",
      "Sprint: pedal at maximum speed and high resistance for 30 seconds.",
      "Recover: pedal slowly at low resistance for 60 seconds.",
      "Repeat this sprint/recovery cycle for 15 minutes."
    ],
    breathing: "Breathe deeply and rapidly during sprints; focus on slow, controlled nose-breathing during recovery.",
    postureTip: "Keep your core braced during sprints. Do not bounce excessively in the saddle.",
    alternatives: ["Walk Elliptical Cross Trainer", "Rowing Machine Cardio"]
  },
  "Walk Elliptical Cross Trainer": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/cardio/walk-elliptical-cross-trainer.gif",
    muscles: "Cardiovascular System, Quads, Glutes, Calves",
    instructions: [
      "Step onto the elliptical pedals and grip the handles.",
      "Start pedaling forward, keeping your back straight and core braced.",
      "Push and pull the handles to engage your upper body.",
      "Maintain a steady pace for the duration of the workout."
    ],
    breathing: "Maintain deep, rhythmic breathing.",
    postureTip: "Keep your feet flat on the pedals and stand tall. Avoid leaning forward.",
    alternatives: ["Stationary Bike Steady State", "Rowing Machine Cardio"]
  },

  // --- STRETCHING & RECOVERY ---
  "Full-Body Static Stretching Protocol": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/triceps/triceps-stretch.gif",
    muscles: "Chest, Lats, Hamstrings, Glutes, Hip Flexors, Calves",
    instructions: [
      "Stretches include: overhead triceps stretch, chest doorframe stretch, seated hamstring reach, and kneeling hip flexor stretch.",
      "Hold each stretch for 20-30 seconds without bouncing (static hold).",
      "Sink deeper into the stretch as you feel the muscle relax.",
      "Repeat each stretch twice on both sides.",
      "Prioritize relaxing and letting your heart rate come down."
    ],
    breathing: "Inhale slowly through the nose; exhale slowly through the mouth, relaxing deeper into the stretch with each breath.",
    postureTip: "Never stretch to the point of sharp pain. A mild, comfortable pulling sensation is ideal.",
    alternatives: ["Exercise Ball Seated Hamstring Stretch", "Overhead Triceps Stretch", "Neck Side Stretch", "Lying Side Quads Stretch"]
  },
  "Exercise Ball Seated Hamstring Stretch": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/hamstrings/exercise-ball-seated-hamstring-stretch.gif",
    muscles: "Hamstrings, Lower Back",
    instructions: [
      "Sit on the exercise ball, then roll forward slightly so your hips are supported.",
      "Extend one leg straight out in front with your heel on the floor.",
      "Hinge forward from your hips, reaching towards your toes until you feel a stretch.",
      "Hold for 20-30 seconds, then swap sides."
    ],
    breathing: "Breathe deeply and sink into the stretch on each exhale.",
    postureTip: "Keep your back straight and do not round your spine.",
    alternatives: ["Overhead Triceps Stretch", "Neck Side Stretch", "Lying Side Quads Stretch", "Spine Stretch"]
  },
  "Overhead Triceps Stretch": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/triceps/overhead-triceps-stretch.gif",
    muscles: "Triceps, Lats",
    instructions: [
      "Stand or sit tall. Raise one arm overhead and bend the elbow to reach down your upper back.",
      "Use your opposite hand to gently push down on your elbow to deepen the stretch.",
      "Hold for 20-30 seconds, then switch arms."
    ],
    breathing: "Deep, slow breathing to relax the muscle fibers.",
    postureTip: "Keep your chest up and do not tuck your chin into your chest.",
    alternatives: ["Exercise Ball Seated Hamstring Stretch", "Neck Side Stretch", "Lying Side Quads Stretch", "Spine Stretch"]
  },
  "Neck Side Stretch": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/levator-scapulae/neck-side-stretch.gif",
    muscles: "Levator Scapulae, Upper Traps",
    instructions: [
      "Sit or stand tall with shoulders relaxed.",
      "Gently tilt your head towards one shoulder, bringing your ear closer to it.",
      "Use your hand to apply extremely light pressure if needed.",
      "Hold for 20-30 seconds, then swap sides."
    ],
    breathing: "Slow, deep breaths. Relax your shoulders.",
    postureTip: "Never pull hard on your neck. The stretch should be very gentle.",
    alternatives: ["Exercise Ball Seated Hamstring Stretch", "Overhead Triceps Stretch", "Lying Side Quads Stretch", "Spine Stretch"]
  },

  // --- NEW NON-PRESET ALTERNATIVES ---
  "Chest Dips": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/chest-dip.gif",
    muscles: "Lower Chest, Triceps, Anterior Deltoids",
    instructions: [
      "Grip the parallel bars and lift yourself up with arms straight.",
      "Lean your torso forward about 30 degrees to target the chest.",
      "Lower your body by bending your elbows until your upper arms are parallel to the floor.",
      "Push back up by extending your arms, squeezing your chest at the top."
    ],
    breathing: "Inhale as you lower; exhale as you push up.",
    postureTip: "Lean forward to target the chest. Staying upright shifts emphasis to the triceps.",
    alternatives: ["Dumbbell Decline Bench Press", "Push-Ups"]
  },
  "Incline Barbell Bench Press": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/barbell-incline-bench-press.gif",
    muscles: "Upper Chest (Clavicular Head), Anterior Deltoids, Triceps",
    instructions: [
      "Set an adjustable bench to 30-45 degrees. Lie back and grip the barbell slightly wider than shoulder-width.",
      "Unrack the bar and lower it to your upper chest with elbows at 45 degrees.",
      "Press the bar back up to lockout, focusing on the upper chest contraction."
    ],
    breathing: "Inhale as you lower; exhale as you press up.",
    postureTip: "Keep your shoulder blades retracted and pinned. Do not bounce the bar off your chest.",
    alternatives: ["Chest Dips", "Dumbbell Decline Bench Press"]
  },
  "Incline Cable Chest Flyes": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/cable-incline-fly.gif",
    muscles: "Upper Chest (Clavicular Head), Inner Pectorals",
    instructions: [
      "Set the pulleys to a low position and an incline bench between them.",
      "Lie on the incline bench, grip the handles, and bring them up above your chest.",
      "Open your arms wide in an arc, feeling a stretch across your upper chest.",
      "Bring the handles back together above your chest, squeezing your pectorals."
    ],
    breathing: "Inhale as you open your arms; exhale as you bring them together.",
    postureTip: "Keep a slight bend in your elbows throughout. Do not turn this into a press.",
    alternatives: ["Incline Barbell Bench Press", "Chest Dips"]
  },
  "Dumbbell Reverse Curls": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/forearms/dumbbell-reverse-curl.gif",
    muscles: "Brachioradialis, Forearms, Brachialis",
    instructions: [
      "Stand with dumbbells in each hand, palms facing down (overhand/pronated grip).",
      "Curl the weights up towards your shoulders while keeping the overhand grip.",
      "Squeeze at the top, then lower slowly back to the start."
    ],
    breathing: "Exhale as you curl up; inhale as you lower.",
    postureTip: "Keep your elbows pinned to your sides. Use lighter weight than regular curls.",
    alternatives: ["Concentration Curls", "Preacher Curl"]
  },
  "Cable Lateral Raise": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/cable-one-arm-lateral-raise.gif",
    muscles: "Lateral Deltoids (Side Shoulders)",
    instructions: [
      "Stand sideways next to a low cable pulley. Grip the handle with the far hand.",
      "Keeping a slight bend in your elbow, raise your arm out to the side until parallel to the floor.",
      "Squeeze your side delt at the top, then lower slowly under control."
    ],
    breathing: "Exhale as you raise; inhale as you lower.",
    postureTip: "Cables provide constant tension which dumbbells do not. Focus on a slow negative.",
    alternatives: ["Dumbbell Arnold Press", "Dumbbell Shoulder Press"]
  },
  "Cable Rear Delt Flyes": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/cable-rear-delt-fly.gif",
    muscles: "Rear Deltoids, Rhomboids, Traps",
    instructions: [
      "Set two cable pulleys to shoulder height. Stand in the center and cross-grip the handles (left hand grips right cable).",
      "Step back slightly to create tension. Keep arms nearly straight with a slight elbow bend.",
      "Pull the cables apart and back, squeezing your rear delts and shoulder blades together.",
      "Return slowly to the start position."
    ],
    breathing: "Exhale as you pull apart; inhale as you return.",
    postureTip: "Keep your torso upright and avoid using momentum.",
    alternatives: ["Dumbbell Rear Delt Raise", "Dumbbell Lying Rear Lateral Raise"]
  },
  "Barbell Shrugs": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/traps/barbell-shrug.gif",
    muscles: "Upper Trapezius",
    instructions: [
      "Stand tall holding a barbell with an overhand grip at thigh level.",
      "Shrug your shoulders straight up towards your ears as high as possible.",
      "Squeeze your traps hard at the top for 1-2 seconds.",
      "Lower the bar slowly back to the starting position."
    ],
    breathing: "Exhale as you shrug up; inhale as you lower.",
    postureTip: "Do not roll your shoulders. Move straight up and down only.",
    alternatives: ["Cable Shrugs", "Dumbbell Rear Delt Raise"]
  },
  "Cable Shrugs": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/traps/cable-shrug.gif",
    muscles: "Upper Trapezius",
    instructions: [
      "Stand facing a low cable pulley, gripping the straight bar attachment.",
      "With arms extended, shrug your shoulders straight up towards your ears.",
      "Hold the squeeze at the top for 1-2 seconds.",
      "Lower slowly, feeling the stretch in your traps."
    ],
    breathing: "Exhale as you shrug up; inhale as you lower.",
    postureTip: "Cables provide constant tension throughout the movement, unlike dumbbells.",
    alternatives: ["Barbell Shrugs", "Dumbbell Rear Delt Raise"]
  },
  "Rowing Machine Cardio": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/cardio/rowing-machine.gif",
    muscles: "Full Body Cardiovascular, Back, Legs, Core",
    instructions: [
      "Sit on the rower with feet strapped into the footrests. Grip the handle.",
      "Push off with your legs first, then lean back slightly and pull the handle to your lower chest.",
      "Reverse the motion: extend arms, lean forward, then bend your knees to slide forward.",
      "Maintain a steady pace for the target duration."
    ],
    breathing: "Exhale during the pull (drive phase); inhale during the recovery (return).",
    postureTip: "Drive primarily with your legs. Do not round your back.",
    alternatives: ["Walk Elliptical Cross Trainer", "Stationary Bike Steady State"]
  },
  "Stationary Bike Steady State": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/cardio/stationary-bike-run-v-3.gif",
    muscles: "Quadriceps, Hamstrings, Glutes, Cardiovascular System",
    instructions: [
      "Adjust the seat height so your leg has a slight bend at the bottom of the pedal stroke.",
      "Set a moderate resistance level.",
      "Pedal at a steady, comfortable pace (60-80 RPM).",
      "Maintain this pace for the target duration (15-30 minutes)."
    ],
    breathing: "Maintain deep, rhythmic breathing throughout.",
    postureTip: "Sit upright, do not hunch over the handlebars.",
    alternatives: ["Rowing Machine Cardio", "Walk Elliptical Cross Trainer"]
  },

  // --- 12 NEW NON-PRESET ALTERNATIVE EXERCISES ---
  "Cable Pushdown": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/triceps/cable-pushdown.gif",
    muscles: "Triceps (Lateral and Medial Heads)",
    instructions: [
      "Stand facing a high pulley machine with a straight bar or V-bar attachment, grip at shoulder-width, palms down.",
      "Pin your elbows to your sides and lean forward very slightly at the hips.",
      "Push the bar down to full extension by contracting your triceps hard.",
      "Squeeze at the bottom for a full one-second peak contraction.",
      "Return slowly and under control until your forearms are parallel to the floor."
    ],
    breathing: "Exhale as you push down; inhale slowly as you let the bar return to elbow height.",
    postureTip: "Keep your upper arms completely locked in place against your sides — only your forearms should move. Avoid shrugging your shoulders.",
    alternatives: ["Triceps Kickbacks", "Triceps Dips", "Close Grip Bench Press"]
  },
  "Inverted Row Bent Knees": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/upper-back/inverted-row-bent-knees.gif",
    muscles: "Lats, Rhomboids, Rear Deltoids, Core (easier variation)",
    instructions: [
      "Set a barbell in a rack at waist height. Lie underneath the bar and grip it with an overhand grip slightly wider than shoulder-width.",
      "Bend your knees at 90 degrees with feet flat on the floor to reduce bodyweight load.",
      "Keep your body in a straight line from knees to shoulders.",
      "Pull your chest up to the bar by driving your elbows down and back.",
      "Lower yourself slowly back to the starting position with full arm extension."
    ],
    breathing: "Exhale as you pull your chest up; inhale as you lower under control.",
    postureTip: "Bending your knees reduces the difficulty. As you get stronger, progress to straight-leg inverted rows. Keep your glutes and core tight throughout.",
    alternatives: ["Cable Seated Row", "Inverted Row", "Dumbbell Lat Pullover"]
  },
  "Barbell Curl": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/biceps/barbell-curl.gif",
    muscles: "Biceps Brachii (Both Heads), Brachialis",
    instructions: [
      "Stand tall holding a barbell with an underhand (supinated) grip, hands shoulder-width apart.",
      "Pin your elbows to your sides and keep them stationary throughout the movement.",
      "Curl the barbell up towards your chin, squeezing your biceps hard at the top.",
      "Hold the peak contraction for one second.",
      "Lower the barbell slowly back to full extension, maintaining tension in the biceps."
    ],
    breathing: "Exhale as you curl the barbell up; inhale as you lower it with control.",
    postureTip: "Do not swing your torso back to lift the weight. If you have to cheat, the weight is too heavy. Keep your wrists straight.",
    alternatives: ["Dumbbell Bicep Curls", "Concentration Curls", "Preacher Curl"]
  },
  "Barbell Front Squat": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/glutes/barbell-front-squat.gif",
    muscles: "Quadriceps (Primary), Glutes, Core Stabilizers",
    instructions: [
      "Rest the barbell on the front of your shoulders (front rack or cross-arm position). Stand with feet shoulder-width apart, toes slightly pointed out.",
      "Keep your elbows high throughout the movement to support the bar and maintain an upright torso.",
      "Push your hips back and bend your knees to squat down, keeping your chest up.",
      "Descend until your thighs are at least parallel to the floor.",
      "Drive through your mid-foot to stand back up, maintaining the upright torso."
    ],
    breathing: "Take a deep breath and brace before descending; exhale powerfully as you push up through the sticking point.",
    postureTip: "The front squat demands a very upright torso. If you struggle with wrist flexibility for the front rack, use the cross-arm position. This is more quad-dominant than a back squat.",
    alternatives: ["Leg Press", "Dumbbell Lunges", "Step-Ups"]
  },
  "Dumbbell Romanian Deadlift": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/glutes/dumbbell-romanian-deadlift.gif",
    muscles: "Hamstrings, Glutes, Lower Back (Erector Spinae)",
    instructions: [
      "Stand with feet hip-width apart holding a dumbbell in each hand in front of your thighs.",
      "Keep a soft bend in the knees throughout. Push your hips back and hinge forward at the waist.",
      "Lower the dumbbells down the front of your legs, keeping them close to your body.",
      "Descend until you feel a deep stretch in your hamstrings (typically mid-shin level).",
      "Drive your hips forward to stand, squeezing your glutes at the top."
    ],
    breathing: "Inhale as you hinge forward and lower the dumbbells; exhale as you drive your hips forward to return.",
    postureTip: "Keep your spine completely neutral throughout. Do not let your lower back round under load — this is a hip-hinge movement, not a squat.",
    alternatives: ["Lying Leg Curls", "Single-Leg Romanian Deadlift", "Glute Bridge"]
  },
  "Dead Bug": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/dead-bug.gif",
    muscles: "Rectus Abdominis, Transverse Abdominis (Core Stabilizers), Hip Flexors",
    instructions: [
      "Lie on your back with arms extended straight up towards the ceiling and knees bent at 90 degrees (tabletop position).",
      "Press your lower back firmly into the floor — maintain this contact for the entire set.",
      "Slowly lower your right arm overhead towards the floor while simultaneously extending your left leg out straight.",
      "Stop just before your arm or leg touches the floor.",
      "Return to the starting position, then repeat on the opposite side (left arm, right leg)."
    ],
    breathing: "Exhale slowly and deeply as you extend the arm and leg; inhale as you return to center. The exhale helps brace the core.",
    postureTip: "If your lower back presses off the floor at any point, you have gone too far. Reduce the range of motion until your core strength improves. Move slowly and deliberately.",
    alternatives: ["Hanging Leg Raise", "Lying Leg Raise", "Cable Reverse Crunch"]
  },
  "Wheel Rollerout": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/wheel-rollerout.gif",
    muscles: "Rectus Abdominis, Obliques, Transverse Abdominis, Shoulders, Lats",
    instructions: [
      "Kneel on the floor and grip the ab wheel handles with both hands.",
      "Brace your core tightly and keep your hips in line with your body.",
      "Roll the wheel forward slowly, extending your body towards the floor in a controlled arc.",
      "Go as far forward as you can while maintaining a flat back and without letting your hips sag.",
      "Pull the wheel back by contracting your abs, returning to the starting kneeling position."
    ],
    breathing: "Inhale as you roll forward; exhale forcefully as you pull back, using the exhale to brace your core.",
    postureTip: "This is an advanced exercise. Beginners should limit range of motion to 45 degrees. Never let your lower back collapse or arch excessively. Build up gradually.",
    alternatives: ["Hanging Leg Raise", "Cable Reverse Crunch", "Dead Bug"]
  },
  "Dumbbell Front Raise": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/dumbbell-front-raise.gif",
    muscles: "Anterior Deltoids (Front Shoulders), Upper Chest",
    instructions: [
      "Stand tall with a dumbbell in each hand hanging at your thighs, palms facing your legs.",
      "With a slight bend in your elbows, raise one or both arms straight forward until they are parallel to the floor.",
      "Hold briefly at the top, feeling the front deltoid contract.",
      "Lower the weight slowly and under control back to your sides."
    ],
    breathing: "Exhale as you raise the weights; inhale as you lower them.",
    postureTip: "Do not swing your body or lean back to lift the weight. Keep your torso completely upright. Use lighter weights and focus on the mind-muscle connection with your front delts.",
    alternatives: ["Dumbbell Shoulder Press", "Dumbbell Arnold Press", "Cable Upright Row"]
  },
  "Barbell Rear Delt Row": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/barbell-rear-delt-row.gif",
    muscles: "Rear Deltoids, Rhomboids, Upper Traps, Biceps",
    instructions: [
      "Stand holding a barbell with a pronated (overhand) grip, wider than shoulder-width.",
      "Hinge forward at the hips until your torso is nearly parallel to the floor — similar to a bent-over row position.",
      "Let the bar hang straight down from your chest.",
      "Pull the bar up directly towards your upper chest, flaring your elbows wide out to the sides.",
      "Squeeze your rear delts and shoulder blades together at the top, then lower slowly."
    ],
    breathing: "Exhale as you pull the bar to your chest; inhale as you lower it back to the hanging position.",
    postureTip: "The key difference from a regular row is the wide elbow flare, which shifts focus from the lats to the rear delts. Keep your back flat and avoid rounding your lower back.",
    alternatives: ["Dumbbell Rear Delt Raise", "Dumbbell Lying Rear Lateral Raise", "Cable Rear Delt Flyes"]
  },
  "Barbell Upright Row": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/barbell-upright-row.gif",
    muscles: "Upper Trapezius, Lateral Deltoids, Biceps",
    instructions: [
      "Stand holding a barbell with an overhand (pronated) grip, hands slightly narrower than shoulder-width, bar resting at hip level.",
      "Pull the bar straight up towards your chin, leading with your elbows — your elbows should rise higher than the bar at all times.",
      "Keep the bar close to your body throughout the movement.",
      "Raise until the bar is at mid-chest / collarbone height.",
      "Lower the bar slowly back to the starting position under full control."
    ],
    breathing: "Exhale as you pull the bar up; inhale as you lower it.",
    postureTip: "Use a shoulder-width or slightly wider grip to reduce internal shoulder rotation and minimize rotator cuff strain. Stop the pull at chest height — going higher increases impingement risk.",
    alternatives: ["Barbell Shrugs", "Cable Shrugs", "Cable Upright Row"]
  },
  "Lying Side Quads Stretch": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/quads/lying-side-quads-stretch.gif",
    muscles: "Quadriceps (Rectus Femoris), Hip Flexors",
    instructions: [
      "Lie on your side on a mat, keeping your body in a straight line.",
      "Rest your head on your bottom arm for support.",
      "Bend your top knee and grip your top ankle with your top hand.",
      "Gently pull your heel towards your glutes until you feel a stretch along the front of your thigh.",
      "Hold for 20-30 seconds, then flip sides and repeat."
    ],
    breathing: "Take slow, deep breaths. Relax deeper into the stretch with each exhale.",
    postureTip: "Keep your knees together and your hips stacked. Avoid arching your lower back — focus on pulling the heel toward the glutes rather than pulling the knee behind you.",
    alternatives: ["Exercise Ball Seated Hamstring Stretch", "Overhead Triceps Stretch", "Neck Side Stretch"]
  },
  "Spine Stretch": {
    gifUrl: "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/spine/spine-stretch.gif",
    muscles: "Erector Spinae, Thoracic Spine, Latissimus Dorsi, Glutes",
    instructions: [
      "Sit upright on a mat with your legs extended straight in front of you, slightly wider than hip-width.",
      "Flex your feet so toes point towards the ceiling.",
      "Reach your arms forward at shoulder height, and round your spine as you reach further forward.",
      "Imagine creating a 'C' curve with your spine, dropping your head between your arms.",
      "Hold the stretch for 20-30 seconds, then slowly return to an upright seated position."
    ],
    breathing: "Inhale to prepare; exhale as you round forward and reach. Breathe slowly and deeply, sinking further into the stretch on each exhale.",
    postureTip: "This movement decompresses the spine and counteracts the effects of sitting. Focus on rounding from your lower back up through your thoracic spine. Never force the stretch.",
    alternatives: ["Exercise Ball Seated Hamstring Stretch", "Neck Side Stretch", "Lying Side Quads Stretch"]
  },
};

export default function ExerciseVisualizer({ exerciseName, mode = 'thumbnail' }) {
  const [showModal, setShowModal] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const guide = EXERCISE_GUIDES[exerciseName];

  if (!guide) {
    if (mode === 'link') return null;
    return (
      <div className="w-12 h-12 bg-dark-bg/60 border border-dark-border/60 rounded-xl p-1 shrink-0 flex items-center justify-center">
        <Activity size={20} className="text-dark-textMuted" />
      </div>
    );
  }

  return (
    <>
      {mode === 'thumbnail' ? (
        /* Small Thumbnail Container */
        <div 
          onClick={() => setShowModal(true)}
          className="w-12 h-12 bg-dark-bg border border-dark-border hover:border-neon rounded-xl overflow-hidden shrink-0 flex items-center justify-center cursor-pointer transition-all active:scale-95 group relative"
          title="Tap to see video guide and form tips"
        >
          {!imgLoaded && (
            <div className="absolute inset-0 bg-dark-accent/40 animate-pulse flex items-center justify-center">
              <Activity size={16} className="text-dark-textMuted" />
            </div>
          )}
          <img 
            src={guide.gifUrl} 
            alt={exerciseName}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-90 group-hover:opacity-100' : 'opacity-0'}`}
          />
          <div className="absolute inset-0 bg-dark-bg/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[8px] font-bold text-neon transition-opacity uppercase font-mono tracking-wider">
            View
          </div>
        </div>
      ) : (
        /* Link/Button mode next to title */
        <button 
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1 px-2 py-0.5 bg-dark-accent/60 hover:bg-dark-accent border border-dark-border hover:border-neon/40 text-dark-textMuted hover:text-neon text-[10px] font-bold rounded-lg transition-all"
          title="View Form Guide"
        >
          <Sparkles size={10} className="text-neon" />
          Guide
        </button>
      )}

      {/* Tutorial Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-bg/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setShowModal(true)}
        >
          <div 
            className="w-full max-w-sm bg-dark-card border border-dark-border rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)] relative max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-dark-border/60 flex items-start justify-between">
              <div>
                <span className="text-[10px] text-neon font-mono uppercase tracking-wider block">Exercise Tutorial</span>
                <h3 className="text-base font-extrabold text-dark-textLight leading-tight mt-0.5">{exerciseName}</h3>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1.5 bg-dark-accent rounded-xl text-dark-textMuted hover:text-dark-textLight transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar">
              
              {/* Large GIF Visual */}
              <div className="w-full h-52 bg-dark-bg border border-dark-border rounded-2xl overflow-hidden flex items-center justify-center relative shadow-inner">
                <img 
                   src={guide.gifUrl} 
                   alt={exerciseName}
                   className="w-full h-full object-contain"
                />
              </div>

              {/* Targets */}
              <div>
                <span className="text-[10px] text-dark-textMuted font-mono uppercase tracking-wider block mb-1">Target Areas</span>
                <div className="flex items-center gap-1.5 text-xs text-dark-textLight font-semibold">
                  <Activity size={14} className="text-neon shrink-0" />
                  {guide.muscles}
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div>
                <span className="text-[10px] text-dark-textMuted font-mono uppercase tracking-wider block mb-2">Execution Guide</span>
                <ol className="space-y-2.5">
                  {guide.instructions.map((step, idx) => (
                    <li key={idx} className="flex gap-2.5 text-xs text-dark-textLight leading-relaxed">
                      <span className="w-5 h-5 rounded-lg bg-neon/10 border border-neon/20 text-neon font-mono font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Breathing Guide */}
              <div className="bg-dark-bg/60 border border-dark-border/40 rounded-2xl p-3.5 space-y-1.5">
                <span className="text-[10px] text-neon font-mono uppercase tracking-wider block">Breathing Protocol</span>
                <p className="text-xs text-dark-textMuted leading-relaxed">{guide.breathing}</p>
              </div>

              {/* Personal Trainer Tip */}
              <div className="bg-neon/5 border border-neon/20 rounded-2xl p-3.5 flex gap-2.5 items-start">
                <Sparkles size={16} className="text-neon mt-0.5 shrink-0" />
                <div className="space-y-0.5">
                  <span className="text-[10px] text-neon font-mono uppercase tracking-wider block">Trainer Tip</span>
                  <p className="text-xs text-dark-textMuted leading-relaxed">{guide.postureTip}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
