import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import {
  HomeIcon,
  PracticeIcon,
  FlashcardIcon,
  MockTestIcon,
  SettingsIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
  FireIcon
} from './Icons';
import { useAuth } from '../services/supabase/authStore';
import { useUserStore } from '../services/user/userStore';
import './Layout.css';

export const Layout: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('vstep_theme') as 'light' | 'dark') || 'light';
  });
  const { signOut } = useAuth();
  const { userDisplayName, avatarInitial, avatarUrl, targetBand, streakDays, streakBadgeText, resetProfile } = useUserStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vstep_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleSignOut = async () => {
    try {
      resetProfile();
      // Clean up flashcard local keys
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('vstep_flashcard_deck_v2');
        localStorage.removeItem('vstep_reviewed_today_count_v2');
        localStorage.removeItem('vstep_last_review_date_v2');
      }
      await signOut();
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const navItems = [
    { to: '/', label: 'Trang chủ', icon: <HomeIcon size={20} /> },
    { to: '/practice', label: 'Luyện kỹ năng', icon: <PracticeIcon size={20} /> },
    { to: '/flashcard', label: 'Từ vựng SRS', icon: <FlashcardIcon size={20} /> },
    { to: '/mock-test', label: 'Thi thử', icon: <MockTestIcon size={20} /> },
    { to: '/settings', label: 'Cài đặt', icon: <SettingsIcon size={20} /> },
    { to: '/profile', label: 'Hồ sơ', icon: <UserIcon size={20} /> },
  ];

  const mobileNavItems = navItems.filter(item => item.to !== '/profile');

  // Title for mobile header
  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/': return 'VSTEP Master';
      case '/practice': return 'Luyện 4 Kỹ Năng';
      case '/flashcard': return 'Từ Vựng SRS';
      case '/mock-test': return 'Phòng Thi Thử';
      case '/settings': return 'Cài Đặt Hệ Thống';
      case '/profile': return 'Hồ Sơ Học Tập';
      default: return 'VSTEP Master';
    }
  };

  return (
    <div className="app-shell">
      {/* Desktop Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="6" fill="#D4A373" />
              <path d="M6 8L12 17L18 8" stroke="#141210" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-title">VSTEP Master</span>
            <span className="brand-badge">B1-B2 Prep</span>
          </div>
        </div>

        {/* User Target Card in Sidebar */}
        <div className="user-target-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: '4px' }}>
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={userDisplayName}
                style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'var(--primary-subtle)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--fs-xs)',
                  fontWeight: 700,
                }}
              >
                {avatarInitial}
              </div>
            )}
            <span className="user-name" style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {userDisplayName}
            </span>
          </div>

          <div className="user-info-row" style={{ marginTop: 4 }}>
            <div className="target-pill" style={{ margin: 0 }}>
              Bậc <strong>{targetBand === 'B1' ? '3 (B1)' : targetBand === 'B2' ? '4 (B2)' : '5 (C1)'}</strong>
            </div>
            <span className={`badge ${streakDays > 0 ? 'badge-emerald' : 'badge-primary'}`}>
              <FireIcon size={12} color={streakDays > 0 ? '#059669' : 'var(--text-muted)'} /> {streakBadgeText}
            </span>
          </div>

          <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>● Đồng bộ Cloud</span>
            <button
              onClick={handleSignOut}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Đăng xuất
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={theme === 'light' ? 'Chuyển sang Chế độ Tối' : 'Chuyển sang Chế độ Sáng'}
          >
            {theme === 'light' ? <MoonIcon size={18} /> : <SunIcon size={18} />}
            <span>{theme === 'light' ? 'Giao diện Tối' : 'Giao diện Sáng'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-wrapper">
        {/* Mobile Top Header */}
        <header className="mobile-header">
          <div className="mobile-header-brand">
            <div className="brand-logo-small">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="5" fill="#D4A373" />
                <path d="M6 8L12 17L18 8" stroke="#141210" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="mobile-page-title">{getPageTitle(location.pathname)}</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <NavLink to="/profile" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={userDisplayName}
                  style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }}
                />
              ) : (
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'var(--primary-subtle)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--fs-xs)',
                    fontWeight: 700,
                  }}
                >
                  {avatarInitial}
                </div>
              )}
            </NavLink>
            <button onClick={toggleTheme} className="mobile-theme-btn" aria-label="Đổi giao diện">
              {theme === 'light' ? <MoonIcon size={18} /> : <SunIcon size={18} />}
            </button>
          </div>
        </header>

        {/* Page Content Container */}
        <main className="content-container">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="mobile-bottom-nav">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="mobile-nav-icon">{item.icon}</span>
            <span className="mobile-nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
