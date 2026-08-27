import React, { useState } from 'react';
import type {
  AIProvider,
  AIProviderConfig,
  AITestConnectionResult,
} from '../services/ai';
import {
  testAIConnection,
  getAIGatewayStatus,
  getEffectiveAIConfig,
  getDeveloperAIOverride,
  saveDeveloperAIOverride,
  clearDeveloperAIOverride,
  PRESET_MODELS,
} from '../services/ai';
import { useNotification } from '../hooks/useNotification';
import { Toast } from '../components/common/Toast';
import { CheckCircleIcon, RefreshIcon } from '../components/Icons';

export const SettingsPage: React.FC = () => {
  const { statusMessage, showNotification, clearNotification } = useNotification();

  // Gateway Status & Health Test State
  const gatewayStatus = getAIGatewayStatus();
  const [isTestingMaster, setIsTestingMaster] = useState(false);
  const [masterPingResult, setMasterPingResult] = useState<AITestConnectionResult | null>(null);

  // Developer Override State
  const [isDevMode, setIsDevMode] = useState(() => Boolean(getDeveloperAIOverride()?.isCustomOverride));
  const [devProvider, setDevProvider] = useState<AIProvider>(() => getDeveloperAIOverride()?.provider || 'openrouter');
  const [devApiKey, setDevApiKey] = useState(() => getDeveloperAIOverride()?.apiKey || '');
  const [devBaseUrl, setDevBaseUrl] = useState(() => getDeveloperAIOverride()?.baseUrl || '');
  const [devModel, setDevModel] = useState(() => getDeveloperAIOverride()?.modelName || 'anthropic/claude-3.5-sonnet');
  const [isTestingDev, setIsTestingDev] = useState(false);
  const [devPingResult, setDevPingResult] = useState<AITestConnectionResult | null>(null);

  const handleTestMasterPing = async () => {
    setIsTestingMaster(true);
    setMasterPingResult(null);
    try {
      const result = await testAIConnection();
      setMasterPingResult(result);
      if (result.success) {
        showNotification(`Ping Master Gateway thành công (${result.latencyMs}ms)`, 'success');
      } else {
        showNotification(result.message, 'error');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Lỗi kiểm tra kết nối';
      showNotification(msg, 'error');
    } finally {
      setIsTestingMaster(false);
    }
  };

  const handleTestDevPing = async () => {
    setIsTestingDev(true);
    setDevPingResult(null);
    const testConfig: AIProviderConfig = {
      provider: devProvider,
      apiKey: devApiKey.trim(),
      baseUrl: devBaseUrl.trim() || undefined,
      modelName: devModel.trim(),
      isCustomOverride: true,
    };

    try {
      const result = await testAIConnection(testConfig);
      setDevPingResult(result);
      if (result.success) {
        showNotification(`Kết nối tùy chỉnh thành công (${result.latencyMs}ms)`, 'success');
      } else {
        showNotification(result.message, 'error');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Lỗi kết nối';
      showNotification(msg, 'error');
    } finally {
      setIsTestingDev(false);
    }
  };

  const handleSaveDevOverride = () => {
    const config: AIProviderConfig = {
      provider: devProvider,
      apiKey: devApiKey.trim(),
      baseUrl: devBaseUrl.trim() || undefined,
      modelName: devModel.trim(),
      isCustomOverride: true,
    };
    saveDeveloperAIOverride(config);
    setIsDevMode(true);
    showNotification('Đã lưu cấu hình Developer Override thành công!', 'success');
  };

  const handleResetToMaster = () => {
    clearDeveloperAIOverride();
    setIsDevMode(false);
    setDevApiKey('');
    setDevBaseUrl('');
    setDevModel('anthropic/claude-3.5-sonnet');
    setDevPingResult(null);
    showNotification('Đã khôi phục về Master AI Gateway mặc định!', 'info');
  };

  const effectiveConfig = getEffectiveAIConfig();
  const availablePresetModels = PRESET_MODELS.filter(m => m.provider === devProvider);

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
            <strong style={{ fontSize: 'var(--fs-sm)', color: 'var(--primary-text)' }}>
              {effectiveConfig.provider === 'openrouter' && 'OpenRouter Gateway'}
              {effectiveConfig.provider === 'ollama_cloud' && 'Ollama Cloud'}
              {effectiveConfig.provider === 'google_ai_studio' && 'Google AI Studio'}
              {effectiveConfig.provider === 'ollama_local' && 'Ollama Local'}
            </strong>
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

      {/* Membership & Quota Readiness Card */}
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
            <span style={{ color: 'var(--emerald)' }}>5 / 5 lượt chấm AI</span>
          </div>
          <div style={{ height: 8, background: 'var(--bg-surface-active)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', background: 'var(--primary)', borderRadius: 'var(--radius-full)' }} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-1)', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>
            Cần chấm không giới hạn và nhận bài mẫu nâng band chuyên sâu?
          </span>
          <button
            className="secondary-btn"
            style={{ padding: 'var(--space-2) var(--space-4)', color: 'var(--primary-text)', borderColor: 'var(--primary)' }}
            onClick={() => showNotification('Tính năng nâng cấp gói Pro sẽ ra mắt trong Sprint tiếp theo!', 'info')}
          >
            Tìm Hiểu Gói VSTEP Pro
          </button>
        </div>
      </div>

      {/* Developer / Admin Custom Override Section */}
      <div className="card-surface" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 700 }}>Tùy Chọn Nâng Cao (Developer Override)</h3>
            <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>
              Dành cho lập trình viên muốn thử nghiệm endpoint riêng, custom API key hoặc local Ollama.
            </p>
          </div>
          <button
            className="secondary-btn"
            onClick={() => setIsDevMode(!isDevMode)}
            style={{ padding: 'var(--space-1) var(--space-3)', fontSize: 'var(--fs-xs)' }}
          >
            {isDevMode ? 'Thu Gọn' : 'Mở Cấu Hình'}
          </button>
        </div>

        {isDevMode && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', paddingTop: 'var(--space-2)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <label style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--text-secondary)' }}>
                Chọn Nhà Cung Cấp:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 'var(--space-2)' }}>
                {(['openrouter', 'ollama_cloud', 'google_ai_studio', 'ollama_local'] as AIProvider[]).map((p) => (
                  <button
                    key={p}
                    className={`secondary-btn ${devProvider === p ? 'active' : ''}`}
                    style={{
                      borderColor: devProvider === p ? 'var(--primary)' : 'var(--border)',
                      background: devProvider === p ? 'var(--primary-subtle)' : 'var(--bg-surface)',
                      color: devProvider === p ? 'var(--primary-text)' : 'var(--text-primary)',
                      fontWeight: 700,
                      justifyContent: 'center',
                      padding: 'var(--space-2)',
                      fontSize: 'var(--fs-xs)',
                    }}
                    onClick={() => {
                      setDevProvider(p);
                      if (p === 'openrouter') setDevModel('anthropic/claude-3.5-sonnet');
                      if (p === 'google_ai_studio') setDevModel('gemini-2.0-flash');
                      if (p === 'ollama_cloud' || p === 'ollama_local') setDevModel('qwen2.5');
                    }}
                  >
                    {p === 'openrouter' && 'OpenRouter'}
                    {p === 'ollama_cloud' && 'Ollama Cloud'}
                    {p === 'google_ai_studio' && 'Google AI'}
                    {p === 'ollama_local' && 'Ollama Local'}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <label style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--text-secondary)' }}>
                API Key Tùy Chỉnh (Tùy chọn, để trống sẽ dùng Master Key):
              </label>
              <input
                type="password"
                value={devApiKey}
                onChange={(e) => setDevApiKey(e.target.value)}
                placeholder="sk-or-... / AIzaSy... (để trống nếu dùng Master Key)"
                style={{
                  padding: 'var(--space-3)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-input)',
                  color: 'var(--text-primary)',
                  fontFamily: 'monospace',
                  fontSize: 'var(--fs-sm)',
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <label style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  Mô Hình (Model):
                </label>
                {availablePresetModels.length > 0 ? (
                  <select
                    value={devModel}
                    onChange={(e) => setDevModel(e.target.value)}
                    style={{
                      padding: 'var(--space-3)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border)',
                      background: 'var(--bg-input)',
                      color: 'var(--text-primary)',
                      fontSize: 'var(--fs-sm)',
                    }}
                  >
                    {availablePresetModels.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.id})
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={devModel}
                    onChange={(e) => setDevModel(e.target.value)}
                    placeholder="e.g., qwen2.5, llama3"
                    style={{
                      padding: 'var(--space-3)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border)',
                      background: 'var(--bg-input)',
                      color: 'var(--text-primary)',
                      fontSize: 'var(--fs-sm)',
                    }}
                  />
                )}
              </div>

              {(devProvider === 'ollama_local' || devProvider === 'openrouter' || devProvider === 'ollama_cloud') && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <label style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    Base URL (Endpoint tùy chỉnh):
                  </label>
                  <input
                    type="text"
                    value={devBaseUrl}
                    onChange={(e) => setDevBaseUrl(e.target.value)}
                    placeholder={devProvider === 'ollama_local' ? 'http://localhost:11434' : 'Mặc định nhà cung cấp'}
                    style={{
                      padding: 'var(--space-3)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border)',
                      background: 'var(--bg-input)',
                      color: 'var(--text-primary)',
                      fontSize: 'var(--fs-sm)',
                    }}
                  />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', flexWrap: 'wrap', marginTop: 'var(--space-2)' }}>
              <button className="primary-btn" onClick={handleSaveDevOverride}>
                Lưu Override
              </button>
              <button
                className="secondary-btn"
                onClick={handleTestDevPing}
                disabled={isTestingDev}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)' }}
              >
                <RefreshIcon size={14} className={isTestingDev ? 'spinning' : ''} />
                {isTestingDev ? 'Đang test...' : 'Test Cấu Hình Này'}
              </button>
              <button
                className="secondary-btn"
                onClick={handleResetToMaster}
                style={{ color: 'var(--coral-text)', borderColor: 'var(--coral-subtle)' }}
              >
                Xóa Override (Về Master)
              </button>

              {devPingResult && (
                <span
                  className={`badge ${devPingResult.success ? 'badge-emerald' : 'badge-coral'}`}
                  style={{ padding: '6px 10px', fontSize: 'var(--fs-xs)' }}
                >
                  {devPingResult.success ? `✓ ${devPingResult.latencyMs}ms — Thành công` : `✕ ${devPingResult.message}`}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

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
