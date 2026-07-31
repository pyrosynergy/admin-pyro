import React from 'react';
import './Hero.css';
import heroPng from '../../../../assets/flobites/hero.webp';

const Hero = () => (
  <div className="flobites-hero-wrap">
    {/* LCP element for the case-study route — loaded eagerly. */}
    <img src={heroPng} alt="FloBites Hero Section Blueprint" fetchPriority="high" decoding="async" className="flobites-hero-static-image" />
  </div>
);

export default Hero;
