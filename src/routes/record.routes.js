import express from 'express';
import { createRecord, getMyRecords, getMyCGPA } from '../controllers/record.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Routes for Record Logics
router.post('/create-new', isAuth, createRecord);
router.get('/my-records', isAuth, getMyRecords);
router.get('/my-cgpa', isAuth, getMyCGPA);

export default router;