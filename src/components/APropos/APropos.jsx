import React from "react";
import "./APropos.css"; // Ajoutez le style correspondant ici
import image1 from "../../assets/imagelivres.png";
import image2 from "../../assets/imageh1.png";
import image3 from "../../assets/imagef2.png";

import image4 from "../../assets/avatar4.jpg";
const Apropos = () => {
  return (
    <div className="apropos-container">
      <h1 className="aproposTitre">Apropos de nous</h1>
      {/* Ligne 1: Image à gauche, texte à droite */}
      <div className="apropos-row">
        <img src={image1} alt="Books" className="apropos-image" />
        <div className="apropos-text">
          <h2>Notre mission</h2>
          <p>
            Pass'Alternance connecte les anciens et futurs apprentis en
            partageant les entreprises libérant des postes, facilitant ainsi
            l’accès aux contrats en alternance.
          </p>
          <a href="#" className="apropos-link"></a>
        </div>
        <img src={image2} alt="Books" className="apropos-image" />
      </div>

      {/* Ligne 2: Texte à gauche, image à droite */}
      <div className="apropos-row ">
        <div className="apropos-text">
          <h2>Nos valeurs</h2>
          <p>
            Nos valeurs reposent sur la solidarité, en favorisant l’entraide
            étudiante, la simplicité, avec une plateforme intuitive, et la
            transparence, en garantissant des informations fiables.
          </p>
          <a href="#" className="apropos-link"></a>
        </div>
        <img src={image3} alt="Smiling Woman" className="apropos-image" />
        <div className="apropos-text">
          <h2>Pourquoi choisir Pass'Alternance?</h2>
          <p>
            Chaque offre provient d’un ancien apprenti, assurant une
            transmission directe des postes et un réseau collaboratif pour
            soutenir les nouvelles générations.
          </p>
          <a href="#" className="apropos-link"></a>
        </div>
      </div>
    </div>
  );
};

export default Apropos;
