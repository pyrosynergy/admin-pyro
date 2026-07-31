import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets scroll position to the top of the page on every route change, so
 * navigating to a new page always starts at its hero section instead of
 * carrying over the previous page's scrollY (React Router doesn't do this
 * automatically for client-side navigation the way full page loads do).
 *
 * Skips the reset whenever the URL has a hash (e.g. `/#pyrostack`) so
 * in-page anchor links and the app's own smooth-scroll-to-section
 * navigation (Header nav links, "View More" CTAs, etc.) are untouched.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  // Browsers restore the previous scroll position on back/forward
  // navigation by default, which fights with the reset below. Hand that
  // control to us instead.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (hash) return;

    // The site sets a global `scroll-behavior: smooth` (App.css), which
    // would otherwise turn this reset into an animated scroll — easily
    // interrupted or thrown off by images loading in further down the
    // new page. Request an instant jump explicitly so it always lands
    // at 0 regardless of that global setting.
    const resetScroll = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    resetScroll();

    // The new route's fonts/images can still be settling their layout one
    // frame after this effect commits (e.g. a web-font swap resizing the
    // fixed header), nudging scrollY by a few pixels. A follow-up reset
    // on the next frame catches that without any visible delay.
    const raf = requestAnimationFrame(resetScroll);
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
