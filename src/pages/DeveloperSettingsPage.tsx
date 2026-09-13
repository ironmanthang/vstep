import React from 'react';
import { Link } from 'react-router';
import { useNotification } from '../hooks/useNotification';
import { Toast } from '../components/common/Toast';
import { GatewayStatusCard } from './settings/GatewayStatusCard';
import { DeveloperOverrideSection } from './settings/DeveloperOverrideSection';

export const DeveloperSettingsPage: React.FC = () => {
  const { statusMessage, showNotification, clearNotification } = useNotification();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: 720 }}>
      <Toast message={statusMessage} onClose={clearNotification} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-gold">Developer Tools</span>
            <span className="badge badge-primary">Admin / Debug</span>
          </div>
          <h1 style={{ fontSize: 'var(--fs-2xl)', fontWeight: 800, color: 'var(--text-primary)', margin: '6px 0 0 0' }}>
            Bảng Điều Khiển AI Gateway
          </h1>
          <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginTop: 4, margin: 0 }}>
            Cấu hình endpoint riêng, custom API key và kiểm tra kết nối mô hình phục vụ phát triển & kiểm thử.
          </p>
        </div>

        <Link
          to="/profile"
          className="secondary-btn"
          style={{ fontSize: 'var(--fs-xs)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          ← Quay lại Hồ sơ & Cài đặt
        </Link>
      </div>

      {/* Platform Master AI Gateway Status Card */}
      <GatewayStatusCard onNotify={showNotification} />

      {/* Developer / Admin Custom Override Section */}
      <DeveloperOverrideSection onNotify={showNotification} />
    </div>
  );
};
