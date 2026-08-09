import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../context/AuthContext';
import { EDUCATION_STAGES, STREAMS_BY_EDUCATION, INTEREST_FIELDS } from '../data/careerDatabase';
import './ChooseEducation.css';

const ChooseEducation = () => {
  const navigate = useNavigate();
  const {
    selectedEducation,
    updateEducation,
    selectedStream,
    updateStream,
    selectedInterest,
    updateInterest,
  } = useAuth();

  const [step, setStep] = useState(1);
  const [eduStage, setEduStage] = useState(selectedEducation || 'Class 8-10');
  const [stream, setStream] = useState(selectedStream || 'MPC');
  const [interest, setInterest] = useState(selectedInterest || 'Technology');
  const [isSaving, setIsSaving] = useState(false);

  const currentAvailableStreams = STREAMS_BY_EDUCATION[eduStage] || STREAMS_BY_EDUCATION['Intermediate'];

  const handleNextStep1 = (stageId) => {
    setEduStage(stageId);
    updateEducation(stageId);
    // Set default stream for new stage if current stream not in list
    const streams = STREAMS_BY_EDUCATION[stageId] || [];
    if (streams.length > 0) {
      setStream(streams[0].id);
      updateStream(streams[0].id);
    }
    setStep(2);
  };

  const handleNextStep2 = (streamId) => {
    setStream(streamId);
    updateStream(streamId);
    setStep(3);
  };

  const handleCompleteJourney = async (interestId) => {
    setIsSaving(true);
    const finalInterest = interestId || interest;
    setInterest(finalInterest);
    updateInterest(finalInterest);

    try {
      await updateEducation(eduStage);
      await updateStream(stream);
      await updateInterest(finalInterest);

      navigate(
        `/explorer?education=${encodeURIComponent(eduStage)}&stream=${encodeURIComponent(
          stream
        )}&category=${encodeURIComponent(finalInterest)}`
      );
    } catch (error) {
      console.error('Error saving education journey:', error);
      navigate('/explorer');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <MainLayout>
      <div className="edu-page-container">
        {/* STEP PROGRESS INDICATOR */}
        <div className="onboarding-stepper">
          <div className={`step-pill ${step >= 1 ? 'active' : ''}`}>
            <span className="step-num">1</span>
            <span className="step-txt">1. Education Stage</span>
          </div>
          <div className="step-line"></div>
          <div className={`step-pill ${step >= 2 ? 'active' : ''}`}>
            <span className="step-num">2</span>
            <span className="step-txt">2. Stream / Trade</span>
          </div>
          <div className="step-line"></div>
          <div className={`step-pill ${step >= 3 ? 'active' : ''}`}>
            <span className="step-num">3</span>
            <span className="step-txt">3. Interest Field</span>
          </div>
        </div>

        {/* STEP 1: EDUCATION STAGE */}
        {step === 1 && (
          <div className="wizard-step-content">
            <header className="edu-hero-section">
              <h1>
                Where are you <span className="highlight">currently studying?</span>
              </h1>
              <p>Select your current education stage to personalize your career options and roadmaps.</p>
            </header>

            <section className="edu-card-grid">
              {EDUCATION_STAGES.map((opt) => {
                const isSelected = eduStage === opt.id;
                return (
                  <div
                    key={opt.id}
                    className={`edu-card ${isSelected ? 'active' : ''}`}
                    onClick={() => handleNextStep1(opt.id)}
                  >
                    {isSelected && <div className="edu-check-badge">✓</div>}
                    <div className={`edu-icon-wrapper ${opt.colorClass}`}>{opt.icon}</div>
                    <h3>{opt.title}</h3>
                    <span className="edu-badge">{opt.badge}</span>
                    <p className="edu-desc">{opt.description}</p>
                  </div>
                );
              })}
            </section>
          </div>
        )}

        {/* STEP 2: STREAM SELECTION */}
        {step === 2 && (
          <div className="wizard-step-content">
            <header className="edu-hero-section">
              <h1>
                Select your <span className="highlight">Stream / Branch</span>
              </h1>
              <p>Showing streams & specializations for: <strong>{eduStage}</strong></p>
            </header>

            <section className="streams-card-grid">
              {currentAvailableStreams.map((st) => {
                const isSelected = stream === st.id;
                return (
                  <div
                    key={st.id}
                    className={`stream-card ${isSelected ? 'active' : ''}`}
                    onClick={() => handleNextStep2(st.id)}
                  >
                    {isSelected && <div className="edu-check-badge">✓</div>}
                    <div className="stream-icon">{st.icon}</div>
                    <h3>{st.name}</h3>
                    {st.desc && <p className="stream-desc">{st.desc}</p>}
                  </div>
                );
              })}
            </section>

            <div className="wizard-actions-row">
              <button className="btn-wizard-back" onClick={() => setStep(1)}>
                ← Back to Stage
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: INTEREST FIELD */}
        {step === 3 && (
          <div className="wizard-step-content">
            <header className="edu-hero-section">
              <h1>
                What is your <span className="highlight">Primary Interest?</span>
              </h1>
              <p>Choose your target field to filter matching high-growth career profiles.</p>
            </header>

            <section className="interests-card-grid">
              {INTEREST_FIELDS.map((inf) => {
                const isSelected = interest === inf.id;
                return (
                  <div
                    key={inf.id}
                    className={`interest-card ${isSelected ? 'active' : ''}`}
                    onClick={() => handleCompleteJourney(inf.id)}
                  >
                    {isSelected && <div className="edu-check-badge">✓</div>}
                    <div className="interest-icon">{inf.icon}</div>
                    <h3>{inf.label}</h3>
                    <p className="interest-desc">{inf.desc}</p>
                  </div>
                );
              })}
            </section>

            <div className="wizard-actions-row">
              <button className="btn-wizard-back" onClick={() => setStep(2)}>
                ← Back to Stream
              </button>

              <button
                className="btn-edu-continue"
                onClick={() => handleCompleteJourney(interest)}
                disabled={isSaving}
              >
                {isSaving ? 'Launching Careers...' : 'Explore Career Fields ➔'}
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ChooseEducation;
