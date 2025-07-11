import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    courseCode: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
        },
    ]
}, { timestamps: true });

export default mongoose.model("Exam", examSchema);
// This schema defines the structure for exam documents in the MongoDB database.
// It includes fields for the exam's title, course code, date, start time, end time, duration,
// and an array of questions associated with the exam.
// The `timestamps` option automatically adds `createdAt` and `updatedAt` fields to the schema.