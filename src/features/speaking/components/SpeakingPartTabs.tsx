import React from 'react';

interface SpeakingPartTabsProps {
  activePart: 1 | 2 | 3;
  onSelectPart: (part: 1 | 2 | 3) => void;
}

export const SpeakingPartTabs: React.FC<SpeakingPartTabsProps> = ({
  activePart,
  onSelectPart,
}) => {
  return (
    <div className="speaking-part-tabs">
      <button
        type="button"
        className={`speaking-part-tab-btn ${activePart === 1 ? 'active' : ''}`}
        onClick={() => onSelectPart(1)}
      >
        Part 1: Social
      </button>
      <button
        type="button"
        className={`speaking-part-tab-btn ${activePart === 2 ? 'active' : ''}`}
        onClick={() => onSelectPart(2)}
      >
        Part 2: Solution
      </button>
      <button
        type="button"
        className={`speaking-part-tab-btn ${activePart === 3 ? 'active' : ''}`}
        onClick={() => onSelectPart(3)}
      >
        Part 3: Topic
      </button>
    </div>
  );
};
