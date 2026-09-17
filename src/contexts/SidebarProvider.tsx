import React, { useState, useEffect, useCallback } from 'react';
import { SidebarContext } from './SidebarContext';

const STORAGE_KEY = 'sidebar-collapsed';

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(STORAGE_KEY) === 'true';
      }
    } catch {
      // Ignore localStorage access errors
    }
    return false;
  });

  const [isHoverPeek, setIsHoverPeek] = useState<boolean>(false);

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, String(next));
        }
      } catch {
        // Ignore localStorage error
      }
      return next;
    });
    // Immediately clear hover peek overlay on explicit toggle
    setIsHoverPeek(false);
  }, []);

  const collapseSidebar = useCallback(() => {
    setIsCollapsed(true);
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, 'true');
      }
    } catch {
      // Ignore
    }
    setIsHoverPeek(false);
  }, []);

  const expandSidebar = useCallback(() => {
    setIsCollapsed(false);
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, 'false');
      }
    } catch {
      // Ignore
    }
    setIsHoverPeek(false);
  }, []);

  const setHoverPeek = useCallback((visible: boolean) => {
    setIsHoverPeek(visible);
  }, []);

  // Global desktop keyboard shortcut Ctrl+B / Cmd+B
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b' && !e.altKey && !e.shiftKey) {
        const target = e.target as HTMLElement | null;
        if (target) {
          const tagName = target.tagName;
          if (tagName === 'INPUT' || tagName === 'TEXTAREA' || target.isContentEditable) {
            return;
          }
        }
        e.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        isHoverPeek,
        toggleSidebar,
        collapseSidebar,
        expandSidebar,
        setHoverPeek,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
