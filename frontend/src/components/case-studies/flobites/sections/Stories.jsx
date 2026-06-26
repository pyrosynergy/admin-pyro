import React from 'react';
import './Stories.css';
import testimonialVideo from '../../../../assets/flobites/testimonial-video.png';

const Stories = () => (
  <div className="flobites-stories">
    <img
      src={testimonialVideo}
      alt="FloBites benefit cards and Real Stories, Real Relief video testimonials"
      className="flobites-stories-img"
    />
    <span className="flobites-stories-feel">
      Feel<br />Better.
    </span>
  </div>
);

export default Stories;
