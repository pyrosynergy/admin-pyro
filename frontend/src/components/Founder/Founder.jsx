import React from 'react';
import './Founder.css';
import founderImage from '../../assets/founder.webp';

const Founder = () => {
  return (
    <section id="founder" className="founder-section">
      <div className="founder-container">
        <h2 className="founder-title">Behind the Scenes</h2>

        <div className="founder-content">
          <div className="founder-image-wrapper">
            <img loading="lazy" decoding="async" src={founderImage} alt="Prachet Yerramalla" className="founder-photo" />

            <div className="founder-identity">
              <h3 className="founder-name">
                Prachet (PY)
                <br />
                Yerramalla
              </h3>
              <p className="founder-role">Founder &amp; CEO</p>
            </div>
          </div>

          <div className="founder-description">
            <p>
              <strong>PY</strong> is an AI entrepreneur and business
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
