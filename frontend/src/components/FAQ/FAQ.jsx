import { useState } from 'react';
import './FAQ.css';

const faqs = [
  {
    question: 'What services do you offer?',
    answer: (
      <>
        <p>We offer growth services (we like to comprehensively call them &ldquo;solutions&rdquo;), which cover both strategy and execution.</p>
        <ul>
          <li><strong>Strategy:</strong><br />Involves getting a deep understanding of your business (and its bottlenecks) through our <strong>PyroStack<sup>TM</sup></strong> framework.</li>
          <li><strong>Execution:</strong><br />Involves everything needed to implement the strategy; including UI/UX design, brand identity, web development, content design, social media management, AI creatives, workflows and automations.</li>
        </ul>
      </>
    )
  },
  {
    question: 'Why PyroSynergy, when other agencies exist?',
    answer: (
      <>
        <p>Most agencies skip the strategy and sell you execution. We understand the need for <strong>empathy</strong>, especially when you&rsquo;re early-stage.</p>
        <p>PyroSynergy identifies and helps 0-to-traction businesses building a solid, market-viable product who needs growth strategies &amp; execution.</p>
      </>
    )
  },
  {
    question: 'How does the pricing work?',
    answer: (
      <>
        <p>Every project is a custom solution, scoped and priced based on what's actually needed. Once we understand your goals and where you are, we put together a clear proposal. Engagements typically start at ₹25k, with most projects ranging from ₹50k-5L.</p>
      </>
    )
  },
  {
    question: 'What kind of founders does PyroSynergy work with?',
    answer: (
      <>
        <p>Typically early-stage founders who've pushed their product to the real world, regardless of industry or domain, and are receiving any form of market validation; be it recognition, revenue, or both.</p>
      </>
    )
  },
  {
    question: 'How does a typical engagement work?',
    answer: 'We start with a series of discovery calls and questions to understand your product, goals, and bottlenecks. This is followed by a strategy call, where we define the scope, deliverables, and timeline required to grow your business. Upon agreement, we jump right into building and execution.'
  }
];

const FAQ = ({ openCalendarPopup }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      {/* Decorative blurs */}
      <div className="faq-blur faq-blur-1"></div>
      <div className="faq-blur faq-blur-2"></div>

      <div className="faq-container">
        <div className="faq-left">
          <div className="faq-left-inner">
            <h2 className="faq-title">FAQs</h2>
            <p className="faq-subtitle">
              Clear answers to help you understand how we work, what to expect, and whether this is the right fit for you.
            </p>
            <div className="faq-cta-box">
              <p className="faq-cta-heading">Still have questions?</p>
              <p className="faq-cta-desc">Our experts are ready to guide you through the transition.</p>
              <button className="faq-cta-button" onClick={openCalendarPopup}>
                Book a FREE discovery call
              </button>
            </div>
          </div>
        </div>

        <div className="faq-right">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? 'faq-item-open' : ''}`}
            >
              <button className="faq-question" onClick={() => toggle(index)}>
                <span className="faq-question-text">{faq.question}</span>
                <span className="faq-icon">
                  <span className="faq-icon-symbol">{openIndex === index ? '−' : '+'}</span>
                </span>
              </button>
              <div className="faq-answer-wrapper">
                <div className="faq-answer">{faq.answer}</div>
              </div>
              {openIndex === index && (
                <button
                  type="button"
                  className="faq-collapse-strip"
                  aria-label="Collapse answer"
                  onClick={() => toggle(index)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
