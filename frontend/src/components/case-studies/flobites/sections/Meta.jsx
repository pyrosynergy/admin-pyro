import React from 'react';
import './Meta.css';

const Meta = () => (
  <div className="flobites-meta">
    <div className="flobites-meta-left">
      <div className="flobites-meta-item">
        <span className="flobites-meta-label">Brand Name</span>
        <span className="flobites-meta-value">TheHormoneEssentials</span>
      </div>
      <div className="flobites-meta-item">
        <span className="flobites-meta-label">Industry</span>
        <span className="flobites-meta-value">Food</span>
      </div>
    </div>

    <div className="flobites-meta-right">
      <h3 className="flobites-meta-heading">Meet FloBites</h3>
      <p className="flobites-meta-description">
        FloBites, under the aegis of THE, was created to help women feel a
        little more supported during their periods, PCOS, hormonal changes
        and other everyday health struggles. Made with healthy ingredients
        like super seeds, the snack bars were designed to bring together
        the comfort, nourishment and better everyday wellness.
      </p>
    </div>
  </div>
);

export default Meta;
