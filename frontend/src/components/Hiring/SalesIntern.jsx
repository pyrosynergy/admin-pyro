import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Copywriter.css";
import HiringFooter from "./HiringFooter";

const SalesIntern = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = `Sales Intern (Commision-based)
Internship Details
Start Date: Immediately
Type: Commission-based (10%+) with bonuses for consistent closures
Minimum Duration: 3 months (extendable based on performance)
Work Mode: Remote-first; hybrid from Hyderabad, India, is a plus
Culture & Expectations: Flexible hours, deadline-driven, and student-friendly
NOTE: Apply only if you’re comfortable with a commission-based role and the expectations outlined above.

About PyroSynergy
PyroSynergy helps early-stage founders build meaningful brands with strategy, clarity, AI, and empathy. We believe every project should begin with understanding of users, of founders, and of the story behind the product.
We’re looking for a Sales Intern who can communicate with clarity, connect with people genuinely, and represent PyroSynergy with an empathetic, partnership-driven approach.
What You’ll Do
Identify, research, and build lists of high-potential prospects across founder communities, startups, and early-stage businesses
Conduct lead generation + outreach + qualification across LinkedIn, email, Instagram, and other channels
Understand each founder’s needs and communicate solutions with empathy, clarity, and confidence
Book meetings, maintain structured follow-ups, and nurture warm prospects
Optionally handle end-to-end closing for higher commission
Maintain records of conversations, objections, opportunities, and pipeline movement
Work closely with the founder and strategy team to refine messaging and outreach scripts


Required Skills
Strong verbal and written communication with international prospects
Ability to connect with people naturally and respectfully
Empathy-first approach: making prospects feel understood, not sold to
Research-oriented mindset
Consistent follow-up habits and responsibility toward timelines
A calm, professional tone when speaking to founders and decision-makers
Ability to handle rejection and keep moving without losing quality


Good-to-Have
Prior experience in sales, outreach, or lead generation
Understanding of startup ecosystems
Familiarity with CRMs or automation tools (free versions are fine)
Comfortable using AI tools for research, writing, or messaging assistance


What You’ll Gain
Real-world experience speaking to founders and high-level stakeholders
Training in outreach strategy, sales psychology, and pipeline management
Opportunity to shadow or participate in live sales calls and closings
Potential to grow into a full-fledged Sales Associate role
Significant earning potential through commissions
Compensation & Commission Structure
This role is fully commission-based, with two earning paths:
Option A: {Lead Gen + Outreach + Qualification}
Earns you 10%+ commission, depending on project size and negotiation
Option B: {Lead Gen + Outreach + Qualification + Closing}
Higher commission tier, negotiated per candidate and skill level
Bonuses
Additional bonuses for consistent closures
Higher reward for bringing multi-project chains or longer-term clients
Potential long-term collaboration or paid role based on consistency, communication quality, and deal flow
There is no “lead gen only” role, since every intern will handle outreach and qualification at a minimum.

Internship Details
Start Date: Immediately
Type: Commission-based (10%+) with bonuses for consistent closures
Minimum Duration: 3 months (extendable based on performance)
Work Mode: Remote-first; hybrid from Hyderabad, India, is a plus
Culture & Expectations: Flexible hours, deadline-driven, and student-friendly
NOTE: Apply only if you’re comfortable with a commission-based role and the expectations outlined above.


How to Apply
Send the following to admin@pyrosynergy.com with the subject line: “Sales Intern/Your Name”:
Your background and short story
A short note on why you’re interested in working with PyroSynergy
A brief explanation of any prior experience in outreach, communication, or sales (with proof, if any)
A 30–60 second video (strongly preferred) introducing yourself and explaining how you approach conversations with prospects
Your LinkedIn profile link and mobile number
If qualified, you’ll receive a follow-up email with instructions for the interview process within one week.`;

  const headingSet = new Set([
    "Sales Intern (Commision-based)",
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
    { regex: /^(Start Date:|Type:|Minimum Duration:|Work Mode:|Culture & Expectations:|Compensation & Commission Structure|Option A:|Option B:|Bonuses)$/,
      className: 'role-label' },
  ];

  const highlightTokens = (text) => {
    const tokens = [
      "admin@pyrosynergy.com",
      "Sales Intern/Your Name",
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
    // Special handling to make "Commission-based (10%+)" bold+italic in Type line
    if (line.startsWith("Type:") && line.includes("Commission-based (10%+)")) {
      const label = "Type:";
      const afterLabel = line.substring(label.length);
      const phrase = "Commission-based (10%+)";
      const idx = afterLabel.indexOf(phrase);
      if (idx !== -1) {
        const before = afterLabel.slice(0, idx);
        const after = afterLabel.slice(idx + phrase.length);
        return (
          <>
            <strong className="role-label">{label}</strong>
            {before}
            <strong><em>{phrase}</em></strong>
            {highlightTokens(after)}
          </>
        );
      }
    }

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
                const isMainHeading = trimmed === "Sales Intern (Commision-based)";
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

export default SalesIntern;
