import React, { useEffect, useState } from "react";
import "./OpenedProfileBox.css";
import { followUser, unfollowUser } from "../services/api";

export default function OpenedProfileBox({ user, currentUser, activeCommand, onFollowToggle }) {
  const [isFollowing, setIsFollowing] = useState(user?.isFollowing || false);

  // Sync follow state with Terminal command
  useEffect(() => {
    if (!activeCommand || !user) return;
    const [command, target] = activeCommand.split(" ");
    if (target === user.username) {
      setIsFollowing(command === "follow");
    }
  }, [activeCommand, user]);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) return null;

  const handleFollowToggle = async () => {
    if (!currentUser?._id) return console.error("Current user ID not available");

    try {
      let res;
      if (isFollowing) {
        res = await unfollowUser(user.username, currentUser._id);
        if (res.data.success) {
          setIsFollowing(false);
          onFollowToggle?.(user.username, false);
        }
      } else {
        res = await followUser(user.username, currentUser._id);
        if (res.data.success) {
          setIsFollowing(true);
          onFollowToggle?.(user.username, true);
        }
      }
    } catch (err) {
      console.error("Follow/Unfollow error:", err);
      alert("Something went wrong while updating follow status.");
    }
  };

  return (
    <div className="opened-profile-container">
      <div className="opened-profile-header">
        <span className="username">[@{user.username}]</span>
        <span className="status">{user.isOnline ? "● ACTIVE" : "○ OFFLINE"}</span>
      </div>

      <div className="opened-profile-body">
        <div className="profile-info">
          <p><span className="label">Username:</span> @{user.username || "Unknown"}</p>
          <p><span className="label">Bio:</span> <em>{user.bio || "No bio available"}</em></p>
          <p><span className="label">Gender:</span> {user.gender || "Not specified"}</p>
          <p><span className="label">Date Joined:</span> {formatDate(user.createdAt) || "Unknown"}</p>
          {/* Add more fields as needed from your database */}
          {user.location && <p><span className="label">Location:</span> {user.location}</p>}
          {user.website && <p><span className="label">Website:</span> <a href={user.website} target="_blank" rel="noopener noreferrer">{user.website}</a></p>}
        </div>

        <div className="profile-dp">
          <div className="dp-circle">
            <img 
              src={user.profilePicture || user.avatar || "/default-dp.png"} 
              alt={`${user.username}'s avatar`} 
              onError={(e) => {
                e.target.src = "/default-dp.png";
              }}
            />
          </div>
        </div>
      </div>

      <div className="profile-actions">
        <button
          className={`follow-btn ${isFollowing ? "unfollow" : ""}`}
          onClick={handleFollowToggle}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
}