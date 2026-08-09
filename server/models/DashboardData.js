const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, default: 'General' },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  completed: { type: Boolean, default: false },
  dueDate: { type: String, default: '' },
}, { timestamps: true });

const GoalSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, default: 'Career' },
  type: { type: String, enum: ['short-term', 'long-term'], default: 'short-term' },
  targetDate: { type: String, default: '' },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

const NoteSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, default: '' },
  folder: { type: String, default: 'General' },
  isPinned: { type: Boolean, default: false },
}, { timestamps: true });

const CalendarEventSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  type: { type: String, enum: ['exam', 'interview', 'deadline', 'certification', 'study'], default: 'study' },
  status: { type: String, default: 'Upcoming' },
  description: { type: String, default: '' },
});

const InternshipSchema = new mongoose.Schema({
  id: { type: String, required: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, enum: ['Applied', 'Interviewing', 'Offer Received', 'Rejected', 'Completed'], default: 'Applied' },
  appliedDate: { type: String, default: '' },
  deadline: { type: String, default: '' },
  salary: { type: String, default: '' },
  notes: { type: String, default: '' },
});

const ProjectSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  techStack: [{ type: String }],
  githubUrl: { type: String, default: '' },
  demoUrl: { type: String, default: '' },
  status: { type: String, enum: ['Planning', 'In Progress', 'Completed'], default: 'In Progress' },
});

const CertificateSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  issueDate: { type: String, default: '' },
  credentialUrl: { type: String, default: '' },
  category: { type: String, default: 'Tech' },
});

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'Technical' },
  proficiency: { type: Number, default: 40, min: 0, max: 100 },
  level: { type: String, default: 'Beginner' },
});

const AchievementSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  icon: { type: String, default: '🏆' },
  unlockedAt: { type: String, default: '' },
  category: { type: String, default: 'General' },
});

const NotificationSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['alert', 'update', 'success', 'info'], default: 'info' },
  date: { type: String, default: '' },
  read: { type: Boolean, default: false },
});

const ActivitySchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  timestamp: { type: String, default: () => new Date().toISOString() },
  icon: { type: String, default: '📌' },
  type: { type: String, default: 'general' },
});

const CustomizationSchema = new mongoose.Schema({
  theme: { type: String, enum: ['dark', 'light', 'glassmorphism', 'cyberpunk'], default: 'glassmorphism' },
  accentColor: { type: String, default: '#6366f1' },
  hiddenWidgets: [{ type: String }],
  layoutDensity: { type: String, enum: ['comfortable', 'compact'], default: 'comfortable' },
});

const ResumeDataSchema = new mongoose.Schema({
  summary: { type: String, default: '' },
  location: { type: String, default: '' },
  phone: { type: String, default: '' },
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  portfolio: { type: String, default: '' },
  experience: [{ company: String, role: String, duration: String, details: String }],
  education: [{ degree: String, institution: String, year: String, grade: String }],
});

const DashboardDataSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  bio: { type: String, default: 'Passionate learner navigating my dream career path with Career Compass.' },
  location: { type: String, default: 'India' },
  socialLinks: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    portfolio: { type: String, default: '' },
  },
  studyHoursThisWeek: { type: Number, default: 14.5 },
  careerReadinessScore: { type: Number, default: 72 },
  tasks: [TaskSchema],
  goals: [GoalSchema],
  notes: [NoteSchema],
  calendarEvents: [CalendarEventSchema],
  internships: [InternshipSchema],
  projects: [ProjectSchema],
  certificates: [CertificateSchema],
  skills: [SkillSchema],
  achievements: [AchievementSchema],
  notifications: [NotificationSchema],
  activityLog: [ActivitySchema],
  customization: { type: CustomizationSchema, default: () => ({}) },
  resumeData: { type: ResumeDataSchema, default: () => ({}) },
}, { timestamps: true });

module.exports = mongoose.model('DashboardData', DashboardDataSchema);
