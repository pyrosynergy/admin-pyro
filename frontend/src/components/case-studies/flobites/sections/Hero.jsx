import React from 'react';
import './Hero.css';
import heroPng from '../../../../assets/flobites/hero.png';

const Hero = () => (
  <div className="flobites-hero-wrap">
    <img src={heroPng} alt="FloBites Hero Section Blueprint" className="flobites-hero-static-image" />
  </div>
);

export default Hero;
