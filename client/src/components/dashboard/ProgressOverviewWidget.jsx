import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';
import { CAREERS_DATA } from '../../data/careerDatabase';

const ProgressOverviewWidget = () => {
  const { targetCareer, selectedEducation } = useAuth();
  const { dashData } = useDashboard();

  const activeCareer = CAREERS_DATA.find((c) => c.slug === targetCareer) || CAREERS_DATA[0];

  // Calculate metrics based on data
  const totalCertificates = dashData.certificates?.length || 1;
  const completedProjects = dashData.projects?.filter(p => p.status === 'Completed').length || 1;
  const totalTasks = dashData.tasks?.length || 3;
  const completedTasks = dashData.tasks?.filter(t => t.completed).length || 1;
  
  const completionPercentage = Math.min(
    100,
    Math.round(((completedTasks + completedProjects + totalCertificates) / 10) * 100)
  );

  return (
    <div className="dash-widget-card metrics-overview-widget">
      <div className="widget-card-header">
        <h3>📊 Career Roadmap Progress Overview</h3>
        <span className="widget-subtitle">Real-time metrics for {activeCareer.title}</span>
      </div>

      {/* Primary Progress Bar */}
      <div className="primary-progress-banner">
        <div className="progress-info-row">
          <span className="progress-lbl">Overall Target Readiness</span>
          <span className="progress-val-text">{completionPercentage}% Completed</span>
        </div>
        <div className="dash-progress-track">
          <div
            className="dash-progress-fill"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <div className="progress-footer-note">
          <span>📅 Est. Target Completion: <strong>3 Months</strong></span>
          <span>🎓 Current Level: <strong>{selectedEducation}</strong></span>
        </div>
      </div>

      {/* Grid of Metric Boxes */}
      <div className="overview-metrics-grid">
        <div className="metric-mini-card">
          <div className="mini-icon-bg purple">🗺️</div>
          <div>
            <h4>Milestones</h4>
            <div className="mini-metric-num">{completedTasks} / {totalTasks}</div>
            <span className="mini-subtext">Completed steps</span>
          </div>
        </div>

        <div className="metric-mini-card">
          <div className="mini-icon-bg green">📜</div>
          <div>
            <h4>Certificates</h4>
            <div className="mini-metric-num">{totalCertificates}</div>
            <span className="mini-subtext">Verified credentials</span>
          </div>
        </div>

        <div className="metric-mini-card">
          <div className="mini-icon-bg blue">🚀</div>
          <div>
            <h4>Projects</h4>
            <div className="mini-metric-num">{completedProjects}</div>
            <span className="mini-subtext">Completed builds</span>
          </div>
        </div>

        <div className="metric-mini-card">
          <div className="mini-icon-bg amber">💼</div>
          <div>
            <h4>Internships</h4>
            <div className="mini-metric-num">{dashData.internships?.length || 0}</div>
            <span className="mini-subtext">Applications tracked</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverviewWidget;
