import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { MockTest } from '../../types/schemas';
import type {
  MockTestSession,
  MockTestSkillSection,
  MockTestHistoryRecord,
} from './types';
import type { ListeningScoreResult } from '../listening/types';
import type { ReadingScoreResult } from '../reading/types';
import type { WritingEvaluationResult } from '../writing/writingStorage';
import type { SpeakingEvaluationResult } from '../speaking/speakingStorage';
import type { WritingTestInput } from '../writing/WritingRunner';

import { ListeningRunner } from '../listening/ListeningRunner';
import { ReadingRunner } from '../reading/ReadingRunner';
import { WritingRunner } from '../writing/WritingRunner';
import { SpeakingRunner } from '../speaking/SpeakingRunner';

import { MockTestHeader } from './components/MockTestHeader';
import { MockTestDistractionBanner } from './components/MockTestDistractionBanner';
import { MockTestTransitionModal } from './components/MockTestTransitionModal';
import { MockTestResultDashboard } from './components/MockTestResultDashboard';
import { ConfirmModal } from '../../components/common/ConfirmModal';

import { calculateMockTestComposite } from './services/mockTestScoring';
import {
  loadMockTestSession,
  saveMockTestSession,
  clearMockTestSession,
  saveMockTestHistoryRecord,
} from './mockTestStorage';
import { useAuth } from '../../services/supabase/authStore';
import { useUserStore } from '../../services/user/userStore';
import { upsertTestSubmission } from '../../services/supabase/testSubmissionSync';
import { recordMockTestInCloud } from '../../services/supabase/profileSync';
import { useDictionaryExamLock } from '../dictionary';
import './FullMockTestRunner.css';

interface FullMockTestRunnerProps {
  test: MockTest;
  onExit: () => void;
}

const TOTAL_EXAM_SECONDS = 180 * 60; // 10,800 seconds

