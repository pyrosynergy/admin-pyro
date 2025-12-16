import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Copywriter.css";
import HiringFooter from "./HiringFooter";

const Copywriter = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // preserve original scroll behaviour only
    window.scrollTo(0, 0);

    // Detect mobile device
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

  // No handler required; we link directly to Gmail compose

  // Keep the exact content as a single source of truth
  const content = `Copywriter Intern
Internship Details
Start Date: January 2026 onwards
Type: Unpaid + performance-based bonuses and opportunities for paid client work
Minimum Duration: 3 months (extendable based on performance)
Work Mode: Remote-first; hybrid from Hyderabad, India is a plus
Culture & Expectations: Flexible hours, deadline-driven, and student-friendly
NOTE: Apply only if you’re comfortable with the internship structure and are looking for experience, learning, and growth over immediate compensation.
 

About PyroSynergy
PyroSynergy helps early-stage founders build meaningful brands with strategy, clarity, AI, and empathy. We believe every project should begin with understanding of users, of founders, and of the story behind the product.
As a Copywriter at PyroSynergy, you’ll help shape the voice and narrative of multiple brands. Your words will translate complex ideas into simple, engaging language that resonates with users and reflects the founder’s deeper intent. You’ll work closely with designers, strategists, and no-code developers to craft messaging that feels thoughtful, intentional, and empathetic from the very first line.
What You’ll Do
Write compelling website and landing-page copy tailored to different tones: professional, conversational, premium, or marketing-heavy.
Translate client requirements into sharp, structured messaging that holds attention.
Create headlines, subheads, value propositions, CTAs, and narrative-driven copy for websites.
Support internal communication tasks, such as onboarding docs and emails when needed.
Contribute ideas that improve user engagement and brand consistency across digital platforms.


Required Skills
Strong writing fundamentals: clarity, structure, message discipline
Thorough understanding of how marketing works
Ability to adapt tone for different audiences
Comfort researching unfamiliar topics
A naturally empathetic approach to understanding client intent, user needs, and communication context
Openness to feedback and iterative improvements
**An entrepreneurial, empathy-first mindset with a strong sense of ownership; treating tasks and outcomes as if they were your own**


Good-to-Have
SEO basics (keywords, meta descriptions, structure).
Experience writing copy for landing pages or brand messaging.
Familiarity with AI writing assistants or prompt-based workflows.


What You’ll Gain
Hands-on experience crafting real copy for clients and early-stage startups.
Learn to write with precision in a variety of tones and formats.
Exposure to brand strategy and AI-assisted content workflows.
Opportunity to transition into paid client projects based on performance.


Internship Details
Start Date: January 2026 onwards
Type: Unpaid + performance-based bonuses and opportunities for paid client work
Minimum Duration: 3 months (extendable based on performance)
Work Mode: Remote-first; hybrid from Hyderabad, India is a plus
Culture & Expectations: Flexible hours, deadline-driven, and student-friendly
NOTE: Apply only if you’re comfortable with the internship structure and are looking for experience, learning, and growth over immediate compensation.


How to Apply
Send us 2-3 catchy writing samples (bonus if you can explain your thought process for any one of the samples) or a small portfolio, along with your mobile number to admin@pyrosynergy.com with the subject line: "Copywriter Intern/Your Name".
We’ll only go through eye-catching submissions that aren’t too ChatGPT-like. If qualified, you’ll receive a follow-up email with instructions for the interview process within one week.`;

  const headingSet = new Set([
    "Copywriter Intern",
    "Internship Details",
    "About PyroSynergy",
    "What You’ll Do",
    "Required Skills",
    "Good-to-Have",
    "What You’ll Gain",
    "How to Apply",
  ]);
  const bulletPointSections = new Set([
    // Support both straight and smart apostrophes to be safe
    "What You’ll Do",
    "What You'll Do",
    "Required Skills",
    "Good-to-Have",
    "What You’ll Gain",
    "What You'll Gain",
  ]);
  const boldPatterns = [
    { regex: /^(Start Date:|Type:|Minimum Duration:|Work Mode:|Culture & Expectations:)/, className: 'role-label' },
  ];

  // Highlight specific tokens inline (email, subject line text)
  const highlightTokens = (text) => {
    const tokens = [
      "admin@pyrosynergy.com",
      "Copywriter Intern/Your Name",
      "Unpaid",
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
      // Render special styling for specific tokens
      if (foundToken === "Unpaid") {
        parts.push(
          <em key={`emph-${k++}`}>
            <strong className="role-emph role-emph-bold-italic">{foundToken}</strong>
          </em>
        );
      } else {
        parts.push(<strong key={`emph-${k++}`} className="role-emph">{foundToken}</strong>);
      }
      remaining = remaining.slice(nextIndex + (foundToken?.length || 0));
    }
    return parts.length ? parts : text;
  };

  const formatLine = (line) => {
    // Check if line should be bolded
    for (const pattern of boldPatterns) {
      const match = line.match(pattern.regex);
      if (match) {
        const label = match[1];
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
                const isMainHeading = trimmed === "Copywriter Intern";
                const isAboutHeading = trimmed === "About PyroSynergy";
                if (isAboutHeading) {
                  // Render with a span to style only the word "PyroSynergy" using a specific font
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
                    {isMainHeading && <div className="role-posted-date">Posted on 12th December 2025</div>}
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
              
              // Check if we're in a bullet point section
              let currentSection = null;
              for (let i = idx - 1; i >= 0; i--) {
                const prevLine = lines[i].trim();
                if (headingSet.has(prevLine)) {
                  currentSection = prevLine;
                  break;
                }
              }
              
              // Check if this line should be a bullet point
              const isBulletLine = bulletPointSections.has(currentSection) && 
                                   trimmed.length > 10 &&
                                   !trimmed.startsWith("Start Date:") && 
                                   !trimmed.startsWith("Type:") && 
                                   !trimmed.startsWith("Minimum Duration:") && 
                                   !trimmed.startsWith("Work Mode:") && 
                                   !trimmed.startsWith("Culture & Expectations:");
              
              // Check if it's a paragraph (longer text in non-bullet sections)
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
                      const email = 'admin@pyrosynergy.com';
                      
                      // Try modern clipboard API first
                      if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(email).then(() => {
                          setShowCopied(true);
                          setShowDropdown(false);
                          setTimeout(() => setShowCopied(false), 2000);
                        }).catch(() => {
                          // Fallback for mobile browsers
                          fallbackCopyText(email);
                        });
                      } else {
                        // Fallback for older browsers
                        fallbackCopyText(email);
                      }
                      
                      function fallbackCopyText(text) {
                        const textArea = document.createElement('textarea');
                        textArea.value = text;
                        textArea.style.position = 'fixed';
                        textArea.style.left = '-999999px';
                        textArea.style.top = '-999999px';
                        document.body.appendChild(textArea);
                        textArea.focus();
                        textArea.select();
                        try {
                          document.execCommand('copy');
                          setShowCopied(true);
                          setShowDropdown(false);
                          setTimeout(() => setShowCopied(false), 2000);
                        } catch (err) {
                          console.error('Failed to copy text:', err);
                        }
                        document.body.removeChild(textArea);
                      }
                    }}
                  >
                    Copy Email
                  </button>
                  <button
                    className="role-cta-dropdown-item"
                    onClick={() => {
                      const url = isMobile ? "mailto:admin@pyrosynergy.com" : "https://mail.google.com/mail/?view=cm&fs=1&to=admin@pyrosynergy.com";
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

export default Copywriter;
