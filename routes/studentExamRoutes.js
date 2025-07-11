import express from "express";
import {
    getTodaysExams,
    startExam,
    submitExam,
} from "../controllers/studentExamController.js";
import { protectStudent } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/today", protectStudent, getTodaysExams); // Get today's exams
router.post("/:id/start", protectStudent, startExam); // Start an exam
router.post("/:id/submit", protectStudent, submitExam); // Submit exam answers

export default router;
// This code defines the routes for student exam functionalities in a Computer-Based Test (CBT) system.
// It includes routes for fetching today's exams, starting an exam, and submitting exam answers.
// The routes are protected by middleware to ensure that only authenticated students can access them.
