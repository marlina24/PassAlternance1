import React from "react";
import "./Tabs.css";

function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="tabs">
      <button
        className={activeTab === "offresPostees" ? "active" : ""}
        onClick={() => setActiveTab("offresPostees")}
      >
        Offres postées
      </button>
      <button
        className={activeTab === "favoris" ? "active" : ""}
        onClick={() => setActiveTab("favoris")}
      >
        Favoris
      </button>
    </div>
  );
}

export default Tabs;
