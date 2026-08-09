const express = require('express');
const router = express.Router();
const { getBookmarks, toggleBookmark } = require('../controllers/bookmarkController');

// GET /api/bookmarks
router.get('/', getBookmarks);

// POST /api/bookmarks/toggle
router.post('/toggle', toggleBookmark);

module.exports = router;
