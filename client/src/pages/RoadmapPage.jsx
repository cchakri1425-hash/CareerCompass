import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { CAREERS_DATA, generateDynamicRoadmap, EDUCATION_STAGES, STREAMS_BY_EDUCATION } from '../data/careerDatabase';
import { progressService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './RoadmapPage.css';

const RoadmapPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    user,
    selectedEducation,
    updateEducation,
    selectedStream,
    updateStream,
  } = useAuth();

  const [career, setCareer] = useState(null);
  const [eduStage, setEduStage] = useState(selectedEducation || 'Class 8-10');
  const [stream, setStream] = useState(selectedStream || 'MPC');
  const [dynamicSteps, setDynamicSteps] = useState([]);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [selectedStepModal, setSelectedStepModal] = useState(null);
  const [savingStep, setSavingStep] = useState(false);

  useEffect(() => {
    // 1. Find matched career by slug
    const found = CAREERS_DATA.find((c) => c.slug === id || c.slug.includes(id)) || CAREERS_DATA[0];
    setCareer(found);

    // 2. Generate dynamic roadmap steps based on current education & stream
    const steps = generateDynamicRoadmap(found, eduStage, stream);
    setDynamicSteps(steps);

    // 3. Load user progress from local / backend
    fetchUserProgress(found.slug);
  }, [id, eduStage, stream]);

  const fetchUserProgress = async (careerSlug) => {
    const userId = user ? user._id || user.id : 'guest_user';
    try {
      const res = await progressService.getCareerProgress(careerSlug, userId);
      if (res.data.success && res.data.progress) {
        setCompletedSteps(res.data.progress.completedSteps || []);
      }
    } catch {
      // Fallback to localStorage if offline
      const saved = localStorage.getItem(`progress_${careerSlug}`);
      if (saved) setCompletedSteps(JSON.parse(saved));
    }
  };

  const handleStageChange = (e) => {
    const newStage = e.target.value;
    setEduStage(newStage);
    updateEducation(newStage);

    // Auto update stream list if necessary
    const available = STREAMS_BY_EDUCATION[newStage] || [];
    if (available.length > 0) {
      setStream(available[0].id);
      updateStream(available[0].id);
    }
  };

  const handleStreamChange = (e) => {
    const newStream = e.target.value;
    setStream(newStream);
    updateStream(newStream);
  };

  const handleOpenStep = (stepObj) => {
    setSelectedStepModal(stepObj);
  };

  const handleCloseModal = () => {
    setSelectedStepModal(null);
  };

  const handleToggleComplete = async (stepNum) => {
    setSavingStep(true);
    const userId = user ? user._id || user.id : 'guest_user';
    const isAlreadyCompleted = completedSteps.includes(stepNum);
    const nextStatus = !isAlreadyCompleted;

    const updatedList = nextStatus
      ? [...completedSteps, stepNum]
      : completedSteps.filter((s) => s !== stepNum);

    setCompletedSteps(updatedList);
    localStorage.setItem(`progress_${career?.slug}`, JSON.stringify(updatedList));

    try {
      await progressService.updateStepProgress({
        userId,
        careerId: career?.slug,
        stepNumber: stepNum,
        completed: nextStatus,
      });
    } catch (err) {
      console.log('Progress stored locally');
    } finally {
      setSavingStep(false);
    }
  };

  if (!career) {
    return (
      <MainLayout>
        <div className="rm-loading-container">
          <div className="loading-spinner"></div>
          <p>Generating dynamic roadmap...</p>
        </div>
      </MainLayout>
    );
  }

  const totalSteps = dynamicSteps.length || 1;
  const progressPercent = Math.min(Math.round((completedSteps.length / totalSteps) * 100), 100);
  const currentAvailableStreams = STREAMS_BY_EDUCATION[eduStage] || [];

  return (
    <MainLayout>
      <div className="rm-page-wrapper">
        {/* BREADCRUMB */}
        <nav className="rm-breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">/</span>
          <Link to="/explorer">Career Explorer</Link>
          <span className="sep">/</span>
          <Link to={`/explorer/${career.slug}`}>{career.title}</Link>
          <span className="sep">/</span>
          <span className="active">Dynamic Roadmap</span>
        </nav>

        {/* DYNAMIC SELECTOR BAR */}
        <div className="rm-dynamic-controls-card">
          <div className="control-field">
            <label>🎓 Current Education Stage:</label>
            <select value={eduStage} onChange={handleStageChange} className="rm-select">
              {EDUCATION_STAGES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.icon} {s.title}
                </option>
              ))}
            </select>
          </div>

          <div className="control-field">
            <label>📐 Stream / Branch:</label>
            <select value={stream} onChange={handleStreamChange} className="rm-select">
              {currentAvailableStreams.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.icon} {st.name}
                </option>
              ))}
            </select>
          </div>

          <div className="control-info-badge">
            ⚡ Dynamic Roadmap Updates Instantly
          </div>
        </div>

        <div className="rm-main-grid">
          {/* LEFT SIDEBAR */}
          <aside className="rm-sidebar">
            <div className="rm-sidebar-card rm-summary-card">
              <h2>{career.title} Roadmap</h2>
              <p>Tailored step-by-step pathway starting from <strong>{eduStage} ({stream})</strong>.</p>

              <hr className="divider" />

              <div className="rm-info-metrics">
                <div>
                  <span className="lbl">Target Career</span>
                  <h3 className="val">{career.title}</h3>
                </div>
                <div>
                  <span className="lbl">Est. Duration</span>
                  <h3 className="val">{career.duration}</h3>
                </div>
              </div>

              {/* PROGRESS BAR */}
              <div className="rm-progress-box">
                <div className="progress-lbl-row">
                  <span>Track Progress</span>
                  <strong>{completedSteps.length} of {totalSteps} Steps ({progressPercent}%)</strong>
                </div>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
                </div>
              </div>
            </div>

            {/* NEED HELP PANEL */}
            <div className="rm-sidebar-card rm-guidance-card">
              <h3>Need Expert Guidance?</h3>
              <p>Connect with a career counselor to get personalized mentorship.</p>
              <button
                className="btn-guidance"
                onClick={() => alert(`Guidance request submitted for ${career.title}!`)}
              >
                Get 1-on-1 Guidance 🎓
              </button>
            </div>
          </aside>

          {/* MAIN ROADMAP TIMELINE */}
          <section className="rm-timeline-section">
            <div className="rm-hero-banner">
              <div className="banner-badge">🧭 Click any milestone step to view details & resources</div>
              <h2>{career.title} Dynamic Learning Path</h2>
              <p>Adapted for <strong>{eduStage}</strong> stage with <strong>{stream}</strong> specialization.</p>
            </div>

            <div className="rm-timeline-container">
              {dynamicSteps.map((item, idx) => {
                const stepNum = item.step || idx + 1;
                const isCompleted = completedSteps.includes(stepNum);

                return (
                  <div
                    key={idx}
                    className={`timeline-item ${isCompleted ? 'completed' : ''}`}
                    onClick={() => handleOpenStep(item)}
                  >
                    <div className="timeline-node">
                      {isCompleted ? '✓' : stepNum}
                    </div>

                    <div className="timeline-card-box">
                      <div className="timeline-card-header">
                        <h3>Step {stepNum}: {item.title}</h3>
                        <span className={`step-status-tag ${isCompleted ? 'done' : 'upcoming'}`}>
                          {isCompleted ? '✓ Completed' : 'View Step Details ➔'}
                        </span>
                      </div>
                      <p>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* STEP DETAILS MODAL */}
        {selectedStepModal && (
          <div className="step-modal-overlay" onClick={handleCloseModal}>
            <div className="step-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={handleCloseModal}>
                ✕
              </button>

              <header className="modal-header">
                <span className="step-badge-num">Step {selectedStepModal.step}</span>
                <h2>{selectedStepModal.title}</h2>
              </header>

              <div className="modal-body-scroll">
                <section className="modal-section">
                  <h3>📖 Step Description</h3>
                  <p>{selectedStepModal.description}</p>
                </section>

                {selectedStepModal.subjects && (
                  <section className="modal-section">
                    <h3>📚 Core Subjects & Skills</h3>
                    <ul className="modal-list">
                      {selectedStepModal.subjects.map((sub, i) => (
                        <li key={i}>📌 {sub}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {selectedStepModal.videos && (
                  <section className="modal-section">
                    <h3>🎥 Recommended Videos & Lectures</h3>
                    <div className="links-grid">
                      {selectedStepModal.videos.map((vid, i) => (
                        <a key={i} href={vid.url} target="_blank" rel="noreferrer" className="link-card video">
                          <span className="link-icon">▶️</span>
                          <span>{vid.title}</span>
                        </a>
                      ))}
                    </div>
                  </section>
                )}

                {selectedStepModal.resources && (
                  <section className="modal-section">
                    <h3>🔗 Online Resources & Documentation</h3>
                    <div className="links-grid">
                      {selectedStepModal.resources.map((res, i) => (
                        <a key={i} href={res.url} target="_blank" rel="noreferrer" className="link-card resource">
                          <span className="link-icon">🌐</span>
                          <span>{res.title}</span>
                        </a>
                      ))}
                    </div>
                  </section>
                )}

                {selectedStepModal.tips && (
                  <section className="modal-section">
                    <h3>💡 Expert Tips & Guidance</h3>
                    <ul className="modal-tips-list">
                      {selectedStepModal.tips.map((tip, i) => (
                        <li key={i}>⚡ {tip}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {selectedStepModal.books && (
                  <section className="modal-section">
                    <h3>📖 Recommended Books</h3>
                    <div className="books-chips-list">
                      {selectedStepModal.books.map((b, i) => (
                        <span key={i} className="book-chip">
                          📚 {b}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              <footer className="modal-footer">
                <button
                  className={`btn-complete-step ${
                    completedSteps.includes(selectedStepModal.step) ? 'completed' : ''
                  }`}
                  onClick={() => handleToggleComplete(selectedStepModal.step)}
                  disabled={savingStep}
                >
                  {completedSteps.includes(selectedStepModal.step)
                    ? '✓ Completed (Click to Undo)'
                    : 'Mark Step Completed ➔'}
                </button>
              </footer>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default RoadmapPage;
