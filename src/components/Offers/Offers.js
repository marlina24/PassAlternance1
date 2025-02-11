import React, { useState } from "react";
import "./Offers.css";

const Offers = ({ offers = [] }) => {
  const [selectedOffer, setSelectedOffer] = useState(null);

  const closePopup = () => {
    setSelectedOffer(null);
  };

  const addToFavorites = async (offerId) => {
    const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage
    try {
      const response = await fetch(
        "http://localhost:3002/api/offers/favorites",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, offerId }),
        }
      );
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout aux favoris.");
      }
      alert("Offre ajoutée aux favoris !");
    } catch (err) {
      console.error("Erreur :", err.message);
    }
  };

  return (
    <section className="offers-section">
      <h2>
        {offers.length > 0
          ? `${offers.length} offres trouvées`
          : "Aucune offre trouvée"}
      </h2>
      <div className="offers-list">
        {offers.map((offer) => (
          <div key={offer.id} className="offer-card">
            <h3>{offer.title}</h3>
            <p>Entreprise: {offer.company}</p>
            <p>Lieu: {offer.location}</p>
            <p>Salaire: {offer.salary} €/mois</p>
            <button
              onClick={() => setSelectedOffer(offer)}
              className="view-offer-button"
            >
              Voir l'offre
            </button>
          </div>
        ))}
      </div>

      {selectedOffer && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-popup" onClick={closePopup}>
              ×
            </button>
            <h2>{selectedOffer.title}</h2>
            <p>
              <strong>Entreprise:</strong> {selectedOffer.company}
            </p>
            <p>
              <strong>Lieu:</strong> {selectedOffer.location}
            </p>
            <p>
              <strong>Salaire:</strong> {selectedOffer.salary} €/mois
            </p>
            <p>
              <strong>Description:</strong> {selectedOffer.description}
            </p>
            <p>
              <strong>Lien</strong> :{" "}
              <a href="https://sas-kalliste.fr">
                Partagez votre candidature spontané!
              </a>
            </p>
            <button
              className="add-favorite-button"
              onClick={() => addToFavorites(selectedOffer.id)}
            >
              Ajouter aux favoris
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Offers;
