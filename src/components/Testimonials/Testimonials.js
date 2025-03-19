import React from "react";
import { motion } from "framer-motion";
import "./Testimonials.css";
import avatar1 from "../../assets/avatar1.png";
import avatar2 from "../../assets/avatar2.jpg";
import avatar3 from "../../assets/avatar3.jpg";

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
  whileHover: {
    scale: 1.05,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.3 },
  },
};

const Testimonials = () => {
  return (
    <div className="testimonials-container">
      <h1 className="testimonials-title">Ce que disent nos utilisateurs</h1>
      <p className="testimonials-subtitle">
        Découvrez comment Pass'Alternance a aidé nos utilisateurs à atteindre
        leurs objectifs professionnels.
      </p>
      <div className="testimonials-cards">
        {[
          {
            img: avatar2,
            name: "Sarah M.",
            role: "Étudiante en alternance",
            text: "Grâce à Pass'Alternance, j'ai pu trouver une entreprise en seulement une semaine. Une plateforme indispensable !",
          },
          {
            img: avatar1,
            name: "Maxime L.",
            role: "Développeur junior",
            text: "Une expérience incroyable ! Pass'Alternance m'a permis de préparer mon CV et de décrocher mon premier poste.",
          },
          {
            img: avatar3,
            name: "Lina A.",
            role: "Manager RH",
            text: "Pass'Alternance m'a aidée à trouver des candidats motivés et bien préparés pour rejoindre notre équipe.",
          },
        ].map((testimonial, index) => (
          <motion.div
            key={index}
            className="testimonial-card"
            variants={cardVariants}
            whileHover="whileHover"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.3 }}
          >
            <img
              src={testimonial.img}
              alt="Avatar utilisateur"
              className="testimonial-avatar"
            />
            <h3 className="testimonial-name">{testimonial.name}</h3>
            <p className="testimonial-role">{testimonial.role}</p>
            <p className="testimonial-text">{testimonial.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
