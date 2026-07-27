import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './banner.css';

/*
 * 8 rows of service pills, each an infinite marquee. Odd rows (1,3,5,7,
 * darker) play left-to-right; even rows (2,4,6,8, lighter) play
 * right-to-left.
 *
 * The old version rendered exactly 2 copies of a row's labels and animated
 * translateX(0) -> translateX(-50%). That's only seamless if one copy is
 * already at least as wide as the viewport — for shorter rows on a wide
 * screen, 2 copies run out of content mid-scroll and expose bare
 * background. Instead, each row measures the real rendered width of one
 * label sequence and renders exactly as many copies as are needed to keep
 * the track wider than its own container at all times, then animates by
 * that exact measured width (not a guessed percentage). That keeps the
 * loop seamless — and correct after a resize or after labels are added or
 * removed — regardless of viewport width or row content length.
 */
const pillRows = [
  ['UI/UX design', 'brand strategy', 'app development', 'GTM strategy', 'brand positioning mapping'],
  ['positioning & messaging', 'business operations setup', 'copywriting', 'performance analytics'],
  ['social media management', 'product design', 'competitive research', 'marketing', 'product-market fit'],
  ['visual identity systems', 'in-depth startup audits', 'partnerships management', 'technical support'],
  ['hiring support', 'research & development', 'content strategy', 'founder advisory', 'website development'],
  ['market study', 'AI automations', 'landing page development', 'systems building', 'QA & testing'],
  ['brand identity & guidelines design', 'technical consulting', 'customer acquisition strategy', 'business modeling'],
  ['social media strategy', 'email marketing', 'investor pitch decks', 'onboarding flows', 'community building'],
];

const MIN_SEQUENCE_COPIES = 3;

const PillRow = ({ labels, rowNumber, isMobile }) => {
  const isOdd = rowNumber % 2 === 1;
  // Same pixel speed reads as much faster on a narrow phone screen than on
  // desktop, since one pill's width is a far bigger fraction of the
  // viewport — slow the animation down on mobile to keep the felt pace
  // consistent rather than frantic.
  const duration = (26 + rowNumber * 3) * (isMobile ? 1.6 : 1);

  const rowRef = useRef(null);
  const firstSeqRef = useRef(null);
  const secondSeqRef = useRef(null);
  const [repeatCount, setRepeatCount] = useState(MIN_SEQUENCE_COPIES);
  const [step, setStep] = useState(0);

  useLayoutEffect(() => {
    const rowEl = rowRef.current;
    if (!rowEl) return undefined;

    const measure = () => {
      const first = firstSeqRef.current;
      const second = secondSeqRef.current;
      if (!first || !second) return;

      // Distance between two adjacent sequence copies — this is the exact
      // width the track must shift to make the pattern repeat seamlessly,
      // including the gap between sequences. Unaffected by the track's own
      // in-progress transform since both nodes share the same ancestor.
      const measuredStep = second.getBoundingClientRect().left - first.getBoundingClientRect().left;
      if (measuredStep <= 0) return;

      const containerWidth = rowEl.getBoundingClientRect().width;
      // Enough copies to keep the track wider than the container through the
      // full width of one animated step, plus one spare for safety margin.
      const needed = Math.max(MIN_SEQUENCE_COPIES, Math.ceil(containerWidth / measuredStep) + 2);

      setStep(measuredStep);
      setRepeatCount((prev) => (prev === needed ? prev : needed));
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(rowEl);

    return () => resizeObserver.disconnect();
  }, [labels]);

  return (
    <div className={`banner-pill-row ${isOdd ? 'banner-pill-row--dark' : 'banner-pill-row--light'}`} ref={rowRef}>
      <div
        className="banner-pill-track"
        style={{
          '--pill-step': step ? `${step}px` : '0px',
          animationDuration: `${duration}s`,
          animationDirection: isOdd ? 'reverse' : 'normal',
        }}
      >
        {Array.from({ length: repeatCount }).map((_, seqIdx) => (
          <div
            className="banner-pill-seq"
            key={seqIdx}
            ref={seqIdx === 0 ? firstSeqRef : seqIdx === 1 ? secondSeqRef : undefined}
          >
            {labels.map((label, idx) => (
              <span className="banner-pill" key={idx}>
                {label}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const Banner = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <section className="banner-section">
      <div className="banner-pills-bg" aria-hidden="true">
        {pillRows.map((labels, i) => (
          <PillRow key={i} labels={labels} rowNumber={i + 1} isMobile={isMobile} />
        ))}
      </div>

      <div className="banner-card">
        <span className="banner-eyebrow">an individual services provider</span>
        <h2 className="banner-heading">
          your growth partner for the <em>whole</em> picture.
        </h2>
        <p className="banner-desc">
          agencies usually sell you a service or two, but growth doesn&apos;t happen that way. we work on it as a complete &quot;solution&quot;; a package of the right moves made in the right order.
        </p>
      </div>
    </section>
  );
};

export default Banner;
