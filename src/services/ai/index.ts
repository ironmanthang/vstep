// Unified AI Service Gateway Layer for VSTEP Master
import type {
  AIProviderConfig,
  AICompletionRequest,
  AICompletionResponse,
  AITestConnectionResult,
  AIGatewayStatus,
  AIModelOption,
} from './types';
import { masterKeyPool } from './masterKeys';
import { testOpenRouterConnection, generateOpenRouterCompletion, DEFAULT_OPENROUTER_MODEL } from './adapters/openrouter';
import { testOllamaConnection, generateOllamaCompletion, DEFAULT_OLLAMA_MODEL } from './adapters/ollama';
import { testGoogleAIConnection, generateGoogleAICompletion, DEFAULT_GOOGLE_MODEL } from './adapters/google';

export * from './types';
export * from './masterKeys';
export * from './quotaTracker';
export { transcribeWithGroq } from './adapters/groqWhisper';

const DEV_OVERRIDE_STORAGE_KEY = 'vstep_ai_dev_override';

export const PRESET_MODELS: AIModelOption[] = [
  {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'openrouter',
    description: 'Chuẩn Barem Bộ GD&ĐT, phân tích ngữ pháp & Vietlish xuất sắc',
    badge: 'Khuyên Dùng',
  },
  {
    id: 'google/gemini-2.0-flash-001',
    name: 'Gemini 2.0 Flash (OpenRouter)',
    provider: 'openrouter',
    description: 'Tốc độ phản hồi tức thì (<1s), chi phí tối ưu',
  },
  {
    id: 'openai/gpt-4o',
    name: 'GPT-4o',
    provider: 'openrouter',
    description: 'Mô hình đa phương thức hàng đầu OpenAI',
  },
  {
    id: 'gemini-3.5-flash-lite',
    name: 'Gemini 3.5 Flash Lite (Direct)',
    provider: 'google_ai_studio',
    description: 'Chấm trực tiếp từ Google AI Studio, hỗ trợ audio native, 500 RPD tối ưu chi phí',
    badge: 'Khuyên Dùng',
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'google_ai_studio',
    description: 'Khả năng suy luận sâu cho bài luận học thuật Task 2',
  },
  {
    id: 'qwen2.5',
    name: 'Qwen 2.5 (Ollama)',
    provider: 'ollama_cloud',
    description: 'Mô hình mã nguồn mở hiệu năng cao',
  },
  {
    id: 'llama3.2',
    name: 'Llama 3.2 (Ollama)',
    provider: 'ollama_cloud',
    description: 'Mô hình gọn nhẹ của Meta',
  },
];

/**
 * Get the default master AI configuration for students.
 */
export function getDefaultMasterConfig(): AIProviderConfig {
  return {
    provider: 'openrouter',
    modelName: DEFAULT_OPENROUTER_MODEL,
    isCustomOverride: false,
  };
}

function safeGetItem(key: string): string | null {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore storage errors
  }
}

function safeRemoveItem(key: string): void {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore storage errors
  }
}

/**
 * Read developer override configuration from localStorage if present.
 */
export function getDeveloperAIOverride(): AIProviderConfig | null {
  try {
    const raw = safeGetItem(DEV_OVERRIDE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AIProviderConfig;
    return parsed?.isCustomOverride ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Save developer override configuration to localStorage.
 */
export function saveDeveloperAIOverride(config: AIProviderConfig): void {
  safeSetItem(DEV_OVERRIDE_STORAGE_KEY, JSON.stringify({ ...config, isCustomOverride: true }));
}

/**
 * Clear developer override, reverting back to platform master gateway.
 */
export function clearDeveloperAIOverride(): void {
  safeRemoveItem(DEV_OVERRIDE_STORAGE_KEY);
}

/**
 * Resolve the effective AI configuration to use.
 */
export function getEffectiveAIConfig(): AIProviderConfig {
  const override = getDeveloperAIOverride();
  if (override && override.isCustomOverride) {
    return override;
  }
  return getDefaultMasterConfig();
}

/**
 * Perform a live health check / ping against an AI provider.
 */
export async function testAIConnection(customConfig?: AIProviderConfig): Promise<AITestConnectionResult> {
  const config = customConfig || getEffectiveAIConfig();

  switch (config.provider) {
    case 'openrouter':
      return testOpenRouterConnection(config);
    case 'ollama_cloud':
    case 'ollama_local':
      return testOllamaConnection(config);
    case 'google_ai_studio':
      return testGoogleAIConnection(config);
    default:
      return {
        success: false,
        message: `Nhà cung cấp không hợp lệ: ${(config as AIProviderConfig).provider}`,
        latencyMs: 0,
        provider: config.provider,
        model: config.modelName,
      };
  }
}

/**
 * Generate AI completion with automated key rotation and cross-provider fallback.
 */
export async function generateAICompletion(
  request: AICompletionRequest,
  customConfig?: AIProviderConfig
): Promise<AICompletionResponse> {
  const config = customConfig || getEffectiveAIConfig();

  try {
    return await executeProviderCompletion(config, request);
  } catch (err: unknown) {
    // If rate limited or server overloaded on non-custom mode, attempt fallback
    if (!config.isCustomOverride) {
      // Fallback 1: Try Ollama Cloud
      if (config.provider !== 'ollama_cloud') {
        try {
          const fallbackConfig: AIProviderConfig = {
            provider: 'ollama_cloud',
            modelName: DEFAULT_OLLAMA_MODEL,
          };
          return await executeProviderCompletion(fallbackConfig, request);
        } catch {
          // Continue to next fallback
        }
      }

      // Fallback 2: Try Google AI Studio if key exists
      if (config.provider !== 'google_ai_studio' && masterKeyPool.getKey('google_ai_studio')) {
        try {
          const fallbackConfig: AIProviderConfig = {
            provider: 'google_ai_studio',
            modelName: DEFAULT_GOOGLE_MODEL,
          };
          return await executeProviderCompletion(fallbackConfig, request);
        } catch {
          // Fall through to throw original error
        }
      }
    }

    throw err;
  }
}

async function executeProviderCompletion(
  config: AIProviderConfig,
  request: AICompletionRequest
): Promise<AICompletionResponse> {
  switch (config.provider) {
    case 'openrouter':
      return generateOpenRouterCompletion(config, request);
    case 'ollama_cloud':
    case 'ollama_local':
      return generateOllamaCompletion(config, request);
    case 'google_ai_studio':
      return generateGoogleAICompletion(config, request);
    default:
      throw new Error(`Nhà cung cấp không được hỗ trợ: ${(config as AIProviderConfig).provider}`);
  }
}

/**
 * Get current platform AI Gateway health and active status summary.
 */
export function getAIGatewayStatus(): AIGatewayStatus {
  const config = getEffectiveAIConfig();
  const poolCount = masterKeyPool.getPoolSize(config.provider);

  return {
    status: 'ready',
    activeProvider: config.provider,
    activeModel: config.modelName,
    isOverrideActive: Boolean(config.isCustomOverride),
    poolCount,
  };
}
