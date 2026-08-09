const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// GET unified dashboard data
router.get('/:userId', dashboardController.getDashboardData);

// PUT bulk or partial dashboard update
router.put('/:userId', dashboardController.updateDashboardData);

// PUT customization options (theme, widget density, layout order)
router.put('/:userId/customization', dashboardController.updateCustomization);

module.exports = router;
