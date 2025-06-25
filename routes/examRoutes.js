const express = require('express');
const {
    createExam,
    getExams,
    deleteExam,
} = require('../controllers/examController');
const { protectAdmin } = require('../middlewares/adminMiddleware');

const router = express.Router();

router.post('/', protectAdmin, createExam);
router.get('/', protectAdmin, getExams);
router.delete('/:id', protectAdmin, deleteExam);

module.exports = router;