import React, { useEffect } from "react";
import "./Copywriter.css";

const Copywriter = () => {
  useEffect(() => {
    // preserve original scroll behaviour only
    window.scrollTo(0, 0);
  }, []);

  // Keep the exact content as a single source of truth
  const content = `Copywriter Intern
Internship Details
Start Date: January 2026 onwards
Type: Unpaid + performance-based bonuses and opportunities for paid client work
Minimum Duration: 3 months (extendable based on performance)
Work Mode: Remote-first; hybrid from Hyderabad, India is a plus
Culture & Expectations: Flexible hours, deadline-driven, and student-friendly
NOTE: Apply only if you’re comfortable with the internship structure and are looking for experience, learning, and growth over immediate compensation.
More on how to apply below. 

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
Send your resume + 2-3 catchy writing samples (bonus if you can explain your thought process for any one of the samples) or a small portfolio, along with your mobile number to admin@pyrosynergy.com with the subject line: “Copywriter Intern/Your Name”.
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

  const lines = content.split("\n");

  return (
    <section className="role-section">
      <div className="role-container">
        <div className="role-card">
          <div className="role-text">
            {lines.map((line, idx) => {
              const trimmed = line.trim();
              if (headingSet.has(trimmed)) {
                const isMainHeading = trimmed === "Copywriter Intern";
                return (
                  <div key={idx} className={`role-heading${isMainHeading ? " role-heading-main" : ""}`}>{line}</div>
                );
              }
              if (trimmed.startsWith("NOTE:")) {
                return (
                  <div key={idx} className="role-note">{line}</div>
                );
              }
              if (trimmed === "") {
                return <div key={idx} className="role-spacer" aria-hidden="true"></div>;
              }
              return (
                <div key={idx} className="role-line">{line}</div>
              );
            })}
          </div>

          <div className="role-cta-wrap">
            <a className="role-cta" href="/realitycheck" aria-label="Apply Now">Apply Now</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Copywriter;
