import React, { useState } from 'react';
import type { MockTest } from '../../../types/schemas';
import { getLatestMockTestAttempt, loadMockTestSession } from '../mockTestStorage';

interface MockTestLobbyProps {
  tests: MockTest[];
  onStartExam: (test: MockTest) => void;
  onViewPreviousResult: (test: MockTest) => void;
}

export const MockTestLobby: React.FC<MockTestLobbyProps> = ({
  tests,
  onStartExam,
  onViewPreviousResult,
}) => {
  const [selectedTestId, setSelectedTestId] = useState<string>(tests[0]?.id || '');
  const selectedTest = tests.find((t) => t.id === selectedTestId) || tests[0];

  const latestAttempt = selectedTest ? getLatestMockTestAttempt(selectedTest.id) : null;
  const savedSession = selectedTest ? loadMockTestSession(selectedTest.id) : null;
  const hasInProgressSession = Boolean(savedSession && !savedSession.isSubmitted && savedSession.completedSections.length > 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Page Title & Intro */}
      <div>
        <h1 style={{ fontSize: 'var(--fs-2xl)', fontWeight: 800, color: 'var(--text-primary)' }}>
          Phòng Thi Thử VSTEP Thực Chiến
        </h1>
        <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginTop: 4 }}>
          Mô phỏng 100% định dạng phòng máy Bộ GD&amp;ĐT (180 phút, cấm tua/tra từ, tự động thu bài, làm tròn 0.5 chính thức).
        </p>
      </div>

      {/* Test Edition Switcher */}
      <div className="card-surface" style={{ padding: 'var(--space-4)' }}>
        <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
          CHỌN ĐỀ THI CHUẨN ULIS (ĐH NGOẠI NGỮ - ĐHQGHN):
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          {tests.map((t) => {
            const isSelected = t.id === selectedTestId;
            const attempt = getLatestMockTestAttempt(t.id);

            return (
              <button
                key={t.id}
                type="button"
                className={`secondary-btn ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedTestId(t.id)}
                style={{
                  padding: 'var(--space-2) var(--space-4)',
                  fontSize: 'var(--fs-sm)',
                  fontWeight: isSelected ? 800 : 600,
                  background: isSelected ? 'var(--primary-subtle)' : undefined,
                  borderColor: isSelected ? 'var(--primary)' : undefined,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                }}
              >
                <span>Đề {t.test_number < 10 ? `0${t.test_number}` : t.test_number}</span>
                {attempt && (
                  <span className="badge badge-emerald" style={{ fontSize: '9px', padding: '1px 5px' }}>
                    {attempt.overallScore}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Test Overview Card */}
      {selectedTest && (
        <div className="card-surface" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            <div>
              <span className="badge badge-gold">Đề Thi Chuẩn Số {selectedTest.test_number}</span>
              <h2 style={{ fontSize: 'var(--fs-xl)', fontWeight: 800, margin: '4px 0 0 0', color: 'var(--text-primary)' }}>
                {selectedTest.title}
              </h2>
            </div>
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
              {selectedTest.institution} • Tổng thời lượng: 180 phút
            </span>
          </div>

          {/* 4 Skill Cards Preview */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-3)' }}>
            <div style={{ padding: 'var(--space-3)', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>1. Nghe (Listening)</span>
              <div style={{ fontWeight: 700, fontSize: 'var(--fs-sm)' }}>40 phút • 35 câu</div>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>Audio liên tục 1 lần</div>
            </div>
            <div style={{ padding: 'var(--space-3)', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>2. Đọc (Reading)</span>
              <div style={{ fontWeight: 700, fontSize: 'var(--fs-sm)' }}>60 phút • 40 câu</div>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>4 bài đọc học thuật</div>
            </div>
            <div style={{ padding: 'var(--space-3)', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>3. Viết (Writing)</span>
              <div style={{ fontWeight: 700, fontSize: 'var(--fs-sm)' }}>60 phút • 2 tasks</div>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>Thư (120 từ) &amp; Luận (250 từ)</div>
            </div>
            <div style={{ padding: 'var(--space-3)', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>4. Nói (Speaking)</span>
              <div style={{ fontWeight: 700, fontSize: 'var(--fs-sm)' }}>12 phút • 3 parts</div>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>Ghi âm chuẩn tín hiệu BEEP</div>
            </div>
          </div>

          {/* Previous Attempt Summary if Available */}
          {latestAttempt && (
            <div
              style={{
                background: 'var(--emerald-subtle)',
                border: '1px solid var(--emerald)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-3) var(--space-4)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 'var(--space-2)',
              }}
            >
              <div>
                <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--emerald-text)' }}>
                  LẦN THI GẦN NHẤT ({latestAttempt.dateStr}):
                </span>
                <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--emerald-text)' }}>
                  {latestAttempt.overallScore} / 10.0 • {latestAttempt.bandNameVi} (Nghe: {latestAttempt.listeningScore} | Đọc: {latestAttempt.readingScore} | Viết: {latestAttempt.writingScore} | Nói: {latestAttempt.speakingScore})
                </div>
              </div>

              <button
                type="button"
                className="secondary-btn"
                onClick={() => onViewPreviousResult(selectedTest)}
                style={{ fontSize: 'var(--fs-xs)', padding: 'var(--space-2) var(--space-3)' }}
              >
                Xem Lại Báo Cáo Cũ
              </button>
            </div>
          )}

          {/* Exam Regulations Notice */}
          <div
            style={{
              padding: 'var(--space-3) var(--space-4)',
              background: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--fs-xs)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}
          >
            <strong>Quy chế phòng thi:</strong> Khóa toàn bộ công cụ tra từ và phụ đề; không thể quay lại phần thi trước sau khi đã chuyển tiếp; hệ thống tự động ghi nhận nếu click chuột ra ngoài cửa sổ thi; bảng điểm Barem 0.5 và Radar Chart 4 trục hiển thị ngay sau khi hoàn thành.
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginTop: 'var(--space-2)' }}>
            <button
              type="button"
              className="primary-btn"
              onClick={() => onStartExam(selectedTest)}
              style={{ padding: 'var(--space-3) var(--space-6)', fontSize: 'var(--fs-base)' }}
            >
              {hasInProgressSession ? 'Tiếp Tục Bài Thi Đang Dang Dở' : 'Bắt Đầu Thi Thử (180 Phút)'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
