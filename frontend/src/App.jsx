import React, { useState, useEffect, useRef, useCallback } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import "./App.css";

// Component imports
import Header from "./components/Header/Header.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Services from "./components/Services/Services.jsx";
// import About from "./components/About/About"; // Add this import
import Contact from "./components/Contact/Contact.jsx";
import Footer from "./components/Footer/Footer.jsx";
import DecodeQuestionnaire from "./components/DecodeQuestionnaire/DecodeQuestionnaire.jsx";
import Questionnaire from "./components/Questionnaire/Questionnaire.jsx";
import Loading from "./components/Loading/Loading.jsx"; // Add this import
import Welcome from "./components/Welcome/Welcome.jsx"; // Add this import
import Hiring from "./components/Hiring/Hiring.jsx";
import Copywriter from "./components/Hiring/Copywriter.jsx";
import VisualDesigner from "./components/Hiring/VisualDesigner.jsx";
import UXDesigner from "./components/Hiring/UXDesigner.jsx";
import NoCodeWeb from "./components/Hiring/NoCodeWeb.jsx";
import SalesIntern from "./components/Hiring/SalesIntern.jsx";
import ContentStrategist from "./components/Hiring/ContentStrategist.jsx";
import SocialIntern from "./components/Hiring/SocialIntern.jsx";
import UIUXVDIntern from "./components/Hiring/UIUXVDIntern.jsx";
import PolicyPages from "./components/PolicyPages/PolicyPages.jsx";
import PrivacyPolicy from "./components/PolicyPages/PrivacyPolicy.jsx";
import RefundPolicy from "./components/PolicyPages/RefundPolicy.jsx";
import CancellationPolicy from "./components/PolicyPages/CancellationPolicy.jsx";
import TermsAndConditions from "./components/PolicyPages/TermsAndConditions.jsx";
import FAQ from "./components/FAQ/FAQ.jsx";
import Founder from "./components/Founder/Founder.jsx";
import DecodePath from "./components/decode-path/DecodePath.jsx";
import PyroStack from "./components/pyrostack/PyroStack.jsx";
import Testimonials from "./components/testimonials/Testimonials.jsx";
import Banner from "./components/banner/banner.jsx";
import EmpathyBanner from "./components/EmpathyBanner/EmpathyBanner.jsx";
import WhyUs from "./components/why-us/WhyUs.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import Flobites from "./components/case-studies/flobites/Flobites.jsx";

// Asset Imports
import logo1 from "./assets/logo_798.png";
import logo2 from "./assets/logo_889.png";
import logo3 from "./assets/logo_891.png";
import logo4 from "./assets/logo_fb_the.png";
import logo5 from "./assets/logo_brb.png";
import logo6 from "./assets/logo_viali.png";
import logo7 from "./assets/THElogopyro.png"; 
import logo8 from "./assets/jrjplogopyro.png";
import logo9 from "./assets/vnrlogo.png";
import logo10 from "./assets/logo_tog.png";
import service1 from './assets/Thinking face-rafiki.svg';
import service3 from "./assets/13107135_5143310.svg";
import service2 from './assets/Kids Studying from Home-rafiki.svg'
// --- UPDATED Data for Services Section (Based on sketches) ---
const servicesData = [
  {
    title: '"My business is solid. Now I want to bring it online."',
    shortStatement:
      "Isn't this the best time to turn your offline hustle into a digital experience?",
     
    ctaText: "Let's go ",
    Image: service1, // Added image for visual context
  },
  {
    title:
      '"I\'m up and running online, but I\'m not reaching the right audience."',
    shortStatement:
      "Your products is great, no doubt. But have you positioned it right?",
   
    ctaText: "Let's grow ",
    Image: service2, // Added image for visual context
  },
  {
    title:
      '"My company is picking up, and I want to scale without the burnout."',
    shortStatement:
      "You've figured out the fundamentals. How about streaming your operations?",
    ctaText: "Let's optimize ", // Slightly adjusted CTA for clarity
    Image: service3, // Added image for visual context
  },
];

// Data for the animated hero heading
const highlightedWords = ["AI-ready.", "future-proof.", "omnichannel."];

const clientLogos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10];

