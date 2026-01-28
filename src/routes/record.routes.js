import express from 'express';
import { createRecord } from '../controllers/record.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Routes for Record Logics
router.post('/create-new', isAuth, createRecord);

export default router;