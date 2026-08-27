import React from 'react';
import { Link } from 'react-router';
import {
  FlashcardIcon,
  PracticeIcon,
  MockTestIcon,
  FireIcon
} from '../components/Icons';

export const HomePage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Welcome Banner */}
      <div className="card-surface" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <div>
            <span className="badge badge-primary" style={{ marginBottom: 'var(--space-1)' }}>Học Viên B1 Nền Tảng</span>
            <h1 style={{ fontSize: 'var(--fs-2xl)', fontWeight: 800 }}>Xin chào, Lan! 👋</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', background: 'var(--emerald-subtle)', padding: '8px 16px', borderRadius: 'var(--radius-full)' }}>
            <FireIcon size={22} color="#059669" />
            <span style={{ fontWeight: 800, color: '#065F46', fontSize: 'var(--fs-sm)' }}>Chuỗi 5 ngày học liên tục</span>
          </div>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)', maxWidth: '640px' }}>
          Mục tiêu: Đạt chứng chỉ <strong>VSTEP B1 (Bậc 3)</strong>. Mỗi ngày ôn tập 10–15 phút từ vựng SRS để nâng band vững chắc, không học vẹt.
        </p>
      </div>

      {/* Quick Action Cards Grid */}
      <div>
        <h2 style={{ fontSize: 'var(--fs-lg)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>Hoạt Động Hôm Nay</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-4)' }}>
          {/* Card 1: Flashcard SRS */}
          <Link to="/flashcard" className="card-surface" style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', transition: 'all 0.2s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--primary-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <FlashcardIcon size={22} />
              </div>
              <span className="badge badge-primary">Ưu tiên số 1</span>
            </div>
            <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 700, color: 'var(--text-primary)' }}>Từ Vựng SRS Hàng Ngày</h3>
            <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Ôn tập ngắt quãng 15 từ vựng cốt lõi theo 8 chủ đề VSTEP. Thuật toán tự lên lịch nhắc lại.
            </p>
            <div style={{ marginTop: 'auto', paddingTop: 'var(--space-2)', color: 'var(--primary)', fontWeight: 700, fontSize: 'var(--fs-xs)' }}>
              Vào phòng ôn tập →
            </div>
          </Link>

          {/* Card 2: Skill Practice */}
          <Link to="/practice" className="card-surface" style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--emerald-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--emerald)' }}>
                <PracticeIcon size={22} />
              </div>
              <span className="badge badge-emerald">4 Kỹ Năng</span>
            </div>
            <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 700, color: 'var(--text-primary)' }}>Luyện Kỹ Năng Thân Thiện</h3>
            <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Nghe có tua lại ±5s, Đọc tra từ 1 chạm, Viết có dàn ý gợi ý, Nói có phòng thu tương tác.
            </p>
            <div style={{ marginTop: 'auto', paddingTop: 'var(--space-2)', color: 'var(--emerald)', fontWeight: 700, fontSize: 'var(--fs-xs)' }}>
              Chọn kỹ năng luyện →
            </div>
          </Link>

          {/* Card 3: Mock Test */}
          <Link to="/mock-test" className="card-surface" style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--gold-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
                <MockTestIcon size={22} />
              </div>
              <span className="badge badge-gold">180 Phút</span>
            </div>
            <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 700, color: 'var(--text-primary)' }}>Phòng Thi Thử Máy Tính</h3>
            <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Mô phỏng 100% phần mềm thi Bộ GD&ĐT. Tự động tính điểm và làm tròn 0.5 chính thức.
            </p>
            <div style={{ marginTop: 'auto', paddingTop: 'var(--space-2)', color: 'var(--gold-hover)', fontWeight: 700, fontSize: 'var(--fs-xs)' }}>
              Xem danh sách đề →
            </div>
          </Link>
        </div>
      </div>

      {/* Target Progress Bar */}
      <div className="card-surface" style={{ padding: 'var(--space-5)' }}>
        <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
          Tiến Độ Chinh Phục VSTEP B1 (Bậc 3)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-3)' }}>
          <div style={{ padding: 'var(--space-3)', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Từ Vựng Đã Học</span>
            <div style={{ fontSize: 'var(--fs-lg)', fontWeight: 700, color: 'var(--primary)' }}>15 / 1.500 từ</div>
          </div>
          <div style={{ padding: 'var(--space-3)', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Bài Luyện Đã Làm</span>
            <div style={{ fontSize: 'var(--fs-lg)', fontWeight: 700, color: 'var(--emerald)' }}>6 bài tập</div>
          </div>
          <div style={{ padding: 'var(--space-3)', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Điểm Dự Báo Gần Nhất</span>
            <div style={{ fontSize: 'var(--fs-lg)', fontWeight: 700, color: 'var(--gold)' }}>4.5 / 10 (Cận B1)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
