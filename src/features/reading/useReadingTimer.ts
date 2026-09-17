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
  const [examSecondsRemaining, setExamSecondsRemaining] = useState<number>(initialExamSeconds);

  const autoSubmitRef = useRef(onAutoSubmit);
  useEffect(() => {
    autoSubmitRef.current = onAutoSubmit;
  }, [onAutoSubmit]);

  // Timer Tick - Active only during Exam mode
  useEffect(() => {
    if (isSubmitted || !isExam) return;

    const timerId = setInterval(() => {
      setExamSecondsRemaining((prev) => Math.max(0, prev - 1));
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
    setExamSecondsRemaining(initialExamSeconds);
  };

  return {
    examSecondsRemaining,
    resetTimer,
  };
}
