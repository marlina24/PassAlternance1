import React, { useState } from "react";
import "./Filters.css";

const Filters = ({ onFiltersChange }) => {
  const [search, setSearch] = useState("");
  const [minSalary, setMinSalary] = useState(0);
  const [type, setType] = useState("");

  // Mettre à jour les filtres en temps réel
  const updateFilters = () => {
    onFiltersChange({ search, minSalary: parseInt(minSalary, 10), type });
  };

  return (
    <div className="filters">
      <label>
        Recherche :
        <input
          type="text"
          placeholder="Rechercher un poste"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            updateFilters();
          }}
        />
      </label>
      <label>
        Salaire minimum (€) :
        <input
          type="range"
          min="0"
          max="5000"
          step="100"
          value={minSalary}
          onChange={(e) => {
            setMinSalary(e.target.value);
            updateFilters();
          }}
        />
        <span>{minSalary} €</span>
      </label>
      <label>
        Type d'alternance :
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            updateFilters();
          }}
        >
          <option value="">Tous les types</option>
          <option value="stage">Stage</option>
          <option value="apprentissage">Apprentissage</option>
        </select>
      </label>
      <button
        onClick={() => onFiltersChange({ search: "", minSalary: 0, type: "" })}
        className="reset-button"
      >
        Réinitialiser
      </button>
    </div>
  );
};

export default Filters;
