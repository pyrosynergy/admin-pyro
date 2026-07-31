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
          viewBox="0 0 460 640"
          className="viali-funnel-svg"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Sales funnel diagram showing top, mid, and bottom of funnel stages"
        >
          {/* Top Funnel */}
          <polygon
            points="10,15 450,15 390,145 70,145"
            className="viali-funnel-shape viali-funnel-shape--pink"
          />
          <text x="230" y="85" className="viali-funnel-label">
            Top of Funnel
          </text>

          {/* Mid Funnel */}
          <polygon
            points="70,195 390,195 340,315 120,315"
            className="viali-funnel-shape viali-funnel-shape--blue"
          />
          <text x="230" y="255" className="viali-funnel-label">
            Mid Funnel
          </text>

          {/* Bottom Funnel */}
          <polygon
            points="135,365 325,365 290,485 170,485"
            className="viali-funnel-shape viali-funnel-shape--pink"
          />
          <text className="viali-funnel-label">
            <tspan x="230" y="410">Bottom of</tspan>
            <tspan x="230" y="445">Funnel</tspan>
          </text>

          {/* Tip */}
          <polygon
            points="195,530 255,530 255,590 195,620 195,530"
            className="viali-funnel-shape viali-funnel-shape--blue"
          />
          </svg>
      </div>

      <div className="viali-funnel-text">
        <div className="viali-funnel-point viali-funnel-point--top">
          <h3 className="viali-funnel-point-heading">Top of Funnel</h3>
          <span className="viali-funnel-connector viali-funnel-connector--pink" aria-hidden="true"></span>
          <p>
            The product’s visibility lived entirely on the founder’s personal channel, with no dedicated channel strategy or way to convert followers into customers.
          </p>
        </div>

        <div className="viali-funnel-point viali-funnel-point--mid">
          <h3 className="viali-funnel-point-heading">Mid Funnel</h3>
          <span className="viali-funnel-connector viali-funnel-connector--blue" aria-hidden="true"></span>
          <p>
            With no site to actually showcase the product range, what existed was a barebones landing page that didn’t reflect the brand or support real product discovery.
          </p>
        </div>

        <div className="viali-funnel-point viali-funnel-point--bottom">
          <h3 className="viali-funnel-point-heading">Bottom of Funnel</h3>
          <span className="viali-funnel-connector viali-funnel-connector--pink" aria-hidden="true"></span>
          <p>
            Underneath all of it, the founder was running inventory, orders, and fulfillment entirely by hand.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Funnel;
