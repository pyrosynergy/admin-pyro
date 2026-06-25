import React from 'react';
import './Flobites.css';
import flobitesLogo from '../../../assets/flobites/flobites.png';
import phoneCollage from '../../../assets/flobites/phone-collage.png';
import nothingExtraPhone from '../../../assets/flobites/nothing-extra-phone.png';
import barsPolaroid from '../../../assets/flobites/bars-polaroid.png';
import seedsBowl from '../../../assets/flobites/seeds-bowl.png';
import womenPolaroid from '../../../assets/flobites/women-polaroid.png';
import curvyDots from '../../../assets/flobites/curvy-dots.svg';
import issueHeroScreenshot from '../../../assets/flobites/issue-hero-screenshot.png';
import issueNewArrivalGrid from '../../../assets/flobites/issue-new-arrival-grid.png';
import issueBalanceBite from '../../../assets/flobites/issue-balance-bite.png';
import annotationOne from '../../../assets/flobites/annotation-one.svg';
import annotationTwo from '../../../assets/flobites/annotation-two.svg';
import buildSuperseedsScreen from '../../../assets/flobites/build-superscreen-screen.png';
import buildWomenonfloScreen from '../../../assets/flobites/build-womenonflo-screen.png';
import pyrosNutrientsScreen from '../../../assets/flobites/pyros-nutrients-screen.png';
import pyrosFruitIcon from '../../../assets/flobites/pyros-fruit-icon.png';
import threePhones from '../../../assets/flobites/three-phones.png';
import testimonialVideo from '../../../assets/flobites/testimonial-video.png';
import deviceLaptopMockup from '../../../assets/flobites/device-laptop-mockup.png';
import deviceTabletMockup from '../../../assets/flobites/device-tablet-mockup.png';
import devicePhoneMockup from '../../../assets/flobites/device-phone-mockup.png';
import heroPhoneMainTrimmed from '../../../assets/flobites/device-phone-mockup-trimmed.png';
import heroPhoneCoverTilted from '../../../assets/flobites/hero-phone-cover-titled-trimmed.png';
import heroPhoneSeedsTilted from '../../../assets/flobites/hero-phone-seeds-tilted-trimmed.png';
import heroPhoneComfortTilted from '../../../assets/flobites/hero-phone-comfort-tilted-trimmed.png';
import heroDoodleThinking from '../../../assets/flobites/hero-doodle-thinking.png';
import heroDoodleSnack from '../../../assets/flobites/hero-doodle-snack.png';
import heroPng from '../../../assets/flobites/hero.png';

