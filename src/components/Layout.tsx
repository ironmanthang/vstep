import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import {
  HomeIcon,
  PracticeIcon,
  FlashcardIcon,
  MockTestIcon,
  SunIcon,
  MoonIcon,
  LogoutIcon
} from './Icons';
import { useAuth } from '../services/supabase/authStore';
import { useUserStore } from '../services/user/userStore';
import './Layout.css';

export const Layout: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('vstep_theme') as 'light' | 'dark') || 'light';
  });
  const { signOut } = useAuth();
  const { userDisplayName, avatarInitial, avatarUrl, resetProfile } = useUserStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vstep_theme', theme);
    const themeColor = theme === 'dark' ? '#141210' : '#FAF8F5';
    const metaThemeColor = document.getElementById('meta-theme-color');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeColor);
    }
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
      meta.setAttribute('content', themeColor);
    });
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleSignOut = async () => {
    try {
      resetProfile();
      await signOut();
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const navItems = [
    { to: '/', label: 'Trang chủ', icon: <HomeIcon size={20} /> },
    { to: '/flashcard', label: 'Từ vựng SRS', icon: <FlashcardIcon size={20} /> },
    { to: '/practice', label: 'Luyện kỹ năng', icon: <PracticeIcon size={20} /> },
    { to: '/mock-test', label: 'Thi thử', icon: <MockTestIcon size={20} /> },
  ];

  const mobileNavItems = navItems;

  // Title for mobile header
  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/': return 'VSTEP Master';
      case '/flashcard': return 'Từ Vựng SRS';
      case '/practice': return 'Luyện 4 Kỹ Năng';
      case '/mock-test': return 'Phòng Thi Thử';
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
          </div>
        </div>

        {/* User Target Card in Sidebar */}
        <div className="user-target-card">
          <NavLink
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              textDecoration: 'none',
              color: 'inherit',
            }}
            title="Trang chủ & Tài khoản"
          >
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
          </NavLink>

          <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
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
            <NavLink to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} title="Trang chủ & Tài khoản">
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
            <button onClick={handleSignOut} className="mobile-logout-btn" aria-label="Đăng xuất" title="Đăng xuất">
              <LogoutIcon size={18} />
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
