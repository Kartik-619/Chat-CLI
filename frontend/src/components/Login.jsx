import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MatrixBackground from "./loadscreen";

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
      const response = await axios.post("http://localhost:4500/api/login", {
        username,
        password,
      });

      console.log("Login response", response.data);
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
        navigate("/home");
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showMat, navigate]);

  return (
    <div className="bg-gradient-to-t from-black to-[#0e0425] min-h-screen flex items-center justify-center p-4 relative">
      {/* ✅ Show MatrixBackground overlay if true */}
      {showMat && <MatrixBackground />}

      {!showMat && (
        <form
          onSubmit={handleSubmit}
          className="bg-blue-950 border-4 border-indigo-600 p-8 rounded-lg 
                     shadow-[0_0_30px_green] w-full max-w-xs space-y-4"
        >
          <h2 className="text-xl font-semibold text-center text-green-500">
            Login
          </h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-slate-800 px-4 py-2 border border-gray-300 rounded 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-800 px-4 py-2 border border-gray-300 rounded 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black hover:bg-gray-50 hover:text-black text-white 
                       font-medium py-2 px-4 rounded transition duration-200
                       disabled:opacity-70 disabled:cursor-not-allowed"
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
