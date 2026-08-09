import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { CAREERS_DATA } from '../data/careerDatabase';
import { useAuth } from '../context/AuthContext';
import './CareerDetails.css';

const CareerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateTargetCareer } = useAuth();

  const [career, setCareer] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Search career by slug or id from CAREERS_DATA dataset
    const found = CAREERS_DATA.find((c) => c.slug === id || c.slug.includes(id));
    if (found) {
      setCareer(found);
      updateTargetCareer(found.slug);
    } else {
      // Fallback to first career (Software Engineer) if not matched
      setCareer(CAREERS_DATA[0]);
    }
  }, [id]);

  if (!career) {
    return (
      <MainLayout>
        <div className="cd-loading-container">
          <div className="loading-spinner"></div>
          <p>Loading career profile details...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="cd-container">
        {/* BREADCRUMB */}
        <nav className="cd-breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">/</span>
          <Link to="/explorer">Career Explorer</Link>
          <span className="sep">/</span>
          <span className="category">{career.category}</span>
          <span className="sep">/</span>
          <span className="active">{career.title}</span>
        </nav>

        {/* HERO SECTION */}
        <header className="cd-hero-card">
          <div className="cd-hero-main">
            <div className="cd-icon-box">{career.icon || '💼'}</div>
            <div className="cd-hero-text">
              <div className="cd-category-row">
                <span className="cd-category-tag">{career.category}</span>
                <span className="cd-demand-tag">{career.demand}</span>
              </div>
              <h1 className="cd-title">{career.title}</h1>
              <p className="cd-overview">{career.overview || career.description}</p>

              <div className="cd-highlights-bar">
                <div className="highlight-item">
                  <span className="h-icon">💰</span>
                  <div>
                    <span className="h-lbl">India Salary</span>
                    <strong>{career.salaryRange?.india || career.salary}</strong>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="h-icon">🌍</span>
                  <div>
                    <span className="h-lbl">Abroad Salary</span>
                    <strong>{career.salaryRange?.abroad || '$80,000 - $180,000'}</strong>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="h-icon">⏳</span>
                  <div>
                    <span className="h-lbl">Duration</span>
                    <strong>{career.duration}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cd-hero-actions">
            <button
              className="btn-cd-roadmap"
              onClick={() => navigate(`/roadmap/${career.slug}`)}
            >
              Launch Dynamic Roadmap 🗺️
            </button>
            <button
              className="btn-cd-compare"
              onClick={() => navigate(`/compare?c1=${career.slug}`)}
            >
              Compare Career ⚖️
            </button>
          </div>
        </header>

        {/* TABBED NAVIGATION MENU */}
        <nav className="cd-tabs-nav">
          <button
            className={`cd-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📖 Overview & Scope
          </button>
          <button
            className={`cd-tab-btn ${activeTab === 'techstack' ? 'active' : ''}`}
            onClick={() => setActiveTab('techstack')}
          >
            💻 Tech Stack & Skills
          </button>
          <button
            className={`cd-tab-btn ${activeTab === 'salary' ? 'active' : ''}`}
            onClick={() => setActiveTab('salary')}
          >
            💰 Salary & Companies
          </button>
          <button
            className={`cd-tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            📚 Learning & Repos
          </button>
          <button
            className={`cd-tab-btn ${activeTab === 'interview' ? 'active' : ''}`}
            onClick={() => setActiveTab('interview')}
          >
            🎯 Interview & Growth
          </button>
        </nav>

        {/* TAB CONTENTS */}
        <div className="cd-tab-body">
          {/* TAB 1: OVERVIEW & SCOPE */}
          {activeTab === 'overview' && (
            <div className="tab-pane">
              <section className="cd-card">
                <h2>📖 Role Overview & Description</h2>
                <p className="cd-body-p">{career.description}</p>
              </section>

              <section className="cd-card">
                <h2>🎓 Required Education & Eligibility</h2>
                <div className="cd-highlight-box">
                  <strong>Path Eligibility:</strong> {career.requiredEducation}
                </div>
              </section>

              <section className="cd-card">
                <h2>🚀 Future Scope & Industry Trends</h2>
                <p className="cd-body-p">{career.futureScope}</p>

                {career.industryTrends && (
                  <div className="cd-sub-block">
                    <h3>📈 Top Industry Trends</h3>
                    <ul className="cd-bullets-list">
                      {career.industryTrends.map((tr, i) => (
                        <li key={i}>🔥 {tr}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {career.aiImpact && (
                  <div className="cd-ai-impact-box">
                    <h3>🤖 AI Impact Analysis</h3>
                    <p>{career.aiImpact}</p>
                  </div>
                )}
              </section>

              <div className="cd-two-col-grid">
                {career.advantages && (
                  <section className="cd-card adv-card">
                    <h2>✅ Advantages</h2>
                    <ul>
                      {career.advantages.map((ad, i) => (
                        <li key={i}>✓ {ad}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {career.challenges && (
                  <section className="cd-card chal-card">
                    <h2>⚠️ Challenges</h2>
                    <ul>
                      {career.challenges.map((ch, i) => (
                        <li key={i}>⚡ {ch}</li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>

              {career.faqs && (
                <section className="cd-card">
                  <h2>❓ Frequently Asked Questions</h2>
                  <div className="cd-faqs-list">
                    {career.faqs.map((faq, idx) => (
                      <div key={idx} className="cd-faq-block">
                        <h4>Q: {faq.question}</h4>
                        <p>A: {faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {/* TAB 2: TECH STACK & SKILLS */}
          {activeTab === 'techstack' && (
            <div className="tab-pane">
              <section className="cd-card">
                <h2>💡 Essential Skills Required</h2>
                <div className="cd-skills-chips-grid">
                  {career.skills?.map((sk, i) => (
                    <div key={i} className="skill-tile">
                      <span className="tile-check">✓</span> {sk}
                    </div>
                  ))}
                </div>
              </section>

              {career.programmingLanguages && (
                <section className="cd-card">
                  <h2>👨‍💻 Programming Languages</h2>
                  <div className="cd-tags-flex">
                    {career.programmingLanguages.map((lang, i) => (
                      <span key={i} className="tech-tag lang">
                        {lang}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {career.frameworks && (
                <section className="cd-card">
                  <h2>📦 Frameworks & Libraries</h2>
                  <div className="cd-tags-flex">
                    {career.frameworks.map((fw, i) => (
                      <span key={i} className="tech-tag fw">
                        {fw}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {career.tools && (
                <section className="cd-card">
                  <h2>🛠️ Developer Tools & IDEs</h2>
                  <div className="cd-tags-flex">
                    {career.tools.map((t, i) => (
                      <span key={i} className="tech-tag tool">
                        {t}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {career.databases && (
                <section className="cd-card">
                  <h2>🗄️ Databases & Storage</h2>
                  <div className="cd-tags-flex">
                    {career.databases.map((db, i) => (
                      <span key={i} className="tech-tag db">
                        {db}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {career.certifications && (
                <section className="cd-card">
                  <h2>📜 Recommended Industry Certifications</h2>
                  <ul className="cd-bullets-list">
                    {career.certifications.map((cert, i) => (
                      <li key={i}>🏅 {cert}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          )}

          {/* TAB 3: SALARY & COMPANIES */}
          {activeTab === 'salary' && (
            <div className="tab-pane">
              <section className="cd-card">
                <h2>💰 Salary Benchmarks</h2>
                <div className="salary-comparison-grid">
                  <div className="salary-box india">
                    <span className="sal-flag">🇮🇳 India Compensation</span>
                    <h3>{career.salaryRange?.india || career.salary}</h3>
                    <p>Average starting to senior package in India tech hubs.</p>
                  </div>
                  <div className="salary-box abroad">
                    <span className="sal-flag">🌍 International Compensation</span>
                    <h3>{career.salaryRange?.abroad || '$80,000 - $180,000'}</h3>
                    <p>US, Europe & Remote global contract compensation.</p>
                  </div>
                </div>
              </section>

              {career.topCompanies && (
                <section className="cd-card">
                  <h2>🏢 Top Hiring Companies & Employers</h2>
                  <div className="companies-flex">
                    {career.topCompanies.map((comp, i) => (
                      <div key={i} className="company-tile">
                        <span className="comp-icon">🏢</span>
                        <span>{comp}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {/* TAB 4: LEARNING & REPOS */}
          {activeTab === 'resources' && (
            <div className="tab-pane">
              {career.learningResources && (
                <section className="cd-card">
                  <h2>🌐 Free Online Courses & Guides</h2>
                  <div className="links-grid">
                    {career.learningResources.map((res, i) => (
                      <a key={i} href={res.url} target="_blank" rel="noreferrer" className="res-card-link">
                        <span className="res-icon">🔗</span>
                        <div>
                          <strong>{res.title}</strong>
                          <span className="res-url">{res.url}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {career.books && (
                <section className="cd-card">
                  <h2>📖 Recommended Reference Books</h2>
                  <ul className="cd-bullets-list">
                    {career.books.map((b, i) => (
                      <li key={i}>📚 {b}</li>
                    ))}
                  </ul>
                </section>
              )}

              {career.videos && (
                <section className="cd-card">
                  <h2>🎥 Video Courses & Tutorials</h2>
                  <div className="links-grid">
                    {career.videos.map((v, i) => (
                      <a key={i} href={v.url} target="_blank" rel="noreferrer" className="res-card-link video">
                        <span className="res-icon">▶️</span>
                        <div>
                          <strong>{v.title}</strong>
                          <span className="res-url">Watch Video Course</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {career.githubRepos && (
                <section className="cd-card">
                  <h2>💻 GitHub Repositories & Study Guides</h2>
                  <div className="links-grid">
                    {career.githubRepos.map((gh, i) => (
                      <a key={i} href={gh.url} target="_blank" rel="noreferrer" className="res-card-link repo">
                        <span className="res-icon">⭐</span>
                        <div>
                          <strong>{gh.title}</strong>
                          <span className="res-url">View Repository</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {/* TAB 5: INTERVIEW & GROWTH */}
          {activeTab === 'interview' && (
            <div className="tab-pane">
              {career.interviewPrep && (
                <section className="cd-card">
                  <h2>🎯 Interview Preparation Strategy</h2>
                  <ul className="cd-bullets-list">
                    {career.interviewPrep.map((tip, i) => (
                      <li key={i}>📌 {tip}</li>
                    ))}
                  </ul>
                </section>
              )}

              {career.resumeTips && (
                <section className="cd-card">
                  <h2>📄 Resume & Portfolio Optimization Tips</h2>
                  <ul className="cd-bullets-list">
                    {career.resumeTips.map((tip, i) => (
                      <li key={i}>⚡ {tip}</li>
                    ))}
                  </ul>
                </section>
              )}

              {career.projects && (
                <section className="cd-card">
                  <h2>🛠️ Practical Hands-on Portfolio Projects</h2>
                  <div className="cd-projects-list">
                    {career.projects.map((proj, i) => (
                      <div key={i} className="project-box">
                        <span className="proj-num">Project #{i + 1}</span>
                        <h4>{proj}</h4>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {career.careerGrowth && (
                <section className="cd-card">
                  <h2>📈 Career Progression Timeline</h2>
                  <div className="growth-timeline-box">
                    <p>{career.careerGrowth[0]}</p>
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CareerDetails;
