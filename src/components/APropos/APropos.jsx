import React from "react";
import "./APropos.css"; // Ajoutez le style correspondant ici
import image1 from '../../assets/image1.jpg'
const Apropos = () => {
  return (
    <div className="apropos-container">
        <h1 className="aproposTitre">Aporpos de nous</h1>
      {/* Ligne 1: Image à gauche, texte à droite */}
      <div className="apropos-row">
        <img src={image1} alt="Books" className="apropos-image" />
        <div className="apropos-text">
          <h2>Creativity</h2>
          <p>
            Sample text. Click to select the text box. Click again or double
            click to start editing the text.
          </p>
          <a href="#" className="apropos-link">
            Learn More
          </a>
        </div>
        <img src={image1} alt="Books" className="apropos-image" />
      </div>


      {/* Ligne 2: Texte à gauche, image à droite */}
      <div className="apropos-row ">
        <div className="apropos-text">
          <h2>Positivity</h2>
          <p>
            Sample text. Click to select the text box. Click again or double
            click to start editing the text.
          </p>
          <a href="#" className="apropos-link">
            Learn More
          </a>
        </div>
        <img src={image1} alt="Smiling Woman" className="apropos-image" />
        <div className="apropos-text">
          <h2>Positivity</h2>
          <p>
            Sample text. Click to select the text box. Click again or double
            click to start editing the text.
          </p>
          <a href="#" className="apropos-link">
            Learn More
          </a>
        </div>
      </div>

      
    </div>
  );
};

export default Apropos;
