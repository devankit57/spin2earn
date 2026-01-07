"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import confetti from "canvas-confetti"; 

export default function Spinner() {
  const rewards = [
    { name: "10 Rupees", color: "bg-yellow-500", icon: "💰" },
    { name: "Coupon", color: "bg-blue-500", icon: "🏱" },
    { name: "Crypto", color: "bg-purple-500", icon: "🪙" },
    { name: "Try Again", color: "bg-gray-500", icon: "❌" },
    { name: "Tokens", color: "bg-yellow-500", icon: "💰" },
    { name: "Coupon", color: "bg-blue-500", icon: "🏱" },
    { name: "Crypto", color: "bg-purple-500", icon: "🪙" },
    { name: "Jackpot", color: "bg-red-500", icon: "💎" },
  ];

  const angle = 360 / rewards.length;
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [key, setKey] = useState(0);

  // sound references
  const spinSound = useRef<HTMLAudioElement | null>(null);
  const winSound = useRef<HTMLAudioElement | null>(null);

  const getPosition = (index: number) => {
    const angleDeg = index * angle - 90 + angle / 2;
    const angleRad = (angleDeg * Math.PI) / 180;
    const radius = 32;
    const center = 50;
    const x = center + radius * Math.cos(angleRad);
    const y = center + radius * Math.sin(angleRad);
    return { x, y, angleDeg };
  };

  const getFinalRotation = (targetIndex: number, spins = 5) => {
    const segmentAngle = 360 / rewards.length;
    return spins * 360 + (360 - targetIndex * segmentAngle - segmentAngle / 2);
  };

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);

    // 🔊 play spin sound
    spinSound.current?.play();

    // simulate backend fetch
    setTimeout(() => {
      const targetIndex = 6;
      const finalRotation = getFinalRotation(targetIndex);
      setRotation(finalRotation);
      setKey((prev) => prev + 1);

      setTimeout(() => {
        setSpinning(false);
        if (rewards[targetIndex].name !== "Try Again") {
          confetti({ particleCount: 100, spread: 70 });
          // 🔊 play win sound
          winSound.current?.play();
        }
      }, 3000);
    }, 500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      {/* sound elements */}
      <audio ref={spinSound} src="/spin.mp3" preload="auto" />
      <audio ref={winSound} src="/win.mp3" preload="auto" />

      <div className="relative w-96 h-96">
        <motion.div
          key={key}
          animate={{ rotate: rotation }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute w-full h-full rounded-full overflow-hidden border-4 border-white select-none"
        >
          {rewards.map((reward, i) => (
            <div
              key={i}
              className={`absolute w-1/2 h-1/2 origin-[100%_100%] ${reward.color} border-2 border-white`}
              style={{
                transform: `rotate(${i * angle}deg) skewY(${90 - angle}deg)`,
              }}
            />
          ))}

          {/* Labels */}
          {rewards.map((reward, i) => {
            const { x, y, angleDeg } = getPosition(i);
            const adjustedAngle =
              angleDeg > 90 && angleDeg < 270 ? angleDeg + 180 : angleDeg;
            return (
              <div
                key={`label-${i}`}
                className="absolute w-24 text-sm text-center"
                style={{
                  top: `${y}%`,
                  left: `${x}%`,
                  transform: `translate(-50%, -50%) rotate(${adjustedAngle}deg)`,
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                {reward.icon} {reward.name}
              </div>
            );
          })}
        </motion.div>

        {/* Spin Button */}
        <button
          onClick={handleSpin}
          disabled={spinning}
          className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
            bg-white text-black p-2 h-15 w-15 rounded-full font-bold text-lg z-10"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
            <div
              className="w-0 h-0 
              border-l-[12px] border-r-[12px] border-b-[18px] 
              border-l-transparent border-r-transparent 
              border-b-white 
              rounded-sm 
              transition-colors"
            />
          </div>
          Spin
        </button>
      </div>
    </div>
  );
}
