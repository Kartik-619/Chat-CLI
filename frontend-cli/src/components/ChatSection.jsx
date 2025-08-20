import React, { useState, useEffect, useRef } from "react";
import "./ChatSection.css";

export default function ChatSection({ user, goBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  // Auto-focus input whenever a new user chat opens
  useEffect(() => {
    inputRef.current?.focus();
  }, [user]); // <-- depend on user

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "You", text: input }]);
    setInput("");

    // Optional simulated reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: user.username, text: `Reply: ${input}` },
      ]);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chat-section-container">
      <div className="chat-header">
        <button className="back-btn" onClick={goBack}>← Back</button>
        <h3>Chat with {user.username}</h3>
      </div>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.sender === "You" ? "sent" : "received"}`}
          >
            <strong>{msg.sender}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          ref={inputRef}               // <-- input focus
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
