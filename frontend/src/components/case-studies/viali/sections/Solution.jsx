import React from 'react';
import './Solution.css';
import deviceShopMockup from '../../../../assets/viali/device-laptop-phone-shop.png';
import devicePhoneDashboard from '../../../../assets/viali/device-phone-dashboard.png';

const Solution = () => (
  <div className="viali-solution">
    <h2 className="viali-solution-title">
      More than just a redesign; building an <span className="viali-solution-title-accent">operational system</span>.
    </h2>

    <div className="viali-solution-row">
      <div className="viali-solution-image">
        <img src={deviceShopMockup} alt="Viali Hair Care shop page and appointment scheduling shown on laptop and phone" />
      </div>
      <div className="viali-solution-text">
        <h3 className="viali-solution-subheading">A reimagined user experience.</h3>
        <p className="viali-solution-body">
          We rebuilt the site from the ground up on Wix Studio: a new landing page, the new-arrivals section, a consultation booking page, plus full e-commerce with color, size, and price variants.
        </p>
        <p className="viali-solution-body">
          Checkout was rebuilt with multi-gateway payment support, from Apple Pay and PayPal to major credit and debit cards.
        </p>
      </div>
    </div>

    <div className="viali-solution-row viali-solution-row--reverse">
      <div className="viali-solution-text">
        <h3 className="viali-solution-subheading sub2">
          Running the business <span className="viali-solution-strike">manually</span> right through mobile.
        </h3>
        <p className="viali-solution-body body2">
          We replaced manual stock-keeping with a self-serve inventory system through the Wix Studio client app, giving the founder live control over quantities. We also helped with revenue tracking, event ticketing, and appointments tracking for her hair-treatment consultations.
        </p>
      </div>
      <div className="viali-solution-image viali-solution-image--small">
        <img src={devicePhoneDashboard} alt="Wix Studio client app showing the Viali Hair Care analytics dashboard" />
      </div>
    </div>
  </div>
);

export default Solution;
