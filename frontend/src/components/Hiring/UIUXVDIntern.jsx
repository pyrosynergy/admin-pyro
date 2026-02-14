import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Copywriter.css";
import HiringFooter from "./HiringFooter";

const UIUXVDIntern = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const content = `UI/UX & Visual Designer Intern
Internship Details
Start Date: Immediately
Type: ₹5000/month
Minimum Duration: 3 months (extendable based on performance)
Work Mode: Remote-first; hybrid from Hyderabad, India, is a plus
Culture & Expectations: Flexible hours, deadline-driven
NOTE: Apply only if you're comfortable with a fast-paced and dynamic structure, looking for serious experience, learning, and growth.

About PyroSynergy
PyroSynergy helps early-stage founders build meaningful brands with strategy, clarity, AI, and empathy. We believe every project should begin with understanding of users, of founders, and of the story behind the product.
As a UI/UX & Visual Designer, you'll sit at the intersection of user experience, interface design, and visual communication. You'll craft intuitive journeys and emotionally resonant brand expressions — from wireframes and design systems to motion graphics and AI-assisted creatives. Your work will directly shape how founders present their products to the world, with empathy guiding every decision.


What You'll Do
1. UX & Interface Design
Create wireframes, user flows, and high-fidelity interfaces that make complex journeys feel natural and intuitive
Conduct lightweight UX research through competitive analysis, heuristic evaluations, user behaviour insights, and requirement breakdowns to inform design decisions
Build structured, organised Figma files suitable for both code-based and non-code-based (e.g., Figma to Studio plugin) development — with proper layer naming, auto-layout, responsive framing, grids, and component structuring
Collaborate with the No-Code Web Dev team to ensure studio-ready outputs
Use generative AI tools to ideate, generate design variations, and accelerate workflows


2. Visual & Motion Design
Design posts, carousels, marketing creatives, and lightweight animations for brand and social media
Create simple to intermediate motion graphics and micro-animations for social media using tools like After Effects, Premiere Pro, Figma Smart Animate, or AI-based animation generators
Apply visual hierarchy, layout clarity, colour theory, and typographic principles to produce aesthetically precise brand outputs
Use AI generative tools (Gemini Veo, SeedDance, Kling, etc. for videos, and Gemini Nano Banana, OpenAI, etc. for photos) to ideate and generate visual assets
Collaborate with content writers and UI/UX teammates to create cohesive, on-brand deliverables


Required Skills
Design & Research Foundations
Strong Figma proficiency — component systems, auto-layout, file structuring for plugin compatibility
Solid UX foundations: heuristics, information architecture, user flows, and design patterns
Ability to conduct basic UX research: analysing competitors, identifying usability issues, interpreting user needs, and converting findings into actionable design inputs
Empathy-driven design thinking — understanding user mental models, accessibility, micro-interactions, and emotional design


Visual Communication & Motion
Proficient in layout fundamentals — visual hierarchy, readability, balance, and colour
Ability to create basic motion graphics or micro-animations for posts, reels, or website elements
Good knowledge of UI/UX foundations applied to visual design decisions
Experience using AI generative tools (Gemini, SeedDance, Kling) for creative asset production
Empathetic understanding of user perception, emotional cues, and visual accessibility


Mindset & Soft Skills
An entrepreneurial, empathy-first mindset with a strong sense of ownership — treating tasks and outcomes as if they were your own
Ability to adopt feedback quickly and iterate with speed
Ability to articulate design decisions clearly to collaborators and stakeholders


Good-to-Have
Experience with AI design workflows and AI-assisted UI/UX processes
Experience working with no-code web designers (Webflow, Wix Studio, Framer, etc.)
Adobe Suite knowledge — Photoshop, Illustrator, After Effects, Premiere Pro
Familiarity with AI image/video generation tools beyond those listed
Knowledge of branding principles and visual identity systems
Experience with prototyping tools beyond Figma
Knowledge of motion design principles and storytelling through animation


What You'll Gain
Real-world experience building interfaces and brand visuals for early-stage startups
Hands-on practice with state-of-the-art AI generation and design tools
Learn how design, branding, motion, and development integrate in production workflows
Exposure to startup design strategy and client-facing project environments
Opportunity to lead small design projects independently
Potential extension or future collaboration based on performance


Internship Details
Start Date: Immediately
Type: ₹5000/month
Minimum Duration: 3 months (extendable based on performance)
Work Mode: Remote-first (hybrid from Hyderabad, India is a plus)
Culture & Expectations: Flexible hours, deadline-driven
NOTE: Apply only if you're comfortable with a fast-paced and dynamic structure, looking for serious experience, learning, and growth.


How to Apply
Send your resume + portfolio link along with your mobile number to py@pyrosynergy.com with subject line: "UI/UX & VD Intern/Your Name".
We'll only go through eye-catching portfolios that show an emotion and tell a story through your design. If qualified, you'll receive a follow-up email with instructions for the assignment round and interview process within one week.`;

  const headingSet = new Set([
    "UI/UX & Visual Designer Intern",
    "Internship Details",
    "About PyroSynergy",
    "What You'll Do",
    "1. UX & Interface Design",
    "2. Visual & Motion Design",
    "Required Skills",
    "Design & Research Foundations",
    "Visual Communication & Motion",
    "Mindset & Soft Skills",
    "Good-to-Have",
    "What You'll Gain",
    "How to Apply",
  ]);

  const bulletPointSections = new Set([
    "1. UX & Interface Design",
    "2. Visual & Motion Design",
    "Design & Research Foundations",
    "Visual Communication & Motion",
    "Mindset & Soft Skills",
    "Good-to-Have",
    "What You'll Gain",
  ]);

  const boldPatterns = [
    { regex: /^(Start Date:|Type:|Minimum Duration:|Work Mode:|Culture & Expectations:)/, className: 'role-label' },
  ];

  const highlightTokens = (text) => {
    const tokens = [
      "py@pyrosynergy.com",
      '"UI/UX & VD Intern/Your Name"',
      "₹5000/month",
    ];
    let remaining = text;
    const parts = [];
    let k = 0;
    while (remaining && remaining.length > 0) {
      let nextIndex = -1;
      let foundToken = null;
      for (const t of tokens) {
        const i = remaining.indexOf(t);
        if (i !== -1 && (nextIndex === -1 || i < nextIndex)) {
          nextIndex = i;
          foundToken = t;
        }
      }
      if (nextIndex === -1) {
        parts.push(remaining);
        break;
      }
      if (nextIndex > 0) {
        parts.push(remaining.slice(0, nextIndex));
      }
      if (foundToken === "₹5000/month") {
        parts.push(<span key={`paid-${k++}`} className="role-highlight-paid">{foundToken}</span>);
      } else {
        parts.push(<strong key={`emph-${k++}`} className="role-emph">{foundToken}</strong>);
      }
      remaining = remaining.slice(nextIndex + (foundToken?.length || 0));
    }
    return parts.length ? parts : text;
  };

  const formatLine = (line) => {
    for (const pattern of boldPatterns) {
      const match = line.match(pattern.regex);
      if (match) {
        const label = match[1] || match[0];
        const rest = line.substring(label.length);
        return (
          <>
            <strong className={pattern.className}>{label}</strong>
            {highlightTokens(rest)}
          </>
        );
      }
    }
    
    // Handle **text** markdown bold syntax
    const boldMarkdownRegex = /\*\*(.+?)\*\*/g;
    if (boldMarkdownRegex.test(line)) {
      const parts = [];
      let lastIndex = 0;
      const matches = line.matchAll(/\*\*(.+?)\*\*/g);
      
      for (const match of matches) {
        if (match.index > lastIndex) {
          parts.push(highlightTokens(line.substring(lastIndex, match.index)));
        }
        parts.push(<strong key={`bold-${match.index}`}>{match[1]}</strong>);
        lastIndex = match.index + match[0].length;
      }
      
      if (lastIndex < line.length) {
        parts.push(highlightTokens(line.substring(lastIndex)));
      }
      
      return parts;
    }
    
    return highlightTokens(line);
  };

  const lines = content.split("\n");

  return (
    <section className="role-section">
      <button
        className="role-back-button"
        type="button"
        aria-label="Back to all openings"
        onClick={() => navigate("/hiring")}
      >
        <span className="role-back-icon" aria-hidden="true">↩</span>
      </button>
      <div className="role-container">
        <div className="role-card">
          <div className="role-text">
            {lines.map((line, idx) => {
              const trimmed = line.trim();
              if (headingSet.has(trimmed)) {
                const isMainHeading = trimmed === "UI/UX & Visual Designer Intern";
                const isAboutHeading = trimmed === "About PyroSynergy";
                if (isAboutHeading) {
                  return (
                    <div key={idx} className="role-heading">
                      {"About "}
                      <span className="role-heading-brand">{"PyroSynergy"}</span>
                    </div>
                  );
                }
                return (
                  <>
                    <div key={idx} className={`role-heading${isMainHeading ? " role-heading-main" : ""}`}>{line}</div>
                    {isMainHeading && <div className="role-posted-date">Posted on 14th February 2026</div>}
                  </>
                );
              }
              if (trimmed.startsWith("NOTE:")) {
                const label = "NOTE:";
                const rest = line.substring(label.length);
                return (
                  <div key={idx} className="role-note">
                    <strong className="role-note-label">{label}</strong>
                    <span className="role-note-text">{rest}</span>
                  </div>
                );
              }
              if (trimmed === "") {
                return <div key={idx} className="role-spacer" aria-hidden="true"></div>;
              }

              let currentSection = null;
              for (let i = idx - 1; i >= 0; i--) {
                const prevLine = lines[i].trim();
                if (headingSet.has(prevLine)) {
                  currentSection = prevLine;
                  break;
                }
              }

              const isBulletLine = bulletPointSections.has(currentSection) &&
                                   trimmed.length > 10 &&
                                   !trimmed.startsWith("Start Date:") &&
                                   !trimmed.startsWith("Type:") &&
                                   !trimmed.startsWith("Minimum Duration:") &&
                                   !trimmed.startsWith("Work Mode:") &&
                                   !trimmed.startsWith("Culture & Expectations:");

              const isParagraph = trimmed.length > 80 && !isBulletLine;

              if (isBulletLine) {
                return (
                  <div key={idx} className="role-bullet-item">
                    <span className="role-bullet">•</span>
                    <span>{formatLine(line)}</span>
                  </div>
                );
              }

              return (
                <div key={idx} className={isParagraph ? "role-paragraph" : "role-line"}>
                  {formatLine(line)}
                </div>
              );
            })}
          </div>

          <div className="role-cta-wrap">
            <div className="role-cta-dropdown-container" ref={dropdownRef}>
              <button
                className="role-cta"
                onClick={() => setShowDropdown(!showDropdown)}
                aria-label="Apply Now"
              >
                Apply Now
              </button>
              {showDropdown && (
                <div className="role-cta-dropdown">
                  <button
                    className="role-cta-dropdown-item"
                    onClick={() => {
                      navigator.clipboard.writeText('py@pyrosynergy.com');
                      setShowCopied(true);
                      setShowDropdown(false);
                      setTimeout(() => setShowCopied(false), 2000);
                    }}
                  >
                    Copy Email
                  </button>
                  <button
                    className="role-cta-dropdown-item"
                    onClick={() => {
                      const url = isMobile ? "mailto:py@pyrosynergy.com" : "https://mail.google.com/mail/?view=cm&fs=1&to=py@pyrosynergy.com";
                      window.open(url, isMobile ? "_self" : "_blank");
                      setShowDropdown(false);
                    }}
                  >
                    Open
                  </button>
                </div>
              )}
              {showCopied && (
                <div className="role-copy-notification">Copied to clipboard</div>
              )}
            </div>
            <a
              className="role-cta role-cta-secondary"
              href="/hiring"
              aria-label="Explore other roles"
            >
              Explore other roles
            </a>
          </div>
        </div>
      </div>
      <HiringFooter />
    </section>
  );
};

export default UIUXVDIntern;
