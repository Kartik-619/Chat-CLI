import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  withCredentials: true,
  transports: ["websocket", "polling"], // helps with xhr poll error
});

socket.on("connect_error", (err) => {
  console.error("Socket connection failed:", err.message);
});

export { socket };
