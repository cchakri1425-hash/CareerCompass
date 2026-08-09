import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';

const CertificatesWidget = () => {
  const { dashData, addCertificate, deleteCertificate } = useDashboard();
  const [showAddForm, setShowAddForm] = useState(false);

  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [credentialUrl, setCredentialUrl] = useState('');
  const [category, setCategory] = useState('Development');

  const certificates = dashData.certificates || [];

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim() || !issuer.trim()) return;
    addCertificate({ title, issuer, issueDate: issueDate || 'August 2026', credentialUrl, category });
    setTitle('');
    setIssuer('');
    setCredentialUrl('');
    setShowAddForm(false);
  };

  return (
    <div className="dash-widget-card certificates-widget">
      <div className="widget-card-header flex-between">
        <div>
          <h3>📜 Earned Certificates & Verified Credentials</h3>
          <span className="widget-subtitle">Showcase your verified certifications and course completions</span>
        </div>
        <button className="btn-dash-primary-sm" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Close Form ✕' : '+ Add Certificate'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleCreate} className="inline-add-form">
          <div className="form-row-2">
            <input
              type="text"
              className="dash-input"
              placeholder="Certificate Title (e.g. AWS Certified Cloud Practitioner)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              className="dash-input"
              placeholder="Issuing Organization (e.g. AWS / Coursera)"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              required
            />
          </div>
          <div className="form-row-3">
            <input
              type="text"
              className="dash-input"
              placeholder="Issue Date (e.g. July 2026)"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
            />
            <input
              type="text"
              className="dash-input"
              placeholder="Credential / Verification URL"
              value={credentialUrl}
              onChange={(e) => setCredentialUrl(e.target.value)}
            />
            <button type="submit" className="btn-dash-save-sm">Save Certificate</button>
          </div>
        </form>
      )}

      <div className="certificates-grid">
        {certificates.length === 0 ? (
          <div className="dash-empty-small">
            <p>No certificates added yet.</p>
          </div>
        ) : (
          certificates.map((cert) => (
            <div key={cert.id} className="certificate-card">
              <div className="cert-top-row">
                <span className="cert-seal-icon">📜</span>
                <span className="verified-badge">✓ Verified</span>
              </div>

              <h4>{cert.title}</h4>
              <p className="cert-issuer">Issued by <strong>{cert.issuer}</strong></p>
              <span className="cert-date">📅 {cert.issueDate}</span>

              <div className="cert-actions-row">
                {cert.credentialUrl ? (
                  <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="btn-cert-link">
                    Verify Credential 🔗
                  </a>
                ) : (
                  <span className="btn-cert-link inactive">Credential On File</span>
                )}
                <button
                  className="btn-delete-icon"
                  onClick={() => deleteCertificate(cert.id)}
                  title="Remove Certificate"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CertificatesWidget;
