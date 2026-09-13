import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './PolicyPages.css';

const RefundPolicy = () => {
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
          <h2>Refund Policy</h2>
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
            All services offered by PyroSynergy are project-based and involve the
            allocation of time, resources, and expertise upon commencement. As such,
            our general policy is that payments made are non-refundable once work
            has begun.
          </p>

          <h3>General Terms</h3>
          <ul>
            <li>Payments made prior to project initiation are considered confirmation of engagement</li>
            <li>Once work has commenced on any deliverable, fees paid are non-refundable</li>
            <li>Partial refunds, if applicable, are determined solely at our discretion and based on the scope of work completed at the time of request</li>
          </ul>
          <p>
            We encourage all clients to review proposals, timelines, and
            deliverables carefully before making payment. Questions prior to
            engagement are always welcome.
          </p>

          <h3>Exceptions</h3>
          <p>
            Refund requests may be considered in cases where PyroSynergy is unable
            to deliver the agreed-upon service due to circumstances on our end. Such
            cases will be evaluated individually and resolved in good faith.
          </p>

          <h3>Disputes</h3>
          <p>
            Any payment disputes should be raised directly with us at{' '}
            <a href="mailto:py@pyrosynergy.com">py@pyrosynergy.com</a> before initiating a chargeback or dispute through a
            payment provider. We are committed to addressing concerns
            professionally and promptly.
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default RefundPolicy;
