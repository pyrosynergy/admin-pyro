import React from 'react';
import './Hero.css';
import heroPng from '../../../../assets/viali/hero.png';

const Hero = () => (
  <div className="viali-hero-wrap">
    <img src={heroPng} alt="Viali Hair Care Hero Banner" className="viali-hero-static-image" />
  </div>
);

export default Hero;
