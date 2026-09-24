import { useState } from 'react';
import { projects } from '../data/projects';

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <>
      <section className="projects" id="work" aria-label="Selected Projects">
        <div className="projects-header">
          <div className="section-label">
            <span className="section-number">03</span> Selected Work
          </div>
          <h2 className="projects-title">Featured Projects</h2>
        </div>

        <div className="projects-list">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card"
              onClick={() => setActiveProject(project)}
              data-cursor="VIEW CASE"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveProject(project);
                }
              }}
              aria-label={`Open details for ${project.name}`}
            >
              <div className="project-num">{project.num}</div>
              <div className="project-info">
                <h3>{project.name}</h3>
                <div className="project-category">{project.category}</div>
              </div>
              <div className="project-arrow" aria-hidden="true">
                ↗
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Detail Modal */}
      <div
        className={`project-modal-overlay ${activeProject ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={activeProject ? activeProject.name : 'Project details'}
      >
        {activeProject && (
          <>
            <button
              className="project-modal-close"
              onClick={() => setActiveProject(null)}
              data-cursor="CLOSE"
            >
              Close [ESC]
            </button>

            <div className="project-modal">
              <div className="project-modal-num">
                {activeProject.num} / 03
              </div>
              <h2 className="project-modal-name">{activeProject.name}</h2>
              <div className="project-modal-category">
                {activeProject.category}
              </div>

              <div className="project-modal-image">
                <div className="project-modal-placeholder">
                  {activeProject.name} — Visual Showcase
                </div>
              </div>

              <div className="project-modal-grid">
                <div className="project-modal-block">
                  <h4>Problem &amp; Context</h4>
                  <p>{activeProject.problem}</p>
                </div>

                <div className="project-modal-block">
                  <h4>Solution</h4>
                  <p>{activeProject.solution}</p>
                </div>
              </div>

              <div className="project-modal-grid">
                <div className="project-modal-block">
                  <h4>Key Features</h4>
                  <ul>
                    {activeProject.features.map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-modal-block">
                  <h4>Technologies</h4>
                  <div className="project-tech-tags">
                    {activeProject.technologies.map((tech) => (
                      <span key={tech} className="project-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="project-modal-links">
                {activeProject.github ? (
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-modal-link"
                    data-cursor="GITHUB"
                  >
                    View on GitHub ↗
                  </a>
                ) : (
                  <span className="project-modal-link coming-soon">
                    Repository — Coming Soon
                  </span>
                )}

                {activeProject.live ? (
                  <a
                    href={activeProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-modal-link"
                    data-cursor="LIVE"
                  >
                    Live Demo ↗
                  </a>
                ) : (
                  <span className="project-modal-link coming-soon">
                    Live Demo — Coming Soon
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
