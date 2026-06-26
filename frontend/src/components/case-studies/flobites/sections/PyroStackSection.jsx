import React from 'react';
import './PyroStackSection.css';
import buildSuperseedsScreen from '../../../../assets/flobites/build-superscreen-screen.png';
import buildWomenonfloScreen from '../../../../assets/flobites/build-womenonflo-screen.png';
import pyrosFruitIcon from '../../../../assets/flobites/pyros-fruit-icon.png';
import pyrosNutrientsScreen from '../../../../assets/flobites/pyros-nutrients-screen.png';

const PyroStackSection = () => (
  <>
    <div className="flobites-pyrostack">
      <div className="flobites-pyrostack-header">
        <div>
          <h2 className="flobites-pyrostack-title">How our PyroStack came into action ?</h2>
          <p className="flobites-pyrostack-subtitle">
            We developed the solution for this issue using our{' '}
            <strong>4-step PYROSTACK process</strong>
          </p>
        </div>
        <a href="#pyrostack" className="flobites-pyrostack-btn">View PyroStack</a>
      </div>

      <div className="flobites-pyrostack-grid">
        <div className="flobites-pyrostack-cell">
          <span className="flobites-pyrostack-number">1</span>
          <span className="flobites-pyrostack-label">DECODE</span>
        </div>
        <div className="flobites-pyrostack-cell">
          <span className="flobites-pyrostack-number">2</span>
          <span className="flobites-pyrostack-label">BLUEPRINT</span>
        </div>
        <div className="flobites-pyrostack-cell">
          <span className="flobites-pyrostack-number">3</span>
          <span className="flobites-pyrostack-label">BUILD</span>
        </div>
        <div className="flobites-pyrostack-cell">
          <span className="flobites-pyrostack-number">4</span>
          <span className="flobites-pyrostack-label">PYROS</span>
        </div>
      </div>
    </div>

    <div className="flobites-pyrostack-details">
      <div className="flobites-pyrostack-detail">
        <span className="flobites-pyrostack-detail-number">1</span>
        <h3 className="flobites-pyrostack-detail-heading">DECODE</h3>
        <p className="flobites-pyrostack-detail-body">
          Before redesigning the experience, we focused on understanding
          FloBites, its purpose, and the emotional needs of the women it
          supports. We identified key gaps in trust, storytelling, clarity,
          and emotional connection across the existing website experience.
        </p>
      </div>

      <div className="flobites-pyrostack-detail">
        <span className="flobites-pyrostack-detail-number">2</span>
        <h3 className="flobites-pyrostack-detail-heading">BLUEPRINT</h3>
        <p className="flobites-pyrostack-detail-body">
          Once the challenges became clear, we restructured the experience
          around simplicity, emotional clarity, and easier product
          understanding. From content hierarchy to storytelling flow, every
          decision was designed to help users feel more informed,
          supported, and connected to the brand.
        </p>
      </div>

      <div className="flobites-pyrostack-detail">
        <span className="flobites-pyrostack-detail-number">3</span>
        <h3 className="flobites-pyrostack-detail-heading">BUILD</h3>

        <div className="flobites-build-visual">
          <div className="flobites-build-screens">
            <div className="flobites-build-screen">
              <img src={buildSuperseedsScreen} alt="The Super Seeds Formula ingredient grid screen" />
            </div>
            <div className="flobites-build-screen">
              <img src={buildWomenonfloScreen} alt="Women on Flo testimonial screen" />
            </div>
          </div>

          <div className="flobites-build-stickies">
            <div className="flobites-sticky flobites-sticky--pink">
              <span className="flobites-sticky-pin"></span>
              <span className="flobites-sticky-tag">#SUPERSEEDS</span>
              <p>
                The super seeds formula was one of the major part of the
                project when building it. And this is how we curated a
                separate section for it!
              </p>
            </div>
            <div className="flobites-sticky flobites-sticky--yellow">
              <span className="flobites-sticky-pin"></span>
              <span className="flobites-sticky-tag">#WOMENONFLO</span>
              <p>
                This section is built to show some of the most impactful
                testimonials from women of our FLO. And built a dedicated
                COMMUNITY page for them.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flobites-pyrostack-detail">
        <span className="flobites-pyrostack-detail-number">4</span>
        <h3 className="flobites-pyrostack-detail-heading">PYROS</h3>
        <p className="flobites-pyrostack-detail-body">
          The final experience helped FloBites feel more human, comforting,
          and emotionally connected to the women it was created for.
        </p>

        <div className="flobites-pyros-visual">
          <div className="flobites-pyros-brand">
            <img src={pyrosFruitIcon} alt="" className="flobites-pyros-fruit" />
            <span className="flobites-pyros-eat">Eat.</span>
          </div>
          <div className="flobites-pyros-screen">
            <img src={pyrosNutrientsScreen} alt="Nutrients all in one screenshot showing Iron and Myo-Inositol cards" />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default PyroStackSection;
