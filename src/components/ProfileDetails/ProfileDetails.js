import React, { useState } from "react";
import "./ProfileDetails.css";

const ProfileDetails = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    first_name: user.first_name || "",
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate({
        first_name: formData.first_name,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      });
      // Appelle la fonction pour mettre à jour les données
      setEditing(false); // Quitte le mode édition
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err.message);
    }
  };

  if (editing) {
    return (
      <form className="profile-details" onSubmit={handleSubmit}>
        <h2>Modifier les informations personnelles</h2>
        <label>
          Prénom :
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Nom :
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email :
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Téléphone :
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Adresse :
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="save-button">
          Enregistrer
        </button>
        <button
          type="button"
          className="cancel-button"
          onClick={() => setEditing(false)}
        >
          Annuler
        </button>
      </form>
    );
  }

  return (
    <section className="profile-details">
      <h2>Informations personnelles</h2>
      <p>Prénom : {user.first_name}</p>
      <p>Nom : {user.name}</p>

      <p>Email : {user.email}</p>
      <p>Téléphone : {user.phone || "Non renseigné"}</p>
      <p>Adresse : {user.address || "Non renseignée"}</p>
      <button className="modify-button" onClick={() => setEditing(true)}>
        Modifier
      </button>
    </section>
  );
};

export default ProfileDetails;
