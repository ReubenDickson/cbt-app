import express from "express";
import { getQuestions, createQuestion, updateQuestion, deleteQuestion } from "../controllers/questionController.js";
import { protectAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/", protectAdmin, createQuestion);
router.get("/", protectAdmin, getQuestions);
router.delete("/:id", protectAdmin, deleteQuestion);
router.put("/:id", protectAdmin, updateQuestion);
// router.get("/:id", protectAdmin, getQuestionById);

export default router;
// This file defines the routes for handling question-related operations.
// It uses the Express router to define endpoints for creating, retrieving, updating, and deleting questions.
// The routes are protected by an admin middleware to ensure that only admins can access them.
// The questionController functions are imported to handle the logic for each route.