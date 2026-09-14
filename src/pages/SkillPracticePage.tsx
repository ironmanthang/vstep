import React from 'react';
import { Link } from 'react-router';
import {
  PracticeIcon,
  HeadphonesIcon,
  BookOpenIcon,
  PenToolIcon,
  MicIcon
} from '../components/Icons';

export const SkillPracticePage: React.FC = () => {
  const skills = [
    {
      title: 'Listening',
      desc: 'Smart audio player with ±5s replay, speed control, and bilingual transcript clues.',
      badge: 'Part 1 • 2 • 3',
      badgeColor: 'badge-primary',
      icon: <HeadphonesIcon size={24} />,
      link: '/practice/listening',
    },
    {
      title: 'Reading',
      desc: 'Split-pane reading studio with 1-tap bilingual dictionary and verbatim clue highlights.',
      badge: '4 Passages • 40 Questions',
      badgeColor: 'badge-emerald',
      icon: <BookOpenIcon size={24} />,
      link: '/practice/reading',
    },
    {
      title: 'Writing',
      desc: 'Real-time word counter, outline scaffolding, and instant AI error analysis.',
      badge: 'Task 1 & Task 2',
      badgeColor: 'badge-gold',
      icon: <PenToolIcon size={24} />,
      link: '/practice/writing',
    },
    {
      title: 'Speaking',
      desc: 'In-browser recording with official BEEP countdowns, WPM tracker, and AI phonetic feedback.',
      badge: '3 Speaking Parts',
      badgeColor: 'badge-emerald',
      icon: <MicIcon size={24} />,
      link: '/practice/speaking',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', height: '100%', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <PracticeIcon size={22} color="var(--primary)" />
        <h1 style={{ fontSize: 'var(--fs-xl)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Skills Practice
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
        {skills.map((skill) => (
          <Link
            key={skill.title}
            to={skill.link}
            className="card-surface"
            style={{
              padding: 'var(--space-5)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              textDecoration: 'none',
              color: 'inherit',
              border: '1px solid var(--border)',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: 42, height: 42, borderRadius: 'var(--radius-md)', background: 'var(--primary-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                {skill.icon}
              </div>
              <span className={`badge ${skill.badgeColor}`}>{skill.badge}</span>
            </div>
            <h2 style={{ fontSize: 'var(--fs-lg)', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              {skill.title}
            </h2>
            <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
              {skill.desc}
            </p>
            <div style={{ marginTop: 'auto', paddingTop: 'var(--space-2)', color: 'var(--primary)', fontWeight: 700, fontSize: 'var(--fs-xs)' }}>
              Open Studio →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
