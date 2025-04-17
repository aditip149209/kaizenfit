import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { isOnboarded, onboardUser} from "../controllers/onboardController.js";
import { getFoodDetails, getTodaysWaterIntakeController, logWaterIntakeController } from "../controllers/userController.js";
import { deleteLogController, getFoodLogByTypeController, logFoodByTypeController } from "../controllers/trackController.js";
import { getLoggedWeightsController, logWeightController } from "../controllers/weightController.js";
import { createWorkoutWithExercisesController, getRandomWorkoutWithExercisesController, markWorkoutAsCompletedController } from "../controllers/workoutController.js";
import { getUserProfileController, updateUserProfileController } from "../controllers/settingsController.js";

const mainRouter = Router();

mainRouter.post('/onboarding', protect, onboardUser);
mainRouter.post('isOnboarded', protect, isOnboarded);
mainRouter.get('/foodlogdata',protect, getFoodDetails);

//track calories page
mainRouter.post('/foodlogbytype', protect, getFoodLogByTypeController);
mainRouter.post('/makenewfoodlogbytype', protect, logFoodByTypeController)
mainRouter.post('/deletefoodlogbytype', protect, deleteLogController)

//weight card
mainRouter.post('/logweight', protect, logWeightController);
mainRouter.post('/getloggedweights', protect, getLoggedWeightsController)

//water intake card 
mainRouter.post('/logwater', protect, logWaterIntakeController)
mainRouter.post('/editgoalwaterintake', protect, getTodaysWaterIntakeController)
mainRouter.get('/currentwaterintake', protect, getTodaysWaterIntakeController)

//workout card
mainRouter.get('/workoutoftheday', protect, getRandomWorkoutWithExercisesController)
mainRouter.post('/customworkout', protect, createWorkoutWithExercisesController)
mainRouter.post('/editcustomworkout', protect, markWorkoutAsCompletedController)

//user profile settings
mainRouter.get('/profile', protect, getUserProfileController)
mainRouter.put('/profile', protect, updateUserProfileController)



export default mainRouter



