const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const {createWorkoutPlan, getWorkoutPlans} = require('../controllers/workoutController');

router.post('/', protect, createWorkoutPlan);   // requires token
router.get('/', protect, getWorkoutPlans);      // requires token

module.exports = router;