import { useNavigate } from 'react-router-dom';
import { FaQuoteLeft, FaArrowRight, FaUser } from 'react-icons/fa';
import './Testimonials.css';

import logoViali from '../../assets/logo_viali.png';
import logoFlobites from '../../assets/logo_fb_the.png';
import logoJrjp from '../../assets/jrjplogopyro.png';
import logoMih from '../../assets/mih.png';
import logoTog from '../../assets/logo_tog.png';

/*
 * Single source of truth for every testimonial. `variant` drives which
 * flavor of TestimonialCard renders: 'A' (featured, photo + heading quote),
 * 'B' (metric / case study), 'C' (compact quote). Order here matches the
 * wireframe's reading order: B centered on top, then the upper row
 * (A, C, C, A), then the lower row (C, A, C).
 */
const testimonials = [
  {
    id: 'jrjp',
    variant: 'B',
    label: 'Jai Rajendra Jewel Palace',
    metric: '30.2K+',
    metricLabel: 'Instagram followers',
    description: 'AI brand ambassador built from zero, scaling organic reach profitably.',
    cta: 'VIEW CASE STUDY',
    logo: logoJrjp,
    logoAlt: 'Jai Rajendra Jewel Palace logo',
  },
  {
    id: 'viali',
    variant: 'A',
    accent: 'viali',
    quote: '"This was literally a blessing in disguise! Finally an agency who I can rely on with my business now."',
    name: 'Rosemay J. Martelly',
    role: 'Founder & CEO, Viali Hair Care',
    logo: logoViali,
    logoAlt: 'Viali Hair Care logo',
  },
  {
    id: 'vj',
    variant: 'C',
    quote: "\"Sharp, fast, and refreshingly honest about what would and wouldn't work for us.\"",
    name: 'Vishal Jain',
    role: 'Founder, VJ',
    logo: null,
    initials: 'VJ',
  },
  {
    id: 'mih',
    variant: 'C',
    quote: '"Every deliverable felt like it was built for our business, not templated for anyone else\'s."',
    name: 'Aditi Rao',
    role: 'Founder, MIH',
    logo: logoMih,
    logoAlt: 'MIH logo',
  },
  {
    id: 'flobites',
    variant: 'A',
    accent: 'flobites',
    quote: "\"They didn't just design a website, they translated exactly how we think about nutrition into every pixel.\"",
    name: 'Aanya Kapoor',
    role: 'Co-Founder, FloBites',
    logo: logoFlobites,
    logoAlt: 'FloBites logo',
    caseStudyPath: '/case-studies/flobites',
  },
  {
    id: 'tog',
    variant: 'C',
    quote: "\"The team understood our product and requirements, and I'm happy with how the website turned out.\"",
    name: 'Grace Anderson',
    role: 'Founder, Touch of Grace',
    logo: logoTog,
    logoAlt: 'Touch of Grace logo',
  },
  {
    id: 'delicacy',
    variant: 'A',
    accent: 'delicacy',
    quote: '"They work in collaboration with me, are open for input, and encourage me to expand my ideas."',
    name: 'Myriam Joseph-Raymond',
    role: 'Founder, Delicacy of Haiti',
    logo: null,
    logoAlt: 'Delicacy of Haiti logo',
    initials: 'DH',
  },
  {
    id: 'elytrix',
    variant: 'C',
    quote: "\"PyroSynergy became the technical co-founder we didn't have the bandwidth to hire.\"",
    name: 'Rohan Mehta',
    role: 'Founder, Elytrix',
    logo: null,
    initials: 'EX',
  },
];

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

        <footer className="pt-b-footer">
          <button type="button" className="pt-b-cta">
            {item.cta}
            <FaArrowRight className="pt-b-cta-arrow" aria-hidden="true" />
          </button>
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
      className={`pt-card ${isFeatured ? 'pt-card--a' : 'pt-card--c'}${
        item.accent ? ` pt-accent-${item.accent}` : ''
      }`}
    >
      {isFeatured && (
        <div className="pt-a-media">
          <FaUser className="pt-a-media-icon" aria-hidden="true" />
        </div>
      )}

      <blockquote className={isFeatured ? 'pt-a-quote' : 'pt-c-quote'}>
        {isFeatured && <FaQuoteLeft className="pt-quote-mark" aria-hidden="true" />}
        <p>{item.quote}</p>
      </blockquote>

      {isFeatured && (
        <button
          type="button"
          className="pt-b-cta pt-a-cta"
          onClick={() => item.caseStudyPath && navigate(item.caseStudyPath)}
        >
          VIEW CASE STUDY
          <FaArrowRight className="pt-b-cta-arrow" aria-hidden="true" />
        </button>
      )}

      <footer className={isFeatured ? 'pt-a-footer' : 'pt-c-footer'}>
        <div className={isFeatured ? 'pt-a-person' : 'pt-c-person'}>
          <span className={isFeatured ? 'pt-a-name' : 'pt-c-name'}>{item.name}</span>
          <span className={isFeatured ? 'pt-a-role' : 'pt-c-role'}>{item.role}</span>
        </div>
        <div className={isFeatured ? 'pt-a-logo' : 'pt-c-logo'}>
          {item.logo ? (
            <img src={item.logo} alt={item.logoAlt} />
          ) : (
            <span className="pt-logo-fallback">{item.initials}</span>
          )}
        </div>
      </footer>
    </article>
  );
};

const findById = (id) => testimonials.find((item) => item.id === id);

const Testimonials = () => {
  const featured = findById('jrjp');
  const viali = findById('viali');
  
  const vj = findById('vj');
  const mih = findById('mih');
  const flobites = findById('flobites');
  const tog = findById('tog');
  const delicacy = findById('delicacy');
  const elytrix = findById('elytrix');

  return (
    <section id="work" className="testimonials-section">
      <div className="testimonials-header">
        <h2>What founders said <br /> <span className="highlight-purple">after working with us</span></h2>
      </div>

      {/*
        Three independent masonry columns sharing one top edge — B lives
        inside the center column instead of its own full-width row above
        everything. That's what lets the outer A cards start at the same
        height as B (not below it), giving the section a staggered outline
        instead of a flat rectangular one, and what lets the center column's
        second card (Delicacy) start right after the short VJ/MIH pair
        rather than waiting for the tall outer A cards. Each outer C card
        sits directly beneath its own column's A card.
      */}
      <div className="pt-bento-columns">
        <div className="pt-bento-col">
          <TestimonialCard item={viali} />
          <TestimonialCard item={tog} />
        </div>

        <div className="pt-bento-col pt-bento-col-center">
          <TestimonialCard item={featured} />
          <div className="pt-bento-pair">
            <TestimonialCard item={vj} />
            <TestimonialCard item={mih} />
          </div>
          <TestimonialCard item={delicacy} />
        </div>

        <div className="pt-bento-col">
          <TestimonialCard item={flobites} />
          <TestimonialCard item={elytrix} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
