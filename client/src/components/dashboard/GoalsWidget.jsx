import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';

const GoalsWidget = () => {
  const { dashData, addGoal, updateGoalProgress, deleteGoal } = useDashboard();
  const [showAddForm, setShowAddForm] = useState(false);

  const [title, setTitle] = useState('');
  const [type, setType] = useState('short-term');
  const [category, setCategory] = useState('Career');
  const [targetDate, setTargetDate] = useState('');
  const [progress, setProgress] = useState(25);

  const goals = dashData.goals || [];

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addGoal({ title, type, category, targetDate: targetDate || 'Next Month', progress });
    setTitle('');
    setShowAddForm(false);
  };

  return (
    <div className="dash-widget-card goals-widget">
      <div className="widget-card-header flex-between">
        <div>
          <h3>🎯 Short-Term & Long-Term Goals</h3>
          <span className="widget-subtitle">Set targets, track progress bars, and hit your milestones</span>
        </div>
        <button
          className="btn-dash-primary-sm"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Close Form ✕' : '+ New Goal'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleCreate} className="inline-add-form">
          <div className="form-group full-width">
            <input
              type="text"
              className="dash-input"
              placeholder="e.g. Master React & Node.js by Next Quarter"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-row-3">
            <select className="dash-select" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="short-term">⏱️ Short-Term Goal</option>
              <option value="long-term">🏆 Long-Term Goal</option>
            </select>
            <input
              type="text"
              className="dash-input"
              placeholder="Target Date (e.g. In 3 Months)"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
            <button type="submit" className="btn-dash-save-sm">Save Goal</button>
          </div>
        </form>
      )}

      <div className="goals-grid">
        {goals.map((g) => (
          <div key={g.id} className={`goal-card ${g.completed ? 'completed-border' : ''}`}>
            <div className="goal-card-header">
              <span className={`goal-type-badge ${g.type}`}>{g.type === 'short-term' ? '⚡ Short-Term' : '🏆 Long-Term'}</span>
              <button className="btn-delete-icon" onClick={() => deleteGoal(g.id)} title="Delete Goal">✕</button>
            </div>

            <h4>{g.title}</h4>
            
            <div className="goal-meta-row">
              <span>📅 Target: <strong>{g.targetDate}</strong></span>
              <span>Category: <strong>{g.category}</strong></span>
            </div>

            <div className="goal-progress-section">
              <div className="progress-info-row">
                <span className="lbl">Progress</span>
                <span className="val">{g.progress}%</span>
              </div>
              <div className="dash-progress-track">
                <div className="dash-progress-fill" style={{ width: `${g.progress}%` }}></div>
              </div>

              <div className="slider-row">
                <span className="slider-label">Update Progress:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={g.progress}
                  onChange={(e) => updateGoalProgress(g.id, Number(e.target.value))}
                  className="dash-range-slider"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsWidget;
