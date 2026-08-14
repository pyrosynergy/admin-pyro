import React from "react";
import { Link } from "react-router-dom";
import "./Hiring.css";

const roles = [
  {
    title: "UI/UX & Visual Designer Intern",
    duration: "Duration: 3 months minimum",
    location: "Location: Remote-first/Hybrid (Hyderabad, India)",
    start: "Starts: Immediately",
    cta: "Know More",
    path: "/hiring/uiuxvd_intern_1",
  },
  {
    title: "Sales Intern (Commission-Based)",
    duration: "Duration: 3 months minimum",
    location: "Location: Remote-first/Hybrid (Hyderabad, India)",
    start: "Starts: Immediately",
    cta: "Know More",
    path: "/hiring/sales_intern_1",
  },
  {
    title: "No-Code Web Developer Intern (Wix Studio)",
    duration: "Duration: 3 months minimum",
    location: "Location: Remote-first/Hybrid (Hyderabad, India)",
    start: "Starts: January 2026",
    cta: "Know More",
    path: "/hiring/nocodeweb_intern_1",
  },
];

const Hiring = () => {
  return (
    <section className="hiring-section">
      <Link
        className="role-back-button"
        aria-label="Back to home"
        to="/"
      >
        <span className="role-back-icon" aria-hidden="true">↩</span>
      </Link>
      <div className="hiring-grid-overlay" aria-hidden="true"></div>
      <div className="hiring-container">
        <div className="hiring-intro">
          <h1 className="hiring-title">We're Hiring!</h1>
          <p className="hiring-body">
            At PyroSynergy, we're building with <em>empathy</em> for founders, users, and the teams that bring ideas to life. We're looking for interns who take ownership, communicate clearly, and care about the impact of their work. If you're passionate about learning, creating meaningful work, and contributing to early-stage brands, these roles are for you.
          </p>
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
                <Link className="hiring-cta" to={role.path}>
                  {role.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hiring;
