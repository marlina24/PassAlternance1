import React from "react";
import "./APropos.css"; // Ajoutez le style correspondant ici
import image1 from "../../assets/image1.jpg";
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
            Chez Pass'Alternance, notre mission est de faciliter l’accès aux
            contrats d’alternance en offrant aux anciens apprentis la
            possibilité de partager les entreprises qu’ils quittent. Grâce à ce
            réseau solidaire, nous permettons aux futurs étudiants de découvrir
            des opportunités concrètes et adaptées à leurs besoins.
          </p>
          <a href="#" className="apropos-link"></a>
        </div>
        <img src={image4} alt="Books" className="apropos-image" />
      </div>

      {/* Ligne 2: Texte à gauche, image à droite */}
      <div className="apropos-row ">
        <div className="apropos-text">
          <h2>Nos valeurs</h2>
          <p>
            Solidarité : Favoriser l’entraide entre étudiants pour simplifier la
            recherche d’alternance. Simplicité : Offrir une plateforme intuitive
            et efficace. Transparence : Garantir des informations claires et
            précises sur les postes.
          </p>
          <a href="#" className="apropos-link"></a>
        </div>
        <img src={image1} alt="Smiling Woman" className="apropos-image" />
        <div className="apropos-text">
          <h2>Pourquoi choisir Pass'Alternance?</h2>
          <p>
            Avec Pass'Alternance, chaque opportunité publiée provient d’un
            ancien étudiant ayant achevé son contrat. Ce partage proactif
            favorise une transmission directe et efficace des postes, tout en
            bâtissant un réseau collaboratif où chacun joue un rôle actif dans
            l’accompagnement des nouvelles générations d’apprentis.
          </p>
          <a href="#" className="apropos-link"></a>
        </div>
      </div>
    </div>
  );
};

export default Apropos;
