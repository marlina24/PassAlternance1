import React, { useState, useEffect } from "react";
import "./Formation.css";

const Formation = () => {
  const [diplomas, setDiplomas] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState(""); // "diploma" ou "language"
  const [inputValue, setInputValue] = useState("");
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [loading, setLoading] = useState(true); // Ajout de l'état de chargement

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      try {
        const response = await fetch(
          `http://localhost:3002/api/profile/${userId}/formations-languages`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Erreur lors de la récupération des formations et langues."
          );
        }

        const data = await response.json();
        setDiplomas(
          data.formations.map((f) => ({ id: f.id, name: f.diploma }))
        );
        setLanguages(
          data.languages.map((l) => ({ id: l.id, name: l.language }))
        );
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch(
        `http://localhost:3002/api/profile/${userId}/formations-languages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Erreur lors de la récupération des formations et langues."
        );
      }

      const data = await response.json();
      setDiplomas(data.formations.map((f) => ({ id: f.id, name: f.diploma })));
      setLanguages(data.languages.map((l) => ({ id: l.id, name: l.language })));
      console.log("Données mises à jour :", data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Appel automatique au premier rendu
  useEffect(() => {
    fetchData();
  }, []);

  const addItem = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const url = `http://localhost:3002/api/profile/${userId}/${
      popupType === "diploma" ? "diplomas" : "languages"
    }`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          [popupType === "diploma" ? "diploma" : "language"]: inputValue,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout.");
      }

      const newItem = await response.json();
      console.log("Nouvel élément ajouté :", newItem);

      // 🔥 AU LIEU D'AJOUTER MANUELLEMENT, ON RECHARGE LES DONNÉES
      fetchData(); // Forcer le rafraîchissement des données après ajout
      setInputValue("");
      setShowPopup(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const openPopup = (type) => {
    setPopupType(type);
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const url = `http://localhost:3002/api/profile/${userId}/${
      popupType === "diploma"
        ? `diplomas/${itemToDelete}`
        : `languages/${itemToDelete}`
    }`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression.");
      }

      if (popupType === "diploma") {
        setDiplomas((prev) => prev.filter((d) => d.id !== itemToDelete));
      } else {
        setLanguages((prev) => prev.filter((l) => l.id !== itemToDelete));
      }

      setItemToDelete(null);
      setDeleteConfirmation(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = (id, type) => {
    setPopupType(type);
    setItemToDelete(id);
    setDeleteConfirmation(true);
  };

  return (
    <section className="formation-section">
      <h2>Formation</h2>

      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <>
          <div className="diplomas">
            <h3>Diplôme(s)</h3>
            {diplomas.length > 0 ? (
              diplomas.map((diploma) => (
                <div key={diploma.id} className="diploma-item border-violet">
                  {diploma.name}
                  <button onClick={() => handleDelete(diploma.id, "diploma")}>
                    ❌
                  </button>
                </div>
              ))
            ) : (
              <p>Aucun diplôme disponible.</p>
            )}
            <button className="add-button" onClick={() => openPopup("diploma")}>
              Ajouter un diplôme
            </button>
          </div>

          <div className="languages">
            <h3>Langue(s)</h3>
            {languages.length > 0 ? (
              languages.map((language) => (
                <div key={language.id} className="language-item border-violet">
                  {language.name}
                  <button onClick={() => handleDelete(language.id, "language")}>
                    ❌
                  </button>
                </div>
              ))
            ) : (
              <p>Aucune langue disponible.</p>
            )}
            <button
              className="add-button"
              onClick={() => openPopup("language")}
            >
              Ajouter une langue
            </button>
          </div>
        </>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>
              Ajouter {popupType === "diploma" ? "un diplôme" : "une langue"}
            </h3>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Rechercher ${
                popupType === "diploma" ? "un diplôme" : "une langue"
              }`}
            />
            <div className="popup-buttons">
              <button className="confirm-button" onClick={addItem}>
                Confirmer
              </button>
              <button
                className="cancel-button"
                onClick={() => setShowPopup(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirmation && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Voulez-vous vraiment supprimer cet élément ?</h3>
            <div className="popup-buttons">
              <button className="confirm-button" onClick={confirmDelete}>
                Confirmer
              </button>
              <button
                className="cancel-button"
                onClick={() => setDeleteConfirmation(false)}
              >
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
