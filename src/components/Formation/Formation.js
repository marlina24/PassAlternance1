import React, { useState } from "react";
import "./Formation.css";

const Formation = () => {
  const [diplomas, setDiplomas] = useState(["BTS", "Master"]);
  const [languages, setLanguages] = useState(["Anglais", "Italien", "Portugais", "Espagnol"]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState(""); // "diploma" or "language"
  const [inputValue, setInputValue] = useState("");

  const diplomaOptions = ["BTS", "Master", "Licence", "Doctorat"];
  const languageOptions = ["Anglais", "Français", "Italien", "Espagnol", "Allemand", "Chinois", "Arabe"];

  const addItem = () => {
    if (popupType === "diploma" && inputValue && !diplomas.includes(inputValue)) {
      setDiplomas([...diplomas, inputValue]);
    } else if (popupType === "language" && inputValue && !languages.includes(inputValue)) {
      setLanguages([...languages, inputValue]);
    }
    setInputValue("");
    setShowPopup(false);
  };

  const removeItem = (type, item) => {
    if (type === "diploma") {
      setDiplomas(diplomas.filter((d) => d !== item));
    } else if (type === "language") {
      setLanguages(languages.filter((l) => l !== item));
    }
  };

  const openPopup = (type) => {
    setPopupType(type);
    setShowPopup(true);
  };

  return (
    <section className="formation-section">
      <h2>Formation</h2>

      {/* Diplomas Section */}
      <div className="diplomas">
        <h3>Diplôme(s)</h3>
        {diplomas.map((diploma, index) => (
          <div key={index} className="diploma-item">
            {diploma} <button onClick={() => removeItem("diploma", diploma)}>✖</button>
          </div>
        ))}
        <button className="add-button" onClick={() => openPopup("diploma")}>
          Ajouter un diplôme
        </button>
      </div>

      {/* Languages Section */}
      <div className="languages">
        <h3>Langue(s)</h3>
        {languages.map((language, index) => (
          <div key={index} className="language-item">
            {language} <button onClick={() => removeItem("language", language)}>✖</button>
          </div>
        ))}
        <button className="add-button" onClick={() => openPopup("language")}>
          Ajouter une langue
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Ajouter {popupType === "diploma" ? "un diplôme" : "une langue"}</h3>
            <input
              type="text"
              list={popupType === "diploma" ? "diploma-options" : "language-options"}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Rechercher ${popupType === "diploma" ? "un diplôme" : "une langue"}`}
            />
            <datalist id="diploma-options">
              {diplomaOptions.map((option, index) => (
                <option key={index} value={option} />
              ))}
            </datalist>
            <datalist id="language-options">
              {languageOptions.map((option, index) => (
                <option key={index} value={option} />
              ))}
            </datalist>
            <div className="popup-buttons">
              <button className="confirm-button" onClick={addItem}>
                Confirmer
              </button>
              <button className="cancel-button" onClick={() => setShowPopup(false)}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Formation;
