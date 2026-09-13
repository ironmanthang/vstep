import React, { useState } from 'react';
import type { SpeakingEvaluationResult as ISpeakingEvaluationResult } from '../speakingStorage';
import './SpeakingEvaluationResult.css';

interface SpeakingEvaluationResultProps {
  isOpen: boolean;
  onClose: () => void;
  result: ISpeakingEvaluationResult;
  audioUrls?: Record<number, string>;
}

export const SpeakingEvaluationResult: React.FC<SpeakingEvaluationResultProps> = ({
  isOpen,
  onClose,
  result,
  audioUrls = {},
}) => {
  const availableParts: Array<1 | 2 | 3> = [];
  if (result.part1) availableParts.push(1);
  if (result.part2) availableParts.push(2);
  if (result.part3) availableParts.push(3);

  const [activePart, setActivePart] = useState<1 | 2 | 3>(availableParts[0] || 1);
  const [activeSubView, setActiveSubView] = useState<'fixed_b1' | 'transcript' | 'model_answer' | 'phonetics'>('fixed_b1');

  if (!isOpen) return null;

  const currentEval =
    activePart === 1 ? result.part1 : activePart === 2 ? result.part2 : result.part3;

  const { compositeScore } = result;

  return (
    <div className="speaking-modal-backdrop" onClick={onClose}>
      <div className="speaking-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="speaking-modal-header">
          <div className="speaking-header-left">
            <div className={`speaking-score-badge ${compositeScore.isB1Passed ? 'passed' : ''}`}>
              <span className="speaking-score-number">{compositeScore.roundedScore.toFixed(1)}</span>
              <span className="speaking-score-label">/ 10</span>
            </div>
            <div className="speaking-header-info">
              <h2>Kết Quả Đánh Giá Nói VSTEP</h2>
              <div className="speaking-meta-tags">
                <span className={`speaking-tag ${compositeScore.isB1Passed ? 'pass' : 'fail'}`}>
                  {compositeScore.isB1Passed ? '✓ ĐẠT CHUẨN ĐẦU RA B1' : '✕ CHƯA ĐẠT B1'}
                </span>
                <span className="speaking-tag">Bậc năng lực: {compositeScore.band}</span>
                <span className="speaking-tag">Quyết định 729/QĐ-BGDĐT</span>
              </div>
            </div>
          </div>
          <button className="speaking-modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* Part Tabs */}
        {availableParts.length > 1 && (
          <div className="speaking-part-nav">
            {availableParts.map((p) => {
              const partData = p === 1 ? result.part1 : p === 2 ? result.part2 : result.part3;
              return (
                <button
                  key={p}
                  className={`speaking-part-nav-btn ${activePart === p ? 'active' : ''}`}
                  onClick={() => setActivePart(p)}
                >
                  <span>Part {p}: {p === 1 ? 'Social' : p === 2 ? 'Solution' : 'Topic'}</span>
                  {partData && <span className="speaking-nav-score-pill">{partData.partScore.toFixed(1)}</span>}
                </button>
              );
            })}
          </div>
        )}

        {/* Modal Body */}
        {currentEval ? (
          <div className="speaking-modal-body">
            {/* Audio Playback Bar if audioUrl available */}
            {audioUrls[activePart] && (
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 12, borderRadius: 10 }}>
                <div style={{ fontSize: 12, color: 'var(--text-secondary, #a8a29e)', marginBottom: 6, fontWeight: 700 }}>
                  Bản ghi âm bài nói của học viên (Part {activePart}):
                </div>
                <audio controls src={audioUrls[activePart]} style={{ width: '100%', height: 36 }} />
              </div>
            )}

            {/* 4 Criteria Grid */}
            <div className="speaking-criteria-grid">
              <div className="speaking-criterion-card">
                <div className="speaking-criterion-top">
                  <span className="speaking-criterion-title">Pronunciation</span>
                  <span className="speaking-criterion-score">{currentEval.criteriaScores.pronunciation.toFixed(1)}</span>
                </div>
                <p className="speaking-criterion-desc">
                  {currentEval.justifications.pronunciation || 'Độ rõ âm vị và trọng âm từ.'}
                </p>
              </div>

              <div className="speaking-criterion-card">
                <div className="speaking-criterion-top">
                  <span className="speaking-criterion-title">Fluency & Coherence</span>
                  <span className="speaking-criterion-score">{currentEval.criteriaScores.fluency_coherence.toFixed(1)}</span>
                </div>
                <p className="speaking-criterion-desc">
                  {currentEval.justifications.fluency_coherence || 'Độ lưu loát và từ nối.'}
                </p>
              </div>

              <div className="speaking-criterion-card">
                <div className="speaking-criterion-top">
                  <span className="speaking-criterion-title">Grammar & Vocab</span>
                  <span className="speaking-criterion-score">{currentEval.criteriaScores.grammar_vocabulary.toFixed(1)}</span>
                </div>
                <p className="speaking-criterion-desc">
                  {currentEval.justifications.grammar_vocabulary || 'Kiểm soát câu đơn/ghép và vốn từ.'}
                </p>
              </div>

              <div className="speaking-criterion-card">
                <div className="speaking-criterion-top">
                  <span className="speaking-criterion-title">Task Fulfillment</span>
                  <span className="speaking-criterion-score">{currentEval.criteriaScores.task_fulfillment.toFixed(1)}</span>
                </div>
                <p className="speaking-criterion-desc">
                  {currentEval.justifications.task_fulfillment || 'Phát triển ý đúng trọng tâm.'}
                </p>
              </div>
            </div>

            {/* Priority Action Items */}
            {currentEval.priorityActionItems && currentEval.priorityActionItems.length > 0 && (
              <div className="speaking-action-box">
                <h4 className="speaking-action-title">Trọng Tâm Hành Động Cần Cải Thiện Vượt Ngưỡng B1</h4>
                <ul className="speaking-action-list">
                  {currentEval.priorityActionItems.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Side-by-Side 3-Way Comparative Views */}
            <div className="speaking-comparative-section">
              <div className="speaking-subview-nav">
                <button
                  className={`speaking-subview-btn ${activeSubView === 'fixed_b1' ? 'active' : ''}`}
                  onClick={() => setActiveSubView('fixed_b1')}
                >
                  Bài Nói Sửa B1 (AI-Fixed)
                </button>
                <button
                  className={`speaking-subview-btn ${activeSubView === 'transcript' ? 'active' : ''}`}
                  onClick={() => setActiveSubView('transcript')}
                >
                  Lời Nói Bóc Tách (Transcript {currentEval.detectedWpm ? `• ${currentEval.detectedWpm} WPM` : ''})
                </button>
                {currentEval.sampleResponse && (
                  <button
                    className={`speaking-subview-btn ${activeSubView === 'model_answer' ? 'active' : ''}`}
                    onClick={() => setActiveSubView('model_answer')}
                  >
                    Bài Mẫu Khảo Thí ULIS ({currentEval.sampleResponse.band || 'B1'})
                  </button>
                )}
                {currentEval.phoneticErrors && currentEval.phoneticErrors.length > 0 && (
                  <button
                    className={`speaking-subview-btn ${activeSubView === 'phonetics' ? 'active' : ''}`}
                    onClick={() => setActiveSubView('phonetics')}
                  >
                    Lỗi Phát Âm ({currentEval.phoneticErrors.length})
                  </button>
                )}
              </div>

              <div className="speaking-subview-content">
                {activeSubView === 'fixed_b1' && (
                  <div>
                    <div style={{ fontSize: 12, color: '#f59e0b', fontWeight: 700, marginBottom: 8 }}>
                      ★ Phiên bản nói chuẩn B1 được viết lại từ chính ý tưởng gốc của bạn:
                    </div>
                    <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{currentEval.aiFixedB1Speech}</p>
                  </div>
                )}

                {activeSubView === 'transcript' && (
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
                      Toàn văn bài nói nguyên bản ghi nhận được ({currentEval.detectedWpm} từ/phút):
                    </div>
                    <p style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#e5e7eb' }}>
                      {currentEval.transcript || '(Chưa ghi nhận được lời nói)'}
                    </p>
                  </div>
                )}

                {activeSubView === 'model_answer' && currentEval.sampleResponse && (
                  <div>
                    <div style={{ fontSize: 12, color: '#10b981', fontWeight: 700, marginBottom: 8 }}>
                      Bài mẫu chính thức từ Hội đồng khảo thí ULIS (Band {currentEval.sampleResponse.band || 'B1'}):
                    </div>
                    <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{currentEval.sampleResponse.text}</p>
                    {currentEval.sampleResponse.analysis_vi && (
                      <div style={{ marginTop: 12, padding: 10, background: 'rgba(16, 185, 129, 0.08)', borderRadius: 6, fontSize: 12, color: '#a7f3d0' }}>
                        {currentEval.sampleResponse.analysis_vi}
                      </div>
                    )}
                  </div>
                )}

                {activeSubView === 'phonetics' && currentEval.phoneticErrors && (
                  <table className="speaking-phonetic-table">
                    <thead>
                      <tr>
                        <th>Từ vựng</th>
                        <th>Phiên âm IPA</th>
                        <th>Lỗi ghi nhận</th>
                        <th>Hướng dẫn sửa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentEval.phoneticErrors.map((err, idx) => (
                        <tr key={idx}>
                          <td className="speaking-phonetic-word">{err.word}</td>
                          <td className="speaking-phonetic-ipa">{err.expected_ipa}</td>
                          <td>{err.detected_error}</td>
                          <td style={{ color: 'var(--text-secondary)' }}>{err.explanation_vi}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-secondary)' }}>
            Chưa có dữ liệu đánh giá cho phần thi này.
          </div>
        )}
      </div>
    </div>
  );
};
