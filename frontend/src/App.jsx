import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import "./App.css";

// --- Eager imports: chrome + above-the-fold homepage content (part of the entry chunk) ---
import Header from "./components/Header/Header.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Loading from "./components/Loading/Loading.jsx";
import SEO from "./components/SEO/SEO.jsx";
// Renders null — kept eager since lazy-loading a scroll-reset would defeat it.
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import { openCalendarPopup } from "./lib/calendar.js";
// Must be eager: it exists to catch lazy chunks failing to load.
import RouteErrorBoundary from "./components/RouteErrorBoundary/RouteErrorBoundary.jsx";

// --- Lazy: below-the-fold homepage sections ---
const WhyUs = lazy(() => import("./components/why-us/WhyUs.jsx"));
const Banner = lazy(() => import("./components/banner/banner.jsx"));
const Testimonials = lazy(() => import("./components/testimonials/Testimonials.jsx"));
const PyroStack = lazy(() => import("./components/pyrostack/PyroStack.jsx"));
const Founder = lazy(() => import("./components/Founder/Founder.jsx"));
const EmpathyBanner = lazy(() => import("./components/EmpathyBanner/EmpathyBanner.jsx"));
const FAQ = lazy(() => import("./components/FAQ/FAQ.jsx"));
const Contact = lazy(() => import("./components/Contact/Contact.jsx"));

// --- Lazy: separate routes, each becomes its own chunk ---
const DecodeQuestionnaire = lazy(() => import("./components/DecodeQuestionnaire/DecodeQuestionnaire.jsx"));
const Questionnaire = lazy(() => import("./components/Questionnaire/Questionnaire.jsx"));
const Welcome = lazy(() => import("./components/Welcome/Welcome.jsx"));
const Hiring = lazy(() => import("./components/Hiring/Hiring.jsx"));
const Copywriter = lazy(() => import("./components/Hiring/Copywriter.jsx"));
const VisualDesigner = lazy(() => import("./components/Hiring/VisualDesigner.jsx"));
const UXDesigner = lazy(() => import("./components/Hiring/UXDesigner.jsx"));
const NoCodeWeb = lazy(() => import("./components/Hiring/NoCodeWeb.jsx"));
const SalesIntern = lazy(() => import("./components/Hiring/SalesIntern.jsx"));
const SocialIntern = lazy(() => import("./components/Hiring/SocialIntern.jsx"));
const UIUXVDIntern = lazy(() => import("./components/Hiring/UIUXVDIntern.jsx"));
const PolicyPages = lazy(() => import("./components/PolicyPages/PolicyPages.jsx"));
const PrivacyPolicy = lazy(() => import("./components/PolicyPages/PrivacyPolicy.jsx"));
const RefundPolicy = lazy(() => import("./components/PolicyPages/RefundPolicy.jsx"));
const CancellationPolicy = lazy(() => import("./components/PolicyPages/CancellationPolicy.jsx"));
const TermsAndConditions = lazy(() => import("./components/PolicyPages/TermsAndConditions.jsx"));
const NotFound = lazy(() => import("./components/NotFound/NotFound.jsx"));
const Flobites = lazy(() => import("./components/case-studies/flobites/Flobites.jsx"));
const Viali = lazy(() => import("./components/case-studies/viali/Viali.jsx"));
const CaseStudies = lazy(() => import("./components/case-studies/CaseStudies.jsx"));
const Admin = lazy(() => import("./components/Admin/Admin.jsx"));
const Verify = lazy(() => import("./components/Verify/Verify.jsx"));

// The admin console lives behind an unguessable path rather than a linked one.
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
  // Header/footer visibility now comes from the ROUTES config above rather than
  // three separate hand-maintained path arrays. Unknown paths render the 404,
  // which shows neither.
  const route = ROUTES[location.pathname];
  const is404 = !route;
  const hideHeader = is404 || !route.header;
  const hideFooter = is404 || !route.footer;

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
          <Route path="/realitycheck" element={<Page path="/realitycheck"><Questionnaire /></Page>} />
          <Route path="/decode" element={<Page path="/decode"><DecodeQuestionnaire /></Page>} />
          <Route path="/welcome" element={<Page path="/welcome"><Welcome /></Page>} />
          <Route path="/hiring" element={<Page path="/hiring"><Hiring /></Page>} />
          <Route path="/hiring/copywriter_intern_1" element={<Page path="/hiring/copywriter_intern_1"><Copywriter /></Page>} />
          <Route path="/hiring/videsign_intern_1" element={<Page path="/hiring/videsign_intern_1"><VisualDesigner /></Page>} />
          <Route path="/hiring/uxdesign_intern_1" element={<Page path="/hiring/uxdesign_intern_1"><UXDesigner /></Page>} />
          <Route path="/hiring/nocodeweb_intern_1" element={<Page path="/hiring/nocodeweb_intern_1"><NoCodeWeb /></Page>} />
          <Route path="/hiring/sales_intern_1" element={<Page path="/hiring/sales_intern_1"><SalesIntern /></Page>} />
          <Route path="/hiring/content_intern_1" element={<Navigate to="/hiring" replace />} />
          <Route path="/hiring/social_intern_1" element={<Page path="/hiring/social_intern_1"><SocialIntern /></Page>} />
          <Route path="/hiring/uiuxvd_intern_1" element={<Page path="/hiring/uiuxvd_intern_1"><UIUXVDIntern /></Page>} />
          <Route path="/policy-pages" element={<Page path="/policy-pages"><PolicyPages /></Page>} />
          <Route path="/policy-pages/privacy-policy" element={<Page path="/policy-pages/privacy-policy"><PrivacyPolicy /></Page>} />
          <Route path="/policy-pages/refund-policy" element={<Page path="/policy-pages/refund-policy"><RefundPolicy /></Page>} />
          <Route path="/policy-pages/cancellation-policy" element={<Page path="/policy-pages/cancellation-policy"><CancellationPolicy /></Page>} />
          <Route path="/policy-pages/terms-and-conditions" element={<Page path="/policy-pages/terms-and-conditions"><TermsAndConditions /></Page>} />
          <Route path="/case-studies" element={<Page path="/case-studies"><CaseStudies /></Page>} />
          <Route path="/case-studies/flobites" element={<Page path="/case-studies/flobites"><Flobites /></Page>} />
          <Route path="/case-studies/viali" element={<Page path="/case-studies/viali"><Viali /></Page>} />
          <Route path={ADMIN_PATH} element={<Page path={ADMIN_PATH}><Admin /></Page>} />
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