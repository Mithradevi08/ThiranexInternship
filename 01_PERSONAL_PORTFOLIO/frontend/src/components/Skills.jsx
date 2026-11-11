import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Cpu, Terminal, Layout, Database, Check } from 'lucide-react';

export default function Skills() {
  const { skillCategories } = portfolioData;

  const getCategoryIcon = (name) => {
    switch (name) {
      case 'Programming Languages':
        return <Terminal size={20} color="#db2777" />;
      case 'Frontend Development':
        return <Layout size={20} color="#db2777" />;
      case 'Backend & Database':
        return <Database size={20} color="#db2777" />;
      default:
        return <Cpu size={20} color="#db2777" />;
    }
  };

  return (
    <section id="skills" style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Cpu size={14} />
            Technical Expertise
          </div>
          <h2 className="section-title">
            Skills & <span>Competencies</span>
          </h2>
          <p className="section-desc">
            A comprehensive overview of programming languages, full stack web frameworks, database systems, and software engineering tools.
          </p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, catIdx) => (
            <div key={catIdx} className="glass-card skill-card">
              <h3 className="skill-card-title">
                {getCategoryIcon(category.name)}
                <span>{category.name}</span>
              </h3>

              <div className="skill-list">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-item">
                    <div className="skill-info">
                      <span style={{ color: '#1e293b' }}>{skill.name}</span>
                      <span className="skill-level-tag">{skill.level}</span>
                    </div>
                    {/* Animated skill bars WITHOUT percentage numbers as explicitly requested */}
                    <div className="skill-progress-track">
                      <div
                        className="skill-progress-fill"
                        style={{ width: `${skill.proficiency}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
