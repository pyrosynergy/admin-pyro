const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 64,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    // Roles are plain strings so new roles (e.g. "editor") can be added
    // without a schema change; authorization is enforced in middleware.
    role: {
      type: String,
      required: true,
      default: 'admin',
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
