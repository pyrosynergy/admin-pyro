import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';
import logo from '../../assets/Frame 2.svg';
import footerVector from '../../assets/footer_vector.webp';
import iconInstagram from '../../assets/icon_instagram.webp';
import iconLinkedIn from '../../assets/icon_linkedin.webp';

const Footer = ({ openCalendarPopup }) => {
  const navigate = useNavigate();

  const handleNavClick = (e, targetId) => {
    e.preventDefault();

    if (targetId === 'hiring') {
      navigate('/hiring');
      window.scrollTo(0, 0);
    } else if (targetId === 'case-studies') {
      navigate('/case-studies');
      window.scrollTo(0, 0);
    } else if (targetId === 'terms') {
      navigate('/policy-pages');
      window.scrollTo(0, 0);
    } else {
      navigate('/');
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
    <div className="footer-wrapper">
      <footer className="footer">
        <div className="footer-brand">
          <img loading="lazy" decoding="async" src={logo} alt="PyroSynergy" className="brand-logo-img" />
          <p className="footer-desc">
            Partnering with founders, startups, and businesses to build their growth systems.
          </p>
        </div>

        <div className="social-icons">
          <a
            href="https://www.instagram.com/pyrosynergy/"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img loading="lazy" decoding="async" src={iconInstagram} alt="Instagram" className="social-icon-img" />
          </a>
          <a
            href="https://www.linkedin.com/company/pyrosynergy/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img loading="lazy" decoding="async" src={iconLinkedIn} alt="LinkedIn" className="social-icon-img" />
          </a>
        </div>

        <div className="footer-links-grid">
          <div className="footer-links-col">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
            <a href="#why-us" onClick={(e) => handleNavClick(e, 'services')}>Why Us</a>
          </div>
          <div className="footer-links-col">
            <a href="#pyrostack" onClick={(e) => handleNavClick(e, 'pyrostack')}>How It Works</a>
            <a href="#hiring" onClick={(e) => handleNavClick(e, 'hiring')}>Hiring</a>
          </div>
          <div className="footer-links-col">
            <a href="/case-studies" onClick={(e) => handleNavClick(e, 'case-studies')}>Case Studies</a>
            <a
              href="#book"
              onClick={(e) => {
                e.preventDefault();
                if (openCalendarPopup) openCalendarPopup();
              }}
            >
              Book A Call
            </a>
          </div>
        </div>
      </footer>

      <div className="footer-bottom">
        <img loading="lazy" decoding="async" src={footerVector} alt="" className="footer-vector" />
        <div className="footer-bottom-row">
          <span>&copy; 2025-26 PyroSynergy LLP.<br />All rights reserved.</span>
          <a href="#terms" onClick={(e) => handleNavClick(e, 'terms')}>Policy Pages</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
