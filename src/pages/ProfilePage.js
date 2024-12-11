import React from "react";
import "./ProfilePage.css";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import ProfileDetails from "../components/ProfileDetails/ProfileDetails";
import Experience from "../components/Experience/Experience";
import SocialMedia from "../components/SocialMedia/SocialMedia";
import Qualities from "../components/Qualities/Qualities";
import Wishes from "../components/Wishes/Wishes";
import Formation from "../components/Formation/Formation";

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <ProfileHeader />
      <ProfileDetails />
      <Wishes />
      <Qualities />
      <Formation />
      <SocialMedia />
      <Experience />
    </div>
  );
};

export default ProfilePage;
