import React from 'react';
import './Viali.css';
import Hero from './sections/Hero';
import Meta from './sections/Meta';
import Funnel from './sections/Funnel';
import Solution from './sections/Solution';
import Quote from './sections/Quote';
import PyroStackSection from './sections/PyroStackSection';
import Cta from './sections/Cta';
import Showcase from './sections/Showcase';

const Viali = () => {
  return (
    <section className="viali-section">
      <Hero />
      <Meta />
      <Funnel />
      <Solution />
      <Quote />
      <PyroStackSection />
      <Cta />
      <Showcase />
    </section>
  );
};

export default Viali;
