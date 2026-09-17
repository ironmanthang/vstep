import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import {
  HomeIcon,
  PracticeIcon,
  FlashcardIcon,
  MockTestIcon,
  SunIcon,
  MoonIcon,
  LogoutIcon,
  ChevronLeftIcon,
  MenuIcon,
} from './Icons';
import { SidebarProvider } from '../contexts/SidebarProvider';
import { useSidebar } from '../contexts/SidebarContext';
import { useAuth } from '../services/supabase/authStore';
import { useUserStore } from '../services/user/userStore';
import './Layout.css';

const LayoutContent: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('vstep_theme') as 'light' | 'dark') || 'light';
  });
  const { signOut } = useAuth();
  const { userDisplayName, avatarInitial, avatarUrl, resetProfile } = useUserStore();
  const location = useLocation();
  const navigate = useNavigate();

  const { isCollapsed, isHoverPeek, toggleSidebar, setHoverPeek } = useSidebar();
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('vstep_theme', theme);

    const themeColor = theme === 'dark' ? '#141210' : '#F0ECE3';
    const statusBarStyle = theme === 'dark' ? 'black-translucent' : 'default';

    const existingThemeMetas = document.querySelectorAll('meta[name="theme-color"]');
    if (existingThemeMetas.length > 0) {
      existingThemeMetas.forEach(meta => meta.setAttribute('content', themeColor));
    } else {
      const meta = document.createElement('meta');
      meta.id = 'meta-theme-color';
      meta.name = 'theme-color';
      meta.content = themeColor;
      document.head.appendChild(meta);
    }

    const statusBarMeta = document.getElementById('meta-status-bar-style') || document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (statusBarMeta) {
      statusBarMeta.setAttribute('content', statusBarStyle);
    }

    const colorSchemeMeta = document.getElementById('meta-color-scheme') || document.querySelector('meta[name="color-scheme"]');
    if (colorSchemeMeta) {
      colorSchemeMeta.setAttribute('content', theme === 'dark' ? 'dark' : 'light');
    }
  }, [theme]);

  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // Dismiss hover peek overlay when route changes
  useEffect(() => {
    setHoverPeek(false);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, [location.pathname, setHoverPeek]);

  // Sync state if permanently expanded
  useEffect(() => {
    if (!isCollapsed) {
      setHoverPeek(false);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    }
  }, [isCollapsed, setHoverPeek]);

  const handleMouseEnterTrigger = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setHoverPeek(true);
  };

  const handleMouseLeaveTrigger = () => {
    if (!hideTimeoutRef.current && isHoverPeek) {
      hideTimeoutRef.current = setTimeout(() => {
        setHoverPeek(false);
        hideTimeoutRef.current = null;
      }, 100);
    }
  };

  const handleMouseEnterSidebar = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const handleMouseLeaveSidebar = () => {
    if (!hideTimeoutRef.current && isHoverPeek) {
      hideTimeoutRef.current = setTimeout(() => {
        setHoverPeek(false);
        hideTimeoutRef.current = null;
      }, 100);
    }
  };

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
    <div className={`app-shell ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Spacer div to reserve space in flex layout when sidebar is permanently expanded */}
      <div className="sidebar-spacer" aria-hidden="true" />

      {/* Floating Toggle Button (Appears on desktop when collapsed) */}
      {isCollapsed && (
        <button
          type="button"
          onClick={toggleSidebar}
          className="sidebar-floating-toggle"
          title="Mở rộng thanh điều hướng (Ctrl+B)"
          aria-label="Mở rộng thanh điều hướng"
        >
          <MenuIcon size={20} />
        </button>
      )}

      {/* Invisible Hover-Peek Edge Trigger (Appears when collapsed) */}
      {isCollapsed && (
        <div
          onMouseEnter={handleMouseEnterTrigger}
          onMouseLeave={handleMouseLeaveTrigger}
          className="sidebar-peek-trigger"
          aria-hidden="true"
        />
      )}

      {/* Desktop Sidebar Navigation */}
      <aside
        onMouseEnter={isCollapsed ? handleMouseEnterSidebar : undefined}
        onMouseLeave={isCollapsed ? handleMouseLeaveSidebar : undefined}
        className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isHoverPeek ? 'hover-peek' : ''}`}
      >
        <div className="sidebar-brand">
          <div className="brand-main">
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
          <button
            type="button"
            onClick={toggleSidebar}
            className="sidebar-collapse-btn"
            title={isCollapsed ? 'Mở rộng thanh điều hướng (Ctrl+B)' : 'Thu gọn thanh điều hướng (Ctrl+B)'}
            aria-label="Thu gọn thanh điều hướng"
          >
            <ChevronLeftIcon size={18} className={`sidebar-chevron ${isCollapsed ? 'rotated' : ''}`} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => {
                if (isHoverPeek) setHoverPeek(false);
              }}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-user-card">
            <NavLink
              to="/"
              className="sidebar-user-profile"
              title="Trang chủ & Tài khoản"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={userDisplayName}
                  className="sidebar-user-avatar"
                />
              ) : (
                <div className="sidebar-user-avatar-initial">
                  {avatarInitial}
                </div>
              )}
              <div className="sidebar-user-info">
                <span className="sidebar-user-name">{userDisplayName}</span>
              </div>
            </NavLink>
            <button
              onClick={handleSignOut}
              className="sidebar-logout-btn"
              title="Đăng xuất"
              aria-label="Đăng xuất"
            >
              <LogoutIcon size={18} />
            </button>
          </div>

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

export const Layout: React.FC = () => (
  <SidebarProvider>
    <LayoutContent />
  </SidebarProvider>
);
