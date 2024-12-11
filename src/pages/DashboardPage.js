import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Tabs from "../components/Tabs/Tabs";
import Offers from "../components/Offers/Offers";
import "./DashboardPage.css";

function DashboardPage() {
  const [activeTab, setActiveTab] = useState("offresPostees");

  const offresPostees = [
    {
      title: "Développeur Front-End (H/F)",
      company: "TechCorp",
      location: "Paris, France",
      salary: "700 € / mois",
    },
    {
      title: "Développeur Front-End (H/F)",
      company: "TechCorp",
      location: "Paris, France",
      salary: "700 € / mois",
    },
    {
      title: "Développeur Back-End (H/F)",
      company: "InnovWeb",
      location: "Lyon, France",
      salary: "800 € / mois",
    },
  ];

  const favoris = [
    {
      title: "Alternance - Développeur Full-Stack",
      company: "Web Solutions",
      location: "Marseille, France",
      salary: "900 € / mois",
    },
    {
      title: "Développeur Back-End (H/F)",
      company: "InnovWeb",
      location: "Lyon, France",
      salary: "800 € / mois",
    },
    {
      title: "Alternance - Développeur Full-Stack",
      company: "Web Solutions",
      location: "Marseille, France",
      salary: "900 € / mois",
    },
  ];

  return (
    <div className="dashboard-page">
      {/* Sidebar gauche */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="main-content">
        {/* Onglets */}
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Contenu des onglets */}
        <div className="tab-content">
          {activeTab === "offresPostees" && <Offers offers={offresPostees} />}
          {activeTab === "favoris" && <Offers offers={favoris} />}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
