const jwt = require('jsonwebtoken');

const protectStudent = (req, res, next) => {
    const authHeader = require.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "student") {
            return res.status(403).json({ message: 'Forbidden access' });
        }
        request.student = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { protectStudent };