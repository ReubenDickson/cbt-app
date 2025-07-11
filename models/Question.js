import mongoose from "mongoose";

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

export default mongoose.model("Question", questionSchema);