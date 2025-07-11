import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import examRoutes from './routes/examRoutes.js';
import studentExamRoutes from './routes/studentExamRoutes.js';

dotenv.config();

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes); // Mount authentication routes
app.use("/api/admin/auth", adminRoutes); // Mount admin management routes
app.use("/api/student/exams", studentExamRoutes); // Mount student exam routes
// This code initializes an Express.js application for a Computer-Based Test (CBT) system backend.

app.use("/api/questions", questionRoutes); // Mount question management routes
app.use("/api/exams", examRoutes); // Mount exam management routes

// Routes
app.get('/', (req, res) => {
    res.send('🎓 CBT System Backend is running...');
});

// TODO: Mount API routes here (students, courses, questions, etc)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});