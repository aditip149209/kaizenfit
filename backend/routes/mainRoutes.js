import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { isOnboarded, onboardUser} from "../controllers/onboardController.js";
import { editWaterIntakeGoalController, getFoodDetails, getTodaysWaterIntakeController, logWaterIntakeController,
    getWaterGoalController
 } from "../controllers/userController.js";
import { deleteLogController, logFoodController, getFoodLogController } from "../controllers/trackController.js";
import { getLoggedWeightsController, logWeightController } from "../controllers/weightController.js";
import { createWorkoutWithExercisesController, getRandomWorkoutWithExercisesController, markWorkoutAsCompletedController, 
    createExercise, getWorkoutListController, getExerciseListController } from "../controllers/workoutController.js";
import { getUserProfileController, updateUserProfileController } from "../controllers/settingsController.js";
import { createNewDietController, createFoodItemController, getFoodItemListController } from "../controllers/dietController.js";
import { getUserDetailsController } from "../controllers/userController.js";    
import { getDietListController } from "../controllers/dietController.js";
import {deleteUserProfileController, updateUserGoalsController} from "../controllers/settingsController.js";

const mainRouter = Router();

mainRouter.post('/onboarding', protect, onboardUser);
mainRouter.post('isOnboarded', protect, isOnboarded);
mainRouter.get('/foodlogdata',protect, getFoodDetails);
mainRouter.get('/getuserdetails', protect, getUserDetailsController)

//track calories page
mainRouter.post('/trackfoodfortoday', protect, logFoodController);
mainRouter.post('/getfoodlogfortoday', protect, getFoodLogController)
mainRouter.post('/deletetrackedfood', protect, deleteLogController)

//weight card
mainRouter.post('/logweight', protect, logWeightController);
mainRouter.post('/getloggedweights', protect, getLoggedWeightsController)
mainRouter.delete('/deleteweightlog', protect, deleteLogController)
mainRouter.post('/changeweightgoal', protect, updateUserGoalsController) //focus on this

//water intake card 
mainRouter.post('/logwater', protect, logWaterIntakeController) //this works too
mainRouter.post('/editgoalwaterintake', protect, editWaterIntakeGoalController) //this works too
mainRouter.post('/currentwaterintake', protect, getTodaysWaterIntakeController) //this works
mainRouter.post('/getcurrentgoal', protect, getWaterGoalController); //this works

//workout card
mainRouter.get('/workoutoftheday', protect, getRandomWorkoutWithExercisesController)
mainRouter.get('/getWorkoutList', protect, getWorkoutListController);
mainRouter.get('/getExerciseList', protect, getExerciseListController);
mainRouter.post('/customworkout', protect, createWorkoutWithExercisesController)
mainRouter.post('/customExercise', protect, createExercise)
mainRouter.post('/markascomplete', protect, markWorkoutAsCompletedController)

//user profile settings
mainRouter.get('/profile', protect, getUserProfileController) //this works too  
mainRouter.post('/changepassword', protect, updateUserProfileController) //this works too
mainRouter.delete('/deleteprofile', protect, deleteUserProfileController) 
mainRouter.post('/updateprofile', protect, updateUserGoalsController) 
// /this works too

//diet 
mainRouter.post('/createnewdiet', protect, createNewDietController); //this works
mainRouter.post('/createnewfooditem', protect, createFoodItemController); //this works 
mainRouter.get('/getfooditemlist', protect, getFoodItemListController); //this works
mainRouter.get('/dietlist', protect, getDietListController); 

export default mainRouter



