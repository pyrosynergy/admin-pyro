import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';
import bgImage from "../../assets/hero_bg.webp";

const Hero = ({ clientLogos, openCalendarPopup }) => {
  const [currentButtonIndex, setCurrentButtonIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);
  const lastChangeTime = useRef(Date.now());
  const [logos, setLogos] = useState(() => clientLogos.slice(0, 6));
  const logosRef = useRef(clientLogos.slice(0, 6));

  useEffect(() => {
    logosRef.current = logos;
  }, [logos]);

  const [fadingOut, setFadingOut] = useState([]); // indices currently fading out
  const [fadingIn, setFadingIn] = useState([]);   // indices currently fading in

  // Random shuffle effect for logos (instant change, no animation)
  useEffect(() => {
  let timeoutId;
  let cancelled = false;

  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const runSwap = () => {
    if (cancelled) return;

    const currentLogos = logosRef.current;

    // logos NOT currently on screen — the bench
    const bench = clientLogos.filter(logo => !currentLogos.includes(logo));

    // randomly swap 1 or 2, capped by bench size
    const swapCount = Math.min(Math.random() < 0.5 ? 1 : 2, bench.length);
    if (swapCount === 0) {
      timeoutId = setTimeout(runSwap, 3500);
      return;
    }

    // pick random slots from the displayed grid
    const chosenIndices = shuffle(currentLogos.map((_, i) => i)).slice(0, swapCount);

    // pick random incoming logos from bench (no duplicates guaranteed since bench has no current logos)
    const incoming = shuffle(bench).slice(0, swapCount);

    // Phase 1: fade out the chosen slots
    setFadingOut(chosenIndices);

    timeoutId = setTimeout(() => {
      if (cancelled) return;

      // swap in the new logos
      setLogos(curr => {
        const updated = [...curr];
        chosenIndices.forEach((idx, i) => { updated[idx] = incoming[i]; });
        return updated;
      });
      setFadingOut([]);
      setFadingIn(chosenIndices);

      timeoutId = setTimeout(() => {
        if (cancelled) return;
        setFadingIn([]);
        // next swap only starts after this one is fully done
        timeoutId = setTimeout(runSwap, 3500);
      }, 450);
    }, 450);
  };

  timeoutId = setTimeout(runSwap, 3500);

  return () => {
    cancelled = true;
    clearTimeout(timeoutId);
  };
}, [clientLogos]);

  // Carousel effect for buttons on mobile
  useEffect(() => {
    const scheduleNext = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      const normalDelay = 3000;
      const hoveredDelay = 6000;
      const timeSinceLastChange = Date.now() - lastChangeTime.current;
      
      // Calculate remaining time based on current state
      let delay;
      if (isHovered) {
        // If currently hovered, use longer delay
        delay = hoveredDelay - (timeSinceLastChange % hoveredDelay);
        if (delay <= 0) delay = hoveredDelay;
      } else {
        // If not hovered, use normal delay
        delay = normalDelay - (timeSinceLastChange % normalDelay);
        if (delay <= 0) delay = normalDelay;
      }
      
      timeoutRef.current = setTimeout(() => {
        setCurrentButtonIndex((prevIndex) => (prevIndex + 1) % 2);
        lastChangeTime.current = Date.now();
        scheduleNext(); // Schedule the next change
      }, delay);
    };

    scheduleNext();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isHovered]);

  const handleNavClick = (e, targetId) => {
    if (e) e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <section id="home" className="relative flex flex-col">
      <div className="content-video-wrapper">
        {/* LCP element — must load eagerly and at high priority. */}
        <img src={bgImage} alt="" fetchPriority="high" decoding="async" className="content-image-bg" />
        <div className="content-video-fade-overlay"></div>
        <div
          className="flex flex-col items-center justify-center flex-1 content-on-top"
          style={{
            minHeight: "40vh",
            paddingTop: "100px",
            paddingBottom: "0px",
          }}
        >

          <h1 className="hero-heading max-w-5xl mx-auto text-center">
          The growth partner <br></br>for founders who're <span className="purple-italic">done </span> <br></br> figuring it out alone.
          </h1>
          <p className="hero-desc">
           We handle growth for your business early-on, right from <br/>
            initial outreach strategy to market-level execution.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <h3>$150k+</h3>
              <p>Partner Revenue<br />Generated</p>
            </div>

            <div className="hero-stat">
              <h3>12+</h3>
              <p>Industries<br />Served</p>
            </div>

            <div className="hero-stat">
              <h3>90k+</h3>
              <p>Partner Followers<br />Gained</p>
            </div>
         </div>
          <div 
            className="hero-buttons-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            
            <button
              className={`hero-button discovery-button mx-auto mt-4 mb-8 md:mb-12 ${
                currentButtonIndex === 1 ? 'button-active' : 'button-inactive'
              }`}
              onClick={openCalendarPopup}
            >
              Book a <span className="free-highlight">FREE</span> Audit call
            </button>
            <button
              className={`hero-button fit-button mx-auto mt-4 mb-8 md:mb-12 ${
                currentButtonIndex === 0 ? 'button-active' : 'button-inactive'
              }`}
              onClick={() => handleNavClick(null, 'pyrostack')}
            >
              See How It Works
            </button>
          </div>
        </div>
        <div className="client-logos-grid-container">
          {logos.map((logo, idx) => (
            <img loading="lazy" decoding="async"
              key={logo}
              src={logo}
              alt="client-logo"
              className={`client-logo-grid-item
                ${fadingOut.includes(idx) ? 'logo-fade-out' : ''}
                ${fadingIn.includes(idx) ? 'logo-fade-in' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;