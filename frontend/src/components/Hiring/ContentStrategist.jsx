import React, { useEffect } from "react";
import "./Copywriter.css";

const ContentStrategist = () => {
  useEffect(() => {
    // preserve original scroll behaviour only
    window.scrollTo(0, 0);
  }, []);

  // Keep the exact content as a single source of truth
  const content = `Social Media Content Strategist Intern
Internship Details
Start Date: January 2026 onwards
Type: Unpaid + performance-based bonuses and opportunities for paid client work
Minimum Duration: 3 months (extendable based on performance)
Work Mode: Remote-first; hybrid from Hyderabad, India is a plus
Culture & Expectations: Flexible hours, deadline-driven, and student-friendly
NOTE: Apply only if you're comfortable with the internship structure and are looking for experience, learning, and growth over immediate compensation.
 

About PyroSynergy
PyroSynergy helps early-stage founders build meaningful brands with strategy, clarity, AI, and empathy. We believe every project should begin with an understanding of users, of founders, and of the story behind the product.
As a Social Media Content Strategist, you will help translate brand stories into sharp, high-engagement content. You'll experiment with hooks, storytelling frameworks, and platform-specific formats that resonate emotionally with audiences. Your work will shape the personality of brands online, ensuring that every post, carousel, and reel script carries clarity, intention, and empathy.
What You'll Do
Write Instagram posts, carousels, captions, and short-form content with strong marketing intent.
Develop scripts for reels using high-conversion structures (hook → body → CTA).
Turn complex ideas into simple, attention-grabbing narratives.
Support internal admin/writing tasks occasionally.
Brainstorm content angles with designers and brand strategists.


Required Skills
Strong understanding of social tone, hooks, and attention patterns
Ability to write with structure and creativity
Empathy-driven communication by understanding audience mindset and tailoring messages accordingly
Adaptability and openness to rapid iteration


Good-to-Have
SEO basics
Experience writing for Instagram or other social platforms
Familiarity with AI tools for ideation or content generation


What You'll Gain
Build real portfolio work across multiple client industries.
Learn high-performance content frameworks used in startups and agencies.
Collaborate with design, branding, and strategy teams.
Potential transition to paid client work.


Internship Details
Start Date: January 2026 onwards
Type: Unpaid + performance-based bonuses and opportunities for paid client work
Minimum Duration: 3 months (extendable based on performance)
Work Mode: Remote-first; hybrid from Hyderabad, India is a plus
Culture & Expectations: Flexible hours, deadline-driven, and student-friendly
NOTE: Apply only if you're comfortable with the internship structure and are looking for experience, learning, and growth over immediate compensation.


How to Apply
Send your resume + sample posts/scripts along with your mobile number to admin@pyrosynergy.com with subject line: "Social Media Content Strategist/Your Name".
We'll only go through eye-catching submissions that aren't too ChatGPT-like. If qualified, you'll receive a follow-up email with instructions for the interview process within one week.`;

  const headingSet = new Set([
    "Social Media Content Strategist Intern",
    "Internship Details",
    "About PyroSynergy",
    "What You'll Do",
    "Required Skills",
    "Good-to-Have",
    "What You'll Gain",
    "How to Apply",
  ]);

  const bulletPointSections = new Set([
    // Support both straight and smart apostrophes to be safe
    "What You'll Do",
    "What You'll Do",
    "Required Skills",
    "Good-to-Have",
    "What You'll Gain",
    "What You'll Gain",
  ]);

  const boldPatterns = [
    { regex: /^(Start Date:|Type:|Minimum Duration:|Work Mode:|Culture & Expectations:)/, className: 'role-label' },
  ];

  // Highlight specific tokens inline (email, subject line text)
  const highlightTokens = (text) => {
    const tokens = [
      "admin@pyrosynergy.com",
      "Social Media Content Strategist/Your Name",
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
    return highlightTokens(line);
  };

  const lines = content.split("\n");

  return (
    <section className="role-section">
      <div className="role-container">
        <div className="role-card">
          <div className="role-text">
            {lines.map((line, idx) => {
              const trimmed = line.trim();
              if (headingSet.has(trimmed)) {
                const isMainHeading = trimmed === "Social Media Content Strategist Intern";
                return (
                  <div key={idx} className={`role-heading${isMainHeading ? " role-heading-main" : ""}`}>{line}</div>
                );
              }
              if (trimmed.startsWith("NOTE:")) {
                const formattedNote = (
                  <>
                    <strong>NOTE:</strong>{line.substring(5)}
                  </>
                );
                return (
                  <div key={idx} className="role-note">{formattedNote}</div>
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
            <a
              className="role-cta"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=admin@pyrosynergy.com&su=Social%20Media%20Content%20Strategist%20Application"
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

export default ContentStrategist;
