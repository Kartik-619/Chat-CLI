// services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4500',     // Your backend URL
  withCredentials: true                 //This allows sending cookies
});

export default API;