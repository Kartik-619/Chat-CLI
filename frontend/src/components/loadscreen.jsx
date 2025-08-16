import React, { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [matrixLines, setMatrixLines] = useState([]);
  const [showAccess, setShowAccess] = useState(false);

  // Generate random binary lines
  useEffect(() => {
    const lines = Array.from({ length: 20 }, () =>
      Array.from({ length: 40 }, () => (Math.random() > 0.5 ? "1" : "0")).join("")
    );
    setMatrixLines(lines);

    // Show "ACCESS GRANTED" after 4.5 seconds
    const timer = setTimeout(() => {
      setShowAccess(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden">
      
      {/* Top Center: ACCESS GRANTED */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-50 text-center pointer-events-none">
        <p className="text-green-400 font-mono text-lg animate-pulse">
          DECRYPTING USER PROFILE...
        </p>

        {showAccess && (
          <p className="text-green-500 font-mono text-4xl font-bold tracking-wider drop-shadow-lg animate-fade-in">
            ACCESS GRANTED
          </p>
        )}
      </div>

      {/* Matrix Rain - Background */}
      <div className="absolute inset-0 flex flex-col justify-center items-center p-6 gap-4 z-10">
        {matrixLines.map((line, i) => (
          <div
            key={i}
            className="text-green-600 font-mono text-sm sm:text-base opacity-70 drop-shadow-md"
          >
            {line}
          </div>
        ))}
      </div>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 1.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;