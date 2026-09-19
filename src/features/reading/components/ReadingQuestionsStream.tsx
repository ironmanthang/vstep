import React from 'react';
import type { ReadingPassage } from '../../../types/schemas';
import { ReadingQuestionCard } from './ReadingQuestionCard';

type ReadingQuestion = ReadingPassage['questions'][number];

interface ReadingQuestionsStreamProps {
  currentPassage: ReadingPassage | undefined;
  allQuestions: ReadingQuestion[];
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  flaggedQuestions: Set<string>;
  notes: Record<string, string>;
  isSubmitted: boolean;
  isExam: boolean;
  activeQuestionId: string | null;
  revealedClueQuestionId: string | null;
  collapsedQuestions: Set<string>;
  mobileHidden: boolean;
  questionRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  paneRef: React.RefObject<HTMLDivElement | null>;
  onSelectOption: (questionId: string, optionKey: 'A' | 'B' | 'C' | 'D') => void;
  onToggleFlag: (questionId: string) => void;
  onToggleClue: (questionId: string) => void;
  onToggleCollapse: (questionId: string) => void;
  onChangeNote: (questionId: string, note: string) => void;
}

export const ReadingQuestionsStream: React.FC<ReadingQuestionsStreamProps> = ({
  currentPassage,
  allQuestions,
  answers,
  flaggedQuestions,
  notes,
  isSubmitted,
  isExam,
  activeQuestionId,
  revealedClueQuestionId,
  collapsedQuestions,
  mobileHidden,
  questionRefs,
  paneRef,
  onSelectOption,
  onToggleFlag,
  onToggleClue,
  onToggleCollapse,
  onChangeNote,
}) => {
  return (
    <div
      ref={paneRef}
      className={`reading-questions-pane ${mobileHidden ? 'mobile-hidden' : ''}`}
    >
      <div className="reading-questions-stream">
        {currentPassage?.questions.map((q) => {
          const globalIndex = allQuestions.findIndex((item) => item.id === q.id);

          return (
            <ReadingQuestionCard
              key={q.id}
              ref={(el) => {
                questionRefs.current[q.id] = el;
              }}
              question={q}
              questionIndex={globalIndex >= 0 ? globalIndex : 0}
              selectedKey={answers[q.id]}
              isFlagged={flaggedQuestions.has(q.id)}
              isSubmitted={isSubmitted}
              isExam={isExam}
              isActive={activeQuestionId === q.id}
              isClueRevealed={revealedClueQuestionId === q.id}
              isCollapsed={collapsedQuestions.has(q.id)}
              onToggleCollapse={() => onToggleCollapse(q.id)}
              onSelectOption={(key) => onSelectOption(q.id, key)}
              onToggleFlag={() => onToggleFlag(q.id)}
              onToggleClue={() => onToggleClue(q.id)}
              note={notes[q.id] || ''}
              onChangeNote={(val) => onChangeNote(q.id, val)}
            />
          );
        })}
      </div>
    </div>
  );
};
