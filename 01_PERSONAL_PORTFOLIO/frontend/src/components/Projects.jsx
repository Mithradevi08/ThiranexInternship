import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { FolderGit2, ExternalLink, Github, Eye, Sparkles } from 'lucide-react';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" style={{ padding: '80px 0', background: 'rgba(253, 242, 248, 0.45)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <FolderGit2 size={14} />
            Featured Work
          </div>
          <h2 className="section-title">
            My <span>Projects</span>
          </h2>
          <p className="section-desc">
            Highlighted software engineering projects spanning Full Stack Web Development, Deep Learning / NLP, and IoT Systems.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((proj) => (
            <div key={proj.id} className="glass-card project-card">
              <div>
                <span className="project-tag">{proj.category}</span>
                <h3 className="project-title">{proj.title}</h3>
                <p className="project-desc">{proj.shortDesc}</p>

                <div className="project-tech">
                  {proj.techStack.slice(0, 4).map((tech, tIdx) => (
                    <span key={tIdx} className="tech-badge">{tech}</span>
                  ))}
                  {proj.techStack.length > 4 && (
                    <span className="tech-badge" style={{ color: '#db2777' }}>
                      +{proj.techStack.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div className="project-actions" style={{ paddingTop: '1rem', borderTop: '1px solid rgba(244,114,182,0.2)' }}>
                <button
                  onClick={() => setSelectedProject(proj)}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '0.6rem 1rem', fontSize: '0.88rem' }}
                >
                  <Eye size={16} />
                  View Details
                </button>

                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ padding: '0.6rem 0.85rem' }}
                  title="GitHub Repository"
                >
                  <Github size={18} />
                </a>

                {proj.demo && proj.demo !== '#' && (
                  <a
                    href={proj.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ padding: '0.6rem 0.85rem' }}
                    title="Live Demo"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
