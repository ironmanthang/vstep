import React, { useState, useRef, useEffect } from 'react';
import type { ListeningTest, ListeningMode, ListeningScoreResult } from './types';
import { useAudioPlayer } from './useAudioPlayer';
import { CustomAudioPlayer } from './components/CustomAudioPlayer';
import { PassageGroupHeader } from './components/PassageGroupHeader';
import { QuestionCard } from './components/QuestionCard';
import { QuestionPalette } from './components/QuestionPalette';
import { useUserStore } from '../../services/user/userStore';
import { useAuth } from '../../services/supabase/authStore';
import { fetchTestSubmission, upsertTestSubmission, deleteTestSubmission } from '../../services/supabase/testSubmissionSync';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { getQuestionTranscriptContext } from './transcriptContext';
import {
  loadListeningSession,
  saveListeningSession,
  clearListeningSession,
  hydrateListeningSessionFromCloud,
} from './listeningStorage';
import './ListeningRunner.css';

function toggleInSet(set: Set<string>, item: string): Set<string> {
  const next = new Set(set);
  if (next.has(item)) next.delete(item);
  else next.add(item);
  return next;
}

interface ListeningRunnerProps {
  test: ListeningTest;
  mode?: ListeningMode;
  onComplete?: (result: ListeningScoreResult) => void;
}

