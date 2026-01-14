const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const User = require('../models/User');

// Middleware to check if user is admin
const restrictToAdmin = async (req, res, next) => {
  const user = await User.findOne({ clerkId: req.auth.userId });
  if (user && user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

router.get('/users', restrictToAdmin, adminController.getAllUsers);
router.get('/users/:userId/activity', restrictToAdmin, adminController.getUserActivity);
router.delete('/users/:userId', restrictToAdmin, adminController.deleteUser);

// routes/adminRoutes.js
router.delete('/items/:itemId', restrictToAdmin, adminController.deleteItem);
router.delete('/boxes/:boxId', restrictToAdmin, adminController.deleteBox);

module.exports = router;
