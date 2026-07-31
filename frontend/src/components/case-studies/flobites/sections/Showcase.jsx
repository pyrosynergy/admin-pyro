import React from 'react';
import './Showcase.css';
import deviceTabletMockup from '../../../../assets/flobites/device-tablet-mockup.webp';
import deviceLaptopMockup from '../../../../assets/flobites/device-laptop-mockup.webp';
import devicePhoneMockup from '../../../../assets/flobites/device-phone-mockup.webp';

const Showcase = () => (
  <div className="flobites-showcase">
    <h2 className="flobites-showcase-title">FlOBiTeS</h2>
    <div className="flobites-showcase-devices">
      <img loading="lazy" decoding="async" src={deviceTabletMockup} alt="Tablet view of the FloBites page showing Why this combination works and Know What You Consume sections" className="flobites-showcase-tablet" />
      <img loading="lazy" decoding="async" src={deviceLaptopMockup} alt="Laptop view of the FloBites page showing the Inside a Bite section" className="flobites-showcase-laptop" />
      <img loading="lazy" decoding="async" src={devicePhoneMockup} alt="Phone view of the FloBites homepage hero" className="flobites-showcase-phone" />
    </div>
  </div>
);

export default Showcase;
