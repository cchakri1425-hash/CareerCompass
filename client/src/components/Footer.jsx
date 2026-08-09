import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="cc-footer">
      <div className="cc-footer-container">
        <div className="cc-footer-col brand-col">
          <div className="cc-footer-logo">
            <span className="logo-icon">🧭</span>
            <div>
              <h3>Career Compass</h3>
              <p>Find Your Direction</p>
            </div>
          </div>
          <p className="cc-footer-desc">
            Empowering students, graduates, and professionals with clear career guidance, step-by-step learning roadmaps, and industry insights.
          </p>
        </div>

        <div className="cc-footer-col">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/explorer">Career Explorer</Link></li>
            <li><Link to="/education">Roadmaps</Link></li>
            <li><Link to="/education">Career Quiz</Link></li>
          </ul>
        </div>

        <div className="cc-footer-col">
          <h4>Popular Fields</h4>
          <ul>
            <li><Link to="/explorer?category=Technology">Technology & AI</Link></li>
            <li><Link to="/explorer?category=Medicine">Medicine & Healthcare</Link></li>
            <li><Link to="/explorer?category=Design">UI/UX & Design</Link></li>
            <li><Link to="/explorer?category=Commerce%20%26%20Finance">Commerce & CA</Link></li>
          </ul>
        </div>

        <div className="cc-footer-col">
          <h4>Account</h4>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/forgot-password">Forgot Password</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </div>
      </div>

      <div className="cc-footer-bottom">
        <p>&copy; {new Date().getFullYear()} Career Compass. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
