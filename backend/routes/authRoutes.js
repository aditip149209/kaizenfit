import express from 'express';
import { Router } from 'express';
import { loginUser, registerUser} from '../controllers/authController.js';

const authRouter = Router();
// POST /api/auth/login
authRouter.post('/login', loginUser);

authRouter.post('/register', registerUser);

// authRouter.post('/refresh', refreshUser);

export default authRouter;

