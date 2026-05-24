import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PolicyPages.css';
import HiringFooter from '../Hiring/HiringFooter';

const policyCards = [
  { id: 'privacy', title: 'Privacy Policy', route: '/policy-pages/privacy-policy' },
  { id: 'refund', title: 'Refund Policy', route: '/policy-pages/refund-policy' },
  { id: 'cancellation', title: 'Cancellation Policy', route: '/policy-pages/cancellation-policy' },
  { id: 'terms', title: 'Terms And Conditions', route: '/policy-pages/terms-and-conditions' },
];

const PolicyPages = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className="terms-page">
        <section className="terms-container">
          <h1>Legal Policies &amp; Terms</h1>
          <p className="terms-updated">Effective Date: June 2025</p>

          <p>
            This page outlines how PyroSynergy handles your data, and the terms that
            govern service delivery, refunds, and cancellations. By engaging our services
            or using our website, you agree to the terms described below. For questions,
            contact us at <a href="mailto:py@pyrosynergy.com">py@pyrosynergy.com</a>.
          </p>

          <div className="terms-grid">
            {policyCards.map((section) => (
              <div
                key={section.id}
                className="terms-card"
                onClick={() => navigate(section.route)}
              >
                {section.title}
              </div>
            ))}
          </div>

          <address className="terms-address">
            PyroSynergy LLP<br />
            Ground Floor, 16-11-741/C/A/39, SBH Colony, Moosarambagh, Hyderabad, Telangana, India - 500036
          </address>

          <p className="copyright">
            © 2025-26 PyroSynergy. All rights reserved. <br />
          </p>
        </section>
      </main>
      <HiringFooter />
    </>
  );
};

export default PolicyPages;
