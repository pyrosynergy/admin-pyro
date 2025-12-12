import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Marquee from "react-fast-marquee";
import './Hero.css';
import bgvideo from "../../assets/bgvideo.mp4";

const Hero = ({ highlightedWords, highlightedIndex, clientLogos, openCalendarPopup, handleNavigateToQuestionnaire }) => {
  const [currentButtonIndex, setCurrentButtonIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);
  const lastChangeTime = useRef(Date.now());
  const navigate = useNavigate();

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
        <video autoPlay loop muted playsInline className="content-video-bg">
          <source src={bgvideo} type="video/mp4" />
        </video>
        <div className="content-video-fade-overlay"></div>
        <div
          className="flex flex-col items-center justify-center flex-1 content-on-top"
          style={{
            minHeight: "40vh",
            paddingTop: "130px",
            paddingBottom: "0px",
          }}
        >
          <div 
            className="hiring-announcement"
            onClick={() => navigate('/hiring')}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate('/hiring');
              }
            }}
          >
            We're Hiring! — Join our team →
          </div>
          <h1 className="hero-heading leading-snug">
            <div>Let's make your business</div>
            <div className="highlighted-container">
              {highlightedWords.map((word, index) => (
                <span
                  key={index}
                  className={`highlighted ${
                    index === highlightedIndex ? "active" : ""
                  }`}
                >
                  {word}
                </span>
              ))}
            </div>
          </h1>
          <p className="hero-desc">
            From strategy to scale, we rebuild and redesign your brand into
            its most{" "}
            <span className="desc-highlight">
              efficient, effective, and elegant
            </span>{" "}
            form — empowering you to{" "}
            <span className="desc-italic">outgrow</span> your competitors in
            sales and success.
          </p>
          <div 
            className="hero-buttons-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`hero-button strategy-button mx-auto mt-4 mb-8 md:mb-12 ${
                currentButtonIndex === 0 ? 'button-active' : 'button-inactive'
              }`}
              onClick={openCalendarPopup}
            >
              schedule a <span className="free-highlight">FREE</span> strategy
              call
            </button>
            <button
              className={`hero-button questionnaire-button mx-auto mt-4 mb-8 md:mb-12 ${
                currentButtonIndex === 1 ? 'button-active' : 'button-inactive'
              }`}
              onClick={handleNavigateToQuestionnaire}
            >
              take <span className="free-highlight">3-minute</span> PyroReality Check
            </button>
          </div>
        </div>
        <div className="marquee-outer-padding-container ">
          <div className="marquee-inner-content-container hero-marquee">
            <Marquee speed={100} pauseOnHover={true} pauseOnClick={false}>
              {clientLogos.map((logo, idx) => (
                <img
                  key={idx}
                  src={logo}
                  alt={`client-${idx}`}
                  className="client-logo"
                />
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;