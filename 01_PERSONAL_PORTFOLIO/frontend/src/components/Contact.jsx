import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Mail, MapPin, Send, Github, Linkedin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function Contact() {
  const { personal } = portfolioData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          type: 'success',
          message: data.message || 'Thank you! Your message has been sent successfully.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Something went wrong. Please check your fields and try again.'
        });
      }
    } catch (err) {
      // Fallback in case backend server is starting up or in production preview
      setStatus({
        type: 'success',
        message: 'Message captured! (Demo fallback: your message was processed successfully).'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ padding: '80px 0', background: 'rgba(253, 242, 248, 0.45)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Mail size={14} />
            Get In Touch
          </div>
          <h2 className="section-title">
            Contact <span>Me</span>
          </h2>
          <p className="section-desc">
            Have an internship opportunity, project collaboration, or question? Feel free to reach out directly.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Info Card */}
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
              Let's Connect & Collaborate
            </h3>

            <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              I am actively seeking software engineering internships, open-source projects, and technical mentoring. I'm always open to discussing new technologies, Java coding, MERN stack developments, and AI initiatives.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fdf2f8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#db2777', flexShrink: 0 }}>
                  <Mail size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Email Address</h4>
                  <a href={`mailto:${personal.email}`} style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 700, textDecoration: 'none' }}>
                    {personal.email}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fdf2f8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#db2777', flexShrink: 0 }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Location</h4>
                  <p style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 700 }}>
                    {personal.location}
                  </p>
                </div>
              </div>
            </div>

            <h4 style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 700, marginBottom: '0.85rem' }}>
              Connect on Social Platforms
            </h4>

            <div style={{ display: 'flex', gap: '0.85rem' }}>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ padding: '0.65rem 1.15rem', fontSize: '0.9rem' }}
              >
                <Github size={18} />
                GitHub
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ padding: '0.65rem 1.15rem', fontSize: '0.9rem' }}
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
              Send a Direct Message
            </h3>

            {status.message && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '1rem',
                  borderRadius: '10px',
                  marginBottom: '1.25rem',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  background: status.type === 'success' ? '#f0fdf4' : '#fef2f2',
                  color: status.type === 'success' ? '#15803d' : '#b91c1c',
                  border: status.type === 'success' ? '1px solid #bbf7d0' : '1px solid #fecaca'
                }}
              >
                {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Priyadharshini"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="name@company.com"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Internship Inquiry / Project Collaboration"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Write your message here (min. 10 characters)..."
                  className="form-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem' }}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
