import React from 'react';
import { Link } from 'react-router';

export const SkillPracticePage: React.FC = () => {
  const skills = [
    {
      title: 'Luyện Nghe (Listening)',
      desc: '3 Part chuyên biệt với audio player tua ±5s, chỉnh tốc độ và nghe chép chính tả Dictation.',
      badge: 'Part 1 • 2 • 3',
      badgeColor: 'badge-primary',
      status: 'Sẵn Sàng Luyện',
      link: '/practice/listening',
      cta: 'Vào phòng luyện nghe →',
    },
    {
      title: 'Luyện Đọc (Reading)',
      desc: 'Giao diện Split-Pane chia đôi màn hình, tra từ 1 chạm và phân tích Paraphrase dẫn chứng.',
      badge: '4 Bài Đọc B1-C1',
      badgeColor: 'badge-emerald',
      status: 'Sẵn Sàng Luyện',
      link: '/practice/reading',
      cta: 'Vào phòng luyện đọc →',
    },
    {
      title: 'Luyện Viết (Writing)',
      desc: 'Bộ gợi ý dàn ý, thư viện mẫu câu, kho bài mẫu 5 màu và AI phân tích lỗi tư duy Vietlish.',
      badge: 'Task 1 & Task 2',
      badgeColor: 'badge-gold',
      status: 'Sẵn Sàng Luyện',
      link: '/practice/writing',
      cta: 'Vào phòng luyện viết →',
    },
    {
      title: 'Phòng Thu Nói (Speaking)',
      desc: 'Thu âm trình duyệt, đếm ngược BEEP chuẩn phòng thi, AI đánh giá phát âm và tốc độ nói WPM.',
      badge: '3 Phần Thu Âm',
      badgeColor: 'badge-emerald',
      status: 'Sẵn Sàng Luyện',
      link: '/practice/speaking',
      cta: 'Vào phòng thu nói →',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ fontSize: 'var(--fs-2xl)', fontWeight: 800, color: 'var(--text-primary)' }}>Luyện 4 Kỹ Năng VSTEP</h1>
        <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginTop: 4 }}>
          Chế độ luyện tập thân thiện có giàn giáo hỗ trợ (Scaffolding) dành riêng cho học viên hướng tới B1–B2.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
        {skills.map((skill, i) => {
          const CardElement = skill.link ? Link : 'div';
          return (
            <CardElement
              key={i}
              to={skill.link as string}
              className="card-surface"
              style={{
                padding: 'var(--space-5)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
                textDecoration: 'none',
                color: 'inherit',
                cursor: skill.link ? 'pointer' : 'default',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={`badge ${skill.badgeColor}`}>{skill.badge}</span>
                <span className={`badge ${skill.link ? 'badge-emerald' : 'badge-primary'}`} style={{ fontSize: 'var(--fs-xs)', fontWeight: 600 }}>
                  {skill.status}
                </span>
              </div>
              <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 700, margin: 0 }}>{skill.title}</h3>
              <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{skill.desc}</p>
              <div style={{ marginTop: 'auto', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border)' }}>
                <span style={{ fontSize: 'var(--fs-xs)', color: skill.link ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 700 }}>
                  {skill.cta}
                </span>
              </div>
            </CardElement>
          );
        })}
      </div>

      <div className="card-surface" style={{ padding: 'var(--space-5)', background: 'var(--bg-subtle)' }}>
        <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 700, marginBottom: 'var(--space-1)' }}>Cần củng cố từ vựng trước?</h3>
        <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
          Học từ vựng theo phương pháp Spaced Repetition giúp bạn nắm vững 1.500 từ vựng VSTEP trước khi vào giải đề.
        </p>
        <Link to="/flashcard" className="badge badge-primary" style={{ padding: '8px 16px', fontSize: 'var(--fs-xs)', fontWeight: 700 }}>
          Đến phòng Flashcard SRS →
        </Link>
      </div>
    </div>
  );
};
