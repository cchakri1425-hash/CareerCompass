import React from 'react';
import { useDashboard } from '../../context/DashboardContext';

const ActivityTimelineWidget = () => {
  const { dashData } = useDashboard();

  const logs = dashData.activityLog || [
    { id: 'act1', title: 'Updated target career roadmap to active stage', timestamp: 'Just now', icon: '🗺️', type: 'roadmap' },
    { id: 'act2', title: 'Saved new career learning resources', timestamp: '1 hour ago', icon: '🔖', type: 'bookmark' },
    { id: 'act3', title: 'Completed Aptitude & Skill Assessment Quiz', timestamp: 'Yesterday', icon: '🎯', type: 'quiz' }
  ];

  return (
    <div className="dash-widget-card activity-timeline-widget">
      <div className="widget-card-header">
        <h3>📌 Activity Timeline & Audit Log</h3>
        <span className="widget-subtitle">Chronological record of your actions & milestone updates</span>
      </div>

      <div className="activity-timeline-container">
        {logs.map((log) => (
          <div key={log.id} className="timeline-log-item">
            <div className="timeline-icon-badge">{log.icon || '📌'}</div>
            
            <div className="timeline-log-body">
              <div className="log-title-row">
                <h4>{log.title}</h4>
                <span className="log-time">{log.timestamp ? new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimelineWidget;
