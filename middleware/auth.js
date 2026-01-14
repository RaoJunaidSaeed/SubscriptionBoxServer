// middleware/auth.js
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');
const User = require('../models/User'); // Ensure User model is imported

// 1. Assign the Clerk middleware to a constant
const clerkAuth = ClerkExpressWithAuth();

// 2. Define the Admin restriction function
const restrictToAdmin = async (req, res, next) => {
  try {
    // req.auth.userId is provided by Clerk's middleware
    const user = await User.findOne({ clerkId: req.auth.userId });

    if (user && user.role === 'admin') {
      next(); // User is Admin, allow the request to proceed
    } else {
      res.status(403).json({ message: 'Access Denied: Administrative privileges required.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Authorization server error' });
  }
};

// 3. Export both correctly as an object
module.exports = {
  clerkAuth,
  restrictToAdmin,
};
