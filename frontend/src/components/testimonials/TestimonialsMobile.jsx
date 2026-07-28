import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaImage, FaQuoteLeft, FaUser } from 'react-icons/fa';
import './TestimonialsMobile.css';

import logoFlobites from '../../assets/logo_fb_the.png';
import logoViali from '../../assets/logo_viali.png';

/*
 * Single data source for the mobile carousel. `type` drives which slide
 * component renders: 'case-study' (CaseStudyCard) or 'reviews'
 * (ReviewsSlide, two stacked ReviewCards). Adding a new case study or
 * review pair later is just adding another object here — nothing else
 * needs to change.
 *
 * Metrics for FloBites/Viali and the review headlines below are
 * placeholder copy (dummy, not real reported numbers) — the same
 * convention used for every other "not finalized yet" testimonial
 * elsewhere in this section.
 */
const mobileSlides = [
  {
    type: 'case-study',
    id: 'flobites-cs',
    company: 'FloBites',
    title: 'Nutrition, made simple.',
    metrics: [
      { value: '3.2x', label: 'engagement lift' },
      { value: '150%', label: 'traffic growth' },
    ],
    quote: "They didn't just design a website, they translated exactly how we think about nutrition into every pixel.",
    name: 'Aanya Kapoor',
    role: 'Co-Founder, FloBites',
    logo: logoFlobites,
    logoAlt: 'FloBites logo',
    ctaPath: '/case-studies/flobites',
  },
  {
    type: 'reviews',
    id: 'reviews-1',
    reviews: [
      {
        id: 'delicacy',
        layout: 'text-left',
        title: 'A true collaborator',
        quote: 'They work in collaboration with me, are open for input, and encourage me to expand my ideas.',
        name: 'Myriam Joseph-Raymond',
        role: 'Founder, Delicacy of Haiti',
      },
      {
        id: 'vj',
        layout: 'image-left',
        title: 'Sharp and honest',
        quote: "Sharp, fast, and refreshingly honest about what would and wouldn't work for us.",
        name: 'Vishal Jain',
        role: 'Founder, VJ',
      },
    ],
  },
  {
    type: 'case-study',
    id: 'viali-cs',
    company: 'Viali Hair Care',
    title: 'Growth, on repeat.',
    metrics: [
      { value: '2.4x', label: 'social reach' },
      { value: '40%', label: 'CAC reduction' },
    ],
    quote: 'This was literally a blessing in disguise! Finally an agency who I can rely on with my business now.',
    name: 'Rosemay J. Martelly',
    role: 'Founder & CEO, Viali Hair Care',
    logo: logoViali,
    logoAlt: 'Viali Hair Care logo',
    ctaPath: null,
  },
  {
    type: 'reviews',
    id: 'reviews-2',
    reviews: [
      {
        id: 'mih',
        layout: 'text-left',
        title: 'Built for us, not templated',
        quote: "Every deliverable felt like it was built for our business, not templated for anyone else's.",
        name: 'Aditi Rao',
        role: 'Founder, MIH',
      },
      {
        id: 'tog',
        layout: 'image-left',
        title: 'Understood the brief',
        quote: "The team understood our product and requirements, and I'm happy with how the website turned out.",
        name: 'Grace Anderson',
        role: 'Founder, Touch of Grace',
      },
    ],
  },
];

const AUTOPLAY_MS = 5000;

const CaseStudyCard = ({ data, onCtaClick }) => (
  <article className="tm-cs-card">
    <div className="tm-cs-top">
      <span className="tm-cs-badge">{data.company}</span>
    </div>

    <h3 className="tm-cs-title">{data.title}</h3>

    <div className="tm-cs-metrics">
      {data.metrics.slice(0, 3).map((metric) => (
        <div className="tm-cs-metric" key={metric.label}>
          <span className="tm-cs-metric-value">{metric.value}</span>
          <span className="tm-cs-metric-label">{metric.label}</span>
        </div>
      ))}
    </div>

    <blockquote className="tm-cs-quote">
      <FaQuoteLeft className="tm-quote-mark" aria-hidden="true" />
      <p>{data.quote}</p>
    </blockquote>

    <div className="tm-cs-person">
      <div className={`tm-avatar${data.logo ? ' tm-avatar--logo' : ''}`}>
        {data.logo ? (
          <img src={data.logo} alt={data.logoAlt} />
        ) : (
          <FaUser aria-hidden="true" />
        )}
      </div>
      <div className="tm-person-copy">
        <span className="tm-person-name">{data.name}</span>
        <span className="tm-person-role">{data.role}</span>
      </div>
    </div>

    <button type="button" className="tm-cs-cta" onClick={onCtaClick}>
      View Case Study
      <FaArrowRight className="tm-cs-cta-arrow" aria-hidden="true" />
    </button>
  </article>
);

const ReviewCard = ({ data }) => (
  <article className={`tm-review-card tm-review--${data.layout}`}>
    <div className="tm-review-media" aria-hidden="true">
      <FaImage />
    </div>

    <div className="tm-review-body">
      <h4 className="tm-review-title">{data.title}</h4>

      <blockquote className="tm-review-quote">
        <p>&quot;{data.quote}&quot;</p>
      </blockquote>

      <div className="tm-review-person">
        <div className="tm-avatar tm-avatar--sm">
          <FaUser aria-hidden="true" />
        </div>
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

  const slide = mobileSlides[activeIndex];

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
        {slide.type === 'case-study' ? (
          <CaseStudyCard
            data={slide}
            onCtaClick={() => slide.ctaPath && navigate(slide.ctaPath)}
          />
        ) : (
          <ReviewsSlide data={slide} />
        )}
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
