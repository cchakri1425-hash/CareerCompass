const User = require('../models/User');
const OTP = require('../models/OTP');
const jwt = require('jsonwebtoken');
const generateOTP = require('../utils/generateOTP');
const { sendOTPEmail } = require('../services/emailService');

/**
 * Generate JWT Token helper
 * @param {string} id - User ObjectId string
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists',
      });
    }

    // Create user (isVerified will default to false)
    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      password,
      isVerified: false,
    });

    // Generate 6-digit OTP
    const otpCode = generateOTP();

    // Delete existing OTPs for this email if any
    await OTP.deleteMany({ email: user.email });

    // Save OTP to MongoDB with 5 min expiration
    await OTP.create({
      email: user.email,
      otp: otpCode,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    // Send Email via Nodemailer
    await sendOTPEmail(user.email, otpCode);

    return res.status(201).json({
      success: true,
      message: 'Registration successful! Verification OTP sent to your email.',
      requiresOTP: true,
      email: user.email,
    });
  } catch (error) {
    console.error('Register Controller Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during registration. Please try again.',
    });
  }
};

/**
 * @desc    Authenticate user & login
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Match password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Flow Requirement 2: If credentials are correct but email is not verified
    if (!user.isVerified) {
      const otpCode = generateOTP();

      // Clear existing OTPs for this email
      await OTP.deleteMany({ email: user.email });

      // Save new OTP (5 minute expiry)
      await OTP.create({
        email: user.email,
        otp: otpCode,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      });

      // Send OTP to email
      await sendOTPEmail(user.email, otpCode);

      return res.status(200).json({
        success: true,
        message: 'Email not verified. OTP sent to your registered email.',
        requiresOTP: true,
        email: user.email,
      });
    }

    // Flow Requirement 8: Email already verified -> Login directly & generate JWT
    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        isVerified: user.isVerified,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login Controller Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during login. Please try again.',
    });
  }
};

/**
 * @desc    Send standalone OTP to email
 * @route   POST /api/auth/send-otp
 * @access  Public
 */
const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const otpCode = generateOTP();

    await OTP.deleteMany({ email: email.toLowerCase() });

    await OTP.create({
      email: email.toLowerCase(),
      otp: otpCode,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendOTPEmail(email.toLowerCase(), otpCode);

    return res.status(200).json({
      success: true,
      message: 'OTP sent to your email address.',
    });
  } catch (error) {
    console.error('Send OTP Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send OTP. Please try again.',
    });
  }
};

/**
 * @desc    Verify OTP code
 * @route   POST /api/auth/verify-otp
 * @access  Public
 */
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await OTP.findOne({
      email: email.toLowerCase(),
      otp: otp.trim(),
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP code',
      });
    }

    // Check expiration
    if (new Date() > new Date(otpRecord.expiresAt)) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new code.',
      });
    }

    // Delete OTP record after successful verification
    await OTP.deleteOne({ _id: otpRecord._id });

    // Mark user as verified if user exists
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      user.isVerified = true;
      await user.save();

      const token = generateToken(user._id);

      return res.status(200).json({
        success: true,
        message: 'Email verified successfully!',
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          isVerified: user.isVerified,
          role: user.role,
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: 'OTP verified successfully.',
    });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during OTP verification.',
    });
  }
};

/**
 * @desc    Resend OTP (with 60-second cooldown handled client/server)
 * @route   POST /api/auth/resend-otp
 * @access  Public
 */
const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email address',
      });
    }

    const otpCode = generateOTP();

    await OTP.deleteMany({ email: user.email });

    await OTP.create({
      email: user.email,
      otp: otpCode,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendOTPEmail(user.email, otpCode);

    return res.status(200).json({
      success: true,
      message: 'A new 6-digit OTP code has been sent to your email.',
    });
  } catch (error) {
    console.error('Resend OTP Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to resend OTP code.',
    });
  }
};

