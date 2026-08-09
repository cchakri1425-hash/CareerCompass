import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar-container">
      <div className="navbar-brand" onClick={() => navigate('/')}>
        <div className="navbar-logo-icon">🧭</div>
        <div className="navbar-logo-text">
          <span className="brand-title">Career Compass</span>
          <span className="brand-tagline">Find Your Direction</span>
        </div>
      </div>

      <ul className="navbar-menu">
        <li>
          <Link to="/" className={isActive('/') ? 'active' : ''}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/education" className={isActive('/education') ? 'active' : ''}>
            Choose Stage
          </Link>
        </li>
        <li>
          <Link to="/explorer" className={isActive('/explorer') ? 'active' : ''}>
            Explore Careers
          </Link>
        </li>
        <li>
          <Link to="/compare" className={isActive('/compare') ? 'active' : ''}>
            Compare
          </Link>
        </li>
        <li>
          <Link to="/quiz" className={`quiz-link ${isActive('/quiz') ? 'active' : ''}`}>
            Career Quiz <span className="nav-badge-new">NEW</span>
          </Link>
        </li>
        <li>
          <Link to="/resources" className={isActive('/resources') ? 'active' : ''}>
            Resources
          </Link>
        </li>
      </ul>

      <div className="navbar-actions">
        <button
          className="search-icon-btn"
          onClick={() => navigate('/explorer')}
          title="Search careers"
        >
          🔍
        </button>

        {isAuthenticated ? (
          <div className="navbar-user-section">
            <div className="user-badge" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
              <div className="user-avatar">
                {user?.avatarUrl && user.avatarUrl.length <= 4
                  ? user.avatarUrl
                  : getInitial(user?.fullName)}
              </div>
              <span className="user-name">{user?.fullName || 'User'}</span>
            </div>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        ) : (
          <div className="guest-buttons">
            <button className="btn-nav-login" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="btn-nav-signup" onClick={() => navigate('/signup')}>
              Signup
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
