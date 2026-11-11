import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      role: "Full Stack Development Intern",
      organization: "Thiranex Internship Program",
      duration: "Current",
      type: "Internship",
      location: "Remote",
      highlights: [
        "Developing 4 enterprise-grade MERN stack applications: Portfolio Website, Task Management System, E-Commerce Shopping Platform, and Blog Platform with Comments.",
        "Architecting clean RESTful APIs with Node.js/Express and connecting with MongoDB Atlas cloud database.",
        "Engineering responsive React user interfaces with modern pink and white design systems and mobile-first standards.",
        "Deploying full-stack systems across Vercel, Render, and cloud infrastructure."
      ]
    },
    {
      role: "In-Plant Trainee (10 Days)",
      organization: "Mobitech Wireless Solution Pvt. Ltd.",
      duration: "Completed",
      type: "Industrial Training",
      location: "Perundurai / Erode, Tamil Nadu",
      highlights: [
        "Hands-on exposure to industrial IoT hardware architectures, sensor telemetry, and automation systems.",
        "Studied wireless communication protocols, microcontroller integration, and real-time remote monitoring.",
        "Collaborated with senior hardware and software engineers on testing embedded control workflows."
      ]
    },
    {
      role: "Student Developer & Technical Member",
      organization: "Kongu Engineering College – CSE Department",
      duration: "2023 – Present",
      type: "Academic & Extracurricular",
      location: "Perundurai, Tamil Nadu",
      highlights: [
        "Active participant in department coding competitions, algorithmic workshops, and project showcases.",
        "Presented peer research paper at CIT Astronova national symposium.",
        "Co-developed 24-hour hackathon full-stack prototype."
      ]
    }
  ];

  return (
    <section id="experience" style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Briefcase size={14} />
            Professional Growth
          </div>
          <h2 className="section-title">
            Experience & <span>Activities</span>
          </h2>
          <p className="section-desc">
            Industrial training, internship engagements, and collaborative engineering initiatives.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {experiences.map((exp, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: '#fdf2f8', color: '#db2777', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, border: '1px solid rgba(236,72,153,0.25)' }}>
                  {exp.type}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>
                  <Calendar size={13} />
                  {exp.duration}
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                {exp.role}
              </h3>

              <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#db2777', marginBottom: '0.35rem' }}>
                {exp.organization}
              </p>

              <p style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
                <MapPin size={14} />
                {exp.location}
              </p>

              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                {exp.highlights.map((h, hIdx) => (
                  <li key={hIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem', color: '#475569', marginBottom: '0.5rem' }}>
                    <CheckCircle2 size={15} color="#db2777" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
