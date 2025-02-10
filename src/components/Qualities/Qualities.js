import React, { useState } from "react";
import "./Qualities.css";

const Qualities = ({ qualities = [], userId, token }) => {
  const [qualitiesState, setQualitiesState] = useState(qualities);

  const addQuality = async () => {
    const newQuality = prompt("Ajouter une nouvelle qualité :");
    if (!newQuality) {
      alert("Veuillez entrer une qualité valide.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3002/api/profile/${userId}/qualities`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quality: newQuality }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la qualité");
      }

      const data = await response.json();
      setQualitiesState((prevQualities) => [
        ...prevQualities,
        { id: data.id, quality: newQuality },
      ]);
    } catch (err) {
      console.error("Erreur :", err.message);
    }
  };

  const removeQuality = async (qualityId) => {
    console.log("ID de la qualité à supprimer :", qualityId); // Ajoutez ceci pour déboguer
    if (!qualityId) {
      alert("L'ID de la qualité est introuvable !");
      return;
    }
    if (!window.confirm("Voulez-vous vraiment supprimer cette qualité ?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3002/api/profile/${userId}/qualities/${qualityId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la qualité");
      }

      setQualitiesState((prevQualities) =>
        prevQualities.filter((quality) => quality.id !== qualityId)
      );
    } catch (err) {
      console.error("Erreur :", err.message);
    }
  };

  return (
    <section className="qualities-section">
      <h2>Mes qualités</h2>
      <div className="qualities-list">
        {qualitiesState.map((quality) => (
          <span key={quality.id} className="quality">
            {quality.quality}{" "}
            <button onClick={() => removeQuality(quality.id)}>✖</button>
          </span>
        ))}
      </div>

      <button className="add-quality-button" onClick={addQuality}>
        Ajouter une qualité
      </button>
    </section>
  );
};

export default Qualities;
