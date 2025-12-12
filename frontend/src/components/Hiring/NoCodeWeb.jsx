import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Copywriter.css";
import HiringFooter from "./HiringFooter";

const NoCodeWeb = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = `No-Code Web Developer Intern (Wix Studio Specialist)
Internship Details
Start Date: January 2026 onwards
Type: Unpaid + performance-based bonuses and opportunities for paid client work
Minimum Duration: 3 months (extendable based on performance)
Work Mode: Remote-first; hybrid from Hyderabad, India, is a plus
Culture & Expectations: Flexible hours, deadline-driven, and student-friendly
NOTE: Apply only if you’re comfortable with the internship structure and are looking for experience, learning, and growth over immediate compensation.

About PyroSynergy
PyroSynergy helps early-stage founders build meaningful brands with strategy, clarity, AI, and empathy. We believe every project should begin with understanding of users, of founders, and of the story behind the product.
As a No-Code Web Developer, you will turn designs into fast, responsive, and aesthetic websites using Wix Studio and complementary tools. Your builds will reflect strong UX thinking and deep attention to user behaviour. You’ll collaborate closely with UI/UX and strategy teams, using empathy and technical clarity to create digital experiences that feel smooth, intuitive, and founder-centric.
What You’ll Do
Build responsive, clean, conversion-focused websites using Wix Studio.
Implement interactions, layouts, and sections with strong UX thinking.
Use basic or advanced Velo custom code (preferred) inside Wix Studio.
Optimize websites for performance (speed, responsiveness, SEO basics).
Collaborate with UI/UX designers to convert wireframes into functioning websites, like plugins like Figma to Studio (or equivalent)
Occasionally, create quick prototypes, POCs, or MVPs with aesthetic clarity.
Use no-code tools like Webflow or Framer (optional but valuable).


Required Skills
Deep understanding of Wix Studio
Experience using the Figma to Studio conversion plugin
Good UI/UX sense (not basic; enough to make clear decisions)
Performance optimization understanding
Empathy toward user experience by thinking from the user's perspective when designing interactions or flows
Fast learning and iterative execution skills


Good-to-Have
Velo coding
Experience with Webflow, Framer, and Bubble
Knowledge of performance optimization techniques
Familiarity with AI design tools for prototyping or asset generation


What You’ll Gain
Experience building production-ready websites quickly.
Exposure to client feedback loops and real startup workflows.
Learn advanced no-code strategies and system design.
Opportunity to take on paid client work based on performance.


Internship Details
Start Date: January 2026 onwards
Type: Unpaid + bonuses and performance-based opportunities for paid client work
Minimum Duration: 3 months (extendable based on performance)
Work Mode: Remote-first; hybrid from Hyderabad, India, is a plus
Culture & Expectations: Flexible hours, deadline-driven, and student-friendly
NOTE: Apply only if you’re comfortable with the internship structure and are looking for experience, learning, and growth over immediate compensation.


How to Apply
Send your resume + live portfolio links along with your mobile number to admin@pyrosynergy.com with subject line: “No-Code Web Developer Intern/Your Name”.
We’ll only go through eye-catching submissions that tell a story through your live designs. If qualified, you’ll receive a follow-up email with instructions for the interview process within one week.`;

  const headingSet = new Set([
    "No-Code Web Developer Intern (Wix Studio Specialist)",
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
      "No-Code Web Developer Intern/Your Name",
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
                const isMainHeading = trimmed === "No-Code Web Developer Intern (Wix Studio Specialist)";
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
            <a
              className="role-cta"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=admin@pyrosynergy.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apply Now"
            >
              Apply Now
            </a>
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

export default NoCodeWeb;
