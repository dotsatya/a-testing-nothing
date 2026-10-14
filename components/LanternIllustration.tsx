"use client";

import React, { useState } from "react";

interface LanternProps {
  intensity?: "subtle" | "warm" | "radiant" | "intense";
  isInteractive?: boolean;
  onClick?: () => void;
  className?: string;
  size?: number;
}

export function LanternIllustration({
  intensity = "warm",
  isInteractive = false,
  onClick,
  className = "",
  size = 180,
}: LanternProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (isInteractive) {
      setClicked(true);
      setTimeout(() => setClicked(false), 2000);
      if (onClick) onClick();
    }
  };

  // Glow configurations
  const glowConfig = {
    subtle: {
      inner: "rgba(255, 213, 138, 0.4)",
      outer: "rgba(255, 179, 71, 0.15)",
      spread: "blur(20px)",
      scale: 1.2,
      opacity: 0.5,
    },
    warm: {
      inner: "rgba(255, 213, 138, 0.65)",
      outer: "rgba(255, 140, 66, 0.25)",
      spread: "blur(35px)",
      scale: 1.6,
      opacity: 0.85,
    },
    radiant: {
      inner: "rgba(255, 225, 160, 0.85)",
      outer: "rgba(255, 140, 66, 0.45)",
      spread: "blur(50px)",
      scale: 2.2,
      opacity: 0.95,
    },
    intense: {
      inner: "rgba(255, 240, 190, 0.95)",
      outer: "rgba(255, 120, 40, 0.55)",
      spread: "blur(70px)",
      scale: 2.8,
      opacity: 1,
    },
  }[intensity];

  return (
    <div
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center transition-all duration-700 ${
        isInteractive ? "cursor-pointer group hover:scale-105 active:scale-95" : ""
      } ${className}`}
      style={{ width: size, height: size * 1.35 }}
    >
      {/* Outer ambient golden aura spilling into the surrounding room */}
      <div
        className="absolute inset-[-40%] rounded-full pointer-events-none transition-all duration-1000 animate-pulse"
        style={{
          background: `radial-gradient(circle, ${glowConfig.inner} 0%, ${glowConfig.outer} 45%, rgba(11, 16, 38, 0) 70%)`,
          filter: glowConfig.spread,
          opacity: glowConfig.opacity,
          transform: `scale(${glowConfig.scale})`,
        }}
      />

      {/* Interactive spark bursts on click */}
      {clicked && (
        <div className="absolute inset-0 pointer-events-none z-30">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full bg-[#FFF7E8] shadow-[0_0_8px_#FFD58A] animate-ping"
              style={{
                transform: `translate(-50%, -50%) translate(${(i % 2 === 0 ? 1 : -1) * (15 + i * 8)}px, ${-25 - i * 12}px)`,
                animationDuration: `${0.8 + i * 0.15}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* SVG Lantern */}
      <svg
        viewBox="0 0 140 190"
        className="w-full h-full relative z-10 transition-transform duration-500 filter drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
      >
        <defs>
          {/* Brass / Antique Metal Gradient */}
          <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A3B32" />
            <stop offset="35%" stopColor="#8C6D46" />
            <stop offset="70%" stopColor="#B38F5B" />
            <stop offset="90%" stopColor="#5E472A" />
            <stop offset="100%" stopColor="#302416" />
          </linearGradient>

          {/* Warm Flame Glow Gradient */}
          <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FFF1B0" />
            <stop offset="55%" stopColor="#FFB347" />
            <stop offset="85%" stopColor="#FF7700" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Glass Tint Gradient */}
          <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="25%" stopColor="#FFD58A" stopOpacity="0.1" />
            <stop offset="65%" stopColor="#171B3A" stopOpacity="0.1" />
            <stop offset="90%" stopColor="#FFFFFF" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FFD58A" stopOpacity="0.25" />
          </linearGradient>

          {/* Metal Pillar Shading */}
          <linearGradient id="pillarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2E2114" />
            <stop offset="45%" stopColor="#967749" />
            <stop offset="100%" stopColor="#1F160E" />
          </linearGradient>
        </defs>

        {/* Top Carrying Ring */}
        <path
          d="M 70 8 C 58 8 50 18 50 28 C 50 36 56 42 63 44 L 77 44 C 84 42 90 36 90 28 C 90 18 82 8 70 8 Z"
          fill="none"
          stroke="url(#brassGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Top Finial Mount */}
        <circle cx="70" cy="45" r="4.5" fill="url(#brassGrad)" />
        <rect x="63" y="47" width="14" height="4" rx="1.5" fill="url(#brassGrad)" />

        {/* Pagoda-style Cap Roof */}
        <path
          d="M 70 51 L 98 67 C 96 69 92 70 88 70 L 52 70 C 48 70 44 69 42 67 Z"
          fill="url(#brassGrad)"
        />
        {/* Decorative Pierced Vents in Cap */}
        <circle cx="62" cy="63" r="1.5" fill="#171B3A" />
        <circle cx="70" cy="62" r="1.8" fill="#FFD58A" />
        <circle cx="78" cy="63" r="1.5" fill="#171B3A" />

        {/* Upper Frame Collar */}
        <rect x="44" y="70" width="52" height="6" rx="2" fill="url(#brassGrad)" />

        {/* Glass Chamber Background Glow */}
        <rect
          x="46"
          y="76"
          width="48"
          height="68"
          rx="3"
          fill="rgba(15, 20, 48, 0.6)"
        />

        {/* Flame Glow Radiance inside glass */}
        <ellipse
          cx="70"
          cy="110"
          rx="22"
          ry="28"
          fill="url(#flameGlow)"
          className="animate-lantern-flicker"
          opacity="0.8"
        />

        {/* Candle Body */}
        <rect x="64" y="118" width="12" height="24" rx="2" fill="#FAF0D7" />
        {/* Melted wax details */}
        <ellipse cx="70" cy="118" rx="6" ry="2" fill="#FFF7E8" />
        <path d="M 64 120 C 64 125, 66 128, 66 130" stroke="#FFF7E8" strokeWidth="1.5" fill="none" />

        {/* Candle Wick */}
        <path d="M 70 118 Q 69 113 70 110" stroke="#3A2C1D" strokeWidth="1.2" fill="none" />

        {/* Flickering Flame Heart */}
        <g className="animate-lantern-flicker origin-bottom" style={{ transformOrigin: "70px 110px" }}>
          {/* Outer orange flame */}
          <path
            d="M 70 94 C 64 102 65 110 70 112 C 75 110 76 102 70 94 Z"
            fill="#FF8C42"
          />
          {/* Middle yellow flame */}
          <path
            d="M 70 97 C 66 103 66 110 70 111.5 C 74 110 74 103 70 97 Z"
            fill="#FFD58A"
          />
          {/* Inner white-hot core */}
          <ellipse cx="70" cy="107" rx="2.5" ry="4" fill="#FFFFFF" />
        </g>

        {/* Glass Chamber Panels & Reflections */}
        <rect
          x="46"
          y="76"
          width="48"
          height="68"
          rx="2"
          fill="url(#glassReflection)"
        />

        {/* Vertical Guard Pillars */}
        <rect x="46" y="76" width="3" height="68" fill="url(#pillarGrad)" />
        <rect x="61" y="76" width="2" height="68" fill="url(#pillarGrad)" opacity="0.6" />
        <rect x="77" y="76" width="2" height="68" fill="url(#pillarGrad)" opacity="0.6" />
        <rect x="91" y="76" width="3" height="68" fill="url(#pillarGrad)" />

        {/* Lower Frame Collar */}
        <rect x="44" y="144" width="52" height="6" rx="1.5" fill="url(#brassGrad)" />

        {/* Base Pedestal */}
        <path
          d="M 44 150 L 40 162 C 40 164 43 165 47 165 L 93 165 C 97 165 100 164 100 162 L 96 150 Z"
          fill="url(#brassGrad)"
        />

        {/* Delicate Base Feet */}
        <rect x="43" y="165" width="8" height="3" rx="1" fill="#302416" />
        <rect x="89" y="165" width="8" height="3" rx="1" fill="#302416" />
      </svg>
    </div>
  );
}
