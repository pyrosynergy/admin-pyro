import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

/*
 * A deploy replaces every hashed chunk, so a tab opened before it goes out
 * asks for filenames that no longer exist and the dynamic import rejects —
 * previously leaving the empty Suspense fallback on screen for good. Vite
 * fires `vite:preloadError` for exactly this, and a reload is the fix: the
 * fresh index.html points at the chunks that do exist.
 *
 * Rate-limited to one reload per 10s via sessionStorage, so a genuinely
 * missing chunk (rather than a stale one) can't put the tab in a reload loop.
 */
const RELOAD_KEY = 'chunk-reload-at';
const RELOAD_COOLDOWN_MS = 10_000;

window.addEventListener('vite:preloadError', (event) => {
  let last = 0;
  try {
    last = Number(sessionStorage.getItem(RELOAD_KEY)) || 0;
  } catch {
    // Private mode / storage disabled — fall through and allow one reload.
  }

  if (Date.now() - last < RELOAD_COOLDOWN_MS) return;

  try {
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    // Non-fatal: without storage we just lose the loop guard.
  }

  // Stop Vite rethrowing, so the reload isn't racing an unhandled rejection.
  event.preventDefault();
  window.location.reload();
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
