import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';
import { CAREERS_DATA } from '../../data/careerDatabase';

const ResumeBuilderWidget = () => {
  const { user, selectedEducation, selectedStream, targetCareer } = useAuth();
  const { dashData, updateResumeData } = useDashboard();

  const activeCareer = CAREERS_DATA.find((c) => c.slug === targetCareer) || CAREERS_DATA[0];
  const resume = dashData.resumeData || {};

  const [summary, setSummary] = useState(resume.summary || `Aspiring ${activeCareer.title} with a strong foundation in ${selectedStream} (${selectedEducation}). Practical project experience and commitment to continuous career development.`);
  const [phone, setPhone] = useState(resume.phone || '+91 98765 43210');
  const [location, setLocation] = useState(resume.location || 'Hyderabad, India');
  const [github, setGithub] = useState(resume.github || dashData.socialLinks?.github || 'github.com/profile');
  const [linkedin, setLinkedin] = useState(resume.linkedin || dashData.socialLinks?.linkedin || 'linkedin.com/in/profile');

  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleSave = () => {
    updateResumeData({ summary, phone, location, github, linkedin });
    alert('Resume details saved successfully!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="dash-widget-card resume-builder-widget">
      <div className="widget-card-header flex-between">
        <div>
          <h3>📄 ATS Resume Builder & Generator</h3>
          <span className="widget-subtitle">Generate a professional resume directly from your dashboard data</span>
        </div>
        <div className="btn-group-row">
          <button
            className={`btn-dash-outline ${!isPreviewMode ? 'active' : ''}`}
            onClick={() => setIsPreviewMode(false)}
          >
            ✏️ Edit Fields
          </button>
          <button
            className={`btn-dash-outline ${isPreviewMode ? 'active' : ''}`}
            onClick={() => setIsPreviewMode(true)}
          >
            👁️ Preview Resume
          </button>
          <button className="btn-dash-primary-sm" onClick={handlePrint}>
            📥 Export / Print PDF
          </button>
        </div>
      </div>

      {!isPreviewMode ? (
        <div className="resume-edit-form">
          <div className="form-group full-width">
            <label className="form-label">Professional Summary</label>
            <textarea
              className="dash-textarea"
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="dash-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Location / Address</label>
              <input
                type="text"
                className="dash-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">GitHub URL</label>
              <input
                type="text"
                className="dash-input"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">LinkedIn URL</label>
              <input
                type="text"
                className="dash-input"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>
          </div>

          <button className="btn-dash-primary-sm" onClick={handleSave}>
            Save Resume Info 💾
          </button>
        </div>
      ) : (
        /* LIVE ATS RESUME PREVIEW */
        <div className="ats-resume-paper-preview PrintableArea">
          <div className="ats-header">
            <h2>{user?.fullName || 'Career Explorer'}</h2>
            <p className="ats-target-title">Aspiring {activeCareer.title}</p>
            <div className="ats-contact-row">
              <span>✉️ {user?.email}</span>
              <span>📞 {phone}</span>
              <span>📍 {location}</span>
              <span>💻 {github}</span>
              <span>🔗 {linkedin}</span>
            </div>
          </div>

          <div className="ats-section">
            <h3 className="ats-sec-title">PROFESSIONAL SUMMARY</h3>
            <p>{summary}</p>
          </div>

          <div className="ats-section">
            <h3 className="ats-sec-title">EDUCATION & ROADMAP STAGE</h3>
            <div className="ats-item">
              <div className="ats-item-header">
                <strong>{selectedEducation} - {selectedStream}</strong>
                <span>Present</span>
              </div>
              <p>Active Roadmap: {activeCareer.title} Guidance Path</p>
            </div>
          </div>

          <div className="ats-section">
            <h3 className="ats-sec-title">TECHNICAL & SOFT SKILLS</h3>
            <div className="ats-skills-list">
              {(dashData.skills || []).map((s, idx) => (
                <span key={idx} className="ats-skill-pill">{s.name} ({s.level})</span>
              ))}
            </div>
          </div>

          <div className="ats-section">
            <h3 className="ats-sec-title">PROJECTS & BUILDS</h3>
            {(dashData.projects || []).map((p) => (
              <div key={p.id} className="ats-item">
                <div className="ats-item-header">
                  <strong>{p.title}</strong>
                  <span>{p.status}</span>
                </div>
                <p>{p.description}</p>
                <span className="ats-tech">Tech: {(p.techStack || []).join(', ')}</span>
              </div>
            ))}
          </div>

          <div className="ats-section">
            <h3 className="ats-sec-title">CERTIFICATIONS</h3>
            {(dashData.certificates || []).map((c) => (
              <div key={c.id} className="ats-item">
                <strong>{c.title}</strong> - {c.issuer} ({c.issueDate})
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilderWidget;
