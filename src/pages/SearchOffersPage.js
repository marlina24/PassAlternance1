import React, { useState, useEffect } from "react";
import "./SearchOffersPage.css";
import PageHeader from "../components/PageHeader/PageHeader";
import Filters from "../components/Filters/Filters";
import Offers from "../components/Offers/Offers";


const SearchOffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [filters, setFilters] = useState({ search: "", minSalary: 0, type: "" });


  const fetchOffers = async () => {
    try {
      const params = new URLSearchParams(filters); // Crée les paramètres de requête
      const response = await fetch(`http://localhost:3002/api/offers?${params}`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des offres.");
      }
      const data = await response.json();
      setOffers(data); // Met à jour les offres
    } catch (err) {
      console.error("Erreur :", err.message);
    }
  };


  useEffect(() => {
    fetchOffers();
  }, [filters]);


  return (
    <div className="search-offers-page">
      <PageHeader />
      <div className="search-content">
        <Filters onFiltersChange={setFilters} />
        <Offers offers={offers} />
      </div>
    </div>
  );
};


export default SearchOffersPage;


