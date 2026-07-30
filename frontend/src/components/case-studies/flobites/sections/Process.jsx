import React from 'react';
import './Process.css';
import phoneCollage from '../../../../assets/flobites/phone-collage.png';
import nothingExtraPhone from '../../../../assets/flobites/nothing-extra-phone.png';

const Process = () => (
  <div className="flobites-process">
    <h2 className="flobites-process-title">
      Turning nutrition into <div className="flobites-process-title-accent">a digital experience.</div>
    </h2>

    <div className="flobites-process-row">
      <div className="flobites-process-image">
        <img src={phoneCollage} alt="FloBites app screens shown on tilted phone mockups" />
      </div>
      <div className="flobites-process-text flobites-process-text1">
        <p className="flobites-process-lead lead1">
          A palette that felt as balanced as the product itself.
        </p>
        <p className="flobites-process-body">
          Colours were chosen to match the product and packaging. Soft pinks made the brand feel friendly, while earthy tones gave a natural and balanced feel.

        </p>
      </div>
    </div>

    <div className="flobites-process-row">
      <div className="flobites-process-text flobites-process-text2">
        <h3 className="flobites-process-subheading">The digital brand language we built.</h3>
        <p className="flobites-process-body ">
          Intentional typography choices helped improve readability and kept the brand’s playful tone intact. Consistent design elements made the interface feel more cohesive and less repetitive across sections.

        </p>
      </div>
      <div className="flobites-process-image flobites-process-image--small">
        <img src={nothingExtraPhone} alt="FloBites app screen showing the Nothing Extra ingredient checklist" />
      </div>
    </div>
  </div>
);

export default Process;
