import React from 'react';
import type { SpeakingTest } from '../../../types/schemas';

interface SpeakingPromptViewerProps {
  test: SpeakingTest;
  activePart: 1 | 2 | 3;
  mode: 'practice' | 'exam';
  isScaffoldOpen: boolean;
  onToggleScaffold: () => void;
}

export const SpeakingPromptViewer: React.FC<SpeakingPromptViewerProps> = ({
  test,
  activePart,
  mode,
  isScaffoldOpen,
  onToggleScaffold,
}) => {
  return (
    <div className="speaking-prompt-content">
      {activePart === 1 && (
        <div className="speaking-prompt-card">
          <h3 className="speaking-prompt-title">Part 1: Social Interaction (3 phút)</h3>
          {test.part1.topics.map((t, idx) => (
            <div key={idx} style={{ marginBottom: 14 }}>
              <div style={{ fontWeight: 800, color: '#60a5fa', marginBottom: 6 }}>
                Topic {idx + 1}: {t.topic_name} {t.topic_name_vi ? `(${t.topic_name_vi})` : ''}
              </div>
              <ol className="speaking-question-list">
                {t.questions.map((q, qIdx) => (
                  <li key={qIdx} className="speaking-question-item">{q}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}

      {activePart === 2 && (
        <div className="speaking-prompt-card">
          <h3 className="speaking-prompt-title">Part 2: Solution Discussion (4 phút)</h3>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: '#f5f0eb' }}>{test.part2.situation}</p>
          <div className="speaking-options-grid">
            {test.part2.options.map((opt, idx) => (
              <div key={idx} className="speaking-option-card">
                <div className="speaking-option-title">{opt.key}: {opt.title}</div>
                <div className="speaking-option-desc">{opt.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activePart === 3 && (
        <div className="speaking-prompt-card">
          <h3 className="speaking-prompt-title">Part 3: Topic Development (5 phút)</h3>
          <div className="speaking-mindmap-box">
            <div className="speaking-mindmap-center">TOPIC: {test.part3.topic}</div>
            <div className="speaking-mindmap-branches">
              {test.part3.mindmap_ideas.map((idea, idx) => (
                <div key={idx} className="speaking-mindmap-branch">
                  <span style={{ color: '#f59e0b', fontWeight: 800 }}>•</span>
                  <span>{idea}</span>
                </div>
              ))}
            </div>
          </div>
          {test.part3.follow_up_questions && test.part3.follow_up_questions.length > 0 && (
            <div style={{ marginTop: 14 }}>
              <div style={{ fontWeight: 700, color: '#a8a29e', fontSize: 12.5, marginBottom: 6 }}>
                Follow-up Questions:
              </div>
              <ul className="speaking-question-list">
                {test.part3.follow_up_questions.map((fq, idx) => (
                  <li key={idx} className="speaking-question-item">{fq}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* B1 Scaffolding Accordion (Practice Mode) */}
      {mode === 'practice' && (
        <div className="speaking-scaffold-accordion">
          <div className="speaking-scaffold-header" onClick={onToggleScaffold}>
            <span>Gợi ý dàn ý chuẩn B1 cho Part {activePart}</span>
            <span>{isScaffoldOpen ? '▲' : '▼'}</span>
          </div>
          {isScaffoldOpen && (
            <div className="speaking-scaffold-body">
              {activePart === 1 && (
                <p style={{ margin: 0 }}>
                  <strong>Quy tắc trả lời B1:</strong> Trả lời trực diện vào câu hỏi (1 câu) + Đưa ra 1-2 câu mở rộng giải thích lý do (Because...) hoặc nêu ví dụ cụ thể (For example...). Tránh trả lời cộc lốc Yes/No.
                </p>
              )}
              {activePart === 2 && (
                <p style={{ margin: 0 }}>
                  <strong>Khung 3 bước:</strong> 1) Nêu rõ lựa chọn tối ưu (*In my opinion, I will choose...*); 2) Nêu 2 lý do chính (*Firstly... Secondly...*); 3) Giải thích ngắn gọn vì sao loại trừ 2 phương án còn lại (*I don’t choose the other two options because...*).
                </p>
              )}
              {activePart === 3 && (
                <p style={{ margin: 0 }}>
                  <strong>Khai triển Mindmap:</strong> Mở đầu khẳng định chủ đề (*Today I want to talk about...*), dùng từ nối liên kết 3 nhánh (*First of all..., Furthermore..., Last but not least...*), và tóm lược kết luận (*In conclusion...*).
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
