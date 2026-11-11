import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { GraduationCap, Calendar, Award, CheckCircle } from 'lucide-react';

export default function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" style={{ padding: '80px 0', background: 'rgba(253, 242, 248, 0.45)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <GraduationCap size={14} />
            Academic Journey
          </div>
          <h2 className="section-title">
            My <span>Education</span>
          </h2>
          <p className="section-desc">
            A consistent record of high academic performance from school to engineering.
          </p>
        </div>

        <div className="timeline">
          {education.map((edu, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="glass-card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                      {edu.degree}
                    </h3>
                    <p style={{ fontSize: '1rem', fontWeight: 600, color: '#db2777' }}>
                      {edu.institution}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
                      <Calendar size={14} />
                      {edu.period}
                    </span>
                    <span style={{ background: '#fdf2f8', color: '#be185d', padding: '0.2rem 0.75rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 700, border: '1px solid rgba(236,72,153,0.3)' }}>
                      {edu.score}
                    </span>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: '1rem' }}>
                  {edu.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.92rem', color: '#475569', marginBottom: '0.4rem' }}>
                      <CheckCircle size={16} color="#db2777" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
