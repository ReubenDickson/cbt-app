import Question from "../models/Question.js";

// Create question
export const createQuestion = async (req, res) => {
    try {
        const question = new Question(req.body);
        await question.save();
        res.status(201).json({ message: "Question created", question });
    } catch (err) {
        res.status(500).json({ message: "Error creating question", error: err.message });
    }
};

// Get all questions filter by course
export const getQuestions = async (req, res) => {
    try {
        const { courseCode } = req.query;
        const filter = courseCode ? { courseCode } : {};
        const questions = await Question.find(filter);
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: "Error fetching questions", error: err.message });
    }
};

// Delete a question
export const deleteQuestion = async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.params.id);
        res.json({ message: "Question deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting question", error: err.message });
    }
};

// Update q question
export const updateQuestion = async (req, res) => {
    try {
        await Question.findByIdAndUpdate(req.params.id);
        res.json({ message: "Question updated" });
    } catch (err) {
        res.status(500).json({ message: "Error updating question", error: err.message });
    }
};

