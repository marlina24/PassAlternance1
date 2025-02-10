import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token"); // Vérifie si un token est présent

  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprime le token
    navigate("/login"); // Redirige vers la page de connexion
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Pass'Alternance</Link>
      </div>
      <nav className="navigation">
        <ul>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/search-offers">Rechercher</Link>
              </li>
              <li>
                <Link to="/publish-offer">Publier une offre</Link>
              </li>
              <li>
                <Link to="/profile">Mon Profil</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Se Déconnecter</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/search-offers">Rechercher</Link>
              </li>
              <li>
                <Link to="/login">Se Connecter</Link>
              </li>
              <li>
                <Link to="/signup">S'inscrire</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
