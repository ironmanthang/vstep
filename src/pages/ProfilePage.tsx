import React from 'react';
import { PracticeIcon, CheckCircleIcon } from '../components/Icons';

export const ProfilePage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: 720 }}>
      <div>
        <h1 style={{ fontSize: 'var(--fs-2xl)', fontWeight: 800, color: 'var(--text-primary)' }}>Hồ Sơ Học Tập</h1>
        <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginTop: 4 }}>
          Theo dõi hành trình từ A1–A2 chinh phục chuẩn đầu ra VSTEP B1 (Bậc 3).
        </p>
      </div>

      {/* User Info Header */}
      <div className="card-surface" style={{ padding: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
        <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-full)', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--fs-xl)', fontWeight: 800 }}>
          L
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <h2 style={{ fontSize: 'var(--fs-lg)', fontWeight: 800 }}>Lan (Beginner)</h2>
            <span className="badge badge-primary">Mục tiêu: B1 (Bậc 3)</span>
          </div>
          <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginTop: 2 }}>
            Kỳ thi dự kiến: Tháng 11/2026
          </p>
        </div>
      </div>

      {/* Target & Progress Summary */}
      <div className="card-surface" style={{ padding: 'var(--space-6)' }}>
        <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>Mục Tiêu & Đánh Giá Năng Lực</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
          <div style={{ padding: 'var(--space-4)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <PracticeIcon size={24} color="var(--primary)" />
            <div>
              <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 700 }}>Chuẩn Đầu Ra</div>
              <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>VSTEP B1 (4.0 - 5.5)</div>
            </div>
          </div>
          <div style={{ padding: 'var(--space-4)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <CheckCircleIcon size={24} color="#059669" />
            <div>
              <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 700 }}>Thi Thử Thực Chiến</div>
              <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>Chưa có bài thi thử</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