export const ListeningRunner: React.FC<ListeningRunnerProps> = ({
  test,
  mode = 'practice',
  onComplete,
}) => {
  const isExam = mode === 'exam';
  const { user } = useAuth();
  const { recordStudyActivity, incrementExercisesCompleted } = useUserStore();

  const [initialSession] = useState(() => loadListeningSession(test.id, mode));
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>(
    () => initialSession?.answers ?? {}
  );
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(
    () => new Set(initialSession?.flaggedQuestions ?? [])
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(
    () => initialSession?.isSubmitted ?? false
  );
  const [scoreResult, setScoreResult] = useState<ListeningScoreResult | null>(
    () => initialSession?.scoreResult ?? null
  );
  const [notes, setNotes] = useState<Record<string, string>>(
    () => initialSession?.notes ?? {}
  );
  const [syncWarning, setSyncWarning] = useState<string | null>(null);
  const [expandedTranscripts, setExpandedTranscripts] = useState<Set<string>>(new Set());
  const [showVietnamese, setShowVietnamese] = useState<Record<string, boolean>>({});
  const [collapsedPassages, setCollapsedPassages] = useState<Set<string>>(new Set());
  const [collapsedQuestions, setCollapsedQuestions] = useState<Set<string>>(new Set());
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    saveListeningSession(test.id, mode, {
      answers,
      flaggedQuestions: Array.from(flaggedQuestions),
      notes,
      isSubmitted,
      scoreResult,
    });
  }, [test.id, mode, answers, flaggedQuestions, notes, isSubmitted, scoreResult]);

  // Cross-device hydration: Completed Cloud submission trumps local unsubmitted draft
  useEffect(() => {
    if (!user?.id) return;
    let isCancelled = false;

    async function syncFromCloud() {
      if (!user?.id) return;
      try {
        const cloudData = await fetchTestSubmission(user.id, test.id, mode);
        if (isCancelled || !cloudData) return;

        const cloudCompletedAt = cloudData.completed_at ? new Date(cloudData.completed_at).getTime() : 0;
        const currentSavedAt = initialSession?.savedAt ?? 0;

        if (!initialSession?.isSubmitted || cloudCompletedAt > currentSavedAt) {
          const hydrated = hydrateListeningSessionFromCloud(test.id, mode, cloudData);
          if (isCancelled) return;
          setAnswers(hydrated.answers);
          setFlaggedQuestions(new Set(hydrated.flaggedQuestions));
          setNotes(hydrated.notes);
          setIsSubmitted(true);
          setScoreResult(hydrated.scoreResult);
        }
      } catch (err) {
        console.warn('Failed to sync test submission from cloud:', err);
      }
    }

    syncFromCloud();

    return () => {
      isCancelled = true;
    };
  }, [user?.id, test.id, mode, initialSession?.isSubmitted, initialSession?.savedAt]);

  const {
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    togglePlay,
    seekBy,
    seekTo,
    setPlaybackRate,
  } = useAudioPlayer({
    test,
    mode,
    onAudioEnded: () => {
      if (isExam && !isSubmitted) handleSubmit();
    },
  });

  const handleSelectOption = (questionId: string, optionKey: 'A' | 'B' | 'C' | 'D') => {
    if (!isSubmitted) setAnswers(prev => ({ ...prev, [questionId]: optionKey }));
  };

  const handleToggleFlag = (id: string) => {
    if (!isSubmitted) setFlaggedQuestions(prev => toggleInSet(prev, id));
  };
  const handleToggleTranscript = (id: string) => setExpandedTranscripts(prev => toggleInSet(prev, id));
  const handleToggleVietnamese = (id: string) => {
    setShowVietnamese(prev => ({ ...prev, [id]: prev[id] === undefined ? false : !prev[id] }));
  };
  const handleTogglePassageCollapse = (id: string) => setCollapsedPassages(prev => toggleInSet(prev, id));
  const handleToggleQuestionCollapse = (id: string) => setCollapsedQuestions(prev => toggleInSet(prev, id));

  const scrollToQuestion = (questionId: string) => {
    const { groupId } = getQuestionTranscriptContext(test, questionId);
    if (groupId) {
      setCollapsedPassages(prev => (!prev.has(groupId) ? prev : toggleInSet(prev, groupId)));
    }
    setCollapsedQuestions(prev => (!prev.has(questionId) ? prev : toggleInSet(prev, questionId)));

    setTimeout(() => {
      const el = questionRefs.current[questionId];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('active-target');
        setTimeout(() => el.classList.remove('active-target'), 1500);
      }
    }, 60);
  };

  const handleSubmit = async () => {
    const total = test.questions.length;
    const correct = test.questions.filter((q) => answers[q.id] === q.correct_key).length;
    const scoreOutOf10 = total > 0 ? Number(((correct / total) * 10).toFixed(1)) : 0;
    const timeSpent = Math.round(currentTime);
    const result: ListeningScoreResult = {
      totalQuestions: total,
      correctCount: correct,
      scoreOutOf10,
      timeSpentSeconds: timeSpent,
      completedAt: Date.now(),
    };

    setIsSubmitted(true);
    setScoreResult(result);
    setSyncWarning(null);
    recordStudyActivity();
    incrementExercisesCompleted(1);
    onComplete?.(result);

    // Cloud on Commit: upsert submission snapshot to Supabase
    if (user?.id) {
      const res = await upsertTestSubmission({
        user_id: user.id,
        test_id: test.id,
        skill: 'listening',
        mode,
        score: scoreOutOf10,
        correct_count: correct,
        total_questions: total,
        time_spent_seconds: timeSpent,
        answers,
        notes,
        flagged_questions: Array.from(flaggedQuestions),
        completed_at: new Date(result.completedAt).toISOString(),
      });

      if (!res.success) {
        setSyncWarning('Không thể đồng bộ lên đám mây (đã lưu kết quả an toàn trên thiết bị này).');
      }
    }
  };

  const handleConfirmReset = async () => {
    setIsResetting(true);
    try {
      if (user?.id) {
        await deleteTestSubmission(user.id, test.id, mode);
      }
      clearListeningSession(test.id, mode);
      setAnswers({});
      setFlaggedQuestions(new Set());
      setIsSubmitted(false);
      setScoreResult(null);
      setNotes({});
      setSyncWarning(null);
      setExpandedTranscripts(new Set());
      setCollapsedPassages(new Set());
      setCollapsedQuestions(new Set());
      seekTo(0);
      setIsResetModalOpen(false);
    } catch (err) {
      console.error('Failed to reset listening test:', err);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="listening-runner">
      {/* Header */}
      <div className="runner-header">
        <div className="runner-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className={`badge ${isExam ? 'badge-gold' : 'badge-primary'}`}>
              {isExam ? 'Chế Độ Thi Thử (Exam Mode)' : 'Chế Độ Luyện Tập (Practice)'}
            </span>
            <span className="badge badge-emerald">Bậc {test.difficulty}</span>
          </div>
          <h2 style={{ fontSize: 'var(--fs-xl)', fontWeight: 800, margin: '4px 0 0 0' }}>
            {test.title}
          </h2>
        </div>
      </div>

      {/* Non-blocking sync warning if network failed */}
      {syncWarning && (
        <div
          style={{
            padding: '8px 14px',
            background: 'var(--bg-subtle)',
            borderLeft: '3px solid var(--gold)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 'var(--fs-xs)',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-3)',
          }}
        >
          {syncWarning}
        </div>
      )}

      {/* Score Result Banner if submitted */}
      {isSubmitted && scoreResult && (
        <div className="score-result-card">
          <span className="badge badge-emerald" style={{ fontSize: 'var(--fs-xs)' }}>
            Kết Quả Chấm Điểm
          </span>
          <div className="score-number-display">{scoreResult.scoreOutOf10} / 10</div>
          <p style={{ margin: 0, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
            Đúng <strong>{scoreResult.correctCount}</strong> trên tổng số <strong>{scoreResult.totalQuestions}</strong> câu hỏi.
          </p>
          <div className="score-actions-inline">
            <button
              type="button"
              className="secondary-btn score-reset-btn"
              onClick={() => setIsResetModalOpen(true)}
            >
              🔄 Làm Lại Bài Này
            </button>
          </div>
        </div>
      )}

      {/* Main Content Workspace */}
      <div className="runner-workspace-grid">
        {/* Left Column: Player + Unified Questions Stream */}
        <div className="main-question-area">
          {/* Sticky Custom Audio Player */}
          <CustomAudioPlayer
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            playbackRate={playbackRate}
            mode={mode}
            onTogglePlay={togglePlay}
            onSeekBy={seekBy}
            onSeekTo={seekTo}
            onSetRate={setPlaybackRate}
          />

          {/* Unified Question List */}
          <div className="questions-stream-container">
            {test.questions.map((q, idx) => {
              const { segment, isFirstInGroup, groupTitle, groupId } = getQuestionTranscriptContext(test, q.id);
              const isPassageCollapsed = Boolean(groupId && collapsedPassages.has(groupId));

              return (
                <React.Fragment key={q.id}>
                  {/* Passage Group Header for Multi-Question Conversations/Lectures */}
                  {isFirstInGroup && segment && (
                    <PassageGroupHeader
                      title={groupTitle}
                      startMs={segment.start_ms}
                      endMs={segment.end_ms}
                      isExam={isExam}
                      isCollapsed={isPassageCollapsed}
                      onPlayPassage={() => seekTo(segment.start_ms / 1000)}
                      onToggleCollapse={() => handleTogglePassageCollapse(groupId)}
                    />
                  )}

                  {!isPassageCollapsed && (
                    <QuestionCard
                      ref={(el) => { questionRefs.current[q.id] = el; }}
                      question={q}
                      questionIndex={idx}
                      selectedKey={answers[q.id]}
                      isFlagged={flaggedQuestions.has(q.id)}
                      isSubmitted={isSubmitted}
                      isExam={isExam}
                      isCollapsed={collapsedQuestions.has(q.id)}
                      onToggleCollapse={() => handleToggleQuestionCollapse(q.id)}
                      onSelectOption={(optionKey) => handleSelectOption(q.id, optionKey)}
                      onToggleFlag={() => handleToggleFlag(q.id)}
                      segment={segment}
                      onSeekTo={seekTo}
                      note={notes[q.id] || ''}
                      onChangeNote={(val) => setNotes(prev => ({ ...prev, [q.id]: val }))}
                      isTranscriptOpen={expandedTranscripts.has(q.id)}
                      onToggleTranscript={() => handleToggleTranscript(q.id)}
                      isVietnameseOpen={showVietnamese[q.id] !== false}
                      onToggleVietnamese={() => handleToggleVietnamese(q.id)}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Right Column: Question Palette Sidebar */}
        <QuestionPalette
          questions={test.questions}
          answers={answers}
          flaggedQuestions={flaggedQuestions}
          isSubmitted={isSubmitted}
          onSelectQuestion={scrollToQuestion}
          onSubmit={handleSubmit}
          onReset={() => setIsResetModalOpen(true)}
          isExam={isExam}
        />
      </div>

      {/* Strict Confirmation Modal for Test Reset */}
      <ConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => {
          if (!isResetting) setIsResetModalOpen(false);
        }}
        onConfirm={handleConfirmReset}
        isLoading={isResetting}
        title="Làm lại bài thi Listening này?"
        description={
          <>
            Hành động này sẽ <strong>xóa toàn bộ câu trả lời, ghi chú và kết quả</strong> của bài thi này trên cả thiết bị và tài khoản đám mây để bạn bắt đầu lại từ đầu.
          </>
        }
        warningText="Kết quả đã nộp trước đó sẽ bị xóa vĩnh viễn khỏi lịch sử làm bài."
        confirmLabel="Xác nhận làm lại"
        cancelLabel="Giữ kết quả hiện tại"
      />
    </div>
  );
};
