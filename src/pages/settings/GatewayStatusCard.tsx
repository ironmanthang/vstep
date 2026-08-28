import React, { useState } from 'react';
import type { AITestConnectionResult } from '../../services/ai';
import { testAIConnection, getAIGatewayStatus, getEffectiveAIConfig } from '../../services/ai';
import { CheckCircleIcon, RefreshIcon } from '../../components/Icons';

interface GatewayStatusCardProps {
  onNotify: (message: string, type?: 'info' | 'success' | 'error') => void;
}

export const GatewayStatusCard: React.FC<GatewayStatusCardProps> = ({ onNotify }) => {
  const gatewayStatus = getAIGatewayStatus();
  const effectiveConfig = getEffectiveAIConfig();
  const [isTestingMaster, setIsTestingMaster] = useState(false);
  const [masterPingResult, setMasterPingResult] = useState<AITestConnectionResult | null>(null);

  const handleTestMasterPing = async () => {
    setIsTestingMaster(true);
    setMasterPingResult(null);
    try {
      const result = await testAIConnection();
      setMasterPingResult(result);
      if (result.success) {
        onNotify(`Ping Master Gateway thành công (${result.latencyMs}ms)`, 'success');
      } else {
        onNotify(result.message, 'error');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Lỗi kiểm tra kết nối';
      onNotify(msg, 'error');
    } finally {
      setIsTestingMaster(false);
    }
  };

  const providerLabel = () => {
    switch (effectiveConfig.provider) {
      case 'openrouter': return 'OpenRouter Gateway';
      case 'ollama_cloud': return 'Ollama Cloud';
      case 'google_ai_studio': return 'Google AI Studio';
      case 'ollama_local': return 'Ollama Local';
      default: return effectiveConfig.provider;
    }
  };

  return (
    <div className="card-surface" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <div>
          <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 700 }}>Trạng Thái AI Gateway</h3>
          <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>
            Tự động kết nối qua Master Key Pool và tối ưu hóa chi phí học tập.
          </p>
        </div>
        <span className={`badge ${gatewayStatus.isOverrideActive ? 'badge-gold' : 'badge-emerald'}`}>
          <CheckCircleIcon size={14} />
          {gatewayStatus.isOverrideActive ? 'Custom Override' : 'Master Gateway Active'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-3)' }}>
        <div style={{ padding: 'var(--space-3)', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', display: 'block' }}>Nhà Cung Cấp:</span>
          <strong style={{ fontSize: 'var(--fs-sm)', color: 'var(--primary-text)' }}>{providerLabel()}</strong>
        </div>
        <div style={{ padding: 'var(--space-3)', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', display: 'block' }}>Mô Hình Mặc Định:</span>
          <strong style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-primary)' }}>{effectiveConfig.modelName}</strong>
        </div>
        <div style={{ padding: 'var(--space-3)', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', display: 'block' }}>Key Pool Quản Trị:</span>
          <strong style={{ fontSize: 'var(--fs-sm)', color: 'var(--emerald)' }}>{gatewayStatus.poolCount} Master Keys</strong>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-1)' }}>
        <button
          className="primary-btn"
          onClick={handleTestMasterPing}
          disabled={isTestingMaster}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2) var(--space-4)' }}
        >
          <RefreshIcon size={16} className={isTestingMaster ? 'spinning' : ''} />
          {isTestingMaster ? 'Đang kiểm tra...' : 'Kiểm Tra Kết Nối (Ping Gateway)'}
        </button>

        {masterPingResult && (
          <span
            className={`badge ${masterPingResult.success ? 'badge-emerald' : 'badge-coral'}`}
            style={{ padding: '6px 10px', fontSize: 'var(--fs-xs)' }}
          >
            {masterPingResult.success ? `✓ ${masterPingResult.latencyMs}ms — ${masterPingResult.message}` : `✕ ${masterPingResult.message}`}
          </span>
        )}
      </div>
    </div>
  );
};
