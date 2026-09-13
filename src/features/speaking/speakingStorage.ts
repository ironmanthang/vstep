import { getUserStorageKey } from '../../services/storage/userStorage';
import type { SpeakingBand } from './services/speakingTier3';

export type SpeakingMode = 'practice' | 'exam';

export interface SpeakingCriteriaScores {
  pronunciation: number;         // 0.0 - 10.0
  fluency_coherence: number;     // 0.0 - 10.0
  grammar_vocabulary: number;    // 0.0 - 10.0
  task_fulfillment: number;      // 0.0 - 10.0
}

export interface PhoneticErrorItem {
  word: string;
  expected_ipa: string;
  detected_error: string;
  explanation_vi: string;
  severity?: 'low' | 'medium' | 'critical';
}

export interface PartEvaluation {
  partIndex: number;
  partTitle: string;
  criteriaScores: SpeakingCriteriaScores;
  partScore: number;
  transcript: string;
  detectedWpm: number;
  promptCoverage: string;
  priorityActionItems: string[];
  phoneticErrors: PhoneticErrorItem[];
  justifications: {
    pronunciation: string;
    fluency_coherence: string;
    grammar_vocabulary: string;
    task_fulfillment: string;
  };
  aiFixedB1Speech: string;
  sampleResponse?: {
    band?: string;
    text: string;
    analysis_vi?: string;
  };
}

export interface SpeakingEvaluationResult {
  part1?: PartEvaluation;
  part2?: PartEvaluation;
  part3?: PartEvaluation;
  compositeScore: {
    rawScore: number;
    roundedScore: number;
    band: SpeakingBand;
    isB1Passed: boolean;
  };
  evaluatedAt: number;
}

export interface StoredSpeakingSession {
  activePart: 1 | 2 | 3;
  completedParts: number[];
  secondsRemaining: number;
  isSubmitted: boolean;
  evaluationResult: SpeakingEvaluationResult | null;
  audioDurations: Record<number, number>;
  savedAt: number;
}

const DB_NAME = 'vstep_speaking_db';
const DB_VERSION = 1;
const AUDIO_STORE_NAME = 'audio_blobs';

function openIndexedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      return reject(new Error('IndexedDB is not supported in this browser'));
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(AUDIO_STORE_NAME)) {
        db.createObjectStore(AUDIO_STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function getAudioKey(testId: string, partIndex: number): string {
  return `${testId}_part_${partIndex}`;
}

/**
 * Save raw binary audio Blob to IndexedDB.
 * Strictly avoids localStorage to prevent 5MB quota errors.
 */
export async function saveAudioBlob(testId: string, partIndex: number, blob: Blob): Promise<void> {
  const db = await openIndexedDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(AUDIO_STORE_NAME, 'readwrite');
    const store = tx.objectStore(AUDIO_STORE_NAME);
    const req = store.put(blob, getAudioKey(testId, partIndex));

    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
    tx.oncomplete = () => db.close();
  });
}

/**
 * Retrieve raw audio Blob from IndexedDB by testId and partIndex.
 */
export async function getAudioBlob(testId: string, partIndex: number): Promise<Blob | null> {
  try {
    const db = await openIndexedDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(AUDIO_STORE_NAME, 'readonly');
      const store = tx.objectStore(AUDIO_STORE_NAME);
      const req = store.get(getAudioKey(testId, partIndex));

      req.onsuccess = () => resolve((req.result as Blob) || null);
      req.onerror = () => reject(req.error);
      tx.oncomplete = () => db.close();
    });
  } catch {
    return null;
  }
}

/**
 * Get all available audio Blobs for a given testId.
 */
export async function getAllAudioBlobs(testId: string): Promise<Record<number, Blob>> {
  const result: Record<number, Blob> = {};
  for (const part of [1, 2, 3]) {
    const b = await getAudioBlob(testId, part);
    if (b) {
      result[part] = b;
    }
  }
  return result;
}

/**
 * Delete all audio Blobs for a given testId.
 */
export async function clearSpeakingAudio(testId: string): Promise<void> {
  try {
    const db = await openIndexedDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(AUDIO_STORE_NAME, 'readwrite');
      const store = tx.objectStore(AUDIO_STORE_NAME);
      for (const part of [1, 2, 3]) {
        store.delete(getAudioKey(testId, part));
      }
      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    // Ignore clear errors
  }
}

// Session Metadata Storage (Lightweight JSON metadata only, zero audio blobs)
export function getSpeakingStorageKey(testId: string, mode: SpeakingMode, userId?: string): string {
  if (userId) {
    return getUserStorageKey(userId, `speaking_session_${testId}_${mode}`);
  }
  return `vstep_speaking_session_${testId}_${mode}`;
}

export function loadSpeakingSession(
  testId: string,
  mode: SpeakingMode,
  userId?: string
): StoredSpeakingSession | null {
  try {
    if (typeof localStorage === 'undefined') return null;
    const raw = localStorage.getItem(getSpeakingStorageKey(testId, mode, userId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredSpeakingSession;
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveSpeakingSession(
  testId: string,
  mode: SpeakingMode,
  session: Omit<StoredSpeakingSession, 'savedAt'>,
  userId?: string
): void {
  try {
    if (typeof localStorage === 'undefined') return;
    const payload: StoredSpeakingSession = {
      ...session,
      savedAt: Date.now(),
    };
    localStorage.setItem(getSpeakingStorageKey(testId, mode, userId), JSON.stringify(payload));
  } catch {
    // Ignore storage quota or access errors
  }
}

export function clearSpeakingSession(testId: string, mode: SpeakingMode, userId?: string): void {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(getSpeakingStorageKey(testId, mode, userId));
  } catch {
    // Ignore storage errors
  }
}
