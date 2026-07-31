import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HiringFooter.css';
import logo from '../../assets/Frame 2.svg';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

const HiringFooter = () => {
  const navigate = useNavigate();

  const handleNavClick = (e, targetId) => {
    e.preventDefault();

    if (targetId === 'hiring') {
      navigate('/hiring');
      window.scrollTo(0, 0);
    } else if (targetId === 'terms') {
      navigate('/policy-pages');
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
          <img loading="lazy" decoding="async" src={logo} alt="PuroSynergy" className="hiring-brand-logo-img" />
          <span className="hiring-brand-copyright-text">
            © Copyright 2025-26 PyroSynergy LLP. All rights reserved.
          </span>
        </div>

        <div className="hiring-footer-links">
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
          <a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Solutions</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
          <a href="#hiring" onClick={(e) => handleNavClick(e, 'hiring')}>Hiring</a>
          <a href="#terms" onClick={(e) => handleNavClick(e, 'terms')}>Policy Pages</a>
        </div>

        <div className="hiring-social-icons">
          <a
            href="https://www.instagram.com/pyrosynergy/"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="social-icon" />
          </a>
          <a
            href="https://www.linkedin.com/company/pyrosynergy/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default HiringFooter;
