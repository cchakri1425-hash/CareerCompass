import React from 'react';
import { useDashboard } from '../../context/DashboardContext';

const ALL_WIDGETS = [
  { key: 'welcome', label: 'Welcome & Motivational Banner' },
  { key: 'overview', label: 'Progress Overview & Metrics' },
  { key: 'roadmap', label: 'Interactive Career Roadmap' },
  { key: 'learning', label: 'Continue Learning & Resources' },
  { key: 'recommendations', label: 'Career Recommendations' },
  { key: 'tasks', label: 'Daily Tasks & Checklist' },
  { key: 'goals', label: 'Short & Long-Term Goals' },
  { key: 'calendar', label: 'Calendar & Schedule Planner' },
  { key: 'notes', label: 'Personal Workspace & Notes' },
  { key: 'quiz', label: 'Quiz Performance & Strengths' },
  { key: 'skills', label: 'Skill Progress Tracker' },
  { key: 'certificates', label: 'Earned Certificates Showcase' },
  { key: 'internships', label: 'Internship Application Pipeline' },
  { key: 'projects', label: 'Project Portfolio Showcase' },
  { key: 'resume', label: 'ATS Resume Builder' },
  { key: 'analytics', label: 'Analytics & Study Hours Chart' },
  { key: 'achievements', label: 'Achievements & XP Badges' },
  { key: 'timeline', label: 'Activity Timeline & Audit Log' }
];

const CustomizationDrawer = ({ isOpen, onClose }) => {
  const { dashData, updateCustomization, toggleWidgetVisibility } = useDashboard();
  const cust = dashData.customization || { theme: 'glassmorphism', hiddenWidgets: [] };

  if (!isOpen) return null;

  const themes = [
    { id: 'glassmorphism', label: '✨ Glassmorphism (Default)' },
    { id: 'dark', label: '🌙 Sleek Dark Mode' },
    { id: 'light', label: '☀️ Clean Light Mode' },
    { id: 'cyberpunk', label: '⚡ Cyberpunk Tech' }
  ];

  const hidden = cust.hiddenWidgets || [];

  const handleReset = () => {
    updateCustomization({
      theme: 'glassmorphism',
      accentColor: '#6366f1',
      hiddenWidgets: [],
      layoutDensity: 'comfortable'
    });
  };

  return (
    <div className="customization-drawer-overlay">
      <div className="customization-drawer-panel">
        <div className="drawer-header flex-between">
          <div>
            <h3>🎨 Dashboard Customization</h3>
            <span className="drawer-subtitle">Personalize theme, widget visibility & layout</span>
          </div>
          <button className="btn-close-drawer" onClick={onClose}>✕</button>
        </div>

        <div className="drawer-body">
          {/* THEME SELECTION */}
          <div className="cust-section">
            <h4>Select Theme Style</h4>
            <div className="themes-grid">
              {themes.map((t) => (
                <button
                  key={t.id}
                  className={`theme-picker-btn ${cust.theme === t.id ? 'active' : ''}`}
                  onClick={() => updateCustomization({ theme: t.id })}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* WIDGET VISIBILITY TOGGLES */}
          <div className="cust-section">
            <h4>Widget Visibility (Show / Hide)</h4>
            <p className="cust-desc">Toggle off widgets you prefer to hide from your main dashboard control center.</p>

            <div className="widget-toggles-list">
              {ALL_WIDGETS.map((w) => {
                const isHidden = hidden.includes(w.key);
                return (
                  <div key={w.key} className="toggle-row-item">
                    <span>{w.label}</span>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={!isHidden}
                        onChange={() => toggleWidgetVisibility(w.key)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="drawer-footer flex-between">
          <button className="btn-dash-outline" onClick={handleReset}>
            Reset to Default Defaults
          </button>
          <button className="btn-dash-primary-sm" onClick={onClose}>
            Done & Save 💾
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationDrawer;
