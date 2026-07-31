import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Verify.css';

// VITE_API_BASE overrides the default, so a local production build
// (npm run preview) can be pointed at http://localhost:5000 instead of the
// deployed API. Without it, any PROD build talks to the deployed backend.
const API_BASE =
  import.meta.env.VITE_API_BASE ||
  (import.meta.env.PROD ? 'https://admin-pyro-backend.vercel.app' : 'http://localhost:5000');

const formatDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
};

// Neutral silhouette shown when a record has no photo (or it fails to load).
const PhotoPlaceholder = () => (
  <div className="verify-photo verify-photo-placeholder" aria-hidden="true">
    <svg width="56" height="56" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.34 0-10 1.67-10 5v3h20v-3c0-3.33-6.66-5-10-5z" />
    </svg>
  </div>
);

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({ loading: true, data: null, notFound: false, error: false });
  const [photoFailed, setPhotoFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setPhotoFailed(false);
    fetch(`${API_BASE}/api/verify/${encodeURIComponent(token)}`)
      .then(async (res) => {
        const data = await res.json().catch(() => null);
        if (cancelled) return;
        if (res.status === 404) {
          setState({ loading: false, data: null, notFound: true, error: false });
        } else if (!res.ok || !data) {
          setState({ loading: false, data: null, notFound: false, error: true });
        } else if (data.token && data.token !== token) {
          // Short QR link (e.g. /verify/e17): replace the URL with the
          // canonical tokenised one; the effect re-runs against it.
          navigate(`/verify/${data.token}`, { replace: true });
        } else {
          setState({ loading: false, data, notFound: false, error: false });
        }
      })
      .catch(() => {
        if (!cancelled) setState({ loading: false, data: null, notFound: false, error: true });
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  const { loading, data, notFound, error } = state;

  let statusClass = 'invalid';
  let statusLabel = 'Not verified';
  let statusNote = 'This verification link is invalid or has been revoked.';
  if (data) {
    if (data.validity === 'active') {
      statusClass = 'valid';
      statusLabel = 'Verified';
      statusNote = 'This person is a verified member of PyroSynergy.';
    } else if (data.validity === 'under-process') {
      statusClass = 'under-process';
      statusLabel = 'Under process';
      statusNote = 'This verification is still being processed.';
    } else {
      statusNote = 'This verification is no longer active.';
    }
  }

  return (
    <div className="verify-page">
      <div className="verify-card">
        <p className="verify-brand">PyroSynergy · Employee Verification</p>

        {loading && <p className="verify-muted">Verifying…</p>}

        {/* A failed request is NOT a missing employee: showing "Not found" for
            both hides API outages behind an invalid-link message. */}
        {!loading && (notFound || error) && (
          <>
            <div className={`verify-status ${error ? 'under-process' : 'invalid'}`}>
              {error ? 'Unavailable' : 'Not found'}
            </div>
            <p className="verify-muted">
              {error
                ? 'Verification is temporarily unavailable — the service could not be reached. Please try again later.'
                : 'This verification link is invalid. Check the link and try again.'}
            </p>
          </>
        )}

        {!loading && data && (
          <>
            <div className={`verify-status ${statusClass}`}>{statusLabel}</div>
            <p className="verify-muted">{statusNote}</p>

            {data.employee.photoUrl && !photoFailed ? (
              <img
                className="verify-photo"
                src={data.employee.photoUrl}
                alt={data.employee.fullName}
                onError={() => setPhotoFailed(true)}
              />
            ) : (
              <PhotoPlaceholder />
            )}

            <h1 className="verify-name">{data.employee.fullName}</h1>
            <p className="verify-designation">{data.employee.designation}</p>

            <dl className="verify-details">
              <div>
                <dt>Employee ID</dt>
                <dd>{data.employee.empId}</dd>
              </div>
              <div>
                <dt>Issued on</dt>
                <dd>{formatDate(data.employee.issuedOn)}</dd>
              </div>
            </dl>
          </>
        )}
      </div>
    </div>
  );
};

export default Verify;
