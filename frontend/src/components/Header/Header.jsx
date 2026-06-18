import React from 'react';
import './Header.css';
import logo from '../../assets/Group 1.svg';

const Header = ({ 
  isScrolled, 
  isMenuOpen, 
  setIsMenuOpen, 
  navRef, 
  handleLinkClick, 
  currentPage, 
  handleNavigateToHome,
  openCalendarPopup
}) => {
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate back to home first
    if (currentPage !== '/') {
      handleNavigateToHome();
      // After navigating to home, scroll to the section
      setTimeout(() => {
        if (targetId !== 'home') {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    } else {
      // Normal scroll behavior for home page
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    // Close mobile menu if open
    if (handleLinkClick) {
      handleLinkClick();
    }
  };

  return (
    <header className="top-nav">
      {/* Logo - clicking goes to home */}
      <a 
        href="#home" 
        className="brand-logo-link" 
        onClick={(e) => handleNavClick(e, 'home')}
      >
        <img src={logo} alt="PyroSynergy" className="brand-logo-img" />
      </a>
      
      <nav ref={navRef} className="main-navigation">
        <ul className="nav-links">
          <li>
            <a 
              href="#pyrostack" 
              onClick={(e) => handleNavClick(e, 'pyrostack')}
            >
              PyroStack
            </a>
          </li>
          <li>
            <a
              href="#work"
              onClick={(e) => handleNavClick(e, 'work')}
            >
              Work
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className="book-call-btn"
              onClick={(e) => {
                e.preventDefault();
                if (openCalendarPopup) openCalendarPopup();
                if (handleLinkClick) handleLinkClick();
              }}
            >
              Book a Call
              <span className="arrow-icon-wrapper">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </a>
          </li>
        </ul>
        
        {/* Mobile Navigation */}
        <div className="mobile-nav-wrapper">
          <a
            href="#contact"
            className="book-call-btn mobile-book-call-btn"
            onClick={(e) => {
              e.preventDefault();
              if (openCalendarPopup) openCalendarPopup();
              if (handleLinkClick) handleLinkClick();
            }}
          >
            Book a Call
            <span className="arrow-icon-wrapper">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </a>

          <button
            className="hamburger-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            ) : (
              <>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </>
            )}
          </button>

          <ul className={`mobile-nav ${isMenuOpen ? "is-active" : ""}`}>
            <li>
              <a
                href="#pyrostack"
                onClick={(e) => handleNavClick(e, 'pyrostack')}
              >
                PyroStack
              </a>
            </li>
            <li>
              <a
                href="#work"
                onClick={(e) => handleNavClick(e, 'work')}
              >
                Work
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;