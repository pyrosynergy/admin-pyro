import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { CALENDAR_URL, openExternalTab } from '../../lib/calendar.js';

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    icon: <FaInstagram />,
    url: 'https://www.instagram.com/pyrosynergy'
  },
  {
    label: 'LinkedIn',
    icon: <FaLinkedin />,
    url: 'https://www.linkedin.com/company/pyrosynergy/posts/?feedView=all'
  }
];

const Welcome = () => {
  return (
    <div className="pyro-landing-wrapper">
      <div className="pyro-landing-main">
        {/* Profile Section */}
        <div className="pyro-company-info">
          <Link
            className="pyro-logo-container"
            to="/"
            aria-label="Go to the PyroSynergy home page"
          >
            <img loading="lazy" decoding="async"
              src="/Mainlogo3.webp"
              alt="PyroSynergy Logo"
              className="pyro-logo-img"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="pyro-logo-fallback" style={{display: 'none'}}>PS</div>
          </Link>
          <h1 className="pyro-company-title">PyroSynergy</h1>
          <p className="pyro-company-tagline">
            Your growth partner, right from strategy to execution.
          </p>
          <p className="pyro-company-description">
            <span className="pyro-company-description-lead">
              PyroSynergy is for founders who&rsquo;re done figuring it alone.
            </span>
            We&rsquo;re a strategic execution studio handling design, product,
            and growth for early-stage founders ready to scale.
          </p>
        </div>

        {/* Links Section */}
        <div className="pyro-navigation-menu">
          <button
            type="button"
            className="pyro-cta pyro-cta-primary"
            onClick={() => openExternalTab(CALENDAR_URL)}
          >
            <span className="pyro-cta-title">Book a Call</span>
            <span className="pyro-cta-subtitle">Schedule a FREE audit call</span>
          </button>

          <Link
            className="pyro-cta pyro-cta-secondary"
            to="/"
          >
            <span className="pyro-cta-title">Website</span>
            <span className="pyro-cta-subtitle">Visit our website</span>
          </Link>

          {/* Instagram left, LinkedIn right — the two social boxes collapsed
              into icon-only links sitting under the CTAs. */}
          <div className="pyro-social-row">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                className="pyro-social-link"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
