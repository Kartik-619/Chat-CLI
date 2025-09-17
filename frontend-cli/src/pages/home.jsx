import TerminalBox from "../components/TerminalBox";
import ProfileBox from "../components/ProfileBox";
import ChatBox from "../components/ChatBox";
import UsersListBox from "../components/UserListBox";
import OpenedProfileBox from "../components/OpenedProfileBox";
import DMList from "../components/DMList";
import ChatSection from "../components/ChatSection";

import { useState, useEffect } from "react";
import API, { fetchUsers } from "../services/api";

import "../components/BoxStyles.css";
import "../components/UsersListBox.css";
import "../components/DMList.css";

export default function ChatUI() {
  const [rightView, setRightView] = useState("chat");
  const [currentUser, setCurrentUser] = useState(null);
  const [profileUser, setProfileUser] = useState(null);
  const [chatUser, setChatUser] = useState(null);
  const [dmUsers, setDmUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCommand, setActiveCommand] = useState(null);

  // Load saved DMs on startup
  useEffect(() => {
    const saved = localStorage.getItem("dmUsers");
    if (saved) setDmUsers(JSON.parse(saved));
  }, []);

  // Fetch current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await API.get("/api/userprofile");
        if (response.data.success) {
          setCurrentUser(response.data.user);
        }
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        const localUser = JSON.parse(localStorage.getItem("user"));
        if (localUser) setCurrentUser(localUser);
      }
    };

    fetchCurrentUser();
  }, []);

  // Fetch all users
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        if (!currentUser) return;
        const response = await fetchUsers(currentUser._id);
        if (response.data.success) {
          // 🔥 Filter out logged-in user
          const filtered = response.data.users.filter(
            (u) => u.username !== currentUser.username
          );
          setUsers(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) fetchAllUsers();
  }, [currentUser]);

  // Handle follow/unfollow
  const handleFollowToggle = (username, follow) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.username === username
          ? { ...user, isFollowing: follow }
          : user
      )
    );

    if (profileUser?.username === username) {
      setProfileUser((prev) => ({
        ...prev,
        isFollowing: follow,
      }));
    }

    if (follow) {
      const userToAdd = users.find((u) => u.username === username);
      if (userToAdd && !dmUsers.some((u) => u.username === username)) {
        const updated = [...dmUsers, userToAdd];
        setDmUsers(updated);
        localStorage.setItem("dmUsers", JSON.stringify(updated)); // 🔥 persist
      }
    } else {
      const updated = dmUsers.filter((u) => u.username !== username);
      setDmUsers(updated);
      localStorage.setItem("dmUsers", JSON.stringify(updated)); // 🔥 persist
    }
  };

  if (loading) {
    return <div className="app">Loading user data...</div>;
  }

  return (
    <div className="app">
      {/* Left Section */}
      <div className="left-container">
        {profileUser ? (
          <OpenedProfileBox
            user={profileUser}
            activeCommand={activeCommand}
            onFollowToggle={handleFollowToggle}
            currentUser={currentUser}
          />
        ) : (
          <ProfileBox userData={currentUser} />
        )}

        <TerminalBox
          setRightView={setRightView}
          setProfileUser={setProfileUser}
          setChatUser={setChatUser}
          users={users}
          onFollowToggle={handleFollowToggle}
          dmUsers={dmUsers}
          currentUser={currentUser}
          activeCommand={activeCommand}
          setActiveCommand={setActiveCommand}
        />
      </div>

      {/* Right Section */}
      <div className="right-container">
        {rightView === "chat" && <ChatBox />}
        {rightView === "users" && (
          <UsersListBox users={users} onFollowToggle={handleFollowToggle} />
        )}
        {rightView === "dm" && !chatUser && (
          <DMList dmUsers={dmUsers} openChatWithUser={setChatUser} />
        )}
        {chatUser && rightView === "dm" && (
          <ChatSection
            user={chatUser}
            goBack={() => setChatUser(null)}
            setProfileUser={setProfileUser}
          />
        )}
      </div>
    </div>
  );
}
