import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../services/supabase/authStore';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'var(--bg-canvas)',
          color: 'var(--text-primary)',
          gap: 'var(--space-4)',
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: '3px solid var(--border-subtle)',
            borderTopColor: 'var(--accent-primary)',
            animation: 'spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          }}
        />
        <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
          Đang xác thực và đồng bộ dữ liệu...
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
