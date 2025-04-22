import db from "../models/index.js";

import { getRandomWorkoutWithExercises, createWorkoutWithExercises, createNewExercise, getWorkoutListFromDB, getExerciseList} from "../models/services/workoutQuery.js";

export const getRandomWorkoutWithExercisesController = async (req, res) => {
    try {
        // Calculate the current day of the week
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDay = daysOfWeek[new Date().getDay()]; // Get the current day as a string

        // Fetch the random workout and its exercises for the current day
        const result = await getRandomWorkoutWithExercises(currentDay);

        return res.status(200).json({
            message: `Workout and exercises for ${currentDay} retrieved successfully.`,
            data: result,
        });
    } catch (error) {
        console.error("Error fetching workout and exercises:", error);
        return res.status(500).json({ message: "Error fetching workout and exercises.", error });
    }
};

export const createWorkoutWithExercisesController = async (req, res) => {
    const { workoutData, exercises } = req.body;

    if (!workoutData || !exercises || exercises.length === 0) {
        return res.status(400).json({ message: "Workout data and exercises are required." });
    }
    try {
        const result = await createWorkoutWithExercises(workoutData, exercises);

        return res.status(201).json({
            message: "Workout created successfully.",
            data: result,
        });
    } catch (error) {
        console.error("Error creating workout with exercises:", error);
        return res.status(500).json({ message: "Error creating workout with exercises.", error });
    }
};

export const markWorkoutAsCompletedController = async (req, res) => {
    const { userId, workoutId, isCompleted } = req.body;

    if (!userId || !workoutId || typeof isCompleted !== 'boolean') {
        return res.status(400).json({ message: "User ID, workout ID, and isCompleted (boolean) are required." });
    }

    try {
        // Update the isCompleted field in the UserWorkoutLog table
        const updatedLog = await db.UserWorkoutLog.update(
            { isCompleted },
            {
                where: {
                    UserID: userId,
                    WorkoutID: workoutId,
                },
            }
        );

        if (updatedLog[0] === 0) {
            return res.status(404).json({ message: "Workout log not found or not updated." });
        }

        return res.status(200).json({
            message: `Workout marked as ${isCompleted ? "completed" : "not completed"} successfully.`,
            data: { userId, workoutId, isCompleted },
        });
    } catch (error) {
        console.error("Error marking workout as completed:", error);
        return res.status(500).json({ message: "Error marking workout as completed.", error });
    }
};

export const createExercise = async (req, res) => {
    const {Name, Description, Duration, CaloriesBurned, Type, TargetPart, defaultReps, defaultSets} = req.body;

    console.log(req.body);
    const data = {
        Name: Name, 
        Description: Description,
        Duration: Duration, 
        CaloriesBurned: CaloriesBurned, 
        Type: Type,
        TargetPart: TargetPart,
        defaultReps: defaultReps,
        defaultSets : defaultSets
    }
    try{
        const createEx = await createNewExercise(data);
        return res.status(201).json({
            message: "Exercise created",
            createEx
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Server error"
        })
    }
}

export const getWorkoutListController = async (req, res) => {
    const UserID = req.query.UserId
    try{
        const workoutList = await getWorkoutListFromDB(UserID);
        return res.status(200).json(workoutList)
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Server error"
        })
    }
}

export const getExerciseListController = async (req, res) => {
    let exercises
    try{
        exercises = await getExerciseList();
        return res.status(200).json(exercises);
    }
    catch(error){
        console.log(error)
    }
}




