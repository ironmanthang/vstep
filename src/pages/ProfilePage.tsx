import React, { useState } from 'react';
import { PracticeIcon, CheckCircleIcon, FireIcon } from '../components/Icons';
import { useUserStore } from '../services/user/userStore';
import { useAuth } from '../services/supabase/authStore';
import { useNotification } from '../hooks/useNotification';
import { Toast } from '../components/common/Toast';

export const ProfilePage: React.FC = () => {
  const {
    userDisplayName,
    avatarInitial,
    avatarUrl,
    targetBand,
    targetExamDate,
    setTargetBand,
    setTargetExamDate,
    setUserName,
    latestMockTest,
    completedExercisesCount,
    streakDays,
    streakBadgeText,
  } = useUserStore();

  const { user } = useAuth();
  const { statusMessage, showNotification, clearNotification } = useNotification();
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userDisplayName);

  const handleSaveName = () => {
    setUserName(tempName.trim());
    setIsEditingName(false);
    showNotification('Đã cập nhật tên người học thành công!', 'success');
  };

  const getTargetBandLabel = (band: 'B1' | 'B2' | 'C1') => {
    switch (band) {
      case 'B1': return 'Bậc 3 (B1: 4.0 – 5.5)';
      case 'B2': return 'Bậc 4 (B2: 6.0 – 8.0)';
      case 'C1': return 'Bậc 5 (C1: 8.5 – 10.0)';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: 720 }}>
      <Toast message={statusMessage} onClose={clearNotification} />

      <div>
        <h1 style={{ fontSize: 'var(--fs-2xl)', fontWeight: 800, color: 'var(--text-primary)' }}>Hồ Sơ Học Tập</h1>
        <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginTop: 4 }}>
          Theo dõi hành trình cá nhân hóa và thiết lập mục tiêu chứng chỉ VSTEP.
        </p>
      </div>

      {/* User Info Header */}
      <div className="card-surface" style={{ padding: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
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
        <div style={{ flex: 1 }}>
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
                />
                <button className="primary-btn" onClick={handleSaveName} style={{ padding: '4px 10px', fontSize: 'var(--fs-xs)' }}>
                  Lưu
                </button>
                <button className="secondary-btn" onClick={() => setIsEditingName(false)} style={{ padding: '4px 10px', fontSize: 'var(--fs-xs)' }}>
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
            <span className="badge badge-primary">Mục tiêu: {targetBand}</span>
            <span className={`badge ${streakDays > 0 ? 'badge-emerald' : 'badge-primary'}`}>
              <FireIcon size={12} color={streakDays > 0 ? '#059669' : 'var(--text-muted)'} /> {streakBadgeText}
            </span>
          </div>
          {user?.email && (
            <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              Tài khoản Google: <strong>{user.email}</strong>
            </p>
          )}
          <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
            Kỳ thi dự kiến: {targetExamDate || 'Chưa thiết lập'}
          </p>
        </div>
      </div>

      {/* Target & Band Settings Card */}
      <div className="card-surface" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 700 }}>Thiết Lập Mục Tiêu Đầu Ra</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <label style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Chọn Bậc Năng Lực Mục Tiêu:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-2)' }}>
            {(['B1', 'B2', 'C1'] as const).map((band) => (
              <button
                key={band}
                className={`secondary-btn ${targetBand === band ? 'active' : ''}`}
                style={{
                  borderColor: targetBand === band ? 'var(--primary)' : 'var(--border)',
                  background: targetBand === band ? 'var(--primary-subtle)' : 'var(--bg-surface)',
                  color: targetBand === band ? 'var(--primary-text)' : 'var(--text-primary)',
                  fontWeight: 700,
                  justifyContent: 'center',
                  padding: 'var(--space-3)',
                }}
                onClick={() => {
                  setTargetBand(band);
                  showNotification(`Đã đổi mục tiêu sang VSTEP ${band}`, 'success');
                }}
              >
                VSTEP {band}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <label style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Kỳ Thi Dự Kiến:
          </label>
          <input
            type="text"
            value={targetExamDate || ''}
            onChange={(e) => setTargetExamDate(e.target.value.trim() || null)}
            placeholder="Ví dụ: Tháng 11/2026 hoặc 2026-11-15"
            style={{
              padding: 'var(--space-3)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              background: 'var(--bg-input)',
              color: 'var(--text-primary)',
              fontSize: 'var(--fs-sm)',
              maxWidth: 320,
            }}
          />
        </div>
      </div>

      {/* Target & Progress Summary */}
      <div className="card-surface" style={{ padding: 'var(--space-6)' }}>
        <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>Mục Tiêu & Đánh Giá Năng Lực</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-3)' }}>
          <div style={{ padding: 'var(--space-4)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <PracticeIcon size={24} color="var(--primary)" />
            <div>
              <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 700 }}>Chuẩn Đầu Ra</div>
              <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
                {getTargetBandLabel(targetBand)}
              </div>
            </div>
          </div>
          <div style={{ padding: 'var(--space-4)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <PracticeIcon size={24} color="var(--emerald)" />
            <div>
              <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 700 }}>Bài Luyện Đã Làm</div>
              <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
                {completedExercisesCount > 0 ? `${completedExercisesCount} bài tập` : 'Chưa có bài tập'}
              </div>
            </div>
          </div>
          <div style={{ padding: 'var(--space-4)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <CheckCircleIcon size={24} color={latestMockTest ? '#059669' : 'var(--text-muted)'} />
            <div>
              <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 700 }}>Thi Thử Thực Chiến</div>
              <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
                {latestMockTest ? `${latestMockTest.score} / 10 (${latestMockTest.achieved_band})` : 'Chưa có bài thi thử'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
