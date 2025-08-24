import React from "react";
import "./UsersListBox.css";

export default function UsersListBox({ users = [] }) {
  return (
    <div className="users-list-box">
      <h2 className="users-title">Active Users</h2>
      <ul className="users-list">
        {users.length > 0 ? (
          users.map((user, idx) => (
            <li key={idx} className="user-item">
              <span className="user-avatar">👤</span>
              <span className="user-name">{user}</span>
            </li>
          ))
        ) : (
          <li className="no-users">No users online</li>
        )}
      </ul>
    </div>
  );
}
