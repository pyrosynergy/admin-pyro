import React from 'react';
import './Cta.css';
import { CALENDAR_URL, openCalendarPopup } from '../../../../lib/calendar.js';

const Cta = () => (
  <div className="flobites-cta">
    <p className="flobites-cta-text">
      <span className="flobites-cta-text-accent">Want this revamp for your own brand?</span>
    </p>
    {/* Real href so middle-click and open-in-new-tab work; the handler takes
        over for a plain click so it opens the same way every other booking CTA
        on the site does. This used to point at #contact, an anchor that exists
        on no page. */}
    <a
      href={CALENDAR_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flobites-cta-btn"
      onClick={(e) => {
        e.preventDefault();
        openCalendarPopup();
      }}
    >
      <svg viewBox="0 0 24 24" className="call-icon" fill="currentColor" aria-hidden="true">
        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" />
      </svg>
      Book a Call
    </a>
  </div>
);

export default Cta;
