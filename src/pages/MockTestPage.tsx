import React from 'react';

export const MockTestPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ fontSize: 'var(--fs-2xl)', fontWeight: 800, color: 'var(--text-primary)' }}>Phòng Thi Thử VSTEP Thực Chiến</h1>
        <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginTop: 4 }}>
          Mô phỏng 100% định dạng phòng máy Bộ GD&ĐT (180 phút, cấm tua/tra từ, tự động thu bài, làm tròn 0.5 chính thức).
        </p>
      </div>

      <div className="card-surface" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <span className="badge badge-gold">Đề Thi Chuẩn Mẫu Số 01 (VSTEP.3-5)</span>
          <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Thời lượng: 180 phút • 4 Kỹ năng</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 'var(--space-3)', margin: 'var(--space-2) 0' }}>
          <div style={{ padding: 'var(--space-3)', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>1. Nghe (Listening)</span>
            <div style={{ fontWeight: 700, fontSize: 'var(--fs-sm)' }}>40 phút • 35 câu</div>
          </div>
          <div style={{ padding: 'var(--space-3)', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>2. Đọc (Reading)</span>
            <div style={{ fontWeight: 700, fontSize: 'var(--fs-sm)' }}>60 phút • 40 câu</div>
          </div>
          <div style={{ padding: 'var(--space-3)', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>3. Viết (Writing)</span>
            <div style={{ fontWeight: 700, fontSize: 'var(--fs-sm)' }}>60 phút • 2 tasks</div>
          </div>
          <div style={{ padding: 'var(--space-3)', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>4. Nói (Speaking)</span>
            <div style={{ fontWeight: 700, fontSize: 'var(--fs-sm)' }}>12 phút • 3 parts</div>
          </div>
        </div>

        <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>
          Quy chế: Khóa toàn bộ công cụ tra từ, bảng điểm Radar Chart 4 trục và báo cáo chi tiết theo Barem Bộ GD&ĐT sẽ xuất hiện ngay sau khi nộp bài.
        </p>

        <button className="primary-btn" style={{ width: 'fit-content' }}>
          Bắt Đầu Thi Thử (Sprint 3)
        </button>
      </div>
    </div>
  );
};
