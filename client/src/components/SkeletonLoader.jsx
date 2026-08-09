import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = ({ type = 'card', count = 3 }) => {
  const items = Array.from({ length: count });

  if (type === 'text') {
    return (
      <div className="skeleton-text-container">
        {items.map((_, i) => (
          <div key={i} className="skeleton-line shimmer"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="skeleton-grid">
      {items.map((_, i) => (
        <div key={i} className="skeleton-card shimmer">
          <div className="skeleton-badge"></div>
          <div className="skeleton-title"></div>
          <div className="skeleton-desc"></div>
          <div className="skeleton-desc short"></div>
          <div className="skeleton-btn"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
