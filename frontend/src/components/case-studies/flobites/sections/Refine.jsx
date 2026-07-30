import React from 'react';
import './Refine.css';

const Refine = () => (
  <div className="flobites-refine">
    <h2 className="flobites-refine-title">
      Refining what users <div className="flobites-refine-title-accent">actually felt.</div>
    </h2>
    <p className="flobites-refine-subtitle">
      Every refinement was shaped by real feedback, until the experience felt clear and easy to understand
    </p>

    <div className="flobites-refine-stats">
      <div className="flobites-refine-stat">
        <span className="flobites-refine-stat-number"> 109%</span>
        <span className="flobites-refine-stat-label">increase in online</span>
        <span className="flobites-refine-stat-sub">searchability score (44 - 92)</span>
      </div>
      <div className="flobites-refine-stat">
        <span className="flobites-refine-stat-number">8<span className="flobites-refine-stat-number-sub">out of</span>10</span>
        <span className="flobites-refine-stat-label">users understand what FloBites is in the</span>
        <span className="flobites-refine-stat-sub">first 10 seconds of visiting the website</span>
      </div>
      <div className="flobites-refine-stat">
        <span className="flobites-refine-stat-number">97<span className="flobites-refine-stat-number-sub">/100</span></span>
        <span className="flobites-refine-stat-label">load speed score</span>
        <span className="flobites-refine-stat-sub"> (up from 66)</span>
      </div>
    </div>

    <div className="flobites-refine-quote">
      <span className="flobites-refine-quote-mark flobites-refine-quote-mark--left">&ldquo;</span>
      <p className="flobites-refine-quote-text">
        PyroSynergy helped us to translate the feeling behind FloBites
        into a digital experience that finally felt aligned with the
        product.
      </p>
      
      <span className="flobites-refine-quote-mark flobites-refine-quote-mark--right">&rdquo;</span>
      <p className="flobites-refine-quote-author">– Santosh Parachuri<br></br>Co-founder, The Hormone Essentials
      </p>
    </div>
  </div>
);

export default Refine;
