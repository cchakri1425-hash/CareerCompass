import React from 'react';
import './Loading.css';

const Loading = ({ text = 'Loading...' }) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner-lg"></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default Loading;
