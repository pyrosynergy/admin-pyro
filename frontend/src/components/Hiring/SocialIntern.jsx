import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Copywriter.css";
import HiringFooter from "./HiringFooter";

const SocialIntern = () => {
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

  const content = `Social Media Content & Strategy Intern (Organic Growth)
Internship Details
Start Date: Immediate
Type: ₹5000/month
Minimum Duration: 2 months (extendable based on performance)
Work Mode: Remote-first (hybrid from Hyderabad, India is a plus)
Culture & Expectations: Flexible hours, deadline-driven
NOTE: Apply only if you're comfortable with a fast-paced and dynamic structure, looking for serious experience, learning, and growth.
 

About PyroSynergy
PyroSynergy helps early-stage founders build meaningful brands with strategy, clarity, AI, and empathy. We believe every project should begin with an understanding of users, of founders, and of the story behind the product.
This role is for someone who wants to deeply understand how organic social media systems are built end-to-end, not just how posts are uploaded.
Role Overview
This is a **strategy + execution** role.
You will own the organic social media process from **research → planning → scripting → publishing**, while collaborating with creators who handle filming and editing.
You may be involved in giving the direction for filming or editing, but not the filming or editing work itself. You *will* be responsible for making sure the content system works.
What You'll Do
1. Research & Understanding
Research industries, audiences, competitors, and content patterns
Identify what types of content work *for that specific industry*
Understand audience pain points, intent, and language
2. Content Strategy & Planning
Design creative content buckets (e.g., education, authority, storytelling, trust-building)
Build a clear posting plan for reels and posts
Plan content in a way that balances consistency and variety
3. Scripting & Structure
Create scripts using proven organic frameworks (hook → body → CTA)
Design **multiple hooks and CTAs** for the same core idea
Enable modular filming (so hooks/CTAs can be swapped later)
4. Execution (Platform-side)
Manage the social media account(s)
Write SEO-friendly, industry-aligned captions
Ensure correct positioning, tone, and clarity
Maintain consistency and quality across post


Required Skills & Mindset
Strong written communication and structuring ability
Understanding of social media formats and organic growth principles
Ability to think in systems, not isolated posts
Research-oriented and detail-focused
**An entrepreneurial, empathy-first mindset with a strong sense of ownership — treating tasks and outcomes as if they were your own**
Comfortable taking responsibility end-to-end
Willingness to learn by doing


Good-to-Have
Prior experience (≤1 year) with social media content or strategy
Familiarity with SEO principles for captions
Comfort using AI tools for research, ideation, or drafting


What You'll Gain
Hands-on experience designing real organic content systems
Deep understanding of how strategy translates into execution
Exposure to founder-led brands and real-world constraints
Portfolio-worthy work (strategy + execution)
Potential extension or future collaboration based on performance


Internship Details
Start Date: Immediate
Type: ₹5000/month
Minimum Duration: 2 months (extendable based on performance)
Work Mode: Remote-first (hybrid from Hyderabad, India is a plus)
Culture & Expectations: Flexible hours, deadline-driven
NOTE: Apply only if you're comfortable with a fast-paced and dynamic structure, looking for serious experience, learning, and growth.


Screening Task (Mandatory)
Time expected: 60-90 minutes
Goal: To REALLY understand how you think


Task
Pick **any one industry** of your choice (e.g., fitness coach, EdTech company, SaaS startup, local business, creator brand).
Answer the following in **1–2 pages (and save as a PDF)**:
**1. Audience Understanding**
Who is the audience?
What problem or curiosity brings them to Instagram?
**2. Content Buckets (3–4 max)**
Define each bucket clearly
Explain *why* each bucket matters
**3. One Content Idea (Deep Dive)**
Write:
2 different hooks
1 core body idea
2 different CTAs
Explain how this allows flexibility during filming
**4. Execution Thinking**
How would you write a caption for this content so it's:
    Clear
    SEO-friendly
    Industry-aligned
We are not evaluating aesthetics, editing, or virality hacks.
We are evaluating **clarity, structure, empathy, and ownership of thinking**.


How to Apply
If you're serious about this opportunity, send the following along with your mobile number to admin@pyrosynergy.com with subject line: "Strategy & Execution Intern/Your Name". Include:
Something about yourself (no-nonsense and to-the-point)
Screening task submission (as a PDF)
(Preferred) Any past proven social media work or writing samples
We'll only go through eye-catching submissions that aren't too ChatGPT-like. If qualified, you'll receive a follow-up email with instructions for the interview process within one week.`;

  const headingSet = new Set([
    "Social Media Content & Strategy Intern (Organic Growth)",
    "Internship Details",
    "About PyroSynergy",
    "Role Overview",
    "What You'll Do",
    "Required Skills & Mindset",
    "Good-to-Have",
    "What You'll Gain",
    "Screening Task (Mandatory)",
    "Task",
    "How to Apply",
  ]);

  const subHeadingSet = new Set([
    "1. Research & Understanding",
    "2. Content Strategy & Planning",
    "3. Scripting & Structure",
    "4. Execution (Platform-side)",
    "**1. Audience Understanding**",
    "**2. Content Buckets (3–4 max)**",
    "**3. One Content Idea (Deep Dive)**",
    "**4. Execution Thinking**",
  ]);

  const bulletPointSections = new Set([
    "What You'll Do",
    "What You'll Do",
    "Required Skills & Mindset",
    "Good-to-Have",
    "What You'll Gain",
    "What You'll Gain",
    "How would you write a caption for this content so it's:",
  ]);

  const howToApplyItems = [
    "Something about yourself (no-nonsense and to-the-point)",
    "Screening task submission (as a PDF)",
    "(Preferred) Any past proven social media work or writing samples",
  ];

  const oneContentIdeaOuterItems = [
    "Write:",
    "Explain how this allows flexibility during filming",
  ];

  const oneContentIdeaInnerItems = [
    "2 different hooks",
    "1 core body idea",
    "2 different CTAs",
  ];

  const boldPatterns = [
    { regex: /^(Start Date:|Type:|Minimum Duration:|Work Mode:|Culture & Expectations:|Time expected:|Goal:)/, className: 'role-label' },
    { regex: /^(Audience Understanding|Content Buckets \(3–4 max\)|One Content Idea \(Deep Dive\)|Execution Thinking)/, className: 'role-label' },
  ];

  const highlightTokens = (text) => {
    const tokens = [
      "admin@pyrosynergy.com",
      "Strategy & Execution Intern/Your Name",
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
      parts.push(<strong key={`emph-${k++}`} className="role-emph">{foundToken}</strong>);
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

    // Handle *text* markdown italic syntax
    const italicMarkdownRegex = /\*(.+?)\*/g;
    if (italicMarkdownRegex.test(line)) {
      const parts = [];
      let lastIndex = 0;
      const matches = line.matchAll(/\*(.+?)\*/g);

      for (const match of matches) {
        if (match.index > lastIndex) {
          parts.push(highlightTokens(line.substring(lastIndex, match.index)));
        }
        parts.push(<em key={`italic-${match.index}`}>{match[1]}</em>);
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
                const isMainHeading = trimmed === "Social Media Content & Strategy Intern (Organic Growth)";
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
                    {isMainHeading && <div className="role-posted-date">Posted on 21st December 2025</div>}
                  </>
                );
              }
              
              // Check if it's a subheading (numbered section)
              if (subHeadingSet.has(trimmed)) {
                return (
                  <div key={idx} className="role-line">
                    <strong>{formatLine(line)}</strong>
                  </div>
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
                if (headingSet.has(prevLine) || subHeadingSet.has(prevLine)) {
                  currentSection = prevLine;
                  break;
                }
              }

              const howToApplyIndex =
                currentSection === "How to Apply" ? howToApplyItems.indexOf(trimmed) : -1;

              const isOneContentIdeaSection =
                currentSection === "**3. One Content Idea (Deep Dive)**";
              
              // Check if this line should be a bullet point
              const isExecutionCaptionItem = currentSection === "**4. Execution Thinking**" &&
                                            ["Clear", "SEO-friendly", "Industry-aligned"].includes(trimmed);

              const isExecutionCaptionQuestion =
                trimmed === "How would you write a caption for this content so it's:";

              const isExecutionEvaluationLine =
                currentSection === "**4. Execution Thinking**" &&
                [
                  "We are not evaluating aesthetics, editing, or virality hacks.",
                  "We are evaluating **clarity, structure, empathy, and ownership of thinking**.",
                ].includes(trimmed);

              const isOneContentOuter =
                isOneContentIdeaSection && oneContentIdeaOuterItems.includes(trimmed);

              const isOneContentInner =
                isOneContentIdeaSection && oneContentIdeaInnerItems.includes(trimmed);

              const isSubHeadingBulletSection =
                subHeadingSet.has(currentSection) && !isOneContentIdeaSection;

              const baseBulletLine = (bulletPointSections.has(currentSection) ||
                                      isSubHeadingBulletSection ||
                                      howToApplyIndex !== -1) &&
                                   trimmed.length > 10 &&
                                   !subHeadingSet.has(trimmed) &&
                                   !trimmed.startsWith("Start Date:") && 
                                   !trimmed.startsWith("Type:") && 
                                   !trimmed.startsWith("Minimum Duration:") && 
                                   !trimmed.startsWith("Work Mode:") && 
                                   !trimmed.startsWith("Culture & Expectations:");

              const isBulletLine = (!isExecutionEvaluationLine && baseBulletLine) ||
                                   isExecutionCaptionItem ||
                                   isExecutionCaptionQuestion ||
                                   isOneContentOuter ||
                                   isOneContentInner;
              
              // Check if it's a paragraph (longer text in non-bullet sections)
              const isParagraph = trimmed.length > 80 && !isBulletLine;
              
              if (isBulletLine) {
                const isSubBullet = isExecutionCaptionItem || isOneContentInner;

                const bulletItemClass = isSubBullet
                  ? "role-bullet-item role-bullet-item--sub"
                  : "role-bullet-item";

                const isNumberedBullet = howToApplyIndex !== -1;
                const bulletSymbol = isNumberedBullet ? `${howToApplyIndex + 1}.` : "•";
                const bulletClassName = isNumberedBullet
                  ? "role-bullet role-bullet--numbered"
                  : "role-bullet";
                return (
                  <div key={idx} className={bulletItemClass}>
                    <span className={bulletClassName}>{bulletSymbol}</span>
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
                      
                      if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(email).then(() => {
                          setShowCopied(true);
                          setShowDropdown(false);
                          setTimeout(() => setShowCopied(false), 2000);
                        }).catch(() => {
                          fallbackCopyText(email);
                        });
                      } else {
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

export default SocialIntern;
