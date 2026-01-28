import express from 'express';
const router = express.Router();

import { registerUser, loginUser, getSingleUser } from '../controllers/user.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';

// User Auth Route
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', isAuth, getSingleUser);

export default router;