const openCalendarPopup = () => {
  console.log('Opening calendar popup'); // Add for debugging
  const calendarUrl =
    "https://cal.com/pyrosynergy/founder-audit";
  const popupFeatures = "width=1000,height=700,scrollbars=yes,resizable=yes,location=yes,menubar=no,toolbar=no,status=no";
  
 // Opens in a new tab (or a new window, depending on browser settings)
window.open(calendarUrl, "_blank");
  
  if (!popup || popup.closed || typeof popup.closed == 'undefined') {
    // Popup was blocked, show alternative
    alert('Popup blocked! Please allow popups for this site or visit: ' + calendarUrl);
    // Alternative: open in same tab
    // window.location.href = calendarUrl;
  } else {
    popup.focus();
  }
};

function App() {
  const [isLoading, setIsLoading] = useState(() => {
    // Automatically skips loading screen on staging or local environments
    const isStaging = window.location.hostname.includes('staging') || window.location.hostname.includes('localhost');
    return !isStaging;
  });
  const [isScrolled, setIsScrolled] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Add this line
  const [expandedCardIndex, setExpandedCardIndex] = useState(null); // Add this line
  const navRef = useRef(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [closingCardIndex, setClosingCardIndex] = useState(null);
  const closeTimerRef = useRef(null); // To manage the timeout

  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname;
  // Show header on reality check; hide only on specific pages
  const knownPaths = ['/', '/welcome','/decode', '/realitycheck', '/hiring', '/hiring/copywriter_intern_1', '/hiring/content_intern_1', '/hiring/social_intern_1', '/hiring/videsign_intern_1', '/hiring/uxdesign_intern_1', '/hiring/nocodeweb_intern_1', '/hiring/sales_intern_1', '/hiring/uiuxvd_intern_1', '/policy-pages', '/policy-pages/privacy-policy', '/policy-pages/refund-policy', '/policy-pages/cancellation-policy', '/policy-pages/terms-and-conditions', '/case-studies/flobites'];
  const is404 = !knownPaths.includes(location.pathname);
  const hideHeader = ['/welcome','/hiring', '/hiring/copywriter_intern_1', '/hiring/content_intern_1', '/hiring/social_intern_1', '/hiring/videsign_intern_1', '/hiring/uxdesign_intern_1', '/hiring/nocodeweb_intern_1', '/hiring/sales_intern_1', '/hiring/uiuxvd_intern_1', '/policy-pages/privacy-policy', '/policy-pages/refund-policy', '/policy-pages/cancellation-policy', '/policy-pages/terms-and-conditions'].includes(location.pathname);
  // Hide footer on reality check, hiring, and role-specific intern pages
  const hideFooter = is404 || ['/welcome','/realitycheck', '/hiring', '/policy-pages', '/policy-pages/privacy-policy', '/policy-pages/refund-policy', '/policy-pages/cancellation-policy', '/policy-pages/terms-and-conditions', '/hiring/copywriter_intern_1', '/hiring/content_intern_1', '/hiring/social_intern_1', '/hiring/videsign_intern_1', '/hiring/uxdesign_intern_1', '/hiring/nocodeweb_intern_1', '/hiring/sales_intern_1', '/hiring/uiuxvd_intern_1'].includes(location.pathname);

  // Effect to cycle through the highlighted words
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedIndex(
        (prevIndex) => (prevIndex + 1) % highlightedWords.length
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Add loading effect
  useEffect(() => {
    // Simulate loading time - adjust as needed
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1800); // Reduced from probably 3000-5000ms to 1000ms (1 second)

    // Cleanup
    return () => clearTimeout(loadingTimer);
  }, []);

  // --- EVENT HANDLERS FOR INTERACTIVE SERVICES ---
  const handleCardClick = (index) => {
     // Clear any pending instant-close state if a new card is clicked
    if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
    }
    if (closingCardIndex !== null) {
        setClosingCardIndex(null); // Explicitly turn off the instant-close state for the previous card
    }

    if (expandedCardIndex !== index) {
      setExpandedCardIndex(index);
    }
    // If clicking the already expanded card, the click is on the wrapper behind the modal,
    // which should probably just keep the modal open. The close button handles closing.
  };

  // Wrap handleCloseCard in useCallback to maintain reference stability
  const handleCloseCard = useCallback((e) => {
    if (e) e.stopPropagation(); // Prevents the click from bubbling up to the card's onClick

    // Only trigger close if a card is actually expanded
    if (expandedCardIndex !== null) {
        // Clear any existing timeout before starting a new one
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
        }

        // Set the currently expanded card as the one that should close instantly
        setClosingCardIndex(expandedCardIndex);
        setExpandedCardIndex(null); // This will remove the 'expanded' class from the card

        // Set a timeout to remove the 'closing-instant' class after a minimal delay
        // The delay needs to be just enough for React to render the state change
        closeTimerRef.current = setTimeout(() => {
            setClosingCardIndex(null); // Remove the closing-instant class
            closeTimerRef.current = null; // Clean up the ref
        }, 50); // 50ms should be sufficient for the browser to register the change
    }
  }, [expandedCardIndex]); // Add expandedCardIndex as a dependency
  
  // ======================================================================
  // ========== NEW: EFFECT TO HANDLE BODY SCROLL ON MOBILE MODAL =========
  // ======================================================================
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    // Lock body scroll when loading or when a card is expanded on mobile
    if (isLoading || (expandedCardIndex !== null && isMobile)) {
      document.body.style.overflow = "hidden";
    } else {
      // Otherwise, ensure it's unlocked. Remove the inline override (rather than
      // forcing "auto") so body doesn't become its own scroll container, which
      // breaks position:sticky for descendants relying on the page scroll.
      document.body.style.overflow = "";
    }
    // Cleanup function to ensure scroll is always restored on component unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [expandedCardIndex, isLoading]); // Add isLoading to dependencies
  // ======================================================================

  // Click handler for mobile nav links
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };


  // General useEffect Hooks
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Always show at the top of the page
    if (currentScrollY < 50) {
      setIsScrolled(true);
    }
    // Scrolling UP -> show navbar
    else if (currentScrollY < lastScrollY) {
      setIsScrolled(true);
    }
    // Scrolling DOWN -> hide navbar
    else {
      setIsScrolled(false);
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  // Handle escape key to close expanded card
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        if (expandedCardIndex !== null) { // Only close if a card is expanded
             handleCloseCard(event); // Use the modified handler
        }
      }
    };
    // The useEffect now has a stable reference to handleCloseCard
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [expandedCardIndex, handleCloseCard]);

  // Add navigation handler
  const handleNavigateToQuestionnaire = () => {
    navigate('/decode');
  };

  const handleNavigateToHome = () => {
    navigate('/');
  };

  return (
    <div className="App">
      {/* Loading Screen */}
      {isLoading && <Loading />}

      {/* Main Content */}
      <div className={isLoading ? 'main-content-hidden' : 'main-content-visible'}>
        {!hideHeader && (
          <Header 
            isScrolled={isScrolled}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            navRef={navRef}
            handleLinkClick={handleLinkClick}
            currentPage={currentPage} // Add this line
            handleNavigateToHome={handleNavigateToHome} // Add this line
            openCalendarPopup={openCalendarPopup}
          />
        )}
        <Routes>
          <Route path="/realitycheck" element={<Questionnaire />} />
          <Route path="/decode" element={<DecodeQuestionnaire/>} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/hiring" element={<Hiring />} />
          <Route path="/hiring/copywriter_intern_1" element={<Copywriter />} />
          <Route path="/hiring/videsign_intern_1" element={<VisualDesigner />} />
          <Route path="/hiring/uxdesign_intern_1" element={<UXDesigner />} />
          <Route path="/hiring/nocodeweb_intern_1" element={<NoCodeWeb />} />
          <Route path="/hiring/sales_intern_1" element={<SalesIntern />} />
          <Route path="/hiring/content_intern_1" element={<Navigate to="/hiring" replace />} />
          <Route path="/hiring/social_intern_1" element={<SocialIntern />} />
          <Route path="/hiring/uiuxvd_intern_1" element={<UIUXVDIntern />} />
          <Route path="/policy-pages" element={<PolicyPages />} />
          <Route path="/policy-pages/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/policy-pages/refund-policy" element={<RefundPolicy />} />
          <Route path="/policy-pages/cancellation-policy" element={<CancellationPolicy />} />
          <Route path="/policy-pages/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/case-studies/flobites" element={<Flobites />} />
          <Route path="/" element={
            <>
              <Hero
                highlightedWords={highlightedWords}
                highlightedIndex={highlightedIndex}
                clientLogos={clientLogos}
                openCalendarPopup={openCalendarPopup}
              />
  
              <WhyUs />
              <Testimonials />
              <Banner />

              <PyroStack
                openCalendarPopup={openCalendarPopup}
                handleNavigateToQuestionnaire={handleNavigateToQuestionnaire}
              />        
              <Founder />
              <EmpathyBanner />
              <FAQ openCalendarPopup={openCalendarPopup} />
              
              <Contact />
            </>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
  {!hideFooter && <Footer openCalendarPopup={openCalendarPopup} />}
      </div>
    </div>
  );
}

export default App;