export const FullMockTestRunner: React.FC<FullMockTestRunnerProps> = ({
  test,
  onExit,
}) => {
  const { user } = useAuth();
  const userId = user?.id;
  const { recordMockTestResult } = useUserStore();

  const [session, setSession] = useState<MockTestSession>(() => {
    const saved = loadMockTestSession(test.id, userId);
    if (saved) return saved;

    return {
      testId: test.id,
      activeSection: 'listening',
      completedSections: [],
      startedAt: Date.now(),
      totalSecondsRemaining: TOTAL_EXAM_SECONDS,
      blurCount: 0,
      listeningResult: null,
      readingResult: null,
      writingResult: null,
      speakingResult: null,
      compositeResult: null,
      isSubmitted: false,
    };
  });

  const [transitionState, setTransitionState] = useState<{
    isOpen: boolean;
    completedSection: MockTestSkillSection;
    nextSection: MockTestSkillSection | null;
  }>({
    isOpen: false,
    completedSection: 'listening',
    nextSection: 'reading',
  });

  const [isConfirmEarlyModalOpen, setIsConfirmEarlyModalOpen] = useState(false);
  const isExamActive = !session.isSubmitted && session.activeSection !== 'result';
  useDictionaryExamLock(isExamActive);

  // Periodic Auto-save
  useEffect(() => {
    saveMockTestSession(session, userId);
  }, [session, userId]);

  const handleBlurDetected = useCallback(() => {
    setSession((prev) => ({ ...prev, blurCount: prev.blurCount + 1 }));
  }, []);

  // Compute final composite score across completed skills
  const finalizeExam = useCallback(
    async (currentSession: MockTestSession) => {
      const listeningScore = currentSession.listeningResult?.scoreOutOf10 || 0;
      const readingScore = currentSession.readingResult?.scoreOutOf10 || 0;
      const writingScore = currentSession.writingResult?.compositeScore.roundedScore || 0;
      const speakingScore = currentSession.speakingResult?.compositeScore.roundedScore || 0;

      const composite = calculateMockTestComposite({
        listeningScore,
        readingScore,
        writingScore,
        speakingScore,
        blurCount: currentSession.blurCount,
      });

      const updatedSession: MockTestSession = {
        ...currentSession,
        compositeResult: composite,
        isSubmitted: true,
        activeSection: 'result',
      };

      setSession(updatedSession);
      saveMockTestSession(updatedSession, userId);

      // Save to local history
      const historyRecord: MockTestHistoryRecord = {
        id: `mock_history_${test.id}_${Date.now()}`,
        testId: test.id,
        testTitle: test.title,
        overallScore: composite.roundedOverall,
        band: composite.bandInfo.band,
        bandNameVi: composite.bandInfo.bandNameVi,
        listeningScore,
        readingScore,
        writingScore,
        speakingScore,
        blurCount: currentSession.blurCount,
        completedAt: composite.completedAt,
        dateStr: new Date(composite.completedAt).toISOString().slice(0, 10),
      };
      saveMockTestHistoryRecord(historyRecord, userId);

      // Cloud profile synchronization
      recordMockTestResult(test.id, composite.roundedOverall, composite.bandInfo.bandNameVi);

      if (userId) {
        recordMockTestInCloud(userId, {
          test_id: test.id,
          score: composite.roundedOverall,
          achieved_band: composite.bandInfo.bandNameVi,
          timestamp: composite.completedAt,
          date_str: historyRecord.dateStr,
        });

        upsertTestSubmission({
          user_id: userId,
          test_id: test.id,
          skill: 'mock_test',
          mode: 'exam',
          score: composite.roundedOverall,
          correct_count: (currentSession.listeningResult?.correctCount || 0) + (currentSession.readingResult?.correctCount || 0),
          total_questions: 75,
          time_spent_seconds: TOTAL_EXAM_SECONDS - currentSession.totalSecondsRemaining,
          answers: {},
          notes: {},
          flagged_questions: [],
          completed_at: new Date(composite.completedAt).toISOString(),
        });
      }
    },
    [test, userId, recordMockTestResult]
  );

  // Overall 180-min countdown timer
  useEffect(() => {
    if (!isExamActive) return;

    const timer = setInterval(() => {
      setSession((prev) => {
        if (prev.totalSecondsRemaining <= 1) {
          clearInterval(timer);
          queueMicrotask(() => {
            finalizeExam(prev);
          });
          return { ...prev, totalSecondsRemaining: 0 };
        }
        return { ...prev, totalSecondsRemaining: prev.totalSecondsRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamActive, finalizeExam]);

  // Section completion callbacks
  const handleListeningComplete = useCallback((result: ListeningScoreResult) => {
    setSession((prev) => {
      const nextCompleted = Array.from(new Set([...prev.completedSections, 'listening' as MockTestSkillSection]));
      return {
        ...prev,
        listeningResult: result,
        completedSections: nextCompleted,
      };
    });

    setTransitionState({
      isOpen: true,
      completedSection: 'listening',
      nextSection: 'reading',
    });
  }, []);

  const handleReadingComplete = useCallback((result: ReadingScoreResult) => {
    setSession((prev) => {
      const nextCompleted = Array.from(new Set([...prev.completedSections, 'reading' as MockTestSkillSection]));
      return {
        ...prev,
        readingResult: result,
        completedSections: nextCompleted,
      };
    });

    setTransitionState({
      isOpen: true,
      completedSection: 'reading',
      nextSection: 'writing',
    });
  }, []);

  const handleWritingComplete = useCallback((result: WritingEvaluationResult) => {
    setSession((prev) => {
      const nextCompleted = Array.from(new Set([...prev.completedSections, 'writing' as MockTestSkillSection]));
      return {
        ...prev,
        writingResult: result,
        completedSections: nextCompleted,
      };
    });

    setTransitionState({
      isOpen: true,
      completedSection: 'writing',
      nextSection: 'speaking',
    });
  }, []);

  const handleSpeakingComplete = useCallback(
    (result: SpeakingEvaluationResult) => {
      setSession((prev) => {
        const nextCompleted = Array.from(new Set([...prev.completedSections, 'speaking' as MockTestSkillSection]));
        const updated = {
          ...prev,
          speakingResult: result,
          completedSections: nextCompleted,
        };
        finalizeExam(updated);
        return updated;
      });
    },
    [finalizeExam]
  );

  const handleProceedFromTransition = () => {
    const next = transitionState.nextSection;
    setTransitionState((prev) => ({ ...prev, isOpen: false }));
    if (next) {
      setSession((prev) => ({ ...prev, activeSection: next }));
    } else {
      finalizeExam(session);
    }
  };

  const handleEarlySubmitConfirm = () => {
    setIsConfirmEarlyModalOpen(false);
    finalizeExam(session);
  };

  const handleRetake = () => {
    clearMockTestSession(test.id, userId);
    setSession({
      testId: test.id,
      activeSection: 'listening',
      completedSections: [],
      startedAt: Date.now(),
      totalSecondsRemaining: TOTAL_EXAM_SECONDS,
      blurCount: 0,
      listeningResult: null,
      readingResult: null,
      writingResult: null,
      speakingResult: null,
      compositeResult: null,
      isSubmitted: false,
    });
  };

  const writingTestInput: WritingTestInput = useMemo(
    () => ({
      id: `${test.id}_writing`,
      test_number: test.test_number,
      title: `${test.title} - Phần thi Viết`,
      institution: test.institution,
      total_duration_minutes: 60,
      task1: test.writing.task1,
      task2: test.writing.task2,
    }),
    [test]
  );

  return (
    <div className="mock-test-runner-container">
      {/* Distraction warning banner */}
      <MockTestDistractionBanner
        isActive={isExamActive}
        blurCount={session.blurCount}
        onBlurDetected={handleBlurDetected}
      />

      {/* Top Header */}
      {session.activeSection !== 'result' && (
        <MockTestHeader
          testTitle={test.title}
          activeSection={session.activeSection}
          completedSections={session.completedSections}
          totalSecondsRemaining={session.totalSecondsRemaining}
          blurCount={session.blurCount}
          onEarlySubmit={() => setIsConfirmEarlyModalOpen(true)}
          onExit={onExit}
        />
      )}

      {/* Main Section Content */}
      <main style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        {session.activeSection === 'listening' && (
          <ListeningRunner
            test={test.listening}
            mode="exam"
            onComplete={handleListeningComplete}
          />
        )}

        {session.activeSection === 'reading' && (
          <ReadingRunner
            test={test.reading}
            mode="exam"
            onComplete={handleReadingComplete}
          />
        )}

        {session.activeSection === 'writing' && (
          <WritingRunner
            test={writingTestInput}
            mode="exam"
            userId={userId}
            onComplete={handleWritingComplete}
            onExit={onExit}
          />
        )}

        {session.activeSection === 'speaking' && (
          <SpeakingRunner
            test={test.speaking}
            mode="exam"
            userId={userId}
            onComplete={handleSpeakingComplete}
            onExit={onExit}
          />
        )}

        {session.activeSection === 'result' && (
          <MockTestResultDashboard
            test={test}
            session={session}
            onRetake={handleRetake}
            onExit={onExit}
          />
        )}
      </main>

      {/* Section Transition Modal */}
      <MockTestTransitionModal
        isOpen={transitionState.isOpen}
        completedSection={transitionState.completedSection}
        nextSection={transitionState.nextSection}
        onProceed={handleProceedFromTransition}
      />

      {/* Early Submit Confirmation Modal */}
      <ConfirmModal
        isOpen={isConfirmEarlyModalOpen}
        title="Nộp Toàn Bộ Bài Thi Sớm?"
        description="Bạn có chắc chắn muốn nộp toàn bộ bài thi ngay bây giờ? Các phần thi chưa hoàn thành sẽ được tính là 0 điểm."
        confirmLabel="Nộp Bài Ngay"
        cancelLabel="Tiếp Tục Thi"
        onConfirm={handleEarlySubmitConfirm}
        onClose={() => setIsConfirmEarlyModalOpen(false)}
      />
    </div>
  );
};
