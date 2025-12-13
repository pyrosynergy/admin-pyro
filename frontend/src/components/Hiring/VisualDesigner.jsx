import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Copywriter.css";
import HiringFooter from "./HiringFooter";

const VisualDesigner = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const content = `Visual Designer Intern
Internship Details
Start Date: January 2026 onwards
Type: Unpaid + performance-based bonuses and opportunities for paid client work
Minimum Duration: 3 months (extendable based on performance)
Work Mode: Remote-first; hybrid from Hyderabad, India is a plus
Culture & Expectations: Flexible hours, deadline-driven, and student-friendly
NOTE: Apply only if you’re comfortable with the internship structure and are looking for experience, learning, and growth over immediate compensation.

About PyroSynergy
PyroSynergy helps early-stage founders build meaningful brands with strategy, clarity, AI, and empathy. We believe every project should begin with understanding of users, of founders, and of the story behind the product.
As a Visual Designer, you’ll bring ideas to life through design and motion. From crafting carousels to generating AI-assisted visuals, your work will help brands communicate with emotional clarity and aesthetic precision. You’ll explore visual identity, layout, color, and storytelling while creating designs that feel intuitive, thoughtful, and deeply rooted in empathy.
What You’ll Do
Design posts, carousels, marketing creatives, and lightweight animations for brand and social media.
Use Figma (or equivalent) to structure clean, readable, well-balanced visuals.
Create simple to intermediate animations or motion graphics for social media using tools like After Effects, Premiere Pro, Figma Smart Animate, or AI-based animation generators.
Apply basic UI/UX principles for layout clarity, visual hierarchy, and user flow.
Use AI generative tools (Gemini NanoBanana/SeedDance, Kling, VEO 3.1, etc.) to ideate and generate assets.
Collaborate with content writers and UI/UX designers to create cohesive brand outputs.
Along with visual designs, you’ll be creating wireframes, flows, and high-fidelity interfaces


Required Skills
Proficient in Figma (or equivalent)
Fundamentals of layout, visual hierarchy, and readability
Ability to create basic motion graphics or micro-animations for posts, reels, or website elements
Good knowledge of UI/UX foundations
Experience using AI generative tools (Gemini, SeedDance, Kling)
An empathetic understanding of user perception, emotional cues, and visual accessibility
Ability to adopt feedback quickly
**An entrepreneurial, empathy-first mindset with a strong sense of ownership; treating tasks and outcomes as if they were your own**


Good-to-Have
Adobe Suite knowledge (Photoshop, Illustrator, After Effects, etc.)
Familiarity with AI image/video generation
Knowledge of branding principles


What You’ll Gain
Experience designing for real brands and client-facing projects.
Hands-on practice using state-of-the-art AI generation tools.
Exposure to startup design workflows and strategy.
Path to being assigned paid client deliverables based on quality.


Internship Details
Start Date: January 2026 onwards
Type: Unpaid + performance-based bonuses and opportunities for paid client work
Minimum Duration: 3 months (extendable based on performance)
Work Mode: Remote-first; hybrid from Hyderabad, India is a plus
Culture & Expectations: Flexible hours, deadline-driven, and student-friendly
NOTE: Apply only if you’re comfortable with the internship structure and are looking for experience, learning, and growth over immediate compensation.


How to Apply
Send us your portfolio link along with your mobile number to admin@pyrosynergy.com with subject line: "Visual Designer Intern/Your Name".
We’ll only go through eye-catching submissions that show an emotion and tell a story through your design. If qualified, you’ll receive a follow-up email with instructions for the interview process within one week.
`;

  const headingSet = new Set([
    "Visual Designer Intern",
    "Internship Details",
    "About PyroSynergy",
    "What You’ll Do",
    "Required Skills",
    "Good-to-Have",
    "What You’ll Gain",
    "How to Apply",
  ]);
  const bulletPointSections = new Set([
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

  const highlightTokens = (text) => {
    const tokens = [
      "admin@pyrosynergy.com",
      "Visual Designer Intern/Your Name",
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
                const isMainHeading = trimmed === "Visual Designer Intern";
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
            <div className="role-cta-dropdown-container">
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
                      navigator.clipboard.writeText('admin@pyrosynergy.com');
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

export default VisualDesigner;
