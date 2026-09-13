import React, { useEffect, useState } from 'react';

interface MockTestDistractionBannerProps {
  isActive: boolean;
  blurCount: number;
  onBlurDetected: () => void;
}

export const MockTestDistractionBanner: React.FC<MockTestDistractionBannerProps> = ({
  isActive,
  blurCount,
  onBlurDetected,
}) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        onBlurDetected();
        setShowAlert(true);
      }
    };

    const handleBlur = () => {
      onBlurDetected();
      setShowAlert(true);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [isActive, onBlurDetected]);

  if (!showAlert || blurCount === 0) return null;

  return (
    <div
      role="alert"
      style={{
        position: 'fixed',
        top: 'var(--space-4)',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        maxWidth: '680px',
        width: 'calc(100% - var(--space-8))',
        background: 'var(--bg-surface)',
        border: '2px solid var(--coral)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        padding: 'var(--space-3) var(--space-4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-3)',
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
            borderRadius: 'var(--radius-full)',
            background: 'var(--coral-subtle)',
            color: 'var(--coral)',
            fontWeight: 800,
            fontSize: 'var(--fs-xs)',
            flexShrink: 0,
          }}
        >
          !
        </span>
        <div>
          <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 700, color: 'var(--coral)' }}>
            Cảnh báo chống gian lận &amp; phân tâm (Lần {blurCount})
          </div>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>
            Hệ thống phát hiện bạn vừa click ra ngoài cửa sổ hoặc chuyển tab. Trong phòng thi Bộ GD&amp;ĐT, việc này bị lập biên bản vi phạm quy chế.
          </div>
        </div>
      </div>

      <button
        type="button"
        className="primary-btn"
        onClick={() => setShowAlert(false)}
        style={{
          fontSize: 'var(--fs-xs)',
          padding: 'var(--space-2) var(--space-3)',
          flexShrink: 0,
          background: 'var(--coral)',
        }}
      >
        Tôi Đã Hiểu
      </button>
    </div>
  );
};
