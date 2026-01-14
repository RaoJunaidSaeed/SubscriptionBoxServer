// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    photo: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
