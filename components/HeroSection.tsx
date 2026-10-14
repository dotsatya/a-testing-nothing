"use client";

import React from "react";
import { MoonIllustration } from "./MoonIllustration";
import { LanternIllustration } from "./LanternIllustration";
import { siteConfig } from "@/config/personalization";
import { Sparkles, ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onEnter: () => void;
}

export function HeroSection({ onEnter }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 sm:px-6 pt-16 sm:pt-20 pb-10 overflow-hidden select-none">
      {/* Background ambient radial gradients */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[550px] pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(220, 229, 242, 0.18) 0%, rgba(23, 27, 58, 0.4) 50%, transparent 75%)",
        }}
      />

      {/* Warm ambient floor light from lantern */}
      <div
        className="absolute bottom-0 right-1/4 w-[600px] h-[350px] pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle at 60% 80%, rgba(255, 213, 138, 0.25) 0%, rgba(255, 140, 66, 0.08) 50%, transparent 75%)",
        }}
      />

      {/* Top Celestial Region: Luminous Moon Floating */}
      <div className="relative z-10 w-full flex flex-col items-center mt-2 sm:mt-6">
        {/* Personalized Dedication Tag if configured */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171B3A]/60 backdrop-blur-md border border-[#FFD58A]/20 text-[#FFF7E8] text-xs sm:text-sm tracking-widest uppercase mb-6 sm:mb-8 shadow-inner shadow-[#FFD58A]/5 animate-float-gentle">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD58A]" />
          <span>
            {siteConfig.herName
              ? `Dedicated to ${siteConfig.herName}`
              : "A quiet story written for you"}
          </span>
        </div>

        {/* Luminous Floating Moon */}
        <div className="animate-float-gentle transition-transform duration-1000">
          <MoonIllustration size={200} phase="full" />
        </div>
      </div>

      {/* Center Cinematic Typography */}
      <div className="relative z-20 max-w-3xl text-center my-auto py-6 sm:py-8 px-2">
        <h1 className="font-serif-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wide text-[#FFF7E8] leading-[1.15] mb-5 sm:mb-6 glow-text-moon">
          Somewhere between the moon and the light...
        </h1>

        <p className="font-serif-display text-lg sm:text-xl md:text-2xl text-[#DCE5F2]/85 italic tracking-wide max-w-xl mx-auto font-light leading-relaxed mb-8">
          &ldquo;There is a little story I have been wanting to tell you.&rdquo;
        </p>

        {/* Enter CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onEnter}
            id="enter-universe-btn"
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#171B3A] via-[#232A55] to-[#171B3A] border border-[#FFD58A]/40 text-[#FFF7E8] hover:text-[#FFD58A] hover:border-[#FFD58A]/80 shadow-[0_0_25px_rgba(255,213,138,0.2)] hover:shadow-[0_0_40px_rgba(255,213,138,0.45)] transition-all duration-500 text-sm sm:text-base font-serif-display tracking-widest uppercase cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>Enter our little universe</span>
              <span className="transition-transform duration-300 group-hover:scale-125">✨</span>
            </span>
            <div className="absolute inset-0 rounded-full bg-[#FFD58A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </button>
        </div>
      </div>

      {/* Bottom Scene: Silhouetted Window Sill & Glowing Lantern */}
      <div className="relative z-10 w-full max-w-5xl mt-auto">
        {/* Arched Window Sill Frame */}
        <div className="relative w-full flex items-end justify-between sm:justify-around px-4 border-b-4 border-[#121633] pb-1">
          {/* Subtle Silhouette of quiet room / window frame left */}
          <div className="hidden sm:block text-left opacity-60">
            <p className="font-romantic text-xl text-[#FFD58A]/60">
              Midnight reverie
            </p>
            <p className="text-[11px] tracking-widest uppercase text-[#DCE5F2]/40 font-mono">
              Night sky • Quiet hours
            </p>
          </div>

          {/* Glowing Lantern Resting on the Sill */}
          <div className="relative flex flex-col items-center">
            {/* Soft Warm Arc on the Window Sill */}
            <div
              className="absolute -bottom-2 w-48 h-8 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(255, 213, 138, 0.75) 0%, rgba(255, 140, 66, 0.3) 45%, transparent 75%)",
                filter: "blur(6px)",
              }}
            />
            <LanternIllustration
              size={120}
              intensity="warm"
              isInteractive={true}
            />
            <span className="text-[10px] tracking-widest text-[#FFD58A]/60 font-serif-display uppercase mt-1 animate-pulse">
              Gentle flame
            </span>
          </div>

          {/* Right side prompt to scroll */}
          <button
            onClick={onEnter}
            aria-label="Scroll down to story"
            className="flex items-center gap-2 text-xs text-[#DCE5F2]/50 hover:text-[#FFD58A] transition-colors duration-300 cursor-pointer pb-2"
          >
            <span className="font-serif-display tracking-widest uppercase hidden sm:inline">
              Scroll down
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#FFD58A]/70" />
          </button>
        </div>
      </div>
    </section>
  );
}
