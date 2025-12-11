import React from 'react';
import './Services.css';

const Services = ({ servicesData, openCalendarPopup }) => {
  const handleCalendarButtonClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Calendar button clicked');
    openCalendarPopup();
  };

  return (
    <section id="services" className="services-section">
      <div className="section-heading">
        <h2 className="services-title">Our Capabilities</h2>
        <p className="services-subtitle">
          We turn ambitious ideas into intelligent, scalable, and beautiful digital solutions.
        </p>
      </div>

      <div className="services-container">
        {servicesData.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-card-content">
              <div className="service-text-section">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-statement">{service.shortStatement}</p>
                <p className="service-description">
                  {index === 0 && "From a simple landing page to a full e-commerce platform, let's help you get started."}
                  {index === 1 && "With smart strategy, targeted content, and thoughtful marketing, let's simplify your market visibility."}
                  {index === 2 && "We introduce AI tools, automation, and system level thinking to help you scale efficiency. Let's turn busy into better."}
                </p>
                <button
                  className="service-cta-btn"
                  onClick={handleCalendarButtonClick}
                  type="button"
                >
                  {service.ctaText}
                </button>
              </div>
              <div className="service-image-section">
                <img src={service.Image} alt={service.title} className="service-image" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;