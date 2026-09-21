import React from 'react';
import type { ReadingTest, ReadingMode, ReadingScoreResult } from './types';
import { PassagePanel } from './components/PassagePanel';
import { ReadingBottomBar } from './components/ReadingBottomBar';
import { ReadingHeader } from './components/ReadingHeader';
import { ReadingPassageNavBar } from './components/ReadingPassageNavBar';
import { ReadingQuestionsStream } from './components/ReadingQuestionsStream';
import { ReadingResetModal } from './components/ReadingResetModal';
import { useReadingRunnerState } from './useReadingRunnerState';
import './ReadingRunner.css';

export interface ReadingRunnerProps {
  test: ReadingTest;
  mode?: ReadingMode;
  onComplete?: (result: ReadingScoreResult) => void;
}

export const ReadingRunner: React.FC<ReadingRunnerProps> = ({
  test,
  mode = 'practice',
  onComplete,
}) => {
  const {
    isExam,
    answers,
    flaggedQuestions,
    notes,
    isSubmitted,
    scoreResult,
    syncWarning,
    activePassageIndex,
    activeQuestionId,
    revealedClueQuestionId,
    collapsedQuestions,
    isBottomBarCollapsed,
    setIsBottomBarCollapsed,
    mobileTab,
    isResetModalOpen,
    setIsResetModalOpen,
    isResetting,
    passagePaneRef,
    questionsPaneRef,
    questionRefs,
    allQuestions,
    currentPassage,
    activeClueSentence,
    answeredCount,
    examSecondsRemaining,
    readerSettings,
    updateReaderSettings,
    handleSwitchMobileTab,
    handleSelectOption,
    handleToggleFlag,
    handleToggleClue,
    handleToggleQuestionCollapse,
    handleFocusQuestion,
    handleSelectPassage,
    handleSubmit,
    handleConfirmReset,
    handleChangeNote,
  } = useReadingRunnerState({ test, mode, onComplete });

  return (
    <div className="reading-runner">
      <ReadingHeader
        title={test.title}
        isExam={isExam}
        examSecondsRemaining={examSecondsRemaining}
        syncWarning={syncWarning}
      />

      <ReadingPassageNavBar
        activePassageIndex={activePassageIndex}
        totalAnsweredCount={answeredCount}
        totalQuestionsCount={allQuestions.length}
        mobileTab={mobileTab}
        onSwitchMobileTab={handleSwitchMobileTab}
      />

      {/* Main Split-Pane Workspace Grid */}
      <div className={`reading-workspace-grid ${isBottomBarCollapsed ? 'bottom-collapsed' : ''}`}>
        {/* Left Column: Passage Panel */}
        <div
          ref={passagePaneRef}
          className={`reading-passage-pane ${
            mobileTab !== 'passage' ? 'mobile-hidden' : ''
          }`}
        >
          {currentPassage && (
            <PassagePanel
              passage={currentPassage}
              passages={test.passages}
              passageIndex={activePassageIndex}
              answers={answers}
              activeClueSentence={activeClueSentence}
              readerSettings={readerSettings}
              onChangeReaderSettings={updateReaderSettings}
              onSelectPassage={handleSelectPassage}
            />
          )}
        </div>

        {/* Middle Column: Question Cards Stream for Current Passage */}
        <ReadingQuestionsStream
          currentPassage={currentPassage}
          allQuestions={allQuestions}
          answers={answers}
          flaggedQuestions={flaggedQuestions}
          notes={notes}
          isSubmitted={isSubmitted}
          isExam={isExam}
          activeQuestionId={activeQuestionId}
          revealedClueQuestionId={revealedClueQuestionId}
          collapsedQuestions={collapsedQuestions}
          mobileHidden={mobileTab !== 'questions'}
          questionRefs={questionRefs}
          paneRef={questionsPaneRef}
          onSelectOption={handleSelectOption}
          onToggleFlag={handleToggleFlag}
          onToggleClue={handleToggleClue}
          onToggleCollapse={handleToggleQuestionCollapse}
          onChangeNote={handleChangeNote}
        />
      </div>

      {/* Modern Bottom Navigation Bar with Passage Switcher & Question Track */}
      <ReadingBottomBar
        passages={test.passages}
        activePassageIndex={activePassageIndex}
        answers={answers}
        flaggedQuestions={flaggedQuestions}
        activeQuestionId={activeQuestionId}
        isSubmitted={isSubmitted}
        scoreResult={scoreResult}
        isExam={isExam}
        isCollapsed={isBottomBarCollapsed}
        onToggleCollapse={setIsBottomBarCollapsed}
        onSelectPassage={handleSelectPassage}
        onSelectQuestion={handleFocusQuestion}
        onSubmit={handleSubmit}
        onReset={() => setIsResetModalOpen(true)}
      />

      {/* Confirmation Modal for Resetting Test */}
      <ReadingResetModal
        isOpen={isResetModalOpen}
        isLoading={isResetting}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
};
