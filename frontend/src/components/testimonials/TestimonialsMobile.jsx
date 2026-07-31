import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaQuoteLeft, FaUser } from 'react-icons/fa';
import './TestimonialsMobile.css';

import { testimonials, stripQuoteMarks } from './testimonialsData.js';

/*
 * The carousel is built from the same testimonials the desktop bento grid
 * renders — one shared list, so a founder, quote or logo only ever has to be
 * edited in testimonialsData.js.
 *
 * Featured entries (desktop variants 'A' and 'B') each get their own slide;
 * the compact ones (variant 'C') are paired two-to-a-slide, which is what the
 * stacked review layout was built for. The two kinds are then interleaved so
 * the carousel alternates big, small, big, small — see interleaveBySize.
 */
const REVIEWS_PER_SLIDE = 2;

/*
 * Entries that share a slide here no matter what the desktop grid does with
 * them — each inner array is one reviews slide, listed top card first, and
 * every entry named in one renders as a compact review card even if `variant`
 * would otherwise feature it. JRJP is a desktop 'A', but its quote credits the
 * brand rather than a person and carries no role line, so it reads fine
 * compact. `variant` stays untouched, so the desktop bento grid is unaffected.
 *
 * Anything not named here still falls back to the generic rule below: compact
 * ('C') entries pair up two-to-a-slide in data order.
 */
const PAIRED_SLIDES = [
  ['jrjp', 'delicacy'],
  ['tog', 'elytrix'],
];

const buildMobileSlides = (items) => {
  const slides = [];
  let pending = [];

  const pushReviewSlide = (reviews) => {
    slides.push({
      type: 'reviews',
      id: `reviews-${reviews.map((r) => r.id).join('-')}`,
      reviews: reviews.map((item, i) => ({
        ...item,
        // Alternate which side the media sits on down the stack.
        layout: i % 2 === 0 ? 'text-left' : 'image-left',
      })),
    });
  };

  const flushReviews = () => {
    if (!pending.length) return;
    pushReviewSlide(pending);
    pending = [];
  };

  const byId = new Map(items.map((item) => [item.id, item]));
  const paired = new Set();

  items.forEach((item) => {
    const pair = PAIRED_SLIDES.find((ids) => ids.includes(item.id));
    if (pair) {
      // The slide lands where the pair's first member sits in the data, which
      // is what fixes its position among the other reviews slides.
      if (paired.has(item.id)) return;
      pair.forEach((id) => paired.add(id));
      pushReviewSlide(pair.map((id) => byId.get(id)).filter(Boolean));
      return;
    }

    if (item.variant === 'C') {
      pending.push(item);
      if (pending.length === REVIEWS_PER_SLIDE) flushReviews();
      return;
    }
    slides.push({ ...item, type: 'case-study', id: `${item.id}-cs` });
  });

  flushReviews();
  return slides;
};

/*
 * Alternates the two slide sizes — featured case-study slide, then a paired
 * reviews slide, and so on — so the carousel never shows two big or two small
 * slides back to back. Relative order within each kind still follows the data
 * order; this only decides how the two kinds are dealt out. If the kinds
 * aren't evenly matched, whichever runs out first simply stops contributing
 * and the remainder trails in order.
 */
const interleaveBySize = (slides) => {
  const featured = slides.filter((s) => s.type === 'case-study');
  const reviews = slides.filter((s) => s.type === 'reviews');
  const ordered = [];

  while (featured.length || reviews.length) {
    if (featured.length) ordered.push(featured.shift());
    if (reviews.length) ordered.push(reviews.shift());
  }

  return ordered;
};

const mobileSlides = interleaveBySize(buildMobileSlides(testimonials));

/* How long a slide rests before autoplay moves to the next one. The paired
   review slides carry two quotes, so this is the read-time budget, not just a
   pacing knob. Independent of the swap animation timings below. */
const AUTOPLAY_MS = 8000;

