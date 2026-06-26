import React from 'react';
import './Showcase.css';
import deviceTabletMockup from '../../../../assets/flobites/device-tablet-mockup.png';
import deviceLaptopMockup from '../../../../assets/flobites/device-laptop-mockup.png';
import devicePhoneMockup from '../../../../assets/flobites/device-phone-mockup.png';

const Showcase = () => (
  <div className="flobites-showcase">
    <h2 className="flobites-showcase-title">FLOBITES</h2>
    <div className="flobites-showcase-devices">
      <img src={deviceTabletMockup} alt="Tablet view of the FloBites page showing Why this combination works and Know What You Consume sections" className="flobites-showcase-tablet" />
      <img src={deviceLaptopMockup} alt="Laptop view of the FloBites page showing the Inside a Bite section" className="flobites-showcase-laptop" />
      <img src={devicePhoneMockup} alt="Phone view of the FloBites homepage hero" className="flobites-showcase-phone" />
    </div>
  </div>
);

export default Showcase;
