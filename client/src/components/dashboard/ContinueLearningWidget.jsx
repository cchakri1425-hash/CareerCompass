import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CAREERS_DATA } from '../../data/careerDatabase';

const ContinueLearningWidget = () => {
  const navigate = useNavigate();
  const { targetCareer } = useAuth();

  const activeCareer = CAREERS_DATA.find((c) => c.slug === targetCareer) || CAREERS_DATA[0];

  const learningItems = [
    {
      id: 'l1',
      title: `${activeCareer.title} Core Skillset & Fundamentals`,
      type: 'Video Course',
      progress: 60,
      duration: '4h 30m remaining',
      icon: '📹'
    },
    {
      id: 'l2',
      title: 'Practical Project Milestone & GitHub Repository',
      type: 'Guided Hands-on Project',
      progress: 35,
      duration: '2h remaining',
      icon: '💻'
    },
    {
      id: 'l3',
      title: 'Industry Interview & Aptitude Question Bank',
      type: 'Reading Material & Notes',
      progress: 10,
      duration: '1h 15m remaining',
      icon: '📚'
    }
  ];

  return (
    <div className="dash-widget-card continue-learning-widget">
      <div className="widget-card-header flex-between">
        <div>
          <h3>▶️ Continue Learning & Resources</h3>
          <span className="widget-subtitle">Pick up right where you left off</span>
        </div>
        <button className="btn-dash-outline" onClick={() => navigate('/resources')}>
          Browse All Resources ➔
        </button>
      </div>

      <div className="learning-items-list">
        {learningItems.map((item) => (
          <div key={item.id} className="learning-item-card">
            <div className="learning-item-icon">{item.icon}</div>
            
            <div className="learning-item-info">
              <div className="item-title-row">
                <h4>{item.title}</h4>
                <span className="type-badge">{item.type}</span>
              </div>

              <div className="item-progress-row">
                <div className="dash-progress-track flex-1">
                  <div
                    className="dash-progress-fill"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <span className="progress-num">{item.progress}%</span>
              </div>
              <span className="duration-text">⏳ {item.duration}</span>
            </div>

            <button
              className="btn-resume-learning"
              onClick={() => navigate('/resources')}
            >
              Resume ➔
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContinueLearningWidget;
