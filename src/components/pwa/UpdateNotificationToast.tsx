import React, { useState, useEffect } from 'react';
import { SW_UPDATE_EVENT, applyAppUpdate } from '../../services/pwa/registerServiceWorker';

export const UpdateNotificationToast: React.FC = () => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setShowToast(true);
    };

    window.addEventListener(SW_UPDATE_EVENT, handleUpdate);
    return () => {
      window.removeEventListener(SW_UPDATE_EVENT, handleUpdate);
    };
  }, []);

  if (!showToast) {
    return null;
  }

  return (
    <aside
      aria-label="Thông báo cập nhật ứng dụng"
      role="status"
      style={{
        position: 'fixed',
        bottom: 'calc(var(--space-6) + env(safe-area-inset-bottom, 0px))',
        right: 'var(--space-6)',
        zIndex: 9999,
        maxWidth: 'min(420px, calc(100vw - 32px))',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-focus)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.28)',
        padding: 'var(--space-4) var(--space-5)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 700, color: 'var(--text-primary)' }}>
          Phiên bản mới đã sẵn sàng
        </div>
        <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>
          Làm mới để cập nhật giao diện và tính năng mới nhất.
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <button
          type="button"
          onClick={() => applyAppUpdate()}
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-contrast)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-2) var(--space-3)',
            fontSize: 'var(--fs-xs)',
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Cập nhật
        </button>
        <button
          type="button"
          onClick={() => setShowToast(false)}
          aria-label="Đóng thông báo"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: 'var(--space-1)',
            fontSize: 'var(--fs-sm)',
            lineHeight: 1,
          }}
        >
          ✕
        </button>
      </div>
    </aside>
  );
};
