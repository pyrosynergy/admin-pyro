import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HiringFooter.css';
import logo from '../../assets/Frame 2.svg';

const HiringFooter = () => {
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
    <footer className="hiring-footer">
      <div className="hiring-footer-content">
        <div className="hiring-footer-names">
          <img src={logo} alt="PuroSynergy" className="hiring-brand-logo-img" />
          <span className="hiring-brand-copyright-text">
            © Copyright 2025 Pyrosynergy LLP. All rights reserved.
          </span>
        </div>

        <div className="hiring-footer-links">
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
          <a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Solutions</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
          <a href="#hiring" onClick={(e) => handleNavClick(e, 'hiring')}>Hiring</a>
        </div>

        <div className="hiring-social-icons">
          <a
            href="https://www.instagram.com/pyrosynergy/"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg"
              alt="Instagram"
            />
          </a>
          <a
            href="https://www.linkedin.com/company/pyrosynergy/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
              alt="LinkedIn"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default HiringFooter;
