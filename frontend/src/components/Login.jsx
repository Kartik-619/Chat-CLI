import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (e) => {
    setUser(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic later
  };

  return (
    <div className="bg-linear-to-t from-black to-[#0e0425] min-h-screen flex items-center justify-center">
      <form 
        onSubmit={handleSubmit} 
        className="bg-blue-950 border-indigo-600 p-8 rounded-lg  shadow-[0_0_20px_blue] w-full max-w-xs space-y-4 border-4"
      >
        <h2 className="text-xl font-semibold text-center text-white">Login</h2>
        
        <input 
          type="text"
          placeholder="Username" 
          value={username}
          onChange={handleUsername}
          className="w-full bg-white px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <button 
          type="submit"
          className="w-full bg-black hover:bg-grey-50 text-white font-medium py-2 px-4 rounded transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}