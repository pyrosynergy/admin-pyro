import React, { useState, useEffect, useRef, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import "./App.css";

// Component imports
import Header from "./components/Header/Header.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Services from "./components/Services/Services.jsx";
// import About from "./components/About/About"; // Add this import
import Contact from "./components/Contact/Contact.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Questionnaire from "./components/Questionnaire/Questionnaire.jsx";
import Loading from "./components/Loading/Loading.jsx"; // Add this import
import Welcome from "./components/Welcome/Welcome.jsx"; // Add this import

// Asset Imports
import logo1 from "./assets/viali.png";
import logo3 from "./assets/mih.png";
import logo5 from "./assets/riMLand.png";
import logo7 from "./assets/gro vnr.png";
import logo8 from "./assets/nasa.png";
import logo9 from "./assets/recens_logo.png";
import logo10 from "./assets/acm.png";
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

const clientLogos = [logo1, logo3, logo5, logo7, logo8, logo9, logo10];

const openCalendarPopup = () => {
  console.log('Opening calendar popup'); // Add for debugging
  const calendarUrl =
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0iZ6GBUpEp6xEXcYQ0wZLryUc6bprkId2iHVJjJF88E3JTJGM917FiwtH6mwtuwUuyOVr2Whwm?gv=true";
  const popupFeatures = "width=1000,height=700,scrollbars=yes,resizable=yes,location=yes,menubar=no,toolbar=no,status=no";
  
  // Check if popup is blocked
  const popup = window.open(calendarUrl, "googleCalendarPopup", popupFeatures);
  
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
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname === '/realitycheck' ? 'questionnaire' : 'home';

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
    }, 1800);

    // Cleanup
    return () => clearTimeout(loadingTimer);
  }, []);

  // Click handler for mobile nav links
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Form Submission Handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("Submitting...");
    if (!email || !message) {
      setFormStatus("❌ Please fill in both fields.");
      return;
    }
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxfJZIHACfhDoy9ZtKBdi-vIgO0vFqVGdP3VpmvdSXtHVuJUHYlNDpUYUPzxLSCysVyHA/exec",
        {
          method: "POST",
          body: JSON.stringify({ email, message }),
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
        }
      );
      setFormStatus("🚀 Message sent! We will get back to you soon.");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Form submission network error: ", error);
      setFormStatus(`❌ A network error occurred. Please try again.`);
    }
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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (formStatus) {
      const timer = setTimeout(() => setFormStatus(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  // Add navigation handler
  const handleNavigateToQuestionnaire = () => {
    navigate('/realitycheck');
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
        {location.pathname !== '/welcome' && (
          <Header 
            isScrolled={isScrolled}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            navRef={navRef}
            handleLinkClick={handleLinkClick}
            currentPage={currentPage} // Add this line
            handleNavigateToHome={handleNavigateToHome} // Add this line
          />
        )}
        <Routes>
          <Route path="/realitycheck" element={<Questionnaire />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/" element={
            <>
              <Hero 
                highlightedWords={highlightedWords}
                highlightedIndex={highlightedIndex}
                clientLogos={clientLogos}
                openCalendarPopup={openCalendarPopup}
                handleNavigateToQuestionnaire={handleNavigateToQuestionnaire}
              />
  
              <Services 
                servicesData={servicesData}
                openCalendarPopup={openCalendarPopup}
              />
  
              
  
              <Contact 
                formStatus={formStatus}
                setFormStatus={setFormStatus}
              />
            </>
          } />
        </Routes>
        {location.pathname !== '/realitycheck' && location.pathname !== '/welcome' && <Footer />}
      </div>
    </div>
  );
}

export default App;