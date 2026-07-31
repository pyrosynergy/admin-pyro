import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div id="loading">
      <div className="logo-container">
        {/* Splash screen logo — the one image that must never be deferred. */}
        <img
          src="/Mainlogo3.webp"
          alt="PyroSynergy Logo"
          width="250"
          height="250"
          fetchPriority="high"
          className="loading-logo"
        />
        <div className="logo-glow"></div>
      </div>
      <div className="loading-text">
        <span className="company-name">PyroSynergy</span>
        <span className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
    </div>
  );
};

export default Loading;