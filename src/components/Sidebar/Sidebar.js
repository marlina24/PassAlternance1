import React from "react";
import "./Sidebar.css";
import avatar1 from "../../assets/avatar2.jpg";

function Sidebar() {
  const jobs = ["Développeur Web", "Développeur Fullstack", "Data Analyst"];

  return (
    <div className="sidebar">
      <img src={avatar1} alt="Profile" className="profile-picture" />
      <h2>Marlina</h2>
      <p>⭐ 172 évaluations</p>
      <p>Fiabilité : 100%</p>

      <div className="jobs-section">
        <h3>Métiers recherchés</h3>
        <ul className="jobs-list">
          {jobs.map((job, index) => (
            <li key={index}>{job}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
