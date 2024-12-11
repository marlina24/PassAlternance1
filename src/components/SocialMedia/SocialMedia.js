import React, { useState } from "react";
import "./SocialMedia.css";

const SocialMedia = () => {
  const [socialLinks, setSocialLinks] = useState([
    { platform: "LinkedIn", link: "https://linkedin.com/in/marlina" },
    { platform: "Twitter", link: "https://twitter.com/marlina" },
  ]);

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: "", link: "" }]);
  };

  const updateSocialLink = (index, field, value) => {
    const updatedLinks = socialLinks.map((link, i) =>
      i === index ? { ...link, [field]: value } : link
    );
    setSocialLinks(updatedLinks);
  };

  return (
    <section className="social-media">
      <h2>Réseaux sociaux</h2>
      {socialLinks.map((social, index) => (
        <div key={index} className="social-input">
          <input
            type="text"
            placeholder="Plateforme"
            value={social.platform}
            onChange={(e) => updateSocialLink(index, "platform", e.target.value)}
          />
          <input
            type="url"
            placeholder="Lien"
            value={social.link}
            onChange={(e) => updateSocialLink(index, "link", e.target.value)}
          />
        </div>
      ))}
      <button className="add-social-button" onClick={addSocialLink}>
        Ajouter un réseau social
      </button>
    </section>
  );
};

export default SocialMedia;
