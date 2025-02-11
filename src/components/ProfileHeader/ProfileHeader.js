import React from "react";
import "./ProfileHeader.css";
import avatar from "../../assets/avatar2.jpg";

const ProfileHeader = ({ user }) => {
  return (
    <header className="profile-header">
      <div className="profile-header-container">
        <div className="user-info">
          <h1>{user.name}</h1>
          <p>⭐ 4.5 - Fiabilité : 100%</p>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
