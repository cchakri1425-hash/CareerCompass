import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';

const CalendarWidget = () => {
  const { dashData, addCalendarEvent, deleteCalendarEvent } = useDashboard();
  const [showAddForm, setShowAddForm] = useState(false);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState('exam');
  const [description, setDescription] = useState('');

  const events = dashData.calendarEvents || [];

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim() || !date) return;
    addCalendarEvent({ title, date, type, description });
    setTitle('');
    setDescription('');
    setShowAddForm(false);
  };

  return (
    <div className="dash-widget-card calendar-widget">
      <div className="widget-card-header flex-between">
        <div>
          <h3>📅 Calendar & Schedule Planner</h3>
          <span className="widget-subtitle">Exams, interview dates, project deadlines & certifications</span>
        </div>
        <button className="btn-dash-primary-sm" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Close Form ✕' : '+ Add Event'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleCreate} className="inline-add-form">
          <div className="form-row-2">
            <input
              type="text"
              className="dash-input"
              placeholder="Event Title (e.g., Tech Internship Interview)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="date"
              className="dash-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-row-2">
            <select className="dash-select" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="exam">🎓 Exam / Assessment</option>
              <option value="interview">💼 Interview Round</option>
              <option value="deadline">⏰ Project Deadline</option>
              <option value="certification">📜 Certification Exam</option>
              <option value="study">📚 Study Session</option>
            </select>
            <button type="submit" className="btn-dash-save-sm">Schedule Event</button>
          </div>
        </form>
      )}

      <div className="events-timeline-list">
        {events.length === 0 ? (
          <div className="dash-empty-small">
            <p>No upcoming scheduled events.</p>
          </div>
        ) : (
          events.map((evt) => (
            <div key={evt.id} className={`event-item-card type-${evt.type}`}>
              <div className="evt-date-badge">
                <span className="evt-icon">
                  {evt.type === 'exam' ? '🎓' : evt.type === 'interview' ? '💼' : evt.type === 'deadline' ? '⏰' : '📜'}
                </span>
                <span className="evt-date-str">{evt.date}</span>
              </div>

              <div className="evt-body">
                <div className="evt-header">
                  <h4>{evt.title}</h4>
                  <span className="evt-status-pill">{evt.status}</span>
                </div>
                {evt.description && <p className="evt-desc">{evt.description}</p>}
              </div>

              <button
                className="btn-delete-icon"
                onClick={() => deleteCalendarEvent(evt.id)}
                title="Cancel Event"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CalendarWidget;
