import React from 'react';

interface WritingTaskTabsProps {
  activeTab: 'task1' | 'task2';
  task1WordCount: number;
  task2WordCount: number;
  onSelectTab: (tab: 'task1' | 'task2') => void;
}

export const WritingTaskTabs: React.FC<WritingTaskTabsProps> = ({
  activeTab,
  task1WordCount,
  task2WordCount,
  onSelectTab,
}) => {
  return (
    <div className="writing-nav-bar">
      <button
        type="button"
        className={`writing-nav-tab ${activeTab === 'task1' ? 'active' : ''}`}
        onClick={() => onSelectTab('task1')}
      >
        <span>Task 1: Thư / Email (≥120 từ, 1/3 điểm)</span>
        <span className="writing-nav-word-pill">{task1WordCount} từ</span>
      </button>
      <button
        type="button"
        className={`writing-nav-tab ${activeTab === 'task2' ? 'active' : ''}`}
        onClick={() => onSelectTab('task2')}
      >
        <span>Task 2: Bài Luận (≥250 từ, 2/3 điểm)</span>
        <span className="writing-nav-word-pill">{task2WordCount} từ</span>
      </button>
    </div>
  );
};
