import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../context/AuthContext';
import './CareerQuiz.css';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'What type of problems do you enjoy solving the most?',
    options: [
      { label: 'Coding, algorithms, building apps & automation', category: 'Technology' },
      { label: 'Understanding human health, treating illnesses & biology', category: 'Medicine' },
      { label: 'Financial markets, stock trading, auditing & corporate growth', category: 'Commerce' },
      { label: 'Legal arguments, policy making, debates & justice', category: 'Law' },
      { label: 'Designing visuals, UI layouts, digital artwork & branding', category: 'Design' },
    ],
  },
  {
    id: 2,
    question: 'How do you prefer to spend your working environment?',
    options: [
      { label: 'In front of a computer building software or analyzing data', category: 'Technology' },
      { label: 'In hospitals, clinics, labs, or surgical environments', category: 'Medicine' },
      { label: 'Corporate offices managing budgets, tax, or investment deals', category: 'Commerce' },
      { label: 'Courtrooms, government secretariats, or legal firms', category: 'Law' },
      { label: 'Creative studios, design tools (Figma), or visual workstations', category: 'Design' },
    ],
  },
  {
    id: 3,
    question: 'Which school or college subject was your favorite?',
    options: [
      { label: 'Mathematics, Physics, Computer Science & Logic', category: 'Technology' },
      { label: 'Biology, Zoology, Organic Chemistry & Human Anatomy', category: 'Medicine' },
      { label: 'Economics, Commerce, Accountancy & Mathematics', category: 'Commerce' },
      { label: 'History, Civics, Political Science & Literature', category: 'Law' },
      { label: 'Fine Arts, Graphic Design, Geometry & Visual Crafts', category: 'Design' },
    ],
  },
  {
    id: 4,
    question: 'What is your primary motivation in your career?',
    options: [
      { label: 'Creating high-tech products that scale to millions of users', category: 'Technology' },
      { label: 'Saving lives, healing patients, and making medical breakthroughs', category: 'Medicine' },
      { label: 'Managing financial wealth, scaling businesses & high returns', category: 'Commerce' },
      { label: 'Upholding justice, defending rights & leading public policy', category: 'Law' },
      { label: 'Crafting memorable user experiences and aesthetic visual design', category: 'Design' },
    ],
  },
  {
    id: 5,
    question: 'How do you approach a new challenge?',
    options: [
      { label: 'Break it down systematically into logical steps & code algorithms', category: 'Technology' },
      { label: 'Research symptoms, analyze empirical data, and diagnose carefully', category: 'Medicine' },
      { label: 'Calculate financial risks, return on investment & ROI trade-offs', category: 'Commerce' },
      { label: 'Study precedent laws, construct logical arguments & debate', category: 'Law' },
      { label: 'Brainstorm creative concepts, sketch wireframes & iterate design', category: 'Design' },
    ],
  },
];

const CareerQuiz = () => {
  const navigate = useNavigate();
  const { saveQuizResults, updateInterest, updateStream } = useAuth();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [resultSummary, setResultSummary] = useState(null);

  const handleSelectOption = (category) => {
    const newAnswers = { ...answers, [currentStep]: category };
    setAnswers(newAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers) => {
    const tally = {};
    Object.values(finalAnswers).forEach((cat) => {
      tally[cat] = (tally[cat] || 0) + 1;
    });

    const sortedCategories = Object.keys(tally).sort((a, b) => tally[b] - tally[a]);
    const primaryInterest = sortedCategories[0] || 'Technology';

    let recommendedStream = 'MPC';
    if (primaryInterest === 'Medicine') recommendedStream = 'BiPC';
    if (primaryInterest === 'Commerce') recommendedStream = 'MEC';
    if (primaryInterest === 'Law') recommendedStream = 'HEC';
    if (primaryInterest === 'Design') recommendedStream = 'Design & Creative Arts';

    const resultObj = {
      primaryInterest,
      recommendedStream,
      tally,
      date: new Date().toLocaleDateString(),
    };

    saveQuizResults(resultObj);
    updateInterest(primaryInterest);
    updateStream(recommendedStream);

    setResultSummary(resultObj);
    setShowResult(true);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
    setResultSummary(null);
  };

  return (
    <MainLayout>
      <div className="quiz-page-container">
        <header className="quiz-header">
          <span className="quiz-badge">🧭 Career Compass Aptitude Quiz</span>
          <h1>
            Discover Your <span className="highlight">Ideal Career Path</span>
          </h1>
          <p>
            Answer 5 quick questions to evaluate your strengths, problem-solving preferences, and work style.
          </p>
        </header>

        {!showResult ? (
          <div className="quiz-card">
            <div className="quiz-progress-bar">
              <div
                className="quiz-progress-fill"
                style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
            <div className="quiz-step-info">
              <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
              <span>{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% Completed</span>
            </div>

            <h2 className="quiz-question-title">{QUIZ_QUESTIONS[currentStep].question}</h2>

            <div className="quiz-options-list">
              {QUIZ_QUESTIONS[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  className={`quiz-option-btn ${answers[currentStep] === opt.category ? 'selected' : ''}`}
                  onClick={() => handleSelectOption(opt.category)}
                >
                  <span className="option-num">{String.fromCharCode(65 + idx)}</span>
                  <span className="option-text">{opt.label}</span>
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <div className="quiz-nav-row">
                <button className="btn-quiz-prev" onClick={() => setCurrentStep(currentStep - 1)}>
                  ← Previous Question
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="quiz-result-card">
            <div className="result-icon">🎯</div>
            <h2>Quiz Results: Your Match is Ready!</h2>
            <p className="result-sub">Based on your responses, here is your primary career inclination:</p>

            <div className="result-main-box">
              <span className="res-tag">Top Matching Field</span>
              <h3>{resultSummary?.primaryInterest}</h3>
              <p>Recommended Academic Stream: <strong>{resultSummary?.recommendedStream}</strong></p>
            </div>

            <div className="result-actions-row">
              <button
                className="btn-primary-lg"
                onClick={() => navigate(`/explorer?category=${encodeURIComponent(resultSummary?.primaryInterest)}`)}
              >
                Explore {resultSummary?.primaryInterest} Careers ➔
              </button>

              <button className="btn-secondary-lg" onClick={handleRestart}>
                Retake Quiz 🔄
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CareerQuiz;
