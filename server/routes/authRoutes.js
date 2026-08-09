const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const validate = require('../middleware/validateMiddleware');
const { protect } = require('../middleware/authMiddleware');
const {
  register,
  login,
  sendOTP,
  verifyOTP,
  resendOTP,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
  changePassword,
  getDashboardStats,
} = require('../controllers/authController');

// POST /api/auth/register
router.post(
  '/register',
  [
    check('fullName', 'Full name is required').notEmpty().trim(),
    check('email', 'Please include a valid email address').isEmail().normalizeEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
  ],
  validate,
  register
);

// POST /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Please include a valid email address').isEmail().normalizeEmail(),
    check('password', 'Password is required').exists(),
  ],
  validate,
  login
);

// POST /api/auth/send-otp
router.post(
  '/send-otp',
  [check('email', 'Please include a valid email address').isEmail().normalizeEmail()],
  validate,
  sendOTP
);

// POST /api/auth/verify-otp
router.post(
  '/verify-otp',
  [
    check('email', 'Please include a valid email address').isEmail().normalizeEmail(),
    check('otp', 'OTP must be a 6-digit code').isLength({ min: 6, max: 6 }),
  ],
  validate,
  verifyOTP
);

// POST /api/auth/resend-otp
router.post(
  '/resend-otp',
  [check('email', 'Please include a valid email address').isEmail().normalizeEmail()],
  validate,
  resendOTP
);

// POST /api/auth/forgot-password
router.post(
  '/forgot-password',
  [check('email', 'Please include a valid email address').isEmail().normalizeEmail()],
  validate,
  forgotPassword
);

// POST /api/auth/reset-password
router.post(
  '/reset-password',
  [
    check('email', 'Please include a valid email address').isEmail().normalizeEmail(),
    check('otp', 'OTP must be a 6-digit code').isLength({ min: 6, max: 6 }),
    check('newPassword', 'New password must be at least 6 characters long').isLength({ min: 6 }),
  ],
  validate,
  resetPassword
);

// GET /api/auth/profile
router.get('/profile', protect, getProfile);

// PUT /api/auth/profile
router.put('/profile', protect, updateProfile);

// PUT /api/auth/change-password
router.put('/change-password', protect, changePassword);

// GET /api/auth/dashboard-stats
router.get('/dashboard-stats', getDashboardStats);

module.exports = router;
