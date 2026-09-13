import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { showCookiePreferences } from '../../lib/cookieConsent.js';
import './PolicyPages.css';

const CookiePolicy = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = (e) => {
    if (e) e.preventDefault();
    if (location.state?.fromPolicyHub) {
      navigate(-1);
    } else {
      navigate('/policy-pages', { replace: true });
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose(e);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [location.state]);

  return (
    <div
      className="terms-modal-overlay"
      style={{ animation: 'none', opacity: 1 }}
      onClick={handleOverlayClick}
    >
      <div className="terms-modal-box">
        <div className="terms-modal-header">
          <h2>Cookie Policy</h2>
          <Link
            className="terms-modal-close-icon"
            to="/policy-pages"
            replace
            onClick={handleClose}
            aria-label="Close"
          >
            &times;
          </Link>
        </div>
        <div className="terms-modal-content">
          <p>
            This Cookie Policy explains how PyroSynergy (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;)
            uses cookies and similar tracking technologies when you visit or interact with our website
            at <a href="https://pyrosynergy.com" target="_blank" rel="noopener noreferrer">pyrosynergy.com</a>.
          </p>
          <p>
            We use cookies that are necessary for the website to function and, with your consent,
            analytics cookies to help us understand how visitors interact with our website and improve our services.
          </p>
          <p>
            You can manage your cookie preferences at any time using the{' '}
            <button
              type="button"
              className="cookie-settings-inline-btn"
              onClick={() => showCookiePreferences()}
            >
              Cookie Settings
            </button>{' '}
            option available on our website.
          </p>

          <h3>1. What Are Cookies?</h3>
          <p>
            Cookies are small text files that are placed on your device (computer, tablet, or mobile phone)
            when you visit a website. They are widely used to make websites work efficiently, remember preferences,
            and provide information about how websites are used.
          </p>
          <p>
            Cookies can be &ldquo;persistent&rdquo; cookies, which remain on your device until they expire
            or are deleted, or &ldquo;session&rdquo; cookies, which are generally deleted when you close your browser.
          </p>
          <p>
            Cookies can also be &ldquo;first-party&rdquo; cookies, which are set by the website you are visiting,
            or &ldquo;third-party&rdquo; cookies, which are set by a different domain or service.
          </p>

          <h3>2. Types of Cookies We Use</h3>

          <h4>2.1 Strictly Necessary Cookies</h4>
          <p>
            These cookies are necessary for the website and its cookie-consent functionality to operate properly.
            They cannot be disabled through our cookie preference interface because they are required to maintain
            essential functionality.
          </p>
          <p>
            <strong>Cookie Consent</strong><br />
            Our website uses <code>vanilla-cookieconsent</code> to manage your cookie preferences.
          </p>

          <div className="terms-table-wrapper">
            <table className="terms-table">
              <thead>
                <tr>
                  <th>Cookie</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>ps_cookie_consent</code></td>
                  <td>Stores your cookie-consent preferences, including your choices regarding optional analytics cookies.</td>
                  <td>Approximately 180 days</td>
                  <td>First-party</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            The <code>ps_cookie_consent</code> cookie does not track your activity for advertising or analytics purposes.
            It is used to remember the choices you make through our cookie-consent banner and preferences interface.
          </p>

          <h4>2.2 Analytics Cookies</h4>
          <p>
            Analytics cookies help us understand how visitors interact with our website. We use this information to identify
            usability issues, understand website performance, and improve the experience we provide.
          </p>
          <p>
            Analytics cookies are optional and are only activated after you provide the appropriate consent
            through our cookie-consent interface.
          </p>
          <p>
            <strong>Microsoft Clarity</strong><br />
            We use Microsoft Clarity, a user behavior analytics service provided by Microsoft.
          </p>
          <p>
            Clarity helps us understand how visitors interact with our website through information such as sessions,
            page views, and user interactions. This information helps us identify areas where we can improve our
            website and user experience.
          </p>
          <p>
            Microsoft documents the following cookies in connection with Clarity:{' '}
            <a
              href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Clarity Cookie Documentation
            </a>
          </p>

          <div className="terms-table-wrapper">
            <table className="terms-table">
              <thead>
                <tr>
                  <th>Cookie</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>_clck</code></td>
                  <td>Stores a Clarity user identifier and associated preferences.</td>
                  <td>See Microsoft Clarity documentation</td>
                  <td>First-party</td>
                </tr>
                <tr>
                  <td><code>_clsk</code></td>
                  <td>Connects multiple page views into a single Clarity session.</td>
                  <td>See Microsoft Clarity documentation</td>
                  <td>First-party</td>
                </tr>
                <tr>
                  <td><code>CLID</code></td>
                  <td>Identifies when Clarity first encountered a user on a website using Clarity.</td>
                  <td>See Microsoft Clarity documentation</td>
                  <td>Third-party</td>
                </tr>
                <tr>
                  <td><code>ANONCHK</code></td>
                  <td>Indicates whether the MUID cookie is transferred to ANID.</td>
                  <td>See Microsoft Clarity documentation</td>
                  <td>Third-party</td>
                </tr>
                <tr>
                  <td><code>MR</code></td>
                  <td>Indicates whether the MUID cookie should be refreshed.</td>
                  <td>See Microsoft Clarity documentation</td>
                  <td>Third-party</td>
                </tr>
                <tr>
                  <td><code>MUID</code></td>
                  <td>Provides a unique browser identifier used by Microsoft services.</td>
                  <td>See Microsoft Clarity documentation</td>
                  <td>Third-party</td>
                </tr>
                <tr>
                  <td><code>SM</code></td>
                  <td>Used to synchronize the MUID across Microsoft domains.</td>
                  <td>See Microsoft Clarity documentation</td>
                  <td>Third-party</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            The exact duration and behavior of Microsoft-controlled cookies may change over time.
            For the most current information, please refer to Microsoft's Clarity documentation.
          </p>
          <p>
            We do not activate Microsoft Clarity until analytics consent has been provided through our
            cookie-consent mechanism.
          </p>

          <h4>2.3 Marketing Cookies</h4>
          <p>
            We currently do not use marketing, advertising, remarketing, or behavioral advertising cookies
            on the PyroSynergy website.
          </p>
          <p>
            We therefore do not currently have a separate Marketing cookie category in our cookie-consent preferences.
          </p>
          <p>
            If we introduce marketing or advertising technologies in the future, this Cookie Policy and our
            cookie-consent preferences will be updated accordingly.
          </p>

          <h3>3. Third-Party Cookies</h3>
          <p>
            Some cookies used on our website may be placed by third-party service providers.
          </p>
          <p>
            Our current third-party analytics service is:
          </p>
          <ul>
            <li>
              <strong>Microsoft Clarity:</strong> Microsoft provides the Clarity analytics service used to
              understand website interactions and improve website usability.{' '}
              <a
                href="https://clarity.microsoft.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Microsoft Clarity
              </a>
            </li>
          </ul>
          <p>
            For information about Microsoft's handling of information and its privacy practices,
            please refer to Microsoft's Privacy Statement:{' '}
            <a
              href="https://privacy.microsoft.com/privacystatement"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Privacy Statement
            </a>
          </p>
          <p>
            We currently do not use Google Analytics, Google Tag Manager, Meta Pixel, LinkedIn Insight Tag,
            Hotjar, or other advertising/remarketing tracking services on the website.
          </p>

          <h3>4. How to Manage Cookies</h3>

          <h4>4.1 Cookie Consent Banner</h4>
          <p>
            When you first visit our website, you may see a cookie-consent banner that allows you to choose
            whether to allow optional analytics cookies.
          </p>
          <p>You can choose to:</p>
          <ul>
            <li><strong>Accept All</strong> &mdash; enables necessary cookies and optional analytics cookies.</li>
            <li><strong>Reject Non-Essential</strong> &mdash; allows only necessary cookies and prevents optional analytics cookies from being activated.</li>
            <li><strong>Manage Preferences</strong> &mdash; allows you to review and control your available cookie categories.</li>
          </ul>
          <p>
            Your selection is stored so that you do not have to make the same choice every time you visit our website.
          </p>

          <h4>4.2 Cookie Settings</h4>
          <p>
            You can change your cookie preferences at any time by selecting{' '}
            <button
              type="button"
              className="cookie-settings-inline-btn"
              onClick={() => showCookiePreferences()}
            >
              Cookie Settings
            </button>{' '}
            in the website footer.
          </p>
          <p>
            This will reopen our cookie-preference interface and allow you to review or change your analytics consent.
          </p>
          <p>
            If you withdraw analytics consent after Microsoft Clarity has previously been enabled,
            the website will remove applicable Clarity cookies where technically possible and prevent
            Clarity from being loaded again without the required consent.
          </p>

          <h4>4.3 Browser Settings</h4>
          <p>
            Most web browsers allow you to control cookies through their settings.
          </p>
          <p>You can typically configure your browser to:</p>
          <ul>
            <li>block cookies;</li>
            <li>delete existing cookies;</li>
            <li>block third-party cookies;</li>
            <li>receive notifications when cookies are set; or</li>
            <li>delete cookies when you close your browser.</li>
          </ul>
          <p>The following links provide information for common browsers:</p>
          <ul>
            <li>
              <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
                Google Chrome
              </a>
            </li>
            <li>
              <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer">
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer">
                Apple Safari
              </a>
            </li>
            <li>
              <a href="https://support.microsoft.com/en-us/microsoft-edge/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer">
                Microsoft Edge
              </a>
            </li>
          </ul>
          <p>
            Please note that disabling or deleting necessary cookies may affect certain website functionality.
          </p>

          <h3>5. How We Protect Your Choices</h3>
          <p>
            Our cookie-consent system is configured so that optional analytics services are not loaded
            before the relevant consent has been provided.
          </p>
          <p>
            If you reject optional analytics cookies, Microsoft Clarity will not be loaded for analytics purposes.
          </p>
          <p>
            If you previously consented to analytics cookies and later withdraw that consent, we take steps
            to remove applicable Clarity cookies and prevent the service from being loaded again without consent.
          </p>
          <p>
            Your cookie preference is stored using our necessary consent cookie so that your choice can be
            remembered across subsequent visits.
          </p>

          <h3>6. Updates to This Policy</h3>
          <p>
            We may update this Cookie Policy from time to time to reflect:
          </p>
          <ul>
            <li>changes in the cookies or technologies we use;</li>
            <li>changes to our website or services;</li>
            <li>changes to third-party services;</li>
            <li>changes in applicable laws or regulations; or</li>
            <li>changes to our privacy practices.</li>
          </ul>
          <p>
            Any changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date.
          </p>
          <p>
            We encourage you to review this Cookie Policy periodically to stay informed about how we use cookies.
          </p>

          <h3>7. Related Policies</h3>
          <p>
            This Cookie Policy should be read together with our other policies, including:
          </p>
          <ul>
            <li>
              <Link to="/policy-pages/privacy-policy" replace state={location.state}>
                Privacy Policy
              </Link>{' '}
              &mdash; explains how we collect, use, store, and protect personal information.
            </li>
            <li>
              <Link to="/policy-pages/terms-and-conditions" replace state={location.state}>
                Terms &amp; Conditions
              </Link>{' '}
              &mdash; sets out the terms governing your use of our website and services.
            </li>
          </ul>

          <h3>8. Contact Us</h3>
          <p>
            If you have questions about our use of cookies or this Cookie Policy, please contact us:
          </p>
          <address className="terms-contact-address">
            <strong>PyroSynergy</strong><br />
            Email: <a href="mailto:py@pyrosynergy.com">py@pyrosynergy.com</a><br />
            Website: <a href="https://pyrosynergy.com" target="_blank" rel="noopener noreferrer">pyrosynergy.com</a>
          </address>
          <p>
            For questions regarding how we collect and process personal information, please refer to our{' '}
            <Link to="/policy-pages/privacy-policy" replace state={location.state}>
              Privacy Policy
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
