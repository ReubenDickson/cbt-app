const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const questionRoutes = require('./routes/questionRoutes');
const examRoutes = require('./routes/examRoutes');
const studentExamRoutes = require('./routes/studentExamRoutes');

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