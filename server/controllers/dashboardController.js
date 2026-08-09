const DashboardData = require('../models/DashboardData');
const User = require('../models/User');

// Default initial dashboard seed data for new users
const getDefaultDashboardData = (userId) => ({
  userId,
  bio: 'Passionate student navigating my dream career path with Career Compass.',
  location: 'India',
  socialLinks: { github: '', linkedin: '', portfolio: '' },
  studyHoursThisWeek: 14.5,
  careerReadinessScore: 72,
  tasks: [
    { id: 't1', title: 'Complete Class 12 / Degree milestone project', category: 'Roadmap', priority: 'High', completed: false, dueDate: 'Tomorrow' },
    { id: 't2', title: 'Revise Core Programming & Aptitude concepts', category: 'Quiz', priority: 'Medium', completed: true, dueDate: 'Today' },
    { id: 't3', title: 'Upload latest internship completion certificate', category: 'Profile', priority: 'Low', completed: false, dueDate: 'This week' }
  ],
  goals: [
    { id: 'g1', title: 'Master Core Skillset & Build 2 Showcase Projects', category: 'Career', type: 'short-term', targetDate: 'Next Month', progress: 65, completed: false },
    { id: 'g2', title: 'Secure Top Internship / Entry Level Role', category: 'Placement', type: 'long-term', targetDate: 'In 6 Months', progress: 40, completed: false }
  ],
  notes: [
    { id: 'n1', title: 'Key Concepts & Roadmap Milestones', content: 'Focus on hands-on practical projects, open source contributions, and daily problem solving.', folder: 'Learning', isPinned: true, createdAt: new Date().toISOString() },
    { id: 'n2', title: 'Interview Preparation Checklist', content: '1. Technical fundamentals\n2. System design overview\n3. Mock interviews', folder: 'Career', isPinned: false, createdAt: new Date().toISOString() }
  ],
  calendarEvents: [
    { id: 'e1', title: 'Career Quiz & Aptitude Test', date: '2026-08-10', type: 'exam', status: 'Upcoming', description: 'Evaluate strengths and updated career matching score.' },
    { id: 'e2', title: 'Project Review & GitHub Push', date: '2026-08-15', type: 'deadline', status: 'Upcoming', description: 'Finalize portfolio project submission.' }
  ],
  internships: [
    { id: 'i1', company: 'TechNova Solutions', role: 'Frontend Developer Intern', status: 'Interviewing', appliedDate: '2026-07-20', deadline: '2026-08-12', salary: '₹15,000/mo', notes: 'Round 2 scheduled' },
    { id: 'i2', company: 'CloudScale Systems', role: 'Junior Software Trainee', status: 'Applied', appliedDate: '2026-08-01', deadline: '2026-08-25', salary: '₹20,000/mo', notes: 'Awaiting feedback' }
  ],
  projects: [
    { id: 'p1', title: 'Career Compass Platform', description: 'Comprehensive AI-driven career guidance and interactive roadmap tracking system.', techStack: ['React', 'Node.js', 'Express', 'MongoDB'], githubUrl: 'https://github.com/example/career-compass', demoUrl: 'https://careercompass.demo', status: 'Completed' },
    { id: 'p2', title: 'Smart Skill Evaluator', description: 'Quiz module measuring domain readiness and skill gaps.', techStack: ['JavaScript', 'CSS3', 'REST API'], githubUrl: 'https://github.com/example/skill-evaluator', demoUrl: '', status: 'In Progress' }
  ],
  certificates: [
    { id: 'c1', title: 'Full Stack Web Development Certification', issuer: 'Career Compass Academy', issueDate: 'July 2026', credentialUrl: 'https://careercompass.com/verify/cert123', category: 'Development' }
  ],
  skills: [
    { name: 'Problem Solving & Logic', category: 'Technical', proficiency: 85, level: 'Advanced' },
    { name: 'Core Domain Fundamentals', category: 'Technical', proficiency: 75, level: 'Intermediate' },
    { name: 'Communication & Teamwork', category: 'Soft Skill', proficiency: 90, level: 'Advanced' },
    { name: 'Version Control (Git/GitHub)', category: 'Technical', proficiency: 80, level: 'Advanced' }
  ],
  achievements: [
    { id: 'a1', title: 'First Step Taken', desc: 'Started your active career roadmap journey', icon: '🚀', unlockedAt: 'Recently', category: 'Milestone' },
    { id: 'a2', title: 'Quiz Master', desc: 'Completed initial career aptitude evaluation', icon: '🎯', unlockedAt: 'Recently', category: 'Quiz' },
    { id: 'a3', title: 'Goal Setter', desc: 'Created short-term & long-term career targets', icon: '🏆', unlockedAt: 'Recently', category: 'Goals' }
  ],
  notifications: [
    { id: 'nt1', title: 'Roadmap Milestone Update', message: 'You have completed 65% of your core career milestones!', type: 'update', date: 'Just now', read: false },
    { id: 'nt2', title: 'New Resources Added', message: 'Check out newly added recommended books and courses.', type: 'info', date: '1 hour ago', read: false }
  ],
  activityLog: [
    { id: 'act1', title: 'Updated target career roadmap to active stage', timestamp: new Date().toISOString(), icon: '🗺️', type: 'roadmap' },
    { id: 'act2', title: 'Saved new career learning resources', timestamp: new Date().toISOString(), icon: '🔖', type: 'bookmark' }
  ],
  customization: {
    theme: 'glassmorphism',
    accentColor: '#6366f1',
    hiddenWidgets: [],
    layoutDensity: 'comfortable'
  },
  resumeData: {
    summary: 'Driven aspiring professional with hands-on project experience, strong problem-solving foundation, and commitment to continuous learning.',
    location: 'India',
    phone: '+91 98765 43210',
    github: 'github.com/career-explorer',
    linkedin: 'linkedin.com/in/career-explorer',
    portfolio: 'portfolio.dev'
  }
});

// @desc    Get complete dashboard data for a user
// @route   GET /api/dashboard/:userId
exports.getDashboardData = async (req, res) => {
  try {
    const { userId } = req.params;

    let data = await DashboardData.findOne({ userId });

    if (!data) {
      // Create initial seed data if none exists
      data = new DashboardData(getDefaultDashboardData(userId));
      await data.save();
    }

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve dashboard data',
      error: error.message
    });
  }
};

// @desc    Update complete or partial dashboard sections
// @route   PUT /api/dashboard/:userId
exports.updateDashboardData = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateFields = req.body;

    let data = await DashboardData.findOneAndUpdate(
      { userId },
      { $set: updateFields },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: 'Dashboard updated successfully',
      data
    });
  } catch (error) {
    console.error('Error updating dashboard data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update dashboard data',
      error: error.message
    });
  }
};

// @desc    Update dashboard customization preferences (theme, hidden widgets)
// @route   PUT /api/dashboard/:userId/customization
exports.updateCustomization = async (req, res) => {
  try {
    const { userId } = req.params;
    const customization = req.body;

    let data = await DashboardData.findOneAndUpdate(
      { userId },
      { $set: { customization } },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: 'Customization preferences saved',
      customization: data.customization
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update customization preferences',
      error: error.message
    });
  }
};
