import React from 'react';
import type { ReadingPassage } from '../../../types/schemas';

interface ReadingPassageNavBarProps {
  passages: ReadingPassage[];
  activePassageIndex: number;
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  totalAnsweredCount: number;
  totalQuestionsCount: number;
  mobileTab: 'passage' | 'questions';
  onSelectPassage: (index: number) => void;
  onSwitchMobileTab: (tab: 'passage' | 'questions') => void;
}

export const ReadingPassageNavBar: React.FC<ReadingPassageNavBarProps> = ({
  passages,
  activePassageIndex,
  answers,
  totalAnsweredCount,
  totalQuestionsCount,
  mobileTab,
  onSelectPassage,
  onSwitchMobileTab,
}) => {
  return (
    <>
      {/* Passage Selector Bar */}
      <div className="reading-passage-nav-bar">
        {passages.map((p, pIdx) => {
          const passageAnswered = p.questions.filter((q) => Boolean(answers[q.id])).length;
          const isCurrent = activePassageIndex === pIdx;

          return (
            <button
              key={p.id || pIdx}
              type="button"
              className={`reading-pnav-btn ${isCurrent ? 'active' : ''}`}
              onClick={() => onSelectPassage(pIdx)}
            >
              <span>Bài Đọc {pIdx + 1}</span>
              <span className="reading-pnav-badge">
                {passageAnswered}/{p.questions.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile Tab Switcher (<768px) */}
      <div className="reading-mobile-tab-bar">
        <div className="reading-mobile-tab-group">
          <button
            type="button"
            className={`reading-mobile-tab-btn ${mobileTab === 'passage' ? 'active' : ''}`}
            onClick={() => onSwitchMobileTab('passage')}
          >
            📖 Bài Đọc {activePassageIndex + 1}
          </button>
          <button
            type="button"
            className={`reading-mobile-tab-btn ${mobileTab === 'questions' ? 'active' : ''}`}
            onClick={() => onSwitchMobileTab('questions')}
          >
            📝 Câu Hỏi ({totalAnsweredCount}/{totalQuestionsCount})
          </button>
        </div>
      </div>
    </>
  );
};
