const Exam = require("../models/Exam");
const ExamSession = require("../models/ExamSession");
const Question = require("../models/Question");

// List today's available exams for a student
exports.getTodaysExams = async (req, res) => {
    try {
        const today = new Date();
        const exams = await Exam.find({
            date: {
                $gte: new Date(today.setHours(0, 0, 0, 0)), // Start of the day
                $lt: new Date(today.setHours(23, 59, 59, 999)) // End of the day
            },
        }).select("-questions"); // Exclude questions from the exam details
        res.json(exams);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch exams", error: error.message });
    }
};

// Start exam: fetch questions and create a session
exports.startExam = async (req, res) => {
    try {
        const { id: examId } = req.params;
        const studentId = req.student.id;

        // check if already started
        const exists = await ExamSession.findOne({ examId, studentId });
        if (exists) {
            return res.status(400).json({ message: "Exam already started or submitted"});
        } else {
            return res.status(404).json({ message: "Exam not found" });
        }

        const exam = await Exam.findById(examId.populate("questions"));

        // create session
        const session = new ExamSession({
            studentId,
            examId,
        });

        await session.save();

        res.json({
            exam: {
                title: exam.title,
                courseCode: exam.courseCode,
                duration: exam.duration,
                questions: exam.questions.map((q) => ({
                    id: q._id,
                    questionText: q.questionText,
                    options: q.options,
                })),
            },
            sessionId: session._id,
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to start exam", error: err.message });
    }
};

// Submit exam answers
exports.submitExam = async (req, res) => {
    try {
        const { id: examId } = req.params;
        const studentId = req.student.id;
        const { answers } = req.body; // [{ questionId, selectedOption }]

        const exam = await Exam.findById(examId).populate("questions");
        const session = await ExamSession.findOne({ studentId, examId });

        if (!session || session.submittedAt) { // Check if session exists and not already submitted
            return res.status(400).json({ message: "Exam not started or already submitted" });
        }

        // Grade the exam
        let score = 0;
        const results = exam.questions.map((q) => {
            const ans = answers.find((a) => a.questionId === q._id.toString());
            const isCorrect = ans?.selectOption === q.correctAnswer;
            if (isCorrect) score += 1;
            return {
                questionId: q._id,
                selectedOption: ans?.selectedOption || null,
                isCorrect,
            };
        });

        session.answers = results;
        session.score = score;
        session.submittedAt = new Date();
        await session.save();

        res.json({ message: "Exam submitted successfully", score, total: exam.questions.length  });
    } catch (err) {
        res.status(500).json({ message: "Failed to submit exam", error: err.message });
    }
};