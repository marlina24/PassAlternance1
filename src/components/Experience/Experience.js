import React, { useState } from "react";
import "./Experience.css";

const Experience = () => {
  const [experiences, setExperiences] = useState([
    { job: "Serveur (H/F)", duration: "2-5 ans", rate: "16 €" },
    { job: "Hôtesse (H/F)", duration: "2-5 ans", rate: "16 €" },
    { job: "Réceptionniste (H/F)", duration: "1-3 ans", rate: "14 €" },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [newExperience, setNewExperience] = useState({
    job: "",
    duration: "",
    rate: "",
  });

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setNewExperience({ job: "", duration: "", rate: "" });
  };

  const addExperience = () => {
    if (newExperience.job && newExperience.duration && newExperience.rate) {
      setExperiences([...experiences, newExperience]);
      closePopup();
    } else {
      alert("Veuillez remplir tous les champs !");
    }
  };

  return (
    <section className="experience-section">
      <h2>Expérience</h2>
      <div className="experience-list">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-card">
            <h3>{exp.job}</h3>
            <p>Durée : {exp.duration}</p>
            <p>Taux horaire : {exp.rate}</p>
          </div>
        ))}
      </div>
      <button className="add-button" onClick={openPopup}>
        Ajouter une expérience
      </button>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Ajouter une expérience</h3>
            <input
              type="text"
              placeholder="Intitulé du poste"
              value={newExperience.job}
              onChange={(e) => setNewExperience({ ...newExperience, job: e.target.value })}
            />
            <input
              type="text"
              placeholder="Durée (ex : 2-5 ans)"
              value={newExperience.duration}
              onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
            />
            <input
              type="text"
              placeholder="Taux horaire (ex : 16 €)"
              value={newExperience.rate}
              onChange={(e) => setNewExperience({ ...newExperience, rate: e.target.value })}
            />
            <div className="popup-buttons">
              <button className="confirm-button" onClick={addExperience}>
                Ajouter
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
