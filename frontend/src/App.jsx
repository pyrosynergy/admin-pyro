import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import "./App.css";

// --- Eager imports: chrome + above-the-fold homepage content (part of the entry chunk) ---
import Header from "./components/Header/Header.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Services from "./components/Services/Services.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Footer from "./components/Footer/Footer.jsx";
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
import NotFound from "./components/NotFound/NotFound.jsx";
import Admin from "./components/Admin/Admin.jsx";
import Verify from "./components/Verify/Verify.jsx";

// Tokenised admin route — not linked from anywhere; /admin itself 404s.
// Override per deployment with VITE_ADMIN_PATH (must start with "/").
const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH || "/ROrnJSKyI6TTf4q1xnrNWmgd";

// Asset Imports
import logo1 from "./assets/logo_798.webp";
import logo2 from "./assets/logo_889.webp";
import logo3 from "./assets/logo_891.webp";
import logo4 from "./assets/logo_fb_the.webp";
import logo5 from "./assets/logo_brb.webp";
import logo6 from "./assets/logo_viali.webp";
import logo7 from "./assets/THElogopyro.webp"; 
import logo8 from "./assets/jrjplogopyro.webp";
import logo9 from "./assets/vnrlogo.webp";
import logo10 from "./assets/logo_tog.webp";

// Data for the animated hero heading
const highlightedWords = ["AI-ready.", "future-proof.", "omnichannel."];

const clientLogos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10];

// --- Single source of truth for route chrome + per-page metadata ---
// `header`/`footer` replace the three hand-maintained path arrays this file used
// to carry; `meta` drives the <SEO> tag rendered for each route.
const ROUTES = {
  '/': { header: true, footer: true },
  '/realitycheck': {
    header: true,
    footer: false,
    meta: {
      title: 'Reality Check — PyroSynergy',
      description: 'Take the PyroSynergy reality check and find out where your business actually stands before you scale.',
    },
  },
  '/decode': {
    header: true,
    footer: true,
    meta: {
      title: 'Decode Your Business — PyroSynergy',
      description: 'Answer a few questions and get a clear read on the gaps between where your business is and where you want it to go.',
    },
  },
  '/welcome': {
    header: false,
    footer: false,
    meta: {
      title: 'Welcome — PyroSynergy',
      description: 'Welcome to PyroSynergy.',
      noindex: true,
    },
  },
  '/hiring': {
    header: false,
    // Renders the shared site Footer. This page used to ship its own
    // HiringFooter, a fork that had drifted behind the main one.
    footer: true,
    meta: {
      title: 'Careers & Internships — PyroSynergy',
      description: 'Open internship and full-time roles at PyroSynergy. Work on real growth problems for founders across 12+ industries.',
    },
  },
  '/hiring/copywriter_intern_1': {
    header: false,
    footer: false,
    meta: {
      title: 'Copywriter Intern — Careers at PyroSynergy',
      description: 'Join PyroSynergy as a Copywriter Intern and write the words that move founders, brands and their audiences.',
    },
  },
  '/hiring/videsign_intern_1': {
    header: false,
    footer: false,
    meta: {
      title: 'Visual Designer Intern — Careers at PyroSynergy',
      description: 'Join PyroSynergy as a Visual Designer Intern and shape the visual identity of growing brands.',
    },
  },
  '/hiring/uxdesign_intern_1': {
    header: false,
    footer: false,
    meta: {
      title: 'UX Designer Intern — Careers at PyroSynergy',
      description: 'Join PyroSynergy as a UX Designer Intern and design experiences that turn visitors into customers.',
    },
  },
  '/hiring/nocodeweb_intern_1': {
    header: false,
    footer: false,
    meta: {
      title: 'No-Code Web Intern — Careers at PyroSynergy',
      description: 'Join PyroSynergy as a No-Code Web Intern and ship fast, polished websites for founder-led brands.',
    },
  },
  '/hiring/sales_intern_1': {
    header: false,
    footer: false,
    meta: {
      title: 'Sales Intern — Careers at PyroSynergy',
      description: 'Join PyroSynergy as a Sales Intern and learn founder-level outreach, positioning and closing.',
    },
  },
  '/hiring/content_intern_1': { header: false, footer: false },
  '/hiring/social_intern_1': {
    header: false,
    footer: false,
    meta: {
      title: 'Social Media Intern — Careers at PyroSynergy',
      description: 'Join PyroSynergy as a Social Media Intern and grow real audiences for real businesses.',
    },
  },
  '/hiring/uiuxvd_intern_1': {
    header: false,
    footer: false,
    meta: {
      title: 'UI/UX & Visual Design Intern — Careers at PyroSynergy',
      description: 'Join PyroSynergy as a UI/UX & Visual Design Intern and own design end to end, from wireframe to launch.',
    },
  },
  '/policy-pages': {
    header: true,
    footer: false,
    meta: {
      title: 'Policies — PyroSynergy',
      description: 'Privacy, refund, cancellation and terms of service policies for PyroSynergy.',
    },
  },
  '/policy-pages/privacy-policy': {
    header: false,
    footer: false,
    meta: {
      title: 'Privacy Policy — PyroSynergy',
      description: 'How PyroSynergy collects, uses and protects your personal data.',
    },
  },
  '/policy-pages/refund-policy': {
    header: false,
    footer: false,
    meta: {
      title: 'Refund Policy — PyroSynergy',
      description: 'PyroSynergy refund terms and eligibility.',
    },
  },
  '/policy-pages/cancellation-policy': {
    header: false,
    footer: false,
    meta: {
      title: 'Cancellation Policy — PyroSynergy',
      description: 'PyroSynergy cancellation terms for engagements and subscriptions.',
    },
  },
  '/policy-pages/terms-and-conditions': {
    header: false,
    footer: false,
    meta: {
      title: 'Terms & Conditions — PyroSynergy',
      description: 'The terms governing your use of PyroSynergy services.',
    },
  },
  '/case-studies/flobites': {
    header: true,
    footer: true,
    meta: {
      title: 'Flobites Case Study — PyroSynergy',
      description: 'How PyroSynergy helped Flobites sharpen its positioning, rebuild its digital experience and reach the right audience.',
    },
  },
  '/case-studies': {
    header: true,
    footer: true,
    meta: {
      title: 'Case Studies — PyroSynergy',
      description: 'How PyroSynergy helps early-stage founders turn strategy into execution — the work, the decisions and the results.',
    },
  },
  '/case-studies/viali': {
    header: true,
    footer: true,
    meta: {
      title: 'Viali Hair Care Case Study — PyroSynergy',
      description: 'How PyroSynergy helped Viali Hair Care grow its social reach and bring down customer acquisition cost.',
    },
  },
  // Admin console: renders its own Header, so the global chrome stays off, and
  // it must never be indexed. /verify/:token is deliberately absent — it is a
  // dynamic path, so it falls through to the no-chrome default below.
  [ADMIN_PATH]: {
    header: false,
    footer: false,
    meta: {
      title: 'Admin — PyroSynergy',
      description: 'PyroSynergy internal admin console.',
      noindex: true,
    },
  },
};

