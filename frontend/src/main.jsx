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
 * Limited to one reload per session via sessionStorage. A cooldown window only
 * slowed a reload loop down; if the fresh index.html still can't find the
 * chunk, the file is genuinely gone rather than stale and reloading again will
 * never fix it. After the first attempt we let the error through to
 * RouteErrorBoundary, which offers the user a retry.
 */
const RELOAD_KEY = 'chunk-reload-attempted';

window.addEventListener('vite:preloadError', (event) => {
  let alreadyReloaded = false;
  try {
    alreadyReloaded = sessionStorage.getItem(RELOAD_KEY) === '1';
  } catch {
    // Private mode / storage disabled — fall through and allow one reload.
  }

  if (alreadyReloaded) return;

  try {
    sessionStorage.setItem(RELOAD_KEY, '1');
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
