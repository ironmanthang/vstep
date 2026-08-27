import React, { useState } from 'react';
import { useAuth } from '../../services/supabase/authStore';
import './AuthModal.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose?: () => void;
  isDismissable?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  isDismissable = true,
}) => {
  const { signInWithPassword, signUpWithPassword, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (mode === 'signin') {
        await signInWithPassword(email, password);
        if (onClose) onClose();
      } else {
        await signUpWithPassword(email, password);
        setSuccessMessage('Đăng ký thành công! Vui lòng kiểm tra email hoặc đăng nhập để tiếp tục.');
        setMode('signin');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Đã có lỗi xảy ra. Vui lòng thử lại.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Không thể kết nối với Google OAuth.';
      setErrorMessage(msg);
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-overlay" role="dialog" aria-modal="true">
      <div className="auth-modal-card glass-panel animate-scale-in">
        {isDismissable && onClose && (
          <button
            type="button"
            className="auth-modal-close"
            onClick={onClose}
            aria-label="Đóng"
          >
            ✕
          </button>
        )}

        <div className="auth-modal-header">
          <div className="auth-badge">VSTEP Cloud Sync</div>
          <h2 className="auth-title">
            {mode === 'signin' ? 'Đăng nhập tài khoản' : 'Tạo tài khoản mới'}
          </h2>
          <p className="auth-subtitle">
            Đồng bộ tiến độ ghi nhớ 1.500 từ vựng SRS trên mọi thiết bị
          </p>
        </div>

        {errorMessage && (
          <div className="auth-alert auth-alert-error" role="alert">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="auth-alert auth-alert-success" role="status">
            {successMessage}
          </div>
        )}

        {/* Google OAuth Button */}
        <button
          type="button"
          className="google-auth-button"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Tiếp tục với Google</span>
        </button>

        <div className="auth-divider">
          <span>hoặc dùng Email</span>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="auth-email">Địa chỉ Email</label>
            <input
              id="auth-email"
              type="email"
              required
              placeholder="tenban@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="auth-password">Mật khẩu</label>
            <input
              id="auth-password"
              type="password"
              required
              minLength={6}
              placeholder="Tối thiểu 6 ký tự"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>

          <button
            type="submit"
            className="auth-submit-button"
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : mode === 'signin' ? 'Đăng nhập' : 'Đăng ký tài khoản'}
          </button>
        </form>

        <div className="auth-mode-switch">
          {mode === 'signin' ? (
            <p>
              Chưa có tài khoản?{' '}
              <button
                type="button"
                className="switch-link"
                onClick={() => {
                  setMode('signup');
                  setErrorMessage(null);
                }}
              >
                Đăng ký ngay
              </button>
            </p>
          ) : (
            <p>
              Đã có tài khoản?{' '}
              <button
                type="button"
                className="switch-link"
                onClick={() => {
                  setMode('signin');
                  setErrorMessage(null);
                }}
              >
                Đăng nhập
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
