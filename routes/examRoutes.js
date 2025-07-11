import express from 'express';
import {
    createExam,
    getExams,
    deleteExam,
} from '../controllers/examController.js';
import { protectAdmin } from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.post('/', protectAdmin, createExam);
router.get('/', protectAdmin, getExams);
router.delete('/:id', protectAdmin, deleteExam);

export default router;