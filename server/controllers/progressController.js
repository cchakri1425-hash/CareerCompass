const mongoose = require('mongoose');
const Progress = require('../models/Progress');

/**
 * @desc    Get user roadmap progress for a career
 * @route   GET /api/progress/:careerId
 * @access  Public / Private
 */
const getCareerProgress = async (req, res) => {
  try {
    const { careerId } = req.params;
    const userId = req.user ? req.user.id : req.query.userId || 'guest_user';

    let progress = null;
    if (mongoose.connection.readyState === 1) {
      try {
        progress = await Progress.findOne({ userId, careerId });
      } catch (dbErr) {
        console.warn('Progress DB query warning:', dbErr.message);
      }
    }

    if (!progress) {
      progress = {
        userId,
        careerId,
        completedSteps: [],
        lastActiveStep: 1,
      };
    }

    return res.status(200).json({
      success: true,
      progress,
    });
  } catch (error) {
    console.error('Get Progress Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving progress record.',
    });
  }
};

/**
 * @desc    Update step progress (mark step as complete/incomplete) in MongoDB
 * @route   POST /api/progress/step
 * @access  Public / Private
 */
const updateStepProgress = async (req, res) => {
  try {
    const { careerId, stepNumber, completed } = req.body;
    const userId = req.user ? req.user.id : req.body.userId || 'guest_user';

    if (!careerId || stepNumber === undefined) {
      return res.status(400).json({
        success: false,
        message: 'careerId and stepNumber are required.',
      });
    }

    let progress = await Progress.findOne({ userId, careerId });

    if (!progress) {
      progress = new Progress({
        userId,
        careerId,
        completedSteps: [],
        lastActiveStep: stepNumber,
      });
    }

    const num = Number(stepNumber);

    if (completed) {
      if (!progress.completedSteps.includes(num)) {
        progress.completedSteps.push(num);
      }
    } else {
      progress.completedSteps = progress.completedSteps.filter((s) => s !== num);
    }

    progress.lastActiveStep = num;
    await progress.save();

    return res.status(200).json({
      success: true,
      message: 'Progress updated successfully in MongoDB!',
      progress,
    });
  } catch (error) {
    console.error('Update Step Progress Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error updating step progress.',
    });
  }
};

module.exports = {
  getCareerProgress,
  updateStepProgress,
};
