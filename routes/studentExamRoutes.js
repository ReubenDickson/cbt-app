const express = require("express");
const {
    getTodaysExams,
    startExam,
    submitExam,
} = require("../controllers/studentExamController");
const { protectStudent } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/today", protectStudent, getTodaysExams); // Get today's exams
router.post("/:id/start", protectStudent, startExam); // Start an exam
router.post("/:id/submit", protectStudent, submitExam); // Submit exam answers

module.exports = router;
// This code defines the routes for student exam functionalities in a Computer-Based Test (CBT) system.
// It includes routes for fetching today's exams, starting an exam, and submitting exam answers.
// The routes are protected by middleware to ensure that only authenticated students can access them.
