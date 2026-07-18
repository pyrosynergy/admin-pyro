import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Admin.css';
import { apiFetch } from './api.js';
import Header from '../Header/Header.jsx';
import AdminLogin from './AdminLogin.jsx';
import EmployeesTab from './EmployeesTab.jsx';
import AddEmployeeTab from './AddEmployeeTab.jsx';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [activeTab, setActiveTab] = useState('employees');
  // Local state for the site header (shown only once logged in).
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;
    apiFetch('/api/auth/me')
      .then((data) => {
        if (!cancelled) setUser(data.user);
      })
      .catch(() => {
        // Not logged in — the login form will show.
      })
      .finally(() => {
        if (!cancelled) setCheckingSession(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Stable reference: App re-renders on a timer, and a fresh inline arrow
  // here would cascade into EmployeesTab's effect deps and refetch the list
  // on every render.
  const handleSessionExpired = useCallback(() => setUser(null), []);

  const handleLogout = async () => {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Even if the request fails, drop the local session state.
    }
    setUser(null);
  };

  if (checkingSession) {
    return (
      <div className="admin-page">
        <p className="admin-muted">Checking session…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="admin-page">
        <AdminLogin onLogin={setUser} />
      </div>
    );
  }

  return (
    <>
      <div className="admin-header-bar">
        <Header
          isScrolled={false}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          navRef={navRef}
          handleLinkClick={() => setIsMenuOpen(false)}
          currentPage={location.pathname}
          handleNavigateToHome={() => navigate('/')}
        />
      </div>
      <div className="admin-page">
      <div className="admin-shell">
        <header className="admin-header">
          <div>
            <h1 className="admin-title">Employee Admin</h1>
            <p className="admin-muted">
              Signed in as <strong>{user.username}</strong> ({user.role})
            </p>
          </div>
          <button className="admin-btn admin-btn-ghost" onClick={handleLogout}>
            Log out
          </button>
        </header>

        <nav className="admin-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'employees'}
            className={`admin-tab ${activeTab === 'employees' ? 'active' : ''}`}
            onClick={() => setActiveTab('employees')}
          >
            Employees
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'add'}
            className={`admin-tab ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            Add employee
          </button>
        </nav>

        {activeTab === 'employees' ? (
          <EmployeesTab onSessionExpired={handleSessionExpired} />
        ) : (
          <AddEmployeeTab onSessionExpired={handleSessionExpired} />
        )}
      </div>
      </div>
    </>
  );
};

export default Admin;
