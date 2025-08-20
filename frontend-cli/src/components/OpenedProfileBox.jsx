import React, { useEffect } from "react";
import "./OpenedProfileBox.css";

export default function OpenedProfileBox({ user, activeCommand, onFollowToggle }) {
  // Handle terminal commands follow/unfollow
  useEffect(() => {
    if (!activeCommand || !user) return;
    const [command, target] = activeCommand.split(" ");
    if (target === user.username) {
      if (command === "follow") onFollowToggle(user.username, true);
      if (command === "unfollow") onFollowToggle(user.username, false);
    }
  }, [activeCommand, user, onFollowToggle]);

  if (!user) return null;

  return (
    <div className="opened-profile-container">
      <div className="opened-profile-header">
        <span className="username">[@{user.username}]</span>
        <span className="status">{user.isOnline ? "● ACTIVE" : "○ OFFLINE"}</span>
      </div>

      <div className="opened-profile-body">
        <div className="profile-info">
          <p><span className="label">ID:</span> {user.gender}</p>
          <p><span className="label">BIO:</span> <em>{user.bio}</em></p>
          <p><span className="label">DATE JOINED:</span> {user.joinDate}</p>
        </div>

        <div className="profile-dp">
          <div className="dp-circle">
            <img src={user.dp || "/default-dp.png"} alt="avatar" />
          </div>
        </div>
      </div>

      <div className="profile-actions">
        <button
          className={`follow-btn ${user.isFollowing ? "unfollow" : ""}`}
          onClick={() => onFollowToggle(user.username, !user.isFollowing)}
        >
          {user.isFollowing ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
}
