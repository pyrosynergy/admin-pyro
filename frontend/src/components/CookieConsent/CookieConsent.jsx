import { useEffect } from 'react';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import './CookieConsent.css';
import { initCookieConsent } from '../../lib/cookieConsent.js';

/**
 * Mounts vanilla-cookieconsent once. The library manages its own DOM node
 * (#cc-main, appended to <body>) independently of React, so this renders
 * nothing itself — same "renders null" shape as ScrollToTop.
 */
const CookieConsent = () => {
  useEffect(() => {
    initCookieConsent();
  }, []);

  return null;
};

export default CookieConsent;
