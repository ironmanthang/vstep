import React, { useState, useEffect } from 'react';
import './ReminderSettingsModal.css';
import {
  getReminderPrefs,
  saveReminderPrefs,
  getNotificationPermission,
  requestNotificationPermission,
  triggerSrsReminder,
  type SrsReminderPrefs,
} from '../../../services/notification/srsReminderService';

export interface ReminderSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  dueCount?: number;
  onNotify?: (text: string, type: 'success' | 'error' | 'info') => void;
}

export const ReminderSettingsModal: React.FC<ReminderSettingsModalProps> = ({
  isOpen,
  onClose,
  dueCount = 0,
  onNotify,
}) => {
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>(() => getNotificationPermission());
  const [prefs, setPrefs] = useState<SrsReminderPrefs>(() => getReminderPrefs());
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testFeedback, setTestFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleRequestPermission = async () => {
    const perm = await requestNotificationPermission();
    setPermission(perm);
    if (perm === 'granted') {
      const updated = { ...prefs, enabled: true };
      setPrefs(updated);
      saveReminderPrefs(updated);
      if (onNotify) onNotify('Đã cấp quyền thông báo thành công!', 'success');
    } else if (perm === 'denied') {
      if (onNotify) onNotify('Trình duyệt đang chặn quyền thông báo. Vui lòng mở cài đặt trình duyệt để cấp quyền.', 'error');
    }
  };

  const handleToggle = (checked: boolean) => {
    if (checked && permission !== 'granted') {
      handleRequestPermission();
      return;
    }
    const updated = { ...prefs, enabled: checked };
    setPrefs(updated);
    saveReminderPrefs(updated);
  };

  const handleTimePreset = (time: string) => {
    const updated = { ...prefs, reminderTime: time };
    setPrefs(updated);
    saveReminderPrefs(updated);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) return;
    const updated = { ...prefs, reminderTime: val };
    setPrefs(updated);
    saveReminderPrefs(updated);
  };

  const handleSendTestNotification = async () => {
    if (permission !== 'granted') {
      await handleRequestPermission();
      return;
    }

    setIsTesting(true);
    setTestFeedback(null);
    try {
      const ok = await triggerSrsReminder(dueCount, true);
      if (ok) {
        setTestFeedback('✓ Đã phát thông báo thử nghiệm! Kiểm tra thanh thông báo thiết bị.');
        if (onNotify) onNotify('Đã phát thông báo thử nghiệm thành công!', 'success');
      } else {
        setTestFeedback('✕ Không thể gửi thông báo. Vui lòng kiểm tra quyền hệ thống.');
      }
    } catch {
      setTestFeedback('✕ Gặp lỗi khi kích hoạt thông báo.');
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div
      className="reminder-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reminder-modal-title"
    >
      <div className="reminder-modal-card">
        {/* Modal Header */}
        <div className="reminder-modal-header">
          <div className="reminder-modal-title-row">
            <div className="reminder-modal-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <div>
              <h3 id="reminder-modal-title" className="reminder-modal-title">
                Nhắc Nhở Ôn Tập SRS
              </h3>
              <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                Huy hiệu App Badge & Thông báo PWA trên Android/Desktop
              </p>
            </div>
          </div>
          <button
            className="reminder-modal-close-btn"
            onClick={onClose}
            aria-label="Đóng cửa sổ"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Permission Status Banner */}
        {permission === 'granted' && (
          <div className="reminder-permission-banner granted">
            <span>✓ Trình duyệt đã cấp quyền thông báo hệ thống.</span>
          </div>
        )}
        {permission === 'denied' && (
          <div className="reminder-permission-banner denied">
            <span>✕ Thông báo đang bị chặn. Vui lòng vào Cài đặt trình duyệt &gt; Quyền trang web để mở lại.</span>
          </div>
        )}
        {(permission === 'default' || permission === 'unsupported') && (
          <div className="reminder-permission-banner default">
            <span>Trình duyệt chưa kích hoạt quyền thông báo PWA.</span>
            {permission === 'default' && (
              <button
                className="secondary-btn"
                style={{ padding: '4px 10px', fontSize: 'var(--fs-xs)' }}
                onClick={handleRequestPermission}
              >
                Cấp quyền
              </button>
            )}
          </div>
        )}

        {/* Setting: Enable Toggle */}
        <div className="reminder-setting-row">
          <div className="reminder-setting-label">
            <span className="reminder-setting-name">Bật nhắc nhở hàng ngày</span>
            <span className="reminder-setting-desc">Tự động báo khi có thẻ từ vựng đến hạn ôn tập</span>
          </div>
          <label className="reminder-switch">
            <input
              type="checkbox"
              checked={prefs.enabled && permission === 'granted'}
              onChange={(e) => handleToggle(e.target.checked)}
            />
            <span className="reminder-slider" />
          </label>
        </div>

        {/* Setting: Reminder Time */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="reminder-setting-name">Thời gian nhắc nhở</span>
            <input
              type="time"
              className="reminder-time-input"
              value={prefs.reminderTime}
              onChange={handleTimeChange}
              disabled={!prefs.enabled || permission !== 'granted'}
            />
          </div>

          <div className="reminder-presets-row">
            <button
              type="button"
              className={`reminder-preset-btn ${prefs.reminderTime === '08:00' ? 'active' : ''}`}
              onClick={() => handleTimePreset('08:00')}
              disabled={!prefs.enabled || permission !== 'granted'}
            >
              08:00 (Sáng)
            </button>
            <button
              type="button"
              className={`reminder-preset-btn ${prefs.reminderTime === '12:30' ? 'active' : ''}`}
              onClick={() => handleTimePreset('12:30')}
              disabled={!prefs.enabled || permission !== 'granted'}
            >
              12:30 (Trưa)
            </button>
            <button
              type="button"
              className={`reminder-preset-btn ${prefs.reminderTime === '20:00' ? 'active' : ''}`}
              onClick={() => handleTimePreset('20:00')}
              disabled={!prefs.enabled || permission !== 'granted'}
            >
              20:00 (Tối)
            </button>
          </div>
        </div>

        {/* Info Box: App Badging & Due Count */}
        <div className="reminder-info-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', fontWeight: 600, marginBottom: 4 }}>
            <span>Huy hiệu App Icon Badge:</span>
            <span style={{ color: 'var(--gold)' }}>{dueCount} thẻ cần ôn</span>
          </div>
          <div>
            Số thẻ đến hạn được đồng bộ trực tiếp lên icon ứng dụng VSTEP Master trên màn hình chính (Android &amp; Desktop PWA).
          </div>
        </div>

        {/* Test Feedback */}
        {testFeedback && (
          <div style={{ fontSize: 'var(--fs-xs)', color: testFeedback.startsWith('✓') ? 'var(--emerald)' : 'var(--coral)', fontWeight: 500 }}>
            {testFeedback}
          </div>
        )}

        {/* Modal Actions */}
        <div className="reminder-modal-actions">
          <button
            type="button"
            className="secondary-btn"
            onClick={handleSendTestNotification}
            disabled={isTesting}
            style={{ fontSize: 'var(--fs-xs)' }}
          >
            {isTesting ? 'Đang gửi...' : 'Gửi thông báo thử'}
          </button>
          <button
            type="button"
            className="primary-btn"
            onClick={onClose}
            style={{ fontSize: 'var(--fs-xs)' }}
          >
            Lưu &amp; Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
