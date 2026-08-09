import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const QuizPerformanceWidget = () => {
  const navigate = useNavigate();
  const { quizResults } = useAuth();

  const mockQuizHistory = [
    { id: 'q1', title: 'Career Aptitude & Domain Assessment', score: '88%', date: 'Yesterday', status: 'Passed', primaryStrength: 'Problem Solving & Logic' },
    { id: 'q2', title: 'Technical Skill & Stream Evaluator', score: '82%', date: '3 Days Ago', status: 'Passed', primaryStrength: 'Software Concepts' }
  ];

  return (
    <div className="dash-widget-card quiz-performance-widget">
      <div className="widget-card-header flex-between">
        <div>
          <h3>🎯 Career Quiz & Aptitude Performance</h3>
          <span className="widget-subtitle">Evaluate test history, strengths & recommended improvements</span>
        </div>
        <button className="btn-dash-primary-sm" onClick={() => navigate('/quiz')}>
          Take New Quiz 🎯
        </button>
      </div>

      {quizResults ? (
        <div className="quiz-result-banner">
          <div className="qr-top-row">
            <span className="qr-badge">Latest Result ({quizResults.date})</span>
            <span className="qr-score">Matched: <strong>{quizResults.primaryInterest}</strong></span>
          </div>
          <h4>Recommended Stream: <strong>{quizResults.recommendedStream}</strong></h4>
          <p className="qr-desc">
            Your aptitude analysis highlights top potential in practical application, system logic, and career execution.
          </p>
        </div>
      ) : null}

      <div className="quiz-history-list">
        <h4>Quiz History & Analysis</h4>
        {mockQuizHistory.map((q) => (
          <div key={q.id} className="quiz-history-row">
            <div className="quiz-icon-col">🎯</div>
            <div className="quiz-info-col">
              <h5>{q.title}</h5>
              <div className="quiz-meta-pills">
                <span className="strength-pill">💪 Strength: {q.primaryStrength}</span>
                <span className="date-pill">📅 {q.date}</span>
              </div>
            </div>
            <div className="quiz-score-col">
              <span className="score-number">{q.score}</span>
              <span className="status-label">{q.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizPerformanceWidget;
