import React from 'react';
import './Header.css';
import logo from '../../assets/Frame 2.svg';

const Header = ({ 
  isScrolled, 
  isMenuOpen, 
  setIsMenuOpen, 
  navRef, 
  handleLinkClick, 
  currentPage, 
  handleNavigateToHome 
}) => {
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    
    // If we're on questionnaire page, navigate back to home first
    if (currentPage === 'questionnaire') {
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
    <header className={`top-nav ${isScrolled ? "fixed-header" : ""}`}>
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
              href="#home" 
              onClick={(e) => handleNavClick(e, 'home')}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#services" 
              onClick={(e) => handleNavClick(e, 'services')}
            >
              Solutions
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              Contact
            </a>
          </li>
        </ul>
        
        {/* Mobile Navigation */}
        <div className="mobile-nav-wrapper">
          <button
            className="hamburger-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>
          
          <ul className={`mobile-nav ${isMenuOpen ? "is-active" : ""}`}>
            <li>
              <a 
                href="#home" 
                onClick={(e) => handleNavClick(e, 'home')}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#services" 
                onClick={(e) => handleNavClick(e, 'services')}
              >
                Solutions
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, 'contact')}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;