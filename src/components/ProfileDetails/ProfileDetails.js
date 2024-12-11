import React from "react";
import "./ProfileDetails.css";

const ProfileDetails = () => {
  return (
    <section className="profile-details">
      <h2>Informations personnelles</h2>
      <p>Email : marlina.victor@example.com</p>
      <p>Téléphone : +33 6 12 34 56 78</p>
      <p>Adresse : Paris, France</p>
      <button className="modify-button">Modifier</button>
    </section>
  );
};

export default ProfileDetails;
