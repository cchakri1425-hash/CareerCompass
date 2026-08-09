import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';
import { CAREERS_DATA } from '../../data/careerDatabase';

const RoadmapWidget = () => {
  const navigate = useNavigate();
  const { targetCareer, selectedEducation } = useAuth();
  const { dashData, addTask } = useDashboard();

  const activeCareer = CAREERS_DATA.find((c) => c.slug === targetCareer) || CAREERS_DATA[0];
  const roadmapSteps = activeCareer.roadmap || [
    { step: 1, title: 'Fundamentals & Core Concepts', desc: 'Master foundational knowledge and language basics.', status: 'completed' },
    { step: 2, title: 'Intermediate Tools & Frameworks', desc: 'Build real-world projects and practical skillsets.', status: 'in-progress' },
    { step: 3, title: 'Advanced Specialization & Portfolio', desc: 'Prepare for interviews, internships, and entry-level positions.', status: 'pending' }
  ];

  const handleAddStepToTasks = (stepTitle) => {
    addTask({
      title: `Complete Roadmap Milestone: ${stepTitle}`,
      category: 'Roadmap',
      priority: 'High',
      dueDate: 'This Week'
    });
  };

  return (
    <div className="dash-widget-card roadmap-widget-card">
      <div className="widget-card-header flex-between">
        <div>
          <h3>🗺️ Interactive Roadmap: {activeCareer.title}</h3>
          <span className="widget-subtitle">Tailored for {selectedEducation} stage</span>
        </div>
        <button
          className="btn-dash-outline"
          onClick={() => navigate(`/roadmap/${activeCareer.slug}`)}
        >
          Full Interactive Roadmap ➔
        </button>
      </div>

      <div className="dashboard-roadmap-timeline">
        {roadmapSteps.map((st, idx) => (
          <div key={idx} className={`roadmap-step-item ${st.status || (idx === 0 ? 'completed' : idx === 1 ? 'in-progress' : 'pending')}`}>
            <div className="step-num-badge">
              {idx === 0 ? '✓' : st.step || idx + 1}
            </div>
            
            <div className="step-content-body">
              <div className="step-header-row">
                <h4>{st.title}</h4>
                <span className={`step-status-tag ${st.status || (idx === 0 ? 'completed' : idx === 1 ? 'in-progress' : 'pending')}`}>
                  {idx === 0 ? 'Completed' : idx === 1 ? 'In Progress' : 'Upcoming'}
                </span>
              </div>
              <p>{st.desc || st.description || 'Master key concepts, practical exercises, and project milestones for this stage.'}</p>
              
              <div className="step-actions">
                <button
                  className="btn-step-action"
                  onClick={() => handleAddStepToTasks(st.title)}
                >
                  + Add to Daily Tasks
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapWidget;
