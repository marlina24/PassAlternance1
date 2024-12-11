import React, { useState } from "react";
import "./PublishForm.css";

const PublishForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Votre offre a été publiée avec succès !");
    setFormData({
      title: "",
      company: "",
      location: "",
      salary: "",
      description: "",
    });
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
            placeholder="Ex: Développeur Web (H/F)"
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
            placeholder="Ex: Tech Solutions"
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
            placeholder="Ex: Paris, France"
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
            placeholder="Ex: 1200"
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
            placeholder="Décrivez l'offre ici..."
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Publier l'offre</button>
      </form>
    </section>
  );
};

export default PublishForm;
