const express = require('express');
const router = express.Router();
const {
  getCareers,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
} = require('../controllers/careerController');

// GET /api/careers - List all careers with search/filter
router.get('/', getCareers);

// GET /api/careers/:id - Get single career by ID or Slug
router.get('/:id', getCareerById);

// POST /api/careers - Create a new career (CRUD)
router.post('/', createCareer);

// PUT /api/careers/:id - Update career by ID (CRUD)
router.put('/:id', updateCareer);

// DELETE /api/careers/:id - Delete career by ID (CRUD)
router.delete('/:id', deleteCareer);

module.exports = router;
