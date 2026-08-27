import { useState, useCallback, useRef, useEffect } from 'react';

export interface NotificationMessage {
  text: string;
  type: 'success' | 'error' | 'info';
}

/**
 * Lightweight notification hook for toast alerts and feedback.
 * Ported from Campfire's useNotification.
 */
export function useNotification() {
  const [statusMessage, setStatusMessage] = useState<NotificationMessage | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearNotification = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setStatusMessage(null);
  }, []);

  const showNotification = useCallback((text: string, type: 'success' | 'error' | 'info' = 'success', duration = 3500) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setStatusMessage({ text, type });

    timeoutRef.current = setTimeout(() => {
      setStatusMessage(null);
      timeoutRef.current = null;
    }, duration);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    statusMessage,
    showNotification,
    clearNotification,
  };
}
