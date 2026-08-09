import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { resourceService, bookmarkService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Resources.css';

const Resources = () => {
  const { user } = useAuth();
  const userId = user ? user._id || user.id : 'guest_user';

  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [resources, setResources] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const tabs = ['All', 'Books', 'Courses', 'YouTube', 'Websites', 'Tools'];

  useEffect(() => {
    fetchResourcesAndBookmarks();
  }, [activeTab, searchTerm]);

  const DEFAULT_RESOURCES = [
    {
      _id: 'res_1',
      title: 'FreeCodeCamp Full Stack Developer Certification',
      type: 'Courses',
      authorOrPlatform: 'freeCodeCamp.org',
      description: 'Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB with interactive hands-on coding challenges.',
      rating: 4.9,
      isFree: true,
      tags: ['WebDev', 'React', 'NodeJS'],
      link: 'https://freecodecamp.org',
    },
    {
      _id: 'res_2',
      title: 'CS50: Introduction to Computer Science',
      type: 'YouTube',
      authorOrPlatform: 'Harvard University',
      description: 'Harvard University\'s entry-level course on algorithms, C, Python, SQL, HTML/CSS, and Web Dev.',
      rating: 5.0,
      isFree: true,
      tags: ['ComputerScience', 'Algorithms', 'Python'],
      link: 'https://youtube.com',
    },
    {
      _id: 'res_3',
      title: 'Clean Code: Handbook of Agile Software Craftsmanship',
      type: 'Books',
      authorOrPlatform: 'Robert C. Martin (Uncle Bob)',
      description: 'The definitive guide for writing clean, maintainable, readable software code.',
      rating: 4.8,
      isFree: false,
      tags: ['Architecture', 'BestPractices'],
      link: 'https://amazon.com',
    },
    {
      _id: 'res_4',
      title: 'MDN Web Docs (Mozilla Developer Network)',
      type: 'Websites',
      authorOrPlatform: 'Mozilla Foundation',
      description: 'Official documentation and standards for HTML5, CSS3, JavaScript, and Web APIs.',
      rating: 4.9,
      isFree: true,
      tags: ['WebStandards', 'Documentation'],
      link: 'https://developer.mozilla.org',
    },
    {
      _id: 'res_5',
      title: 'LeetCode Problem Solving Platform',
      type: 'Tools',
      authorOrPlatform: 'LeetCode Inc.',
      description: 'Platform for practicing Data Structures & Algorithms coding interview questions.',
      rating: 4.8,
      isFree: true,
      tags: ['InterviewPrep', 'DSA', 'Coding'],
      link: 'https://leetcode.com',
    },
  ];

  const fetchResourcesAndBookmarks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await resourceService.getResources({
        type: activeTab,
        search: searchTerm,
      });

      if (res.data.success && res.data.resources.length > 0) {
        setResources(res.data.resources);
      } else {
        setResources(filterLocalResources(DEFAULT_RESOURCES));
      }

      const bmRes = await bookmarkService.getBookmarks(userId);
      if (bmRes.data.success) {
        const savedIds = bmRes.data.bookmarks
          .filter((b) => b.itemType === 'resource')
          .map((b) => b.itemId);
        setBookmarkedIds(savedIds);
      }
    } catch (err) {
      setResources(filterLocalResources(DEFAULT_RESOURCES));
    } finally {
      setLoading(false);
    }
  };

  const filterLocalResources = (list) => {
    return list.filter((r) => {
      const matchType = activeTab === 'All' || r.type.toLowerCase() === activeTab.toLowerCase();
      const matchSearch = !searchTerm || r.title.toLowerCase().includes(searchTerm.toLowerCase()) || r.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchType && matchSearch;
    });
  };

  const handleToggleBookmark = async (resource) => {
    const resId = resource._id || resource.id;
    try {
      const res = await bookmarkService.toggleBookmark({
        userId,
        itemType: 'resource',
        itemId: resId,
        itemData: resource,
      });

      if (res.data.success) {
        if (res.data.bookmarked) {
          setBookmarkedIds([...bookmarkedIds, resId]);
        } else {
          setBookmarkedIds(bookmarkedIds.filter((id) => id !== resId));
        }
      }
    } catch (err) {
      console.error('Error toggling bookmark:', err);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Books':
        return '📚';
      case 'Courses':
        return '🎓';
      case 'YouTube':
        return '▶️';
      case 'Websites':
        return '🌐';
      case 'Tools':
        return '🛠️';
      default:
        return '📖';
    }
  };

  return (
    <MainLayout>
      <div className="res-container">
        {/* HEADER */}
        <header className="res-header">
          <h1>
            Learning <span className="highlight">Resources</span>
          </h1>
          <p>
            Curated books, courses, YouTube channels, developer tools, and official documentation to accelerate your skill development.
          </p>
        </header>

        {/* SEARCH & TYPE FILTER TABS */}
        <div className="res-controls">
          <div className="search-bar-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search resources, books, tools, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="res-tabs">
            {tabs.map((t) => (
              <button
                key={t}
                className={`res-tab-btn ${activeTab === t ? 'active' : ''}`}
                onClick={() => setActiveTab(t)}
              >
                {getTypeIcon(t)} {t}
              </button>
            ))}
          </div>
        </div>

        {/* RESOURCE CARDS GRID */}
        {loading ? (
          <div className="res-loading">
            <div className="loading-spinner"></div>
            <p>Loading curated learning resources from MongoDB...</p>
          </div>
        ) : error ? (
          <div className="res-error">⚠️ {error}</div>
        ) : resources.length === 0 ? (
          <div className="res-empty">
            <h3>No resources found matching your search.</h3>
            <p>Try searching for other terms like "Clean Code", "React", "LeetCode", or "Figma".</p>
          </div>
        ) : (
          <div className="res-cards-grid">
            {resources.map((item) => {
              const resId = item._id || item.id;
              const isBookmarked = bookmarkedIds.includes(resId);

              return (
                <div key={resId} className="res-card">
                  <div className="res-card-top">
                    <span className="res-type-badge">
                      {getTypeIcon(item.type)} {item.type}
                    </span>
                    <button
                      className={`btn-bookmark-icon ${isBookmarked ? 'saved' : ''}`}
                      onClick={() => handleToggleBookmark(item)}
                      title={isBookmarked ? 'Remove Bookmark' : 'Save Bookmark'}
                    >
                      {isBookmarked ? '🔖' : '🏷️'}
                    </button>
                  </div>

                  <h3 className="res-card-title">{item.title}</h3>
                  <div className="res-card-author">By {item.authorOrPlatform}</div>

                  <p className="res-card-desc">{item.description}</p>

                  <div className="res-card-meta">
                    <span className="rating-badge">⭐ {item.rating || 4.8}</span>
                    <span className={`price-badge ${item.isFree ? 'free' : 'paid'}`}>
                      {item.isFree ? 'FREE' : 'PAID'}
                    </span>
                  </div>

                  {item.tags && item.tags.length > 0 && (
                    <div className="res-tags">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="res-tag">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="res-card-action">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-visit-resource"
                    >
                      Visit Resource 🔗
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Resources;
