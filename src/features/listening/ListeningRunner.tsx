import React, { useState, useRef } from 'react';
import type { ListeningTest, ListeningMode, ListeningScoreResult } from './types';
import { useAudioPlayer } from './useAudioPlayer';
import { CustomAudioPlayer } from './components/CustomAudioPlayer';
import { PassageGroupHeader } from './components/PassageGroupHeader';
import { QuestionCard } from './components/QuestionCard';
import { QuestionPalette } from './components/QuestionPalette';
import { useUserStore } from '../../services/user/userStore';
import { getQuestionTranscriptContext } from './transcriptContext';
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
  const { recordStudyActivity, incrementExercisesCompleted } = useUserStore();

  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState<ListeningScoreResult | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [expandedTranscripts, setExpandedTranscripts] = useState<Set<string>>(new Set());
  const [showVietnamese, setShowVietnamese] = useState<Record<string, boolean>>({});
  const [collapsedPassages, setCollapsedPassages] = useState<Set<string>>(new Set());
  const [collapsedQuestions, setCollapsedQuestions] = useState<Set<string>>(new Set());
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

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

  const handleSubmit = () => {
    const total = test.questions.length;
    const correct = test.questions.filter((q) => answers[q.id] === q.correct_key).length;
    const scoreOutOf10 = total > 0 ? Number(((correct / total) * 10).toFixed(1)) : 0;
    const result: ListeningScoreResult = {
      totalQuestions: total,
      correctCount: correct,
      scoreOutOf10,
      timeSpentSeconds: Math.round(currentTime),
      completedAt: Date.now(),
    };

    setIsSubmitted(true);
    setScoreResult(result);
    recordStudyActivity();
    incrementExercisesCompleted(1);
    onComplete?.(result);
  };

  const handleReset = () => {
    setAnswers({});
    setFlaggedQuestions(new Set());
    setIsSubmitted(false);
    setScoreResult(null);
    setNotes({});
    setExpandedTranscripts(new Set());
    setCollapsedPassages(new Set());
    setCollapsedQuestions(new Set());
    seekTo(0);
  };

  const answeredCount = Object.keys(answers).length;

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

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {isSubmitted ? (
            <button className="secondary-btn" onClick={handleReset}>
              🔄 Làm Lại Bài Này
            </button>
          ) : (
            <button
              className="primary-btn"
              onClick={handleSubmit}
              disabled={answeredCount === 0 && !isExam}
            >
              Nộp Bài & Chấm Điểm ({answeredCount}/{test.questions.length})
            </button>
          )}
        </div>
      </div>

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
        />
      </div>
    </div>
  );
};