/**
 * @desc    Request password reset OTP
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account registered with this email address',
      });
    }

    const otpCode = generateOTP();

    await OTP.deleteMany({ email: user.email });

    await OTP.create({
      email: user.email,
      otp: otpCode,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendOTPEmail(user.email, otpCode);

    return res.status(200).json({
      success: true,
      message: 'Password reset OTP code sent to your email address.',
      email: user.email,
    });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process forgot password request.',
    });
  }
};

/**
 * @desc    Reset password with OTP
 * @route   POST /api/auth/reset-password
 * @access  Public
 */
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Verify OTP first
    const otpRecord = await OTP.findOne({
      email: email.toLowerCase(),
      otp: otp.trim(),
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP code',
      });
    }

    if (new Date() > new Date(otpRecord.expiresAt)) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new code.',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User account not found',
      });
    }

    // Set new password (pre-save hook will hash it)
    user.password = newPassword;
    await user.save();

    // Delete OTP record
    await OTP.deleteOne({ _id: otpRecord._id });

    return res.status(200).json({
      success: true,
      message: 'Password reset successful! You can now log in with your new password.',
    });
  } catch (error) {
    console.error('Reset Password Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to reset password. Please try again.',
    });
  }
};

/**
 * @desc    Get authenticated user profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Get Profile Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving user profile.',
    });
  }
};

/**
 * @desc    Update authenticated user profile (including fullName, email, educationLevel, avatarUrl)
 * @route   PUT /api/auth/profile
 * @access  Private
 */
const updateProfile = async (req, res) => {
  try {
    const { fullName, email, educationLevel, avatarUrl } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (fullName !== undefined) user.fullName = fullName;
    if (email !== undefined) user.email = email.toLowerCase();
    if (educationLevel !== undefined) user.educationLevel = educationLevel;
    if (avatarUrl !== undefined) user.avatarUrl = avatarUrl;

    await user.save();

    const updatedUser = await User.findById(user._id).select('-password');

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Update Profile Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error updating user profile.',
    });
  }
};

/**
 * @desc    Change Password for authenticated user
 * @route   PUT /api/auth/change-password
 * @access  Private
 */
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Verify current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect.',
      });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Password changed successfully!',
    });
  } catch (error) {
    console.error('Change Password Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error changing password.',
    });
  }
};

/**
 * @desc    Get dashboard statistics for user
 * @route   GET /api/auth/dashboard-stats
 * @access  Private / Public
 */
const getDashboardStats = async (req, res) => {
  try {
    const Progress = require('../models/Progress');
    const Bookmark = require('../models/Bookmark');

    const userId = req.user ? req.user.id : req.query.userId || 'guest_user';

    const userProgress = await Progress.find({ userId });
    const userBookmarks = await Bookmark.find({ userId });

    let totalCompletedSteps = 0;
    userProgress.forEach((p) => {
      totalCompletedSteps += p.completedSteps ? p.completedSteps.length : 0;
    });

    const recentActivity = [
      { id: 1, text: 'Explored Software Engineer Roadmap', date: 'Just now', icon: '🗺️' },
      { id: 2, text: 'Updated Education Stage', date: 'Today', icon: '🎓' },
      { id: 3, text: 'Saved 2 Resources to Bookmarks', date: 'Yesterday', icon: '🔖' },
    ];

    const achievements = [
      { title: 'Pathfinder', desc: 'Started your first career roadmap', icon: '🚀', unlocked: true },
      { title: 'Learner', desc: 'Completed 3 roadmap steps', icon: '⭐', unlocked: totalCompletedSteps >= 3 },
      { title: 'Explorer', desc: 'Saved 5 bookmarks', icon: '🏆', unlocked: userBookmarks.length >= 5 },
    ];

    return res.status(200).json({
      success: true,
      stats: {
        totalCompletedSteps,
        totalBookmarks: userBookmarks.length,
        totalRoadmapsStarted: userProgress.length,
        recentActivity,
        achievements,
      },
    });
  } catch (error) {
    console.error('Get Dashboard Stats Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving dashboard statistics.',
    });
  }
};

module.exports = {
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
};
