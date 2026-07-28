import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PyroStackSection.css';
import buildSuperseedsScreen from '../../../../assets/flobites/build-superscreen-screen.png';
import buildWomenonfloScreen from '../../../../assets/flobites/build-womenonflo-screen.png';
import pyrosFruitIcon from '../../../../assets/flobites/pyros-fruit-icon.png';
import pyrosNutrientsScreen from '../../../../assets/flobites/pyros-nutrients-screen.png';

const PyroStackSection = () => {
  const navigate = useNavigate();

  const handleViewMoreClick = (e) => {
    e.preventDefault();
    navigate('/');
    // Wait for the landing page to mount before scrolling to its section.
    setTimeout(() => {
      const element = document.getElementById('pyrostack');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
  <>
    <div className="flobites-pyrostack">
      <div className="flobites-pyrostack-header">
        <div>
          <h2 className="flobites-pyrostack-title">How did we pull this off?</h2>

        </div>
        <a href="/#pyrostack" className="flobites-pyrostack-btn" onClick={handleViewMoreClick}>View More</a>
      </div>

      <div className="flobites-pyrostack-grid">
        <div className="flobites-pyrostack-cell">
          <span className="flobites-pyrostack-number">1</span>
          <span className="flobites-pyrostack-label">founder & product audit</span>
        </div>
        <div className="flobites-pyrostack-cell">
          <span className="flobites-pyrostack-number">2</span>
          <span className="flobites-pyrostack-label">PyroStack<sup>TM</sup></span>
        </div>
        <div className="flobites-pyrostack-cell">
          <span className="flobites-pyrostack-number">3</span>
          <span className="flobites-pyrostack-label">strategy + execution plan</span>
        </div>
        <div className="flobites-pyrostack-cell">
          <span className="flobites-pyrostack-number">4</span>
          <span className="flobites-pyrostack-label">build & launch</span>
        </div>
      </div>
    </div>

    <div className="flobites-pyrostack-details">
      <div className="flobites-pyrostack-detail">
        <span className="flobites-pyrostack-detail-number">1</span>
        <h3 className="flobites-pyrostack-detail-heading">founder & product audit</h3>
        <p className="flobites-pyrostack-detail-body">
          through several discussions with the founder and the team, along with a deep analysis of the existing website experience, we identified key gaps in FloBites’ brand positioning and storytelling.
        </p>
      </div>

      <div className="flobites-pyrostack-detail">
        <span className="flobites-pyrostack-detail-number">2</span>
        <h3 className="flobites-pyrostack-detail-heading">PyroStack<sup>TM</sup></h3>
        <p className="flobites-pyrostack-detail-body">
           we used our proprietary 35+ touchpoint framework, PyroStackTM, to map the next steps for growth - starting with storytelling and UI/UX improvements.
        </p>
      </div>

      <div className="flobites-pyrostack-detail">
        <span className="flobites-pyrostack-detail-number">3</span>
        <h3 className="flobites-pyrostack-detail-heading">strategy + execution plan</h3>
        <p className="flobites-pyrostack-detail-body">
           a content strategy, a revised brand kit, a new website layout with a clear path to purchase, and an execution timeline were built based on the evaluation.</p>
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
              
            </div>
            <div className="flobites-sticky flobites-sticky--yellow">
              <span className="flobites-sticky-pin"></span>
              <span className="flobites-sticky-tag">#WOMENONFLO</span>
              
            </div>
          </div>
        </div>
      </div>

      <div className="flobites-pyrostack-detail">
        <span className="flobites-pyrostack-detail-number">4</span>
        <h3 className="flobites-pyrostack-detail-heading">build & launch</h3>
        <p className="flobites-pyrostack-detail-body">
          within 4 weeks, our team designed and built the final website screens. the site relaunched 2 weeks later with speed and search optimisations in place.
        </p>

        {/* <div className="flobites-pyros-visual">
          <div className="flobites-pyros-brand">
            <img src={pyrosFruitIcon} alt="" className="flobites-pyros-fruit" />
            <span className="flobites-pyros-eat">Eat.</span>
          </div>
          <div className="flobites-pyros-screen">
            <img src={pyrosNutrientsScreen} alt="Nutrients all in one screenshot showing Iron and Myo-Inositol cards" />
          </div>
        </div> */}
      </div>
    </div>
  </>
  );
};

export default PyroStackSection;
