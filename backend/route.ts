import { Router } from "express";

import { verifyToken } from "./middleware/authMiddleware.js";
import { syncUser } from "./controllers/authController.js";
import { createProfile, updateOnboardStatus } from "./controllers/onboardController.js";


//sync the user in our own database when they register for the first time 
const router = Router()

router.get('/syncUser', verifyToken, syncUser);

// Onboarding routes
router.post('/user/profile', verifyToken, createProfile);
router.patch('/user/onboard', verifyToken, updateOnboardStatus);

export default router;

