import React from "react";
import "./ContactUs.css";
import ContactImage from '../../assets/avatar4.jpg'; // Remplacez par l'image réelle

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <div className="contact-us-image">
        <img src={ContactImage} alt="Contact Us" />
      </div>
      <div className="contact-us-form">
        <h2>Contactez-nous</h2>
        <form>
          <div className="form-group">
            <label htmlFor="firstName">Nom <span>*</span></label>
            <div className="form-row">
              <input
                type="text"
                id="firstName"
                placeholder="Prénom"
                required
              />
              <input
                type="text"
                id="lastName"
                placeholder="Nom"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email <span>*</span></label>
            <input type="email" id="email" placeholder="Votre email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Laissez-nous quelques mots <span>*</span></label>
            <textarea
              id="message"
              placeholder="Votre message"
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">Envoyer</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
