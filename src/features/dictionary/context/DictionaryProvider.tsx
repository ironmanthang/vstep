import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
  Suspense,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import {
  DictionaryContext,
  type DictionaryPosition,
  type DictionaryContextValue,
} from './DictionaryContext';
import { getWordAtCoordinates, sanitizeLookupWord } from '../utils/wordCoordinates';

const LazyDictionaryTooltip = React.lazy(() =>
  import('../components/DictionaryTooltip').then((m) => ({ default: m.DictionaryTooltip }))
);

interface DictionaryProviderProps {
  children: ReactNode;
}

interface TouchTracking {
  startX: number;
  startY: number;
  startTime: number;
  target: HTMLElement;
  timerId?: ReturnType<typeof setTimeout>;
}

export const DictionaryProvider: React.FC<DictionaryProviderProps> = ({ children }) => {
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [activePosition, setActivePosition] = useState<DictionaryPosition | null>(null);
  const [examLockCount, setExamLockCount] = useState<number>(0);

  const isExamLocked = examLockCount > 0;

  const lockExam = useCallback(() => {
    setExamLockCount((c) => c + 1);
    setActiveWord(null);
    setActivePosition(null);
  }, []);

  const unlockExam = useCallback(() => {
    setExamLockCount((c) => Math.max(0, c - 1));
  }, []);

  const lastClosedAtRef = useRef<number>(0);

  const closeDictionary = useCallback(() => {
    lastClosedAtRef.current = Date.now();
    setActiveWord(null);
    setActivePosition(null);
    if (typeof window !== 'undefined') {
      window.getSelection()?.removeAllRanges();
    }
  }, []);

  const effectiveWord = isExamLocked ? null : activeWord;
  const effectivePosition = isExamLocked ? null : activePosition;

  const lookupWord = useCallback(
    (word: string, position: DictionaryPosition) => {
      if (isExamLocked) return;
      const clean = sanitizeLookupWord(word);
      if (!clean) return;
      setActiveWord(clean);
      setActivePosition(position);
    },
    [isExamLocked]
  );

  // Touch tracking references
  const touchTrackRef = useRef<TouchTracking | null>(null);
  const longPressConsumedRef = useRef<boolean>(false);
  const lastTapRef = useRef<{ time: number; x: number; y: number } | null>(null);

  // Helper to determine if target should be ignored
  const shouldIgnoreElement = useCallback((target: EventTarget | null): boolean => {
    if (!(target instanceof HTMLElement)) return true;

    // Ignore form inputs, editable areas, and dialog controls
    if (
      target.closest(
        'input, textarea, select, [contenteditable="true"], .dictionary-tooltip-overlay, .dictionary-tooltip-card, [data-no-translate], .no-translate'
      )
    ) {
      return true;
    }

    // Ignore navigation bars, audio player scrubbers, and generic modal close buttons
    if (
      target.closest(
        'nav, .navbar, .reader-toolbar, .custom-audio-player, .audio-player-wrapper, .audio-scrubber-track'
      )
    ) {
      return true;
    }

    return false;
  }, []);

  // Helper to check if target is an option choice button
  const getOptionButton = useCallback((target: EventTarget | null): HTMLElement | null => {
    if (!(target instanceof HTMLElement)) return null;
    return target.closest<HTMLElement>('.rq-option-row, .option-choice-btn');
  }, []);

  // 1. Desktop Text Selection Listener (mouseup)
  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      if (isExamLocked || shouldIgnoreElement(e.target)) return;
      if (Date.now() - lastClosedAtRef.current < 250) return;

      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) return;

      const selectedText = selection.toString().trim();
      if (
        selectedText &&
        selectedText.length <= 32 &&
        !selectedText.includes(' ') &&
        !selectedText.includes('\n')
      ) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        lookupWord(selectedText, {
          x: rect.left + rect.width / 2,
          y: rect.top,
          bottom: rect.bottom,
        });
      }
    };

    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [isExamLocked, shouldIgnoreElement, lookupWord]);

  // 2. Desktop Double Click Listener (dblclick)
  useEffect(() => {
    const handleDoubleClick = (e: MouseEvent) => {
      if (isExamLocked || shouldIgnoreElement(e.target)) return;

      // Check if text was selected or resolve via coordinate hit-testing
      const selection = window.getSelection();
      const selectedText = selection?.toString().trim();

      if (selectedText && selectedText.length <= 32 && !selectedText.includes(' ')) {
        const range = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
        const rect = range ? range.getBoundingClientRect() : null;
        lookupWord(selectedText, {
          x: rect ? rect.left + rect.width / 2 : e.clientX,
          y: rect ? rect.top : e.clientY,
          bottom: rect ? rect.bottom : e.clientY + 22,
        });
        return;
      }

      // Coordinate-based resolution fallback
      const resolved = getWordAtCoordinates(e.clientX, e.clientY);
      if (resolved) {
        lookupWord(resolved.word, {
          x: resolved.rect.left + resolved.rect.width / 2,
          y: resolved.rect.top,
          bottom: resolved.rect.bottom,
        });
      }
    };

    window.addEventListener('dblclick', handleDoubleClick);
    return () => window.removeEventListener('dblclick', handleDoubleClick);
  }, [isExamLocked, shouldIgnoreElement, lookupWord]);

  // 3. Mobile Touch Gestures (Single-tap on reading text, Long-press / Double-tap on option buttons)
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (isExamLocked || e.touches.length !== 1) return;
      const target = e.target;
      if (shouldIgnoreElement(target)) return;

      const touch = e.touches[0];
      const startX = touch.clientX;
      const startY = touch.clientY;
      const startTime = Date.now();
      longPressConsumedRef.current = false;

      const optionBtn = getOptionButton(target);

      // If touching an interactive option button during active practice, set up long-press timer (400ms)
      let timerId: ReturnType<typeof setTimeout> | undefined;
      if (optionBtn && !optionBtn.hasAttribute('disabled')) {
        timerId = setTimeout(() => {
          const resolved = getWordAtCoordinates(startX, startY);
          if (resolved) {
            longPressConsumedRef.current = true;
            lookupWord(resolved.word, {
              x: resolved.rect.left + resolved.rect.width / 2,
              y: resolved.rect.top,
              bottom: resolved.rect.bottom,
            });
            if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
              try {
                navigator.vibrate(25);
              } catch {
                // Ignore vibration errors
              }
            }
          }
        }, 400);
      }

      touchTrackRef.current = {
        startX,
        startY,
        startTime,
        target: target as HTMLElement,
        timerId,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchTrackRef.current || e.touches.length === 0) return;
      const touch = e.touches[0];
      const dx = touch.clientX - touchTrackRef.current.startX;
      const dy = touch.clientY - touchTrackRef.current.startY;

      // Cancel long-press if finger moved significantly (scroll or swipe)
      if (Math.hypot(dx, dy) > 8) {
        if (touchTrackRef.current.timerId) {
          clearTimeout(touchTrackRef.current.timerId);
          touchTrackRef.current.timerId = undefined;
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchTrackRef.current) return;
      const { startX, startY, startTime, target, timerId } = touchTrackRef.current;
      if (timerId) clearTimeout(timerId);
      touchTrackRef.current = null;

      // If long press was triggered, suppress the tap
      if (longPressConsumedRef.current) {
        longPressConsumedRef.current = false;
        return;
      }

      if (e.changedTouches.length === 0) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      const dt = Date.now() - startTime;

      // Ignore swipes and long holds that weren't captured
      if (Math.hypot(dx, dy) > 8 || dt > 450) return;

      const optionBtn = getOptionButton(target);
      const isOptionActive = optionBtn && !optionBtn.hasAttribute('disabled');

      // Check double-tap on option buttons
      const now = Date.now();
      const lastTap = lastTapRef.current;
      const isDoubleTap =
        lastTap &&
        now - lastTap.time < 350 &&
        Math.hypot(touch.clientX - lastTap.x, touch.clientY - lastTap.y) < 24;

      lastTapRef.current = { time: now, x: touch.clientX, y: touch.clientY };

      if (isOptionActive) {
        if (isDoubleTap) {
          // Double-tap on active option row: lookup word
          const resolved = getWordAtCoordinates(touch.clientX, touch.clientY);
          if (resolved) {
            lookupWord(resolved.word, {
              x: resolved.rect.left + resolved.rect.width / 2,
              y: resolved.rect.top,
              bottom: resolved.rect.bottom,
            });
          }
        }
        // Single tap on active option is intentionally left alone so button handles answer selection!
        return;
      }

      // Standard text (reading passage, question prompts, submitted options, transcripts, explanations)
      const resolved = getWordAtCoordinates(touch.clientX, touch.clientY);
      if (resolved) {
        lookupWord(resolved.word, {
          x: resolved.rect.left + resolved.rect.width / 2,
          y: resolved.rect.top,
          bottom: resolved.rect.bottom,
        });
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isExamLocked, shouldIgnoreElement, getOptionButton, lookupWord]);

  // Click capture listener to prevent option selection when double-clicking or long-pressing
  useEffect(() => {
    const handleClickCapture = (e: MouseEvent) => {
      // If user double-clicked (detail >= 2) on an option text, prevent selecting the option
      if (e.detail >= 2 && getOptionButton(e.target)) {
        e.stopPropagation();
      }
    };

    window.addEventListener('click', handleClickCapture, true);
    return () => window.removeEventListener('click', handleClickCapture, true);
  }, [getOptionButton]);

  const contextValue = useMemo<DictionaryContextValue>(
    () => ({
      lookupWord,
      closeDictionary,
      isOpen: Boolean(effectiveWord && effectivePosition),
      activeWord: effectiveWord,
      activePosition: effectivePosition,
      isExamLocked,
      lockExam,
      unlockExam,
    }),
    [
      lookupWord,
      closeDictionary,
      effectiveWord,
      effectivePosition,
      isExamLocked,
      lockExam,
      unlockExam,
    ]
  );

  return (
    <DictionaryContext.Provider value={contextValue}>
      {children}
      {typeof document !== 'undefined' &&
        effectiveWord &&
        effectivePosition &&
        createPortal(
          <Suspense fallback={null}>
            <LazyDictionaryTooltip
              word={effectiveWord}
              position={effectivePosition}
              onClose={closeDictionary}
            />
          </Suspense>,
          document.body
        )}
    </DictionaryContext.Provider>
  );
};
