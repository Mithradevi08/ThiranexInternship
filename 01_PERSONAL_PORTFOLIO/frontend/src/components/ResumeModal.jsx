import React from 'react';
import { X, Printer, Download, Mail, MapPin, Award, CheckCircle2, Globe, Github, Linkedin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function ResumeModal({ onClose }) {
  const { personal, education, skillCategories, projects, certifications, achievements } = portfolioData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '850px', background: '#ffffff', padding: '2.5rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#db2777', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Curriculum Vitae
            </span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>
              {personal.fullName}
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              onClick={handlePrint}
              className="btn btn-primary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              <Printer size={16} />
              Print / Save PDF
            </button>
            <button className="modal-close" style={{ position: 'static' }} onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Resume Container */}
        <div className="resume-sheet" style={{ color: '#1e293b', fontSize: '0.9rem', lineHeight: '1.6' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '1.75rem', borderBottom: '2px solid #fce7f3', paddingBottom: '1.25rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
              {personal.fullName}
            </h1>
            <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#db2777', marginBottom: '0.5rem' }}>
              {personal.title} | {personal.college}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.85rem', color: '#64748b' }}>
              <span>{personal.location}</span>
              <span>•</span>
              <span>{personal.email}</span>
              <span>•</span>
              <span>GitHub: {personal.github.replace('https://', '')}</span>
              <span>•</span>
              <span>LinkedIn: {personal.linkedin.replace('https://', '')}</span>
            </div>
          </div>

          {/* Career Objective */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#db2777', textTransform: 'uppercase', borderBottom: '1.5px solid #fbcfe8', paddingBottom: '0.25rem', marginBottom: '0.5rem' }}>
              Career Objective
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#334155' }}>
              {personal.careerObjective}
            </p>
          </div>

          {/* Education */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#db2777', textTransform: 'uppercase', borderBottom: '1.5px solid #fbcfe8', paddingBottom: '0.25rem', marginBottom: '0.75rem' }}>
              Education
            </h3>
            {education.map((edu, idx) => (
              <div key={idx} style={{ marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#0f172a' }}>
                  <span>{edu.degree} – {edu.institution}</span>
                  <span style={{ color: '#db2777' }}>{edu.score}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  {edu.period} | {edu.status}
                </div>
              </div>
            ))}
          </div>

          {/* Technical Skills */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#db2777', textTransform: 'uppercase', borderBottom: '1.5px solid #fbcfe8', paddingBottom: '0.25rem', marginBottom: '0.75rem' }}>
              Technical Skills
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.65rem' }}>
              <div>
                <strong>Programming Languages:</strong> Java (Favorite), Python, C++, C, JavaScript
              </div>
              <div>
                <strong>Web Technologies:</strong> React.js, Node.js, Express.js, HTML5, CSS3, REST APIs
              </div>
              <div>
                <strong>Databases & Tools:</strong> MongoDB, MySQL, Git, GitHub, VS Code, Jupyter
              </div>
              <div>
                <strong>Core Disciplines:</strong> Data Structures & Algorithms, OOP, DBMS, OS
              </div>
            </div>
          </div>

          {/* Projects */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#db2777', textTransform: 'uppercase', borderBottom: '1.5px solid #fbcfe8', paddingBottom: '0.25rem', marginBottom: '0.75rem' }}>
              Academic & Engineering Projects
            </h3>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#0f172a' }}>
                  <span>{proj.title}</span>
                  <span style={{ fontSize: '0.8rem', color: '#db2777' }}>{proj.category}</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', fontStyle: 'italic', marginBottom: '0.25rem' }}>
                  Tech: {proj.techStack.join(', ')}
                </div>
                <p style={{ fontSize: '0.88rem', color: '#334155' }}>
                  {proj.shortDesc}
                </p>
              </div>
            ))}
          </div>

          {/* Certifications & Achievements */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#db2777', textTransform: 'uppercase', borderBottom: '1.5px solid #fbcfe8', paddingBottom: '0.25rem', marginBottom: '0.5rem' }}>
                Certifications
              </h3>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: '#334155' }}>
                {certifications.map((c) => (
                  <li key={c.id} style={{ marginBottom: '0.35rem' }}>
                    <strong>{c.title}</strong> – {c.issuer} ({c.date})
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#db2777', textTransform: 'uppercase', borderBottom: '1.5px solid #fbcfe8', paddingBottom: '0.25rem', marginBottom: '0.5rem' }}>
                Achievements
              </h3>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: '#334155' }}>
                {achievements.map((a, i) => (
                  <li key={i} style={{ marginBottom: '0.35rem' }}>
                    <strong>{a.title}</strong> – {a.organization}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
