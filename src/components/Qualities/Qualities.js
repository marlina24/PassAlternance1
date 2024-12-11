import React, { useState } from "react";
import "./Qualities.css";

const Qualities = () => {
  const [qualities, setQualities] = useState([
    "Ponctualité",
    "Présentation",
    "Fiabilité",
  ]);

  const addQuality = () => {
    const newQuality = prompt("Ajouter une qualité :");
    if (newQuality && !qualities.includes(newQuality)) {
      setQualities([...qualities, newQuality]);
    }
  };

  const removeQuality = (quality) => {
    setQualities(qualities.filter((item) => item !== quality));
  };

  return (
    <section className="qualities-section">
      <h2>Mes qualités</h2>
      <div className="qualities-list">
        {qualities.map((quality, index) => (
          <span key={index} className="quality">
            {quality} <button onClick={() => removeQuality(quality)}>✖</button>
          </span>
        ))}
      </div>
      <button className="add-quality-button" onClick={addQuality}>
        Ajouter +
      </button>
    </section>
  );
};

export default Qualities;
