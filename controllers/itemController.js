const itemService = require('../services/itemService');
const User = require('../models/User');

// Helper to get internal DB user ID from Clerk ID
const getInternalUserId = async (clerkId) => {
  const user = await User.findOne({ clerkId });
  return user ? user._id : null;
};

exports.getItems = async (req, res) => {
  try {
    const userId = await getInternalUserId(req.auth.userId);
    const items = await itemService.getAllItems(userId);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createItem = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const user = await User.findOne({ clerkId: clerkId });

    if (!user) {
      return res.status(404).json({ message: 'User record not found in database.' });
    }

    const newItem = await itemService.createItem(req.body, user._id);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const userId = await getInternalUserId(req.auth.userId);
    const item = await itemService.getItemById(req.params.id, userId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found or unauthorized' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const userId = await getInternalUserId(req.auth.userId);
    const updatedItem = await itemService.updateItem(req.params.id, req.body, userId);
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found or unauthorized' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const userId = await getInternalUserId(req.auth.userId);
    const deleted = await itemService.deleteItem(req.params.id, userId);
    if (!deleted) {
      return res.status(404).json({ message: 'Item not found or unauthorized' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const itemService = require('../services/itemService');

// exports.getItems = async (req, res) => {
//   try {
//     const items = await itemService.getAllItems();
//     res.status(200).json(items);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.createItem = async (req, res) => {
//   try {
//     const newItem = await itemService.createItem(req.body);
//     res.status(201).json(newItem);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// exports.getItemById = async (req, res) => {
//   try {
//     const item = await itemService.getItemById(req.params.id);
//     if (!item) {
//       return res.status(404).json({ message: 'Item not found' });
//     }
//     res.status(200).json(item);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.updateItem = async (req, res) => {
//   try {
//     const updatedItem = await itemService.updateItem(req.params.id, req.body);
//     res.status(200).json(updatedItem);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// exports.deleteItem = async (req, res) => {
//   try {
//     await itemService.deleteItem(req.params.id);
//     res.status(200).json({ message: 'Item deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
