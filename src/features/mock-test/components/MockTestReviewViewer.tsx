import React, { useState } from 'react';
import type { MockTest } from '../../../types/schemas';
import type { MockTestSession, MockTestSkillSection } from '../types';
import { getQuestionTranscriptContext } from '../../listening/transcriptContext';

interface MockTestReviewViewerProps {
  test: MockTest;
  session: MockTestSession;
  onClose: () => void;
}

export const MockTestReviewViewer: React.FC<MockTestReviewViewerProps> = ({
  test,
  session,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<MockTestSkillSection>('listening');
  const [readingPassageIdx, setReadingPassageIdx] = useState(0);

  const listeningAnswers = session.listeningResult ? (session as unknown as { listeningAnswers?: Record<string, string> }).listeningAnswers || {} : {};

  return (
    <div className="card-surface" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div>
          <span className="badge badge-primary">Chế Độ Xem Lại Chi Tiết (Review Mode)</span>
          <h2 style={{ fontSize: 'var(--fs-xl)', fontWeight: 800, margin: '4px 0 0 0', color: 'var(--text-primary)' }}>
            Xem Lại Bài Thi: {test.title}
          </h2>
        </div>
        <button
          type="button"
          className="secondary-btn"
          onClick={onClose}
          style={{ fontSize: 'var(--fs-xs)', padding: 'var(--space-2) var(--space-4)' }}
        >
          ✕ Đóng Review
        </button>
      </div>

      {/* Skill Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', borderBottom: '1px solid var(--border)', paddingBottom: 'var(--space-2)' }}>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'listening' ? 'active' : ''}`}
          onClick={() => setActiveTab('listening')}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            background: activeTab === 'listening' ? 'var(--primary-subtle)' : 'transparent',
            color: activeTab === 'listening' ? 'var(--primary-text)' : 'var(--text-secondary)',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          1. Nghe (Listening)
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'reading' ? 'active' : ''}`}
          onClick={() => setActiveTab('reading')}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            background: activeTab === 'reading' ? 'var(--primary-subtle)' : 'transparent',
            color: activeTab === 'reading' ? 'var(--primary-text)' : 'var(--text-secondary)',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          2. Đọc (Reading)
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'writing' ? 'active' : ''}`}
          onClick={() => setActiveTab('writing')}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            background: activeTab === 'writing' ? 'var(--primary-subtle)' : 'transparent',
            color: activeTab === 'writing' ? 'var(--primary-text)' : 'var(--text-secondary)',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          3. Viết (Writing)
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'speaking' ? 'active' : ''}`}
          onClick={() => setActiveTab('speaking')}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            background: activeTab === 'speaking' ? 'var(--primary-subtle)' : 'transparent',
            color: activeTab === 'speaking' ? 'var(--primary-text)' : 'var(--text-secondary)',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          4. Nói (Speaking)
        </button>
      </div>

      {/* Tab 1: Listening Review */}
      {activeTab === 'listening' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
            Điểm phần nghe: <strong>{session.listeningResult?.scoreOutOf10 || 0} / 10</strong> (Đúng{' '}
            {session.listeningResult?.correctCount || 0}/35 câu)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {test.listening.questions.map((q, idx) => {
              const userAns = listeningAnswers[q.id];
              const isCorrect = userAns === q.correct_key;
              const { segment } = getQuestionTranscriptContext(test.listening, q.id);

              return (
                <div
                  key={q.id}
                  style={{
                    padding: 'var(--space-3) var(--space-4)',
                    background: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-md)',
                    borderLeft: `4px solid ${isCorrect ? 'var(--emerald)' : 'var(--coral)'}`,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--text-muted)' }}>
                      Câu {idx + 1}
                    </span>
                    <span className={`badge ${isCorrect ? 'badge-emerald' : 'badge-coral'}`} style={{ fontSize: '10px' }}>
                      {isCorrect ? 'Đúng' : 'Sai'}
                    </span>
                  </div>

                  <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, margin: '6px 0', color: 'var(--text-primary)' }}>
                    {q.question_text}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-2)' }}>
                    {q.options.map((opt) => {
                      const isSelected = userAns === opt.key;
                      const isKey = q.correct_key === opt.key;
                      let bg = 'var(--bg-surface)';
                      let border = 'var(--border)';
                      if (isKey) {
                        bg = 'var(--emerald-subtle)';
                        border = 'var(--emerald)';
                      } else if (isSelected && !isKey) {
                        bg = 'var(--coral-subtle)';
                        border = 'var(--coral)';
                      }

                      return (
                        <div
                          key={opt.key}
                          style={{
                            padding: 'var(--space-2)',
                            borderRadius: 'var(--radius-sm)',
                            background: bg,
                            border: `1px solid ${border}`,
                            fontSize: 'var(--fs-xs)',
                          }}
                        >
                          <strong>{opt.key}.</strong> {opt.text}
                          {isSelected && ' (Lựa chọn của bạn)'}
                        </div>
                      );
                    })}
                  </div>

                  {segment?.text_en && (
                    <div
                      style={{
                        marginTop: 'var(--space-2)',
                        padding: 'var(--space-2)',
                        background: 'var(--bg-surface)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 'var(--fs-xs)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <strong>Dẫn chứng transcript:</strong> {segment.text_en}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Reading Review */}
      {activeTab === 'reading' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
              Điểm phần đọc: <strong>{session.readingResult?.scoreOutOf10 || 0} / 10</strong> (Đúng{' '}
              {session.readingResult?.correctCount || 0}/40 câu)
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
              {test.reading.passages.map((_, pIdx) => (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => setReadingPassageIdx(pIdx)}
                  className={`secondary-btn ${readingPassageIdx === pIdx ? 'active' : ''}`}
                  style={{
                    fontSize: 'var(--fs-xs)',
                    padding: 'var(--space-1) var(--space-3)',
                    background: readingPassageIdx === pIdx ? 'var(--primary-subtle)' : undefined,
                  }}
                >
                  Bài Đọc {pIdx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Active Reading Passage */}
          {test.reading.passages[readingPassageIdx] && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>
              <div
                style={{
                  padding: 'var(--space-4)',
                  background: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  maxHeight: '60vh',
                  overflowY: 'auto',
                  fontSize: 'var(--fs-sm)',
                  lineHeight: 1.7,
                }}
              >
                <h4 style={{ margin: '0 0 var(--space-2) 0', color: 'var(--text-primary)' }}>
                  {test.reading.passages[readingPassageIdx].title}
                </h4>
                <div style={{ whiteSpace: 'pre-line' }}>
                  {test.reading.passages[readingPassageIdx].content_paragraphs.join('\n\n')}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxHeight: '60vh', overflowY: 'auto' }}>
                {test.reading.passages[readingPassageIdx].questions.map((q, qIdx) => (
                  <div
                    key={q.id}
                    style={{
                      padding: 'var(--space-3)',
                      background: 'var(--bg-surface)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--text-muted)' }}>
                      Câu {readingPassageIdx * 10 + qIdx + 1} • Đáp án chuẩn: {q.correct_key}
                    </div>
                    <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, margin: '4px 0' }}>{q.question_text}</div>
                    {q.explanation_vi && (
                      <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 4 }}>
                        <strong>Giải thích:</strong> {q.explanation_vi}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Writing Review */}
      {activeTab === 'writing' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {session.writingResult ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
                Điểm bài viết: <strong>{session.writingResult.compositeScore.roundedScore} / 10</strong> ({session.writingResult.compositeScore.band})
              </div>

              {/* Task 1 */}
              <div style={{ padding: 'var(--space-4)', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                  <h4 style={{ margin: 0 }}>Task 1: {test.writing.task1.title}</h4>
                  <span className="badge badge-primary">{session.writingResult.task1.taskScore.toFixed(1)} / 10</span>
                </div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
                  {test.writing.task1.prompt_text}
                </div>
                {session.writingResult.task1.ai_fixed_b1_essay && (
                  <div style={{ background: 'var(--bg-surface)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--fs-xs)', borderLeft: '3px solid var(--emerald)' }}>
                    <strong>Bản sửa chuẩn B1 (AI-Fixed B1):</strong>
                    <div style={{ marginTop: 4, whiteSpace: 'pre-line' }}>{session.writingResult.task1.ai_fixed_b1_essay}</div>
                  </div>
                )}
              </div>

              {/* Task 2 */}
              <div style={{ padding: 'var(--space-4)', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                  <h4 style={{ margin: 0 }}>Task 2: {test.writing.task2.title}</h4>
                  <span className="badge badge-primary">{session.writingResult.task2.taskScore.toFixed(1)} / 10</span>
                </div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
                  {test.writing.task2.prompt_text}
                </div>
                {session.writingResult.task2.ai_fixed_b1_essay && (
                  <div style={{ background: 'var(--bg-surface)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--fs-xs)', borderLeft: '3px solid var(--emerald)' }}>
                    <strong>Bản sửa chuẩn B1 (AI-Fixed B1):</strong>
                    <div style={{ marginTop: 4, whiteSpace: 'pre-line' }}>{session.writingResult.task2.ai_fixed_b1_essay}</div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 'var(--space-6)', color: 'var(--text-muted)' }}>
              Chưa có dữ liệu đánh giá phần Viết.
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Speaking Review */}
      {activeTab === 'speaking' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {session.speakingResult ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
                Điểm bài nói: <strong>{session.speakingResult.compositeScore.roundedScore} / 10</strong> ({session.speakingResult.compositeScore.band})
              </div>

              {[1, 2, 3].map((pNum) => {
                const pKey = `part${pNum}` as 'part1' | 'part2' | 'part3';
                const partEval = session.speakingResult?.[pKey];
                if (!partEval) return null;

                return (
                  <div key={pNum} style={{ padding: 'var(--space-4)', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                      <h4 style={{ margin: 0 }}>Part {pNum}: {partEval.partTitle}</h4>
                      <span className="badge badge-emerald">{partEval.partScore.toFixed(1)} / 10</span>
                    </div>

                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
                      Tốc độ nói: <strong>{partEval.detectedWpm} WPM</strong>
                    </div>

                    {partEval.transcript && (
                      <div style={{ background: 'var(--bg-surface)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--fs-xs)', marginBottom: 'var(--space-2)' }}>
                        <strong>Bản ghi âm nhận diện (ASR Transcript):</strong>
                        <div style={{ marginTop: 4 }}>{partEval.transcript}</div>
                      </div>
                    )}

                    {partEval.aiFixedB1Speech && (
                      <div style={{ background: 'var(--bg-surface)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--fs-xs)', borderLeft: '3px solid var(--emerald)' }}>
                        <strong>Bản nói mẫu chuẩn B1 (AI-Fixed B1):</strong>
                        <div style={{ marginTop: 4, whiteSpace: 'pre-line' }}>{partEval.aiFixedB1Speech}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 'var(--space-6)', color: 'var(--text-muted)' }}>
              Chưa có dữ liệu đánh giá phần Nói.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
