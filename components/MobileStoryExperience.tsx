"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MoonIllustration } from "./MoonIllustration";
import { LanternIllustration } from "./LanternIllustration";
import { BoySilhouette } from "./BoySilhouette";
import { siteConfig } from "@/config/personalization";
import { ChevronDown, RotateCcw, Sparkles, Heart } from "lucide-react";

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export function MobileStoryExperience() {
  const [activeScene, setActiveScene] = useState(1);
  const [lanternSparks, setLanternSparks] = useState<SparkleParticle[]>([]);
  const [hasTappedLantern, setHasTappedLantern] = useState(false);

  // Scroll to a specific scene smoothly
  const scrollToScene = (sceneNum: number) => {
    const el = document.getElementById(`scene-${sceneNum}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Track active scene based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.45;
      for (let i = 1; i <= 4; i++) {
        const el = document.getElementById(`scene-${i}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveScene(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Final Scene Lantern Tap Particle Burst
  const handleLanternTap = () => {
    setHasTappedLantern(true);
    const newSparks: SparkleParticle[] = Array.from({ length: 14 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 160,
      y: -(Math.random() * 120 + 30),
      size: Math.random() * 4 + 2,
    }));
    setLanternSparks(newSparks);
    setTimeout(() => setLanternSparks([]), 1800);
  };

  return (
    <div className="relative w-full max-w-md mx-auto min-h-screen px-4 sm:px-6">
      {/* Discreet Mobile Scene Dots (Sticky Minimalist Indicator) */}
      <nav
        aria-label="Story Progress"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#171B3A]/85 backdrop-blur-md border border-[#FFD58A]/25 shadow-lg shadow-[#0B1026]/80"
        style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        {[1, 2, 3, 4].map((num) => (
          <button
            key={num}
            onClick={() => scrollToScene(num)}
            aria-label={`Jump to Scene ${num}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 touch-manipulation ${
              activeScene === num
                ? "bg-[#FFD58A] scale-125 shadow-[0_0_8px_#FFD58A]"
                : "bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </nav>

      {/* ============================================================== */}
      {/* SCENE 1 — THE MOON                                             */}
      {/* ============================================================== */}
      <section
        id="scene-1"
        className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center py-8 text-center"
        style={{
          paddingTop: "max(2.5rem, env(safe-area-inset-top, 2.5rem))",
          paddingBottom: "max(3rem, env(safe-area-inset-bottom, 3rem))",
        }}
      >
        {/* Subtle top dedication badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#171B3A]/70 border border-[#FFD58A]/20 text-[#FFF7E8] text-[11px] font-serif-display tracking-widest uppercase shadow-sm"
        >
          <Sparkles className="w-3 h-3 text-[#FFD58A]" />
          <span>
            {siteConfig.herName
              ? `A little universe for ${siteConfig.herName}`
              : "A quiet story for you"}
          </span>
        </motion.div>

        {/* Luminous Moon Centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative my-auto flex items-center justify-center py-4"
        >
          <MoonIllustration size={160} phase="full" />
        </motion.div>

        {/* Narrative & Thumb-Friendly Action */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full flex flex-col items-center gap-4 mt-auto"
        >
          <h1 className="font-serif-display text-2xl sm:text-3xl text-[#FFF7E8] font-light leading-snug glow-text-moon px-2">
            Somewhere between the moon and the light...
          </h1>

          <p className="font-serif-display text-base text-[#DCE5F2]/80 italic font-light px-4">
            &ldquo;There is a little story I want to share with you.&rdquo;
          </p>

          <button
            onClick={() => scrollToScene(2)}
            id="enter-scene-btn"
            className="w-full max-w-xs h-12 mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#171B3A] via-[#232A55] to-[#171B3A] border border-[#FFD58A]/50 text-[#FFF7E8] active:scale-98 active:border-[#FFD58A] shadow-[0_0_20px_rgba(255,213,138,0.25)] text-sm font-serif-display tracking-widest uppercase touch-manipulation cursor-pointer transition-all"
          >
            <span>{siteConfig.enterButtonText}</span>
          </button>
        </motion.div>
      </section>

      {/* ============================================================== */}
      {/* SCENE 2 — THE LITTLE LANTERN                                    */}
      {/* ============================================================== */}
      <section
        id="scene-2"
        className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center py-8 text-center border-t border-[#FFD58A]/10"
        style={{
          paddingTop: "max(2.5rem, env(safe-area-inset-top, 2.5rem))",
          paddingBottom: "max(3rem, env(safe-area-inset-bottom, 3rem))",
        }}
      >
        {/* Sky with Distant Moon */}
        <div className="w-full flex justify-end pr-4 pt-2">
          <div className="opacity-75 scale-90">
            <MoonIllustration size={90} phase="distant" />
          </div>
        </div>

        {/* Windowsill with Glowing Lantern & Boy Silhouette */}
        <div className="relative my-auto w-full max-w-xs h-56 flex items-end justify-center rounded-2xl bg-[#0B1026]/60 border border-[#FFD58A]/15 backdrop-blur-md px-6 pb-2 overflow-hidden shadow-xl">
          {/* Wooden Sill Bar */}
          <div className="absolute inset-x-0 bottom-0 h-6 bg-[#0E132E] border-t border-[#232A55] z-10" />

          {/* Boy gazing up */}
          <div className="relative z-20 pb-2 mr-6">
            <BoySilhouette size={95} facing="moon" />
          </div>

          {/* Lantern glowing softly beside him */}
          <div className="relative z-20 pb-1">
            <LanternIllustration size={85} intensity="warm" isInteractive={false} />
          </div>
        </div>

        {/* Progressive Narrative Lines */}
        <div className="w-full flex flex-col items-center gap-3 mt-auto px-2">
          <p className="font-serif-display text-lg sm:text-xl text-[#FFF7E8]/90 font-light leading-relaxed">
            He spent his nights wishing for the moon...
          </p>

          <p className="font-serif-display text-lg sm:text-xl text-[#FFD58A] font-light leading-relaxed glow-text-gold">
            While a little lantern kept glowing beside him.
          </p>

          {/* Continue button */}
          <button
            onClick={() => scrollToScene(3)}
            className="w-full max-w-xs h-11 mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#171B3A]/80 border border-[#FFD58A]/30 text-[#DCE5F2] hover:text-[#FFF7E8] active:scale-98 text-xs font-serif-display tracking-widest uppercase touch-manipulation cursor-pointer transition-all"
          >
            <span>What happened next</span>
            <ChevronDown className="w-4 h-4 text-[#FFD58A]" />
          </button>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SCENE 3 — THE REALIZATION                                       */}
      {/* ============================================================== */}
      <section
        id="scene-3"
        className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center py-8 text-center border-t border-[#FFD58A]/10"
        style={{
          paddingTop: "max(2.5rem, env(safe-area-inset-top, 2.5rem))",
          paddingBottom: "max(3rem, env(safe-area-inset-bottom, 3rem))",
        }}
      >
        {/* Sky with Obscured Moon */}
        <div className="w-full flex justify-center pt-2">
          <div className="opacity-30 scale-75">
            <MoonIllustration size={85} phase="obscured" />
          </div>
        </div>

        {/* Scene: Boy turns to Lantern bathed in Warm Golden Light */}
        <div className="relative my-auto w-full max-w-xs h-60 flex items-end justify-center rounded-2xl bg-gradient-to-t from-[#1A1835]/90 to-[#0B1026]/80 border border-[#FFD58A]/25 backdrop-blur-md px-6 pb-2 overflow-hidden shadow-2xl">
          {/* Wooden Sill Bar */}
          <div className="absolute inset-x-0 bottom-0 h-6 bg-[#0E132E] border-t border-[#FFD58A]/20 z-10" />

          {/* Warm Golden radial aura filling the scene */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background: "radial-gradient(circle at 65% 70%, rgba(255, 213, 138, 0.45) 0%, transparent 65%)",
            }}
          />

          {/* Boy turned toward lantern */}
          <div className="relative z-20 pb-2 mr-4">
            <BoySilhouette size={100} facing="lantern" />
          </div>

          {/* Vibrant Lantern */}
          <div className="relative z-20 pb-1">
            <LanternIllustration size={95} intensity="radiant" isInteractive={false} />
          </div>
        </div>

        {/* Emotional Revelation Text */}
        <div className="w-full flex flex-col items-center gap-3.5 mt-auto px-2">
          <p className="font-serif-display text-base sm:text-lg text-[#FFF7E8]/90 font-light leading-relaxed">
            &ldquo;Sometimes, we spend so long wishing for something far away that we forget to notice the light already beside us.&rdquo;
          </p>

          <div className="p-3.5 rounded-xl bg-[#171B3A]/60 border border-[#FFD58A]/30 w-full max-w-xs">
            <p className="font-serif-display text-base text-[#FFD58A] font-light leading-relaxed glow-text-gold">
              The moon was never wrong for being far away. And the lantern was never wrong for shining.
            </p>
          </div>

          {/* Continue button */}
          <button
            onClick={() => scrollToScene(4)}
            className="w-full max-w-xs h-11 mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#232A55] to-[#171B3A] border border-[#FFD58A]/50 text-[#FFF7E8] active:scale-98 text-xs font-serif-display tracking-widest uppercase touch-manipulation cursor-pointer transition-all shadow-md"
          >
            <span>My little message for you</span>
            <ChevronDown className="w-4 h-4 text-[#FFD58A]" />
          </button>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SCENE 4 — MY LITTLE MESSAGE TO YOU                             */}
      {/* ============================================================== */}
      <section
        id="scene-4"
        className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center py-8 text-center border-t border-[#FFD58A]/10"
        style={{
          paddingTop: "max(2.5rem, env(safe-area-inset-top, 2.5rem))",
          paddingBottom: "max(4.5rem, env(safe-area-inset-bottom, 4.5rem))",
        }}
      >
        {/* Letter Card Header */}
        <div className="w-full text-center mb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#171B3A]/80 border border-[#FFD58A]/25 text-[#FFD58A] text-[11px] font-serif-display tracking-widest uppercase mb-2">
            <Heart className="w-3 h-3 text-[#FFD58A] fill-[#FFD58A]/50" />
            <span>A Love Letter</span>
          </div>

          <h2 className="font-serif-display text-xl sm:text-2xl text-[#FFF7E8] font-light leading-snug glow-text-gold">
            {siteConfig.letter.heading}
          </h2>
        </div>

        {/* Intimate Letter Parchment Container */}
        <div className="relative my-auto w-full max-w-xs sm:max-w-sm rounded-2xl p-5 sm:p-6 bg-[#171B3A]/80 border border-[#FFD58A]/30 backdrop-blur-xl shadow-2xl text-left">
          {/* Subtle Golden Inner Border Accent */}
          <div className="space-y-3.5 font-serif-display text-sm sm:text-base text-[#FFF7E8]/90 font-light leading-relaxed">
            {siteConfig.letter.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={idx === siteConfig.letter.paragraphs.length - 1 ? "text-[#FFD58A] font-normal pt-1" : ""}
              >
                {p}
              </p>
            ))}

            {/* Optional Personal Note if Configured */}
            {siteConfig.personalNote && (
              <p className="italic text-[#FFD58A]/90 pt-2 border-t border-[#FFD58A]/20 text-sm">
                {siteConfig.personalNote}
              </p>
            )}
          </div>

          {/* Letter Closing & Signature */}
          <div className="mt-5 pt-4 border-t border-[#FFD58A]/20 flex items-center justify-between">
            <p className="font-romantic text-lg sm:text-xl text-[#FFD58A]">
              {siteConfig.myName ? `With warmth, ${siteConfig.myName} ♡` : siteConfig.letter.closing}
            </p>
            <Sparkles className="w-4 h-4 text-[#FFD58A]" />
          </div>
        </div>

        {/* Interactive Small Glowing Lantern Moment */}
        <div className="w-full flex flex-col items-center mt-3 mb-2">
          <div className="relative flex items-center justify-center">
            {/* Rising Sparks when tapped */}
            {lanternSparks.map((spark) => (
              <span
                key={spark.id}
                className="absolute w-2 h-2 rounded-full bg-[#FFF7E8] shadow-[0_0_10px_#FFD58A] pointer-events-none animate-ping"
                style={{
                  transform: `translate(${spark.x}px, ${spark.y}px)`,
                  animationDuration: "1.2s",
                }}
              />
            ))}

            <div
              onClick={handleLanternTap}
              className="p-2 cursor-pointer touch-manipulation active:scale-95 transition-transform"
            >
              <LanternIllustration
                size={70}
                intensity={hasTappedLantern ? "intense" : "warm"}
                isInteractive={true}
                onClick={handleLanternTap}
              />
            </div>
          </div>

          <p className="text-[11px] font-serif-display text-[#DCE5F2]/60 uppercase tracking-widest mt-1">
            {hasTappedLantern ? "A little warmth for you ✨" : "Tap the lantern"}
          </p>

          {/* Read Again Button (Min 48px height) */}
          <button
            onClick={() => scrollToScene(1)}
            id="read-again-btn"
            className="w-full max-w-xs h-12 mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#0B1026] border border-[#FFD58A]/40 text-[#DCE5F2] active:scale-98 active:border-[#FFD58A] active:text-[#FFD58A] shadow-lg text-xs font-serif-display tracking-widest uppercase touch-manipulation cursor-pointer transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#FFD58A]" />
            <span>{siteConfig.letter.readAgainText}</span>
          </button>
        </div>
      </section>
    </div>
  );
}
