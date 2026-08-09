import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { CAREERS_DATA } from '../data/careerDatabase';
import './CompareCareers.css';

const CompareCareers = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const paramC1 = searchParams.get('c1');
  const paramC2 = searchParams.get('c2');

  const [careerAId, setCareerAId] = useState(paramC1 || 'software-engineer');
  const [careerBId, setCareerBId] = useState(paramC2 || 'doctor-mbbs');

  const [careerA, setCareerA] = useState(null);
  const [careerB, setCareerB] = useState(null);

  useEffect(() => {
    const foundA = CAREERS_DATA.find((c) => c.slug === careerAId) || CAREERS_DATA[0];
    const foundB = CAREERS_DATA.find((c) => c.slug === careerBId) || CAREERS_DATA[1] || CAREERS_DATA[0];

    setCareerA(foundA);
    setCareerB(foundB);
  }, [careerAId, careerBId]);

  const handleSelectA = (slug) => {
    setCareerAId(slug);
    setSearchParams({ c1: slug, c2: careerBId });
  };

  const handleSelectB = (slug) => {
    setCareerBId(slug);
    setSearchParams({ c1: careerAId, c2: slug });
  };

  return (
    <MainLayout>
      <div className="compare-container">
        {/* HEADER */}
        <header className="compare-header">
          <span className="compare-badge">⚖️ Side-by-Side Evaluation</span>
          <h1>
            Compare <span className="highlight">Careers</span>
          </h1>
          <p>
            Side-by-side comparison of salaries (India & Abroad), industry demand, skill requirements, duration, and AI impact analysis.
          </p>
        </header>

        {/* SELECTORS */}
        <div className="selectors-bar">
          <div className="selector-box">
            <label>Select First Career (Career A)</label>
            <select
              value={careerAId}
              onChange={(e) => handleSelectA(e.target.value)}
              className="compare-select"
            >
              {CAREERS_DATA.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.icon} {c.title} ({c.category})
                </option>
              ))}
            </select>
          </div>

          <div className="vs-badge">VS</div>

          <div className="selector-box">
            <label>Select Second Career (Career B)</label>
            <select
              value={careerBId}
              onChange={(e) => handleSelectB(e.target.value)}
              className="compare-select"
            >
              {CAREERS_DATA.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.icon} {c.title} ({c.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* COMPARISON MATRIX */}
        {careerA && careerB && (
          <div className="compare-matrix-card">
            {/* MATRIX HEADERS */}
            <div className="matrix-row header-row">
              <div className="feature-cell">Feature Comparison</div>
              <div className="career-cell cell-a">
                <span className="c-icon">{careerA.icon || '💼'}</span>
                <h2>{careerA.title}</h2>
                <span className="c-tag">{careerA.category}</span>
              </div>
              <div className="career-cell cell-b">
                <span className="c-icon">{careerB.icon || '💼'}</span>
                <h2>{careerB.title}</h2>
                <span className="c-tag">{careerB.category}</span>
              </div>
            </div>

            {/* SALARY INDIA */}
            <div className="matrix-row">
              <div className="feature-cell">🇮🇳 Salary Range (India)</div>
              <div className="career-cell cell-a val-salary">{careerA.salaryRange?.india || careerA.salary}</div>
              <div className="career-cell cell-b val-salary">{careerB.salaryRange?.india || careerB.salary}</div>
            </div>

            {/* SALARY ABROAD */}
            <div className="matrix-row">
              <div className="feature-cell">🌍 Salary Range (Abroad)</div>
              <div className="career-cell cell-a">{careerA.salaryRange?.abroad || '$80,000 - $180,000'}</div>
              <div className="career-cell cell-b">{careerB.salaryRange?.abroad || '$90,000 - $200,000'}</div>
            </div>

            {/* DEMAND */}
            <div className="matrix-row">
              <div className="feature-cell">🔥 Market Demand</div>
              <div className="career-cell cell-a val-demand">{careerA.demand}</div>
              <div className="career-cell cell-b val-demand">{careerB.demand}</div>
            </div>

            {/* ESSENTIAL SKILLS */}
            <div className="matrix-row">
              <div className="feature-cell">💡 Required Skills</div>
              <div className="career-cell cell-a">
                <div className="skills-wrap">
                  {careerA.skills?.map((s, i) => (
                    <span key={i} className="cmp-skill">{s}</span>
                  ))}
                </div>
              </div>
              <div className="career-cell cell-b">
                <div className="skills-wrap">
                  {careerB.skills?.map((s, i) => (
                    <span key={i} className="cmp-skill">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* DURATION */}
            <div className="matrix-row">
              <div className="feature-cell">⏳ Preparation / Study Duration</div>
              <div className="career-cell cell-a">{careerA.duration}</div>
              <div className="career-cell cell-b">{careerB.duration}</div>
            </div>

            {/* REQUIRED EDUCATION */}
            <div className="matrix-row">
              <div className="feature-cell">🎓 Required Education Eligibility</div>
              <div className="career-cell cell-a">{careerA.requiredEducation}</div>
              <div className="career-cell cell-b">{careerB.requiredEducation}</div>
            </div>

            {/* AI IMPACT */}
            <div className="matrix-row">
              <div className="feature-cell">🤖 AI Impact Analysis</div>
              <div className="career-cell cell-a">{careerA.aiImpact || 'Low to Moderate Automation'}</div>
              <div className="career-cell cell-b">{careerB.aiImpact || 'Low Automation Risk'}</div>
            </div>

            {/* TOP COMPANIES */}
            <div className="matrix-row">
              <div className="feature-cell">🏢 Top Hiring Companies</div>
              <div className="career-cell cell-a">
                {careerA.topCompanies ? careerA.topCompanies.join(', ') : 'Tech & Consulting Leaders'}
              </div>
              <div className="career-cell cell-b">
                {careerB.topCompanies ? careerB.topCompanies.join(', ') : 'Healthcare / Law Leaders'}
              </div>
            </div>

            {/* ROADMAP ACTION BUTTONS */}
            <div className="matrix-row footer-row">
              <div className="feature-cell">Action Roadmap</div>
              <div className="career-cell cell-a">
                <button
                  className="btn-cmp-roadmap"
                  onClick={() => navigate(`/roadmap/${careerA.slug}`)}
                >
                  Launch {careerA.title} Roadmap ➔
                </button>
              </div>
              <div className="career-cell cell-b">
                <button
                  className="btn-cmp-roadmap"
                  onClick={() => navigate(`/roadmap/${careerB.slug}`)}
                >
                  Launch {careerB.title} Roadmap ➔
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CompareCareers;
