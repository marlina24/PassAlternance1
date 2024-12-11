import React from "react";
import "./OfferCard.css";

function OfferCard({ offer }) {
  return (
    <div className="offer-card">
      <h3>{offer.titre}</h3>
      <p>
        <strong>Entreprise :</strong> {offer.entreprise}
      </p>
      <p>
        <strong>Localisation :</strong> {offer.localisation}
      </p>
      <p>
        <strong>Date :</strong> {offer.date}
      </p>
      <p>
        <strong>Salaire :</strong> {offer.salaire}
      </p>
    </div>
  );
}

export default OfferCard;
