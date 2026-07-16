import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <section className="notfound-page">
      <div className="notfound-content">
        <h1 className="notfound-heading">
          You're at the right neighbourhood, just the wrong lane.
        </h1>
        <h4 className="notfound-subheading">404. Not Found</h4>
        <Link to="/" className="notfound-cta">
          Take Me Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
