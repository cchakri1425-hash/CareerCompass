import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../context/AuthContext';
import {
  EDUCATION_STAGES,
  STREAMS_BY_EDUCATION,
  INTEREST_FIELDS,
  getFilteredCareers,
} from '../data/careerDatabase';
import './CareerExplorer.css';

const CareerExplorer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    selectedEducation,
    updateEducation,
    selectedStream,
    updateStream,
    selectedInterest,
    updateInterest,
    updateTargetCareer,
  } = useAuth();

  const paramEducation = searchParams.get('education');
  const paramStream = searchParams.get('stream');
  const paramCategory = searchParams.get('category');

  const [educationFilter, setEducationFilter] = useState(
    paramEducation || selectedEducation || 'All'
  );
  const [streamFilter, setStreamFilter] = useState(
    paramStream || selectedStream || 'All'
  );
  const [categoryFilter, setCategoryFilter] = useState(
    paramCategory || selectedInterest || 'All'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCareers, setFilteredCareers] = useState([]);

  const currentAvailableStreams =
    STREAMS_BY_EDUCATION[educationFilter] ||
    STREAMS_BY_EDUCATION['Intermediate'] ||
    [];

  useEffect(() => {
    const list = getFilteredCareers({
      education: educationFilter,
      stream: streamFilter,
      category: categoryFilter,
      search: searchTerm,
    });
    setFilteredCareers(list);
  }, [educationFilter, streamFilter, categoryFilter, searchTerm]);

  const handleEducationSelect = (eduId) => {
    setEducationFilter(eduId);
    if (eduId !== 'All') updateEducation(eduId);
    setStreamFilter('All');
    updateParams(eduId, 'All', categoryFilter);
  };

  const handleStreamSelect = (strId) => {
    setStreamFilter(strId);
    if (strId !== 'All') updateStream(strId);
    updateParams(educationFilter, strId, categoryFilter);
  };

  const handleCategorySelect = (catId) => {
    setCategoryFilter(catId);
    if (catId !== 'All') updateInterest(catId);
    updateParams(educationFilter, streamFilter, catId);
  };

  const updateParams = (edu, str, cat) => {
    const newParams = {};
    if (edu && edu !== 'All') newParams.education = edu;
    if (str && str !== 'All') newParams.stream = str;
    if (cat && cat !== 'All') newParams.category = cat;
    setSearchParams(newParams);
  };

  const handleSelectCareer = (slug) => {
    updateTargetCareer(slug);
    navigate(`/explorer/${slug}`);
  };

  const handleLaunchRoadmap = (e, slug) => {
    e.stopPropagation();
    updateTargetCareer(slug);
    navigate(`/roadmap/${slug}`);
  };

  return (
    <MainLayout>
      <div className="explorer-container">
        {/* HEADER */}
        <header className="explorer-header">
          <span className="explorer-badge">🧭 30+ Production Career Pathways</span>
          <h1>
            Career <span className="highlight">Explorer</span>
          </h1>
          <p>
            Browse high-growth career options, average salaries, required skills, and dynamic roadmaps tailored for all education levels and streams.
          </p>
        </header>

        {/* ACTIVE SELECTION GUIDANCE BANNER */}
        <div className="stage-guidance-banner">
          <div>
            <h4>
              🎓 Stage: <strong>{educationFilter}</strong> | Stream: <strong>{streamFilter}</strong> | Interest: <strong>{categoryFilter}</strong>
            </h4>
            <p>
              Showing tailored career fields. Changing selection dynamically updates your learning roadmaps and recommended skill sets.
            </p>
          </div>
          <button onClick={() => navigate('/education')} className="btn-change-edu">
            Change Stage Wizard ✏️
          </button>
        </div>

        {/* SEARCH & FILTERS CONTROLS */}
        <div className="explorer-controls">
          <div className="search-bar-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search careers by title, skills (e.g. React, MBBS, Python), or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="search-clear-btn" onClick={() => setSearchTerm('')}>
                ✕
              </button>
            )}
          </div>

          {/* EDUCATION LEVEL CHIPS */}
          <div className="filter-group">
            <span className="filter-label">Filter By Education Level:</span>
            <div className="chips-scroll-row">
              <button
                className={`filter-chip ${educationFilter === 'All' ? 'active' : ''}`}
                onClick={() => handleEducationSelect('All')}
              >
                🌟 All Stages
              </button>
              {EDUCATION_STAGES.map((stage) => (
                <button
                  key={stage.id}
                  className={`filter-chip ${educationFilter === stage.id ? 'active' : ''}`}
                  onClick={() => handleEducationSelect(stage.id)}
                >
                  {stage.icon} {stage.title}
                </button>
              ))}
            </div>
          </div>

          {/* STREAM CHIPS (IF SPECIFIC EDUCATION SELECTED) */}
          {educationFilter !== 'All' && currentAvailableStreams.length > 0 && (
            <div className="filter-group">
              <span className="filter-label">Filter By Stream / Trade ({educationFilter}):</span>
              <div className="chips-scroll-row">
                <button
                  className={`filter-chip stream-chip ${streamFilter === 'All' ? 'active' : ''}`}
                  onClick={() => handleStreamSelect('All')}
                >
                  All Streams
                </button>
                {currentAvailableStreams.map((st) => (
                  <button
                    key={st.id}
                    className={`filter-chip stream-chip ${streamFilter === st.id ? 'active' : ''}`}
                    onClick={() => handleStreamSelect(st.id)}
                  >
                    {st.icon} {st.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CATEGORY CHIPS */}
          <div className="filter-group">
            <span className="filter-label">Filter By Category:</span>
            <div className="chips-scroll-row">
              <button
                className={`filter-chip ${categoryFilter === 'All' ? 'active' : ''}`}
                onClick={() => handleCategorySelect('All')}
              >
                All Fields
              </button>
              {INTEREST_FIELDS.map((cat) => (
                <button
                  key={cat.id}
                  className={`filter-chip ${categoryFilter === cat.id ? 'active' : ''}`}
                  onClick={() => handleCategorySelect(cat.id)}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CAREER CARDS GRID */}
        {filteredCareers.length === 0 ? (
          <div className="explorer-empty">
            <h3>No careers matched your search criteria.</h3>
            <p>Try resetting filters or searching for terms like "Software", "Doctor", "CA", "Law", or "Design".</p>
            <button
              className="btn-primary-lg"
              onClick={() => {
                setEducationFilter('All');
                setStreamFilter('All');
                setCategoryFilter('All');
                setSearchTerm('');
              }}
            >
              Reset All Filters 🔄
            </button>
          </div>
        ) : (
          <div className="career-cards-grid">
            {filteredCareers.map((c) => (
              <div
                key={c.slug}
                className="explorer-career-card"
                onClick={() => handleSelectCareer(c.slug)}
              >
                <div className="card-top">
                  <div className="career-badge-icon">{c.icon || '💼'}</div>
                  <div>
                    <h3>{c.title}</h3>
                    <span className="category-tag">{c.category}</span>
                  </div>
                </div>

                <p className="career-desc">{c.overview || c.description}</p>

                <div className="career-meta-row">
                  <div className="meta-box">
                    <span className="meta-label">Avg Salary</span>
                    <span className="meta-val salary">{c.salaryRange?.india || c.salary}</span>
                  </div>
                  <div className="meta-box">
                    <span className="meta-label">Demand</span>
                    <span className="meta-val demand">{c.demand}</span>
                  </div>
                </div>

                <div className="skills-section">
                  <h4>Required Skills</h4>
                  <div className="skills-chips">
                    {c.skills &&
                      c.skills.slice(0, 4).map((skill, idx) => (
                        <span key={idx} className="skill-chip">
                          {skill}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="card-action-row">
                  <button
                    className="btn-details"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectCareer(c.slug);
                    }}
                  >
                    Details ➔
                  </button>

                  <button
                    className="btn-compare"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/compare?c1=${c.slug}`);
                    }}
                  >
                    Compare ⚖️
                  </button>

                  <button
                    className="btn-roadmap"
                    onClick={(e) => handleLaunchRoadmap(e, c.slug)}
                  >
                    Roadmap 🗺️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CareerExplorer;
