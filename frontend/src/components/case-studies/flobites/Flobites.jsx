import React from 'react';
import './Flobites.css';
import Hero from './sections/Hero';
import Meta from './sections/Meta';
import Process from './sections/Process';
import Refine from './sections/Refine';
import Shift from './sections/Shift';
import Issues from './sections/Issues';
import PyroStackSection from './sections/PyroStackSection';
import Nourish from './sections/Nourish';
import Stories from './sections/Stories';
import Showcase from './sections/Showcase';
import Cta from './sections/Cta';

const Flobites = () => {
  return (
    <section className="flobites-section">
      <Hero />
      <Meta />
      <Process />
      <Refine />
      <Issues />
      <Shift />
      <PyroStackSection />
      <Nourish />
      <Stories />
      <Showcase />
      <Cta />
    </section>
  );
};

export default Flobites;
