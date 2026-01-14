const mongoose = require('mongoose');

const BoxSchema = new mongoose.Schema(
  {
    themeName: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ['Planning', 'Active', 'Shipped'], default: 'Planning' },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    // Reference to the internal User model
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Box', BoxSchema);
