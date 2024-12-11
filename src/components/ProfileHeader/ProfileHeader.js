import React from "react";
import "./ProfileHeader.css";
import userAvatar from "../../assets/avatar2.jpg"; // Remplacez par votre image réelle

const ProfileHeader = () => {
  return (
    <header className="profile-header">
      <div className="profile-header-container">
        <img src={userAvatar} alt="User Avatar" className="user-avatar" />
        <div className="user-info">
          <h1>Marlina Victor</h1>
          <p>⭐ 4.5 - Fiabilité : 100%</p>
          <button className="public-profile-btn">Visualiser mon profil public</button>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
