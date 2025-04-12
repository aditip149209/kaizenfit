const express = require('express');
const { loginUser, registerUser, refreshUser} = require('../controllers/authController');
const router = express.Router();

// POST /api/auth/login
router.post('/login', loginUser);

router.post('/register', registerUser);

router.post('/refresh', refreshUser);

module.exports = router;

