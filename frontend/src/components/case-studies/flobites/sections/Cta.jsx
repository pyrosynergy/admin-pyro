import React from 'react';
import './Cta.css';

const Cta = () => (
  <div className="flobites-cta">
    <p className="flobites-cta-text">
      Want this revamp for your own brand?<br />
      <span className="flobites-cta-text-accent">Lets Talk.</span>
    </p>
    <a href="#contact" className="flobites-cta-btn">
      Book a Call
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" />
      </svg>
    </a>
  </div>
);

export default Cta;
