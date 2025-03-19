import React, { useState } from "react";
import "./PublishForm.css";

const PublishForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    lien: "", // Ajout du champ lien
    type: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userID = localStorage.getItem("userId"); // ✅ Récupération de l'ID utilisateur

    if (!userID) {
      setErrorMessage("Erreur : utilisateur non authentifié.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3002/api/offers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, userID }), // ✅ Ajout de userID
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.message || "Échec de la publication de l'offre."
        );
      }

      const result = await response.json();
      setSuccessMessage(result.message);
      setErrorMessage("");

      setFormData({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
        lien: "",
        type: "",
      });
    } catch (err) {
      setErrorMessage(err.message);
      setSuccessMessage("");
    }
  };

  return (
    <section className="publish-form-section">
      <form className="publish-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titre de l'offre</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="company">Nom de l'entreprise</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Lieu</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="salary">Salaire (€)</label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="lien">Lien de l'entreprise</label>
          <input
            type="url"
            id="lien"
            name="lien"
            value={formData.lien}
            onChange={handleChange}
            placeholder="https://www.entreprise.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type d'offre</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">-- Sélectionnez --</option>
            <option value="stage">Stage</option>
            <option value="alternance">Alternance</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          Publier l'offre
        </button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </section>
  );
};

export default PublishForm;
