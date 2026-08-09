import React from 'react';
import { useDashboard } from '../../context/DashboardContext';

const NotificationCenterWidget = () => {
  const { dashData, markNotificationRead, clearAllNotifications } = useDashboard();

  const notifications = dashData.notifications || [
    { id: 'nt1', title: 'Roadmap Progress', message: 'Milestone 2 completed for active career path.', type: 'update', date: '1 hour ago', read: false },
    { id: 'nt2', title: 'Internship Deadline Alert', message: 'Application for TechNova Solutions closes in 3 days.', type: 'alert', date: 'Today', read: false }
  ];

  return (
    <div className="dash-widget-card notifications-widget">
      <div className="widget-card-header flex-between">
        <div>
          <h3>🔔 Notification Center</h3>
          <span className="widget-subtitle">Alerts, roadmap updates, resources & deadlines</span>
        </div>
        {notifications.length > 0 && (
          <button className="btn-dash-text" onClick={clearAllNotifications}>
            Clear All
          </button>
        )}
      </div>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="dash-empty-small">
            <p>No unread notifications.</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className={`notif-item-row ${n.read ? 'read' : 'unread'} type-${n.type}`}>
              <span className="notif-icon">
                {n.type === 'alert' ? '⚠️' : n.type === 'update' ? '🚀' : 'ℹ️'}
              </span>
              
              <div className="notif-body">
                <div className="notif-header-row">
                  <h4>{n.title}</h4>
                  <span className="notif-date">{n.date}</span>
                </div>
                <p>{n.message}</p>
              </div>

              {!n.read && (
                <button
                  className="btn-mark-read"
                  onClick={() => markNotificationRead(n.id)}
                  title="Mark as read"
                >
                  ✓
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationCenterWidget;
