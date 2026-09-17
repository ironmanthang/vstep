import { createContext, useContext, useEffect } from 'react';

export interface DictionaryPosition {
  x: number;
  y: number;
  bottom?: number;
}

export interface DictionaryContextValue {
  lookupWord: (word: string, position: DictionaryPosition) => void;
  closeDictionary: () => void;
  isOpen: boolean;
  activeWord: string | null;
  activePosition: DictionaryPosition | null;
  isExamLocked: boolean;
  lockExam: () => void;
  unlockExam: () => void;
}

export const DictionaryContext = createContext<DictionaryContextValue | null>(null);

export function useDictionary(): DictionaryContextValue {
  const ctx = useContext(DictionaryContext);
  if (!ctx) {
    throw new Error('useDictionary must be used within a DictionaryProvider');
  }
  return ctx;
}

/**
 * Reference-counted exam guard hook.
 * When isLocked is true, increments the provider's lock count on mount,
 * completely blocking tap-to-translate. Decrements on unmount or when isLocked becomes false.
 */
export function useDictionaryExamLock(isLocked: boolean = true): void {
  const dict = useContext(DictionaryContext);
  useEffect(() => {
    if (!dict || !isLocked) return;
    dict.lockExam();
    return () => {
      dict.unlockExam();
    };
  }, [dict, isLocked]);
}
