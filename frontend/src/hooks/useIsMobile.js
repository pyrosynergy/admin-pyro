import { useEffect, useState } from 'react';

/**
 * Tracks whether the viewport is at or below `breakpoint` px.
 *
 * Uses matchMedia rather than a resize listener so the callback fires only when
 * the breakpoint is actually crossed, instead of on every resize frame.
 */
export default function useIsMobile(breakpoint = 768) {
  const query = `(max-width: ${breakpoint}px)`;

  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setIsMobile(e.matches);

    setIsMobile(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return isMobile;
}
