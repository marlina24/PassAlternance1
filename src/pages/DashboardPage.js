import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Tabs from "../components/Tabs/Tabs";
import Offers from "../components/Offers/Offers";
import "./DashboardPage.css";

function DashboardPage() {
  const [activeTab, setActiveTab] = useState("offresPostees");
  const [offresPostees, setOffresPostees] = useState([]);
  const [favoris, setFavoris] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchOffresPostees = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("🚨 Aucune ID utilisateur trouvée !");
      alert("Erreur : Vous devez être connecté pour voir vos offres.");
      return;
    }

    try {
      console.log(`📥 Chargement des offres de l'utilisateur: ${userId}`);

      const response = await fetch(
        `http://localhost:3002/api/offers/user/${userId}`
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des offres postées.");
      }

      const data = await response.json();
      console.log("✅ Offres récupérées :", data);

      // 🔥 S'assurer que seules les offres postées par cet utilisateur sont affichées
      setOffresPostees(data.filter((offer) => offer.userID == userId));
    } catch (err) {
      console.error("❌ Erreur :", err.message);
    }
  };

  const handleDeleteOffer = async (offerId) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); // ✅ Récupération de l'ID utilisateur

    console.log("🟢 Suppression de l'offre :", { offerId, userId, token }); // ✅ Debug

    if (!userId) {
      console.error("🚨 Aucune ID utilisateur trouvée !");
      alert("Erreur : Vous devez être connecté pour supprimer une offre.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3002/api/offers/${offerId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Ajout du token pour l'authentification
          },
          body: JSON.stringify({ userID: userId }), // ✅ Envoi de l'ID utilisateur dans le body
        }
      );

      const responseData = await response.json();
      console.log("🟢 Réponse API :", responseData); // ✅ Debug API

      if (!response.ok) {
        console.error("🚨 Erreur API :", responseData);
        throw new Error(
          responseData.message || "Erreur lors de la suppression de l'offre."
        );
      }

      console.log("✅ Offre supprimée avec succès !");

      // Mise à jour des offres après suppression
      setOffresPostees((prevOffers) =>
        prevOffers.filter((offer) => offer.id !== offerId)
      );
    } catch (err) {
      console.error("❌ Erreur :", err.message);
    }
  };

  const fetchFavoris = async () => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/favorites/${userId}`
      );
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des favoris.");

      const data = await response.json();
      console.log("📌 Favoris récupérés :", data); // Vérification des données récupérées

      setFavoris(data); // ✅ Stocker uniquement les offres favorites
    } catch (err) {
      console.error("Erreur :", err.message);
    }
  };

  const addToFavorites = async (offerId) => {
    try {
      console.log("📌 Ajout aux favoris :", { userId, offerId });

      const response = await fetch("http://localhost:3002/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, offerId }),
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout aux favoris.");

      console.log("✅ Offre ajoutée aux favoris !");

      fetchFavoris(); // Met à jour la liste après ajout ✅
    } catch (err) {
      console.error("Erreur :", err.message);
    }
  };

  const removeFromFavorites = async (offerId) => {
    try {
      console.log(
        `🗑 Suppression de l'offre ${offerId} des favoris de l'utilisateur ${userId}`
      );

      const response = await fetch(
        `http://localhost:3002/api/favorites/${offerId}/${userId}`,
        {
          // ✅ Vérifier l'URL ici
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok)
        throw new Error("Erreur lors de la suppression des favoris.");

      console.log("✅ Offre retirée des favoris !");

      // Mettre à jour la liste des favoris immédiatement
      setFavoris((prevFavoris) =>
        prevFavoris.filter((offer) => offer.id !== offerId)
      );
    } catch (err) {
      console.error("Erreur :", err.message);
    }
  };

  useEffect(() => {
    fetchOffresPostees();
    fetchFavoris();
  }, []);

  return (
    <div className="dashboard-page">
      <Sidebar />
      <div className="main-content">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="tab-content">
          {activeTab === "offresPostees" && (
            <Offers
              offers={offresPostees.filter((offer) => offer.userID == userId)} // ✅ On filtre bien les offres postées par l'utilisateur connecté
              setOffers={setOffresPostees}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              handleDeleteOffer={handleDeleteOffer}
              fetchFavoris={fetchFavoris}
              activeTab={activeTab}
            />
          )}

          {activeTab === "favoris" && (
            <Offers
              offers={favoris} // ✅ Maintenant on affiche UNIQUEMENT les favoris ici
              setOffers={setFavoris}
              removeFromFavorites={removeFromFavorites}
              fetchFavoris={fetchFavoris}
              activeTab={activeTab}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
