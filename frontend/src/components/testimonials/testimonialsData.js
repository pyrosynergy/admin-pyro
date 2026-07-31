import logoViali from '../../assets/logo_viali.png';
import photoRosemay from '../../assets/viali/founder-rosemay.png';
import photoSantosh from '../../assets/santosh_founder_circle.webp';
import logoFlobites from '../../assets/logo_fb_the.png';
import logoJrjp from '../../assets/jrjplogopyro.png';
import logoTog from '../../assets/logo_tog.png';
import logoDelicacy from '../../assets/logo_889.png';
import logoElytrix from '../../assets/ElytriX__1_.webp';

/*
 * Single source of truth for every testimonial, shared by the desktop bento
 * grid (Testimonials.jsx) and the mobile carousel (TestimonialsMobile.jsx) so
 * both surfaces always show the same founders, quotes and logos.
 *
 * `variant` drives which flavor of the desktop TestimonialCard renders:
 * 'A' (featured, photo + heading quote), 'B' (metric / case study),
 * 'C' (compact quote). Order here matches the wireframe's reading order:
 * B centered on top, then the upper row (A, C, C, A), then the lower row
 * (C, A, C). The mobile carousel derives its slide order from this same
 * list — see buildMobileSlides in TestimonialsMobile.jsx.
 *
 * `company` is the plain brand name, used for the mobile card's badge.
 */
export const testimonials = [
  // {
  //   id: 'jrjp',
  //   variant: 'B',
  //   label: 'Jai Rajendra Jewel Palace',
  //   metricLabel: 'Instagram followers',
  //   description: 'AI brand ambassador built from zero, scaling organic reach profitably.',
  //   cta: 'View Case Study',
  //   logo: logoJrjp,
  //   logoAlt: 'Jai Rajendra Jewel Palace logo',
  // },

  {
    id: 'jrjp',
    variant: 'A',
    accent: 'delicacy',
    company: 'Jai Rajendra Jewel Palace',
    quote: '"We didn\'t even know such AI characters could be used as our AI brand ambassador in social media marketing. That\'s superb."',
    // Credited to the brand rather than a person, so the company name takes
    // the bold name line and there's no role beneath it.
    name: 'Jai Rajendra Jewel Palace',
    logo: logoJrjp,
    logoAlt: 'Jai Rajendra Jewel Palace logo',
    initials: 'JRJP',
    // caseStudyPath: '/case-studies/jrjp',
  },
  {
    id: 'viali',
    variant: 'A',
    accent: 'viali',
    company: 'Viali Hair Care',
    quote: '"This was literally a blessing in disguise! Finally an agency who I can rely on with my business now."',
    name: 'Rosemay J. Martelly',
    role: 'Founder & CEO, Viali Hair Care',
    logo: logoViali,
    logoAlt: 'Viali Hair Care logo',
    initials: 'VH',
    // A founder portrait replaces the logo in the card footer — see
    // .pt-footer--photo / .tm-avatar--photo.
    founderPhoto: photoRosemay,
    caseStudyPath: '/case-studies/viali',
  },
  {
    id: 'flobites',
    variant: 'A',
    accent: 'flobites',
    company: 'FloBites',
    quote: "\"The team understood our product and requirements, and I'm happy with how the website turned out.\"",
    name: 'Santosh Parachuri',
    role: 'Co-Founder, FloBites by THE',
    logo: logoFlobites,
    logoAlt: 'FloBites logo',
    initials: 'FB',
    // Portrait over the brand mark in the card footer, same as Viali — the
    // logo now heads the card, so repeating it beside the name said nothing.
    founderPhoto: photoSantosh,
    caseStudyPath: '/case-studies/flobites',
  },
  {
    id: 'tog',
    variant: 'C',
    company: 'Tuhch of Grace',
    quote: '“I really liked the designs and creativity that PyroSynergy brings to the table.”',
    name: 'Marie B. Georges',
    role: 'Founder, Tuhch of Grace',
    logo: logoTog,
    logoAlt: 'Tuhch of Grace logo',
    initials: 'TG',
  },
  {
    id: 'delicacy',
    variant: 'C',
    company: 'Delicacy of Haiti',
    quote: '"They work in collaboration with me, are open for input, and encourage me to expand my ideas."',
    name: 'Myriam Raymond',
    role: 'Founder, Delicacy of Haiti',
    logo: logoDelicacy,
    logoAlt: 'Delicacy of Haiti logo',
    initials: 'DH',
  },
  {
    id: 'elytrix',
    variant: 'C',
    company: 'Elytrix',
    quote: '“Prachet (PY) and his team helped me understand my competitors better, given how vast the health care space is becoming.”',
    name: 'Dr. J. Sravanthi',
    role: 'Founder, Elytrix',
    logo: logoElytrix,
    logoAlt: 'Elytrix logo',
    // Kept as the fallback both renderers drop to if the logo ever goes missing.
    initials: 'EX',
  },
];

export const findById = (id) => testimonials.find((item) => item.id === id);

/*
 * Quotes in the list above are inconsistent about carrying their own wrapping
 * quote marks; strip them so a renderer that adds its own doesn't double up.
 */
export const stripQuoteMarks = (text = '') =>
  text.replace(/^\s*["“]\s*/, '').replace(/\s*["”]\s*$/, '');

export default testimonials;
