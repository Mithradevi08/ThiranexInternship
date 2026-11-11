import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { ArrowRight, Download, Mail, Award, Code2, Sparkles, BookOpen } from 'lucide-react';

export default function Hero({ onOpenResume }) {
  const { personal } = portfolioData;

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="hero-badge">
              <Sparkles size={16} className="text-pink-600" />
              <span>Third-Year B.E. CSE Student</span>
            </div>

            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">{personal.fullName}</span>
            </h1>

            <p style={{ fontSize: '1.4rem', fontWeight: '700', color: '#db2777', marginBottom: '0.85rem' }}>
              {personal.title}
            </p>

            <p className="hero-subtitle">
              {personal.bio}
            </p>

            <div className="hero-cta">
              <a href="#projects" className="btn btn-primary">
                View My Projects
                <ArrowRight size={18} />
              </a>

              <button onClick={onOpenResume} className="btn btn-secondary">
                <Download size={18} />
                Download Resume
              </button>

              <a href="#contact" className="btn btn-secondary">
                <Mail size={18} />
                Contact Me
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <h4>8.63</h4>
                <p>CGPA (Kongu Eng. College)</p>
              </div>
              <div className="stat-item">
                <h4>4+</h4>
                <p>Major Projects</p>
              </div>
              <div className="stat-item">
                <h4>4</h4>
                <p>Global Certifications</p>
              </div>
            </div>
          </div>

          <div className="hero-avatar-wrapper">
            <div className="avatar-card">
              <div className="avatar-circle">
                MR
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>{personal.displayName}</h3>
              <p style={{ color: '#db2777', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                Full Stack & AI Enthusiast
              </p>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                Kongu Engineering College
              </p>

              <div className="floating-pill pill-1">
                <Code2 size={16} color="#db2777" />
                <span>Fav: Java & MERN</span>
              </div>

              <div className="floating-pill pill-2">
                <Award size={16} color="#f43f5e" />
                <span>Academic Excellence '24</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
