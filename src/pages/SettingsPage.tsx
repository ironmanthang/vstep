import React from 'react';
import { useNotification } from '../hooks/useNotification';
import { Toast } from '../components/common/Toast';
import { GatewayStatusCard } from './settings/GatewayStatusCard';
import { QuotaUsageCard } from './settings/QuotaUsageCard';
import { DeveloperOverrideSection } from './settings/DeveloperOverrideSection';

export const SettingsPage: React.FC = () => {
  const { statusMessage, showNotification, clearNotification } = useNotification();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: 720 }}>
      <Toast message={statusMessage} onClose={clearNotification} />

      <div>
        <h1 style={{ fontSize: 'var(--fs-2xl)', fontWeight: 800, color: 'var(--text-primary)' }}>
          Cài Đặt & AI Gateway
        </h1>
        <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginTop: 4 }}>
          Hệ thống AI chấm Writing & Speaking thông minh chuẩn Barem VSTEP của Bộ GD&ĐT.
        </p>
      </div>

      {/* Platform Master AI Gateway Status Card */}
      <GatewayStatusCard onNotify={showNotification} />

      {/* Membership & Quota Card */}
      <QuotaUsageCard onNotify={showNotification} />

      {/* Developer / Admin Custom Override Section */}
      <DeveloperOverrideSection onNotify={showNotification} />

      {/* PWA & Storage Status */}
      <div className="card-surface" style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <h4 style={{ fontSize: 'var(--fs-sm)', fontWeight: 700 }}>Trạng Thái Ứng Dụng PWA & Bộ Nhớ</h4>
        <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>
          Hệ thống lưu trữ bản nháp Writing cục bộ mỗi 5s chống rớt mạng. Hỗ trợ cài đặt PWA Standalone trên iOS, Android và Desktop.
        </p>
      </div>
    </div>
  );
};
