import React, { useState } from 'react';
import { RefreshIcon } from '../components/Icons';
import { useUserStore } from '../services/user/userStore';
import { useFlashcardStore } from '../features/flashcard/useFlashcardStore';
import { useAuth } from '../services/supabase/authStore';
import { useNotification } from '../hooks/useNotification';
import { Toast } from '../components/common/Toast';
import { ConfirmModal } from '../components/common/ConfirmModal';

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 540, margin: '0 auto', width: '100%', height: '100%', justifyContent: 'center' }}>
      <Toast message={statusMessage} onClose={clearNotification} />

      {/* User Info & Settings Card */}
      <div className="card-surface" style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={userDisplayName}
              style={{ width: 56, height: 56, borderRadius: 'var(--radius-full)', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 'var(--radius-full)',
                background: 'var(--primary-subtle)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--fs-lg)',
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {avatarInitial}
            </div>
          )}

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              {isEditingName ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', width: '100%' }}>
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
                      fontSize: 'var(--fs-sm)',
                      fontWeight: 700,
                      flex: 1,
                      minWidth: 0,
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
                  <h2 style={{ fontSize: 'var(--fs-base)', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>{userDisplayName}</h2>
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
              <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', margin: '4px 0 0 0', wordBreak: 'break-all' }}>
                Gmail: <strong>{user.email}</strong>
              </p>
            )}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--space-3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
            Dữ liệu flashcard SRS:
          </span>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => setIsResetModalOpen(true)}
            style={{
              color: 'var(--coral)',
              borderColor: 'var(--coral)',
              fontSize: 'var(--fs-xs)',
              padding: '6px 12px',
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
