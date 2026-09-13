import React, { useState } from 'react';
import type { MockTest } from '../../../types/schemas';
import type { MockTestSession } from '../types';
import { MockTestRadarChart } from './MockTestRadarChart';
import { MockTestReviewViewer } from './MockTestReviewViewer';
import { getMockTestHistory } from '../mockTestStorage';
import { useUserStore } from '../../../services/user/userStore';

interface MockTestResultDashboardProps {
  test: MockTest;
  session: MockTestSession;
  onRetake: () => void;
  onExit: () => void;
}

export const MockTestResultDashboard: React.FC<MockTestResultDashboardProps> = ({
  test,
  session,
  onRetake,
  onExit,
}) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const { targetBand } = useUserStore();
  const history = getMockTestHistory();

  const composite = session.compositeResult;
  if (!composite) {
    return (
      <div className="card-surface" style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
        <h3>Chưa có kết quả tổng hợp bài thi.</h3>
        <button type="button" className="primary-btn" onClick={onExit} style={{ marginTop: 'var(--space-4)' }}>
          Quay Về Trang Chủ
        </button>
      </div>
    );
  }

  if (isReviewOpen) {
    return <MockTestReviewViewer test={test} session={session} onClose={() => setIsReviewOpen(false)} />;
  }

  const { bandInfo, roundedOverall, listeningScore, readingScore, writingScore, speakingScore, blurCount } = composite;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      {/* Top Banner: Certificate & Overall Score */}
      <div
        className="card-surface"
        style={{
          padding: 'var(--space-6)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          borderLeft: '5px solid var(--primary)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', maxWidth: 540 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span className={`badge ${bandInfo.badgeClass}`} style={{ fontSize: 'var(--fs-sm)', fontWeight: 800 }}>
              {bandInfo.bandNameVi}
            </span>
            <span className="badge badge-gold">Barem Chuẩn QĐ 729/QĐ-BGDĐT</span>
          </div>

          <h1 style={{ fontSize: 'var(--fs-2xl)', fontWeight: 800, margin: '6px 0 2px 0', color: 'var(--text-primary)' }}>
            Kết Quả Thi Thử VSTEP Thực Chiến
          </h1>
          <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', margin: 0 }}>
            {bandInfo.descriptionVi}
          </p>
          <div
            style={{
              fontSize: 'var(--fs-xs)',
              color: 'var(--primary-text)',
              background: 'var(--primary-subtle)',
              padding: 'var(--space-2) var(--space-3)',
              borderRadius: 'var(--radius-sm)',
              marginTop: 'var(--space-2)',
            }}
          >
            <strong>Chuẩn áp dụng:</strong> {bandInfo.qualificationSummary}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-subtle)',
            padding: 'var(--space-5)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            minWidth: 160,
          }}
        >
          <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--text-muted)' }}>
            ĐIỂM TỔNG (OVERALL)
          </span>
          <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1.1 }}>
            {roundedOverall.toFixed(1)}
          </div>
          <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 4 }}>
            Thang điểm 10.0 (Làm tròn 0.5)
          </span>
        </div>
      </div>

      {/* 4 Skill Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-3)' }}>
        {/* Listening */}
        <div className="card-surface" style={{ padding: 'var(--space-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--text-muted)' }}>1. Nghe (Listening)</span>
            <span className="badge badge-emerald">{listeningScore.toFixed(1)} / 10</span>
          </div>
          <div style={{ fontSize: 'var(--fs-lg)', fontWeight: 800, margin: 'var(--space-1) 0' }}>
            {session.listeningResult?.correctCount || 0} / 35 câu đúng
          </div>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>
            Thời gian: ~40 phút • Nghe 1 lần duy nhất
          </div>
        </div>

        {/* Reading */}
        <div className="card-surface" style={{ padding: 'var(--space-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--text-muted)' }}>2. Đọc (Reading)</span>
            <span className="badge badge-emerald">{readingScore.toFixed(1)} / 10</span>
          </div>
          <div style={{ fontSize: 'var(--fs-lg)', fontWeight: 800, margin: 'var(--space-1) 0' }}>
            {session.readingResult?.correctCount || 0} / 40 câu đúng
          </div>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>
            Thời gian: 60 phút • 4 bài đọc học thuật
          </div>
        </div>

        {/* Writing */}
        <div className="card-surface" style={{ padding: 'var(--space-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--text-muted)' }}>3. Viết (Writing)</span>
            <span className="badge badge-emerald">{writingScore.toFixed(1)} / 10</span>
          </div>
          <div style={{ fontSize: 'var(--fs-lg)', fontWeight: 800, margin: 'var(--space-1) 0' }}>
            {session.writingResult?.compositeScore.band || 'Đã chấm'}
          </div>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>
            Task 1: {session.writingResult?.task1.taskScore.toFixed(1) || '-'} • Task 2: {session.writingResult?.task2.taskScore.toFixed(1) || '-'}
          </div>
        </div>

        {/* Speaking */}
        <div className="card-surface" style={{ padding: 'var(--space-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--text-muted)' }}>4. Nói (Speaking)</span>
            <span className="badge badge-emerald">{speakingScore.toFixed(1)} / 10</span>
          </div>
          <div style={{ fontSize: 'var(--fs-lg)', fontWeight: 800, margin: 'var(--space-1) 0' }}>
            {session.speakingResult?.compositeScore.band || 'Đã chấm'}
          </div>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>
            3 Parts • Ghi âm chuẩn máy tính MOET
          </div>
        </div>
      </div>

      {/* Middle Grid: Radar Chart + Exam Integrity & History */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>
        {/* Radar Chart */}
        <MockTestRadarChart
          listening={listeningScore}
          reading={readingScore}
          writing={writingScore}
          speaking={speakingScore}
          targetBand={targetBand || 'B2'}
        />

        {/* Exam Integrity & History Summary */}
        <div className="card-surface" style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div>
            <h3 style={{ fontSize: 'var(--fs-sm)', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              Độ Trung Thực &amp; Giám Sát Phòng Thi
            </h3>
            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 4 }}>
              Hệ thống theo dõi tự động click chuột ngoài cửa sổ và chuyển tab.
            </div>
          </div>

          <div
            style={{
              padding: 'var(--space-3)',
              borderRadius: 'var(--radius-md)',
              background: blurCount > 0 ? 'var(--coral-subtle)' : 'var(--emerald-subtle)',
              border: `1px solid ${blurCount > 0 ? 'var(--coral)' : 'var(--emerald)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 600 }}>Số lần rời tab thi:</span>
            <span style={{ fontSize: 'var(--fs-md)', fontWeight: 800, color: blurCount > 0 ? 'var(--coral)' : 'var(--emerald)' }}>
              {blurCount} lần {blurCount === 0 ? '(100% Tập trung)' : '(Có gián đoạn)'}
            </span>
          </div>

          {/* Past Attempts List */}
          <div>
            <h4 style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Lịch Sử Thi Thử Gần Đây ({history.length} lần)
            </h4>
            {history.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-2)', maxHeight: 160, overflowY: 'auto' }}>
                {history.slice(0, 4).map((h) => (
                  <div
                    key={h.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 'var(--space-2)',
                      background: 'var(--bg-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 'var(--fs-xs)',
                    }}
                  >
                    <span>{h.dateStr} • {h.testTitle.slice(0, 24)}...</span>
                    <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
                      {h.overallScore} ({h.band})
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginTop: 'var(--space-2)' }}>
                Đây là bài thi thử đầu tiên của bạn!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <button
          type="button"
          className="primary-btn"
          onClick={() => setIsReviewOpen(true)}
          style={{ padding: 'var(--space-3) var(--space-5)' }}
        >
          🔍 Xem Lại Chi Tiết Từng Câu Hỏi &amp; Dẫn Chứng
        </button>

        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button
            type="button"
            className="secondary-btn"
            onClick={onRetake}
            style={{ padding: 'var(--space-3) var(--space-4)' }}
          >
            🔄 Thi Lại Đề Này
          </button>
          <button
            type="button"
            className="secondary-btn"
            onClick={onExit}
            style={{ padding: 'var(--space-3) var(--space-4)' }}
          >
            Quay Về Danh Sách Đề Thi
          </button>
        </div>
      </div>
    </div>
  );
};
