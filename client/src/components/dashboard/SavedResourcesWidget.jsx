import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { bookmarkService } from '../../services/api';

const SavedResourcesWidget = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user ? user._id || user.id : 'guest_user';

  const [savedResources, setSavedResources] = useState([]);

  useEffect(() => {
    fetchResources();
  }, [userId]);

  const fetchResources = async () => {
    try {
      const res = await bookmarkService.getBookmarks(userId);
      if (res.data.success) {
        const resourceBookmarks = res.data.bookmarks.filter(bm => bm.itemType === 'resource');
        setSavedResources(resourceBookmarks);
      }
    } catch {
      setSavedResources([
        {
          _id: 'r1',
          itemData: {
            title: 'Mastering Modern Full Stack Web Architecture',
            type: 'Course / Video',
            link: 'https://youtube.com',
            category: 'Development'
          }
        },
        {
          _id: 'r2',
          itemData: {
            title: 'Top 50 Data Structures & Algorithms Problem Collection',
            type: 'GitHub Repository',
            link: 'https://github.com',
            category: 'Computer Science'
          }
        }
      ]);
    }
  };

  return (
    <div className="dash-widget-card saved-resources-widget">
      <div className="widget-card-header flex-between">
        <div>
          <h3>📚 Saved Resources & Library</h3>
          <span className="widget-subtitle">Curated courses, videos, books, articles & GitHub repos</span>
        </div>
        <button className="btn-dash-outline" onClick={() => navigate('/resources')}>
          Explore Library ➔
        </button>
      </div>

      <div className="resources-list-grid">
        {savedResources.length === 0 ? (
          <div className="dash-empty-box">
            <p>No saved resources yet.</p>
          </div>
        ) : (
          savedResources.map((bm) => {
            const item = bm.itemData || {};
            return (
              <div key={bm._id} className="resource-saved-card">
                <div className="res-card-type">{item.type || 'Resource'}</div>
                <h4>{item.title}</h4>
                <span className="res-cat-tag">{item.category || 'Tech'}</span>
                
                <div className="res-card-footer">
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noreferrer" className="btn-open-res">
                      Open Resource 🔗
                    </a>
                  ) : (
                    <button className="btn-open-res" onClick={() => navigate('/resources')}>
                      View Details ➔
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SavedResourcesWidget;
