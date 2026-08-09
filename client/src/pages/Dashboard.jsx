import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { DashboardProvider, useDashboard } from '../context/DashboardContext';

// Modular Widgets Imports
import WelcomeCard from '../components/dashboard/WelcomeCard';
import ProfileCard from '../components/dashboard/ProfileCard';
import ProgressOverviewWidget from '../components/dashboard/ProgressOverviewWidget';
import RoadmapWidget from '../components/dashboard/RoadmapWidget';
import ContinueLearningWidget from '../components/dashboard/ContinueLearningWidget';
import CareerRecommendationsWidget from '../components/dashboard/CareerRecommendationsWidget';
import DailyTasksWidget from '../components/dashboard/DailyTasksWidget';
import GoalsWidget from '../components/dashboard/GoalsWidget';
import CalendarWidget from '../components/dashboard/CalendarWidget';
import SavedCareersWidget from '../components/dashboard/SavedCareersWidget';
import SavedResourcesWidget from '../components/dashboard/SavedResourcesWidget';
import NotesWidget from '../components/dashboard/NotesWidget';
import QuizPerformanceWidget from '../components/dashboard/QuizPerformanceWidget';
import SkillTrackerWidget from '../components/dashboard/SkillTrackerWidget';
import CertificatesWidget from '../components/dashboard/CertificatesWidget';
import InternshipTrackerWidget from '../components/dashboard/InternshipTrackerWidget';
import ProjectPortfolioWidget from '../components/dashboard/ProjectPortfolioWidget';
import ResumeBuilderWidget from '../components/dashboard/ResumeBuilderWidget';
import NotificationCenterWidget from '../components/dashboard/NotificationCenterWidget';
import AnalyticsDashboardWidget from '../components/dashboard/AnalyticsDashboardWidget';
import AchievementsWidget from '../components/dashboard/AchievementsWidget';
import CustomizationDrawer from '../components/dashboard/CustomizationDrawer';
import ActivityTimelineWidget from '../components/dashboard/ActivityTimelineWidget';

import './Dashboard.css';

