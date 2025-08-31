// src/components/DMList.jsx
import React from "react";
import "./DMList.css";

export default function DMList({ dmUsers, openChatWithUser }) {
  if (!dmUsers || dmUsers.length === 0) {
    return (
      <div className="dm-list-container">
        <h3>DM List</h3>
        <p>No DMs yet. Follow users to start chatting!</p>
      </div>
    );
  }

  return (
    <div className="dm-list-container">
      <h3>DM List</h3>
      <ul>
        {dmUsers.map(user => (
          <li key={user.username} onClick={() => openChatWithUser(user)}>
            <span className={`status-dot ${user.isOnline ? "online" : "offline"}`}></span>
            @{user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}
