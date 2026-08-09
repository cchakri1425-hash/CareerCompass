import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';
import { CAREERS_DATA } from '../../data/careerDatabase';

const QUOTES = [
  "The secret of getting ahead is getting started. Keep pushing towards your dream career!",
  "Your direction is more important than your speed. Stay focused on your roadmap milestones.",
  "Opportunities don't happen. You create them step by step.",
  "Success isn't overnight. It's when every day you get a little better than the day before.",
  "Invest in your skills today; reap the rewards for a lifetime."
];

const WelcomeCard = () => {
  const { user, selectedEducation, selectedStream, selectedInterest, targetCareer } = useAuth();
  const { dashData } = useDashboard();

  const matchedCareer = CAREERS_DATA.find((c) => c.slug === targetCareer) || CAREERS_DATA[0];
  const avatarUrl = user?.avatarUrl || '';

  // Get quote based on current date
  const quoteIndex = new Date().getDate() % QUOTES.length;
  const quote = QUOTES[quoteIndex];

  // Calculate today's completed tasks progress
  const totalTasks = dashData.tasks?.length || 0;
  const completedTasks = dashData.tasks?.filter((t) => t.completed).length || 0;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 60;

  return (
    <div className="dash-welcome-hero-card">
      <div className="dash-welcome-glow"></div>
      
      <div className="welcome-hero-main">
        <div className="welcome-avatar-wrapper">
          <div className="welcome-avatar-circle">
            {avatarUrl && avatarUrl.length <= 4 ? (
              <span>{avatarUrl}</span>
            ) : avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" />
            ) : (
              <span>{user?.fullName?.charAt(0) || 'U'}</span>
            )}
          </div>
          <span className="online-indicator-dot" title="Active Session"></span>
        </div>

        <div className="welcome-text-group">
          <div className="welcome-badge-row">
            <span className="pill-target-career">🎯 Target Career: {matchedCareer.title}</span>
            <span className="pill-streak">🔥 5 Day Streak</span>
          </div>

          <h2>Welcome back, <span className="user-name-highlight">{user?.fullName || 'Explorer'}</span>! 👋</h2>
          
          <p className="welcome-quote">
            💬 <em>"{quote}"</em>
          </p>

          <div className="welcome-stage-tags">
            <span>🎓 Stage: <strong>{selectedEducation}</strong></span>
            <span>📚 Stream: <strong>{selectedStream}</strong></span>
            <span>💡 Domain: <strong>{selectedInterest}</strong></span>
          </div>
        </div>
      </div>

      <div className="welcome-hero-side-metric">
        <div className="progress-ring-box">
          <svg className="progress-svg" viewBox="0 0 36 36">
            <path
              className="circle-bg"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="circle-val"
              strokeDasharray={`${progressPercent}, 100`}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="ring-text">
            <strong>{progressPercent}%</strong>
            <span>Today</span>
          </div>
        </div>
        <p className="metric-caption">
          {completedTasks}/{totalTasks} Daily Tasks Done
        </p>
      </div>
    </div>
  );
};

export default WelcomeCard;
