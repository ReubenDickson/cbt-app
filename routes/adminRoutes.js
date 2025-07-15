import express from "express";
import { register, login } from "../controllers/adminAuthController.js";
import { protectAdmin } from "../middlewares/adminMiddleware.js";
import { getExamSubmissions } from "../controllers/adminExamController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/exam/:id/submissions", protectAdmin, getExamSubmissions);

export default router;
