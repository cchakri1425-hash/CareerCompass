const mongoose = require('mongoose');
const Bookmark = require('../models/Bookmark');

/**
 * @desc    Get all saved bookmarks for logged-in user or session
 * @route   GET /api/bookmarks
 * @access  Public / Private
 */
const getBookmarks = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : req.query.userId || 'guest_user';
    let bookmarks = [];

    if (mongoose.connection.readyState === 1) {
      try {
        bookmarks = await Bookmark.find({ userId }).sort({ createdAt: -1 });
      } catch (dbErr) {
        console.warn('Bookmark DB query warning:', dbErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      count: bookmarks.length,
      bookmarks,
    });
  } catch (error) {
    console.error('Get Bookmarks Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving saved bookmarks.',
    });
  }
};

/**
 * @desc    Toggle bookmark status for a resource or career
 * @route   POST /api/bookmarks/toggle
 * @access  Public / Private
 */
const toggleBookmark = async (req, res) => {
  try {
    const { itemType, itemId, itemData } = req.body;
    const userId = req.user ? req.user.id : req.body.userId || 'guest_user';

    if (!itemType || !itemId) {
      return res.status(400).json({
        success: false,
        message: 'itemType and itemId are required.',
      });
    }

    // Check if bookmark exists
    const existing = await Bookmark.findOne({ userId, itemType, itemId });

    if (existing) {
      // Remove bookmark
      await Bookmark.deleteOne({ _id: existing._id });
      return res.status(200).json({
        success: true,
        bookmarked: false,
        message: 'Bookmark removed successfully.',
      });
    } else {
      // Add new bookmark
      const newBookmark = await Bookmark.create({
        userId,
        itemType,
        itemId,
        itemData: itemData || {},
      });

      return res.status(201).json({
        success: true,
        bookmarked: true,
        message: 'Saved to bookmarks!',
        bookmark: newBookmark,
      });
    }
  } catch (error) {
    console.error('Toggle Bookmark Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error toggling bookmark.',
    });
  }
};

module.exports = {
  getBookmarks,
  toggleBookmark,
};
