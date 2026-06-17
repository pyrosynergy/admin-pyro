import React from 'react';
import './DecodePath.css';
import icon01 from '../../assets/decode-path-01.png';
import icon02 from '../../assets/decode-path-02.png';
import icon03 from '../../assets/decode-path-03.png';
import icon04 from '../../assets/decode-path-04.png';

const DecodePath = ({ handleNavigateToQuestionnaire }) => {
  const cards = [
    {
      number: '01',
      title: 'KyB\n(Know Your Business)',
      description: "It starts with the KyB: a short <strong>6-minute questionnaire</strong> designed to surface where your growth is stuck and whether we're the right team to fix it.",
      icon: icon01
    },
    {
      number: '02',
      title: 'Discovery calls',
      description: "Once we confirm the fit, we go deep. A series of <strong>focused conversations</strong> to understand exactly where you are, and what's holding you back. No assumptions made.",
      icon: icon02
    },
    {
      number: '03',
      title: 'Strategy call',
      description: "Everything we've learned comes together here. We map out a complete <strong>growth roadmap</strong> covering your key metrics and the specific levers we'll pull to move them.",
      icon: icon03
    },
    {
      number: '04',
      title: 'Blueprint starts',
      description: 'Upon alignment, we translate it into an <strong>execution blueprint</strong> with a clear timeline. Most founders move into the Blueprint phase within <strong>48 hours</strong> of completing Decode.',
      icon: icon04
    }
  ];

  return (
    <section id="decode-path" className="decode-path-section">
      <div className="decode-path-container">
        <h2 className="decode-path-title">The Decode Path</h2>
        <p className="decode-path-subtitle">
          Every business has a bottleneck hiding in plain sight. <br />
          Decode is where we find it; from identifying the first big <br />
          chokepoint to strategizing a full blueprint to move past it.
        </p>

        <div className="decode-path-grid">
          {cards.map((card, index) => (
            <div
              className="decode-path-card"
              key={index}
              style={{ '--card-index': index }}
            >
              <div className="card-header">
                <h3 className="card-title">
                  {card.title.split('\n').map((line, lineIndex) => (
                    <React.Fragment key={lineIndex}>
                      {line}
                      {lineIndex === 0 && card.title.includes('\n') && <br />}
                    </React.Fragment>
                  ))}
                </h3>
                <div className="card-number">{card.number}</div>
              </div>
              <p className="card-description" dangerouslySetInnerHTML={{ __html: card.description }}></p>
              <img src={card.icon} alt="" className="card-icon" />
            </div>
          ))}
        </div>

        <button className="decode-path-btn" onClick={handleNavigateToQuestionnaire}>
          See If We're A Fit
        </button>
      </div>
    </section>
  );
};

export default DecodePath;
