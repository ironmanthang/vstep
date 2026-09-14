import React, { useState, Suspense } from 'react';
import type { MockTest } from '../types/schemas';
import { ALL_MOCK_TESTS } from '../data/mock-tests';
import { MockTestLobby } from '../features/mock-test/components/MockTestLobby';
import { MockTestResultDashboard } from '../features/mock-test/components/MockTestResultDashboard';
import { loadMockTestSession, clearMockTestSession } from '../features/mock-test/mockTestStorage';
import { useAuth } from '../services/supabase/authStore';
import { lazyWithRetry } from '../utils/lazyWithRetry';
import { ChunkErrorBoundary } from '../components/common/ChunkErrorBoundary';

// Lazy load full exam runner with automatic deploy-rotation self-healing
const FullMockTestRunner = lazyWithRetry(
  () =>
    import('../features/mock-test/FullMockTestRunner').then((module) => ({
      default: module.FullMockTestRunner,
    })),
  'full_mock_test_runner'
);

export const MockTestPage: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const [activeExamTest, setActiveExamTest] = useState<MockTest | null>(null);
  const [viewingResultTest, setViewingResultTest] = useState<MockTest | null>(null);

  const handleStartExam = (test: MockTest) => {
    setViewingResultTest(null);
    setActiveExamTest(test);
  };

  const handleViewPreviousResult = (test: MockTest) => {
    setActiveExamTest(null);
    setViewingResultTest(test);
  };

  const handleExitToLobby = () => {
    setActiveExamTest(null);
    setViewingResultTest(null);
  };

  const handleRetakeFromDashboard = (test: MockTest) => {
    clearMockTestSession(test.id, userId);
    setViewingResultTest(null);
    setActiveExamTest(test);
  };

  // 1. Active Exam Mode
  if (activeExamTest) {
    return (
      <ChunkErrorBoundary fallbackTitle="Không thể tải phòng thi máy tính" onReset={handleExitToLobby}>
        <Suspense
          fallback={
            <div className="card-surface" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--fs-lg)', fontWeight: 700 }}>Đang chuẩn bị phòng thi máy tính...</div>
              <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginTop: 4 }}>
                Khởi tạo đề thi {activeExamTest.title}
              </div>
            </div>
          }
        >
          <FullMockTestRunner test={activeExamTest} onExit={handleExitToLobby} />
        </Suspense>
      </ChunkErrorBoundary>
    );
  }

  // 2. Previous Result Dashboard Mode
  if (viewingResultTest) {
    const savedSession = loadMockTestSession(viewingResultTest.id, userId);

    if (savedSession && savedSession.compositeResult) {
      return (
        <MockTestResultDashboard
          test={viewingResultTest}
          session={savedSession}
          onRetake={() => handleRetakeFromDashboard(viewingResultTest)}
          onExit={handleExitToLobby}
        />
      );
    }
  }

  // 3. Lobby Mode (Default)
  return (
    <MockTestLobby
      tests={ALL_MOCK_TESTS}
      onStartExam={handleStartExam}
      onViewPreviousResult={handleViewPreviousResult}
    />
  );
};
