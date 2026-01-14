const Item = require('../models/Item');
const Box = require('../models/Box');

// Get all items from warehouse for a specific user
exports.getAllItems = async (userId) => {
  // Filter by the internal user ID
  return await Item.find({ user: userId }).sort({ createdAt: -1 });
};

exports.createItem = async (data, userId) => {
  const item = new Item({
    ...data,
    user: userId,
  });
  return await item.save();
};

// Get Single Item by ID ensuring it belongs to the user
exports.getItemById = async (id, userId) => {
  return await Item.findOne({ _id: id, user: userId });
};

// Update item details only if owned by the user
exports.updateItem = async (id, data, userId) => {
  return await Item.findOneAndUpdate({ _id: id, user: userId }, data, { new: true });
};

exports.deleteItem = async (id, userId) => {
  // Delete only if owned by the requesting user
  const deletedItem = await Item.findOneAndDelete({ _id: id, user: userId });

  if (deletedItem) {
    // Remove reference from any boxes owned by the same user
    await Box.updateMany({ items: id, user: userId }, { $pull: { items: id } });
  }

  return deletedItem;
};

// const Item = require('../models/Item');
// const Box = require('../models/Box');

// // Get all items from warehouse
// exports.getAllItems = async () => {
//   return await Item.find().sort({ createdAt: -1 });
// };

// // Add new item to warehouse
// exports.createItem = async (data) => {
//   return await Item.create(data);
// };

// // Get Single Item by ID
// exports.getItemById = async (id) => {
//   return await Item.findById(id);
// };

// // Update item details (e.g., price change)
// exports.updateItem = async (id, data) => {
//   return await Item.findByIdAndUpdate(id, data, { new: true });
// };

// exports.deleteItem = async (id) => {
//   const deletedItem = await Item.findByIdAndDelete(id);

//   if (deletedItem) {
//     await Box.updateMany({ items: id }, { $pull: { items: id } });
//   }

//   return deletedItem;
// };
