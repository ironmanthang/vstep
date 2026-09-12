import React, { useState } from 'react';
import { getDailyAIQuotaStatus } from '../../services/ai';
import { useAuth } from '../../services/supabase/authStore';

interface QuotaUsageCardProps {
  onNotify: (message: string, type?: 'info' | 'success' | 'error') => void;
}

export const QuotaUsageCard: React.FC<QuotaUsageCardProps> = ({ onNotify }) => {
  const { user } = useAuth();
  const [quota] = useState(() => getDailyAIQuotaStatus(user?.id));

  return (
    <div className="card-surface" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 700 }}>Gói Học Viên & Hạn Ngạch AI</h3>
          <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>
            Dung lượng chấm bài Writing & Speaking theo ngày.
          </p>
        </div>
        <span className="badge badge-primary">Gói Miễn Phí</span>
      </div>

      <div style={{ padding: 'var(--space-4)', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--fs-xs)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
          <span>Hạn mức hôm nay:</span>
          <span style={{ color: quota.isExhausted ? 'var(--coral)' : 'var(--emerald)' }}>
            {quota.usedCount} / {quota.maxCount} lượt đã sử dụng ({quota.remaining} lượt còn lại)
          </span>
        </div>
        <div style={{ height: 8, background: 'var(--bg-surface-active)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
          <div
            style={{
              width: `${Math.max(4, quota.percentageUsed)}%`,
              height: '100%',
              background: quota.isExhausted ? 'var(--coral)' : 'var(--primary)',
              borderRadius: 'var(--radius-full)',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-1)', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>
          Cần chấm không giới hạn và nhận bài mẫu nâng band chuyên sâu?
        </span>
        <button
          className="secondary-btn"
          style={{ padding: 'var(--space-2) var(--space-4)', color: 'var(--primary-text)', borderColor: 'var(--primary)' }}
          onClick={() => onNotify('Tính năng nâng cấp gói Pro sẽ ra mắt trong Sprint tiếp theo!', 'info')}
        >
          Tìm Hiểu Gói VSTEP Pro
        </button>
      </div>
    </div>
  );
};
