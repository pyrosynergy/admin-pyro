import React from 'react';
import './Showcase.css';
import showcaseDevices from '../../../../assets/viali/showcase-devices.png';

const Showcase = () => (
  <div className="viali-showcase">
    <h2 className="viali-showcase-title">Viali Hair Care</h2>
    <div className="viali-showcase-devices">
      <img
        src={showcaseDevices}
        alt="Viali Hair Care shown on phone and laptop, featuring the Moelle serum hero and the events page"
        className="viali-showcase-image"
      />
    </div>
  </div>
);

export default Showcase;
