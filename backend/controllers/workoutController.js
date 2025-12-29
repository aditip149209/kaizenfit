

const createUserWorkoutPlan = async (req, res) => {
    try {
        
    }
        catch(error){
            console.log(error);
            res.status(500).json({message: 'Server Error'});
        }
    };

    const getWorkoutPlans = async (req, res) => {
        try {
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    };

    const getUserWorkouts = async (req, res) => {
        try{

        }   
        catch(error) {
            console.error(error);
            res.status(500).json({message: 'Server error in fetching user workouts'})
        }
    };

    const getWorkoutLog = async(req, res) => {

    };

    const createWorkoutLog = async(req, res) => {

    };

    

    
    
    export {
        createUserWorkoutPlan, getUserWorkouts, getWorkoutLog, createWorkoutLog
    }
    