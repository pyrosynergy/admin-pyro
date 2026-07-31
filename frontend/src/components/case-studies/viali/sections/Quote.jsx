import React from 'react';
import './Quote.css';
import founderPhoto from '../../../../assets/viali/founder-rosemay.png';

const Quote = () => (
  <div className="viali-quote">
    <div className="viali-quote-card">
      <div className="viali-quote-top">
        <span className="viali-quote-mark viali-quote-mark--open" aria-hidden="true">&#8220;</span>
        <p className="viali-quote-text">
          This was literally a blessing in disguise! Finally an agency who I can rely on with my business now.
        </p>
        <span className="viali-quote-mark viali-quote-mark--close" aria-hidden="true">&#8221;</span>
      </div>

      <div className="viali-quote-person">
        <img
          src={founderPhoto}
          alt="Rosemay J. Martelly, Founder & CEO of Viali Hair Care"
          className="viali-quote-avatar"
        />
        <div className="viali-quote-person-info">
          <span className="viali-quote-name">Rosemay J. Martelly</span>
          <span className="viali-quote-role">Founder &amp; CEO, Viali Hair Care</span>
        </div>
      </div>
    </div>
  </div>
);

export default Quote;
