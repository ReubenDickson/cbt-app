import Exam from "../models/Exam.js";
import Question from "../models/Question.js";

// Create exam
export const createExam = async (req, res) => {
    try {
        const { title, courseCode, date, startTime, endTime, duration, questionIds } = req.body;

        const exam = new Exam({
            title,
            courseCode,
            date,
            startTime,
            endTime,
            duration,
            questions: questionIds, // array of questions
        });

        await exam.save();
        res.status(201).json({ message: "Exam created.", exam });
    } catch (err) {
        res.status(500).json({ message: "Error creating exam!", error: err.message });
    }
};

// Get all exams
export const getExams = async (req, res) => {
    try {
        const exams = await Exam.find().populate("questions");
        res.json(exams);
    } catch (err) {
        res.status(500).json({ message: "Error fetching exams!", error: err.message });
    }
};

// Delete an exam
export const deleteExam = async (req, res) => {
    try {
      await Exam.findByIdAndDelete(req.params.id);
      res.json({ message: "Exam deleted." });
    } catch (err) {
      res.status(500).json({ message: "Error deleting exam!", error: err.message });
    }
  };

// Update an exam

export const updateExam = async (req, res) => {
    try {
        await Exam.findByIdAndUpdate(req.params.id);
        res.json({ message: "Exam updated." });
    } catch (err) {
        res.status(500).json({ message: "Error updating exam!", error: err.message });
    }
}