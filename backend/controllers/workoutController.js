const WorkoutPlan = require('../models/WorkoutPlan');

const createWorkoutPlan = async (req, res) => {
    try {
        const { userID, name, description } = req.body;

        const newWorkoutPlan = await WorkoutPlan.create({
            userID: userID,
            name: name,
            description: description
        });

        res.status(201).json({ message: 'Workout plan created successfully', 
            workout: newWorkoutPlan
        });
    }
        catch(error){
            console.log(error);
            res.status(500).json({message: 'Server Error'});
        }
    };

    const getWorkoutPlans = async (req, res) => {
        try {
            const userId = req.user.id;  // Access authenticated user
            const workoutPlans = await WorkoutPlan.findAll({where: {userId: userId}});
            res.status(200).json(workoutPlans);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    };
    
    module.exports = {createWorkoutPlan, getWorkoutPlans};