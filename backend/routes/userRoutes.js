// backend/routes/userRoutes.js  (or wherever you need authentication)
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');


// GET /api/users/profile (example protected route)
router.get('/profile', protect, getUserProfile);
router.put('/profile',protect, updateUserProfile);


module.exports = router;
