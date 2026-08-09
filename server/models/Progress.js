const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    careerId: {
      type: String,
      required: true,
      index: true,
    },
    completedSteps: [
      {
        type: Number,
      },
    ],
    lastActiveStep: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure unique progress record per user and career
progressSchema.index({ userId: 1, careerId: 1 }, { unique: true });

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