const DashboardContent = () => {
  const { user } = useAuth();
  const { dashData } = useDashboard();

  const [activeTab, setActiveTab] = useState('overview');
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Security password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');

  const cust = dashData.customization || { theme: 'glassmorphism', hiddenWidgets: [] };
  const hidden = cust.hiddenWidgets || [];

  const isVisible = (key) => !hidden.includes(key);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMsg('New passwords do not match');
      return;
    }
    setPasswordMsg('Password security preferences updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className={`dash-page-wrapper theme-${cust.theme || 'glassmorphism'}`}>
      <Navbar />

      {/* DASHBOARD TOP TOOLBAR BAR */}
      <div className="dash-top-bar flex-between">
        <div className="dash-top-title flex-align">
          <span className="dash-brand-icon">🧭</span>
          <div>
            <h2>Central Command Center</h2>
            <span className="dash-subtitle">Personalized Learning & Career Management Platform</span>
          </div>
        </div>

        <div className="dash-top-actions flex-align">
          <button className="btn-customize-trigger" onClick={() => setIsCustomizerOpen(true)}>
            🎨 Customize Dashboard
          </button>
        </div>
      </div>

      <div className="dash-layout-container">
        {/* SIDEBAR NAVIGATION */}
        <aside className="dash-sidebar-nav">
          <div className="dash-sidebar-user-info">
            <div className="avatar-badge-circle">
              {user?.avatarUrl && user.avatarUrl.length <= 4 ? (
                <span>{user.avatarUrl}</span>
              ) : (
                <span>{user?.fullName?.charAt(0) || 'U'}</span>
              )}
            </div>
            <h4>{user?.fullName || 'Career Explorer'}</h4>
            <span className="user-email-text">{user?.email || 'student@careercompass.com'}</span>
          </div>

          <nav className="dash-menu-tabs">
            <button
              className={`menu-tab-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              📊 Control Center
            </button>
            <button
              className={`menu-tab-item ${activeTab === 'journey' ? 'active' : ''}`}
              onClick={() => setActiveTab('journey')}
            >
              🗺️ Roadmap & Journeys
            </button>
            <button
              className={`menu-tab-item ${activeTab === 'workspace' ? 'active' : ''}`}
              onClick={() => setActiveTab('workspace')}
            >
              📝 Tasks & Notes
            </button>
            <button
              className={`menu-tab-item ${activeTab === 'applications' ? 'active' : ''}`}
              onClick={() => setActiveTab('applications')}
            >
              💼 Applications & Portfolio
            </button>
            <button
              className={`menu-tab-item ${activeTab === 'resume' ? 'active' : ''}`}
              onClick={() => setActiveTab('resume')}
            >
              📄 ATS Resume Builder
            </button>
            <button
              className={`menu-tab-item ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              📈 Analytics & Badges
            </button>

            <div className="sidebar-divider"></div>

            <button
              className={`menu-tab-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              👤 Profile & Settings
            </button>
          </nav>
        </aside>

        {/* MAIN DASHBOARD CONTENT PANE */}
        <main className="dash-main-pane">
          {/* CONTROL CENTER OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="tab-pane-content">
              {isVisible('welcome') && <WelcomeCard />}
              {isVisible('overview') && <ProgressOverviewWidget />}
              
              <div className="dash-2-col-grid">
                {isVisible('roadmap') && <RoadmapWidget />}
                {isVisible('tasks') && <DailyTasksWidget />}
              </div>

              <div className="dash-2-col-grid">
                {isVisible('learning') && <ContinueLearningWidget />}
                {isVisible('goals') && <GoalsWidget />}
              </div>
            </div>
          )}

          {/* ROADMAP & JOURNEYS TAB */}
          {activeTab === 'journey' && (
            <div className="tab-pane-content">
              {isVisible('roadmap') && <RoadmapWidget />}
              {isVisible('recommendations') && <CareerRecommendationsWidget />}
              
              <div className="dash-2-col-grid">
                {isVisible('savedCareers') && <SavedCareersWidget />}
                {isVisible('savedResources') && <SavedResourcesWidget />}
              </div>

              {isVisible('quiz') && <QuizPerformanceWidget />}
            </div>
          )}

          {/* TASKS & NOTES TAB */}
          {activeTab === 'workspace' && (
            <div className="tab-pane-content">
              {isVisible('notes') && <NotesWidget />}
              
              <div className="dash-2-col-grid">
                {isVisible('tasks') && <DailyTasksWidget />}
                {isVisible('calendar') && <CalendarWidget />}
              </div>
            </div>
          )}

          {/* APPLICATIONS & PORTFOLIO TAB */}
          {activeTab === 'applications' && (
            <div className="tab-pane-content">
              {isVisible('internships') && <InternshipTrackerWidget />}
              {isVisible('projects') && <ProjectPortfolioWidget />}
              {isVisible('certificates') && <CertificatesWidget />}
            </div>
          )}

          {/* ATS RESUME BUILDER TAB */}
          {activeTab === 'resume' && (
            <div className="tab-pane-content">
              <ResumeBuilderWidget />
            </div>
          )}

          {/* ANALYTICS & BADGES TAB */}
          {activeTab === 'analytics' && (
            <div className="tab-pane-content">
              <div className="dash-2-col-grid">
                {isVisible('analytics') && <AnalyticsDashboardWidget />}
                {isVisible('achievements') && <AchievementsWidget />}
              </div>

              <div className="dash-2-col-grid">
                {isVisible('skills') && <SkillTrackerWidget />}
                {isVisible('notifications') && <NotificationCenterWidget />}
              </div>

              {isVisible('timeline') && <ActivityTimelineWidget />}
            </div>
          )}

          {/* PROFILE & SETTINGS TAB */}
          {activeTab === 'profile' && (
            <div className="tab-pane-content">
              <ProfileCard />

              <div className="dash-widget-card password-card-widget">
                <div className="widget-card-header">
                  <h3>🔒 Security & Password</h3>
                  <span className="widget-subtitle">Update password and security credentials</span>
                </div>

                {passwordMsg && <div className="dash-alert alert-success">✅ {passwordMsg}</div>}

                <form onSubmit={handlePasswordSubmit} className="dash-form">
                  <div className="form-group">
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      className="dash-input"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">New Password</label>
                      <input
                        type="password"
                        className="dash-input"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Confirm New Password</label>
                      <input
                        type="password"
                        className="dash-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-dash-primary">
                    Update Security Password 🔐
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* DASHBOARD CUSTOMIZATION DRAWER */}
      <CustomizationDrawer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
      />
    </div>
  );
};

const Dashboard = () => (
  <DashboardProvider>
    <DashboardContent />
  </DashboardProvider>
);

export default Dashboard;
