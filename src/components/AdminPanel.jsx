import React, { useState } from 'react';
import { X, Lock, User, ShieldAlert, Sparkles, LogIn } from 'lucide-react';
import './AdminPanel.css';

const AdminPanel = ({ isOpen, onClose, onLoginSuccess, t }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check credentials: Username: SUDA, Password: SFGA
    if (username === 'SUDA' && password === 'SFGA') {
      setError(false);
      onLoginSuccess();
      setUsername('');
      setPassword('');
      onClose();
    } else {
      setError(true);
      // Automatically clear error shake state after 2 seconds
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  const handleClose = () => {
    setError(false);
    setUsername('');
    setPassword('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay active" onClick={handleClose}>
      <div 
        className="modal-content admin-login-modal glass" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="modal-close" 
          onClick={handleClose} 
          aria-label="Close Admin Login"
        >
          <X size={20} />
        </button>

        <div className="admin-login-header">
          <div className="admin-login-logo-box">
            <Lock size={26} />
          </div>
          <h3 className="admin-login-title">{t.adminTitle}</h3>
          <p className="admin-login-subtitle">{t.popupSubtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && (
            <div className="admin-error-msg">
              <ShieldAlert size={16} />
              <span>{t.adminError}</span>
            </div>
          )}

          <div className="admin-input-group">
            <label className="admin-input-label" htmlFor="admin-username">
              {t.adminUsername}
            </label>
            <div className="admin-input-wrapper">
              <User size={18} className="admin-input-icon" />
              <input
                id="admin-username"
                type="text"
                className="admin-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="SUDA"
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="admin-input-group">
            <label className="admin-input-label" htmlFor="admin-password">
              {t.adminPassword}
            </label>
            <div className="admin-input-wrapper">
              <Lock size={18} className="admin-input-icon" />
              <input
                id="admin-password"
                type="password"
                className="admin-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <div className="admin-login-actions">
            <button type="submit" className="btn-admin-submit">
              <LogIn size={18} />
              <span>{t.adminLoginSubmit}</span>
            </button>
            <button type="button" className="btn-admin-cancel" onClick={handleClose}>
              {t.adminCancel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
