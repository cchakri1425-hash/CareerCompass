import React from 'react';
import { useDashboard } from '../../context/DashboardContext';

const SkillTrackerWidget = () => {
  const { dashData } = useDashboard();

  const defaultSkills = [
    { name: 'Problem Solving & Logic', category: 'Technical', proficiency: 85, level: 'Advanced' },
    { name: 'Core Domain Knowledge', category: 'Technical', proficiency: 75, level: 'Intermediate' },
    { name: 'Communication & Presentation', category: 'Soft Skill', proficiency: 90, level: 'Advanced' },
    { name: 'Version Control (Git / GitHub)', category: 'Technical', proficiency: 80, level: 'Advanced' },
    { name: 'System Design & Architecture', category: 'Technical', proficiency: 60, level: 'Intermediate' }
  ];

  const skills = dashData.skills?.length > 0 ? dashData.skills : defaultSkills;

  return (
    <div className="dash-widget-card skill-tracker-widget">
      <div className="widget-card-header">
        <h3>⚡ Skill Progress Tracker</h3>
        <span className="widget-subtitle">Technical & soft skills proficiency metrics</span>
      </div>

      <div className="skills-list-grid">
        {skills.map((s, idx) => (
          <div key={idx} className="skill-item-box">
            <div className="skill-title-row">
              <div>
                <span className="skill-name">{s.name}</span>
                <span className="skill-cat-badge">{s.category}</span>
              </div>
              <div className="skill-level-badge">{s.level} ({s.proficiency}%)</div>
            </div>

            <div className="dash-progress-track">
              <div
                className="dash-progress-fill"
                style={{ width: `${s.proficiency}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillTrackerWidget;
