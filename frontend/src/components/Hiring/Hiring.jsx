import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Hiring.css";

const roles = [
  {
    title: "Copywriter Intern",
    duration: "Duration: 3 months minimum",
    location: "Location: Remote-first/Hybrid (Hyderabad, India)",
    start: "Starts: January 2026",
    cta: "Know More",
  },
  {
    title: "Social Media Content Strategist Intern",
    duration: "Duration: 3 months minimum",
    location: "Location: Remote-first/Hybrid (Hyderabad, India)",
    start: "Starts: January 2026",
    cta: "Know More",
  },
  {
    title: "Visual Designer Intern",
    duration: "Duration: 3 months minimum",
    location: "Location: Remote-first/Hybrid (Hyderabad, India)",
    start: "Starts: January 2026",
    cta: "Know More",
  },
  {
    title: "User Experience (UX) Designer Intern",
    duration: "Duration: 3 months minimum",
    location: "Location: Remote-first/Hybrid (Hyderabad, India)",
    start: "Starts: January 2026",
    cta: "Know More",
  },
  {
    title: "Sales Intern (Commission-Based)",
    duration: "Duration: 3 months minimum",
    location: "Location: Remote-first/Hybrid (Hyderabad, India)",
    start: "Starts: Immediately",
    cta: "Know More",
  },
  {
    title: "No-Code Web Developer Intern (Wix Studio)",
    duration: "Duration: 3 months minimum",
    location: "Location: Remote-first/Hybrid (Hyderabad, India)",
    start: "Starts: January 2026",
    cta: "Know More",
  },
];

const Hiring = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="hiring-section">
      <div className="hiring-grid-overlay" aria-hidden="true"></div>
      <div className="hiring-container">
        <div className="hiring-intro">
          <h1 className="hiring-title">We’re Hiring!</h1>
          <p className="hiring-body">
            At PyroSynergy, we’re building with empathy — for founders, for users, and for the teams that bring ideas to life. We’re looking for interns who take ownership, communicate clearly, and care about the impact of their work. If you're passionate about learning, creating meaningful work, and contributing to early-stage brands, these roles are for you.
          </p>
          <div className="openings-pill">Openings</div>
        </div>

        <div className="hiring-list">
          {roles.map((role) => (
            <article className="hiring-card" key={role.title}>
              <div className="card-header">
                <h3>{role.title}</h3>
              </div>
              <ul className="card-meta">
                <li>{role.duration}</li>
                <li>{role.location}</li>
                <li>{role.start}</li>
              </ul>
              <div className="card-cta">
              <button
                  className="nav-button next-button hiring-cta"
                  onClick={() => {
                    if (role.title === "Copywriter Intern") {
                      navigate("/hiring/copywriter_intern_1");
                    } else if (role.title === "Social Media Content Strategist Intern") {
                      navigate("/hiring/content_intern_1");
                    } else if (role.title === "Visual Designer Intern") {
                      navigate("/hiring/videsign_intern_1");
                    } else if (role.title === "User Experience (UX) Designer Intern") {
                      navigate("/hiring/uxdesign_intern_1");
                    } else if (role.title === "Sales Intern (Commission-Based)") {
                      navigate("/hiring/sales_intern_1");
                    } else if (role.title === "No-Code Web Developer Intern (Wix Studio)") {
                      navigate("/hiring/nocodeweb_intern_1");
                    }
                  }}
                >
                  {role.cta}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hiring;
