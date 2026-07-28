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
        <a href="/#pyrostack" className="viali-pyrostack-btn" onClick={handleViewMoreClick}>View More</a>
      </div>

      <div className="viali-pyrostack-grid">
        <div className="viali-pyrostack-cell">
          <span className="viali-pyrostack-number">1</span>
          <span className="viali-pyrostack-label">founder & product audit</span>
        </div>
        <div className="viali-pyrostack-cell">
          <span className="viali-pyrostack-number">2</span>
          <span className="viali-pyrostack-label">PyroStack<sup>TM</sup></span>
        </div>
        <div className="viali-pyrostack-cell">
          <span className="viali-pyrostack-number">3</span>
          <span className="viali-pyrostack-label">strategy + execution plan</span>
        </div>
        <div className="viali-pyrostack-cell">
          <span className="viali-pyrostack-number">4</span>
          <span className="viali-pyrostack-label">build & launch</span>
        </div>
      </div>
    </div>

    <div className="viali-pyrostack-details">
      <div className="viali-pyrostack-detail">
        <span className="viali-pyrostack-detail-number">1</span>
        <h3 className="viali-pyrostack-detail-heading">founder & product audit</h3>
        <p className="viali-pyrostack-detail-body">
          through in-depth conversations with the founder and a full audit of the barebones landing page and manual sales process, we identified exactly where Viali Hair Care's brand story and buying journey were breaking down.
        </p>
      </div>

      <div className="viali-pyrostack-detail">
        <span className="viali-pyrostack-detail-number">2</span>
        <h3 className="viali-pyrostack-detail-heading">PyroStack<sup>TM</sup></h3>
        <p className="viali-pyrostack-detail-body">
           we used our proprietary 35+ touchpoint framework, PyroStackTM, to map the path from a personal-network business to a fully operational storefront - starting with the e-commerce foundation and booking experience.
        </p>
      </div>

      <div className="viali-pyrostack-detail">
        <span className="viali-pyrostack-detail-number">3</span>
        <h3 className="viali-pyrostack-detail-heading">strategy + execution plan</h3>
        <p className="viali-pyrostack-detail-body">
           a full Wix Studio rebuild plan was mapped out: a new landing page, shop with color, size, and price variants, consultation booking, multi-gateway checkout, and an execution timeline to get it all live.</p>
        <div className="viali-build-visual">
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
        </div>
      </div>

      <div className="viali-pyrostack-detail">
        <span className="viali-pyrostack-detail-number">4</span>
        <h3 className="viali-pyrostack-detail-heading">build & launch</h3>
        <p className="viali-pyrostack-detail-body">
          our team designed and built the new site end-to-end on Wix Studio, then handed the founder a self-serve mobile app to manage inventory, orders, and appointments without touching a spreadsheet again.
        </p>
      </div>
    </div>
  </>
  );
};

export default PyroStackSection;
