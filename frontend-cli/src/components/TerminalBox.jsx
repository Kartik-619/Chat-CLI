import React, { useState, useRef, useEffect } from "react";
import "./BoxStyles.css";
import { followUser, unfollowUser } from "../services/api";

export default function TerminalBox({
  setRightView,
  setProfileUser,
  setChatUser,
  users,
  dmUsers,
  onFollowToggle,
  currentUser,
  activeCommand,
  setActiveCommand
}) {
  const [lines, setLines] = useState([
    "Welcome to ChatCLI!",
    'Type "help" to see available commands.'
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  const printCmd = (cmd, outputs = []) => {
    setLines((prev) => [...prev, `$ ${cmd}`, ...outputs]);
    
    // Add command to history if it's not empty
    if (cmd.trim()) {
      setCommandHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1); // Reset history index
    }
  };

  // Logout function that redirects to login page
  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    
    // Redirect to login page
    window.location.href = '/login';
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        let newIndex;
        if (historyIndex === -1) {
          // Starting from the most recent command
          newIndex = commandHistory.length - 1;
        } else if (historyIndex > 0) {
          // Moving to older commands
          newIndex = historyIndex - 1;
        } else {
          // Already at the oldest command
          newIndex = 0;
        }
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        if (historyIndex < commandHistory.length - 1) {
          // Moving to newer commands
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        } else {
          // Reached the most recent command, clear input
          setHistoryIndex(-1);
          setInput("");
        }
      }
    }
  };

  const commands = {
    help: () => [
      { type: "header", content: "ChatCLI commands:" },
      { type: "command", command: "help", description: "Show this help" },
      { type: "command", command: "clear", description: "Clear terminal" },
      { type: "command", command: "users", description: "Open Users List (on right)" },
      { type: "command", command: "home", description: "Open Home view (on right)" },
      { type: "command", command: "open <user>", description: "Open a user's profile (left)" },
      { type: "command", command: "follow <user>", description: "Follow a user" },
      { type: "command", command: "unfollow <user>", description: "Unfollow a user" },
      { type: "command", command: "dm", description: "Show DM list (right)" },
      { type: "command", command: "chat <user>", description: "Open chat with a user in DM list (right)" },
      { type: "command", command: "logout", description: "Log out and return to login page" }
    ],

    clear: () => { setLines([]); return []; },

    users: () => { 
      setRightView("users"); 
      return [{ type: "success", content: "Switched to Users List view (right side)." }]; 
    },

    home: () => { 
      setRightView("chat"); 
      setProfileUser(null); 
      return [{ type: "success", content: "Switched to home view (right side)." }]; 
    },

    open: (args) => {
      if (!args.length) return [{ type: "error", content: "Usage: open <username>" }];
      const usernameInput = args[0].toLowerCase();
      const target = users.find(u => 
        u.username?.toLowerCase() === usernameInput || 
        u.userName?.toLowerCase() === usernameInput
      );
      if (target) {
        setProfileUser(target);
        return [
          { type: "profile-header", content: `Opened profile of @${target.username || target.userName}` },
          { type: "profile-info", label: "Bio:", value: target.bio || target.description || target.about || "No bio available" },
          { type: "profile-info", label: "Gender:", value: target.gender || target.sex || "Not specified" },
          { type: "profile-info", label: "Joined:", value: target.createdAt || target.joinDate || target.registrationDate || "Unknown" }
        ];
      }
      return [{ type: "error", content: `User not found: ${args[0]}` }];
    },

    follow: async (args) => {
      if (!args.length) return [{ type: "error", content: "Usage: follow <username>" }];
      const usernameInput = args[0].toLowerCase();
      const targetUser = users.find(u => 
        u.username?.toLowerCase() === usernameInput || 
        u.userName?.toLowerCase() === usernameInput
      );
      if (!targetUser) return [{ type: "error", content: `User not found: ${args[0]}` }];

      try {
        const res = await followUser(targetUser.username || targetUser.userName, currentUser._id || currentUser.id);
        if (res.data.success) {
          onFollowToggle(targetUser.username || targetUser.userName, true);
          setActiveCommand(`follow ${targetUser.username || targetUser.userName}`);
          return [{ type: "success", content: `You are now following @${targetUser.username || targetUser.userName}` }];
        }
        return [{ type: "error", content: `Error: ${res.data.message}` }];
      } catch (err) {
        console.error("Follow API error:", err);
        return [{ type: "error", content: "Error following user" }];
      }
    },

    unfollow: async (args) => {
      if (!args.length) return [{ type: "error", content: "Usage: unfollow <username>" }];
      const usernameInput = args[0].toLowerCase();
      const targetUser = users.find(u => 
        u.username?.toLowerCase() === usernameInput || 
        u.userName?.toLowerCase() === usernameInput
      );
      if (!targetUser) return [{ type: "error", content: `User not found: ${args[0]}` }];

      try {
        const res = await unfollowUser(targetUser.username || targetUser.userName, currentUser._id || currentUser.id);
        if (res.data.success) {
          onFollowToggle(targetUser.username || targetUser.userName, false);
          setActiveCommand(`unfollow ${targetUser.username || targetUser.userName}`);
          return [{ type: "success", content: `You have unfollowed @${targetUser.username || targetUser.userName}` }];
        }
        return [{ type: "error", content: `Error: ${res.data.message}` }];
      } catch (err) {
        console.error("Unfollow API error:", err);
        return [{ type: "error", content: "Error unfollowing user" }];
      }
    },

    dm: () => { 
      setChatUser(null); 
      setRightView("dm"); 
      return [{ type: "success", content: "Opened DM List on the right panel." }]; 
    },

    chat: (args) => {
      if (!args.length) return [{ type: "error", content: "Usage: chat <username>" }];
      const usernameInput = args[0].toLowerCase();
      const user = dmUsers.find(u => 
        u.username?.toLowerCase() === usernameInput || 
        u.userName?.toLowerCase() === usernameInput
      );
      if (!user) return [{ type: "error", content: `Error: ${args[0]} is not in your DM list.` }];

      setChatUser(user);
      setRightView("dm");
      setProfileUser(user);
      return [{ type: "success", content: `Opening chat with ${user.username || user.userName}... (input is focused)` }];
    },

    logout: () => {
      setTimeout(() => {
        handleLogout();
      }, 1000);
      return [
        { type: "info", content: "Logging out..." },
        { type: "info", content: "Goodbye!" }
      ];
    }
  };

  const handleCommand = (rawCmd) => {
    const tokens = rawCmd.trim().split(/\s+/);
    if (!tokens.length) return;

    const command = tokens[0].toLowerCase();
    const args = tokens.slice(1);

    if (commands[command]) {
      const out = commands[command](args);
      if (out instanceof Promise) {
        out.then(res => printCmd(rawCmd, res));
      } else {
        printCmd(rawCmd, Array.isArray(out) ? out : [String(out)]);
      }
    } else {
      printCmd(rawCmd, [`Unknown command: ${command}`, 'Type "help" for list.']);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput("");
    setHistoryIndex(-1); // Reset history index after submitting
  };

  useEffect(() => { 
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" }); 
  }, [lines]);

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="section terminal-box">
      <div className="terminal-header">
        <div className="terminal-lights">
          <div className="light red"></div>
          <div className="light yellow"></div>
          <div className="light green"></div>
        </div>
        <div className="terminal-title">CHAT-CLI TERMINAL</div>
      </div>

      <div className="terminal-output">
        <div className="output-content">
          {lines.map((line, i) => {
            // Check if this is a structured object
            if (typeof line === 'object' && line.type) {
              switch (line.type) {
                case "header":
                  return (
                    <div className="line help-header" key={i}>
                      {line.content}
                    </div>
                  );
                case "command":
                  return (
                    <div className="help-line" key={i}>
                      <span className="help-command">{line.command}</span>
                      <span className="help-description">{line.description}</span>
                    </div>
                  );
                case "profile-header":
                  return (
                    <div className="line profile-header-line" key={i}>
                      {line.content}
                    </div>
                  );
                case "profile-info":
                  return (
                    <div className="profile-info-line" key={i}>
                      <span className="profile-info-label">{line.label}</span>
                      <span className="profile-info-value">{line.value}</span>
                    </div>
                  );
                case "success":
                  return (
                    <div className="line success-message" key={i}>
                      <span className="line-prefix">{i > 1 ? ">" : ""}</span>
                      {line.content}
                    </div>
                  );
                case "error":
                  return (
                    <div className="line error-line" key={i}>
                      <span className="line-prefix">{i > 1 ? ">" : ""}</span>
                      {line.content}
                    </div>
                  );
                case "info":
                  return (
                    <div className="line info-line" key={i}>
                      <span className="line-prefix">{i > 1 ? ">" : ""}</span>
                      {line.content}
                    </div>
                  );
                default:
                  return (
                    <div className="line output-line" key={i}>
                      <span className="line-prefix">{i > 1 ? ">" : ""}</span>
                      {line.content}
                    </div>
                  );
              }
            }
            
            // Regular text line
            let lineClass = "line";
            if (line.startsWith("$ ")) {
              lineClass += " cmd-line"; // Command input
            } else if (line.toLowerCase().includes("error") || line.toLowerCase().includes("not found") || line.toLowerCase().includes("usage")) {
              lineClass += " error-line"; // Error messages
            } else if (line.toLowerCase().includes("following") || line.toLowerCase().includes("unfollowed") || line.toLowerCase().includes("success")) {
              lineClass += " success-line"; // Success messages
            } else if (line.toLowerCase().includes("welcome") || line.toLowerCase().includes("type") || line.toLowerCase().includes("switched")) {
              lineClass += " info-line"; // Informational text
            } else {
              lineClass += " output-line"; // Regular output
            }
            
            return (
              <div className={lineClass} key={i}>
                <span className="line-prefix">{i > 1 ? ">" : ""}</span>
                {line}
              </div>
            );
          })}
          <div ref={terminalEndRef} />
        </div>
      </div>

      <form className="terminal-input" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <span className="prompt">system&gt;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            aria-label="terminal-input"
            className="terminal-cursor"
          />
        </div>
      </form>
    </div>
  );
}