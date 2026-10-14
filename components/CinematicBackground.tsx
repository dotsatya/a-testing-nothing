"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";

interface SparkParticle {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface CinematicBackgroundProps {
  currentStep: number; // 0 = intro, 1 = part 1, 2 = part 2, 3 = part 3, 4 = part 4
}

export function CinematicBackground({ currentStep }: CinematicBackgroundProps) {
  const [lanternSparks, setLanternSparks] = useState<SparkParticle[]>([]);
  const [showLanternMessage, setShowLanternMessage] = useState(false);
  const [isLanternPulsing, setIsLanternPulsing] = useState(false);

  const handleLanternTap = () => {
    setIsLanternPulsing(true);
    setShowLanternMessage(true);
    setTimeout(() => setIsLanternPulsing(false), 900);
    setTimeout(() => setShowLanternMessage(false), 3800);

    const newSparks: SparkParticle[] = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 60,
      y: -(Math.random() * 70 + 20),
      size: Math.random() * 2 + 1.5,
    }));
    setLanternSparks(newSparks);
    setTimeout(() => setLanternSparks([]), 1800);
  };

  // Step 3 (The Night): Clouds covered the sky, moon disappears
  const isMoonHidden = currentStep === 3;
  // Step 2 & 4: Lantern is prominent/glowing warmly
  const isLanternBright = currentStep === 2 || currentStep === 4;

  return (
    <div className="fixed inset-0 w-full h-[100svh] overflow-hidden -z-10 select-none pointer-events-none">
      {/* 1. High-resolution Cinematic Artwork */}
      <Image
        src="/images/moon-lantern-background.png"
        alt="Boy sitting on a rooftop under a luminous moon and glowing lantern"
        fill
        priority
        quality={95}
        className="object-cover object-[center_bottom] sm:object-center transition-all duration-1000"
      />

      {/* 2. Moonlight Subtle Shimmer (Upper Right Area) */}
      <motion.div
        animate={{
          opacity: isMoonHidden ? 0.05 : [0.22, 0.35, 0.22],
          scale: isMoonHidden ? 0.8 : [1, 1.05, 1],
        }}
        transition={{
          duration: isMoonHidden ? 0.8 : 6,
          repeat: isMoonHidden ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[8%] right-[8%] sm:top-[12%] sm:right-[15%] w-44 h-44 sm:w-56 sm:h-56 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(220, 229, 242, 0.4) 0%, rgba(180, 200, 235, 0.12) 45%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Part 3 Atmospheric Cloud Veil over the Moon */}
      <motion.div
        animate={{ opacity: isMoonHidden ? 0.85 : 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        className="absolute top-[8%] right-[8%] sm:top-[12%] sm:right-[15%] w-40 h-40 sm:w-52 sm:h-52 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(11, 16, 38, 0.92) 20%, rgba(15, 20, 48, 0.8) 55%, transparent 75%)",
          filter: "blur(16px)",
        }}
      />

      {/* 3. Lantern Warm Golden Aura (Lower Left Area) */}
      <motion.div
        animate={{
          opacity: isLanternPulsing || isLanternBright ? 0.75 : [0.35, 0.48, 0.35],
          scale: isLanternPulsing || isLanternBright ? 1.35 : [1, 1.08, 1],
        }}
        transition={{
          duration: isLanternPulsing ? 0.5 : 4,
          repeat: isLanternPulsing ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[10%] left-[8%] sm:bottom-[12%] sm:left-[10%] w-36 h-36 sm:w-44 sm:h-44 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 213, 138, 0.65) 0%, rgba(255, 140, 66, 0.25) 45%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />

      {/* 4. Balanced Dark Navy Scrim for Text Readability without Hiding the Art */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 38%, rgba(11, 16, 38, 0.48) 0%, rgba(11, 16, 38, 0.2) 45%, rgba(11, 16, 38, 0.55) 100%)",
        }}
      />

      {/* Top and Bottom Delicate Gradients */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0B1026]/70 via-[#0B1026]/20 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B1026]/75 via-[#0B1026]/25 to-transparent pointer-events-none" />

      {/* 5. Interactive Lantern Hotspot on the lower-left windowsill */}
      <div className="absolute bottom-[10%] left-[8%] sm:bottom-[12%] sm:left-[10%] z-30 pointer-events-auto">
        {/* Rising Golden Sparks on tap */}
        <div className="absolute inset-0 pointer-events-none">
          {lanternSparks.map((spark) => (
            <motion.span
              key={spark.id}
              initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 0.2, x: spark.x, y: spark.y }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="absolute left-6 bottom-8 rounded-full bg-[#FFF7E8] shadow-[0_0_8px_#FFD58A]"
              style={{
                width: spark.size,
                height: spark.size,
              }}
            />
          ))}
        </div>

        {/* Tappable Hotspot Button */}
        <button
          onClick={handleLanternTap}
          type="button"
          tabIndex={0}
          aria-label="Glowing lantern on the ledge. Tap to kindle warmth."
          className="relative w-14 h-20 sm:w-16 sm:h-24 rounded-2xl cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD58A]"
        >
          <span className="sr-only">Tap the lantern</span>
        </button>

        {/* Hidden message popup near lantern */}
        <AnimatePresence>
          {showLanternMessage && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="absolute -top-10 left-0 whitespace-nowrap inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#171B3A]/90 border border-[#FFD58A]/40 text-[#FFD58A] text-[10px] sm:text-[11px] font-serif-display shadow-[0_0_15px_rgba(255,213,138,0.3)] backdrop-blur-md pointer-events-none"
            >
              <Heart className="w-2.5 h-2.5 text-[#FFD58A] fill-[#FFD58A]/50 shrink-0" />
              <span>Some lights make the night feel warmer. ♡</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
