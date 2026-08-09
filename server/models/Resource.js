const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['Books', 'Courses', 'YouTube', 'Websites', 'Tools'],
    },
    category: {
      type: String,
      required: true,
      default: 'General',
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    authorOrPlatform: {
      type: String,
      default: 'Community Pick',
    },
    isFree: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
