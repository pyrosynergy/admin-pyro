import React from 'react';

/*
 * Backstop for a route chunk that fails to load — most often a tab opened
 * before a deploy asking for a hashed filename that no longer exists.
 *
 * main.jsx handles the common case by reloading once on `vite:preloadError`.
 * This catches everything that gets past it: any failure after that one
 * per-session reload, a chunk that is genuinely gone rather than stale, or any
 * other error thrown while rendering a route. Without it React unmounts the
 * tree and the empty Suspense fallback is all that's left, which on this
 * site's near-black background reads as a dead page.
 */
class RouteErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    // Keep it in the console for anyone debugging a report of this screen.
    console.error('Route failed to render:', error);
  }

  componentDidUpdate(prevProps) {
    // Navigating elsewhere clears the error, so one broken route can't leave
    // the rest of the app stuck behind this message.
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="route-error" role="alert">
        <p className="route-error-text">This page didn&apos;t finish loading.</p>
        <button
          type="button"
          className="route-error-btn"
          onClick={() => window.location.reload()}
        >
          Reload page
        </button>
      </div>
    );
  }
}

export default RouteErrorBoundary;
