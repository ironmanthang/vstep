import React, { useState } from 'react';
import type { AIProvider, AIProviderConfig, AITestConnectionResult } from '../../services/ai';
import {
  testAIConnection,
  getDeveloperAIOverride,
  saveDeveloperAIOverride,
  clearDeveloperAIOverride,
  PRESET_MODELS,
} from '../../services/ai';
import { RefreshIcon } from '../../components/Icons';

interface DeveloperOverrideSectionProps {
  onNotify: (message: string, type?: 'info' | 'success' | 'error') => void;
}

export const DeveloperOverrideSection: React.FC<DeveloperOverrideSectionProps> = ({ onNotify }) => {
  const [isDevMode, setIsDevMode] = useState(() => Boolean(getDeveloperAIOverride()?.isCustomOverride));
  const [devProvider, setDevProvider] = useState<AIProvider>(() => getDeveloperAIOverride()?.provider || 'openrouter');
  const [devApiKey, setDevApiKey] = useState(() => getDeveloperAIOverride()?.apiKey || '');
  const [devBaseUrl, setDevBaseUrl] = useState(() => getDeveloperAIOverride()?.baseUrl || '');
  const [devModel, setDevModel] = useState(() => getDeveloperAIOverride()?.modelName || 'anthropic/claude-3.5-sonnet');
  const [isTestingDev, setIsTestingDev] = useState(false);
  const [devPingResult, setDevPingResult] = useState<AITestConnectionResult | null>(null);

  const availablePresetModels = PRESET_MODELS.filter(m => m.provider === devProvider);

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
        onNotify(`Kết nối tùy chỉnh thành công (${result.latencyMs}ms)`, 'success');
      } else {
        onNotify(result.message, 'error');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Lỗi kết nối';
      onNotify(msg, 'error');
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
    onNotify('Đã lưu cấu hình Developer Override thành công!', 'success');
  };

  const handleResetToMaster = () => {
    clearDeveloperAIOverride();
    setIsDevMode(false);
    setDevApiKey('');
    setDevBaseUrl('');
    setDevModel('anthropic/claude-3.5-sonnet');
    setDevPingResult(null);
    onNotify('Đã khôi phục về Master AI Gateway mặc định!', 'info');
  };

  return (
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
  );
};
