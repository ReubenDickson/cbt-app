const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Student = require('../models/Student');

exports.register = async (req, res) => {
    const { name, matricNumber, email, password } = req.body;

    try {
        const existing = await Student.findOne({ matricNumber });
        if (existing) {
            return res.status(400).json({ message: 'Matriculation number already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const student = new Student({
            name,
            email,
            matricNumber,
            passwordHash,
        });

        await student.save();

        res.status(201).json({ message: 'Student registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.login = async (req, res) => {
    const { matricNumber, password } = req.body;

    try {
        const student = await Student.findOne({ matricNumber });
        if (!student) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, student.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            {
                id: student._id,
                matricNumber: student.matricNumber,
                role: 'student',
            },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        );

        res.json({
            token,
            student: {
                id: student._id,
                name: student.name,
                matricNumber: student.matricNumber,
                email: student.email,
            },
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};