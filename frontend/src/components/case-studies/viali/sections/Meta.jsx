import React from 'react';
import './Meta.css';

const Meta = () => (
  <div className="viali-meta">
    <div className="viali-meta-left">
      <div className="viali-meta-item">
        <span className="viali-meta-label">Brand Name</span>
        <span className="viali-meta-value">Viali Hair Care</span>
      </div>
      <div className="viali-meta-item">
        <span className="viali-meta-label">Industry</span>
        <span className="viali-meta-value">Hair Care & Beauty</span>
      </div>
    </div>

    <div className="viali-meta-right">
      <h3 className="viali-meta-heading">Meet Viali</h3>
      <p className="viali-meta-description">
        Viali Hair Care was built around the Moelle serum, a dry-hair and strength-focused formulation the founder developed herself. The brand also carries supporting hair-care tools. Founded in 2017, VHC ran largely as a personal-network business for a long time, with no functional website, sales channel, or operational system behind it.
      </p>
    </div>
  </div>
);

export default Meta;
