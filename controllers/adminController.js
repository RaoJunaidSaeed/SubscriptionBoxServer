const User = require('../models/User');
const Item = require('../models/Item');
const Box = require('../models/Box');

// 1. See all users and their activity
exports.getAllUsers = async (req, res) => {
  try {
    // req.auth.userId comes from the Clerk middleware
    const adminClerkId = req.auth.userId;

    // Find all users EXCEPT the one with the current admin's clerkId
    const users = await User.find({ clerkId: { $ne: adminClerkId } }).lean();

    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const itemCount = await Item.countDocuments({ user: user._id });
        const boxCount = await Box.countDocuments({ user: user._id });
        return { ...user, itemCount, boxCount };
      })
    );

    res.status(200).json({ status: 'success', data: usersWithStats });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. See specific user's items and boxes
exports.getUserActivity = async (req, res) => {
  try {
    const { userId } = req.params; // This is the MongoDB _id of the user
    const items = await Item.find({ user: userId });
    const boxes = await Box.find({ user: userId }).populate('items');

    res.status(200).json({
      status: 'success',
      data: { items, boxes },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. Delete a user and their associated data
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    await Item.deleteMany({ user: userId }); // Clean up items
    await Box.deleteMany({ user: userId }); // Clean up boxes

    res.status(200).json({ message: 'User and all data deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin can delete any item by ID
exports.deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    await Item.findByIdAndDelete(itemId);
    res.status(200).json({ message: 'Item removed by Admin' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin can delete any box by ID
exports.deleteBox = async (req, res) => {
  try {
    const { boxId } = req.params;
    await Box.findByIdAndDelete(boxId);
    res.status(200).json({ message: 'Subscription Box removed by Admin' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
