import React from 'react';
import { useDashboard } from '../../context/DashboardContext';

const AchievementsWidget = () => {
  const { dashData } = useDashboard();

  const achievements = dashData.achievements || [
    { id: 'a1', title: 'First Step Taken', desc: 'Started your active career roadmap journey', icon: '🚀', unlockedAt: 'Recently', category: 'Milestone' },
    { id: 'a2', title: 'Quiz Master', desc: 'Completed initial career aptitude evaluation', icon: '🎯', unlockedAt: 'Recently', category: 'Quiz' },
    { id: 'a3', title: 'Goal Setter', desc: 'Created short-term & long-term career targets', icon: '🏆', unlockedAt: 'Recently', category: 'Goals' },
    { id: 'a4', title: 'Project Builder', desc: 'Added showcase project to portfolio', icon: '💻', unlockedAt: 'Recently', category: 'Project' }
  ];

  return (
    <div className="dash-widget-card achievements-widget">
      <div className="widget-card-header flex-between">
        <div>
          <h3>🏆 Achievements & Badges</h3>
          <span className="widget-subtitle">Gamified milestones and rewards unlocked along your journey</span>
        </div>
        <span className="reward-points-pill">⭐ 450 XP Points</span>
      </div>

      <div className="achievements-badges-grid">
        {achievements.map((ach) => (
          <div key={ach.id} className="badge-card-item">
            <div className="badge-icon-circle">{ach.icon}</div>
            <h4>{ach.title}</h4>
            <p>{ach.desc}</p>
            <span className="unlocked-tag">✓ Unlocked {ach.unlockedAt}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsWidget;
