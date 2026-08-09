import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';

const ProjectPortfolioWidget = () => {
  const { dashData, addProject, deleteProject } = useDashboard();
  const [showAddForm, setShowAddForm] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [status, setStatus] = useState('In Progress');

  const projects = dashData.projects || [];

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addProject({ title, description, techStack, githubUrl, demoUrl, status });
    setTitle('');
    setDescription('');
    setTechStack('');
    setGithubUrl('');
    setDemoUrl('');
    setShowAddForm(false);
  };

  return (
    <div className="dash-widget-card project-portfolio-widget">
      <div className="widget-card-header flex-between">
        <div>
          <h3>🚀 Showcase Project Portfolio</h3>
          <span className="widget-subtitle">Highlight practical builds, tech stack badges & live demos</span>
        </div>
        <button className="btn-dash-primary-sm" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Close Form ✕' : '+ New Project'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleCreate} className="inline-add-form">
          <div className="form-row-2">
            <input
              type="text"
              className="dash-input"
              placeholder="Project Title (e.g. AI Roadmap Generator)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              className="dash-input"
              placeholder="Tech Stack comma-separated (e.g. React, Node, MongoDB)"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
            />
          </div>
          <div className="form-group full-width">
            <textarea
              className="dash-textarea"
              rows={2}
              placeholder="Project description and key achievements..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-row-3">
            <input
              type="text"
              className="dash-input"
              placeholder="GitHub Repo Link"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
            />
            <input
              type="text"
              className="dash-input"
              placeholder="Live Demo URL"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
            />
            <button type="submit" className="btn-dash-save-sm">Save Project</button>
          </div>
        </form>
      )}

      <div className="projects-cards-grid">
        {projects.length === 0 ? (
          <div className="dash-empty-small">
            <p>No projects added to portfolio yet.</p>
          </div>
        ) : (
          projects.map((p) => (
            <div key={p.id} className="project-item-card">
              <div className="proj-header-row">
                <span className={`proj-status-tag ${p.status?.toLowerCase().replace(/\s+/g, '-')}`}>
                  {p.status}
                </span>
                <button className="btn-delete-icon" onClick={() => deleteProject(p.id)} title="Delete Project">
                  🗑️
                </button>
              </div>

              <h4>{p.title}</h4>
              <p className="proj-desc-text">{p.description}</p>

              <div className="proj-tech-badges">
                {(p.techStack || []).map((t, idx) => (
                  <span key={idx} className="tech-badge-pill">{t}</span>
                ))}
              </div>

              <div className="proj-links-row">
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noreferrer" className="btn-proj-link">
                    GitHub Code 💻
                  </a>
                )}
                {p.demoUrl && (
                  <a href={p.demoUrl} target="_blank" rel="noreferrer" className="btn-proj-link demo">
                    Live Demo 🚀
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectPortfolioWidget;
