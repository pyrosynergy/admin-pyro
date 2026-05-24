import React from 'react';
import './WhyUs.css';
import bubblePurple from '../../assets/bubble-pink.png';
import bubbleBlue from '../../assets/bubble-blue.png';
import bubbleDot from '../../assets/Ellipse 18.png';
import bubbleDotSmall from '../../assets/Ellipse 19.png';

const WhyUs = () => {
  const cards = [
    {
      type: 'left',
      quote: `"My business feels like chaos, and I can't navigate my way through it."`,
      response: `We bring everything in one place, fixing both tech and business logic piece-by piece; be it building custom <strong>backend systems</strong> or <strong>business strategy.</strong>`
    },
    {
      type: 'right',
      quote: `"Everyone in my domain is posting online, but I really don't have the time or energy for it."`,
      response: `The task of growing your <strong>social media presence</strong> is on us, from planning &amp; strategy &rarr; scripting &rarr; scheduling &rarr; uploading &rarr; performance tracking; end-to-end.`
    },
    {
      type: 'left',
      quote: `"Everyone's talking about how AI can save my time and money, but I don't know where to even start."`,
      response: `Integrating AI into your business can be overwhelming. We do the heavy lifting by setting up <strong>AI workflows</strong> and <strong>automations</strong> that fit right into your system.`
    },
    {
      type: 'right',
      quote: `"Most agencies I've worked with don't get me. What I ask is often not delivered."`,
      response: `<strong>Empathy in Business</strong> is what shapes <em>PyroSynergy's</em> core. Our <strong>PyroStack<sup>TM</sup></strong> framework ensures we build a working structure around your primary and latent requirements.`
    }
  ];

  return (
    <section id="services" className="why-us-section">
      <div className="why-us-header">
        <h2>You build the product, while PyroSynergy<br /> handles <span className="highlight-text">everything</span> around it.</h2>
        <p className="why-us-subtitle">
          Your idea deserves more than a half-built system and a stretched team.<br />
          Here&apos;s what founders came to us with:
        </p>
      </div>

      <div className="why-us-timeline">
        {cards.map((card, index) => (
          <div className={`why-us-item ${card.type}`} key={index}>
            <div
              className="whyus-bubble-container"
              style={{ backgroundImage: `url(${card.type === 'left' ? bubblePurple : bubbleBlue})` }}
            >
              <div className="whyus-bubble-quote">
                <p><em>{card.quote}</em></p>
              </div>
              <div className="whyus-bubble-response">
                <p dangerouslySetInnerHTML={{ __html: card.response }}></p>
              </div>
            </div>
            {card.type === 'right' && (
              <>
                <img src={bubbleDot} alt="" className="whyus-bubble-dot" />
                <img src={bubbleDotSmall} alt="" className="whyus-bubble-dot-small" />
              </>
            )}
            {card.type === 'left' && (
              <img src={bubbleDotSmall} alt="" className="whyus-bubble-dot-small whyus-bubble-dot-small-left" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
