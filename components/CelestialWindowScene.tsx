"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "@/config/personalization";
import { Sparkles, Heart } from "lucide-react";

interface SparkParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

interface CelestialWindowSceneProps {
  isRevealed: boolean;
  onLanternTapped?: () => void;
}

export function CelestialWindowScene({
  isRevealed,
  onLanternTapped,
}: CelestialWindowSceneProps) {
  const [hasTappedLantern, setHasTappedLantern] = useState(false);
  const [sparks, setSparks] = useState<SparkParticle[]>([]);
  const [isPulsing, setIsPulsing] = useState(false);

  const handleLanternClick = () => {
    setHasTappedLantern(true);
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 700);

    // Create 10 delicate rising golden sparks
    const newSparks: SparkParticle[] = Array.from({ length: 10 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 80,
      y: -(Math.random() * 60 + 25),
      size: Math.random() * 2 + 1.5,
      duration: Math.random() * 0.6 + 1.1,
    }));

    setSparks(newSparks);
    setTimeout(() => setSparks([]), 1800);

    if (onLanternTapped) {
      onLanternTapped();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleLanternClick();
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center select-none">
      {/* 1. CELESTIAL SKY: MOON & DRIFTING CLOUDS */}
      <div className="relative w-full flex items-center justify-center h-20 sm:h-24">
        {/* Luminous Moon */}
        <motion.div
          animate={{
            opacity: isRevealed ? 0.28 : 1,
            scale: isRevealed ? 0.84 : 1,
            y: isRevealed ? -4 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative flex items-center justify-center"
        >
          {/* Outer Ethereal Moonlight Halo */}
          <div
            className="absolute -inset-6 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(220, 229, 242, 0.25) 0%, rgba(180, 200, 235, 0.08) 50%, transparent 75%)",
              filter: "blur(12px)",
            }}
          />

          {/* SVG Moon */}
          <svg
            viewBox="0 0 160 160"
            className="w-16 h-16 sm:w-20 sm:h-20 relative z-10 filter drop-shadow-[0_0_18px_rgba(220,229,242,0.4)]"
            aria-label="Luminous moon"
          >
            <defs>
              <radialGradient id="sceneMoonGrad" cx="38%" cy="32%" r="65%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="30%" stopColor="#F2F6FC" />
                <stop offset="65%" stopColor="#D8E3F2" />
                <stop offset="92%" stopColor="#ABC0DC" />
                <stop offset="100%" stopColor="#879DBB" />
              </radialGradient>

              <radialGradient id="sceneCraterShading" cx="42%" cy="40%" r="50%">
                <stop offset="0%" stopColor="#96A8C2" stopOpacity="0.4" />
                <stop offset="80%" stopColor="#7084A3" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#516482" stopOpacity="0" />
              </radialGradient>

              <linearGradient id="sceneMoonShadow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
                <stop offset="70%" stopColor="#1B2446" stopOpacity="0" />
                <stop offset="100%" stopColor="#0B1026" stopOpacity="0.55" />
              </linearGradient>

              <filter id="sceneCraterBlur">
                <feGaussianBlur stdDeviation="1.2" />
              </filter>
            </defs>

            {/* Base Moon */}
            <circle cx="80" cy="80" r="74" fill="url(#sceneMoonGrad)" />

            {/* Maria & Craters */}
            <g filter="url(#sceneCraterBlur)">
              <path
                d="M 45 42 Q 65 34 78 48 Q 90 60 74 76 Q 52 86 42 66 Z"
                fill="url(#sceneCraterShading)"
              />
              <circle cx="98" cy="52" r="14" fill="url(#sceneCraterShading)" />
              <circle cx="110" cy="76" r="17" fill="url(#sceneCraterShading)" />
              <circle cx="114" cy="100" r="13" fill="url(#sceneCraterShading)" />
              <circle cx="76" cy="122" r="6" fill="#B4C5DD" fillOpacity="0.6" />
              <circle cx="76" cy="122" r="3" fill="#FFFFFF" />
              <circle cx="56" cy="98" r="7" fill="url(#sceneCraterShading)" />
            </g>

            {/* Shadow */}
            <circle cx="80" cy="80" r="74" fill="url(#sceneMoonShadow)" />

            {/* Crescent Highlight */}
            <path
              d="M 10 80 A 70 70 0 0 1 80 10 A 74 74 0 0 0 10 80 Z"
              fill="#FFFFFF"
              fillOpacity="0.4"
            />
          </svg>

          {/* Drifting Translucent Clouds */}
          <div className="absolute -inset-3 pointer-events-none opacity-35">
            <svg
              viewBox="0 0 240 160"
              className="w-full h-full animate-cloud-drift filter blur-[1.5px]"
            >
              <path
                d="M 15 85 C 35 60, 75 65, 100 78 C 125 85, 155 68, 185 75 C 215 82, 230 105, 235 120 C 205 135, 140 140, 90 130 C 40 120, 20 100, 15 85 Z"
                fill="rgba(23, 27, 58, 0.75)"
              />
              <path
                d="M 45 50 C 70 35, 110 38, 135 50 C 160 58, 190 48, 215 62 C 190 74, 135 80, 85 74 C 55 66, 40 58, 45 50 Z"
                fill="rgba(11, 16, 38, 0.65)"
              />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* 2. WINDOWSILL & THE GLOWING LANTERN */}
      <div className="relative w-full max-w-[240px] flex flex-col items-center z-20 mt-1">
        {/* Floating Sparks on Lantern Tap */}
        <div className="absolute inset-0 pointer-events-none z-30">
          {sparks.map((spark) => (
            <motion.span
              key={spark.id}
              initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 0.2, x: spark.x, y: spark.y }}
              transition={{ duration: spark.duration, ease: "easeOut" }}
              className="absolute left-1/2 bottom-8 rounded-full bg-[#FFF7E8] shadow-[0_0_8px_#FFD58A]"
              style={{
                width: spark.size,
                height: spark.size,
              }}
            />
          ))}
        </div>

        {/* Interactive Lantern Button */}
        <button
          onClick={handleLanternClick}
          onKeyDown={handleKeyDown}
          type="button"
          tabIndex={0}
          aria-label="Golden lantern glowing warmly near the window. Tap to kindle warmth."
          className="relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD58A] rounded-xl p-1 touch-manipulation cursor-pointer transition-transform duration-300 active:scale-95"
        >
          {/* Ambient Warm Golden Aura */}
          <motion.div
            animate={{
              scale: isRevealed
                ? [1.9, 2.1, 1.9]
                : isPulsing
                ? 1.9
                : [1.4, 1.55, 1.4],
              opacity: isRevealed ? 0.95 : isPulsing ? 0.95 : 0.75,
            }}
            transition={{
              scale: { duration: isRevealed ? 3.5 : 4.5, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.5 },
            }}
            className="absolute inset-0 rounded-full pointer-events-none transition-all duration-700"
            style={{
              background: isRevealed
                ? "radial-gradient(circle, rgba(255, 225, 160, 0.8) 0%, rgba(255, 160, 60, 0.3) 45%, transparent 70%)"
                : "radial-gradient(circle, rgba(255, 213, 138, 0.6) 0%, rgba(255, 140, 66, 0.2) 45%, transparent 70%)",
              filter: isRevealed ? "blur(32px)" : "blur(22px)",
            }}
          />

          {/* SVG Lantern */}
          <div
            className="relative z-10 transition-transform duration-300 group-hover:scale-105"
            style={{ width: 44, height: 60 }}
          >
            <svg
              viewBox="0 0 140 190"
              className="w-full h-full filter drop-shadow-[0_3px_12px_rgba(0,0,0,0.6)]"
            >
              <defs>
                <linearGradient id="brassGradCompact" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4A3B32" />
                  <stop offset="35%" stopColor="#8C6D46" />
                  <stop offset="70%" stopColor="#B38F5B" />
                  <stop offset="90%" stopColor="#5E472A" />
                  <stop offset="100%" stopColor="#302416" />
                </linearGradient>

                <radialGradient id="flameGlowCompact" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="25%" stopColor="#FFF1B0" />
                  <stop offset="55%" stopColor="#FFB347" />
                  <stop offset="85%" stopColor="#FF7700" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>

                <linearGradient id="glassReflectionCompact" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
                  <stop offset="30%" stopColor="#FFD58A" stopOpacity="0.1" />
                  <stop offset="70%" stopColor="#171B3A" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
                </linearGradient>

                <linearGradient id="pillarGradCompact" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2E2114" />
                  <stop offset="50%" stopColor="#967749" />
                  <stop offset="100%" stopColor="#1F160E" />
                </linearGradient>
              </defs>

              {/* Carrying Ring */}
              <path
                d="M 70 8 C 58 8 50 18 50 28 C 50 36 56 42 63 44 L 77 44 C 84 42 90 36 90 28 C 90 18 82 8 70 8 Z"
                fill="none"
                stroke="url(#brassGradCompact)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Cap Roof */}
              <circle cx="70" cy="45" r="4.5" fill="url(#brassGradCompact)" />
              <rect x="63" y="47" width="14" height="4" rx="1.5" fill="url(#brassGradCompact)" />
              <path
                d="M 70 51 L 98 67 C 96 69 92 70 88 70 L 52 70 C 48 70 44 69 42 67 Z"
                fill="url(#brassGradCompact)"
              />
              <circle cx="62" cy="63" r="1.5" fill="#171B3A" />
              <circle cx="70" cy="62" r="1.8" fill="#FFD58A" />
              <circle cx="78" cy="63" r="1.5" fill="#171B3A" />
              <rect x="44" y="70" width="52" height="6" rx="2" fill="url(#brassGradCompact)" />

              {/* Glass Chamber */}
              <rect
                x="46"
                y="76"
                width="48"
                height="68"
                rx="3"
                fill="rgba(15, 20, 48, 0.6)"
              />

              {/* Flame Radiance */}
              <ellipse
                cx="70"
                cy="110"
                rx="22"
                ry="28"
                fill="url(#flameGlowCompact)"
                className="animate-lantern-flicker"
                opacity={isRevealed ? 0.95 : 0.8}
              />

              {/* Candle Body */}
              <rect x="64" y="118" width="12" height="24" rx="2" fill="#FAF0D7" />
              <ellipse cx="70" cy="118" rx="6" ry="2" fill="#FFF7E8" />
              <path d="M 70 118 Q 69 113 70 110" stroke="#3A2C1D" strokeWidth="1.2" fill="none" />

              {/* Flickering Flame Heart */}
              <g
                className="animate-lantern-flicker origin-bottom"
                style={{ transformOrigin: "70px 110px" }}
              >
                <path
                  d="M 70 93 C 63 101 64 110 70 112 C 76 110 77 101 70 93 Z"
                  fill="#FF8C42"
                />
                <path
                  d="M 70 96 C 65 102 65 110 70 111.5 C 75 110 75 102 70 96 Z"
                  fill="#FFD58A"
                />
                <ellipse cx="70" cy="107" rx="2.5" ry="4" fill="#FFFFFF" />
              </g>

              {/* Glass Reflections */}
              <rect
                x="46"
                y="76"
                width="48"
                height="68"
                rx="2"
                fill="url(#glassReflectionCompact)"
              />

              {/* Guard Pillars */}
              <rect x="46" y="76" width="3" height="68" fill="url(#pillarGradCompact)" />
              <rect x="61" y="76" width="2" height="68" fill="url(#pillarGradCompact)" opacity="0.6" />
              <rect x="77" y="76" width="2" height="68" fill="url(#pillarGradCompact)" opacity="0.6" />
              <rect x="91" y="76" width="3" height="68" fill="url(#pillarGradCompact)" />

              {/* Base */}
              <rect x="44" y="144" width="52" height="6" rx="1.5" fill="url(#brassGradCompact)" />
              <path
                d="M 44 150 L 40 162 C 40 164 43 165 47 165 L 93 165 C 97 165 100 164 100 162 L 96 150 Z"
                fill="url(#brassGradCompact)"
              />
              <rect x="43" y="165" width="8" height="3" rx="1" fill="#302416" />
              <rect x="89" y="165" width="8" height="3" rx="1" fill="#302416" />
            </svg>
          </div>
        </button>

        {/* The Windowsill Ledge */}
        <div className="w-full flex flex-col items-center">
          {/* Warm reflection */}
          <div
            className="w-36 h-0.5 rounded-full blur-[1px] transition-opacity duration-700"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255, 213, 138, 0.5) 50%, transparent 100%)",
              opacity: isRevealed ? 0.9 : 0.6,
            }}
          />

          {/* Sill Structure */}
          <div className="w-48 sm:w-56 h-2 rounded-t-sm bg-gradient-to-b from-[#1E2346] to-[#0E132E] border-t border-[#FFD58A]/30 shadow-md" />
          <div className="w-40 sm:w-48 h-1 bg-[#080B1C] rounded-b-md border-t border-[#232A55]/40" />
        </div>

        {/* 3. LANTERN HIDDEN MESSAGE / HINT (Fixed Height Container to avoid layout shift) */}
        <div className="h-6 flex items-center justify-center mt-1 w-full">
          <AnimatePresence mode="wait">
            {hasTappedLantern ? (
              <motion.div
                key="hidden-msg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#171B3A]/90 border border-[#FFD58A]/35 text-[#FFD58A] text-[10px] sm:text-[11px] font-serif-display shadow-[0_0_12px_rgba(255,213,138,0.25)]"
              >
                <Heart className="w-2.5 h-2.5 text-[#FFD58A] fill-[#FFD58A]/50 shrink-0" />
                <span>{siteConfig.lantern?.hiddenMessage || "Some lights make the night feel warmer. ♡"}</span>
              </motion.div>
            ) : (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-1 text-[10px] font-serif-display uppercase tracking-widest text-[#DCE5F2]/50"
              >
                <Sparkles className="w-2.5 h-2.5 text-[#FFD58A]/70" />
                <span>{siteConfig.lantern?.hintText || "tap the lantern"}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
