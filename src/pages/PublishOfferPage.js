import React from "react";
import HeaderPageOffre from "../components/HeaderPageOffre/HeaderPageOffre";
import PublishForm from "../components/PublishForm/PublishForm";

const PublishOfferPage = () => {
  return (
    <div className="publish-offer-page">
      {/* En-tête */}
      <HeaderPageOffre
        title="Publier une Offre"
        subtitle="Publiez une offre d'alternance pour aider les étudiants."
      />

      {/* Formulaire de publication */}
      <PublishForm />
    </div>
  );
};

export default PublishOfferPage;
