const express = require('express');
const router = express.Router();
const { getCareerProgress, updateStepProgress } = require('../controllers/progressController');

// GET /api/progress/:careerId
router.get('/:careerId', getCareerProgress);

// POST /api/progress/step
router.post('/step', updateStepProgress);

module.exports = router;
