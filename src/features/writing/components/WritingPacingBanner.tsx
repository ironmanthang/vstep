import React from 'react';

interface WritingPacingBannerProps {
  onSwitchToTask2: () => void;
}

export const WritingPacingBanner: React.FC<WritingPacingBannerProps> = ({
  onSwitchToTask2,
}) => {
  return (
    <div className="writing-pacing-banner">
      <span>
        ⚠️ <strong>Nhắc nhở phân bổ thời gian:</strong> Đã hết 20 phút dành cho Task 1. Bạn
        nên chuyển sang Task 2 để bảo vệ 67% tổng điểm của bài thi!
      </span>
      <button
        type="button"
        className="writing-pacing-btn"
        onClick={onSwitchToTask2}
      >
        Chuyển sang Task 2 ➔
      </button>
    </div>
  );
};
