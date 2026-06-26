import React from 'react';
import './Nourish.css';
import threePhones from '../../../../assets/flobites/three-phones.png';

const Nourish = () => (
  <div className="flobites-nourish">
    <img
      src={threePhones}
      alt="Three FloBites app screens: Inside a Bite, Buy the Collection, and Frequently Asked Questions, with Nourish wordmark"
      className="flobites-nourish-img"
    />
  </div>
);

export default Nourish;
