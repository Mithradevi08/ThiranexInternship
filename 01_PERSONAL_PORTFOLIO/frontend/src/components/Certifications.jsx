import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Award, ShieldCheck, ExternalLink, ArrowRight } from 'lucide-react';
import CertModal from './CertModal';

export default function Certifications() {
  const { certifications } = portfolioData;
  const [activeCert, setActiveCert] = useState(null);

  return (
    <section id="certifications" style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Award size={14} />
            Verified Credentials
          </div>
          <h2 className="section-title">
            Professional <span>Certifications</span>
          </h2>
          <p className="section-desc">
            Industry and academic certifications earned from IBM, Infosys Springboard, and NPTEL.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="glass-card"
              style={{ padding: '1.85rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              onClick={() => setActiveCert(cert)}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.25rem 0.65rem', background: '#fdf2f8', color: '#db2777', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
                    <ShieldCheck size={14} />
                    {cert.issuer}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{cert.date}</span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.65rem' }}>
                  {cert.title}
                </h3>

                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                  {cert.description.slice(0, 110)}...
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.85rem', borderTop: '1px solid rgba(244,114,182,0.2)' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#db2777', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  View Credential <ArrowRight size={14} />
                </span>
                <span style={{ background: '#f8fafc', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', color: '#475569', fontWeight: 600 }}>
                  {cert.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeCert && (
        <CertModal
          cert={activeCert}
          onClose={() => setActiveCert(null)}
        />
      )}
    </section>
  );
}
