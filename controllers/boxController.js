const boxService = require('../services/boxService');
const User = require('../models/User');

// Helper to bridge Clerk ID and MongoDB ID
const getInternalUserId = async (clerkId) => {
  const user = await User.findOne({ clerkId });
  return user ? user._id : null;
};

exports.getBoxes = async (req, res) => {
  try {
    const userId = await getInternalUserId(req.auth.userId);
    const boxes = await boxService.getAllBoxes(userId);
    res.status(200).json(boxes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBox = async (req, res) => {
  try {
    const userId = await getInternalUserId(req.auth.userId);
    const box = await boxService.createBox(req.body, userId);
    res.status(201).json(box);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBoxById = async (req, res) => {
  try {
    const userId = await getInternalUserId(req.auth.userId);
    const box = await boxService.getBoxById(req.params.id, userId);
    if (!box) return res.status(404).json({ message: 'Box not found' });
    res.status(200).json(box);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBox = async (req, res) => {
  try {
    const userId = await getInternalUserId(req.auth.userId);
    const box = await boxService.updateBox(req.params.id, req.body, userId);
    if (!box) return res.status(404).json({ message: 'Box not found or unauthorized' });
    res.status(200).json(box);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBox = async (req, res) => {
  try {
    const userId = await getInternalUserId(req.auth.userId);
    const deleted = await boxService.deleteBox(req.params.id, userId);
    if (!deleted) return res.status(404).json({ message: 'Box not found or unauthorized' });
    res.status(200).json({ message: 'Box Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.patchBox = async (req, res) => {
  try {
    const userId = await getInternalUserId(req.auth.userId);
    const box = await boxService.patchBoxStatus(req.params.id, req.body.status, userId);
    res.status(200).json(box);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// const boxService = require('../services/boxService');

// exports.getBoxes = async (req, res) => {
//   try {
//     const boxes = await boxService.getAllBoxes();
//     res.status(200).json(boxes);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.createBox = async (req, res) => {
//   try {
//     const box = await boxService.createBox(req.body);
//     res.status(201).json(box);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// exports.getBoxById = async (req, res) => {
//   try {
//     const box = await boxService.getBoxById(req.params.id);
//     if (!box) {
//       return res.status(404).json({ message: 'Box not found' });
//     }
//     res.status(200).json(box);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.updateBox = async (req, res) => {
//   try {
//     const box = await boxService.updateBox(req.params.id, req.body);
//     res.status(200).json(box);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// exports.deleteBox = async (req, res) => {
//   try {
//     await boxService.deleteBox(req.params.id);
//     res.status(200).json({ message: 'Box Deleted' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.patchBox = async (req, res) => {
//   try {
//     const box = await boxService.patchBoxStatus(req.params.id, req.body.status);
//     res.status(200).json(box);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
