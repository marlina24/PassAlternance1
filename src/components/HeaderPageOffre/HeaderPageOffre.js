import React from "react";
import "./HeaderPageOffre.css";

const HeaderPageOffre = ({ title, subtitle }) => {
  return (
    <header className="header-page-offre">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
};

export default HeaderPageOffre;
