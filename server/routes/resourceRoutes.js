const express = require('express');
const router = express.Router();
const { getResources, getResourceById } = require('../controllers/resourceController');

// GET /api/resources
router.get('/', getResources);

// GET /api/resources/:id
router.get('/:id', getResourceById);

module.exports = router;
