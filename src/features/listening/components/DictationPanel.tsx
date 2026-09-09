import React, { useState } from 'react';
import type { ListeningTest, DictationDiffResult } from '../types';
import { compareDictation } from '../dictationUtils';
import './DictationPanel.css';

interface DictationPanelProps {
  test: ListeningTest;
  currentSubtitleIndex: number;
  onPlaySegment: (index: number) => void;
}

export const DictationPanel: React.FC<DictationPanelProps> = ({
  test,
  currentSubtitleIndex,
  onPlaySegment,
}) => {
  const transcript = test.transcript;
  const [selectedSentenceIdx, setSelectedSentenceIdx] = useState<number>(() => {
    return Math.max(0, Math.min(transcript.length - 1, currentSubtitleIndex));
  });

  const [inputVal, setInputVal] = useState<string>('');
  const [diffResult, setDiffResult] = useState<DictationDiffResult | null>(null);
  const [showFullTarget, setShowFullTarget] = useState<boolean>(false);

  const currentSentence = transcript[selectedSentenceIdx];

  const handlePlayCurrent = () => {
    onPlaySegment(selectedSentenceIdx);
  };

  const handleCheck = () => {
    if (!currentSentence) return;
    const result = compareDictation(inputVal, currentSentence.text_en);
    setDiffResult(result);
  };

  const handleNext = () => {
    if (selectedSentenceIdx < transcript.length - 1) {
      const nextIdx = selectedSentenceIdx + 1;
      setSelectedSentenceIdx(nextIdx);
      setInputVal('');
      setDiffResult(null);
      setShowFullTarget(false);
      onPlaySegment(nextIdx);
    }
  };

  const handlePrev = () => {
    if (selectedSentenceIdx > 0) {
      const prevIdx = selectedSentenceIdx - 1;
      setSelectedSentenceIdx(prevIdx);
      setInputVal('');
      setDiffResult(null);
      setShowFullTarget(false);
      onPlaySegment(prevIdx);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCheck();
    }
  };

  if (!currentSentence) {
    return <div>Không có dữ liệu bài nghe cho phần này.</div>;
  }

  return (
    <div className="dictation-panel">
      {/* Stepper Header */}
      <div className="dictation-header">
        <div className="sentence-stepper">
          <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 700 }}>
            Câu <strong>{selectedSentenceIdx + 1}</strong> / {transcript.length}
          </span>
          <button
            className="secondary-btn"
            onClick={handlePrev}
            disabled={selectedSentenceIdx === 0}
            style={{ padding: '4px 10px', fontSize: 'var(--fs-xs)' }}
          >
            ← Câu trước
          </button>
          <button
            className="secondary-btn"
            onClick={handleNext}
            disabled={selectedSentenceIdx >= transcript.length - 1}
            style={{ padding: '4px 10px', fontSize: 'var(--fs-xs)' }}
          >
            Câu sau →
          </button>
        </div>

        <button
          className="primary-btn"
          onClick={handlePlayCurrent}
          style={{ padding: '6px 14px', fontSize: 'var(--fs-xs)' }}
        >
          🔊 Nghe Lại Đoạn Này
        </button>
      </div>

      {/* Input Area */}
      <textarea
        className="dictation-input-box"
        placeholder="Gõ lại câu tiếng Anh bạn nghe được tại đây... (Nhấn Enter để kiểm tra)"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Khung nhập chính tả"
      />

      {/* Actions */}
      <div className="dictation-actions">
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button className="primary-btn" onClick={handleCheck}>
            Kiểm Tra Đáp Án (Enter)
          </button>
          <button
            className="secondary-btn"
            onClick={() => setShowFullTarget(prev => !prev)}
          >
            {showFullTarget ? 'Ẩn Lời Thoại Mẫu' : 'Xem Lời Thoại Gốc'}
          </button>
        </div>

        {diffResult && (
          <span className={`badge ${diffResult.isExactMatch ? 'badge-emerald' : 'badge-gold'}`}>
            Độ chính xác: {diffResult.accuracyPercentage}%
          </span>
        )}
      </div>

      {/* Show full target if requested */}
      {showFullTarget && (
        <div style={{ padding: 'var(--space-3)', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', fontWeight: 700, marginBottom: 2 }}>
            Lời thoại chuẩn:
          </div>
          <p style={{ margin: 0, fontSize: 'var(--fs-sm)', color: 'var(--text-primary)', fontWeight: 600 }}>
            {currentSentence.text_en}
          </p>
          <p style={{ margin: '4px 0 0 0', fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>
            {currentSentence.text_vi}
          </p>
        </div>
      )}

      {/* Diff Result Visualization */}
      {diffResult && (
        <div className="dictation-diff-result">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--text-secondary)' }}>
              Phân tích chi tiết từng từ:
            </span>
            <div style={{ display: 'flex', gap: 'var(--space-2)', fontSize: '10px' }}>
              <span style={{ color: 'var(--emerald-text)' }}>● Đúng</span>
              <span style={{ color: 'var(--coral-text)' }}>● Sai chính tả</span>
              <span style={{ color: 'var(--gold-text)' }}>● Thiếu từ</span>
            </div>
          </div>

          <div className="diff-tokens-wrapper">
            {diffResult.tokens.map((token, idx) => (
              <span key={idx} className={`diff-token token-${token.status}`}>
                {token.text}
                {token.status === 'misspelled' && token.expected && (
                  <span className="diff-expected-hint">({token.expected})</span>
                )}
                {token.status === 'missing' && (
                  <span className="diff-expected-hint">[thiếu]</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
