import React from 'react';

interface WritingScaffoldBoxProps {
  activeTab: 'task1' | 'task2';
}

export const WritingScaffoldBox: React.FC<WritingScaffoldBoxProps> = ({ activeTab }) => {
  return (
    <div className="writing-scaffold-box">
      <h4 className="writing-scaffold-title">💡 Gợi ý cấu trúc viết chuẩn B1:</h4>
      <div className="writing-scaffold-content">
        {activeTab === 'task1' ? (
          <>
            • <strong>Mở thư:</strong> Dear [Name], / I am writing this email to...<br />
            • <strong>Thân thư:</strong> Trả lời lần lượt đủ 3 ý gợi ý trong đề bài.<br />
            • <strong>Kết thư:</strong> I hope to hear from you soon. / Best regards, [Your Name]
          </>
        ) : (
          <>
            • <strong>Đoạn 1 (Intro):</strong> Nêu chủ đề + quan điểm cá nhân (Thesis Statement).<br />
            • <strong>Đoạn 2 (Body 1):</strong> Luận điểm 1 + Ví dụ (On the one hand...).<br />
            • <strong>Đoạn 3 (Body 2):</strong> Luận điểm 2 + Ví dụ (On the other hand...).<br />
            • <strong>Đoạn 4 (Conclusion):</strong> Khẳng định lại quan điểm (To sum up...).
          </>
        )}
      </div>
    </div>
  );
};
