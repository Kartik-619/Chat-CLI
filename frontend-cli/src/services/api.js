import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

// Fetch all users
export const fetchUsers = (currentUserId) =>
  API.get(`/api/users?currentUserId=${currentUserId}`);

// Follow / Unfollow API
export const followUser = (username, currentUserId) =>
  API.post(`/api/follow`, { targetUsername: username, currentUserId });

export const unfollowUser = (username, currentUserId) =>
  API.post(`/api/unfollow`, { targetUsername: username, currentUserId });

export default API;
