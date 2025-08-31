import React, { useState, useRef, useEffect } from "react";
import "./BoxStyles.css";

export default function TerminalBox({
  setRightView,
  setProfileUser, // NEW
  setChatUser,    // NEW
  users,
  onFollowToggle,
  dmUsers
}) {
  const [lines, setLines] = useState([
    "Welcome to ChatCLI!",
    'Type "help" to see available commands.'
  ]);
  const [input, setInput] = useState("");
  const terminalEndRef = useRef(null);

  const me = { username: "me", fullName: "You", bio: "Building ChatCLI", gender: "X" };

  const printCmd = (cmd, outputs = []) => {
    setLines(prev => [...prev, `$ ${cmd}`, ...outputs]);
  };

  const commands = {
    help: () => [
      "ChatCLI commands:",
      "  help              Show this help",
      "  clear             Clear terminal",
      "  whoami            Show your profile",
      "  users             Open Users List (on right)",
      "  home              Open Home view (on right)",
      "  open <user>       Open a user's profile (left)",
      "  follow <user>     Follow a user",
      "  unfollow <user>   Unfollow a user",
      "  dm                Show DM list (right)",
      "  chat <user>       Open chat with a user in DM list (right)"
    ],

    clear: () => [],

    whoami: () => [
      `@${me.username}`,
      `Name: ${me.fullName}`,
      `Bio: ${me.bio}`,
      `Gender: ${me.gender}`
    ],

    users: () => {
      setRightView("users");
      return ["Switched to Users List view (right side)."];
    },

    home: () => {
      setRightView("chat");
      return ["Switched to home view (right side)."];
    },

    // LEFT: profile open only
    open: (args) => {
      if (!args.length) return ["Usage: open <username>"];
      const target = users.find(u => u.username === args[0]);
      if (target) {
        setProfileUser(target); // <-- only affects LEFT side
        return [`Opened profile of @${args[0]}`];
      } else {
        return [`User not found: ${args[0]}`];
      }
    },

    follow: (args) => {
      if (!args.length) return ["Usage: follow <username>"];
      const target = users.find(u => u.username === args[0]);
      if (!target) return [`User not found: ${args[0]}`];
      onFollowToggle(args[0], true);
      return [`You are now following @${args[0]}`];
    },

    unfollow: (args) => {
      if (!args.length) return ["Usage: unfollow <username>"];
      const target = users.find(u => u.username === args[0]);
      if (!target) return [`User not found: ${args[0]}`];
      onFollowToggle(args[0], false);
      return [`You unfollowed @${args[0]}`];
    },

    // RIGHT: DM list explicitly (clear chat user so list shows)
    dm: () => {
      setChatUser(null);     // <-- show list, not chat
      setRightView("dm");
      return ["Opened DM List on the right panel."];
    },

    // RIGHT: open chat only if in DM list
    chat: (args) => {
      if (!args.length) return ["Usage: chat <username>"];
      const username = args[0];
      const user = dmUsers.find(u => u.username === username);
      if (!user) return [`Error: ${username} is not in your DM list.`];

      setChatUser(user);     // <-- open chat on RIGHT
      setRightView("dm");
      return [`Opening chat with ${username}... (input is focused)`];
    }
  };

  // --- Command runner ---
  const handleCommand = (rawCmd) => {
    const tokens = rawCmd.trim().split(/\s+/);
    if (!tokens.length) return;

    const command = tokens[0].toLowerCase();
    const args = tokens.slice(1);

    if (commands[command]) {
      if (command === "clear") {
        setLines([]);
      } else {
        const out = commands[command](args);
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
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

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
          {lines.map((line, i) => (
            <div className="line" key={i}>
              <span className="line-prefix">{i > 1 ? ">" : ""}</span>
              {line}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>
      </div>

      <form className="terminal-input" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <span className="prompt">system&gt;</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            aria-label="terminal-input"
            className="terminal-cursor"
          />
        </div>
      </form>
    </div>
  );
}
