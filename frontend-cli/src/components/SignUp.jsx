import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from '../services/api';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confPass, setConfPass] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    //  Validate password match
    if (password !== confPass) {
      alert('Passwords do not match!');
      setLoading(false);
      return;
    }

    try {
      // Axios returns `data` directly — no .json() needed
      const res = await API.post('/api/register', {
        username,
        password,
        email,
        details:{},
      });

      //  Assume success if no error thrown
      alert('Registration successful!');
      navigate('/login'); 
    } catch (err) {
      //  Handle server errors
      if (err.response) {
        alert(err.response.data.message || 'Registration failed');
      } else {
        alert('Network error or server is down');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-t from-black to-[#0e0425] min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-950 border-4 border-indigo-600 p-8 rounded-lg 
                   shadow-[0_0_30px_green] w-full max-w-xs space-y-4"
      >
        <h2 className="text-xl font-semibold text-center text-green-600">Register</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-slate-800 px-4 py-2 border border-gray-300 rounded 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confPass}
          onChange={(e) => setConfPass(e.target.value)}
          className="w-full bg-slate-800 px-4 py-2 border border-gray-300 rounded 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black  text-white 
                     font-medium py-2 px-4 rounded transition duration-200
                     disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <p>Already got an account? <Link to='/login'>Login</Link></p>
      </form>
    </div>
  );
}