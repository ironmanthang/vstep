import React, { useState } from 'react';
import { Link } from 'react-router';
import { RefreshIcon } from '../components/Icons';
import { useUserStore } from '../services/user/userStore';
import { useFlashcardStore } from '../features/flashcard/useFlashcardStore';
import { useAuth } from '../services/supabase/authStore';
import { useNotification } from '../hooks/useNotification';
import { Toast } from '../components/common/Toast';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { QuotaUsageCard } from './settings/QuotaUsageCard';

export const ProfilePage: React.FC = () => {
  const {
    userDisplayName,
    avatarInitial,
    avatarUrl,
    setUserName,
  } = useUserStore();

  const { resetDeck } = useFlashcardStore();
  const { user } = useAuth();
  const { statusMessage, showNotification, clearNotification } = useNotification();
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userDisplayName);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleSaveName = () => {
    const trimmed = tempName.trim();
    if (trimmed) {
      setUserName(trimmed);
      setIsEditingName(false);
      showNotification('Đã cập nhật tên người học thành công!', 'success');
    }
  };

  const handleConfirmResetDeck = async () => {
    setIsResetting(true);
    const res = await resetDeck();
    setIsResetting(false);
    setIsResetModalOpen(false);

    if (res.success) {
      showNotification('✓ Đã đặt lại toàn bộ thẻ và số thẻ đã ôn hôm nay về 0.', 'info');
    } else {
      showNotification(res.error || 'Không thể đặt lại tiến độ trên đám mây. Vui lòng thử lại.', 'error');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', maxWidth: 640, margin: '0 auto', width: '100%' }}>
      <Toast message={statusMessage} onClose={clearNotification} />

      <div>
        <h1 style={{ fontSize: 'var(--fs-2xl)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Hồ Sơ Tài Khoản
        </h1>
        <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginTop: 4, margin: 0 }}>
          Thông tin tài khoản Google và quản lý tiến độ học tập cá nhân.
        </p>
      </div>

      {/* User Info Header Card */}
      <div className="card-surface" style={{ padding: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap', border: '1px solid var(--border)' }}>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={userDisplayName}
            style={{ width: 64, height: 64, borderRadius: 'var(--radius-full)', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 'var(--radius-full)',
              background: 'var(--primary-subtle)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--fs-xl)',
              fontWeight: 800,
            }}
          >
            {avatarInitial}
          </div>
        )}

        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {isEditingName ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Nhập tên của bạn"
                  style={{
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--primary)',
                    background: 'var(--bg-input)',
                    color: 'var(--text-primary)',
                    fontSize: 'var(--fs-md)',
                    fontWeight: 700,
                  }}
                  autoFocus
                />
                <button className="primary-btn" onClick={handleSaveName} style={{ padding: '4px 10px', fontSize: 'var(--fs-xs)' }}>
                  Lưu
                </button>
                <button className="secondary-btn" onClick={() => { setTempName(userDisplayName); setIsEditingName(false); }} style={{ padding: '4px 10px', fontSize: 'var(--fs-xs)' }}>
                  Hủy
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <h2 style={{ fontSize: 'var(--fs-lg)', fontWeight: 800, margin: 0 }}>{userDisplayName}</h2>
                <button
                  onClick={() => { setTempName(userDisplayName); setIsEditingName(true); }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 'var(--fs-xs)', textDecoration: 'underline' }}
                >
                  Đổi tên
                </button>
              </div>
            )}
          </div>

          {user?.email && (
            <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', margin: '6px 0 0 0' }}>
              Gmail: <strong>{user.email}</strong>
            </p>
          )}
        </div>
      </div>

      {/* Membership & Daily AI Quota */}
      <QuotaUsageCard />

      {/* Danger Zone: Reset Deck */}
      <div className="card-surface" style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', border: '1px solid var(--border)' }}>
        <h3 style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, margin: 0, color: 'var(--coral-text)' }}>
          Quản Lý Dữ Liệu Flashcard
        </h3>
        <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
          Nếu bạn muốn ôn tập lại từ đầu toàn bộ 3.000 từ vựng hoặc đặt lại hàng đợi hôm nay, hãy sử dụng tính năng đặt lại bên dưới.
        </p>
        <div>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => setIsResetModalOpen(true)}
            style={{
              color: 'var(--coral)',
              borderColor: 'var(--coral)',
              fontSize: 'var(--fs-xs)',
              padding: '8px 16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
            disabled={isResetting}
          >
            <RefreshIcon size={14} />
            <span>Đặt lại toàn bộ Deck từ vựng</span>
          </button>
        </div>
      </div>

      {/* Developer Console Footer Link */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 'var(--space-2)' }}>
        <Link
          to="/dev"
          style={{
            fontSize: 'var(--fs-xs)',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          ⚙️ Tùy chọn cho Nhà phát triển (Developer Console) →
        </Link>
      </div>

      {/* Strict Confirmation Modal for Deck Reset */}
      <ConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => {
          if (!isResetting) setIsResetModalOpen(false);
        }}
        onConfirm={handleConfirmResetDeck}
        isLoading={isResetting}
        title="Đặt lại toàn bộ Deck từ vựng?"
        description={
          <>
            Hành động này sẽ <strong>xóa vĩnh viễn</strong> toàn bộ tiến độ Spaced Repetition (SRS) của <strong>3.000 từ vựng</strong> và đưa bộ đếm ôn tập hôm nay về <strong>0 thẻ</strong> trên cả thiết bị này và tài khoản đám mây của bạn.
          </>
        }
        warningText="Dữ liệu đã xóa không thể khôi phục lại. Bạn sẽ cần bắt đầu học lại từ đầu."
        confirmLabel="Xác nhận xóa & Đặt lại"
        cancelLabel="Hủy bỏ (Giữ tiến độ)"
      />
    </div>
  );
};
