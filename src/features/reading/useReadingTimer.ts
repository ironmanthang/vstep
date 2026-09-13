import { useState, useEffect, useRef } from 'react';

interface UseReadingTimerOptions {
  isExam: boolean;
  durationMinutes: number | undefined;
  isSubmitted: boolean;
  onAutoSubmit: () => void;
}

export function useReadingTimer({
  isExam,
  durationMinutes,
  isSubmitted,
  onAutoSubmit,
}: UseReadingTimerOptions) {
  const initialExamSeconds = durationMinutes ? durationMinutes * 60 : 3600;
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [examSecondsRemaining, setExamSecondsRemaining] = useState<number>(initialExamSeconds);

  const autoSubmitRef = useRef(onAutoSubmit);
  useEffect(() => {
    autoSubmitRef.current = onAutoSubmit;
  }, [onAutoSubmit]);

  // Timer Tick
  useEffect(() => {
    if (isSubmitted) return;

    const timerId = setInterval(() => {
      if (isExam) {
        setExamSecondsRemaining((prev) => Math.max(0, prev - 1));
      } else {
        setElapsedSeconds((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [isSubmitted, isExam]);

  // Auto-submit when exam time expires
  useEffect(() => {
    if (isExam && !isSubmitted && examSecondsRemaining === 0) {
      queueMicrotask(() => {
        autoSubmitRef.current();
      });
    }
  }, [isExam, isSubmitted, examSecondsRemaining]);

  const resetTimer = () => {
    setElapsedSeconds(0);
    setExamSecondsRemaining(initialExamSeconds);
  };

  return {
    elapsedSeconds,
    examSecondsRemaining,
    resetTimer,
  };
}
