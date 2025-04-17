import db from "../index.js";

export const getRandomWorkoutWithExercises = async (day) => {
    try {
        // Step 1: Fetch all workouts for the specified day
        const workouts = await db.Workout.findAll({
            where: { Day: day },
            attributes: ['PlanID', 'Name', 'Description', 'Duration', 'CaloriesBurned', 'Type', 'TargetPart'],
        });

        if (!workouts || workouts.length === 0) {
            throw new Error(`No workouts found for ${day}.`);
        }

        // Step 2: Randomly select one workout
        const randomIndex = Math.floor(Math.random() * workouts.length);
        const selectedWorkout = workouts[randomIndex];

        // Step 3: Fetch all exercises for the selected workout
        const exercises = await db.Exercise.findAll({
            include: {
                model: db.Workout,
                through: { attributes: ['customReps', 'customSets', 'customDuration'] },
                where: { PlanID: selectedWorkout.PlanID },
            },
            attributes: ['ExerciseID', 'Name', 'Description', 'Duration', 'CaloriesBurned', 'Type', 'TargetPart', 'defaultReps', 'defaultSets'],
        });

        return {
            workout: selectedWorkout,
            exercises: exercises,
        };
    } catch (error) {
        console.error("Error fetching random workout with exercises:", error);
        throw error;
    }
};

export const createWorkoutWithExercises = async (workoutData, exercises) => {
    const transaction = await db.sequelize.transaction(); // Start a transaction
    try {
        // Step 1: Create the workout
        const newWorkout = await db.Workout.create(workoutData, { transaction });

        // Step 2: Add entries to the join table (WorkoutExercise)
        const workoutExercises = exercises.map(exercise => ({
            WorkoutID: newWorkout.PlanID, // Use the newly created workout's ID
            ExerciseID: exercise.exerciseId, // ID of the exercise
            customReps: exercise.customReps || null, // Optional custom reps
            customSets: exercise.customSets || null, // Optional custom sets
            customDuration: exercise.customDuration || null, // Optional custom duration
        }));

        await db.WorkoutExercise.bulkCreate(workoutExercises, { transaction });

        // Commit the transaction
        await transaction.commit();

        return {
            workout: newWorkout,
            exercises: workoutExercises,
        };
    } catch (error) {
        // Rollback the transaction in case of an error
        await transaction.rollback();
        console.error("Error creating workout with exercises:", error);
        throw error;
    }
};

