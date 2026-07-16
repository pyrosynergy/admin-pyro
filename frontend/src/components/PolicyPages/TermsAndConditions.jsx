import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PolicyPages.css';

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="terms-modal-overlay" style={{ animation: 'none', opacity: 1 }}>
      <div className="terms-modal-box">
        <div className="terms-modal-header">
          <h2>Terms & Conditions</h2>
          <button className="terms-modal-close-icon" onClick={() => navigate('/policy-pages')}>
            &times;
          </button>
        </div>
        <div className="terms-modal-content">
          <p>
            These terms govern your use of PyroSynergy's website and all service engagements. By accessing our website or commissioning any service, you confirm that you have read and agreed to these terms. They may be supplemented by a separate project agreement or proposal, which will take precedence in the event of any conflict.
          </p>

          <h3>Services</h3>
          <p>
            PyroSynergy provides digital and strategic solutions including UI/UX design, branding, web development, and AI solutions. The specific scope of any engagement is defined in the proposal or agreement issued prior to project commencement. Work requested outside the defined scope may be subject to additional fees and timelines, communicated in advance.
          </p>
          <p>
            <em>Note: PyroSynergy reserves the right to decline any project or engagement at its sole discretion, without obligation to provide a reason.</em>
          </p>

          <h3>Client Obligations</h3>
          <p>
            Successful delivery depends on timely input from the client. By engaging PyroSynergy, you agree to provide all necessary content, assets, approvals, and feedback within agreed timelines; designate an authorized point of contact; ensure shared materials do not infringe third-party rights; and communicate scope changes promptly in writing. Delays caused by client-side factors may result in revised timelines or additional fees.
          </p>

          <h3>Payments & Fees</h3>
          <p>
            Payment terms are outlined in each project proposal. Unless otherwise specified, a deposit is required before work commences. Late or outstanding payments may result in a pause or discontinuation of services, and final deliverables will be withheld until full payment is received. All fees are exclusive of applicable taxes unless stated otherwise.
          </p>

          <h3>Intellectual Property</h3>
          <p>
            Client-provided materials remain the property of the client. Upon receipt of full payment, ownership of final deliverables transfers to the client, unless otherwise agreed in writing. PyroSynergy retains the right to display completed work in its portfolio unless the client requests otherwise in writing. Any internal tools, frameworks, or methodologies used by PyroSynergy in the course of a project remain our sole property.
          </p>

          <h3>Confidentiality</h3>
          <p>
            PyroSynergy will not disclose non-public client information to third parties without prior written consent, except as required by law. If a formal NDA is required, it must be requested and executed separately before the project commences.
          </p>

          <h3>Limitation of Liability</h3>
          <p>
            PyroSynergy's liability in connection with any engagement is limited to the total fees paid for that specific project. We are not liable for any indirect, incidental, or consequential damages arising from the use of our services or deliverables. We do not guarantee specific business outcomes or performance metrics. PyroSynergy is not responsible for the performance or policies of any third-party platforms or tools used in the course of a project.
          </p>

          <h3>Termination</h3>
          <p>
            Either party may terminate an engagement by providing written notice, subject to the terms in the relevant project agreement. In all cases, the client remains liable for payment of work completed up to the termination date, and final deliverables will only be released upon settlement of outstanding amounts. PyroSynergy may terminate an engagement immediately in the event of non-payment or breach of these terms.
          </p>

          <h3>Governing Law</h3>
          <p>
            These terms are governed by the laws applicable in Hyderabad, Telangana, India. Any disputes shall be subject to the jurisdiction of the appropriate courts in that region, unless otherwise mutually agreed in writing.
          </p>

          <h3>Updates to These Terms</h3>
          <p>
            PyroSynergy may update these terms at any time. Changes will be reflected on this page with a revised effective date. Continued use of our website or services following any update constitutes acceptance of the revised terms.
          </p>
        </div>
        <div className="terms-modal-footer">
          <button className="terms-modal-close-btn" onClick={() => navigate('/policy-pages')}>
            Take Me Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
