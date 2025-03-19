import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OfferDetails.css";

const OfferDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/offers/${id}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération de l'offre.");
        }
        const data = await response.json();
        setOffer(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchOffer();
  }, [id]);

  const addToFavorites = async () => {
    try {
      const response = await fetch(`http://localhost:3002/api/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ offerId: id }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de l'offre aux favoris.");
      }

      alert("Offre ajoutée à vos favoris !");
    } catch (err) {
      console.error(err.message);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!offer) {
    return <p>Chargement des détails de l'offre...</p>;
  }

  return (
    <div className="offer-details">
      <h2>{offer.title}</h2>
      <p>
        <strong>Entreprise:</strong> {offer.company}
      </p>
      <p>
        <strong>Lieu:</strong> {offer.location}
      </p>
      <p>
        <strong>Salaire:</strong> {offer.salary} €/mois
      </p>
      <p>
        <strong>Description:</strong> {offer.description}
      </p>
      <button onClick={addToFavorites} className="add-favorite-button">
        Ajouter aux favoris
      </button>
      <button onClick={() => navigate(-1)} className="back-button">
        Retour
      </button>
    </div>
  );
};

export default OfferDetails;
