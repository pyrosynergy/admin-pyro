import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PyroStackSection.css';
import buildShopScreen from '../../../../assets/viali/build-shop-screen.png';
import buildScheduleScreen from '../../../../assets/viali/build-schedule-screen.png';

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
    <div className="viali-pyrostack">
      <div className="viali-pyrostack-header">
        <div>
          <h2 className="viali-pyrostack-title">How did we pull this off?</h2>

        </div>
        <a href="/#pyrostack" className="viali-pyrostack-btn" onClick={handleViewMoreClick}>Learn More About Our Framework</a>
      </div>

      <div className="viali-pyrostack-grid">
        <div className="viali-pyrostack-cell">
          <span className="viali-pyrostack-number">1</span>
          <span className="viali-pyrostack-label">Founder & Product Audit</span>
        </div>
        <div className="viali-pyrostack-cell">
          <span className="viali-pyrostack-number">2</span>
          <span className="viali-pyrostack-label">PyroStack<sup>TM</sup></span>
        </div>
        <div className="viali-pyrostack-cell">
          <span className="viali-pyrostack-number">3</span>
          <span className="viali-pyrostack-label">Strategy + Execution Plan</span>
        </div>
        <div className="viali-pyrostack-cell">
          <span className="viali-pyrostack-number">4</span>
          <span className="viali-pyrostack-label">Build & Launch</span>
        </div>
      </div>
    </div>

    <div className="viali-pyrostack-details">
      <div className="viali-pyrostack-detail">
        <span className="viali-pyrostack-detail-number">1</span>
        <h3 className="viali-pyrostack-detail-heading">Founder & Product Audit</h3>
        <p className="viali-pyrostack-detail-body">
          Team Pyro along with the founder went through a series of discussions about the product and an in-depth analysis of its competitive market. Several gaps were identified, the primary one being users unable to purchase the product online.</p>
      </div>

      <div className="viali-pyrostack-detail">
        <span className="viali-pyrostack-detail-number">2</span>
        <h3 className="viali-pyrostack-detail-heading">PyroStack<sup>TM</sup></h3>
        <p className="viali-pyrostack-detail-body">
           Our proprietary 35+ touchpoint framework PyroStack<sup>TM</sup> was used to map and evaluate the next steps for Viali’s growth. Through this, a roadmap was made for the new e-commerce platform.
        </p>
      </div>

      <div className="viali-pyrostack-detail">
        <span className="viali-pyrostack-detail-number">3</span>
        <h3 className="viali-pyrostack-detail-heading">Strategy + Execution Plan</h3>
        <p className="viali-pyrostack-detail-body">
            Along with the e-commerce platform, strategies for developing and promoting online hair consultation and offline events booking pages were made, along with a detailed execution timeline.
        </p>
        {/* <div className="viali-build-visual">
          <div className="viali-build-screens">
            <div className="viali-build-screen">
              <img src={buildShopScreen} alt="Viali Hair Care shop page with product grid and filters" />
            </div>
            <div className="viali-build-screen">
              <img src={buildScheduleScreen} alt="Viali Hair Care consultation booking screen" />
            </div>
          </div>

          <div className="viali-build-stickies">
            <div className="viali-sticky viali-sticky--pink">
              <span className="viali-sticky-pin"></span>
              <span className="viali-sticky-tag">#SHOP</span>

            </div>
            <div className="viali-sticky viali-sticky--blue">
              <span className="viali-sticky-pin"></span>
              <span className="viali-sticky-tag">#BOOKING</span>

            </div>
          </div>
        </div> */}
      </div>

      <div className="viali-pyrostack-detail">
        <span className="viali-pyrostack-detail-number">4</span>
        <h3 className="viali-pyrostack-detail-heading">Build & Launch</h3>
        <p className="viali-pyrostack-detail-body">
          The first 2-3 weeks were used for exploring different designs. Once the design language was finalized, our team spent the next 6 weeks developing the entire website, including inventory and revenue management systems. Right after launching, another 4 weeks were spent on creating and uploading marketing material for Viali’s socials.
        </p>
      </div>
    </div>
  </>
  );
};

export default PyroStackSection;
