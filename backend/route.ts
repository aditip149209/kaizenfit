import { Router } from "express";

import { verifyToken } from "./middleware/authMiddleware.js";
import { syncUser } from "./controllers/authController.js";
import { createProfile, updateOnboardStatus } from "./controllers/onboardController.js";
import { getMe, getProfile, upsertProfile } from "./controllers/userController.js";
import {
	addExercise,
	createWorkoutLogHandler,
	deleteWorkoutLogHandler,
	getExercises,
	getUserWorkoutPlans,
	getWorkoutLog,
	getWorkoutLogs,
	getWorkoutPlans,
	createUserWorkoutPlanHandler,
	updateWorkoutLogHandler,
} from "./controllers/workoutController.js";
import {
	addFoodItem,
	addUserDietPlan,
	addMealLog,
	addWaterLog,
	getFoodItems,
	getMealLog,
	getMealLogs,
	getWaterLog,
	getWaterLogs,
	modifyMealLog,
	modifyWaterLog,
	removeMealLog,
	removeWaterLog,
} from "./controllers/nutritionController.js";
import {
	addGoal,
	addHealthRecord,
	addTransformationJournal,
	addTransformationJournalRequest,
	generateTransformationPayload,
	generateTransformationReportPreview,
	getCurrentGoal,
	getGoals,
	getHealthRecord,
	getHealthRecords,
	getTransformationReport,
	getTransformationJournals,
	modifyGoal,
	modifyHealthRecord,
	removeGoal,
	removeHealthRecord,
	saveTransformationReport,
} from "./controllers/healthController.js";
import { getMySubscription, getSubscriptionTiers } from "./controllers/subscriptionController.js";
import { cancelMySubscription, subscribeToTier } from "./controllers/subscriptionController.js";
import {
	addCommunityPost,
	addWeeklyBountyReps,
	getCommunityPosts,
	getLeaderboard,
	getWeeklyBounty,
	toggleLikeCommunityPost,
} from "./controllers/communityController.js";


//sync the user in our own database when they register for the first time 
const router = Router()

router.get('/syncUser', verifyToken, syncUser);

router.get('/me', verifyToken, getMe);

// Onboarding routes
router.post('/user/profile', verifyToken, createProfile);
router.patch('/user/onboard', verifyToken, updateOnboardStatus);
router.get('/user/profile', verifyToken, getProfile);
router.put('/user/profile', verifyToken, upsertProfile);

// Workout routes
router.get('/workouts/exercises', verifyToken, getExercises);
router.post('/workouts/exercises', verifyToken, addExercise);
router.get('/workouts/plans', verifyToken, getWorkoutPlans);
router.get('/workouts/user-plans', verifyToken, getUserWorkoutPlans);
router.post('/workouts/user-plans', verifyToken, createUserWorkoutPlanHandler);
router.get('/workouts/logs', verifyToken, getWorkoutLogs);
router.post('/workouts/logs', verifyToken, createWorkoutLogHandler);
router.get('/workouts/logs/:id', verifyToken, getWorkoutLog);
router.patch('/workouts/logs/:id', verifyToken, updateWorkoutLogHandler);
router.delete('/workouts/logs/:id', verifyToken, deleteWorkoutLogHandler);

// Nutrition routes
router.get('/nutrition/foods', verifyToken, getFoodItems);
router.post('/nutrition/foods', verifyToken, addFoodItem);
router.post('/nutrition/user-diet-plans', verifyToken, addUserDietPlan);
router.get('/nutrition/meals', verifyToken, getMealLogs);
router.post('/nutrition/meals', verifyToken, addMealLog);
router.get('/nutrition/meals/:id', verifyToken, getMealLog);
router.patch('/nutrition/meals/:id', verifyToken, modifyMealLog);
router.delete('/nutrition/meals/:id', verifyToken, removeMealLog);
router.get('/nutrition/water', verifyToken, getWaterLogs);
router.post('/nutrition/water', verifyToken, addWaterLog);
router.get('/nutrition/water/:id', verifyToken, getWaterLog);
router.patch('/nutrition/water/:id', verifyToken, modifyWaterLog);
router.delete('/nutrition/water/:id', verifyToken, removeWaterLog);

// Health routes
router.get('/health/goals', verifyToken, getGoals);
router.get('/health/goals/current', verifyToken, getCurrentGoal);
router.post('/health/goals', verifyToken, addGoal);
router.patch('/health/goals/:id', verifyToken, modifyGoal);
router.delete('/health/goals/:id', verifyToken, removeGoal);
router.get('/health/data', verifyToken, getHealthRecords);
router.post('/health/data', verifyToken, addHealthRecord);
router.post('/health/journals', verifyToken, addTransformationJournal);
router.get('/health/journals', verifyToken, getTransformationJournals);
router.post('/health/journals/request', verifyToken, addTransformationJournalRequest);
router.post('/health/reports/payload', verifyToken, generateTransformationPayload);
router.post('/health/reports/preview', verifyToken, generateTransformationReportPreview);
router.post('/health/reports/save', verifyToken, saveTransformationReport);
router.get('/health/reports/:id', verifyToken, getTransformationReport);
router.get('/health/data/:id', verifyToken, getHealthRecord);
router.patch('/health/data/:id', verifyToken, modifyHealthRecord);
router.delete('/health/data/:id', verifyToken, removeHealthRecord);

// Subscription routes
router.get('/subscriptions/tiers', verifyToken, getSubscriptionTiers);
router.get('/subscriptions/me', verifyToken, getMySubscription);
router.post('/subscriptions/me', verifyToken, subscribeToTier);
router.patch('/subscriptions/me/cancel', verifyToken, cancelMySubscription);

// Community routes
router.get('/community/posts', verifyToken, getCommunityPosts);
router.post('/community/posts', verifyToken, addCommunityPost);
router.patch('/community/posts/:id/like', verifyToken, toggleLikeCommunityPost);
router.get('/community/leaderboard', verifyToken, getLeaderboard);
router.get('/community/bounty/current', verifyToken, getWeeklyBounty);
router.post('/community/bounty/current/log', verifyToken, addWeeklyBountyReps);

export default router;

