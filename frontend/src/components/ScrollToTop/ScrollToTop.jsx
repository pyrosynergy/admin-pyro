import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// How long we keep trying to reach a restored position. Coming back to a page
// re-renders it from scratch, so the document is often still short for a few
// frames while lazy chunks mount and images below the fold get their height —
// a single scrollTo would clamp to the bottom of that half-built page.
const RESTORE_TIMEOUT_MS = 1000;

/**
 * Owns scroll position across client-side navigation, which React Router does
 * not do for us:
 *
 *  - PUSH / REPLACE (clicking through to a new page) starts at the top, so a
 *    new page never opens halfway down carrying the last page's scrollY.
 *  - POP (the browser's back/forward buttons) returns to the exact position
 *    that history entry was left at, the way a normal multi-page site behaves.
 *    Without this, backing out of a page dropped you at the hero section
 *    instead of the section whose button you clicked.
 *
 * Positions are keyed by `location.key`, which React Router assigns per history
 * entry — so two visits to the same path remember their own positions. They
 * live in memory only: a reload starts a fresh set of keys anyway.
 *
 * A URL with a hash is left alone entirely, so in-page anchors and the app's
 * own smooth-scroll-to-section navigation (Header nav links, "View More" CTAs)
 * still land where they aim.
 */
const ScrollToTop = () => {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();

  const positions = useRef(new Map());
  const currentKey = useRef(key);

  // Browsers restore scroll on back/forward themselves, but they do it against
  // the *previous* page's DOM before React has swapped the route in, so the
  // result is wrong as often as it's right. Take manual control and do it from
  // the effect below instead.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Record where each history entry is left. Throttled to one write per frame
  // so a fast scroll doesn't queue up work on the scroll event.
  useEffect(() => {
    let ticking = false;

    const record = () => {
      ticking = false;
      positions.current.set(currentKey.current, window.scrollY);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(record);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    currentKey.current = key;

    if (hash) return;

    const saved = positions.current.get(key);
    const target = navigationType === 'POP' && saved ? saved : 0;

    // The site sets a global `scroll-behavior: smooth` (App.css), which would
    // otherwise animate these jumps — easily interrupted, and visibly wrong on
    // a back navigation. Ask for an instant jump regardless of that setting.
    if (target === 0) {
      const resetScroll = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      resetScroll();

      // Fonts and images on the new route can still be settling their layout a
      // frame after this effect commits (a web-font swap resizing the fixed
      // header, say), nudging scrollY by a few pixels. One follow-up reset
      // catches that with no visible delay.
      const raf = requestAnimationFrame(resetScroll);
      return () => cancelAnimationFrame(raf);
    }

    let raf;
    const deadline = performance.now() + RESTORE_TIMEOUT_MS;
    let settled = false;

    const attempt = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        0
      );
      window.scrollTo({ top: Math.min(target, maxScroll), left: 0, behavior: 'instant' });

      // Landed (within a pixel of rounding), or the page will never grow tall
      // enough because it genuinely is shorter than it was. Either way, stop.
      if (Math.abs(window.scrollY - target) <= 1 || performance.now() > deadline) {
        settled = true;
        // Keep the entry accurate if we had to settle short of the target, so
        // a second back navigation doesn't chase a position that can't exist.
        positions.current.set(key, window.scrollY);
        return;
      }

      raf = requestAnimationFrame(attempt);
    };

    // If the user starts scrolling while we're still chasing the target, they
    // win — nothing is more irritating than the page yanking itself back.
    const abort = () => {
      if (settled) return;
      settled = true;
      cancelAnimationFrame(raf);
    };

    window.addEventListener('wheel', abort, { passive: true, once: true });
    window.addEventListener('touchstart', abort, { passive: true, once: true });
    window.addEventListener('keydown', abort, { once: true });

    attempt();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('wheel', abort);
      window.removeEventListener('touchstart', abort);
      window.removeEventListener('keydown', abort);
    };
  }, [pathname, hash, key, navigationType]);

  return null;
};

export default ScrollToTop;