/*
 * The swap runs in two halves — the outgoing slide animates away, then the
 * incoming one animates in — and these sequence them. Both must stay equal to
 * the animation durations on .tm-phase-out-* and .tm-anim-from-* in
 * TestimonialsMobile.css: too short and the animation is cut off mid-way, too
 * long and the carousel sits still before the next half starts.
 */
const PHASE_OUT_MS = 160;
const PHASE_IN_MS = 220;

/* A founder portrait wins over the brand logo when there is one — same rule
   the desktop footer follows. */
const Avatar = ({ item, small = false }) => (
  <div
    className={`tm-avatar${small ? ' tm-avatar--sm' : ''}${item.founderPhoto ? ' tm-avatar--photo' : item.logo ? ' tm-avatar--logo' : ''
      } tm-avatar--${item.id}`}
  >
    {item.founderPhoto ? (
      <img loading="lazy" decoding="async" src={item.founderPhoto} alt={item.name} />
    ) : item.logo ? (
      <img loading="lazy" decoding="async" src={item.logo} alt={item.logoAlt} />
    ) : item.initials ? (
      <span className="tm-avatar-initials">{item.initials}</span>
    ) : (
      <FaUser aria-hidden="true" />
    )}
  </div>
);

const CaseStudyCard = ({ data, onCtaClick }) => (
  <article className="tm-cs-card">
    {/* The brand's own mark stands in for the name it used to spell out. The
        text badge stays as the fallback for any entry without a logo. */}
    <div className="tm-cs-top">
      {data.logo ? (
        <img
          loading="lazy"
          decoding="async"
          className="tm-cs-logo"
          src={data.logo}
          alt={data.logoAlt || data.company}
        />
      ) : (
        <span className="tm-cs-badge">{data.company}</span>
      )}
    </div>

    {data.metricLabel && (
      <div className="tm-cs-metrics">
        <div className="tm-cs-metric">
          {data.metric && <span className="tm-cs-metric-value">{data.metric}</span>}
          <span className="tm-cs-metric-label">{data.metricLabel}</span>
        </div>
      </div>
    )}

    <blockquote className="tm-cs-quote">
      <FaQuoteLeft className="tm-quote-mark" aria-hidden="true" />
      <p>{stripQuoteMarks(data.quote || data.description)}</p>
    </blockquote>

    {/* Entries that credit the brand rather than a person (desktop variant
        'B') carry no name — show the logo on its own instead. */}
    <div className={`tm-cs-person${data.name ? '' : ' tm-cs-person--logo-only'}`}>
      <Avatar item={data} />
      {data.name && (
        <div className="tm-person-copy">
          <span className="tm-person-name">{data.name}</span>
          {data.role && <span className="tm-person-role">{data.role}</span>}
        </div>
      )}
    </div>

    {data.caseStudyPath && (
      <button type="button" className="tm-cs-cta" onClick={onCtaClick}>
        View Case Study
        <FaArrowRight className="tm-cs-cta-arrow" aria-hidden="true" />
      </button>
    )}
  </article>
);

const ReviewCard = ({ data }) => {
  // On the top card of a slide the logo sits in the left column, so the credit
  // drops to its own full-width row along the card's bottom edge — below the
  // logo, left-aligned, with the whole card width to wrap in. The bottom card
  // has its logo on the right, where that would read as belonging to nothing,
  // so it keeps the credit beneath the quote.
  const creditBelow = data.layout === 'text-left';

  const credit = (
    <div className="tm-review-person">
      <div className="tm-person-copy">
        <span className="tm-person-name">{data.name}</span>
        {/* Brand-credited entries (JRJP) carry no role — same guard the
            case-study card's footer uses. */}
        {data.role && <span className="tm-person-role">{data.role}</span>}
      </div>
    </div>
  );

  return (
    <article
      className={`tm-review-card tm-review--${data.layout}${
        creditBelow ? ' tm-review--credit-below' : ''
      }`}
    >
      <div className="tm-review-media">
        <Avatar item={data} />
      </div>

      <div className="tm-review-body">
        <blockquote className="tm-review-quote">
          <p>&quot;{stripQuoteMarks(data.quote)}&quot;</p>
        </blockquote>

        {!creditBelow && credit}
      </div>

      {creditBelow && credit}
    </article>
  );
};

