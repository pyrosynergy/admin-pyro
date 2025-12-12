import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Copywriter.css";

const UXDesigner = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = `User Experience (UX) Designer Intern
Internship Details
Start Date: January 2026 onwards
Type: Unpaid + performance-based bonuses and opportunities for paid client work
Minimum Duration: 3 months (extendable based on performance)
Work Mode: Remote-first; hybrid from Hyderabad, India, is a plus
Culture & Expectations: Flexible hours, deadline-driven, and student-friendly
NOTE: Apply only if you’re comfortable with the internship structure and are looking for experience, learning, and growth over immediate compensation.

About PyroSynergy
PyroSynergy helps early-stage founders build meaningful brands with strategy, clarity, AI, and empathy. We believe every project should begin with understanding of users, of founders, and of the story behind the product.
As a UI/UX Designer, you’ll design interfaces that make complex journeys feel natural and intuitive. You’ll use research, structure, and AI-powered ideation to craft experiences that genuinely support how users think and behave. Your work will directly influence how founders present their products to the world — with empathy guiding every decision, from the first wireframe to the final design system.
What You’ll Do
Create wireframes, flows, and high-fidelity interfaces
Conduct lightweight UX research through competitive analysis, heuristic evaluations, user behaviour insights, and requirement breakdowns to inform design decisions
Build structured, organised Figma files suitable for both code-based and non-code-based (e.g., Figma to Studio plugin) development.
Ensure proper layer naming, auto-layout use, responsive framing, grids, and component structuring so that no-code devs can import efficiently
Collaborate with the No-Code Web Dev team to ensure studio-ready outputs
Use generative AI tools to ideate, generate variations, and accelerate workflows
Required Skills
Strong Figma proficiency
Ability to conduct basic UX research: analyzing competitors, identifying usability issues, interpreting user needs, and converting findings into actionable design inputs
Solid UX foundations (heuristics, IA, flows, patterns)
Experience designing components and systems
Empathy-driven design thinking — understanding user mental models, accessibility, microinteractions, and emotional design
Ability to structure files for plugin compatibility


Good-to-Have
Experience with AI design workflows
Knowledge of prototyping tools beyond Figma
Ability to articulate design decisions clearly


What You’ll Gain
Real-world experience building interfaces for early-stage startups.
Learn how design, branding, and development integrate in production workflows.
Opportunity to lead small design projects independently.
Potential transition to paid client projects.


Internship Details
Start Date: January 2026 onwards
Type: Unpaid + performance-based bonuses and opportunities for paid client work
Minimum Duration: 3 months (extendable based on performance)
Work Mode: Remote-first; hybrid from Hyderabad, India is a plus
Culture & Expectations: Flexible hours, deadline-driven, and student-friendly
NOTE: Apply only if you’re comfortable with the internship structure and are looking for experience, learning, and growth over immediate compensation.


How to Apply
Send your resume + portfolio link along with your mobile number to admin@pyrosynergy.com with subject line: “UI/UX Designer Intern/Your Name”.
We’ll only go through eye-catching submissions that show an emotion and tell a story through your design. If qualified, you’ll receive a follow-up email with instructions for the interview process within one week.`;

  const headingSet = new Set([
    "User Experience (UX) Designer Intern",
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
      "UI/UX Designer Intern/Your Name",
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
                const isMainHeading = trimmed === "User Experience (UX) Designer Intern";
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
    </section>
  );
};

export default UXDesigner;
