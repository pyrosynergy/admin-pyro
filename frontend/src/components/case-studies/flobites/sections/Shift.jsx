import React from 'react';
import './Shift.css';
import barsPolaroid from '../../../../assets/flobites/bars-polaroid.png';
import seedsBowl from '../../../../assets/flobites/seeds-bowl.png';
import curvyDots from '../../../../assets/flobites/curvy-dots.svg';
import womenPolaroid from '../../../../assets/flobites/women-polaroid.png';

const Shift = () => (
  <div className="flobites-shift">
    <h2 className="flobites-shift-title">
      The shift <span className="flobites-shift-title-accent">FloBites</span> actually needed:
    </h2>

    <div className="flobites-shift-row">
      <div className="flobites-shift-text">
        <span className="flobites-shift-number">01</span>
        <h3 className="flobites-shift-heading">
          Building stronger <br />
          <span className="flobites-shift-heading-accent">recognition.</span>
        </h3>
        <p className="flobites-shift-body">
          The product needed clear presence and its own personality. We created a playful yet memorable user experience while keeping the connection with the parent brand intact.

        </p>
      </div>
      <div className="flobites-shift-image">
        <img src={barsPolaroid} alt="Two FloBites bars styled as a polaroid photo" />
      </div>
    </div>

    <div className="flobites-shift-row">
      <div className="flobites-shift-text">
        <h3 className="flobites-shift-heading">
          Leading with <br />
          <span className="flobites-shift-heading-accent">Value.</span>
        </h3>
        <p className="flobites-shift-body">
          Description: We identified and built a narrative that included several overlooked product strengths, such as the Super Seeds formula and the use of Myo-Inositol, helping buyers see value early on.

        </p>
      </div>
      <div className="flobites-shift-image flobites-shift-image--bowl">
        <img src={seedsBowl} alt="Bowl of FloBites super seeds ingredients" />
        <img src={curvyDots} alt="" className="flobites-shift-curvy-dots" />
      </div>
      <span className="flobites-shift-number flobites-shift-number--standalone">02</span>
    </div>

    <div className="flobites-shift-row">
      <div className="flobites-shift-text">
        <span className="flobites-shift-number">03</span>
        <h3 className="flobites-shift-heading">
          Centering <br />
          <span className="flobites-shift-heading-accent">real stories.</span>
        </h3>
        <p className="flobites-shift-body">
          Real reviews from first-time buyers, along with active feedback cycles from potential customers, helped shape FloBites’ digital experience.

        </p>
      </div>
      <div className="flobites-shift-image">
        <img src={womenPolaroid} alt="Smiling woman polaroid with a Women on Flo note card" />
      </div>
    </div>
  </div>
);

export default Shift;
