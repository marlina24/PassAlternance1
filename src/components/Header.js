import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Pass'Alternance</Link>
      </div>
      <nav className="navigation">
        <ul>
          <li><Link to="/search-offers">Rechercher</Link></li>
          <li><Link to="/publish-offer">Publier une offre</Link></li>
          <li><Link to="/profile">Mon Profil</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/login">Se Connecter</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
