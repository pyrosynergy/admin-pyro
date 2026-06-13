import React from 'react';
import fireIcon from '../../assets/pyro-satck-fire.svg';
import './PyroStack.css';

const PyroStack = ({ handleNavigateToQuestionnaire }) => {
  const steps = [
    {
      title: 'Decode',
      content: [
        'Before we propose anything, we need to understand where you actually are',
        "We ask the questions most people skip. If you're a fit, we'll both know it by the end"
      ],
      number: '01'
    },
    {
      title: 'Blueprint',
      content: [
        'We work on a blueprint - so nothing is based on assumptions but structure',
        "You decide what makes sense and what doesn't. We move ahead accordingly"
      ],
      number: '02'
    },
    {
      title: 'Build',
      content: [
        'Once the inputs are clear and direction is set, we build your exact requirements',
        'Nothing goes unchecked and without your feedback, in every step'
      ],
      number: '03'
    },
    {
      title: 'Pyros',
      content: [
        'Ta-da! Your solution is now built. Before we ship it, we review performance metrics and make final adjustments and refinements, if required.',
        'Once delivered, you decide the next steps of our engagement; be it support or co-working on your next big project.'
      ],
      isFlame: true
    }
  ];

  return (
    <section id="pyrostack" className="pyrostack-section">
      <div className="pyrostack-container">
        <h2 className="pyrostack-title">PyroStack™: The Framework for Founders</h2>
        <p className="pyrostack-subtitle">
          We guide and help you right from breaking down the problem and laying<br />
          the foundation, to building and execution, all while keeping your goal and<br />
          vision intact throughout
        </p>

        <div className="pyrostack-timeline">
          <div className="timeline-line"></div>

          {steps.map((step, index) => (
            <div className="timeline-item" key={index}>
              <div className="timeline-node-wrapper">
                <div className="timeline-node"></div>
              </div>

              <div className="timeline-card">
                <div className="card-text-content">
                  <h3 className="timeline-card-title">{step.title}</h3>
                  <div className="timeline-card-desc">
                    {step.content.map((paragraph, itemIndex) => (
                      <p key={itemIndex}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div className="timeline-card-bg-element">
                  {step.isFlame ? (
                    <div className="flame-icon-wrapper">
                      <img src={fireIcon} alt="" />
                    </div>
                  ) : (
                    <span className="bg-number">{step.number}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="pyrostack-btn" onClick={handleNavigateToQuestionnaire}>
          Get Started
        </button>
      </div>
    </section>
  );
};

export default PyroStack;
