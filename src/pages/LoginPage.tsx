import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../services/supabase/authStore';
import { isSupabaseConfigured } from '../services/supabase/client';

export const LoginPage: React.FC = () => {
  const { isAuthenticated, signInWithGoogle, loading: authLoading } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (authLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const isConfigured = isSupabaseConfigured();

  const handleGoogleLogin = async () => {
    if (!isConfigured) {
      setErrorMsg('Supabase chưa được cấu hình. Vui lòng kiểm tra file .env.local.');
      return;
    }
    setErrorMsg(null);
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Đã có lỗi xảy ra khi đăng nhập bằng Google.';
      setErrorMsg(message);
      setIsSigningIn(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-app)',
        padding: 'var(--space-4)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 440,
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-8)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 'var(--space-6)',
        }}
      >
        {/* Brand Logo & Title */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 'var(--radius-lg)',
              background: 'var(--primary-subtle)',
              border: '1px solid var(--border-strong)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
            }}
          >
            🔥
          </div>
          <h1
            style={{
              fontSize: 'var(--fs-2xl)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
              margin: 0,
            }}
          >
            VSTEP Master
          </h1>
          <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', margin: 0 }}>
            Hệ thống luyện thi VSTEP B1-B2 Chuẩn Khung 6 Bậc
          </p>
        </div>

        {/* Feature Highlights */}
        <div
          style={{
            width: '100%',
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <span style={{ fontSize: '18px' }}>🧠</span>
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-primary)', fontWeight: 500 }}>
              1,500+ từ vựng SRS phân bố theo band B1-B2-C1
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <span style={{ fontSize: '18px' }}>🎯</span>
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-primary)', fontWeight: 500 }}>
              Đề thi thử 4 kỹ năng mô phỏng 100% phòng máy Bộ GD&ĐT
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <span style={{ fontSize: '18px' }}>☁️</span>
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-primary)', fontWeight: 500 }}>
              Tự động đồng bộ tiến độ học tập giữa máy tính & điện thoại
            </span>
          </div>
        </div>

        {/* Developer Warning if Supabase unconfigured */}
        {!isConfigured && (
          <div
            style={{
              width: '100%',
              padding: 'var(--space-3)',
              background: 'var(--coral-subtle)',
              border: '1px solid var(--coral)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--fs-xs)',
              color: 'var(--coral-text)',
              textAlign: 'left',
            }}
          >
            <strong>Lưu ý cho Developer:</strong> Chưa tìm thấy biến môi trường Supabase. Hãy thêm{' '}
            <code>VITE_SUPABASE_URL</code> và <code>VITE_SUPABASE_ANON_KEY</code> vào <code>.env.local</code>.
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div
            style={{
              width: '100%',
              padding: 'var(--space-3)',
              background: 'var(--coral-subtle)',
              border: '1px solid var(--coral)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--fs-xs)',
              color: 'var(--coral-text)',
            }}
          >
            {errorMsg}
          </div>
        )}

        {/* Google OAuth Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isSigningIn}
          style={{
            width: '100%',
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-3)',
            background: 'var(--bg-app)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
            fontSize: 'var(--fs-sm)',
            fontWeight: 600,
            cursor: isSigningIn ? 'not-allowed' : 'pointer',
            transition: 'background var(--transition-fast), border-color var(--transition-fast)',
            boxShadow: 'var(--shadow-sm)',
          }}
          onMouseEnter={(e) => {
            if (!isSigningIn) {
              e.currentTarget.style.borderColor = 'var(--border-focus)';
              e.currentTarget.style.background = 'var(--bg-surface-hover)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isSigningIn) {
              e.currentTarget.style.borderColor = 'var(--border-strong)';
              e.currentTarget.style.background = 'var(--bg-app)';
            }
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          {isSigningIn ? 'Đang kết nối Google...' : 'Tiếp tục với Google'}
        </button>

        <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', margin: 0 }}>
          Bằng việc đăng nhập, bạn đồng ý với mục tiêu học tập và chính sách lưu trữ đám mây của VSTEP Master.
        </p>
      </div>
    </div>
  );
};
