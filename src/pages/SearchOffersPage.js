import React from "react";
import "./SearchOffersPage.css";
import PageHeader from "../components/PageHeader/PageHeader";
import Filters from "../components/Filters/Filters";
import Offers from "../components/Offers/Offers";

const SearchOffersPage = () => {
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
  return (
    <div className="search-offers-page">
      {/* Page Header */}
      <PageHeader />

      <div className="search-content">
        {/* Filters Section */}
        <Filters />

        {/* Offers Section */}
        <Offers offers={offresPostees} />
      </div>
    </div>
  );
};

export default SearchOffersPage;
