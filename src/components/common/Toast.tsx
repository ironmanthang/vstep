import React from 'react';
import type { NotificationMessage } from '../../hooks/useNotification';
import './Toast.css';

interface ToastProps {
  message: NotificationMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className={`toast-container toast-${message.type}`} role="alert">
      <div className="toast-content">
        <span className="toast-icon">
          {message.type === 'success' && '✓'}
          {message.type === 'error' && '✕'}
          {message.type === 'info' && 'ℹ'}
        </span>
        <span className="toast-text">{message.text}</span>
      </div>
      <button className="toast-close-btn" onClick={onClose} aria-label="Đóng thông báo">
        ✕
      </button>
    </div>
  );
};
