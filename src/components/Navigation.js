import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation">
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/search-offers">Rechercher</Link></li>
        <li><Link to="/publish-offer">Publier une offre</Link></li>
        <li><Link to="/profile">Mon Profil</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
