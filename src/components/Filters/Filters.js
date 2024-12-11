import React, { useState } from "react";
import "./Filters.css";

const Filters = () => {
  const [salaryRange, setSalaryRange] = useState(0);
  const [radius, setRadius] = useState(50);
  const [jobType, setJobType] = useState("");

  const handleSalaryChange = (event) => setSalaryRange(event.target.value);
  const handleRadiusChange = (event) => setRadius(event.target.value);
  const handleJobTypeChange = (event) => setJobType(event.target.value);

  return (
    <aside className="filters-section">
      <h2>Filtres</h2>
      <div className="filter-group">
        <label htmlFor="salaryRange">Salaire minimum (€):</label>
        <input
          type="range"
          id="salaryRange"
          min="0"
          max="5000"
          value={salaryRange}
          onChange={handleSalaryChange}
        />
        <span>{salaryRange} €</span>
      </div>

      <div className="filter-group">
        <label htmlFor="radius">Rayon (km):</label>
        <input
          type="range"
          id="radius"
          min="10"
          max="200"
          value={radius}
          onChange={handleRadiusChange}
        />
        <span>{radius} km</span>
      </div>

      <div className="filter-group">
        <label htmlFor="jobType">Type d'alternance:</label>
        <select id="jobType" value={jobType} onChange={handleJobTypeChange}>
          <option value="">Tous les types</option>
          <option value="IT">Développeur</option>
          <option value="marketing">Marketing</option>
          <option value="finance">Finance</option>
          <option value="design">Design</option>
        </select>
      </div>

      <button className="reset-filters-button">Réinitialiser les filtres</button>
    </aside>
  );
};

export default Filters;
