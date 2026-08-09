import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className={`toast-banner ${type}`}>
      <span className="toast-icon">{getIcon()}</span>
      <span className="toast-msg">{message}</span>
      <button className="toast-close" onClick={onClose}>
        ✕
      </button>
    </div>
  );
};

export default Toast;
