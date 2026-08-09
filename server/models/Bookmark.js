const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    itemType: {
      type: String,
      required: true,
      enum: ['resource', 'career'],
    },
    itemId: {
      type: String,
      required: true,
    },
    itemData: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Ensure unique bookmark per user, itemType, and itemId
bookmarkSchema.index({ userId: 1, itemType: 1, itemId: 1 }, { unique: true });

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;
