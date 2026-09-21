import React from 'react';

interface ReadingPassageNavBarProps {
  activePassageIndex: number;
  totalAnsweredCount: number;
  totalQuestionsCount: number;
  mobileTab: 'passage' | 'questions';
  onSwitchMobileTab: (tab: 'passage' | 'questions') => void;
}

export const ReadingPassageNavBar: React.FC<ReadingPassageNavBarProps> = ({
  activePassageIndex,
  totalAnsweredCount,
  totalQuestionsCount,
  mobileTab,
  onSwitchMobileTab,
}) => {
  return (
    <>

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