const Flobites = () => {
  return (
    <section className="flobites-section">
      <div className="flobites-hero-wrap">
  <img src={heroPng} alt="FloBites Hero Section Blueprint" className="flobites-hero-static-image" />
</div>

      <div className="flobites-meta">
        <div className="flobites-meta-left">
          <div className="flobites-meta-item">
            <span className="flobites-meta-label">Brand Name</span>
            <span className="flobites-meta-value">TheHormoneEssentials</span>
          </div>
          <div className="flobites-meta-item">
            <span className="flobites-meta-label">Industry</span>
            <span className="flobites-meta-value">Food</span>
          </div>
        </div>

        <div className="flobites-meta-right">
          <h3 className="flobites-meta-heading">Meet FloBites</h3>
          <p className="flobites-meta-description">
            FloBites, under the aegis of THE, was created to help women feel a
            little more supported during their periods, PCOS, hormonal changes
            and other everyday health struggles. Made with healthy ingredients
            like super seeds, the snack bars were designed to bring together
            the comfort, nourishment and better everyday wellness.
          </p>
        </div>
      </div>

      <div className="flobites-process">
        <h2 className="flobites-process-title">
          Turning consistency into <span className="flobites-process-title-accent">visual experience.</span>
        </h2>

        <div className="flobites-process-row">
          <div className="flobites-process-image">
            <img src={phoneCollage} alt="FloBites app screens shown on tilted phone mockups" />
          </div>
          <div className="flobites-process-text flobites-process-text1">
            <p className="flobites-process-lead">
              A palette that felt as balanced as the product itself.
            </p>
            <p className="flobites-process-body">
              The colours were chosen to match the product and packaging.
              Soft pinks made the brand feel friendly, while earthy tones
              gave a natural and balanced feel.
            </p>
          </div>
        </div>

        <div className="flobites-process-row">
          <div className="flobites-process-text flobites-process-text2">
            <h3 className="flobites-process-subheading">The Design Language We Built.</h3>
            <p className="flobites-process-body ">
              <strong>Typography</strong> — Different type styles were used to
              improve readability, create clear hierarchy, and match the
              brand's playful personality.
            </p>
            <p className="flobites-process-body">
              <strong>CTAs &amp; Buttons</strong> — Rounded shapes and varied
              button styles helped the interface feel cleaner, softer, and
              less repetitive across sections.
            </p>
          </div>
          <div className="flobites-process-image flobites-process-image--small">
            <img src={nothingExtraPhone} alt="FloBites app screen showing the Nothing Extra ingredient checklist" />
          </div>
        </div>
      </div>

      <div className="flobites-refine">
        <h2 className="flobites-refine-title">
          Refining what users <span className="flobites-refine-title-accent">actually felt.</span>
        </h2>
        <p className="flobites-refine-subtitle">
          Every small refinement helped make the experience <br />
          feel more clear and connected.
        </p>

        <div className="flobites-refine-stats">
          <div className="flobites-refine-stat">
            <span className="flobites-refine-stat-number">3</span>
            <span className="flobites-refine-stat-label">Clear product</span>
            <span className="flobites-refine-stat-sub">recognisable.</span>
          </div>
          <div className="flobites-refine-stat">
            <span className="flobites-refine-stat-number">3%</span>
            <span className="flobites-refine-stat-label">Stronger emotional</span>
            <span className="flobites-refine-stat-sub">connection.</span>
          </div>
          <div className="flobites-refine-stat">
            <span className="flobites-refine-stat-number">3</span>
            <span className="flobites-refine-stat-label">More ingredient</span>
            <span className="flobites-refine-stat-sub">exploration.</span>
          </div>
        </div>

        <div className="flobites-refine-quote">
          <span className="flobites-refine-quote-mark flobites-refine-quote-mark--left">&ldquo;</span>
          <p className="flobites-refine-quote-text">
            PyroSynergy helped us to translate the feeling behind FloBites
            into a digital experience that finally felt aligned with the
            product.
          </p>
          <span className="flobites-refine-quote-mark flobites-refine-quote-mark--right">&rdquo;</span>
        </div>
      </div>

      <div className="flobites-shift">
        <h2 className="flobites-shift-title">
          The shift <span className="flobites-shift-title-accent">FloBites</span> actually needed.
        </h2>

        <div className="flobites-shift-row">
          <div className="flobites-shift-text">
            <span className="flobites-shift-number">01</span>
            <h3 className="flobites-shift-heading">
              Building stronger <br />
              <span className="flobites-shift-heading-accent">recognition.</span>
            </h3>
            <p className="flobites-shift-body">
              The product needed its own clear presence and personality. We
              created a more playful and recognisable experience while still
              keeping the connection with The Hormone Essentials.
            </p>
          </div>
          <div className="flobites-shift-image">
            <img src={barsPolaroid} alt="Two FloBites bars styled as a polaroid photo" />
          </div>
        </div>

        <div className="flobites-shift-row">
          <div className="flobites-shift-text">
            <h3 className="flobites-shift-heading">
              Leading with <br />
              <span className="flobites-shift-heading-accent">Value.</span>
            </h3>
            <p className="flobites-shift-body">
              Instead of placing important details inside heavy sections, we
              made the product strengths more visible. Ingredients, hormonal
              wellness support, and the food-first approach became a bigger
              part of the experience.
            </p>
          </div>
          <div className="flobites-shift-image flobites-shift-image--bowl">
            <img src={seedsBowl} alt="Bowl of FloBites super seeds ingredients" />
            <img src={curvyDots} alt="" className="flobites-shift-curvy-dots" />
          </div>
          <span className="flobites-shift-number flobites-shift-number--standalone">02</span>
        </div>

        <div className="flobites-shift-row">
          <div className="flobites-shift-text">
            <span className="flobites-shift-number">03</span>
            <h3 className="flobites-shift-heading">
              Centering <br />
              <span className="flobites-shift-heading-accent">real stories.</span>
            </h3>
            <p className="flobites-shift-body">
              The product needed its own clear presence and personality. We
              created a more playful and recognisable experience while still
              keeping the connection with The Hormone Essentials.
            </p>
          </div>
          <div className="flobites-shift-image">
            <img src={womenPolaroid} alt="Smiling woman polaroid with a Women on Flo note card" />
          </div>
        </div>
      </div>

      <div className="flobites-issues">
        <div className="flobites-issues-dome flobites-issues-dome--top" aria-hidden="true"></div>

        <div className="flobites-issues-core">
        <div className="flobites-issues-inner">
          <h2 className="flobites-issues-title">Uncovering the Issues</h2>

          <div className="flobites-issues-item flobites-issues-item--one">
            <span className="flobites-issues-number flobites-issues-number--left">One</span>
            <div className="flobites-issues-card">
              <div className="flobites-issues-note">
                <p>
                  The <strong>THE</strong> and FloBites are both{' '}
                  <strong>combined into a single page website</strong> which
                  got cluttered and made it more confusing for users about
                  what to focus on.
                </p>
              </div>
              <div className="flobites-issues-shot flobites-issues-shot--framed">
                <img src={issueHeroScreenshot} alt="THE website hero screenshot reading Daily Support Made Simple" />
                <img src={annotationOne} alt="" className="flobites-issues-annotation" />
              </div>
            </div>
          </div>

          <div className="flobites-issues-item flobites-issues-item--two">
  <span className="flobites-issues-number flobites-issues-number--right">Two</span>
  <div className="flobites-issues-card flobites-issues-card--reverse">

    <div className="flobites-issues-note flobites-issues-note--center">
      <p>
        <strong>Bad User experience</strong> brought no clear
        navigation and accessibility for the users which further
        drove no sales.
      </p>
    </div>

    <div className="flobites-issues-shot">
      <img src={issueNewArrivalGrid} alt="New Arrivals product grid screenshot showing FloBites pack of 1 and pack of 6" />
      <img src={annotationTwo} alt="" className="flobites-issues-annotation" />
    </div>

  </div>
</div>

          <div className="flobites-issues-item flobites-issues-item--three">
            <span className="flobites-issues-number flobites-issues-number--left">Three</span>
            <div className="flobites-issues-card">
              <div className="flobites-issues-note">
                <p>
                  The whole <strong>website's design and content</strong> felt
                  unrelated with the brand's emotion, packaging and intention.
                  It couldn't communicate the emotion exactly and drive the
                  user attention &amp; interest.
                </p>
              </div>
              <div className="flobites-issues-shot flobites-issues-shot--wide">
                <img src={issueBalanceBite} alt="New Arrivals screenshot reading Balance in Every Bite" />
              </div>
            </div>
          </div>
        </div>
        </div>

        <div className="flobites-issues-dome flobites-issues-dome--bottom" aria-hidden="true"></div>
      </div>

      <div className="flobites-pyrostack">
        <div className="flobites-pyrostack-header">
          <div>
            <h2 className="flobites-pyrostack-title">How our PyroStack came into action ?</h2>
            <p className="flobites-pyrostack-subtitle">
              We developed the solution for this issue using our{' '}
              <strong>4-step PYROSTACK process</strong>
            </p>
          </div>
          <a href="#pyrostack" className="flobites-pyrostack-btn">View PyroStack</a>
        </div>

        <div className="flobites-pyrostack-grid">
          <div className="flobites-pyrostack-cell">
            <span className="flobites-pyrostack-number">1</span>
            <span className="flobites-pyrostack-label">DECODE</span>
          </div>
          <div className="flobites-pyrostack-cell">
            <span className="flobites-pyrostack-number">2</span>
            <span className="flobites-pyrostack-label">BLUEPRINT</span>
          </div>
          <div className="flobites-pyrostack-cell">
            <span className="flobites-pyrostack-number">3</span>
            <span className="flobites-pyrostack-label">BUILD</span>
          </div>
          <div className="flobites-pyrostack-cell">
            <span className="flobites-pyrostack-number">4</span>
            <span className="flobites-pyrostack-label">PYROS</span>
          </div>
        </div>
      </div>

      <div className="flobites-pyrostack-details">
        <div className="flobites-pyrostack-detail">
          <span className="flobites-pyrostack-detail-number">1</span>
          <h3 className="flobites-pyrostack-detail-heading">DECODE</h3>
          <p className="flobites-pyrostack-detail-body">
            Before redesigning the experience, we focused on understanding
            FloBites, its purpose, and the emotional needs of the women it
            supports. We identified key gaps in trust, storytelling, clarity,
            and emotional connection across the existing website experience.
          </p>
        </div>

        <div className="flobites-pyrostack-detail">
          <span className="flobites-pyrostack-detail-number">2</span>
          <h3 className="flobites-pyrostack-detail-heading">BLUEPRINT</h3>
          <p className="flobites-pyrostack-detail-body">
            Once the challenges became clear, we restructured the experience
            around simplicity, emotional clarity, and easier product
            understanding. From content hierarchy to storytelling flow, every
            decision was designed to help users feel more informed,
            supported, and connected to the brand.
          </p>
        </div>

        <div className="flobites-pyrostack-detail">
          <span className="flobites-pyrostack-detail-number">3</span>
          <h3 className="flobites-pyrostack-detail-heading">BUILD</h3>

          <div className="flobites-build-visual">
            <div className="flobites-build-screens">
              <div className="flobites-build-screen">
                <img src={buildSuperseedsScreen} alt="The Super Seeds Formula ingredient grid screen" />
              </div>
              <div className="flobites-build-screen">
                <img src={buildWomenonfloScreen} alt="Women on Flo testimonial screen" />
              </div>
            </div>

            <div className="flobites-build-stickies">
              <div className="flobites-sticky flobites-sticky--pink">
                <span className="flobites-sticky-pin"></span>
                <span className="flobites-sticky-tag">#SUPERSEEDS</span>
                <p>
                  The super seeds formula was one of the major part of the
                  project when building it. And this is how we curated a
                  separate section for it!
                </p>
              </div>
              <div className="flobites-sticky flobites-sticky--yellow">
                <span className="flobites-sticky-pin"></span>
                <span className="flobites-sticky-tag">#WOMENONFLO</span>
                <p>
                  This section is built to show some of the most impactful
                  testimonials from women of our FLO. And built a dedicated
                  COMMUNITY page for them.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flobites-pyrostack-detail">
          <span className="flobites-pyrostack-detail-number">4</span>
          <h3 className="flobites-pyrostack-detail-heading">PYROS</h3>
          <p className="flobites-pyrostack-detail-body">
            The final experience helped FloBites feel more human, comforting,
            and emotionally connected to the women it was created for.
          </p>

          <div className="flobites-pyros-visual">
            <div className="flobites-pyros-brand">
              <img src={pyrosFruitIcon} alt="" className="flobites-pyros-fruit" />
              <span className="flobites-pyros-eat">Eat.</span>
            </div>
            <div className="flobites-pyros-screen">
              <img src={pyrosNutrientsScreen} alt="Nutrients all in one screenshot showing Iron and Myo-Inositol cards" />
            </div>
          </div>
        </div>
      </div>

      <div className="flobites-nourish">
        <img src={threePhones} alt="Three FloBites app screens: Inside a Bite, Buy the Collection, and Frequently Asked Questions, with Nourish wordmark" className="flobites-nourish-img" />
      </div>

      <div className="flobites-stories">
        <img src={testimonialVideo} alt="FloBites benefit cards and Real Stories, Real Relief video testimonials" className="flobites-stories-img" />
        <span className="flobites-stories-feel">
          Feel<br />Better.
        </span>
      </div>

      <div className="flobites-showcase">
        <h2 className="flobites-showcase-title">FLOBITES</h2>
        <div className="flobites-showcase-devices">
          <img src={deviceTabletMockup} alt="Tablet view of the FloBites page showing Why this combination works and Know What You Consume sections" className="flobites-showcase-tablet" />
          <img src={deviceLaptopMockup} alt="Laptop view of the FloBites page showing the Inside a Bite section" className="flobites-showcase-laptop" />
          <img src={devicePhoneMockup} alt="Phone view of the FloBites homepage hero" className="flobites-showcase-phone" />
        </div>
      </div>

      <div className="flobites-cta">
        <p className="flobites-cta-text">
          Feeling connected already ? <br />
          Wanna explore more ?
        </p>
        <a href="#contact" className="flobites-cta-btn">
          Book a Call
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Flobites;
