import React from 'react';
import './Issues.css';
import issueHeroScreenshot from '../../../../assets/flobites/issue-hero-screenshot.png';
import issueNewArrivalGrid from '../../../../assets/flobites/issue-new-arrival-grid.png';
import issueBalanceBite from '../../../../assets/flobites/issue-balance-bite.png';
import annotationOne from '../../../../assets/flobites/annotation-one.svg';
import annotationTwo from '../../../../assets/flobites/annotation-two.svg';

const Issues = () => (
  <div className="flobites-issues">
    <div className="flobites-issues-dome flobites-issues-dome--top" aria-hidden="true"></div>

    <div className="flobites-issues-core">
      <div className="flobites-issues-inner">
        <h2 className="flobites-issues-title">Uncovering challenges users faced</h2>

        <div className="flobites-issues-item flobites-issues-item--one">
          <span className="flobites-issues-number flobites-issues-number--left">One</span>
          <div className="flobites-issues-card">
            <div className="flobites-issues-note">
              <p>
               Content about<strong> FloBites</strong> and its parent company
                <strong>(THE)</strong> was added on a single page, which made it confusing for users to navigate and figure out what to read about.

              </p>
            </div>
            <div className="flobites-issues-shot flobites-issues-shot--framed">
              <img src={issueHeroScreenshot} alt="THE website hero screenshot reading Daily Support Made Simple" />
              
            </div>
          </div>
        </div>

        <div className="flobites-issues-item flobites-issues-item--two">
          <span className="flobites-issues-number flobites-issues-number--right">Two</span>
          <div className="flobites-issues-card flobites-issues-card--reverse">
            <div className="flobites-issues-note flobites-issues-note--center">
              <p>
                Misplaced cart buttons, a confusing checkout section, and <strong>overall bad user experience (UX)</strong> left no clear way for users to purchase the product, creating real buying friction.
              </p>
            </div>

            <div className="flobites-issues-shot">
              <img src={issueNewArrivalGrid} alt="New Arrivals product grid screenshot showing FloBites pack of 1 and pack of 6" />
            </div>
          </div>
        </div>

        <div className="flobites-issues-item flobites-issues-item--three">
          <span className="flobites-issues-number flobites-issues-number--left">Three</span>
          <div className="flobites-issues-card">
            <div className="flobites-issues-note">
              <p>
                The website design did not match the brand’s vibe and <strong>failed to communicate its story</strong>, making it difficult for users to connect with FloBites.

              </p>
            </div>
            <div className="flobites-issues-shot flobites-issues-shot--wide">
              <img src={issueBalanceBite} alt="New Arrivals screenshot reading Balance in Every Bite" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="flobites-issues-dome flobites-issues-dome--bottom" aria-hidden="true"></div>
  </div>
);

export default Issues;
