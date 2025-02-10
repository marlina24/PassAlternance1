import React, { useState, useEffect } from "react";
import "./Experience.css";

const Experience = ({ userId, experiences, onUpdateExperiences }) => {
  const [localExperiences, setLocalExperiences] = useState(experiences);
  const [showPopup, setShowPopup] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newExperience, setNewExperience] = useState({
    job: "",
    duration: "",
    rate: "",
  });

  useEffect(() => {
    const fetchExperiences = async () => {
      if (!userId) {
        console.error("userId est undefined");
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:3002/api/experiences/${userId}/experiences`
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des expériences.");
        }
        const data = await response.json();
        setLocalExperiences(data.experiences);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchExperiences();
  }, [userId]);

  const saveExperience = async () => {
    if (newExperience.job && newExperience.duration && newExperience.rate) {
      try {
        if (editIndex !== null) {
          // Update existing experience
          const updatedExperiences = [...localExperiences];
          updatedExperiences[editIndex] = newExperience;

          setLocalExperiences(updatedExperiences);
          onUpdateExperiences(updatedExperiences);
        } else {
          // Add new experience
          const response = await fetch(
            `http://localhost:3002/api/experiences/${userId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newExperience),
            }
          );
          if (!response.ok) {
            throw new Error("Erreur lors de l'ajout de l'expérience.");
          }
          const addedExperience = await response.json();
          const updatedExperiences = [...localExperiences, addedExperience];

          setLocalExperiences(updatedExperiences);
          onUpdateExperiences(updatedExperiences);
        }
        closePopup();
      } catch (error) {
        console.error(error.message);
      }
    } else {
      alert("Veuillez remplir tous les champs !");
    }
  };

  const deleteExperience = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/experiences/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'expérience.");
      }
      const updatedExperiences = localExperiences.filter(
        (exp) => exp.id !== id
      );

      setLocalExperiences(updatedExperiences);
      onUpdateExperiences(updatedExperiences);
    } catch (error) {
      console.error(error.message);
    }
  };

  const openPopup = (index = null) => {
    if (index !== null) {
      setNewExperience(localExperiences[index]);
      setEditIndex(index);
    }
    setShowPopup(true);
  };
  const closePopup = () => {
    setShowPopup(false);
    setNewExperience({ job: "", duration: "", rate: "" });
    setEditIndex(null);
  };

  return (
    <section className="experience-section">
      <h2>Expérience</h2>
      {localExperiences.length > 0 ? (
        <div className="experience-list">
          {localExperiences.map((exp, index) => (
            <div key={exp.id} className="experience-card">
              <h3>{exp.job}</h3>
              <p>Durée : {exp.duration}</p>
              <p>Taux horaire : {exp.rate}</p>
              <button className="edit-button" onClick={() => openPopup(index)}>
                Modifier
              </button>
              <button
                className="delete-button"
                onClick={() => deleteExperience(exp.id)}
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-experience">Aucune expérience disponible.</p>
      )}
      <button className="add-button" onClick={() => openPopup()}>
        Ajouter une expérience
      </button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>
              {editIndex !== null ? "Modifier" : "Ajouter"} une expérience
            </h3>
            <input
              type="text"
              placeholder="Intitulé du poste"
              value={newExperience.job}
              onChange={(e) =>
                setNewExperience({ ...newExperience, job: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Durée (ex : 2-5 ans)"
              value={newExperience.duration}
              onChange={(e) =>
                setNewExperience({ ...newExperience, duration: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Taux horaire (ex : 16 €)"
              value={newExperience.rate}
              onChange={(e) =>
                setNewExperience({ ...newExperience, rate: e.target.value })
              }
            />
            <div className="popup-buttons">
              <button className="confirm-button" onClick={saveExperience}>
                {editIndex !== null ? "Modifier" : "Ajouter"}
              </button>
              <button className="cancel-button" onClick={closePopup}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Experience;
