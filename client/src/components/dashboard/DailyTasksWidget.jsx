import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';

const DailyTasksWidget = () => {
  const { dashData, addTask, toggleTask, deleteTask } = useDashboard();
  const [filter, setFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  // New task form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Roadmap');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('Today');

  const tasks = dashData.tasks || [];

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title, category, priority, dueDate });
    setTitle('');
    setShowAddForm(false);
  };

  return (
    <div className="dash-widget-card tasks-widget">
      <div className="widget-card-header flex-between">
        <div>
          <h3>📋 Daily Tasks & Learning Checklist</h3>
          <span className="widget-subtitle">Track and prioritize your everyday milestones</span>
        </div>
        <button
          className="btn-dash-primary-sm"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Close Form ✕' : '+ New Task'}
        </button>
      </div>

      {/* Inline Create Form */}
      {showAddForm && (
        <form onSubmit={handleCreate} className="inline-add-task-form">
          <div className="form-group full-width">
            <input
              type="text"
              className="dash-input"
              placeholder="What do you need to complete today?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="form-row-3">
            <select className="dash-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Roadmap">Roadmap</option>
              <option value="Quiz">Quiz & Practice</option>
              <option value="Project">Project Build</option>
              <option value="Profile">Profile & Resume</option>
              <option value="General">General</option>
            </select>
            <select className="dash-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="High">🔴 High Priority</option>
              <option value="Medium">🟡 Medium Priority</option>
              <option value="Low">🟢 Low Priority</option>
            </select>
            <button type="submit" className="btn-dash-save-sm">Save Task</button>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div className="tasks-filter-bar">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({tasks.length})
        </button>
        <button
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending ({tasks.filter(t => !t.completed).length})
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed ({tasks.filter(t => t.completed).length})
        </button>
      </div>

      {/* Tasks List */}
      <div className="tasks-list-container">
        {filteredTasks.length === 0 ? (
          <div className="dash-empty-small">
            <p>No tasks found for this view.</p>
          </div>
        ) : (
          filteredTasks.map((t) => (
            <div key={t.id} className={`task-item-row ${t.completed ? 'completed' : ''}`}>
              <label className="checkbox-custom-wrapper">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleTask(t.id)}
                />
                <span className="checkbox-checkmark"></span>
              </label>

              <div className="task-info-body">
                <span className={`task-title ${t.completed ? 'line-through' : ''}`}>
                  {t.title}
                </span>
                <div className="task-tags-row">
                  <span className="task-cat-pill">{t.category}</span>
                  <span className={`task-priority-pill ${t.priority.toLowerCase()}`}>
                    {t.priority} Priority
                  </span>
                  {t.dueDate && <span className="task-due-pill">⏰ {t.dueDate}</span>}
                </div>
              </div>

              <button
                className="btn-delete-icon"
                onClick={() => deleteTask(t.id)}
                title="Delete Task"
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

export default DailyTasksWidget;
