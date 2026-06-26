import React from 'react';
import './Refine.css';

const Refine = () => (
  <div className="flobites-refine">
    <h2 className="flobites-refine-title">
      Refining what users <span className="flobites-refine-title-accent">actually felt.</span>
    </h2>
    <p className="flobites-refine-subtitle">
      Every small refinement helped make the experience <br />
      feel more clear and connected.
    </p>

    <div className="flobites-refine-stats">
      <div className="flobites-refine-stat">
        <span className="flobites-refine-stat-number">3</span>
        <span className="flobites-refine-stat-label">Clear product</span>
        <span className="flobites-refine-stat-sub">recognisable.</span>
      </div>
      <div className="flobites-refine-stat">
        <span className="flobites-refine-stat-number">3%</span>
        <span className="flobites-refine-stat-label">Stronger emotional</span>
        <span className="flobites-refine-stat-sub">connection.</span>
      </div>
      <div className="flobites-refine-stat">
        <span className="flobites-refine-stat-number">3</span>
        <span className="flobites-refine-stat-label">More ingredient</span>
        <span className="flobites-refine-stat-sub">exploration.</span>
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
    </div>
  </div>
);

export default Refine;
