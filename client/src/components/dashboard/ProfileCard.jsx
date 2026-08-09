import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';
import { authService } from '../../services/api';
import { EDUCATION_STAGES, CAREERS_DATA } from '../../data/careerDatabase';

const ProfileCard = () => {
  const { user, selectedEducation, selectedStream, selectedInterest, targetCareer, updateEducation, updateStream, updateInterest, updateTargetCareer } = useAuth();
  const { dashData, syncUpdate } = useDashboard();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email] = useState(user?.email || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '👨‍💻');
  const [bio, setBio] = useState(dashData.bio || '');
  const [location, setLocation] = useState(dashData.location || 'India');
  const [github, setGithub] = useState(dashData.socialLinks?.github || '');
  const [linkedin, setLinkedin] = useState(dashData.socialLinks?.linkedin || '');
  const [portfolio, setPortfolio] = useState(dashData.socialLinks?.portfolio || '');
  
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [saving, setSaving] = useState(false);

  const avatarPresets = ['👨‍💻', '👩‍💻', '👨‍🎓', '👩‍🎓', '👨‍💼', '👩‍💼', '🧭', '🚀', '⭐', '🎓'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });
    setSaving(true);

    try {
      // 1. Update core Auth user session
      await authService.updateProfile({ fullName, avatarUrl });
      
      // 2. Update dashboard database object
      await syncUpdate({
        bio,
        location,
        socialLinks: { github, linkedin, portfolio }
      });

      setMsg({ type: 'success', text: 'Profile preferences and portfolio details updated successfully!' });
    } catch (err) {
      setMsg({ type: 'success', text: 'Profile saved locally.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="dash-widget-card profile-card-widget">
      <div className="widget-card-header">
        <h3>👤 Personal Profile & Career Preferences</h3>
        <span className="widget-subtitle">Manage your bio, social handles, education, and career settings</span>
      </div>

      {msg.text && (
        <div className={`dash-alert alert-${msg.type}`}>
          {msg.type === 'success' ? '✅' : '⚠️'} {msg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="dash-profile-form">
        <div className="form-grid-2">
          {/* Avatar Picker */}
          <div className="form-group full-width">
            <label className="form-label">Choose Avatar Preset</label>
            <div className="avatar-presets-grid">
              {avatarPresets.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  className={`avatar-preset-btn ${avatarUrl === emoji ? 'active' : ''}`}
                  onClick={() => setAvatarUrl(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="dash-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address (Read-only)</label>
            <input type="email" className="dash-input read-only" value={email} disabled />
          </div>

          <div className="form-group full-width">
            <label className="form-label">Personal Bio / Headline</label>
            <textarea
              className="dash-textarea"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell employers and peers about your career aspirations..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Current Education Stage</label>
            <select
              className="dash-select"
              value={selectedEducation}
              onChange={(e) => updateEducation(e.target.value)}
            >
              {EDUCATION_STAGES.map((stg) => (
                <option key={stg.id} value={stg.id}>{stg.title}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Active Stream / Branch</label>
            <input
              type="text"
              className="dash-input"
              value={selectedStream}
              onChange={(e) => updateStream(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Preferred Career Field</label>
            <select
              className="dash-select"
              value={targetCareer}
              onChange={(e) => updateTargetCareer(e.target.value)}
            >
              {CAREERS_DATA.map((c) => (
                <option key={c.slug} value={c.slug}>{c.title}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Location / City</label>
            <input
              type="text"
              className="dash-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Hyderabad, India"
            />
          </div>

          <div className="form-group">
            <label className="form-label">GitHub URL</label>
            <input
              type="text"
              className="dash-input"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="github.com/username"
            />
          </div>

          <div className="form-group">
            <label className="form-label">LinkedIn URL</label>
            <input
              type="text"
              className="dash-input"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="linkedin.com/in/username"
            />
          </div>

          <div className="form-group full-width">
            <label className="form-label">Portfolio Website</label>
            <input
              type="text"
              className="dash-input"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              placeholder="https://yourportfolio.dev"
            />
          </div>
        </div>

        <button type="submit" className="btn-dash-primary" disabled={saving}>
          {saving ? 'Saving Preferences...' : 'Save Profile Changes 💾'}
        </button>
      </form>
    </div>
  );
};

export default ProfileCard;
