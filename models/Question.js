const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        required: true,
    },
    questionText: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true,
    },
    explanation: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);