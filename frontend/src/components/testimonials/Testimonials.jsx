import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaQuoteLeft, FaArrowRight, FaUser } from 'react-icons/fa';
import './Testimonials.css';
import TestimonialsMobile from './TestimonialsMobile.jsx';

import { findById } from './testimonialsData.js';
import logoViali from '../../assets/logo_viali.png';

import imgPhoneCollage from '../../assets/flobites/device-tablet-mockup.png';
import imgThreePhones from '../../assets/flobites/three-phones.png';
import imgLaptopMockup from '../../assets/flobites/device-laptop-mockup.png';
import imgVialiDevices from '../../assets/viali/showcase-devices.png';
import imgAmbassador from '../../assets/JRJP_AI_Ambassaror.webp';

const TestimonialCard = ({ item }) => {
  const navigate = useNavigate();

  if (item.variant === 'B') {
    return (
      <article className="pt-card pt-card--b">
        <span className="pt-b-label">{item.label}</span>

        <div className="pt-b-metric">
          <span className="pt-b-number">{item.metric}</span>
          <span className="pt-b-metric-label">{item.metricLabel}</span>
        </div>

        <p className="pt-b-desc">{item.description}</p>
        <footer className={`pt-b-footer${!item.caseStudyPath ? ' pt-b-footer--logo-left' : ''}`}>
          {item.caseStudyPath && (
            <button
              type="button"
              className="pt-b-cta"
              onClick={() => navigate(item.caseStudyPath)}
            >
              {item.cta}
              <FaArrowRight className="pt-b-cta-arrow" aria-hidden="true" />
            </button>
          )}

          <div className="pt-b-logo">
            <img src={item.logo} alt={item.logoAlt} />
          </div>
        </footer>
      </article>
    );
  }

  const isFeatured = item.variant === 'A';

  return (
    <article
      className={`pt-card ${isFeatured ? 'pt-card--a' : 'pt-card--c'}${item.accent ? ` pt-accent-${item.accent}` : ''
        }`}
    >
      {isFeatured && (
        <div className="pt-a-media">
          {item.id === 'flobites' ? (
            <div className="flobites-collage">
              <img src={imgThreePhones} className="img-three-phones" alt="Three phones mockup" />
              <img src={imgLaptopMockup} className="img-laptop" alt="Laptop mockup" />
              <img src={imgPhoneCollage} className="img-phone-collage" alt="Phone collage mockup" />
            </div>
          ) : item.id === 'viali' ? (
            <div className="viali-collage">
              <img src={imgVialiDevices} className="viali-devices" alt="Viali devices mockup" />
              <img src={logoViali} className="viali-logo" alt="Viali logo" />
            </div>
          ) : item.id === 'jrjp' ? (
            <div className="jrjp-ambassador">
              <img
                src={imgAmbassador}
                className="jrjp-ambassador-img"
                alt="Ira, the AI brand ambassador built for Jai Rajendra Jewel Palace"
              />
              <div className="jrjp-ambassador-copy">
                <span className="jrjp-ambassador-name">Ira</span>
                <span className="jrjp-ambassador-role">AI Brand Ambassador</span>
              </div>
            </div>
          ) : (
            <FaUser className="pt-a-media-icon" aria-hidden="true" />
          )}
        </div>
      )}

      <blockquote className={isFeatured ? 'pt-a-quote' : 'pt-c-quote'}>
        {isFeatured && <FaQuoteLeft className="pt-quote-mark" aria-hidden="true" />}
        <p>{item.quote}</p>
      </blockquote>

      {isFeatured && item.caseStudyPath && (
        <button
          type="button"
          className="pt-b-cta pt-a-cta"
          onClick={() => navigate(item.caseStudyPath)}
        >
          View Case Study
          <FaArrowRight className="pt-b-cta-arrow" aria-hidden="true" />
        </button>
      )}

      {/* A founder portrait and the brand logo are alternatives, not a pair:
          the photo takes the lead slot and the logo steps aside. */}
      <footer
        className={`${isFeatured ? 'pt-a-footer' : 'pt-c-footer'}${item.founderPhoto ? ' pt-footer--photo' : ''
          }`}
      >
        {item.founderPhoto && (
          <div className="pt-founder-photo">
            <img src={item.founderPhoto} alt={item.name} />
          </div>
        )}

        <div className={isFeatured ? 'pt-a-person' : 'pt-c-person'}>
          <span className={isFeatured ? 'pt-a-name' : 'pt-c-name'}>{item.name}</span>
          {item.role && (
            <span className={isFeatured ? 'pt-a-role' : 'pt-c-role'}>{item.role}</span>
          )}
        </div>

        {!item.founderPhoto && (
          <div className={`${isFeatured ? 'pt-a-logo' : 'pt-c-logo'} pt-logo--${item.id}`}>
            {item.logo ? (
              <img src={item.logo} alt={item.logoAlt} />
            ) : (
              <span className="pt-logo-fallback">{item.initials}</span>
            )}
          </div>
        )}
      </footer>
    </article>
  );
};

const Testimonials = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const featured = findById('jrjp');
  const viali = findById('viali');


  const flobites = findById('flobites');
  const tog = findById('tog');
  const delicacy = findById('delicacy');
  const elytrix = findById('elytrix');

  return (
    <section id="work" className="testimonials-section">
      <div className="testimonials-header">
        <h2>What founders said <br /> <span className="highlight-purple">after working with us</span></h2>
      </div>

      {isMobile ? (
        <TestimonialsMobile />
      ) : (
        /*
          Three independent masonry columns sharing one top edge — B lives
          inside the center column instead of its own full-width row above
          everything. That's what lets the outer A cards start at the same
          height as B (not below it), giving the section a staggered outline
          instead of a flat rectangular one, and what lets the center
          column's second card (Delicacy) start right after the short
          VJ/MIH pair rather than waiting for the tall outer A cards. Each
          outer C card sits directly beneath its own column's A card.
        */
        <div className="pt-bento-columns">
          <div className="pt-bento-col">
            <TestimonialCard item={tog} />
            <TestimonialCard item={viali} />
          </div>

          <div className="pt-bento-col pt-bento-col-center">
            <TestimonialCard item={delicacy} />
            <TestimonialCard item={featured} />
          </div>

          <div className="pt-bento-col">
            <TestimonialCard item={flobites} />
            <TestimonialCard item={elytrix} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
