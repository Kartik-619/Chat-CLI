import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ChatUI from "./pages/home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserProfile from "./pages/user_profile";




//  Main App with Routing
function App() {
  return (
    <BrowserRouter>
      <div className="h-screen w-screen bg-stone-500">
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/chat" element={<ChatUI />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
