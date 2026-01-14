// controllers/authController.js
const User = require('../models/User'); // 👈 MAKE SURE THIS IS HERE

exports.getMe = async (req, res) => {
  try {
    // req.auth is populated by clerkAuth middleware
    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({ message: 'No clerk ID found in request' });
    }

    const user = await User.findOne({ clerkId: req.auth.userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found in database' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Error in getMe:', err); // 👈 This will show the error in your terminal
    res.status(500).json({ message: err.message });
  }
};
