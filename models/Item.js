const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, enum: ['Snack', 'Gadget', 'Beauty', 'Toy'], required: true },
    costPrice: { type: Number, required: true },
    stockQuantity: { type: Number, default: 0 },
    // Reference to the internal User model
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', ItemSchema);
