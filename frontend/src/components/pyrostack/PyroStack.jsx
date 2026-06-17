import React, { useEffect, useRef, useState, useCallback } from 'react';
import fireIcon from '../../assets/pyro-satck-fire.svg';
import './PyroStack.css';

const PyroStack = ({ handleNavigateToQuestionnaire }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [svgPath, setSvgPath] = useState('');
  const [svgViewBox, setSvgViewBox] = useState('0 0 100 1000');
  const [isMobile, setIsMobile] = useState(false);
  const cardRefs = useRef([]);
  const nodeRefs = useRef([]);
  const itemRefs = useRef([]);
  const timelineRef = useRef(null);

  const steps = [
    {
      title: 'Decode',
      content: [
        'Before we propose anything, we need to understand where you actually are',
        "We ask the questions most people skip. If you're a fit, we'll both know it by the end"
      ],
      number: '01'
    },
    {
      title: 'Blueprint',
      content: [
        'We work on a blueprint - so nothing is based on assumptions but structure',
        "You decide what makes sense and what doesn't. We move ahead accordingly"
      ],
      number: '02'
    },
    {
      title: 'Build',
      content: [
        'Once the inputs are clear and direction is set, we build your exact requirements',
        'Nothing goes unchecked and without your feedback, in every step'
      ],
      number: '03'
    },
    {
      title: 'Pyros',
      content: [
        'Ta-da! Your solution is now built. Before we ship it, we review performance metrics and make final adjustments and refinements, if required.',
        'Once delivered, you decide the next steps of our engagement; be it support or co-working on your next big project.'
      ],
      number: '04',
      isFlame: true
    }
  ];

  const computePath = useCallback(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const validNodes = nodeRefs.current.filter(Boolean);
    if (validNodes.length < 2) return;

    const timelineRect = timeline.getBoundingClientRect();

    const points = validNodes.map(node => {
      const rect = node.getBoundingClientRect();
      return {
        x: (rect.left + rect.width / 2) - timelineRect.left,
        y: (rect.top + rect.height / 2) - timelineRect.top,
      };
    });

    const height = timelineRect.height;
    setSvgViewBox(`0 0 100 ${height}`);

    const amplitude = 30;
    let d = `M ${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const dir = i % 2 === 0 ? 1 : -1;
      const third = (p2.y - p1.y) / 3;

      const cx1 = (p1.x + dir * amplitude).toFixed(1);
      const cy1 = (p1.y + third).toFixed(1);
      const cx2 = (p2.x + dir * amplitude).toFixed(1);
      const cy2 = (p2.y - third).toFixed(1);

      d += ` C ${cx1},${cy1} ${cx2},${cy2} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
    }

    setSvgPath(d);
  }, []);

  // Detect mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Desktop: IntersectionObserver on cards + SVG snake path
  useEffect(() => {
    if (isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setActiveIndex(index);
          } else {
            setActiveIndex((current) => (current === index ? null : current));
          }
        });
      },
      { rootMargin: '-20% 0px -20% 0px', threshold: 0.1 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    requestAnimationFrame(computePath);

    const resizeObserver = new ResizeObserver(() => requestAnimationFrame(computePath));
    if (timelineRef.current) {
      resizeObserver.observe(timelineRef.current);
    }

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [computePath, isMobile]);

  // Mobile: scroll-position listener on full timeline-item height
  useEffect(() => {
    if (!isMobile) return;

    setActiveIndex(0);

    const handleScroll = () => {
      // Activate the last item whose top has crossed 55% of the viewport.
      // At 55% the previous step's card is still on screen — overlap feels natural.
      const trigger = window.innerHeight * 0.55;
      let next = 0;
      itemRefs.current.forEach((item, i) => {
        if (item && item.getBoundingClientRect().top <= trigger) {
          next = i;
        }
      });
      setActiveIndex(next);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <section id="pyrostack" className="pyrostack-section">
      <div className="pyrostack-container">
        <h2 className="pyrostack-title">PyroStack™: The Framework for Founders</h2>
        <p className="pyrostack-subtitle">
          We guide and help you right from breaking down the problem and laying<br />
          the foundation, to building and execution, all while keeping your goal and<br />
          vision intact throughout
        </p>

        <div className="pyrostack-timeline" ref={timelineRef}>
          <svg
            className="timeline-line"
            viewBox={svgViewBox}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="pyrostackLineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0.75)" />
                <stop offset="50%" stopColor="rgba(139, 92, 246, 0.6)" />
                <stop offset="100%" stopColor="rgba(192, 132, 252, 0.5)" />
              </linearGradient>
            </defs>
            {svgPath && (
              <path
                d={svgPath}
                fill="none"
                stroke="url(#pyrostackLineGradient)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            )}
          </svg>

          {steps.map((step, index) => (
            <div
              className={`timeline-item ${activeIndex === index ? 'is-active' : ''}`}
              ref={(el) => (itemRefs.current[index] = el)}
              key={index}
            >
              <div className="timeline-node-wrapper">
                <div
                  ref={(el) => (nodeRefs.current[index] = el)}
                  className={`timeline-node ${activeIndex === index ? 'is-active' : ''}`}
                >
                  <span className="node-number">{step.number}</span>
                </div>
              </div>

              <div
                ref={(el) => (cardRefs.current[index] = el)}
                data-index={index}
                className={`timeline-card ${activeIndex === index ? 'is-active' : ''}`}
              >
                <div className="card-text-content">
                  <h3 className="timeline-card-title">{step.title}</h3>
                  <div className="timeline-card-desc">
                    {step.content.map((paragraph, itemIndex) => (
                      <p key={itemIndex}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div className="timeline-card-bg-element">
                  {step.isFlame ? (
                    <div className="flame-icon-wrapper">
                      <img src={fireIcon} alt="" />
                    </div>
                  ) : (
                    <span className="bg-number">{step.number}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="pyrostack-btn" onClick={handleNavigateToQuestionnaire}>
          Get Started
        </button>
      </div>
    </section>
  );
};

export default PyroStack;
