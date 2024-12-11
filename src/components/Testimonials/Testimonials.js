import React from "react";
import "./Testimonials.css";
import avatar1 from '../../assets/avatar1.png'; // Image d'avatar 1
import avatar2 from '../../assets/avatar2.jpg'; // Image d'avatar 2
import avatar3 from '../../assets/avatar3.jpg'; // Image d'avatar 3

const Testimonials = () => {
  return (
    <div className="testimonials-container">
      <h1 className="testimonials-title">Ce que disent nos utilisateurs</h1>
      <p className="testimonials-subtitle">
        Découvrez comment Pass'Alternance a aidé nos utilisateurs à atteindre leurs objectifs professionnels.
      </p>
      <div className="testimonials-cards">
        <div className="testimonial-card">
          <img src={avatar1} alt="Avatar utilisateur" className="testimonial-avatar" />
          <h3 className="testimonial-name">Sarah L.</h3>
          <p className="testimonial-role">Étudiante en alternance</p>
          <p className="testimonial-text">
            "Grâce à Pass'Alternance, j'ai pu trouver une entreprise en seulement une semaine. Une plateforme indispensable !"
          </p>
        </div>
        <div className="testimonial-card">
          <img src={avatar2} alt="Avatar utilisateur" className="testimonial-avatar" />
          <h3 className="testimonial-name">Mehdi K.</h3>
          <p className="testimonial-role">Développeur junior</p>
          <p className="testimonial-text">
            "Une expérience incroyable ! Pass'Alternance m'a permis de préparer mon CV et de décrocher mon premier poste."
          </p>
        </div>
        <div className="testimonial-card">
          <img src={avatar3} alt="Avatar utilisateur" className="testimonial-avatar" />
          <h3 className="testimonial-name">Lina A.</h3>
          <p className="testimonial-role">Manager RH</p>
          <p className="testimonial-text">
            "Pass'Alternance m'a aidée à trouver des candidats motivés et bien préparés pour rejoindre notre équipe."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
