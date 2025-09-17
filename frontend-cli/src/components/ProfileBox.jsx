import React from "react";
import "./BoxStyles.css";

export default function ProfileBox({ userData }) {
  if (!userData) return <div className="section profile-box">Loading profile...</div>;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="section profile-box">
      <div className="cyber-grid-overlay"></div>
      <div className="particle-aura"></div>
      
      <div className="profile-header">
        <h3 className="username">
          <span className="username-bracket">[</span>
          @{userData.username}
          <span className="username-bracket">]</span>
        </h3>
        <span className="status online">
          <span className="status-indicator"></span>
          ACTIVE
        </span>
      </div>
      
      <div className="profile-content">
        <div className="profile-details">
          {/* Gender field */}
          <div className="detail-row">
            <span className="detail-label">GENDER:</span>
            <span className="detail-value">
              {userData.details?.gender ? userData.details.gender.charAt(0).toUpperCase() + userData.details.gender.slice(1) : "Not specified"}
            </span>
          </div>
          
          {/* Bio field */}
          <div className="detail-row bio">
            <span className="detail-label">BIO:</span>
            <span className="detail-value bio-text">
              {userData.details?.bio || "No bio set"}
            </span>
          </div>
          
          {/* Date joined field */}
          <div className="detail-row">
            <span className="detail-label">DATE JOINED:</span>
            <span className="detail-value">
              {userData.createdAt ? formatDate(userData.createdAt) : "Unknown"}
            </span>
          </div>
        </div>
        
        <div className="profile-frame">
          <div className="frame-border-animation"></div>
          <div className="frame-corner tl"></div>
          <div className="frame-corner tr"></div>
          <div className="frame-corner bl"></div>
          <div className="frame-corner br"></div>
          <img
            src="https://i.imgur.com/9pNffkj.png"
            alt="Profile"
            className="profile-image"
          />
          <div className="profile-image-overlay"></div>
        </div>
      </div>
      
      <div className="tech-lines"></div>
      <div className="corner-decoration top-left"></div>
      <div className="corner-decoration top-right"></div>
      <div className="corner-decoration bottom-left"></div>
      <div className="corner-decoration bottom-right"></div>
    </div>
  );
}