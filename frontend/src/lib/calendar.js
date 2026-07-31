/**
 * One booking link and one way to open it, shared by every "Book a Call" /
 * "Book a FREE Audit call" CTA on the site. The URL and the window.open call
 * used to be copy-pasted per page, which is how the case study pages ended up
 * pointing at a dead `#contact` anchor while everything else had moved on.
 */
export const CALENDAR_URL = 'https://cal.com/pyrosynergy/founder-audit';

/**
 * Opens a URL in a new tab, leaving the current one where it is.
 *
 * No feature string on purpose. Passing one asks for a sized popup *window*
 * rather than a tab, and per spec a `noopener` feature makes window.open
 * return null even when it succeeded — which would trip the same-tab fallback
 * below and navigate this tab away on top of opening the new one.
 */
export const openExternalTab = (url) => {
  const tab = window.open(url, '_blank');

  if (tab) {
    tab.opener = null; // the protection the `noopener` feature was there for
    tab.focus();
    return;
  }

  // Nothing opened at all (a blocker with no user-gesture credit) — only then
  // do we give up this tab, so the link is never a dead click.
  window.location.href = url;
};

/** Opens the booking page. Safe to pass straight to an onClick. */
export const openCalendarPopup = () => openExternalTab(CALENDAR_URL);