const ReviewsSlide = ({ data }) => (
  <div className="tm-reviews-slide">
    {data.reviews.map((review) => (
      <ReviewCard data={review} key={review.id} />
    ))}
  </div>
);

const TestimonialsMobile = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState('idle'); // 'idle' | 'out' | 'in'
  const [animDir, setAnimDir] = useState('right');
  const animatingRef = useRef(false);
  const activeIndexRef = useRef(0);
  const intervalRef = useRef(null);
  const touchStartX = useRef(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const advance = useCallback((nextIndex, dir) => {
    if (animatingRef.current) return;
    const total = mobileSlides.length;
    const wrapped = ((nextIndex % total) + total) % total;
    if (wrapped === activeIndexRef.current) return;

    animatingRef.current = true;
    setAnimDir(dir);
    setPhase('out');

    setTimeout(() => {
      setActiveIndex(wrapped);
      activeIndexRef.current = wrapped;
      setPhase('in');

      setTimeout(() => {
        setPhase('idle');
        animatingRef.current = false;
      }, PHASE_IN_MS);
    }, PHASE_OUT_MS);
  }, []);

  const startAutoplay = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      advance(activeIndexRef.current + 1, 'right');
    }, AUTOPLAY_MS);
  }, [advance]);

  useEffect(() => {
    startAutoplay();
    return () => clearInterval(intervalRef.current);
  }, [startAutoplay]);

  // Any manual navigation (swipe or dot) restarts the autoplay countdown,
  // so it never fires right on top of a swipe the user just made.
  const goTo = useCallback((nextIndex, dir) => {
    advance(nextIndex, dir);
    startAutoplay();
  }, [advance, startAutoplay]);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 40) {
      touchStartX.current = null;
      return;
    }
    if (diff > 0) goTo(activeIndexRef.current + 1, 'right'); // swiped left → next
    else goTo(activeIndexRef.current - 1, 'left'); // swiped right → prev
    touchStartX.current = null;
  }, [goTo]);

  return (
    <div
      className="tm-carousel"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`tm-slide-frame ${
          phase === 'out' ? (animDir === 'left' ? 'tm-phase-out-right' : 'tm-phase-out-left') : ''
        } ${
          phase === 'in' ? (animDir === 'left' ? 'tm-anim-from-left' : 'tm-anim-from-right') : ''
        }`}
      >
        {/*
          Every slide stays mounted and they all share one grid cell, so the
          frame is always as tall as the tallest slide and its height never
          changes as you move between them. Only the active one is visible —
          `visibility: hidden` also keeps the others out of the tab order and
          the accessibility tree.
        */}
        {mobileSlides.map((s, i) => (
          <div
            key={s.id}
            className={`tm-slide${i === activeIndex ? ' tm-slide-active' : ''}`}
            aria-hidden={i !== activeIndex}
          >
            {s.type === 'case-study' ? (
              <CaseStudyCard
                data={s}
                onCtaClick={() => s.caseStudyPath && navigate(s.caseStudyPath)}
              />
            ) : (
              <ReviewsSlide data={s} />
            )}
          </div>
        ))}
      </div>

      <div className="tm-nav">
        <button
          type="button"
          className="tm-nav-arrow"
          onClick={() => goTo(activeIndex - 1, 'left')}
          aria-label="Previous slide"
        >
          <FaChevronLeft aria-hidden="true" />
        </button>

        <div className="tm-dots" role="tablist" aria-label="Testimonial slides">
          {mobileSlides.map((_, i) => (
            <button
              key={mobileSlides[i].id}
              type="button"
              className={`tm-dot${i === activeIndex ? ' tm-dot-active' : ''}`}
              onClick={() => goTo(i, i > activeIndex ? 'right' : 'left')}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          className="tm-nav-arrow"
          onClick={() => goTo(activeIndex + 1, 'right')}
          aria-label="Next slide"
        >
          <FaChevronRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialsMobile;
