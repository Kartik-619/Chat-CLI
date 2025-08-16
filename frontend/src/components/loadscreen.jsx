import React, { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [matrixLines, setMatrixLines] = useState([]);
  const [showAccess, setShowAccess] = useState(false);

  useEffect(() => {
    const generateLines = () =>
      Array.from({ length: 30 }, () =>
        Array.from({ length: 60 }, () =>
          Math.random() > 0.5 ? "1" : "0"
        ).join("")
      );

    setMatrixLines(generateLines());

    // Update lines every 120ms (rain effect)
    const interval = setInterval(() => {
      setMatrixLines(generateLines());
    }, 120);

    // Show "ACCESS GRANTED" after 4.5s
    const timer = setTimeout(() => {
      setShowAccess(true);
    }, 4500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="absolute h-screen w-screen bg-black text-green-500 overflow-hidden m-0 p-0">
      {/* Overlay text (always on top) */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-50 space-y-2">
        <p className="text-green-400 font-mono text-lg animate-pulse">
          DECRYPTING USER PROFILE...
        </p>
        {showAccess && (
          <p className="text-green-600 font-mono text-sm opacity-90 animate-fade-in">
            ACCESS GRANTED • INITIALIZING TERMINAL
          </p>
        )}
      </div>

      {/* Matrix Rain */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-40">
        {matrixLines.map((line, index) => (
          <p
            key={index}
            className="font-mono text-sm opacity-70 leading-none tracking-widest"
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
