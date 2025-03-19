import React, { useState, useEffect } from "react";
import "./SearchOffersPage.css";
import PageHeader from "../components/PageHeader/PageHeader";
import Filters from "../components/Filters/Filters";
import Offers from "../components/Offers/Offers";

const SearchOffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    minSalary: 0,
    type: "",
  });

  const [favoriteOffers, setFavoriteOffers] = useState(new Set());

  const fetchOffers = async () => {
    try {
      const params = new URLSearchParams(filters);
      const response = await fetch(
        `http://localhost:3002/api/offers?${params}`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des offres.");
      }
      const data = await response.json();

      // Trier par date de publication (du plus récent au plus ancien)
      const sortedOffers = data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setOffers(sortedOffers);
    } catch (err) {
      console.error("Erreur :", err.message);
    }
  };
  const handleDeleteOffer = async (offerId) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); // ✅ Récupérer l'ID utilisateur stocké

    if (!userId) {
      alert("Utilisateur non identifié !");
      return;
    }

    if (!window.confirm("Voulez-vous vraiment supprimer cette offre ?")) return;

    try {
      const response = await fetch(
        `http://localhost:3002/api/offers/${offerId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userID: userId }), // ✅ Envoyer l'ID utilisateur
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erreur lors de la suppression de l'offre."
        );
      }

      console.log("✅ Offre supprimée avec succès !");

      // ⚡ Mettre à jour la liste des offres après suppression
      setOffers((prevOffers) =>
        prevOffers.filter((offer) => offer.id !== offerId)
      );
    } catch (err) {
      console.error("❌ Erreur :", err.message);
      alert(err.message);
    }
  };

  const addToFavorites = async (offerId) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Utilisateur non identifié !");
      return;
    }

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

      if (!response.ok) throw new Error("Erreur lors de l'ajout aux favoris.");

      console.log("✅ Offre ajoutée aux favoris !");
    } catch (err) {
      console.error("❌ Erreur :", err.message);
    }
  };

  const removeFromFavorites = async (offerId) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Utilisateur non identifié !");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3002/api/favorites/${offerId}/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok)
        throw new Error("Erreur lors de la suppression des favoris.");

      console.log("✅ Offre supprimée des favoris !");

      // ⚡ Supprimer l'offre de la liste des favoris immédiatement
      setFavoriteOffers((prevFavorites) => {
        const newFavorites = new Set(prevFavorites);
        newFavorites.delete(offerId);
        return newFavorites;
      });

      fetchFavoris(); // ✅ Met à jour les favoris immédiatement après suppression
    } catch (err) {
      console.error("❌ Erreur :", err.message);
    }
  };

  const fetchFavoris = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    try {
      const response = await fetch(
        `http://localhost:3002/api/favorites/${userId}`
      );
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des favoris.");

      const data = await response.json();
      console.log("📌 Favoris récupérés :", data);

      setFavoriteOffers(new Set(data.map((offer) => offer.id))); // ✅ Stocker uniquement les IDs des favoris
    } catch (err) {
      console.error("Erreur :", err.message);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, [filters]); // ⚡ Met à jour les offres quand les filtres changent

  return (
    <div className="search-offers-page">
      <PageHeader />
      <div className="search-content">
        <Filters onFiltersChange={setFilters} />
        <Offers
          offers={offers}
          setOffers={setOffers}
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
          handleDeleteOffer={handleDeleteOffer}
          fetchFavoris={fetchFavoris} // ✅ Passe `fetchFavoris`
          favoriteOffers={favoriteOffers} // ✅ Passe les favoris
          activeTab={"all"}
        />
      </div>
    </div>
  );
};

export default SearchOffersPage;
