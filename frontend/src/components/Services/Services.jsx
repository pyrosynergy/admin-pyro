import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import './Services.css'; // Your CSS file

const Services = ({ 
  servicesData,
  expandedCardIndex,
  closingCardIndex,
  handleCardClick,
  handleCloseCard,
  openCalendarPopup
}) => {
  const handleCalendarButtonClick = (e) => {
    e.stopPropagation();
    e.preventDefault(); // Add this to prevent any default behavior
    console.log('Calendar button clicked'); // Add for debugging
    openCalendarPopup();
  };

  return (
    <section id="services" className="services-section">
      <div className="services-interactive-container">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className={`service-card-wrapper ${
              expandedCardIndex !== null
                ? expandedCardIndex === index
                  ? "expanded"
                  : "overlay"
                : ""
            } ${closingCardIndex === index ? 'closing-instant' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="service-card-interactive" onClick={(e) => { if (expandedCardIndex === index) e.stopPropagation() }}>
              <div className="service-card-interactive-content">
                {/* Content for Collapsed Card */}
                <div className="card-content-initial">
                  <div className="card-image-initial">
                    <img src={service.Image} alt="" />
                  </div>
                  <h3 className="service-card-title-quote">
                    {service.title}
                  </h3>
                  <div className="card-buttons-initial">
                    <button
                      className="card-cta-initial"
                      onClick={handleCalendarButtonClick}
                      type="button" // Add explicit type
                    >
                      {service.ctaText}
                    </button>
                    <button
                      className="know-more-btn"
                      onClick={(e) => { e.stopPropagation(); handleCardClick(index); }}
                      type="button" // Add explicit type
                    >
                      Know More
                    </button>
                  </div>
                </div>

                {/* Content for Expanded Card */}
                <div className="card-content-expanded">
                  <h2 className="modal-title">{service.title}</h2>
                  
                  {/* Special layout for first card (index 0) */}
                  {index === 0 ? (
                    <div className="modal-main-content first-card-layout">
                      {/* Left Column (Text) */}
                      <div className="modal-text-content">
                        <p className="modal-statement">{service.shortStatement}</p>
                        <p className="modal-description">
                          From a simple landing page to a full e-commerce platform, let's help you get started.
                        </p>
                      </div>

                      {/* Right Column (Image) */}
                      <div className="modal-image-container">
                        <img src={service.Image} alt={service.title} className="modal-image" />
                      </div>
                    </div>
                  ) : index === 1 ? (
                    // Special layout for second card (index 1)
                    <div className="modal-main-content second-card-layout">
                      {/* Left Column (Text) */}
                      <div className="modal-text-content">
                        <p className="modal-statement">Your products is great, no doubt. But have you positioned it right?</p>
                        <p className="modal-description">
                          With smart strategy, targeted content, and thoughtful marketing,let's simplify your market visibility.
                        </p>
                      </div>

                      {/* Right Column (Image) */}
                      <div className="modal-image-container">
                        <img src={service.Image} alt={service.title} className="modal-image" />
                      </div>
                    </div>
                  ) : index === 2 ? (
                    // Special layout for third card (index 2)
                    <div className="modal-main-content third-card-layout">
                      {/* Left Column (Text) */}
                      <div className="modal-text-content">
                        <p className="modal-statement">You've figured out the fundamentals. How about streaming your operations?</p>
                        <p className="modal-description">
                          We introduce AI tools, automation, and system level thinking to help you scale efficiency. Let's turn busy into better.
                        </p>
                      </div>

                      {/* Right Column (Image) */}
                      <div className="modal-image-container">
                        <img src={service.Image} alt={service.title} className="modal-image" />
                      </div>
                    </div>
                  ) : (
                    // Default layout for other cards
                    <div className="modal-main-content">
                      {/* Left Column (Text) */}
                      <div className="modal-text-content">
                        <p className="modal-statement">{service.shortStatement}</p>
                      </div>

                      {/* Right Column (Image) */}
                      <div className="modal-image-container">
                        <img src={service.Image} alt={service.title} className="modal-image" />
                      </div>
                    </div>
                  )}

                  <button
                    className="modal-cta-btn"
                    onClick={handleCalendarButtonClick}
                    type="button" // Add explicit type
                  >
                    {service.ctaText}
                  </button>
                </div>
              </div>

              <button
                className="card-close-btn"
                onClick={handleCloseCard}
                aria-label="Close details"
                type="button" // Add explicit type
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;