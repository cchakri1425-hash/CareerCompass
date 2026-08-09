import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';

const InternshipTrackerWidget = () => {
  const { dashData, addInternship, updateInternshipStatus, deleteInternship } = useDashboard();
  const [showAddForm, setShowAddForm] = useState(false);

  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Applied');
  const [salary, setSalary] = useState('');
  const [deadline, setDeadline] = useState('');

  const internships = dashData.internships || [];

  const handleCreate = (e) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;
    addInternship({ company, role, status, salary, deadline });
    setCompany('');
    setRole('');
    setSalary('');
    setShowAddForm(false);
  };

  const statusColors = {
    'Applied': 'blue',
    'Interviewing': 'amber',
    'Offer Received': 'green',
    'Rejected': 'red',
    'Completed': 'purple'
  };

  return (
    <div className="dash-widget-card internship-widget">
      <div className="widget-card-header flex-between">
        <div>
          <h3>💼 Internship Application Pipeline Tracker</h3>
          <span className="widget-subtitle">Track job applications, interviews, offers & stipends</span>
        </div>
        <button className="btn-dash-primary-sm" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Close Form ✕' : '+ Track Application'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleCreate} className="inline-add-form">
          <div className="form-row-2">
            <input
              type="text"
              className="dash-input"
              placeholder="Company Name (e.g. Google / Microsoft)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
            <input
              type="text"
              className="dash-input"
              placeholder="Role Title (e.g. Software Engineer Intern)"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
          <div className="form-row-3">
            <select className="dash-select" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer Received">Offer Received 🎉</option>
              <option value="Rejected">Rejected</option>
              <option value="Completed">Completed</option>
            </select>
            <input
              type="text"
              className="dash-input"
              placeholder="Stipend / Salary (e.g. ₹25,000/mo)"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
            <button type="submit" className="btn-dash-save-sm">Save Application</button>
          </div>
        </form>
      )}

      <div className="internships-pipeline-list">
        {internships.length === 0 ? (
          <div className="dash-empty-small">
            <p>No active internship applications recorded.</p>
          </div>
        ) : (
          internships.map((item) => (
            <div key={item.id} className="internship-item-row">
              <div className="int-company-avatar">
                🏢
              </div>

              <div className="int-main-info">
                <h4>{item.role}</h4>
                <p className="int-company-name"><strong>{item.company}</strong> {item.salary ? `• ${item.salary}` : ''}</p>
                <span className="int-date-applied">Applied: {item.appliedDate || 'Recently'}</span>
              </div>

              <div className="int-status-col">
                <select
                  className={`status-picker-pill ${statusColors[item.status] || 'blue'}`}
                  value={item.status}
                  onChange={(e) => updateInternshipStatus(item.id, e.target.value)}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Offer Received">Offer Received 🎉</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <button className="btn-delete-icon" onClick={() => deleteInternship(item.id)} title="Delete Application">
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InternshipTrackerWidget;
