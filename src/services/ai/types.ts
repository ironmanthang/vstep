// TypeScript interfaces for VSTEP Master AI Service Layer
// Standardized contract for OpenRouter, Ollama Cloud, and Google AI Studio

export type AIProvider = 'openrouter' | 'ollama_cloud' | 'google_ai_studio' | 'ollama_local' | 'groq';

export interface AIProviderConfig {
  provider: AIProvider;
  apiKey?: string;
  baseUrl?: string;
  modelName: string;
  isCustomOverride?: boolean;
}

export interface AICompletionRequest {
  systemPrompt: string;
  userPrompt: string;
  audioBlob?: Blob;
  temperature?: number;
  responseSchema?: Record<string, unknown>;
  maxTokens?: number;
}

export interface AICompletionResponse {
  content: string;
  parsedJson?: unknown;
  providerUsed: AIProvider;
  modelUsed: string;
  latencyMs: number;
}

export interface AudioTranscriptionResult {
  text: string;
  duration?: number;
  words?: Array<{ word: string; start: number; end: number }>;
  providerUsed: AIProvider;
  latencyMs: number;
}

export interface AITestConnectionResult {
  success: boolean;
  message: string;
  latencyMs: number;
  provider: AIProvider;
  model: string;
  details?: string;
}

export interface AIGatewayStatus {
  status: 'ready' | 'degraded' | 'offline';
  activeProvider: AIProvider;
  activeModel: string;
  isOverrideActive: boolean;
  poolCount: number;
}

export interface AIModelOption {
  id: string;
  name: string;
  provider: AIProvider;
  description: string;
  badge?: string;
}
