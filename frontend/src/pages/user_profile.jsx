import React, { useState } from 'react';

export default function UserProfile() {
  const [bio, setBio] = useState('');
  const [username] = useState('ne0_user'); // Example username
  const [gender, setGender] = useState({
    male: false,
    female: false,
    nonBinary: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const selected = Object.keys(gender).filter((k) => gender[k]);
    alert(`Profile updated!\nBio: ${bio}\nGender: ${selected.join(', ') || 'Not specified'}`);
  };

  const handleGenderChange = (key) => {
    setGender((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center p-4">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Animated Scan Line */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-0 w-full h-0.5 bg-green-500 opacity-70"
          style={{
            top: '30%',
            boxShadow: '0 0 15px #0f0',
            animation: 'scan 3s infinite linear',
          }}
        />
      </div>

      {/* Blinking Welcome Heading */}
      <div className="absolute top-10">
        <h2
          className="text-green-500 text-3xl font-semibold animate-pulse"
          style={{
            fontFamily: 'monospace',
            textShadow: '0 0 10px rgba(0, 255, 0, 0.6)',
            letterSpacing: '1px',
          }}
        >
          Welcome to CLI-Chat!!
        </h2>
      </div>

      {/* Main Form Container */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-gray-950 border border-green-700 p-8 rounded-lg max-w-md w-full text-center backdrop-blur-sm"
        style={{
          boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)',
          fontFamily: 'monospace',
        }}
      >
        {/* Animated Border Glow */}
        <div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            border: '1px solid rgba(0, 255, 0, 0.3)',
            animation: 'glow 2s infinite alternate',
            boxShadow: '0 0 10px rgba(0, 255, 0, 0.4)',
            opacity: 0.8,
            zIndex: -1,
          }}
        />

        {/* Profile Photo */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-gray-800 rounded-full flex items-center justify-center border-2 border-green-600 relative overflow-hidden">
            <span className="text-green-400 text-2xl">🤖</span>
            <div className="absolute inset-0 rounded-full animate-ping bg-green-500 opacity-20"></div>
          </div>
          <button
            type="button"
            className="text-green-400 hover:text-green-300 text-sm mt-2 underline transition"
          >
            Upload Avatar
          </button>
        </div>

        {/* Username */}
        <div className="mb-6 text-green-400 text-sm">
          <h2>
            USER: <i className="font-bold">{username}</i>
          </h2>
        </div>

        {/* Bio Input */}
        <div className="mb-6 text-left">
          <label htmlFor="bio" className="block text-green-500 font-bold text-sm mb-1">
            BIO
          </label>
          <textarea
            id="bio"
            placeholder="Enter your bio..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 bg-black border border-green-700 text-green-400 placeholder-green-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 font-mono text-sm"
            rows="3"
          />
        </div>

        {/* Gender Checkboxes */}
        <div className="flex flex-col items-center mb-6 space-y-2">
          <label className="text-green-400 text-xs font-bold">GENDER</label>
          <div className="flex gap-4 text-xs">
            <label className="flex items-center space-x-1 text-green-300">
              <input
                type="checkbox"
                checked={gender.male}
                onChange={() => handleGenderChange('male')}
                className="accent-green-500"
              />
              <span>He/Him</span>
            </label>
            <label className="flex items-center space-x-1 text-green-300">
              <input
                type="checkbox"
                checked={gender.female}
                onChange={() => handleGenderChange('female')}
                className="accent-green-500"
              />
              <span>She/Her</span>
            </label>
            <label className="flex items-center space-x-1 text-green-300">
              <input
                type="checkbox"
                checked={gender.nonBinary}
                onChange={() => handleGenderChange('nonBinary')}
                className="accent-green-500"
              />
              <span>They/Them</span>
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            type="button"
            className="px-4 py-1 bg-gray-800 text-green-400 border border-green-700 rounded text-xs hover:bg-green-900 hover:text-white transition"
          >
            HOW TO USE
          </button>
          <button
            type="submit"
            className="px-4 py-1 bg-green-800 text-green-500 font-bold rounded text-xs hover:bg-green-600 transition"
          >
            APPLY CHANGES
          </button>
        </div>
      </form>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        @keyframes glow {
          0% {
            opacity: 0.6;
            box-shadow: 0 0 10px rgba(0, 255, 0, 0.4);
          }
          100% {
            opacity: 0.9;
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.7);
          }
        }
        .animate-pulse {
          animation: pulse 1.5s ease-in-out infinite alternate;
        }
        @keyframes pulse {
          from {
            opacity: 0.6;
            text-shadow: 0 0 5px rgba(0, 255, 0, 0.4);
          }
          to {
            opacity: 1;
            text-shadow: 0 0 20px rgba(0, 255, 0, 0.8), 0 0 30px rgba(0, 255, 0, 0.5);
          }
        }
      `}</style>
    </div>
  );
}