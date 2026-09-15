import React from 'react';
import { Link } from 'react-router';
import {
  HeadphonesIcon,
  BookOpenIcon,
  PenToolIcon,
  MicIcon
} from '../components/Icons';
import './SkillPracticePage.css';

export const SkillPracticePage: React.FC = () => {
  const skills = [
    {
      title: 'Listening',
      badge: 'Part 1 • 2 • 3',
      badgeColor: 'badge-primary',
      iconBg: 'var(--primary-subtle)',
      iconColor: 'var(--primary)',
      icon: <HeadphonesIcon size={24} />,
      link: '/practice/listening',
    },
    {
      title: 'Reading',
      badge: '4 Passages • 40Q',
      badgeColor: 'badge-emerald',
      iconBg: 'var(--emerald-subtle)',
      iconColor: 'var(--emerald)',
      icon: <BookOpenIcon size={24} />,
      link: '/practice/reading',
    },
    {
      title: 'Writing',
      badge: 'Task 1 & Task 2',
      badgeColor: 'badge-gold',
      iconBg: 'var(--gold-subtle)',
      iconColor: 'var(--gold)',
      icon: <PenToolIcon size={24} />,
      link: '/practice/writing',
    },
    {
      title: 'Speaking',
      badge: '3 Speaking Parts',
      badgeColor: 'badge-emerald',
      iconBg: 'var(--emerald-subtle)',
      iconColor: 'var(--emerald)',
      icon: <MicIcon size={24} />,
      link: '/practice/speaking',
    },
  ];

  return (
    <div className="skill-practice-container">
      <div className="skill-practice-grid">
        {skills.map((skill) => (
          <Link
            key={skill.title}
            to={skill.link}
            className="card-surface skill-card"
          >
            <div
              className="skill-card-icon"
              style={{ background: skill.iconBg, color: skill.iconColor }}
            >
              {skill.icon}
            </div>
            <h2 className="skill-card-title">
              {skill.title}
            </h2>
            <span className={`badge ${skill.badgeColor} skill-card-badge`}>
              {skill.badge}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
