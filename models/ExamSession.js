const mongoose = require("mongoose");

const examSessionSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam",
        required: true
    },
    startTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    submittedAt: {
        type: Date
    },
    answers: [
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question"
            },
            selectedOption: String,
            isCorrect: Boolean
        },
    ],
    score: {
        type: Number,
        default: 0
    },
    emailed: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

module.exports = mongoose.model("ExamSession", examSessionSchema);
// This schema defines the structure for an exam session in a Computer-Based Test (CBT) system.
// It includes fields for student ID, exam ID, start time, submission time, answers, score, and whether the results have been emailed.
// The `answers` field is an array of objects, each containing the question ID, selected option, and whether the answer is correct.
// The schema uses Mongoose to define relationships with the Student, Exam, and Question models.