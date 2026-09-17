import { useState } from 'react';
import type { ReaderSettings } from './types';
import { loadUserItem, saveUserItem } from '../../services/storage/userStorage';

export const DEFAULT_READER_SETTINGS: ReaderSettings = {
  fontSize: 16,
};

export function useReaderSettings(userId?: string) {
  const [readerSettings, setReaderSettings] = useState<ReaderSettings>(() => {
    return loadUserItem<ReaderSettings>(
      userId || 'guest_reader',
      'reading_reader_settings',
      DEFAULT_READER_SETTINGS
    );
  });

  const updateReaderSettings = (updates: Partial<ReaderSettings>) => {
    setReaderSettings((prev) => {
      const next = { ...prev, ...updates };
      saveUserItem(userId || 'guest_reader', 'reading_reader_settings', next);
      return next;
    });
  };

  return { readerSettings, updateReaderSettings };
}
