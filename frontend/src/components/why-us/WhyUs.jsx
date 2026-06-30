import React, { useState, useRef, useCallback, useEffect } from 'react';
import './WhyUs.css';

const cards = [
  {
    quote: `"My business feels like chaos, and I can't navigate my way through it."`,
    response: `We bring everything in one place, fixing both tech and business logic piece-by-piece; be it building custom <span class="hw hw-p">backend systems</span> or <span class="hw hw-p">business strategy.</span>`
  },
  {
    quote: `"Everyone in my domain is posting online, but I really don't have the time and energy for it."`,
    response: `The task of growing your <span class="hw hw-b">social media presence</span> is on us, from planning & strategy → scripting → scheduling → uploading → performance tracking; end-to-end.`
  },
  {
    quote: `"Everyone's talking about how AI can save my time and money, but I don't know where to even start."`,
    response: `Integrating AI into your business can be overwhelming. We do the heavy lifting by setting up <span class="hw hw-p">AI workflows</span> and <span class="hw hw-p">automations</span> that fit right into your system.`
  },
  {
    quote: `"Most agencies I've worked with don't get me. What I ask is often not delivered."`,
    response: `<span class="hw hw-b">Empathy in Business</span> is what shapes <em>PyroSynergy's</em> core. Our <span class="hw hw-b">PyroStack™</span> framework ensures we build a working structure around your primary and latent requirements.`
  }
];

const INTERVAL_MS = 10000;

const WhyUs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [animDir, setAnimDir] = useState('right');
  const [phase, setPhase] = useState('idle'); // 'idle' | 'out' | 'in'
  const [hoverSide, setHoverSide] = useState(null); // 'left' | 'right' | null
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);
  const animatingRef = useRef(false);
  const activeIndexRef = useRef(0);
  const isHoveringSectionRef = useRef(false);

  useEffect(() => { activeIndexRef.current = activeIndex; }, [activeIndex]);
  useEffect(() => { animatingRef.current = animating; }, [animating]);

  const advance = useCallback((nextIndex, dir) => {
    if (animatingRef.current) return;
    const total = cards.length;
    const wrapped = ((nextIndex % total) + total) % total;
    if (wrapped === activeIndexRef.current) return;

    animatingRef.current = true;
    setAnimating(true);
    setAnimDir(dir);
    setPhase('out');

    setTimeout(() => {
      setActiveIndex(wrapped);
      activeIndexRef.current = wrapped;
      setPhase('in');

      setTimeout(() => {
        setPhase('idle');
        setAnimating(false);
        animatingRef.current = false;
      }, 200);
    }, 150);
  }, []);

  const startInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (isHoveringSectionRef.current) return; // pause auto-advance while hovering the carousel
      advance(activeIndexRef.current + 1, 'right');
    }, INTERVAL_MS);
  }, [advance]);

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [startInterval]);

  const goTo = useCallback((nextIndex, dir) => {
    advance(nextIndex, dir);
    startInterval();
  }, [advance, startInterval]);

  const handleCarouselClick = useCallback((e) => {
    if (window.innerWidth <= 600) return;
    if (!carouselRef.current) return;
    const rect = carouselRef.current.getBoundingClientRect();
    const side = e.clientX < rect.left + rect.width / 2 ? 'left' : 'right';
    if (side === 'left') goTo(activeIndexRef.current - 1, 'left');
    else goTo(activeIndexRef.current + 1, 'right');
  }, [goTo]);

  const handleCarouselMouseMove = useCallback((e) => {
    if (window.innerWidth <= 600) return;
    if (!carouselRef.current) return;
    isHoveringSectionRef.current = true;
    const rect = carouselRef.current.getBoundingClientRect();
    const side = e.clientX < rect.left + rect.width / 2 ? 'left' : 'right';
    setHoverSide(side);
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleCarouselMouseLeave = useCallback(() => {
    isHoveringSectionRef.current = false;
    setHoverSide(null);
    startInterval();
  }, [startInterval]);

  const card = cards[activeIndex];
  const isEven = activeIndex % 2 === 0;

  return (
    <section
      id="services"
      className="why-us-section"
      ref={sectionRef}
    >
      <div className="why-us-header">
        <h2>
          You build the product, while{' '}
          <span className="highlight-text-ps">PyroSynergy</span>
          <br />handles <span className="highlight-text">everything</span> around it.
        </h2>
        <p className="why-us-subtitle">
          Your idea deserves more than a half-built system and a stretched team.<br />
          Here&apos;s what founders came to us with:
        </p>
      </div>

      <div
        className="whyus-carousel-wrapper"
        ref={carouselRef}
        onClick={handleCarouselClick}
        onMouseMove={handleCarouselMouseMove}
        onMouseLeave={handleCarouselMouseLeave}
      >
        {hoverSide && (
          <div
            className="whyus-cursor-indicator"
            style={{ left: cursorPos.x, top: cursorPos.y }}
          >
            {hoverSide === 'left' ? '‹' : '›'}
          </div>
        )}

        <div className="whyus-carousel-track">
          <div
            className={`whyus-chat-window ${
              phase === 'out' ? (animDir === 'left' ? 'phase-out-right' : 'phase-out-left') : ''
            } ${
              phase === 'in' ? (animDir === 'left' ? 'anim-from-left' : 'anim-from-right') : ''
            }`}
          >
            <div className="whyus-chat-row whyus-chat-incoming">
              <div className={`whyus-bubble whyus-bubble-q ${isEven ? 'q-purple' : 'q-blue'}`}>
                <p><em>{card.quote}</em></p>
              </div>
            </div>

            <div className="whyus-chat-row whyus-chat-outgoing">
              <div className={`whyus-bubble whyus-bubble-a ${isEven ? 'a-purple' : 'a-blue'}`}>
                <p dangerouslySetInnerHTML={{ __html: card.response }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="whyus-dots" role="tablist" aria-label="Card navigation">
        <button
          className="whyus-arrow"
          onClick={() => goTo(activeIndex - 1, 'left')}
          aria-label="Previous"
        >&lt;</button>

        {cards.map((_, i) => (
          <button
            key={i}
            className={`whyus-dot${i === activeIndex ? ' whyus-dot-active' : ''}`}
            onClick={() => goTo(i, i > activeIndex ? 'right' : 'left')}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Card ${i + 1}`}
          />
        ))}

        <button
          className="whyus-arrow"
          onClick={() => goTo(activeIndex + 1, 'right')}
          aria-label="Next"
        >&gt;</button>
      </div>
    </section>
  );
};

export default WhyUs;