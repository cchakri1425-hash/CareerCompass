import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { EDUCATION_STAGES, INTEREST_FIELDS, CAREERS_DATA } from '../data/careerDatabase';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const problemCards = [
    {
      icon: '❓',
      iconBg: '#fee2e2',
      title: '"I don\'t know which career is right for me."',
      desc: 'Too many conflicting opinions make choosing a career overwhelming. Career Compass gives objective data and personalized path matching.',
    },
    {
      icon: '🗺️',
      iconBg: '#e0e7ff',
      title: '"I don\'t know the exact step-by-step roadmap."',
      desc: 'You know your target job title, but lack a clear structured guide detailing required skills, certifications, and project milestones.',
    },
    {
      icon: '📚',
      iconBg: '#ffedd5',
      title: '"There are too many disorganized online resources."',
      desc: 'Searching YouTube and Google wastes dozens of hours. We curate the highest-quality books, free courses, and GitHub repositories in one spot.',
    },
    {
      icon: '🎓',
      iconBg: '#dcfce7',
      title: '"I am worried about choosing an outdated stream."',
      desc: 'Understand real-time salary benchmarks, AI impact, and future market growth before committing years of education.',
    },
    {
      icon: '🧭',
      iconBg: '#f3e8ff',
      title: '"I need personalized guidance for my education level."',
      desc: 'Whether in Class 8-10, Intermediate (MPC/BiPC/MEC), Diploma, Degree, or Working Professional, get stage-customized roadmaps.',
    },
    {
      icon: '💡',
      iconBg: '#fef9c3',
      title: '"I want to track my progress as I learn."',
      desc: 'Check off roadmap milestones, save career bookmarks, and sync your journey to your personal profile.',
    },
  ];

  const howItWorksSteps = [
    {
      step: '01',
      icon: '🎓',
      title: 'Select Education & Stream',
      desc: 'Choose your current background (Class 8-10, Intermediate MPC/BiPC/MEC, Diploma, Degree, or Working Professional).',
      actionText: 'Choose Stage ➔',
      actionPath: '/education',
    },
    {
      step: '02',
      icon: '🎯',
      title: 'Explore & Take Career Quiz',
      desc: 'Discover 30+ detailed career profiles or take our 5-minute Aptitude Quiz to discover your top matching field.',
      actionText: 'Take Quiz ➔',
      actionPath: '/quiz',
    },
    {
      step: '03',
      icon: '🗺️',
      title: 'Launch Dynamic Roadmap',
      desc: 'Follow your customized step-by-step learning roadmap, track milestone completion, and access top resources.',
      actionText: 'Explore Careers ➔',
      actionPath: '/explorer',
    },
  ];

  const featuredCareers = CAREERS_DATA.slice(0, 6);

  const testimonials = [
    {
      name: 'Rohan Sharma',
      role: 'Intermediate (MPC) ➔ Software Developer',
      text: 'Career Compass mapped out my exact route from Class 12 to my first tech internship. The dynamic roadmap step details were a game changer!',
      avatar: '👨‍💻',
    },
    {
      name: 'Priya Verma',
      role: 'Class 10 Student',
      text: 'The "Choose Education" questionnaire helped me decide between MPC and BiPC with absolute confidence. Highly recommended!',
      avatar: '👩‍🎓',
    },
    {
      name: 'Ankit Patel',
      role: 'Working Professional',
      text: 'Transitioning into AI Engineering was straightforward because of the clear tech stack, books, and GitHub project recommendations.',
      avatar: '👨‍💼',
    },
  ];

  const faqs = [
    {
      question: 'Is Career Compass free to use?',
      answer: 'Yes! Career Compass provides free access to career profiles, education guidance, dynamic roadmaps, and learning resources.',
    },
    {
      question: 'How does the "Choose Education Stage" flow work?',
      answer: 'By selecting your current stage (Class 8-10, Intermediate MPC/BiPC/MEC, Diploma, Degree, etc.), our system customizes career recommendations and adjusts your learning roadmap automatically.',
    },
    {
      question: 'Are salary insights and market demand data up to date?',
      answer: 'Our career insights are curated based on current job market trends, salary reports in India & abroad, and industry standards.',
    },
    {
      question: 'Can I track my progress and save target careers?',
      answer: 'Yes! Creating a free account lets you check off completed roadmap steps, save bookmarks, and view your progress on your personal dashboard.',
    },
  ];

  return (
    <MainLayout>
      <div className="landing-container">
        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="hero-glow-effect"></div>
          <div className="hero-content">
            <div className="hero-badge">
              <span>🚀 Production-Ready Career Guidance Platform</span>
            </div>

            <h1 className="hero-title">
              Navigate Your <span className="highlight">Dream Career</span> With Confidence
            </h1>

            <p className="hero-subtitle">
              Discover high-growth career paths, explore step-by-step dynamic roadmaps tailored for your exact education level, and track your learning progress.
            </p>

            <div className="hero-cta-buttons">
              <button
                className="btn-hero-primary"
                onClick={() => navigate('/education')}
              >
                Start My Journey ➔
              </button>

              <button
                className="btn-hero-secondary"
                onClick={() => navigate('/explorer')}
              >
                Explore Careers 🔍
              </button>

              <button
                className="btn-hero-quiz"
                onClick={() => navigate('/quiz')}
              >
                Take Career Quiz 🎯
              </button>
            </div>

            {/* QUICK STAGE PILLS */}
            <div className="quick-stages-bar">
              <span className="stages-label">Quick Select Stage:</span>
              <div className="stages-pills">
                {EDUCATION_STAGES.slice(0, 5).map((stg) => (
                  <button
                    key={stg.id}
                    className="stage-pill"
                    onClick={() => navigate(`/explorer?education=${encodeURIComponent(stg.id)}`)}
                  >
                    {stg.icon} {stg.title}
                  </button>
                ))}
              </div>
            </div>

            {/* STATS GRID */}
            <div className="hero-stats-grid">
              <div className="stat-card">
                <h3>30+</h3>
                <p>Detailed Career Paths</p>
              </div>
              <div className="stat-card">
                <h3>100%</h3>
                <p>Dynamic Roadmaps</p>
              </div>
              <div className="stat-card">
                <h3>50K+</h3>
                <p>Guided Students</p>
              </div>
              <div className="stat-card">
                <h3>500+</h3>
                <p>Curated Resources</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED CAREERS SECTION */}
        <section className="landing-section">
          <div className="section-header">
            <h2>Explore High-Growth Career Fields</h2>
            <p>Select any field to view detailed skill requirements, salary insights, and dynamic learning paths.</p>
          </div>

          <div className="featured-careers-grid">
            {featuredCareers.map((c) => (
              <div
                key={c.slug}
                className="landing-career-card"
                onClick={() => navigate(`/explorer/${c.slug}`)}
              >
                <div className="card-top-header">
                  <span className="card-icon">{c.icon}</span>
                  <span className="card-demand-tag">{c.demand}</span>
                </div>
                <h3>{c.title}</h3>
                <span className="card-category-badge">{c.category}</span>
                <p className="card-overview-text">{c.overview}</p>

                <div className="card-meta-row">
                  <div>
                    <span className="meta-lbl">Salary Range</span>
                    <strong className="meta-val">{c.salaryRange?.india || c.salary}</strong>
                  </div>
                  <div>
                    <span className="meta-lbl">Duration</span>
                    <strong className="meta-val">{c.duration}</strong>
                  </div>
                </div>

                <div className="card-actions">
                  <button
                    className="btn-card-details"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/explorer/${c.slug}`);
                    }}
                  >
                    View Details ➔
                  </button>
                  <button
                    className="btn-card-roadmap"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/roadmap/${c.slug}`);
                    }}
                  >
                    Roadmap 🗺️
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="center-action-wrapper">
            <button className="btn-primary-lg" onClick={() => navigate('/explorer')}>
              Explore All 30+ Career Paths ➔
            </button>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="landing-section bg-light">
          <div className="section-header">
            <h2>How Career Compass Works</h2>
            <p>Follow our proven 3-step system to transition from uncertainty to career clarity.</p>
          </div>

          <div className="how-grid">
            {howItWorksSteps.map((step, idx) => (
              <div className="how-card" key={idx}>
                <div className="step-badge">{step.step}</div>
                <div className="step-icon-wrapper">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                <button
                  className="btn-how-action"
                  onClick={() => navigate(step.actionPath)}
                >
                  {step.actionText}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* PROBLEMS SECTION */}
        <section className="landing-section">
          <div className="section-header">
            <h2>Struggling With Career Choices?</h2>
            <p>You are not alone. Here is how Career Compass solves common student & professional challenges.</p>
          </div>

          <div className="problem-grid">
            {problemCards.map((card, idx) => (
              <div className="problem-card" key={idx}>
                <div className="problem-icon" style={{ backgroundColor: card.iconBg }}>
                  {card.icon}
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* POPULAR CATEGORIES */}
        <section className="landing-section bg-light">
          <div className="section-header">
            <h2>Explore By Interest Category</h2>
            <p>Target your preferred domain and discover related careers & streams.</p>
          </div>

          <div className="categories-grid">
            {INTEREST_FIELDS.slice(0, 6).map((cat) => (
              <div
                className="category-card"
                key={cat.id}
                onClick={() => navigate(`/explorer?category=${encodeURIComponent(cat.id)}`)}
              >
                <div className="cat-icon-large">{cat.icon}</div>
                <h3>{cat.label}</h3>
                <p>{cat.desc}</p>
                <span className="cat-explore-link">Browse Careers ➔</span>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="landing-section">
          <div className="section-header">
            <h2>Loved by Students & Professionals</h2>
            <p>See how Career Compass is transforming career navigation across India.</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t, idx) => (
              <div className="testimonial-card" key={idx}>
                <p className="t-text">"{t.text}"</p>
                <div className="t-user">
                  <span className="t-avatar">{t.avatar}</span>
                  <div>
                    <h4>{t.name}</h4>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ ACCORDION */}
        <section className="landing-section bg-light">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about navigating your career with Career Compass.</p>
          </div>

          <div className="faq-container">
            {faqs.map((faq, idx) => (
              <div
                className={`faq-item ${openFaq === idx ? 'open' : ''}`}
                key={idx}
                onClick={() => toggleFaq(idx)}
              >
                <div className="faq-question">
                  <span>{faq.question}</span>
                  <span className="faq-toggle">{openFaq === idx ? '−' : '+'}</span>
                </div>
                {openFaq === idx && <div className="faq-answer">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Landing;
