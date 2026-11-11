import React from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, HelpCircle } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <span className="project-tag" style={{ marginBottom: '0.65rem' }}>
          {project.category}
        </span>

        <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
          {project.title}
        </h2>

        {/* Tech Stack Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {project.techStack.map((tech, idx) => (
            <span key={idx} className="tech-badge" style={{ background: '#fdf2f8', color: '#db2777', borderColor: 'rgba(236,72,153,0.3)', fontWeight: 700 }}>
              {tech}
            </span>
          ))}
        </div>

        {/* Problem Statement */}
        <div style={{ background: '#fff5f8', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid #db2777', marginBottom: '1.25rem' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#be185d', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.35rem' }}>
            <HelpCircle size={18} />
            Problem Statement
          </h4>
          <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: '1.6' }}>
            {project.problem}
          </p>
        </div>

        {/* Engineering Solution */}
        <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid #64748b', marginBottom: '1.5rem' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e293b', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.35rem' }}>
            <Cpu size={18} />
            Engineering Solution & Architecture
          </h4>
          <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: '1.6' }}>
            {project.solution}
          </p>
        </div>

        {/* Key Features */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={18} color="#db2777" />
            Key Deliverables & Features
          </h4>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {project.features.map((feat, fIdx) => (
              <li key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.92rem', color: '#475569', marginBottom: '0.5rem' }}>
                <CheckCircle2 size={16} color="#db2777" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Links */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ fontSize: '0.9rem' }}
          >
            <Github size={18} />
            View Repository
          </a>
          {project.demo && project.demo !== '#' && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ fontSize: '0.9rem' }}
            >
              <ExternalLink size={18} />
              Live Deployment
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
