import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Trophy, Star, Award, Presentation } from 'lucide-react';

export default function Achievements() {
  const { achievements } = portfolioData;

  const getIcon = (idx) => {
    switch (idx) {
      case 0:
        return <Trophy size={24} color="#db2777" />;
      case 1:
        return <Presentation size={24} color="#db2777" />;
      case 2:
        return <Star size={24} color="#db2777" />;
      default:
        return <Award size={24} color="#db2777" />;
    }
  };

  return (
    <section id="achievements" style={{ padding: '80px 0', background: 'rgba(253, 242, 248, 0.45)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Trophy size={14} />
            Milestones
          </div>
          <h2 className="section-title">
            Honors & <span>Achievements</span>
          </h2>
          <p className="section-desc">
            Key academic awards, research paper presentations, and hackathon milestones.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
          {achievements.map((item, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#fdf2f8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', border: '1px solid rgba(236,72,153,0.3)' }}>
                {getIcon(idx)}
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
                {item.title}
              </h3>

              <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#db2777', marginBottom: '0.85rem' }}>
                {item.organization}
              </p>

              <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: '1.65' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
