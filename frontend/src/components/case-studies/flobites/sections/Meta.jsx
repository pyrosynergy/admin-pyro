import React from 'react';
import './Meta.css';

const Meta = () => (
  <div className="flobites-meta">
    <div className="flobites-meta-left">
      <div className="flobites-meta-item">
        <span className="flobites-meta-label">Brand</span>
        <span className="flobites-meta-value">FloBites (by The Hormone Essentials)</span>
      </div>
      <div className="flobites-meta-item">
        <span className="flobites-meta-label">Industry</span>
        <span className="flobites-meta-value">Women’s Health & Wellness</span>
      </div>
    </div>

    <div className="flobites-meta-right">
      <h3 className="flobites-meta-heading">Reviving FloBites</h3>
      <p className="flobites-meta-description">
        FloBites was created to help women feel supported during their period week, hormonal changes, and through health conditions like PCOS. Made with healthy ingredients like super seeds, the snack bars were designed to bring together comfort and nourishment for everyday wellness.

      </p>
    </div>
  </div>
);

export default Meta;
