import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-code">404</div>
      <h1 className="notfound-title">Page Not Found</h1>
      <p className="notfound-desc">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn-primary" style={{ display: 'inline-flex', width: 'auto', padding: '12px 28px' }}>
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
