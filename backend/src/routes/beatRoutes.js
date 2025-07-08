import express from 'express';
import { createBeat, getBeats } from '../controllers/beats.js';
import upload from '../middlewares/upload.js'; 

const router = express.Router();

router.post('/', upload.single('arquivo'), createBeat); 
router.get('/', getBeats);

export default router;