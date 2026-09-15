import React, { useState } from 'react';
import type { MockTest } from '../../../types/schemas';
import { getLatestMockTestAttempt, loadMockTestSession } from '../mockTestStorage';
import { useAuth } from '../../../services/supabase/authStore';
import {
  HeadphonesIcon,
  BookOpenIcon,
  PenToolIcon,
  MicIcon,
} from '../../../components/Icons';
import './MockTestLobby.css';

interface MockTestLobbyProps {
  tests: MockTest[];
  onStartExam: (test: MockTest) => void;
  onViewPreviousResult: (test: MockTest) => void;
}

const SKILL_CARDS = [
  {
    title: 'Listening',
    timing: '40 phút • 35 câu',
    iconBg: 'var(--primary-subtle)',
    iconColor: 'var(--primary)',
    icon: <HeadphonesIcon size={20} />,
  },
  {
    title: 'Reading',
    timing: '60 phút • 40 câu',
    iconBg: 'var(--emerald-subtle)',
    iconColor: 'var(--emerald)',
    icon: <BookOpenIcon size={20} />,
  },
  {
    title: 'Writing',
    timing: '60 phút • 2 tasks',
    iconBg: 'var(--gold-subtle)',
    iconColor: 'var(--gold)',
    icon: <PenToolIcon size={20} />,
  },
  {
    title: 'Speaking',
    timing: '12 phút • 3 parts',
    iconBg: 'var(--emerald-subtle)',
    iconColor: 'var(--emerald)',
    icon: <MicIcon size={20} />,
  },
];

export const MockTestLobby: React.FC<MockTestLobbyProps> = ({
  tests,
  onStartExam,
  onViewPreviousResult,
}) => {
  const { user } = useAuth();
  const userId = user?.id;

  const [selectedTestId, setSelectedTestId] = useState<string>(tests[0]?.id || '');
  const selectedTest = tests.find((t) => t.id === selectedTestId) || tests[0];

  const latestAttempt = selectedTest ? getLatestMockTestAttempt(selectedTest.id, userId) : null;
  const savedSession = selectedTest ? loadMockTestSession(selectedTest.id, userId) : null;
  const hasInProgressSession = Boolean(
    savedSession && !savedSession.isSubmitted && savedSession.completedSections.length > 0
  );

  return (
    <div className="mock-test-lobby-container">
      {/* Test Edition Switcher */}
      <div className="mock-test-edition-bar">
        {tests.map((t) => {
          const isSelected = t.id === selectedTestId;
          const attempt = getLatestMockTestAttempt(t.id, userId);

          return (
            <button
              key={t.id}
              type="button"
              className={`secondary-btn mock-test-edition-btn ${isSelected ? 'active' : ''}`}
              onClick={() => setSelectedTestId(t.id)}
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

      {/* Selected Test Overview Card */}
      {selectedTest && (
        <div className="mock-test-card card-surface">
          {/* Header Row */}
          <div className="mock-test-meta-row">
            <div className="mock-test-meta-title-group">
              <h2 className="mock-test-meta-title">
                Đề {selectedTest.test_number < 10 ? `0${selectedTest.test_number}` : selectedTest.test_number}
              </h2>
              <span className="badge badge-gold">Chuẩn ULIS</span>
              {hasInProgressSession && (
                <span className="badge badge-coral">Đang làm dở</span>
              )}
            </div>
            <span className="mock-test-meta-time">180 phút</span>
          </div>

          {/* Previous Attempt Banner */}
          {latestAttempt && (
            <div className="mock-test-attempt-banner">
              <span className="mock-test-attempt-text">
                Lần thi gần nhất: {latestAttempt.overallScore} / 10.0 ({latestAttempt.bandNameVi})
              </span>
              <button
                type="button"
                className="mock-test-attempt-link"
                onClick={() => onViewPreviousResult(selectedTest)}
              >
                Xem lại báo cáo
              </button>
            </div>
          )}

          {/* 4 Skills Grid */}
          <div className="mock-test-skills-grid">
            {SKILL_CARDS.map((skill) => (
              <div key={skill.title} className="mock-test-skill-card">
                <div
                  className="mock-test-skill-icon"
                  style={{ background: skill.iconBg, color: skill.iconColor }}
                >
                  {skill.icon}
                </div>
                <div className="mock-test-skill-info">
                  <span className="mock-test-skill-name">{skill.title}</span>
                  <span className="mock-test-skill-detail">{skill.timing}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Condensed Exam Rules Strip */}
          <div className="mock-test-rules-strip">
            <strong>Quy chế:</strong> 180 phút liên tục • Khóa tra từ • Tự động nộp bài • Barem 0.5
          </div>

          {/* Primary Action CTA */}
          <button
            type="button"
            className="primary-btn mock-test-cta-btn"
            onClick={() => onStartExam(selectedTest)}
          >
            {hasInProgressSession ? 'Tiếp Tục Bài Thi Đang Dang Dở' : 'Bắt Đầu Thi Thử (180 Phút)'}
          </button>
        </div>
      )}
    </div>
  );
};
