const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required for OTP generation'],
      lowercase: true,
      trim: true,
    },
    otp: {
      type: String,
      required: [true, 'OTP code is required'],
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 5 * 60 * 1000), // Expiration in 5 minutes
      index: { expires: 0 }, // MongoDB TTL index to auto-delete expired documents
    },
  },
  {
    timestamps: true,
  }
);

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
