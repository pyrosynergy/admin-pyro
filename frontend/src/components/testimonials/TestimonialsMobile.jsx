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
 * stacked review layout was built for. Slide order follows the data order.
 */
const REVIEWS_PER_SLIDE = 2;

const buildMobileSlides = (items) => {
  const slides = [];
  let pending = [];

  const flushReviews = () => {
    if (!pending.length) return;
    slides.push({
      type: 'reviews',
      id: `reviews-${pending.map((r) => r.id).join('-')}`,
      reviews: pending.map((item, i) => ({
        ...item,
        // Alternate which side the media sits on down the stack.
        layout: i % 2 === 0 ? 'text-left' : 'image-left',
      })),
    });
    pending = [];
  };

  items.forEach((item) => {
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

const mobileSlides = buildMobileSlides(testimonials);

const AUTOPLAY_MS = 5000;

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
    <div className="tm-cs-top">
      <span className="tm-cs-badge">{data.company}</span>
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

const ReviewCard = ({ data }) => (
  <article className={`tm-review-card tm-review--${data.layout}`}>
    <div className="tm-review-media">
      <Avatar item={data} />
    </div>

    <div className="tm-review-body">
      <blockquote className="tm-review-quote">
        <p>&quot;{stripQuoteMarks(data.quote)}&quot;</p>
      </blockquote>

      <div className="tm-review-person">
        <div className="tm-person-copy">
          <span className="tm-person-name">{data.name}</span>
          <span className="tm-person-role">{data.role}</span>
        </div>
      </div>
    </div>
  </article>
);

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
      }, 220);
    }, 160);
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
