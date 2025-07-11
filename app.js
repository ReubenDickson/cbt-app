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

app.use(cors());
app.use(express.json());

// TODO: Mount API routes here (students, courses, questions, etc)
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/student-exams', studentExamRoutes);
// Handle 404 errors

// Routes
app.get('/', (req, res) => {
    res.send('🎓 CBT System Backend is running...');
});

export default app;