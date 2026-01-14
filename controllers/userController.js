const User = require('../models/User');

// POST: Sync Clerk User with MongoDB
exports.syncUser = async (req, res) => {
  try {
    const { clerkId, email, firstName, lastName, photo } = req.body;

    // Check if user exists, if not, create them
    let user = await User.findOne({ clerkId });

    if (!user) {
      user = await User.create({
        clerkId,
        email,
        firstName,
        lastName,
        photo,
      });
    }

    res.status(200).json({ status: 'success', data: user });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// GET: Get Profile Data
exports.getUserProfile = async (req, res) => {
  try {
    // req.auth.userId comes from Clerk Middleware
    const user = await User.findOne({ clerkId: req.auth.userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ status: 'success', data: user });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
