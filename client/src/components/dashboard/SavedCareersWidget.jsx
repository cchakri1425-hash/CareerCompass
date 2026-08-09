import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { bookmarkService } from '../../services/api';
import { CAREERS_DATA } from '../../data/careerDatabase';

const SavedCareersWidget = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user ? user._id || user.id : 'guest_user';

  const [savedCareers, setSavedCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedCareers();
  }, [userId]);

  const fetchSavedCareers = async () => {
    try {
      const res = await bookmarkService.getBookmarks(userId);
      if (res.data.success) {
        const careerBookmarks = res.data.bookmarks.filter(bm => bm.itemType === 'career');
        setSavedCareers(careerBookmarks);
      }
    } catch {
      // Fallback display from CAREERS_DATA sample
      setSavedCareers([
        { _id: 'bm1', itemType: 'career', itemData: CAREERS_DATA[0] },
        { _id: 'bm2', itemType: 'career', itemData: CAREERS_DATA[1] }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dash-widget-card saved-careers-widget">
      <div className="widget-card-header flex-between">
        <div>
          <h3>🔖 Saved Careers & Comparison</h3>
          <span className="widget-subtitle">Bookmarked careers ready for analysis & roadmap tracking</span>
        </div>
        <button className="btn-dash-outline" onClick={() => navigate('/compare')}>
          Compare Saved Careers ⚖️
        </button>
      </div>

      {loading ? (
        <div className="dash-loading-spinner">Loading saved careers...</div>
      ) : savedCareers.length === 0 ? (
        <div className="dash-empty-box">
          <p>You haven't bookmarked any careers yet.</p>
          <button className="btn-dash-primary-sm" onClick={() => navigate('/explorer')}>
            Browse Careers ➔
          </button>
        </div>
      ) : (
        <div className="saved-careers-grid">
          {savedCareers.map((bm) => {
            const career = bm.itemData || CAREERS_DATA[0];
            return (
              <div key={bm._id || career.slug} className="saved-career-card">
                <div className="saved-card-header">
                  <span className="career-icon">{career.icon || '🚀'}</span>
                  <span className="demand-tag">{career.demand || 'High Demand'}</span>
                </div>

                <h4>{career.title}</h4>
                <span className="category-pill">{career.category}</span>

                <div className="salary-row">
                  <span>Salary Range</span>
                  <strong>{career.salaryRange?.india || career.salary || '₹6L - ₹24L/yr'}</strong>
                </div>

                <div className="saved-card-actions">
                  <button
                    className="btn-dash-primary-sm full-width"
                    onClick={() => navigate(`/explorer/${career.slug}`)}
                  >
                    View Details ➔
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SavedCareersWidget;
