import React from 'react';
import './Founder.css';
import linkedinIcon from '../../assets/icon_linkedin.png';
import founderImage from '../../assets/founder.png';

const Founder = () => {
  return (
    <section id="founder" className="founder-section">
      <div className="founder-container">
        <h2 className="founder-title">Meet The Founder</h2>

        <div className="founder-content">
          <div className="founder-image-wrapper">
            <img src={founderImage} alt="Prachet Yerramalla" className="founder-photo" />
          </div>

          <div className="founder-description">
            <p>
              <strong>Prachet Yerramalla (Founder &amp; CEO)</strong> is an AI entrepreneur and business
              strategist who has led the development of real-world solutions across
              enterprise and startup environments. He brings the tech and product
              vision to PyroSynergy.
            </p>
          </div>

          <a
            href="https://www.linkedin.com/in/prachetyerr"
            target="_blank"
            rel="noopener noreferrer"
            className="founder-cta"
          >

            More About PY
          </a>
        </div>
      </div>
    </section>
  );
};

export default Founder;
