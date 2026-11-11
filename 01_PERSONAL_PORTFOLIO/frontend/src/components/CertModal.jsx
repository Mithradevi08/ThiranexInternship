import React from 'react';
import { X, Award, ExternalLink, ShieldCheck, CheckCircle } from 'lucide-react';

export default function CertModal({ cert, onClose }) {
  if (!cert) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.85rem', background: '#fdf2f8', color: '#db2777', borderRadius: '9999px', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.85rem' }}>
          <ShieldCheck size={16} />
          {cert.issuer} Verified
        </div>

        <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
          {cert.title}
        </h2>

        <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '1.25rem' }}>
          Issued Year: <strong>{cert.date}</strong> | Domain: <strong>{cert.category}</strong>
        </p>

        <div style={{ background: '#fff5f8', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.25rem', border: '1px solid rgba(244,114,182,0.25)' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#be185d', marginBottom: '0.4rem' }}>
            Credential Scope & Syllabus
          </h4>
          <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: '1.6' }}>
            {cert.description}
          </p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.65rem' }}>
            Demonstrated Competencies
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {cert.skills.map((skill, idx) => (
              <span key={idx} className="tech-badge" style={{ background: '#f8fafc', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle size={14} color="#db2777" />
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ fontSize: '0.9rem' }}
          >
            <ExternalLink size={16} />
            Verify on {cert.issuer} Portal
          </a>
        </div>
      </div>
    </div>
  );
}
