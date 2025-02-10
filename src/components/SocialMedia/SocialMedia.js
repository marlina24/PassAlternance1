import React, { useState, useEffect } from "react";
import "./SocialMedia.css";

const SocialMedia = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [newLink, setNewLink] = useState({ platform: "", link: "" });
  const [error, setError] = useState("");
  const platforms = [
    "GitHub",
    "LinkedIn",
    "Twitter",
    "Facebook",
    "Instagram",
    "YouTube",
    "WhatsApp",
    "Pinterest",
    "Reddit",
    "TikTok",
  ];

  useEffect(() => {
    // Fetch social links from the backend
    const fetchSocialLinks = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      try {
        const response = await fetch(
          `http://localhost:3002/api/profile/${userId}/social-links`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des liens sociaux.");
        }

        const data = await response.json();
        setSocialLinks(data.socialLinks);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchSocialLinks();
  }, []);

  const isValidUrl = (url) => {
    const regex = new RegExp(
      "^(https?:\\/\\/)?([\\w\\d-]+\\.)+[\\w-]{2,4}(:\\d+)?(\\/\\S*)?$",
      "i"
    );
    return regex.test(url);
  };

  const addSocialLink = async () => {
    if (!isValidUrl(newLink.link)) {
      setError("Veuillez entrer un lien valide.");
      return;
    }
    setError("");

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch(
        `http://localhost:3002/api/profile/${userId}/social-links`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newLink),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du lien social.");
      }

      const addedLink = await response.json();
      setSocialLinks([...socialLinks, addedLink]);
      setNewLink({ platform: "", link: "" });
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateSocialLink = async (index, field, value) => {
    const updatedLinks = socialLinks.map((link, i) =>
      i === index ? { ...link, [field]: value } : link
    );
    setSocialLinks(updatedLinks);

    if (field === "link" && !isValidUrl(value)) {
      setError("Veuillez entrer un lien valide.");
      return;
    }
    setError("");

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const linkToUpdate = updatedLinks[index];

    try {
      await fetch(
        `http://localhost:3002/api/profile/${userId}/social-links/${linkToUpdate.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(linkToUpdate),
        }
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error.message);
    }
  };

  const deleteSocialLink = async (id) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch(
        `http://localhost:3002/api/profile/${userId}/social-links/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du lien social.");
      }

      setSocialLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <section className="social-media">
      <h2>Réseaux sociaux</h2>
      {socialLinks.map((social, index) => (
        <div key={index} className="social-input">
          <select
            value={social.platform}
            onChange={(e) =>
              updateSocialLink(index, "platform", e.target.value)
            }
          >
            <option value="">Sélectionnez une plateforme</option>
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
          <input
            type="url"
            placeholder="Lien"
            value={social.link}
            onChange={(e) => updateSocialLink(index, "link", e.target.value)}
          />
          <button
            className="delete-button"
            onClick={() => deleteSocialLink(social.id)}
          >
            ❌
          </button>
        </div>
      ))}
      <div className="social-input">
        <select
          value={newLink.platform}
          onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
        >
          <option value="">Sélectionnez une plateforme</option>
          {platforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
        <input
          type="url"
          placeholder="Lien"
          value={newLink.link}
          onChange={(e) => setNewLink({ ...newLink, link: e.target.value })}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button className="add-social-button" onClick={addSocialLink}>
        Ajouter un réseau social
      </button>
    </section>
  );
};

export default SocialMedia;
