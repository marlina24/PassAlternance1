import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import axios from "axios";
import "./ContactUs.css";
import ContactImage from "../../assets/avatar4.jpg";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("Envoi en cours...");

    try {
      await axios.post("http://localhost:3002/api/contact", formData);
      setStatus("✅ Email envoyé avec succès !");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    } catch (error) {
      setStatus("❌ Erreur lors de l'envoi du message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div ref={sectionRef} className="contact-us-container">
      <motion.div
        className="contact-us-image"
        initial={{ opacity: 0, x: -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img src={ContactImage} alt="Contact Us" />
      </motion.div>

      <motion.div
        className="contact-us-form"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2>Contactez-nous</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">
              Nom <span>*</span>
            </label>
            <div className="form-row">
              <input
                type="text"
                id="firstName"
                placeholder="Prénom"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                id="lastName"
                placeholder="Nom"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email <span>*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Votre email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">
              Votre message <span>*</span>
            </label>
            <textarea
              id="message"
              placeholder="Écrivez ici..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Envoi..." : "Envoyer"}
          </button>
          {status && <p className="status-message">{status}</p>}
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ContactUs;
