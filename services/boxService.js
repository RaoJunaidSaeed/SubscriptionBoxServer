const Box = require('../models/Box');
const Item = require('../models/Item');

// Internal helper to calculate price for a specific user's items
const calculateTotalPrice = async (itemIds, userId) => {
  // Ensure we only sum prices of items belonging to this user
  const items = await Item.find({ _id: { $in: itemIds }, user: userId });
  return items.reduce((sum, item) => sum + item.costPrice, 0);
};

exports.getAllGlobalBoxes = async () => {
  return await Box.find()
    .populate('items') // Show the items inside the box
    .sort({ createdAt: -1 });
};

exports.getAllBoxes = async (userId) => {
  // Filter boxes by the internal user ID
  return await Box.find({ user: userId }).populate('items').sort({ createdAt: -1 });
};

exports.createBox = async (data, userId) => {
  // Automatically calculate price based on user-owned items
  if (data.items && data.items.length > 0) {
    data.price = await calculateTotalPrice(data.items, userId);
  } else {
    data.price = 0;
  }

  // Link the new box to the user
  const newBox = await Box.create({ ...data, user: userId });
  return await newBox.populate('items');
};

exports.getBoxById = async (id, userId) => {
  // Secure fetch: ID + Owner check
  return await Box.findOne({ _id: id, user: userId }).populate('items');
};

exports.updateBox = async (id, data, userId) => {
  let itemIdsToCheck = data.items;

  if (!itemIdsToCheck) {
    const existingBox = await Box.findOne({ _id: id, user: userId });
    if (!existingBox) return null;
    itemIdsToCheck = existingBox.items;
  }

  if (itemIdsToCheck && itemIdsToCheck.length > 0) {
    data.price = await calculateTotalPrice(itemIdsToCheck, userId);
  }

  return await Box.findOneAndUpdate({ _id: id, user: userId }, data, { new: true }).populate(
    'items'
  );
};

exports.patchBoxStatus = async (id, status, userId) => {
  const existingBox = await Box.findOne({ _id: id, user: userId });
  if (!existingBox) {
    throw new Error('Box not found or unauthorized');
  }

  const correctPrice = await calculateTotalPrice(existingBox.items, userId);
  return await Box.findOneAndUpdate(
    { _id: id, user: userId },
    { status: status, price: correctPrice },
    { new: true }
  ).populate('items');
};

exports.deleteBox = async (id, userId) => {
  // Only allow deletion if the user owns the box
  return await Box.findOneAndDelete({ _id: id, user: userId });
};