const NOT_FOUND_META = {
  title: 'Page Not Found — PyroSynergy',
  description: 'The page you are looking for does not exist.',
  noindex: true,
};

/** Wraps a route element with its per-page metadata. */
const Page = ({ path, children }) => {
  const meta = ROUTES[path]?.meta;
  return (
    <>
      {meta && <SEO path={path} {...meta} />}
      {children}
    </>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(() => {
    // Automatically skips loading screen on staging or local environments
    const isStaging = window.location.hostname.includes('staging') || window.location.hostname.includes('localhost');
    return !isStaging;
  });
  const [isScrolled, setIsScrolled] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Add this line
  const navRef = useRef(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname;
  // Show header on reality check; hide only on specific pages
  const knownPaths = ['/', '/welcome', '/realitycheck', '/decode', ADMIN_PATH, '/hiring', '/hiring/copywriter_intern_1', '/hiring/content_intern_1', '/hiring/social_intern_1', '/hiring/videsign_intern_1', '/hiring/uxdesign_intern_1', '/hiring/nocodeweb_intern_1', '/hiring/sales_intern_1', '/hiring/uiuxvd_intern_1', '/policy-pages', '/policy-pages/privacy-policy', '/policy-pages/refund-policy', '/policy-pages/cancellation-policy', '/policy-pages/terms-and-conditions'];
  // /verify/:token is dynamic, so it can't be listed in knownPaths
  const isVerifyPage = location.pathname.startsWith('/verify/');
  const is404 = !knownPaths.includes(location.pathname) && !isVerifyPage;
  const hideHeader = isVerifyPage || ['/welcome', ADMIN_PATH, '/hiring', '/hiring/copywriter_intern_1', '/hiring/content_intern_1', '/hiring/social_intern_1', '/hiring/videsign_intern_1', '/hiring/uxdesign_intern_1', '/hiring/nocodeweb_intern_1', '/hiring/sales_intern_1', '/hiring/uiuxvd_intern_1', '/policy-pages/privacy-policy', '/policy-pages/refund-policy', '/policy-pages/cancellation-policy', '/policy-pages/terms-and-conditions'].includes(location.pathname);
  // Hide footer on reality check, hiring, and role-specific intern pages
  const hideFooter = is404 || isVerifyPage || ['/welcome', '/decode', '/realitycheck', ADMIN_PATH, '/hiring', '/policy-pages', '/policy-pages/privacy-policy', '/policy-pages/refund-policy', '/policy-pages/cancellation-policy', '/policy-pages/terms-and-conditions', '/hiring/copywriter_intern_1', '/hiring/content_intern_1', '/hiring/social_intern_1', '/hiring/videsign_intern_1', '/hiring/uxdesign_intern_1', '/hiring/nocodeweb_intern_1', '/hiring/sales_intern_1', '/hiring/uiuxvd_intern_1'].includes(location.pathname);

  // Effect to cycle through the highlighted words
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedIndex(
        (prevIndex) => (prevIndex + 1) % highlightedWords.length
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Dismiss the loading screen as soon as the page has actually finished loading,
  // rather than after a fixed delay. The timeout is only a safety cap so a slow
  // third-party asset can never hold the splash screen up indefinitely.
  useEffect(() => {
    if (!isLoading) return;

    const done = () => setIsLoading(false);

    if (document.readyState === "complete") {
      done();
      return;
    }

    const capTimer = setTimeout(done, 1800);
    window.addEventListener("load", done);

    return () => {
      clearTimeout(capTimer);
      window.removeEventListener("load", done);
    };
  }, [isLoading]);

  // Lock body scroll while the loading screen is up. Remove the inline override
  // (rather than forcing "auto") so body doesn't become its own scroll container,
  // which breaks position:sticky for descendants relying on the page scroll.
  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

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

  // Hide/show the navbar on scroll. Throttled to one state update per animation
  // frame and registered as passive so it never blocks scrolling.
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const update = () => {
      const currentScrollY = window.scrollY;

      // Show at the top of the page, or when scrolling up; hide when scrolling down.
      setIsScrolled(currentScrollY < 50 || currentScrollY < lastScrollY);

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add navigation handler
  const handleNavigateToQuestionnaire = () => {
    navigate('/decode');
  };

  const handleNavigateToHome = () => {
    navigate('/');
  };

  return (
    <div className="App">
      {/* Resets scroll on route change; skips hash links. Renders nothing. */}
      <ScrollToTop />

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
        <RouteErrorBoundary resetKey={location.pathname}>
        <Suspense fallback={<div className="route-fallback" aria-busy="true" />}>
        <Routes>
          <Route path="/decode" element={<Questionnaire />} />
          <Route path="/realitycheck" element={<Navigate to="/decode" replace />} />
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
          <Route path={ADMIN_PATH} element={<Admin />} />
          <Route path="/verify/:token" element={<Verify />} />
          <Route path="/" element={
            <>
              <SEO
                title="PyroSynergy — Growth Partners for Founders"
                description="Dealing your businesses with empathy, right from strategy to AI. We help founders break down complex problems, lay strong foundations, and execute seamlessly."
                path="/"
              />
              <Hero
                highlightedWords={highlightedWords}
                highlightedIndex={highlightedIndex}
                clientLogos={clientLogos}
                openCalendarPopup={openCalendarPopup}
              />

              <WhyUs />
              <Banner />
              <Testimonials />


              <Founder />
              <PyroStack
                openCalendarPopup={openCalendarPopup}
                handleNavigateToQuestionnaire={handleNavigateToQuestionnaire}
              />
              {/* One gradient across both — see .empathy-faq-panel in App.css */}
              <div className="empathy-faq-panel">
                <EmpathyBanner />
                <FAQ openCalendarPopup={openCalendarPopup} />
              </div>

              <Contact />
            </>
          } />
          <Route path="*" element={<><SEO path={location.pathname} {...NOT_FOUND_META} /><NotFound /></>} />
        </Routes>
        </Suspense>
        </RouteErrorBoundary>
  {!hideFooter && <Footer openCalendarPopup={openCalendarPopup} />}
      </div>
    </div>
  );
}

export default App;