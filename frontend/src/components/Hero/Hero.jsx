import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import bgImage from "../../assets/hero_bg.png";

const Hero = ({ highlightedWords, highlightedIndex, clientLogos, openCalendarPopup, handleNavigateToQuestionnaire }) => {
  const [currentButtonIndex, setCurrentButtonIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);
  const lastChangeTime = useRef(Date.now());
  const navigate = useNavigate();
  const [logos, setLogos] = useState(clientLogos);

  // Random shuffle effect for logos (instant change, no animation)
  useEffect(() => {
    const interval = setInterval(() => {
      setLogos(prevLogos => {
        const shuffled = [...prevLogos];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      });
    }, 4000); // Shuffle every 4 seconds

    return () => clearInterval(interval);
  }, []);

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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <section id="home" className="relative flex flex-col">
      <div className="content-video-wrapper">
        <img src={bgImage} alt="Hero Background" className="content-image-bg" />
        <div className="content-video-fade-overlay"></div>
        <div
          className="flex flex-col items-center justify-center flex-1 content-on-top"
          style={{
            minHeight: "40vh",
            paddingTop: "130px",
            paddingBottom: "0px",
          }}
        >

          <h1 className="hero-heading leading-snug">
            <div>Your Product is built,</div>
            <div>
              Your System <span className="purple-italic">isn't.</span>
            </div>
          </h1>
          <p className="hero-desc">
            Most early-stage founders build their product and run<br/>
            their business at the same time.<br/><br/>
            Something always slips. PyroSynergy is here to help.
          </p>
          <div 
            className="hero-buttons-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`hero-button fit-button mx-auto mt-4 mb-8 md:mb-12 ${
                currentButtonIndex === 0 ? 'button-active' : 'button-inactive'
              }`}
              onClick={handleNavigateToQuestionnaire}
            >
              See if we're a Fit
            </button>
            <button
              className={`hero-button discovery-button mx-auto mt-4 mb-8 md:mb-12 ${
                currentButtonIndex === 1 ? 'button-active' : 'button-inactive'
              }`}
              onClick={openCalendarPopup}
            >
              Book a <span className="free-highlight">FREE</span> discovery call
            </button>
          </div>
        </div>
        <div className="client-logos-grid-container">
          {logos.map((logo, idx) => (
            <img
              key={logo} // Use logo source as key so React properly identifies it
              src={logo}
              alt={`client-logo`}
              className="client-logo-grid-item"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;