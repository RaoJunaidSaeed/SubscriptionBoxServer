// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { clerkAuth } = require('../middleware/auth'); // Ensure Clerk middleware is imported

// Correct: just '/me'
// Also, ensure clerkAuth is here to populate req.auth.userId
router.get('/me', clerkAuth, authController.getMe);

module.exports = router;
