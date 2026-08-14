import React from 'react';
import { Link } from 'react-router-dom';
import './PolicyPages.css';

const PrivacyPolicy = () => {
  return (
    <div className="terms-modal-overlay" style={{ animation: 'none', opacity: 1 }}>
      <div className="terms-modal-box">
        <div className="terms-modal-header">
          <h2>Privacy Policy</h2>
          <Link className="terms-modal-close-icon" to="/policy-pages">
            &times;
          </Link>
        </div>
        <div className="terms-modal-content">
          <p>
            PyroSynergy ("we," "our," or "us") is committed to handling any information
            you share with us responsibly. This policy describes what we collect, how
            we use it, and your rights regarding that information.
          </p>

          <h3>Information We Collect</h3>
          <p>
            When you interact with us — through our website, contact forms, or during
            the course of a project engagement — we may collect the following:
          </p>
          <ul>
            <li>Basic identification details such as your name and email address</li>
            <li>Business information relevant to your project or inquiry</li>
            <li>Payment and billing information processed through our payment service providers</li>
            <li>Communication records including emails, briefs, and feedback</li>
            <li>General usage data collected automatically through our website (such as browser type and pages visited)</li>
          </ul>

          <h3>How We Use Your Information</h3>
          <p>
            The information we collect is used solely for legitimate business purposes,
            including:
          </p>
          <ul>
            <li>Delivering the services you have engaged us for</li>
            <li>Communicating project updates, proposals, or support</li>
            <li>Processing payments and maintaining billing records</li>
            <li>Improving our website and service offerings</li>
            <li>Complying with applicable legal or regulatory obligations</li>
          </ul>

          <h3>Data Sharing</h3>
          <p>
            We do not sell, rent, or trade your personal information to third parties. We
            may share limited data with trusted service providers (such as payment
            processors or cloud infrastructure providers) strictly to facilitate service
            delivery. These parties are obligated to protect your information and may
            not use it for any other purpose.
          </p>

          <h3>Data Protection</h3>
          <p>
            We take reasonable technical and organizational measures to protect your
            information from unauthorized access, loss, or misuse. While no system is
            entirely risk-free, we maintain standard industry practices to keep your
            data secure.
          </p>
          <p>
            We do not sell your personal data. We do not use it for advertising. We
            collect only what is necessary to serve you effectively.
          </p>

          <h3>Data Retention</h3>
          <p>
            We retain your information for as long as is necessary to fulfill the purposes
            described above, or as required by applicable law. You may contact us at
            any time to request access to, correction of, or deletion of your personal
            data, subject to any legal obligations we may have to retain it.
          </p>

          <h3>Third-Party Links</h3>
          <p>
            Our website may contain links to external sites. We are not responsible for
            the privacy practices or content of those sites and encourage you to
            review their policies independently.
          </p>

          <h3>Policy Updates</h3>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be
            reflected on this page with a revised effective date. Continued use of our
            services following any update constitutes acceptance of the revised terms.
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default PrivacyPolicy;
