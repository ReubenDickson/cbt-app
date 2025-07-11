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
// This schema defines the structure for question documents in the MongoDB database.
// It includes fields for the course code, question text, options (as an array of strings),
// the correct answer, and an optional explanation.
// The `timestamps` option automatically adds `createdAt` and `updatedAt` fields to the schema.
