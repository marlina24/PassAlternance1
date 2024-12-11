import React from "react";
import "./Offers.css";

const Offers = ({ offers }) => {
  return (
    <section className="offers-section">
      <h2>{offers.length} offres trouvées</h2>
      {offers.map((offer, index) => (
        <div className="offer-card" key={index}>
          <div className="offer-info">
            <h3>{offer.title}</h3>
            <p>Entreprise: {offer.company}</p>
            <p>Lieu: {offer.location}</p>
            <p>Salaire: {offer.salary}</p>
          </div>
          <button className="apply-button">Voir l'offre</button>
        </div>
      ))}
    </section>
  );
};

export default Offers;
