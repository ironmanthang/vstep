import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
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
import { AuthModal } from './auth/AuthModal';
import './Layout.css';

export const Layout: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('vstep_theme') as 'light' | 'dark') || 'light';
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vstep_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
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

  const userDisplayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Lan';

  return (
    <div className="app-shell">
      {/* Authentication Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

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
          <div className="user-info-row">
            <span className="user-name">{userDisplayName}</span>
            <span className="badge badge-emerald">
              <FireIcon size={12} color="#059669" /> 5 ngày
            </span>
          </div>
          <div className="target-pill">Mục tiêu: <strong>Bậc 3 (B1)</strong></div>
          {isAuthenticated ? (
            <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>● Đã đồng bộ Cloud</span>
              <button
                onClick={() => signOut()}
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
          ) : (
            <button
              onClick={() => setIsAuthOpen(true)}
              style={{
                marginTop: '8px',
                width: '100%',
                padding: '6px 8px',
                fontSize: '0.75rem',
                fontWeight: 700,
                borderRadius: '6px',
                border: '1px solid var(--primary)',
                background: 'var(--primary-subtle, rgba(212,163,115,0.15))',
                color: 'var(--primary)',
                cursor: 'pointer'
              }}
            >
              ☁️ Đăng nhập để đồng bộ SRS
            </button>
          )}
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
            {!isAuthenticated && (
              <button
                onClick={() => setIsAuthOpen(true)}
                style={{
                  padding: '4px 8px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: '6px',
                  background: 'var(--primary)',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Đăng nhập
              </button>
            )}
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
