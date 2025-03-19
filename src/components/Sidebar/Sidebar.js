import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import avatar1 from "../../assets/avatar2.jpg";

const Sidebar = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/api/profile/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok)
          throw new Error("Erreur lors du chargement du profil");

        const data = await response.json();
        setProfileData({
          user: data.user,
          wishes: data.wishes || [],
          experiences: data.experiences || [],
          qualities: data.qualities || [],
          formations: data.formations || [],
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="error-message">Erreur : {error}</p>;

  return (
    <div className="sidebar">
      <img src={avatar1} alt="Profile" className="profile-picture" />
      <h2>
        {profileData.user.first_name} {profileData.user.name}
      </h2>

      <div className="info-section">
        <h3>Souhaits</h3>
        <ul>
          {profileData.wishes.length > 0 ? (
            profileData.wishes.map((wish) => <li key={wish.id}>{wish.wish}</li>)
          ) : (
            <li>Aucun souhait ajouté</li>
          )}
        </ul>
      </div>

      <div className="info-section">
        <h3>Expérience</h3>
        <ul>
          {profileData.experiences.length > 0 ? (
            profileData.experiences.map((exp) => (
              <li key={exp.id}>
                <strong>{exp.job}</strong> - {exp.duration} ({exp.rate} €/h)
              </li>
            ))
          ) : (
            <li>Aucune expérience ajoutée</li>
          )}
        </ul>
      </div>

      <div className="info-section">
        <h3>Qualités</h3>
        <ul>
          {profileData.qualities.length > 0 ? (
            profileData.qualities.map((quality) => (
              <li key={quality.id}>{quality.quality}</li>
            ))
          ) : (
            <li>Aucune qualité ajoutée</li>
          )}
        </ul>
      </div>

      <div className="info-section">
        <h3>Formations</h3>
        <ul>
          {profileData.formations.length > 0 ? (
            profileData.formations.map((formation) => (
              <li key={formation.id}>{formation.diploma}</li>
            ))
          ) : (
            <li>Aucune formation ajoutée</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
