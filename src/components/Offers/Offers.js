import React, { useState, useEffect } from "react";
import "./Offers.css";

const Offers = ({
  offers,
  setOffers,
  addToFavorites,
  removeFromFavorites,
  handleDeleteOffer,
  fetchFavoris,
  activeTab,
}) => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [favoriteOffers, setFavoriteOffers] = useState(new Set());
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    lien: "",
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/offers");
      if (!response.ok)
        throw new Error("Erreur lors du chargement des offres.");
      const data = await response.json();

      // Vérification que `setOffers` est bien défini
      if (typeof setOffers !== "function") {
        console.error("❌ ERREUR: setOffers n'est pas une fonction !");
        return;
      }

      const sortedOffers = data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setOffers(sortedOffers);
    } catch (err) {
      console.error("Erreur :", err.message);
    }
  };

  const closePopup = () => {
    setSelectedOffer(null);
    setEditMode(false);
  };

  const handleUpdateOffer = async () => {
    const token = localStorage.getItem("token");

    if (!formData.salary || isNaN(formData.salary)) {
      alert("Veuillez entrer un salaire valide !");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3002/api/offers/${selectedOffer.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            salary: parseFloat(formData.salary),
          }),
        }
      );

      if (!response.ok)
        throw new Error("Erreur lors de la modification de l'offre.");

      setOffers((prevOffers) =>
        prevOffers.map((offer) =>
          offer.id === selectedOffer.id ? { ...offer, ...formData } : offer
        )
      );

      closePopup();
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'offre :", err.message);
    }
  };
  useEffect(() => {
    if (activeTab === "favoris") {
      fetchFavoris(); // ✅ Charger uniquement les favoris dans l'onglet "Favoris"
    }
  }, [activeTab]);

  const fetchFavorites = async () => {
    if (!userId) return;

    try {
      const response = await fetch(
        `http://localhost:3002/api/favorites/${userId}`
      );
      if (!response.ok)
        throw new Error("Erreur lors du chargement des favoris.");

      const favorites = await response.json();
      setFavoriteOffers(new Set(favorites.map((offer) => offer.id))); // Stocke uniquement les IDs des favoris
    } catch (err) {
      console.error("Erreur :", err.message);
    }
  };

  const handleAddToFavorites = async (offerId) => {
    await addToFavorites(offerId);

    setFavoriteOffers((prevFavorites) => new Set([...prevFavorites, offerId])); // ✅ Ajoute l'ID localement

    fetchFavoris(); // ✅ Met à jour la liste des favoris immédiatement
  };

  const handleRemoveFromFavorites = async (offerId) => {
    await removeFromFavorites(offerId);

    setFavoriteOffers((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      newFavorites.delete(offerId);
      return newFavorites;
    });

    // ✅ Supprimer l'offre de l'affichage si on est dans l'onglet "Favoris"
    if (activeTab === "favoris") {
      setOffers((prevOffers) =>
        prevOffers.filter((offer) => offer.id !== offerId)
      );
    }

    fetchFavoris(); // ✅ Met à jour la liste des favoris immédiatement
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) return;

      try {
        const response = await fetch(
          `http://localhost:3002/api/favorites/${userId}`
        );
        if (!response.ok)
          throw new Error("Erreur lors du chargement des favoris.");

        const favorites = await response.json();
        setFavoriteOffers(new Set(favorites.map((offer) => offer.id))); // Stocke uniquement les IDs des favoris
      } catch (err) {
        console.error("Erreur :", err.message);
      }
    };

    fetchFavorites();
  }, []);

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
            <p>
              Date de publication:{" "}
              {new Date(offer.created_at).toLocaleDateString()}
            </p>

            <button
              onClick={() => {
                setSelectedOffer(offer);
                setEditMode(false);
              }}
              className="view-offer-button"
            >
              👁️
            </button>
            {userId && offer.userID == userId && (
              <button
                onClick={() => {
                  setSelectedOffer(offer);
                  setEditMode(true);
                  setFormData(offer);
                }}
                className="modify-offer-button"
              >
                ✏️
              </button>
            )}
            {/* ✅ Bouton Supprimer l'offre complètement */}
            {userId && offer.userID == userId && (
              <button
                onClick={() => handleDeleteOffer(offer.id)}
                className="delete-offer-button"
              >
                🗑
              </button>
            )}

            {/* ✅ Bouton Ajouter/Supprimer des favoris */}
            {favoriteOffers.has(offer.id) ? (
              <button
                onClick={() => handleRemoveFromFavorites(offer.id)}
                className="remove-favorite-button"
              >
                ❌
              </button>
            ) : (
              <button
                onClick={() => handleAddToFavorites(offer.id)}
                className="favorite-offer-button"
              >
                ❤️
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedOffer && (
        <div className="popup-overlay" onClick={() => setSelectedOffer(null)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-popup"
              onClick={() => setSelectedOffer(null)}
            >
              ×
            </button>
            {editMode ? (
              <>
                <h2>Modifier l'offre</h2>
                <input
                  type="text"
                  placeholder="Titre"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Entreprise"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Lieu"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Salaire"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                />
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Lien"
                  value={formData.lien}
                  onChange={(e) =>
                    setFormData({ ...formData, lien: e.target.value })
                  }
                />
                <button
                  onClick={() => handleUpdateOffer()}
                  className="update-offer-button"
                >
                  Enregistrer
                </button>
              </>
            ) : (
              <>
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
                  <strong>Date de publication:</strong>{" "}
                  {new Date(selectedOffer.created_at).toLocaleDateString()}
                </p>
                <p>
                  <strong>Description:</strong> {selectedOffer.description}
                </p>
                <p>
                  <strong>Lien:</strong>{" "}
                  <a
                    href={selectedOffer.lien}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedOffer.lien}
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Offers;
