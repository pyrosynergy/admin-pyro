import React, { useEffect, useState, useCallback } from 'react';
import './BackToTop.css';

// Matches the "reasonable amount" the button should wait for before offering
// to jump back — roughly one mobile viewport of scrolling.
const SHOW_AFTER_PX = 400;

/**
 * Mobile-only floating "back to top" button. CSS keeps it out of the desktop
 * layout entirely (see the max-width: 768px gate in BackToTop.css); this
 * component only owns the scroll-triggered visibility and the click handler.
 */
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      setIsVisible(window.scrollY > SHOW_AFTER_PX);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = useCallback(() => {
    // Defers to a live Lenis instance if one is ever wired up and exposed on
    // window (the app's own Lenis setup in App.jsx is currently inactive) —
    // otherwise falls back to the native smooth scroll the rest of the site
    // already relies on (App.css sets scroll-behavior: smooth globally).
    const lenis = window.lenis;
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <button
      type="button"
      className={`back-to-top-btn${isVisible ? ' is-visible' : ''}`}
      onClick={handleClick}
      aria-label="Back to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
};

export default BackToTop;
