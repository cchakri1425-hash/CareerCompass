import React from 'react';
import './AuthLayout.css';

/**
 * Reusable Auth Layout Component with centered white card & light purple gradient
 */
const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="auth-layout-container">
      {/* Background Decorative Gradient Blobs */}
      <div className="auth-bg-blob-1"></div>
      <div className="auth-bg-blob-2"></div>

      <div className="auth-card">
        {/* Header with Career Compass Logo */}
        <div className="auth-header">
          <div className="auth-logo">
            <div className="auth-logo-icon">🧭</div>
            <span>Career Compass</span>
          </div>
          {title && <h1 className="auth-title">{title}</h1>}
          {subtitle && <p className="auth-subtitle">{subtitle}</p>}
        </div>

        {/* Dynamic Page Content */}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
