"use client";

import React, { useState } from "react";
import { LanternIllustration } from "./LanternIllustration";
import { siteConfig } from "@/config/personalization";
import { Sparkles, RotateCcw, Heart } from "lucide-react";

interface InteractiveMomentProps {
  onRestart: () => void;
}

export function InteractiveMoment({ onRestart }: InteractiveMomentProps) {
  const [isKindled, setIsKindled] = useState(false);
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);

  const handleKindle = () => {
    setIsKindled(true);

    // Spawn floating golden firefly particles
    const newSparks = Array.from({ length: 18 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 220,
      y: -(Math.random() * 180 + 40),
      delay: Math.random() * 0.5,
    }));
    setSparks(newSparks);
  };

  return (
    <section className="relative min-h-[90vh] w-full flex flex-col items-center justify-center py-20 px-4 sm:px-6 overflow-hidden">
      {/* Expanding Golden Aura when kindled */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${
          isKindled ? "opacity-55 scale-100" : "opacity-15 scale-75"
        }`}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255, 213, 138, 0.28) 0%, rgba(255, 140, 66, 0.12) 40%, rgba(11, 16, 38, 0) 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Top Prompts */}
      <div className="relative z-10 text-center max-w-xl mx-auto mb-10">
        <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#FFF7E8] font-light mb-3 glow-text-moon">
          Stay a little longer?
        </h2>
        <p className="font-serif-display text-base sm:text-lg text-[#DCE5F2]/75 italic font-light">
          {isKindled
            ? "You brought warmth to this little universe."
            : "Touch the little lantern to kindle its light."}
        </p>
      </div>

      {/* Centerpiece: Glowing Lantern with Interactive Kindling */}
      <div className="relative z-20 flex flex-col items-center my-6">
        {/* Floating Sparks rising into night sky */}
        {sparks.map((s) => (
          <span
            key={s.id}
            className="absolute w-2 h-2 rounded-full bg-[#FFF7E8] shadow-[0_0_12px_#FFD58A] pointer-events-none animate-ping"
            style={{
              transform: `translate(${s.x}px, ${s.y}px)`,
              animationDuration: "2.2s",
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}

        {/* Outer Circular Celestial Halo */}
        <div className="relative flex items-center justify-center p-8 rounded-full border border-[#FFD58A]/20 bg-[#171B3A]/30 backdrop-blur-md shadow-2xl">
          <LanternIllustration
            size={140}
            intensity={isKindled ? "intense" : "warm"}
            isInteractive={true}
            onClick={handleKindle}
          />
        </div>

        {/* Small Touch Prompt Button */}
        {!isKindled && (
          <button
            onClick={handleKindle}
            className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full bg-[#171B3A]/80 border border-[#FFD58A]/30 text-[#FFD58A] hover:bg-[#FFD58A]/10 text-xs font-serif-display tracking-widest uppercase transition-all duration-300 shadow-md cursor-pointer animate-pulse"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Light the lantern</span>
          </button>
        )}
      </div>

      {/* Secret Message Revealed */}
      <div
        className={`relative z-20 max-w-2xl mx-auto text-center mt-6 px-4 transition-all duration-1000 transform ${
          isKindled
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        <div className="p-6 sm:p-8 rounded-3xl bg-[#171B3A]/80 border border-[#FFD58A]/40 backdrop-blur-xl shadow-2xl shadow-[#FFD58A]/10">
          <div className="flex justify-center mb-3">
            <Heart className="w-5 h-5 text-[#FFD58A] fill-[#FFD58A]/50 animate-bounce" />
          </div>

          <p className="font-serif-display text-xl sm:text-2xl md:text-3xl text-[#FFF7E8] font-light leading-relaxed mb-4 glow-text-gold">
            &ldquo;If this little light made you smile, then it has already done something beautiful tonight.&rdquo;
          </p>

          <p className="font-romantic text-xl text-[#FFD58A] mt-4">
            {siteConfig.closingMessage}
          </p>
        </div>
      </div>

      {/* Read Again Smooth CTA Button */}
      <div className="relative z-20 mt-12">
        <button
          onClick={onRestart}
          id="read-again-btn"
          className="group flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#0B1026] border border-[#FFD58A]/30 text-[#DCE5F2] hover:text-[#FFD58A] hover:border-[#FFD58A]/70 shadow-lg hover:shadow-[0_0_25px_rgba(255,213,138,0.25)] transition-all duration-300 text-xs sm:text-sm font-serif-display tracking-widest uppercase cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#FFD58A] transition-transform duration-500 group-hover:-rotate-180" />
          <span>Read our story again</span>
        </button>
      </div>

      {/* Footer quiet note */}
      <footer className="relative z-10 mt-16 text-center text-xs font-serif-display tracking-widest text-[#DCE5F2]/40 uppercase">
        {siteConfig.title} • {siteConfig.tagline}
      </footer>
    </section>
  );
}
