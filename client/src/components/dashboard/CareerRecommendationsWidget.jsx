import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CAREERS_DATA } from '../../data/careerDatabase';

const CareerRecommendationsWidget = () => {
  const navigate = useNavigate();
  const { targetCareer, selectedInterest } = useAuth();

  // Filter recommendations based on domain interest or exclude current active target career
  const recommendations = CAREERS_DATA.filter((c) => c.slug !== targetCareer).slice(0, 3);

  return (
    <div className="dash-widget-card recommendations-widget">
      <div className="widget-card-header flex-between">
        <div>
          <h3>💡 Recommended Career Paths For You</h3>
          <span className="widget-subtitle">Based on your {selectedInterest} domain & aptitude matches</span>
        </div>
        <button className="btn-dash-outline" onClick={() => navigate('/explorer')}>
          Explore All ➔
        </button>
      </div>

      <div className="recommendations-grid">
        {recommendations.map((c) => (
          <div key={c.slug} className="recommendation-mini-card">
            <div className="rec-card-top">
              <span className="rec-icon">{c.icon || '🚀'}</span>
              <span className="rec-match-pill">95% Match</span>
            </div>
            
            <h4>{c.title}</h4>
            <span className="rec-category-tag">{c.category}</span>
            <p className="rec-desc">{c.overview ? c.overview.substring(0, 75) + '...' : 'High demand career path with strong salary benchmarks.'}</p>
            
            <div className="rec-footer-meta">
              <div>
                <span className="lbl">Avg Salary</span>
                <strong>{c.salaryRange?.india || c.salary}</strong>
              </div>
              <button
                className="btn-rec-action"
                onClick={() => navigate(`/explorer/${c.slug}`)}
              >
                View Path ➔
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerRecommendationsWidget;
