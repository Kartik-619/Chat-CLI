import React, { useState } from "react";
import TerminalBox from "./components/TerminalBox";
import ProfileBox from "./components/ProfileBox";
import ChatBox from "./components/ChatBox";
import UsersListBox from "./components/UserListBox";
import OpenedProfileBox from "./components/OpenedProfileBox";
import DMList from "./components/DMList";
import ChatSection from "./components/ChatSection";
import "./components/BoxStyles.css";
import "./components/UsersListBox.css";
import "./components/DMList.css";

function App() {
  const [rightView, setRightView] = useState("chat");

  // 🔄 split state
  const [profileUser, setProfileUser] = useState(null); // LEFT: profile
  const [chatUser, setChatUser] = useState(null);       // RIGHT: chat

  const [dmUsers, setDmUsers] = useState([]);
  const [users, setUsers] = useState([
    { username: "alice", gender: "Female", bio: "Explorer of cyber worlds", joinDate: "01/05/2024", isOnline: true,  followers: 2,  following: 1, isFollowing: false },
    { username: "bob",   gender: "Male",   bio: "Defender of firewalls",     joinDate: "12/03/2024", isOnline: true,  followers: 5,  following: 3, isFollowing: false },
    { username: "charlie", gender: "Male", bio: "Debugger of chaos",         joinDate: "22/06/2024", isOnline: false, followers: 1,  following: 2, isFollowing: false },
    { username: "neo_coder", gender: "Male", bio: "Hacking the matrix one line at a time", joinDate: "15/08/2025", isOnline: true, followers: 10, following: 4, isFollowing: false },
  ]);

  // Toggle follow/unfollow
  const handleFollowToggle = (username, follow) => {
    setUsers(prev =>
      prev.map(user =>
        user.username === username
          ? {
              ...user,
              followers: follow ? user.followers + 1 : Math.max(user.followers - 1, 0),
              isFollowing: follow,
            }
          : user
      )
    );

    // keep LEFT profile in sync if it's the same user
    if (profileUser?.username === username) {
      setProfileUser(prev => ({
        ...prev,
        followers: follow ? prev.followers + 1 : Math.max(prev.followers - 1, 0),
        isFollowing: follow,
      }));
    }

    // add to DM list when followed
    if (follow) {
      const userToAdd = users.find(u => u.username === username);
      if (userToAdd && !dmUsers.some(u => u.username === username)) {
        setDmUsers(prev => [...prev, userToAdd]);
      }
    }
  };

  return (
    <div className="app">
      {/* Left Container */}
      <div className="left-container">
        {profileUser ? (
          <OpenedProfileBox
            user={profileUser}
            onFollowToggle={handleFollowToggle}
            setActiveUser={setProfileUser} // same prop name allowed, passing setter for LEFT only
          />
        ) : (
          <ProfileBox
            username="neo_coder"
            gender="Male"
            bio="Hacking the matrix one line at a time"
            joinDate="15/08/2025"
            isOnline={true}
          />
        )}

        {/* Terminal */}
        <TerminalBox
          setRightView={setRightView}
          // pass separate setters
          setProfileUser={setProfileUser} // for `open`
          setChatUser={setChatUser}       // for `chat` & `dm`
          users={users}
          onFollowToggle={handleFollowToggle}
          dmUsers={dmUsers}
        />
      </div>

      {/* Right Container */}
      <div className="right-container">
        {rightView === "chat" && <ChatBox />}

        {rightView === "users" && (
          <UsersListBox users={users.map(u => u.username)} />
        )}

        {rightView === "dm" && !chatUser && (
          <DMList
            dmUsers={dmUsers}
            openChatWithUser={user => {
              setChatUser(user);     // open chat on RIGHT
              setRightView("dm");
            }}
          />
        )}

        {chatUser && rightView === "dm" && (
          <ChatSection
            user={chatUser}
            goBack={() => setChatUser(null)} // back to DM list
          />
        )}
      </div>
    </div>
  );
}

export default App;
