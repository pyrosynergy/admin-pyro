import React from 'react';
import './Testimonials.css';

const caseStudies = [
  {
    brand: 'Viali Hair Care',
    tag: 'hair care',
    className: 'case-card-viali'
  },
  {
    brand: 'YourBest',
    tag: 'personal brand',
    className: 'case-card-yourbest'
  },
  {
    brand: 'riMLand',
    tag: 'real estate',
    className: 'case-card-rimland'
  }
];

const Testimonials = () => {
  return (
    <section id="work" className="testimonials-section">
      <div className="testimonials-header">
        <h2>What they said after <br /> <span className="highlight-purple">working with us</span></h2>
      </div>

      <div className="testimonials-grid">
        <div className="testi-col">
          <article className="testi-card story-card-primary">
            <div className="story-avatar story-avatar-mint"></div>
            <div className="story-copy">
              <p>One of the best services we ever got to build my brand&apos;s system. Truly impeccable work all the way through.</p>
            </div>
            <div className="story-footer story-footer-plum">
              <h4>Millon Zahino</h4>
              <span>Behavioral Science</span>
            </div>
          </article>

          <article className={`testi-card case-card ${caseStudies[0].className}`}>
            <div className="case-card-copy">
              <h4>{caseStudies[0].brand}</h4>
              <span className="case-badge">{caseStudies[0].tag}</span>
              <span className="case-link">View case study -&gt;</span>
            </div>
          </article>

          <article className="testi-card story-card-bubble">
            <div className="bookmark-ribbon"></div>
            <p>One of the best services we ever got to build my brand&apos;s system. Truly impeccable work served.</p>
            <div className="bubble-footer">
              <div className="story-avatar story-avatar-sky"></div>
              <div className="bubble-pill">
                <h4>Mary Schnader</h4>
                <span>CEO, DoH</span>
              </div>
            </div>
            <div className="bubble-tail"></div>
          </article>
        </div>

        <div className="testi-col col-center">
          <article className={`testi-card case-card ${caseStudies[1].className}`}>
            <div className="case-card-copy">
              <h4>{caseStudies[1].brand}</h4>
              <span className="case-badge">{caseStudies[1].tag}</span>
              <span className="case-link">View case study -&gt;</span>
            </div>
          </article>

          <article className="testi-card story-card-spotlight">
            <div className="story-avatar story-avatar-ring"></div>
            <div className="spotlight-copy">
              <h5>&quot;What a work!&quot;</h5>
              <p>One of the best services we ever got to build my brand&apos;s system. Truly impeccable work served.</p>
              <h4>- Jonathan</h4>
            </div>
          </article>

          <article className={`testi-card case-card ${caseStudies[2].className}`}>
            <div className="case-card-copy">
              <h4>{caseStudies[2].brand}</h4>
              <span className="case-badge">{caseStudies[2].tag}</span>
              <span className="case-link">View case study -&gt;</span>
            </div>
          </article>
        </div>

        <div className="testi-col">
          <article className="testi-card story-card-profile">
            <div className="profile-square"></div>
            <div className="profile-header">
              <h4>John Mary</h4>
              <span>CEO, Delicacy of Haiti</span>
            </div>
            <p>One of the best services we ever got to build my brand&apos;s system. Truly impeccable work served.</p>
          </article>

          <article className="testi-card story-card-center">
            <div className="story-avatar story-avatar-blush"></div>
            <div className="center-copy">
              <h3>Excellent!</h3>
              <p>One of the best services we ever got to build my brand&apos;s system. Truly impeccable work served.</p>
              <h4>Millon Zahino</h4>
              <span>Behavioral Science</span>
            </div>
          </article>
        </div>
      </div>

      <div className="empathy-banner">
        <h2>PyroSynergy is essentially your <br /> <span className="highlight-text">empathetic big brother.</span></h2>
        <p>
          We believe <strong>empathy</strong> is the most underrated ingredient in business. It&apos;s what separates partners who actually get it from agencies who just bill you for it. This is our moat at PyroSynergy: to understand your pressure, your stakes, and your vision before we touch your strategy. It&apos;s also the foundation of <strong>PyroStack<sup>TM</sup></strong>, our proprietary framework built to decode founder pain points and build strategy that resonates with your outlook.
        </p>
      </div>
    </section>
  );
};

export default Testimonials;
