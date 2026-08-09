import React from 'react';
import { useDashboard } from '../../context/DashboardContext';

const AnalyticsDashboardWidget = () => {
  const { dashData } = useDashboard();

  const studyHours = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.0 },
    { day: 'Wed', hours: 1.5 },
    { day: 'Thu', hours: 4.0 },
    { day: 'Fri', hours: 2.0 },
    { day: 'Sat', hours: 3.5 },
    { day: 'Sun', hours: 2.0 }
  ];

  const maxHours = 5.0;

  return (
    <div className="dash-widget-card analytics-widget">
      <div className="widget-card-header flex-between">
        <div>
          <h3>📈 Analytics & Performance Insights</h3>
          <span className="widget-subtitle">Weekly study hours, skill progression & readiness chart</span>
        </div>
        <span className="readiness-pill-score">
          Readiness Score: <strong>{dashData.careerReadinessScore || 72}/100</strong>
        </span>
      </div>

      {/* SVG Bar Chart for Study Hours */}
      <div className="analytics-chart-container">
        <h4>Weekly Learning Activity (Hours / Day)</h4>
        
        <div className="chart-bars-flex">
          {studyHours.map((d, idx) => {
            const heightPct = Math.round((d.hours / maxHours) * 100);
            return (
              <div key={idx} className="bar-col">
                <span className="bar-val">{d.hours}h</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ height: `${heightPct}%` }}></div>
                </div>
                <span className="bar-day">{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Analytics Summary Row */}
      <div className="analytics-summary-row">
        <div className="summary-stat-chip">
          <span className="chip-num">18.5h</span>
          <span className="chip-lbl">Total Study Time</span>
        </div>

        <div className="summary-stat-chip">
          <span className="chip-num">85%</span>
          <span className="chip-lbl">Consistency Index</span>
        </div>

        <div className="summary-stat-chip">
          <span className="chip-num">4</span>
          <span className="chip-lbl">Active Certifications</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboardWidget;
