import express from 'express';
import { Router } from 'express';
import { loginUser, registerUser, refreshUser } from '../controllers/authController.js';

const router = Router();
// POST /api/auth/login
router.post('/login', loginUser);

router.post('/register', registerUser);

router.post('/refresh', refreshUser);

module.exports = router;

