import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import ProfileDetails from "../components/ProfileDetails/ProfileDetails";
import Experience from "../components/Experience/Experience";
import SocialMedia from "../components/SocialMedia/SocialMedia";
import Qualities from "../components/Qualities/Qualities";
import Wishes from "../components/Wishes/Wishes";
import Formation from "../components/Formation/Formation";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      navigate("/login"); // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/api/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Token pour l'authentification
            },
          }
        );
        if (!response.ok) {
          throw new Error("Erreur lors du chargement du profil");
        }
        const data = await response.json();
        console.log("mash normal", data);
        setProfileData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleUpdateExperiences = async (updatedExperiences) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch(
        `http://localhost:3002/api/experiences/${userId}/experiences`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ experiences: updatedExperiences }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour des expériences");
      }

      setProfileData((prevData) => ({
        ...prevData,
        experiences: updatedExperiences,
      }));
    } catch (err) {
      console.error(
        "Erreur lors de la mise à jour des expériences :",
        err.message
      );
    }
  };

  const handleUpdateProfile = async (formData) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    console.log("User ID Stocké :", localStorage.getItem("userId"));
    console.log("Token Stocké :", localStorage.getItem("token"));

    try {
      const response = await fetch(
        `http://localhost:3002/api/profile/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du profil");
      }

      const updatedUser = await response.json();
      setProfileData((prevData) => ({
        ...prevData,
        user: { ...prevData.user, ...formData },
      }));
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err.message);
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  return (
    <div className="profile-page">
      <ProfileHeader user={profileData.user} />
      <ProfileDetails user={profileData.user} onUpdate={handleUpdateProfile} />
      <Wishes
        wishes={profileData.wishes}
        userId={localStorage.getItem("userId")}
        token={localStorage.getItem("token")}
      />
      <Qualities
        qualities={profileData.qualities}
        userId={localStorage.getItem("userId")}
        token={localStorage.getItem("token")}
      />
      <Formation formations={profileData.formations} />
      <SocialMedia socialLinks={profileData.socialLinks} />
      <Experience
        userId={localStorage.getItem("userId")} // ✅ utilise localStorage directement
        experiences={profileData.experiences || []}
        onUpdateExperiences={handleUpdateExperiences}
      />
    </div>
  );
};

export default ProfilePage;
