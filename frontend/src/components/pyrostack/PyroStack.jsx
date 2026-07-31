import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import fireIcon from "../../assets/pyro-satck-fire.svg";
import "./PyroStack.css";

const PyroStack = ({ openCalendarPopup }) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [svgPath, setSvgPath] = useState("");
  const [svgViewBox, setSvgViewBox] = useState("0 0 100 1000");
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)").matches
      : false,
  );
  const cardRefs = useRef([]);
  const nodeRefs = useRef([]);
  const itemRefs = useRef([]);
  const timelineRef = useRef(null);

  const steps = [
    {
      title: "Founder & Product Audit",
      content: [
        "Through several audits and discussions, we get an end-to-end understanding of how your product works, what markets it serves, and how your current team operates.",
      ],
      number: "01",
    },
    {
      title: "PyroStack™",
      content: [
        "Once all information is gathered, we put it together using PyroStack™, our proprietary growth evaluation framework with 35+ technical and business logical touchpoints, determining the next steps for your business’ growth.",
      ],
      number: "02",
    },
    {
      title: "Strategy + Execution Plan",
      content: [
        "Post evaluation using PyroStack™, we carefully curate a strategic execution plan and structure a timeline that works best for your audience in the market.",
      ],
      number: "03",
    },
    {
      title: "Build & Launch",
      content: [
        "Our team of developers and growth experts start building according to the strategic execution plan, utilising the structured timeline for testing, building, and launching.",
      ],
      number: "04",
    },
  ];

  const computePath = useCallback(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const validNodes = nodeRefs.current.filter(Boolean);
    if (validNodes.length < 2) return;

    const timelineRect = timeline.getBoundingClientRect();

    const points = validNodes.map((node) => {
      const rect = node.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - timelineRect.left,
        y: rect.top + rect.height / 2 - timelineRect.top,
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
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Desktop: IntersectionObserver on cards + SVG snake path
  useEffect(() => {
    if (isMobile) return;

    const observer = new IntersectionObserver(
      () => {
        let closestIndex = 0;
        let closestDistance = Infinity;
        const viewportCenter = window.innerHeight * 0.4;

        cardRefs.current.forEach((card, index) => {
          if (!card) return;

          const rect = card.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const distance = Math.abs(cardCenter - viewportCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        setActiveIndex(closestIndex);
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    requestAnimationFrame(computePath);

    const resizeObserver = new ResizeObserver(() =>
      requestAnimationFrame(computePath),
    );
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
      const focusPoint = window.innerHeight * 0.4;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - focusPoint);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <section id="pyrostack" className="pyrostack-section">
      <div className="pyrostack-container">
        <h2 className="pyrostack-title">How It Works</h2>

        {isMobile ? (
          <div className="pyrostack-mobile-timeline" ref={timelineRef}>
            {steps.map((step, index) => (
              <div
                className={`mobile-timeline-item ${activeIndex === index ? "is-active" : ""}`}
                ref={(el) => (itemRefs.current[index] = el)}
                key={index}
              >
                <div
                  ref={(el) => (nodeRefs.current[index] = el)}
                  className={`mobile-timeline-node ${activeIndex === index ? "is-active" : ""}`}
                >
                  <span className="node-number">{step.number}</span>
                </div>

                <div
                  ref={(el) => (cardRefs.current[index] = el)}
                  data-index={index}
                  className={`mobile-timeline-card ${activeIndex === index ? "is-active" : ""}`}
                >
                  <h3 className="mobile-timeline-card-title">{step.title}</h3>
                  <div className="mobile-timeline-card-desc-wrap">
                    <div className="mobile-timeline-card-desc-inner">
                      <div className="mobile-timeline-card-desc">
                        {step.content.map((paragraph, itemIndex) => (
                          <p key={itemIndex}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="pyrostack-timeline" ref={timelineRef}>
            <svg
              className="timeline-line"
              viewBox={svgViewBox}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="pyrostackLineGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
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
                className={`timeline-item ${activeIndex === index ? "is-active" : ""}`}
                ref={(el) => (itemRefs.current[index] = el)}
                key={index}
              >
                <div className="timeline-node-wrapper">
                  <div
                    ref={(el) => (nodeRefs.current[index] = el)}
                    className={`timeline-node ${activeIndex === index ? "is-active" : ""}`}
                  >
                    <span className="node-number">{step.number}</span>
                  </div>
                </div>

                <div
                  ref={(el) => (cardRefs.current[index] = el)}
                  data-index={index}
                  className={`timeline-card ${activeIndex === index ? "is-active" : ""}`}
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
                        <img
                          loading="lazy"
                          decoding="async"
                          src={fireIcon}
                          alt=""
                        />
                      </div>
                    ) : (
                      <span className="bg-number">{step.number}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pyrostack-buttons-container">
          <button
            className="pyrostack-cta pyrostack-cta-primary"
            onClick={openCalendarPopup}
          >
            Book a <span className="pyrostack-cta-highlight">FREE</span> Audit
            call
          </button>
          <button
            className="pyrostack-cta pyrostack-cta-secondary"
            onClick={() => navigate("/case-studies")}
          >
            View Case Studies
          </button>
        </div>
      </div>
    </section>
  );
};

export default PyroStack;
