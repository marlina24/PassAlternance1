import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="footer-text">© 2024 Pass'Alternance. Tous droits réservés.</p>
        <div className="footer-links">
          <a href="#" className="footer-link">Politique de confidentialité</a>
          <a href="#" className="footer-link">Conditions d'utilisation</a>
          <a href="#" className="footer-link">Contactez-nous</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
