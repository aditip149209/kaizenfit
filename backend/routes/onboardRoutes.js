const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const onboardUser = require('../controllers/onboardController');


router.post('/onboarding', protect,  onboardUser);

module.exports = router;

