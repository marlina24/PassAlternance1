import React from "react";
import "./ProfileHeader.css";
import avatar from "../../assets/avatar2.jpg";

const ProfileHeader = ({ user }) => {
  return (
    <header className="profile-header">
      <div className="profile-header-container">
        <div className="user-info">
          <b>
            <span>
              {user.first_name} {user.name}
            </span>
          </b>
          <p className="registration-date">
            Inscrit depuis le : {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
