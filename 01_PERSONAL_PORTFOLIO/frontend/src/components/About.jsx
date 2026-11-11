import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Target, Heart, Book, Code, Globe2 } from 'lucide-react';

export default function About() {
  const { personal } = portfolioData;

  return (
    <section id="about" style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Target size={14} />
            Profile Overview
          </div>
          <h2 className="section-title">
            About <span>Me</span>
          </h2>
          <p className="section-desc">
            A glimpse into my academic drive, career trajectory, core strengths, and personal interests.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          <div className="glass-card" style={{ padding: '2.25rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Target size={22} color="#db2777" />
              Career Objective
            </h3>
            <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
              {personal.careerObjective}
            </p>
            <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.75' }}>
              Currently focused on developing robust full-stack software applications, solving challenging algorithmic problems in Java, and exploring AI/ML architectures for real-world impact.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '2.25rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Heart size={22} color="#f43f5e" />
              Personal Highlights & Passions
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div style={{ padding: '0.5rem', background: '#fdf2f8', borderRadius: '10px', color: '#db2777' }}>
                  <Code size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>Favorite Programming Language</h4>
                  <p style={{ fontSize: '0.9rem', color: '#64748b' }}>{personal.favLanguage} – Core object-oriented programming, data structures, and problem solving.</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div style={{ padding: '0.5rem', background: '#fdf2f8', borderRadius: '10px', color: '#db2777' }}>
                  <Book size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>Personal Interests & Reading</h4>
                  <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Reading books (Favourite: <em>Agni Siragugal</em> by Dr. A.P.J. Abdul Kalam) and listening to uplifting music.</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div style={{ padding: '0.5rem', background: '#fdf2f8', borderRadius: '10px', color: '#db2777' }}>
                  <Globe2 size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>Languages Known</h4>
                  <p style={{ fontSize: '0.9rem', color: '#64748b' }}>{personal.languages.join(' and ')} (Fluent professional proficiency).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
