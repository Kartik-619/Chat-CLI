import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MatrixBackground from "./loadscreen";
import API from "../services/api";


export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMat, setShowMat] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post("/api/login", {
        username,
        password,
      });

      console.log("Login response", response.data);
      
      // Store user info in localStorage (token is in cookies automatically)
      localStorage.setItem('user', JSON.stringify(response.data.user));
      


      // Call onLogin to update authentication state
      
      alert("Login successful!");
      setShowMat(true); // trigger Matrix screen

    } catch (err) {
      if (err.response) {
        alert(err.response.data.message || "Invalid credentials");
      } else {
        alert("Network error or server is unreachable");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // handle redirect after Matrix shows
  useEffect(() => {
    if (showMat) {
      const timer = setTimeout(() => {
        navigate("/userprofile");
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [showMat, navigate]);

  return (
    <div className="bg-gradient-to-t from-black to-[#0e0425] min-h-screen flex items-center justify-center p-4 relative">
      {/* Show MatrixBackground overlay if true */}
      {showMat && <MatrixBackground />}

      {!showMat && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/80 border-2 border-green-600 p-8 rounded-lg 
                     shadow-[0_0_25px_rgba(0,255,0,0.7)] w-full max-w-xs space-y-4"
        >
          <h2 className="text-xl font-semibold text-center text-green-400">
            Login
          </h2>
        
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-black/70 px-4 py-2 border border-green-700 rounded 
                       text-green-200 placeholder-green-500 
                       focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/70 px-4 py-2 border border-green-700 rounded 
                       text-green-200 placeholder-green-500 
                       focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-500 hover:text-black 
                       text-white font-medium py-2 px-4 rounded transition duration-200
                       disabled:opacity-70 disabled:cursor-not-allowed 
                       shadow-[0_0_10px_white]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        
          <p className="text-center text-sm text-gray-300">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}