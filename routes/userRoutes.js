const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// This route allows the frontend to send Clerk data to your DB
router.post('/sync', userController.syncUser);

// This route allows fetching the logged-in user's profile
router.get('/profile', userController.getUserProfile);

module.exports = router;
