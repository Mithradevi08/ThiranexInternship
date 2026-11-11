import React, { useState } from 'react';
import { Menu, X, FileText, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenResume }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <a href="#home" className="nav-brand">
          <span className="brand-dot"></span>
          <span>Mithradevi R</span>
        </a>

        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenResume();
              }}
              className="btn btn-primary"
              style={{ padding: '0.5rem 1.15rem', fontSize: '0.85rem' }}
            >
              <FileText size={16} />
              Resume
            </button>
          </li>
        </ul>

        <button
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </nav>
  );
}
