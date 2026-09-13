import { masterKeyPool, transcribeWithGroq } from '../../../services/ai';

export interface TranscribeResult {
  transcript: string | null;
  mode: 'groq_whisper' | 'gemini_multimodal';
  durationSeconds?: number;
  words?: Array<{ word: string; start: number; end: number }>;
  latencyMs?: number;
}

/**
 * Pluggable Audio Transcriber:
 * - If a Groq API key is present: runs Groq Whisper (whisper-large-v3-turbo) for pristine verbatim ASR
 *   with exact word timestamps and zero LLM auto-correction bias.
 * - Otherwise: gracefully delegates to Single-Shot Multimodal Gemini 3.5 Flash Lite.
 */
export async function transcribeSpeakingAudio(audioBlob: Blob): Promise<TranscribeResult> {
  const groqKey = masterKeyPool.getKey('groq');

  if (groqKey) {
    try {
      const startTime = performance.now();
      const res = await transcribeWithGroq(audioBlob, groqKey);
      const latencyMs = Math.round(performance.now() - startTime);
      return {
        transcript: res.text,
        mode: 'groq_whisper',
        durationSeconds: res.duration,
        words: res.words,
        latencyMs,
      };
    } catch (err) {
      console.warn('Groq Whisper ASR failed, falling back to Gemini Multimodal:', err);
    }
  }

  // Fallback: Gemini direct multimodal
  return {
    transcript: null,
    mode: 'gemini_multimodal',
  };
}
