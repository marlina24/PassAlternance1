import React from "react";
import "./HowTo.css";

const HowTo = () => {
  return (
    <div className="howto-container">
      <h1 className="howto-title">Comment Fonctionne Pass'Alternance</h1>
      <h2 className="howto-subtitle">
        Pass'Alternance, c'est la solidarité entre apprentis pour trouver des
        opportunités rapidement et efficacement !
      </h2>
      <div className="howto-steps">
        <div className="steps">
          <div className="howto-step">
            <div className="howto-step-number">1</div>
            <div className="howto-step-content">
              <h3 className="howto-step-title">Publiez une Offre</h3>
              <p className="howto-step-description">
                Partagez le poste d’alternance que vous libérez.
              </p>
            </div>
          </div>
          <div className="howto-step">
            <div className="howto-step-number">2</div>
            <div className="howto-step-content">
              <h3 className="howto-step-title">Explorez les Opportunités</h3>
              <p className="howto-step-description">
                Parcourez les offres disponibles et trouvez celle qui vous
                correspond.
              </p>
            </div>
          </div>
          <div className="howto-step">
            <div className="howto-step-number">3</div>
            <div className="howto-step-content">
              <h3 className="howto-step-title">
                Accédez au Site de Votre Futur Poste
              </h3>
              <p className="howto-step-description">
                Accédez au site pour postuler et envoyez votre candidature.
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
