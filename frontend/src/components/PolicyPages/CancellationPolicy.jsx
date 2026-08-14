import React from 'react';
import { Link } from 'react-router-dom';
import './PolicyPages.css';

const CancellationPolicy = () => {
  return (
    <div className="terms-modal-overlay" style={{ animation: 'none', opacity: 1 }}>
      <div className="terms-modal-box">
        <div className="terms-modal-header">
          <h2>Cancellation Policy</h2>
          <Link className="terms-modal-close-icon" to="/policy-pages">
            &times;
          </Link>
        </div>
        <div className="terms-modal-content">
          <p>
            We understand that circumstances can change. The following terms govern
            how project cancellations are handled.
          </p>

          <h3>Before Work Begins</h3>
          <p>
            If you wish to cancel an engagement before any work has commenced,
            please notify us in writing at the earliest opportunity. Cancellations made
            at this stage may be accommodated, subject to any administrative or
            preparation costs already incurred.
          </p>

          <h3>After Work Has Commenced</h3>
          <p>
            Once a project has been initiated — including but not limited to discovery,
            design, development, or strategy work — cancellation may not be possible,
            or may only be partial. In such cases:
          </p>
          <ul>
            <li>Fees for work completed up to the point of cancellation remain due and payable</li>
            <li>Deliverables produced may or may not be transferred, at our discretion, depending on payment status</li>
            <li>Any outstanding balances must be settled before project assets are released</li>
          </ul>
          <p>
            All cancellation requests must be submitted in writing. Verbal requests
            will not be considered official unless confirmed by our team in writing.
          </p>

          <h3>Ongoing Retainers</h3>
          <p>
            For retainer-based or recurring service agreements, cancellation terms are
            as specified in the individual agreement. Where not specified, a minimum
            notice period of 30 days applies. Fees for the active billing period are non-refundable.
          </p>

          <h3>Our Right to Cancel</h3>
          <p>
            PyroSynergy reserves the right to discontinue services at any time if a
            client is in breach of agreed terms, including failure to make timely
            payments or provide necessary inputs for project progression. In such
            cases, fees for completed work remain payable.
          </p>
        </div>
      
      </div>
    </div>
  );
};

export default CancellationPolicy;
