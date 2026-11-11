import React from 'react';
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#0f172a', color: '#f8fafc', padding: '60px 0 30px' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', paddingBottom: '2.5rem', borderBottom: '1px solid #334155' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="brand-dot"></span>
              {personal.fullName}
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
              {personal.title} | {personal.college}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ffffff', background: '#1e293b', padding: '0.6rem', borderRadius: '50%', display: 'flex', transition: 'all 0.2s ease' }}
              title="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ffffff', background: '#1e293b', padding: '0.6rem', borderRadius: '50%', display: 'flex', transition: 'all 0.2s ease' }}
              title="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              style={{ color: '#ffffff', background: '#1e293b', padding: '0.6rem', borderRadius: '50%', display: 'flex', transition: 'all 0.2s ease' }}
              title="Email"
            >
              <Mail size={20} />
            </a>
            <button
              onClick={scrollToTop}
              style={{ color: '#ffffff', background: '#db2777', border: 'none', padding: '0.6rem', borderRadius: '50%', cursor: 'pointer', display: 'flex', marginLeft: '0.5rem' }}
              title="Scroll to Top"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '1.75rem', fontSize: '0.88rem', color: '#64748b' }}>
          <p>© {new Date().getFullYear()} Mithradevi Rajalingam. Developed for Thiranex Full Stack Internship.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            Crafted with React, Node.js & Passion <Heart size={14} color="#f43f5e" fill="#f43f5e" />
          </p>
        </div>
      </div>
    </footer>
  );
}
