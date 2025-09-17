import React from "react";
import "./UsersListBox.css";

export default function UsersListBox({ users = [] }) {
  if (!users || users.length === 0) {
    return (
      <div className="users-list-box">
        <h2 className="users-title">Active Users</h2>
        <div className="no-users">No users online</div>
      </div>
    );
  }

  return (
    <div className="users-list-box">
      <h2 className="users-title">Active Users</h2>
      <ul className="users-list">
      {users.map((user, index) => (
  <li key={user._id || user.username || index} className="user-item">
    <span className="user-avatar">👤</span>
    <span className="user-name">@{user.username}</span>
  </li>
))}

      </ul>
    </div>
  );
}