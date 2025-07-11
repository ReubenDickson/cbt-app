import express from 'express';
import { register, login } from '../controllers/authControllers.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

export default router;
// This code defines the authentication routes for registering and logging in students.
// It uses Express.js to create a router and maps the POST requests to the respective controller functions.