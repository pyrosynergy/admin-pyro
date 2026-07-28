import React from 'react';
import './Funnel.css';

const Funnel = () => (
  <div className="viali-funnel">
    <h2 className="viali-funnel-title">
      The missing <span className="viali-funnel-title-accent">backbone</span> in the business.
    </h2>

    <div className="viali-funnel-row">
      <div className="viali-funnel-diagram">
        <svg
          viewBox="0 0 340 440"
          className="viali-funnel-svg"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Sales funnel diagram showing top, mid, and bottom of funnel stages"
        >
         <polygon
            points="0,10 340,10 260,112 80,112"
            className="viali-funnel-shape viali-funnel-shape--pink"
          />
          <text x="170" y="68" className="viali-funnel-label">Top of Funnel</text>

          <polygon
            points="50,142 290,142 235,222 105,222"
            className="viali-funnel-shape viali-funnel-shape--blue"
          />
          <text x="170" y="188" className="viali-funnel-label">Mid Funnel</text>

          <polygon
            points="100,252 240,252 212,342 128,342"
            className="viali-funnel-shape viali-funnel-shape--pink"
          />
          <text className="viali-funnel-label">
            <tspan x="170" y="278">Bottom</tspan>
            <tspan x="170" y="300">of</tspan>
            <tspan x="170" y="322">Funnel</tspan>
          </text>

          <polygon
            points="140,372 200,372 200,426 165,426 140,406"
            className="viali-funnel-shape viali-funnel-shape--blue"
          />
        </svg>
      </div>

      <div className="viali-funnel-text">
        <p>
          The product’s visibility lived entirely on the founder’s personal channel, with no dedicated channel strategy or way to convert followers into customers.
        </p>
        <p>
          With no site to actually showcase the product range, what existed was a barebones landing page that didn’t reflect the brand or support real product discovery.
        </p>
        <p>
          Underneath all of it, the founder was running inventory, orders, and fulfillment entirely by hand.
        </p>
      </div>
    </div>
  </div>
);

export default Funnel;
