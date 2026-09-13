import * as CookieConsent from 'vanilla-cookieconsent';

/**
 * Audit (see conversation / final report for the full writeup): the only
 * tracking script found anywhere in this codebase is Microsoft Clarity,
 * previously hardcoded into index.html and running unconditionally on every
 * pageview. No GA/GTM, Meta Pixel, LinkedIn Insight Tag, Hotjar, or ad/
 * remarketing scripts exist, so only Necessary + Analytics categories are
 * configured here — a Marketing category is deliberately omitted because
 * there is nothing for it to gate. Add one back (mirroring the `analytics`
 * category below) the day a real marketing/ad script is introduced.
 */
const CLARITY_PROJECT_ID = 'rzuj7q7mkm';

// Cookies Clarity is documented to set, used so "reject"/"withdraw" can
// actually clear them instead of just stopping new tracking calls.
const CLARITY_COOKIE_PATTERNS = [
  { name: /^_clck$/ },
  { name: /^_clsk$/ },
  { name: /^CLID$/ },
  { name: /^ANONCHK$/ },
  { name: /^MR$/ },
  { name: /^MUID$/ },
  { name: /^SM$/ },
];

let clarityLoaded = false;

/** The exact snippet Microsoft hands out, just no longer unconditional. */
const loadClarity = () => {
  if (clarityLoaded || typeof window === 'undefined') return;
  clarityLoaded = true;

  try {
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0];
      if (y && y.parentNode) {
        y.parentNode.insertBefore(t, y);
      } else {
        (l.head || l.documentElement).appendChild(t);
      }
    })(window, document, 'clarity', 'script', CLARITY_PROJECT_ID);
  } catch (err) {
    console.error('Failed to load Clarity script:', err);
  }
};

let consentInitialized = false;

export const initCookieConsent = () => {
  // React.StrictMode (main.jsx) double-invokes effects in dev, and
  // CookieConsent.run() isn't designed to be called twice — guard so the
  // library only ever initializes once per page load.
  if (consentInitialized) return;
  consentInitialized = true;

  CookieConsent.run({
    mode: 'opt-in',
    autoShow: true,
    revision: 0,

    cookie: {
      name: 'ps_cookie_consent',
    },

    guiOptions: {
      consentModal: {
        layout: 'box',
        position: 'bottom left',
        equalWeightButtons: false,
        flipButtons: false,
      },
      preferencesModal: {
        layout: 'box',
        equalWeightButtons: true,
        flipButtons: false,
      },
    },

    categories: {
      necessary: {
        enabled: true,
        readOnly: true,
      },
      analytics: {
        enabled: true,
        autoClear: {
          cookies: CLARITY_COOKIE_PATTERNS,
          reloadPage: false,
        },
        services: {
          clarity: {
            label: 'Microsoft Clarity',
            onAccept: loadClarity,
            onReject: () => {
              clarityLoaded = false;
            },
            cookies: CLARITY_COOKIE_PATTERNS,
          },
        },
      },
    },

    language: {
      default: 'en',
      translations: {
        en: {
          consentModal: {
            title: 'We value your privacy',
            description:
              'We use necessary cookies and optional analytics cookies to improve our website.',
            acceptAllBtn: 'Accept All',
            acceptNecessaryBtn: 'Reject Non-Essential',
            showPreferencesBtn: 'Manage Preferences',
            footer:
              '<a href="/policy-pages/privacy-policy">Privacy Policy</a>' +
              '<a href="/policy-pages/cookie-policy">Cookie Policy</a>',
          },
          preferencesModal: {
            title: 'Cookie Preferences',
            acceptAllBtn: 'Accept All',
            acceptNecessaryBtn: 'Reject Non-Essential',
            savePreferencesBtn: 'Save Preferences',
            closeIconLabel: 'Close',
            sections: [
              {
                description:
                  'We use cookies to keep PyroSynergy running and, with your permission, to understand how the site is used. ' +
                  'Choose what you’re comfortable with below — you can change this at any time from "Cookie Settings" in the footer.',
              },
              {
                title: 'Necessary — Always Active',
                description: 'Required for the website to function.',
                linkedCategory: 'necessary',
              },
              {
                title: 'Analytics',
                description: 'Helps us understand website usage and performance.',
                linkedCategory: 'analytics',
              },
              {
                title: 'More information',
                description:
                  'For questions about this policy, see our ' +
                  '<a href="/policy-pages/privacy-policy">Privacy Policy</a> and ' +
                  '<a href="/policy-pages/cookie-policy">Cookie Policy</a>, or ' +
                  'contact us at <a href="mailto:py@pyrosynergy.com">py@pyrosynergy.com</a>.',
              },
            ],
          },
        },
      },
    },
  });
};

/** Reopens the preferences modal — used by the footer's "Cookie Settings" link. */
export const showCookiePreferences = () => {
  CookieConsent.showPreferences();
};
