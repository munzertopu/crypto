import React, { useEffect, useState } from "react";
import LottieAnimation from "../components/LottieAnimation";

interface WelcomePageProps {
  onGetStarted?: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onGetStarted }) => {
  const [confetti, setConfetti] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      color: string;
      type: string; // 'confetti' or 'sparkle'
      animationDelay: number;
    }>
  >([]);

  // Generate confetti and sparkles
  useEffect(() => {
    const colors = [
      "#90EE90",
      "#FFA500",
      "#FFFF00",
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
    ]; // More colors
    const newConfetti = [];

    // Generate confetti pieces (increased from 50 to 120)
    for (let i = 0; i < 120; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: "confetti",
        animationDelay: Math.random() * 4,
      });
    }

    // Generate sparkles (increased from 20 to 60)
    for (let i = 120; i < 180; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: "#D3D3D3", // Light grey
        type: "sparkle",
        animationDelay: Math.random() * 4,
      });
    }

    setConfetti(newConfetti);
  }, []);

  const handleGetStarted = () => {
    console.log("Get Started clicked - navigating to dashboard");
    if (onGetStarted) {
      onGetStarted();
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Confetti and Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className={`absolute animate-bounce`}
            style={{
              left: `${piece.x}%`,
              top: `${piece.y}%`,
              animationDelay: `${piece.animationDelay}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            {piece.type === "confetti" ? (
              <div
                className="w-2 h-2 rounded-sm"
                style={{ backgroundColor: piece.color }}
              />
            ) : (
              <div className="w-3 h-3">
                <svg viewBox="0 0 24 24" fill={piece.color}>
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-md">
          {/* Success Icon */}
          <div className="mb-4">
            <div className="w-30 h-30 bg-transparent flex items-center justify-center mx-auto mb-8">
              <img
                src="/logo-only.png"
                alt="Portal Logo"
                className="w-30 h-30"
              />
            </div>
          </div>

          {/* Success Message */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              You're Ready to Go!
            </h1>
            <p className="text-lg text-gray-600">Enter the Portal now</p>
          </div>

          {/* Get Started Button */}
          <div className="mb-8">
            <button
              onClick={handleGetStarted}
              className="bg-green-500 hover:bg-green-600 font-semibold py-2 px-4 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{ backgroundColor: "#90C853" }}
              aria-label="Enter portal dashboard"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
