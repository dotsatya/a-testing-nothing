"use client";

import React from "react";

interface MoonProps {
  phase?: "full" | "distant" | "obscured" | "gentle";
  className?: string;
  size?: number;
}

export function MoonIllustration({
  phase = "full",
  className = "",
  size = 220,
}: MoonProps) {
  // Determine opacity, glow, and cloud cover based on chapter phase
  const isObscured = phase === "obscured";
  const isDistant = phase === "distant";

  const scale = isDistant ? 0.65 : 1;
  const moonOpacity = isObscured ? 0.18 : 1;

  return (
    <div
      className={`relative flex items-center justify-center transition-all duration-1000 ease-in-out ${className}`}
      style={{
        width: size,
        height: size,
        transform: `scale(${scale})`,
      }}
    >
      {/* Outer Ethereal Moonlight Halo */}
      <div
        className={`absolute inset-[-40%] rounded-full pointer-events-none transition-opacity duration-1000 ${
          isObscured ? "opacity-15" : "opacity-75 animate-pulse"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(220, 229, 242, 0.22) 0%, rgba(180, 200, 235, 0.08) 45%, rgba(11, 16, 38, 0) 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Secondary Soft Rim Aura */}
      <div
        className="absolute inset-[-12%] rounded-full pointer-events-none transition-opacity duration-1000"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 247, 232, 0.25) 30%, rgba(220, 229, 242, 0.1) 60%, transparent 75%)",
          filter: "blur(12px)",
          opacity: isObscured ? 0.2 : 0.85,
        }}
      />

      {/* The Moon Sphere SVG */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full relative z-10 transition-all duration-1000 filter drop-shadow-[0_0_35px_rgba(220,229,242,0.4)]"
        style={{ opacity: moonOpacity }}
      >
        <defs>
          {/* Moon surface base gradient */}
          <radialGradient id="moonSurface" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#EFF4FB" />
            <stop offset="70%" stopColor="#D4E0F0" />
            <stop offset="95%" stopColor="#A8BBD6" />
            <stop offset="100%" stopColor="#8196B5" />
          </radialGradient>

          {/* Mare / Crater shading gradient */}
          <radialGradient id="mareGrad" cx="40%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#96A8C2" stopOpacity="0.45" />
            <stop offset="80%" stopColor="#6E829F" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#516482" stopOpacity="0" />
          </radialGradient>

          {/* Inner crescent shadow for depth */}
          <linearGradient id="lunarShadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
            <stop offset="65%" stopColor="#1B2446" stopOpacity="0" />
            <stop offset="100%" stopColor="#0B1026" stopOpacity="0.5" />
          </linearGradient>

          <filter id="craterBlur">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>

        {/* Base Moon Disc */}
        <circle cx="100" cy="100" r="92" fill="url(#moonSurface)" />

        {/* Craters and Lunar Maria (Seas) */}
        <g filter="url(#craterBlur)">
          {/* Oceanus Procellarum / Mare Imbrium */}
          <path
            d="M 55 50 Q 80 40 95 60 Q 110 75 90 95 Q 65 110 50 85 Z"
            fill="url(#mareGrad)"
          />
          {/* Mare Serenitatis */}
          <circle cx="120" cy="65" r="18" fill="url(#mareGrad)" />
          {/* Mare Tranquillitatis */}
          <circle cx="135" cy="95" r="22" fill="url(#mareGrad)" />
          {/* Mare Fecunditatis */}
          <circle cx="140" cy="125" r="16" fill="url(#mareGrad)" />
          {/* Mare Crisium */}
          <ellipse cx="155" cy="72" rx="11" ry="8" fill="url(#mareGrad)" />
          {/* Tycho crater & rays */}
          <circle cx="95" cy="155" r="8" fill="#B4C5DD" fillOpacity="0.7" />
          <circle cx="95" cy="155" r="4" fill="#E8F0FC" />
          {/* Subtle crater details */}
          <circle cx="68" cy="125" r="9" fill="url(#mareGrad)" />
          <circle cx="48" cy="100" r="6" fill="url(#mareGrad)" />
          <circle cx="115" cy="140" r="10" fill="url(#mareGrad)" />
        </g>

        {/* Inner spherical shadow */}
        <circle cx="100" cy="100" r="92" fill="url(#lunarShadow)" />

        {/* Highlight crescent edge */}
        <path
          d="M 12 100 A 88 88 0 0 1 100 12 A 92 92 0 0 0 12 100 Z"
          fill="#FFFFFF"
          fillOpacity="0.45"
        />
      </svg>

      {/* Drifting Translucent Clouds across the Moon */}
      <div
        className={`absolute inset-[-15%] pointer-events-none transition-opacity duration-1000 ${
          isObscured ? "opacity-95" : "opacity-45"
        }`}
      >
        <svg
          viewBox="0 0 300 200"
          className="w-full h-full animate-cloud-drift filter blur-[3px]"
        >
          <path
            d="M 10 110 C 30 80, 80 85, 110 100 C 140 110, 180 85, 215 95 C 255 105, 280 135, 290 150 C 260 170, 180 175, 110 165 C 50 155, 20 130, 10 110 Z"
            fill="rgba(23, 27, 58, 0.75)"
          />
          <path
            d="M 50 65 C 80 45, 130 50, 160 65 C 190 75, 230 60, 260 80 C 230 95, 160 105, 100 95 C 60 85, 40 75, 50 65 Z"
            fill="rgba(11, 16, 38, 0.65)"
          />
        </svg>
      </div>

      {/* Heavy obscuring storm clouds for Chapter 4 */}
      {isObscured && (
        <div className="absolute inset-[-30%] pointer-events-none flex items-center justify-center animate-pulse">
          <div
            className="w-full h-full rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(11, 16, 38, 0.95) 25%, rgba(23, 27, 58, 0.85) 65%, transparent 95%)",
              filter: "blur(18px)",
            }}
          />
        </div>
      )}
    </div>
  );
}
