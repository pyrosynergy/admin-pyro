import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CaseStudies.css';
import flobitesLogo from '../../assets/logo_fb_the.png';
import vialiLogo from '../../assets/logo_viali.png';

const caseStudies = [
  {
    id: 'flobites',
    accent: 'flobites',
    title: 'FloBites',
    logo: flobitesLogo,
    logoAlt: 'FloBites logo',
    description: "How we transformed FloBites' digital presence with a modern, conversion-focused website.",
    path: '/case-studies/flobites',
  },
  {
    id: 'viali',
    accent: 'viali',
    title: 'Viali Hair Care',
    logo: vialiLogo,
    logoAlt: 'Viali Hair Care logo',
    description: 'Building a premium e-commerce experience for a growing hair care brand.',
    path: '/case-studies/viali',
  },
];

const CaseStudies = () => {
  const navigate = useNavigate();

  return (
    <section className="cs-section">
      <div className="cs-header">
        <h1 className="cs-title">
          Real Brands. <br className="cs-title-break" />Real <span className="cs-title-accent">Results.</span>
        </h1>
        <p className="cs-subtitle">
          A closer look at the founders we've partnered with and the growth systems we built for them.
        </p>
      </div>

      <div className="cs-grid">
        {caseStudies.map((cs) => (
          <button
            type="button"
            key={cs.id}
            className={`cs-card cs-card--${cs.accent}`}
            onClick={() => navigate(cs.path)}
          >
            <div className="cs-card-media">
              <div className="cs-card-glow" aria-hidden="true"></div>
              <div className="cs-card-logo-badge">
                <img src={cs.logo} alt={cs.logoAlt} className="cs-card-logo" />
              </div>
            </div>

            <div className="cs-card-info">
              <div className="cs-card-text">
                <h2 className="cs-card-name">{cs.title}</h2>
                <p className="cs-card-desc">{cs.description}</p>
              </div>

              <span className="cs-card-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;
