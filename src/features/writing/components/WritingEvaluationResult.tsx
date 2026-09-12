import React, { useState } from 'react';
import type { WritingEvaluationResult as IWritingEvaluationResult } from '../writingStorage';
import type { WritingPrompt } from '../../../types/schemas';
import './WritingEvaluationResult.css';

interface WritingEvaluationResultProps {
  isOpen: boolean;
  onClose: () => void;
  result: IWritingEvaluationResult;
  task1Prompt: WritingPrompt;
  task2Prompt: WritingPrompt;
  candidateTask1Text: string;
  candidateTask2Text: string;
}

export const WritingEvaluationResult: React.FC<WritingEvaluationResultProps> = ({
  isOpen,
  onClose,
  result,
  task1Prompt,
  task2Prompt,
  candidateTask1Text,
  candidateTask2Text,
}) => {
  const [activeTask, setActiveTask] = useState<'task1' | 'task2'>('task1');
  const [activeSubView, setActiveSubView] = useState<'fixed_b1' | 'model_answer' | 'errors' | 'candidate'>('fixed_b1');

  if (!isOpen) return null;

  const currentEval = activeTask === 'task1' ? result.task1 : result.task2;
  const currentPrompt = activeTask === 'task1' ? task1Prompt : task2Prompt;
  const currentCandidateText = activeTask === 'task1' ? candidateTask1Text : candidateTask2Text;
  const { compositeScore } = result;

  return (
    <div className="writing-modal-backdrop" onClick={onClose}>
      <div className="writing-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="writing-modal-header">
          <div className="writing-header-left">
            <div className={`writing-score-badge ${compositeScore.isB1Passed ? 'passed' : ''}`}>
              <span className="writing-score-number">{compositeScore.roundedScore.toFixed(1)}</span>
              <span className="writing-score-label">/ 10</span>
            </div>
            <div className="writing-header-info">
              <h2>Kết Quả Đánh Giá Viết VSTEP</h2>
              <div className="writing-meta-tags">
                <span className={`writing-tag ${compositeScore.isB1Passed ? 'pass' : 'fail'}`}>
                  {compositeScore.isB1Passed ? '✓ ĐẠT CHUẨN ĐẦU RA B1' : '✕ CHƯA ĐẠT B1'}
                </span>
                <span className="writing-tag">Bậc năng lực: {compositeScore.band}</span>
                <span className="writing-tag">Công thức: (Task 1 + 2 × Task 2) / 3</span>
              </div>
            </div>
          </div>
          <button className="writing-modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* Task 1 vs Task 2 Tab Bar */}
        <div className="writing-task-tab-bar">
          <button
            className={`writing-task-tab ${activeTask === 'task1' ? 'active' : ''}`}
            onClick={() => setActiveTask('task1')}
          >
            <span>Task 1: Thư / Email (1/3 điểm)</span>
            <span className="writing-tab-score-pill">{result.task1.taskScore.toFixed(1)}</span>
          </button>
          <button
            className={`writing-task-tab ${activeTask === 'task2' ? 'active' : ''}`}
            onClick={() => setActiveTask('task2')}
          >
            <span>Task 2: Bài Luận (2/3 điểm)</span>
            <span className="writing-tab-score-pill">{result.task2.taskScore.toFixed(1)}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="writing-modal-body">
          {/* Criteria Grid */}
          <div className="writing-criteria-grid">
            <div className="writing-criterion-card">
              <div className="writing-criterion-top">
                <span className="writing-criterion-title">Task Fulfillment</span>
                <span className="writing-criterion-score">{currentEval.criteriaScores.task_fulfillment.toFixed(1)}</span>
              </div>
              <p className="writing-criterion-desc">
                {currentEval.justifications.task_fulfillment || 'Mức độ hoàn thành các yêu cầu đề bài.'}
              </p>
            </div>

            <div className="writing-criterion-card">
              <div className="writing-criterion-top">
                <span className="writing-criterion-title">Organization</span>
                <span className="writing-criterion-score">{currentEval.criteriaScores.organization.toFixed(1)}</span>
              </div>
              <p className="writing-criterion-desc">
                {currentEval.justifications.organization || 'Bố cục đoạn văn và liên kết ý.'}
              </p>
            </div>

            <div className="writing-criterion-card">
              <div className="writing-criterion-top">
                <span className="writing-criterion-title">Vocabulary</span>
                <span className="writing-criterion-score">{currentEval.criteriaScores.vocabulary.toFixed(1)}</span>
              </div>
              <p className="writing-criterion-desc">
                {currentEval.justifications.vocabulary || 'Độ chính xác và phù hợp của vốn từ.'}
              </p>
            </div>

            <div className="writing-criterion-card">
              <div className="writing-criterion-top">
                <span className="writing-criterion-title">Grammar</span>
                <span className="writing-criterion-score">{currentEval.criteriaScores.grammar.toFixed(1)}</span>
              </div>
              <p className="writing-criterion-desc">
                {currentEval.justifications.grammar || 'Ngữ pháp câu đơn/ghép và lỗi Vietlish.'}
              </p>
            </div>
          </div>

          {/* Priority Action Items for B1 */}
          {currentEval.priority_action_items && currentEval.priority_action_items.length > 0 && (
            <div className="writing-action-box">
              <h4 className="writing-action-title">
                <span>🎯</span> Trọng tâm cải thiện để vững B1:
              </h4>
              <ul className="writing-action-list">
                {currentEval.priority_action_items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Sub-view Navigation */}
          <div className="writing-subview-nav">
            <button
              className={`writing-subview-btn ${activeSubView === 'fixed_b1' ? 'active' : ''}`}
              onClick={() => setActiveSubView('fixed_b1')}
            >
              ✨ Bài sửa B1 từ ý của bạn
            </button>
            <button
              className={`writing-subview-btn ${activeSubView === 'model_answer' ? 'active' : ''}`}
              onClick={() => setActiveSubView('model_answer')}
            >
              📖 Bài mẫu chuẩn ĐHQGHN ({currentPrompt.sample_response?.band || 'B1'})
            </button>
            <button
              className={`writing-subview-btn ${activeSubView === 'errors' ? 'active' : ''}`}
              onClick={() => setActiveSubView('errors')}
            >
              🔍 Danh mục lỗi & Vietlish ({currentEval.error_catalog.length})
            </button>
            <button
              className={`writing-subview-btn ${activeSubView === 'candidate' ? 'active' : ''}`}
              onClick={() => setActiveSubView('candidate')}
            >
              📝 Bài gốc của bạn
            </button>
          </div>

          {/* Sub-view Content */}
          {activeSubView === 'fixed_b1' && (
            <div className="writing-essay-panel">
              {currentEval.ai_fixed_b1_essay || currentCandidateText}
              <div className="writing-essay-annotation-vi">
                💡 <strong>Ghi chú:</strong> Bài viết trên được AI viết lại từ chính các luận điểm gốc của bạn, nâng cấp các cấu trúc sai ngữ pháp/Vietlish thành câu chuẩn B1 dễ hiểu, giúp bạn hình dung cách viết đạt điểm tối ưu.
              </div>
            </div>
          )}

          {activeSubView === 'model_answer' && (
            <div className="writing-essay-panel">
              {currentPrompt.sample_response?.text || 'Chưa có bài mẫu cho đề thi này.'}
              {currentPrompt.sample_response?.analysis_vi && (
                <div className="writing-essay-annotation-vi">
                  <strong>Nhận xét chuyên gia ULIS:</strong> {currentPrompt.sample_response.analysis_vi}
                </div>
              )}
            </div>
          )}

          {activeSubView === 'errors' && (
            <div className="writing-error-list">
              {currentEval.error_catalog.length === 0 ? (
                <div className="writing-essay-panel">
                  🎉 Không phát hiện lỗi ngữ pháp hay Vietlish nghiêm trọng!
                </div>
              ) : (
                currentEval.error_catalog.map((err, idx) => (
                  <div key={idx} className="writing-error-item">
                    <div className="writing-error-badge-row">
                      <span className={`writing-error-tag ${err.type}`}>{err.type}</span>
                    </div>
                    <div className="writing-error-diff">
                      <span className="writing-error-orig">{err.original_text}</span>
                      <span>➔</span>
                      <span className="writing-error-fix">{err.suggested_replacement}</span>
                    </div>
                    <p className="writing-error-expl">{err.explanation_vi}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {activeSubView === 'candidate' && (
            <div className="writing-essay-panel">
              {currentCandidateText || '(Bài làm trống)'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
