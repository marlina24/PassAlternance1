import React from "react";
import "./HowTo.css";

const HowTo = () => {
  return (
    <div className="howto-container">
      <h1 className="howto-title">How to Learn Tech Skills</h1>
      <h2 className="howto-subtitle">5 Things to Practice at Home</h2>
      <div className="howto-steps">
        <div className="steps">
        <div className="howto-step">
          <div className="howto-step-number">1</div>
          <div className="howto-step-content">
            <h3 className="howto-step-title">Teaching Methods</h3>
            <p className="howto-step-description">
              Sample text. Click to select the text box. Click again or double
              click to start editing the text.
            </p>
          </div>
        </div>
        <div className="howto-step">
          <div className="howto-step-number">2</div>
          <div className="howto-step-content">
            <h3 className="howto-step-title">Effective Education</h3>
            <p className="howto-step-description">
              Sample text. Click to select the text box. Click again or double
              click to start editing the text.
            </p>
          </div>
        </div>
        <div className="howto-step">
          <div className="howto-step-number">3</div>
          <div className="howto-step-content">
            <h3 className="howto-step-title">Online Learning</h3>
            <p className="howto-step-description">
              Sample text. Click to select the text box. Click again or double
              click to start editing the text.
            </p>
          </div>
        </div>
      </div>
      </div>
      <div className="howto-buttons">
        <button className="howto-button">Je cherche une alternance</button>
        <button className="howto-button">Je publie une offre</button>
      </div>
    </div>
  );
};

export default HowTo;
