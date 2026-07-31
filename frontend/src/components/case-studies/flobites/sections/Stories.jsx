import React from 'react';
import './Stories.css';
import testimonialVideo from '../../../../assets/flobites/testimonial-video.webp';

const Stories = () => (
  <div className="flobites-stories">
    <img loading="lazy" decoding="async"
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
