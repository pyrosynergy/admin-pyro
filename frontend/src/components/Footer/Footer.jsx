import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';
import grids from "../../assets/Frame 41.png";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    
    if (targetId === 'hiring') {
      navigate('/hiring');
      window.scrollTo(0, 0);
    } else {
      // Navigate to home if not already there
      navigate('/');
      
      // After navigating, scroll to the section
      setTimeout(() => {
        if (targetId !== 'home') {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          window.scrollTo(0, 0);
        }
      }, 100);
    }
  };

  return (
    <>
      <div className="decorative-grid-container">
        <img
          src={grids}
          alt="Decorative grids"
          className="decorative-grid-image"
        />
      </div>

      <footer className="footer">
        <div className="footer-names">
          <span className="brand-logo-text">PyroSynergy</span>
          <span className="brand-copyright-text">
            © Copyright 2025 Pyrosynergy AI Labs. All rights reserved.
          </span>
        </div>
        
        <div className="footer-links">
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
          <a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Solutions</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
          <a href="#hiring" onClick={(e) => handleNavClick(e, 'hiring')}>Hiring</a>
        </div>

        <div className="social-icons">
          <a
            href="https://www.instagram.com/pyrosynergy/"
            aria-label="Instagram"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg"
              alt="Instagram"
            />
          </a>
          <a
            href="https://www.linkedin.com/company/pyrosynergy/"
            aria-label="LinkedIn"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
              alt="LinkedIn"
            />
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;