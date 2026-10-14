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
  const [activeScene, setActiveScene] = useState(0); // 0 = Hero, 1 = Moon, 2 = Lantern, 3 = Realization, 4 = Letter
  const [lanternSparks, setLanternSparks] = useState<SparkleParticle[]>([]);
  const [hasTappedLantern, setHasTappedLantern] = useState(false);

  // Smooth scroll to scene
  const scrollToScene = (sceneId: string) => {
    const el = document.getElementById(sceneId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Replay from start
  const handleReplay = () => {
    setHasTappedLantern(false);
    setLanternSparks([]);
    scrollToScene("hero");
  };

  // Track active scene based on scroll position
  useEffect(() => {
    const sectionIds = ["hero", "scene-1", "scene-2", "scene-3", "scene-4"];

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
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

  // Final Scene Lantern Tap: brightens, golden glow expands, sparks rise, hidden message reveals
  const handleLanternTap = () => {
    setHasTappedLantern(true);
    const newSparks: SparkleParticle[] = Array.from({ length: 16 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 180,
      y: -(Math.random() * 140 + 30),
      size: Math.random() * 3.5 + 2,
    }));
    setLanternSparks(newSparks);
    setTimeout(() => setLanternSparks([]), 2200);
  };

  return (
    <div className="relative w-full max-w-md mx-auto min-h-screen px-4 sm:px-6">
      {/* Minimalist Scene Progress Indicator (Mobile Sticky) */}
      <nav
        aria-label="Story Progress"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#171B3A]/85 backdrop-blur-md border border-[#FFD58A]/25 shadow-lg shadow-[#0B1026]/90 touch-manipulation"
        style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        {["hero", "scene-1", "scene-2", "scene-3", "scene-4"].map((secId, idx) => (
          <button
            key={secId}
            onClick={() => scrollToScene(secId)}
            aria-label={`Jump to scene ${idx === 0 ? "opening" : idx}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 touch-manipulation cursor-pointer ${
              activeScene === idx
                ? "bg-[#FFD58A] scale-125 shadow-[0_0_8px_#FFD58A]"
                : "bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </nav>

      {/* ============================================================== */}
      {/* HERO SECTION — THE OPENING SCENE                               */}
      {/* ============================================================== */}
      <section
        id="hero"
        className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center py-8 text-center"
        style={{
          paddingTop: "max(2.5rem, env(safe-area-inset-top, 2.5rem))",
          paddingBottom: "max(3rem, env(safe-area-inset-bottom, 3rem))",
        }}
      >
        {/* Dedication Tag */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#171B3A]/70 border border-[#FFD58A]/20 text-[#FFF7E8] text-[11px] font-serif-display tracking-widest uppercase shadow-sm"
        >
          <Sparkles className="w-3 h-3 text-[#FFD58A]" />
          <span>
            {siteConfig.herName
              ? `A little universe for ${siteConfig.herName}`
              : "A quiet story for you"}
          </span>
        </motion.div>

        {/* Luminous Moon & Quiet Window with glowing lantern */}
        <div className="relative my-auto flex flex-col items-center justify-center py-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mb-4"
          >
            <MoonIllustration size={145} phase="full" />
          </motion.div>

          {/* Small lantern resting on windowsill emitting warm golden light */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center -mt-3"
          >
            <div className="w-24 h-1 bg-[#232A55] rounded-full mx-auto" />
            <div className="absolute -top-12">
              <LanternIllustration size={65} intensity="warm" isInteractive={false} />
            </div>
          </motion.div>
        </div>

        {/* Typography & Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="w-full flex flex-col items-center gap-3.5 mt-auto"
        >
          <h1 className="font-serif-display text-2xl sm:text-3xl text-[#FFF7E8] font-light leading-snug glow-text-moon px-1">
            {siteConfig.hero.heading}
          </h1>

          <p className="font-serif-display text-base text-[#DCE5F2]/80 italic font-light px-3">
            &ldquo;{siteConfig.hero.supportingText}&rdquo;
          </p>

          <button
            onClick={() => scrollToScene("scene-1")}
            id="primary-cta-btn"
            className="w-full max-w-xs h-12 mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#171B3A] via-[#232A55] to-[#171B3A] border border-[#FFD58A]/50 text-[#FFF7E8] active:scale-98 active:border-[#FFD58A] shadow-[0_0_20px_rgba(255,213,138,0.25)] text-sm font-serif-display tracking-widest uppercase touch-manipulation cursor-pointer transition-all"
          >
            <span>{siteConfig.hero.ctaButton}</span>
          </button>
        </motion.div>
      </section>

      {/* ============================================================== */}
      {/* SCENE 1 — THE MOON                                             */}
      {/* ============================================================== */}
      <section
        id="scene-1"
        className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center py-8 text-center border-t border-[#FFD58A]/10"
        style={{
          paddingTop: "max(2.5rem, env(safe-area-inset-top, 2.5rem))",
          paddingBottom: "max(3rem, env(safe-area-inset-bottom, 3rem))",
        }}
      >
        {/* Distant moon illuminating a quiet night */}
        <div className="w-full flex justify-end pr-4 pt-2">
          <div className="opacity-80 scale-90">
            <MoonIllustration size={110} phase="distant" />
          </div>
        </div>

        {/* Boy silhouette looking at the distant moon */}
        <div className="relative my-auto w-full max-w-xs h-56 flex items-end justify-center rounded-2xl bg-[#0B1026]/70 border border-[#FFD58A]/15 backdrop-blur-md px-6 pb-2 overflow-hidden shadow-xl">
          <div className="absolute inset-x-0 bottom-0 h-6 bg-[#0E132E] border-t border-[#232A55] z-10" />

          {/* Moonlight cool beam */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background: "radial-gradient(ellipse at 80% 20%, rgba(220, 229, 242, 0.25) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-20 pb-2">
            <BoySilhouette size={105} facing="moon" />
          </div>
        </div>

        {/* Narrative passage */}
        <div className="w-full flex flex-col items-center gap-3 mt-auto px-2">
          <p className="font-serif-display text-lg sm:text-xl text-[#FFF7E8]/90 font-light leading-relaxed">
            {siteConfig.scenes.scene1.text}
          </p>

          <button
            onClick={() => scrollToScene("scene-2")}
            className="w-full max-w-xs h-11 mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#171B3A]/80 border border-[#FFD58A]/30 text-[#DCE5F2] hover:text-[#FFF7E8] active:scale-98 text-xs font-serif-display tracking-widest uppercase touch-manipulation cursor-pointer transition-all"
          >
            <span>Turn to the window</span>
            <ChevronDown className="w-4 h-4 text-[#FFD58A]" />
          </button>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SCENE 2 — THE LANTERN                                          */}
      {/* ============================================================== */}
      <section
        id="scene-2"
        className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center py-8 text-center border-t border-[#FFD58A]/10"
        style={{
          paddingTop: "max(2.5rem, env(safe-area-inset-top, 2.5rem))",
          paddingBottom: "max(3rem, env(safe-area-inset-bottom, 3rem))",
        }}
      >
        {/* Softly fading distant moon */}
        <div className="w-full flex justify-end pr-4 pt-2">
          <div className="opacity-60 scale-75">
            <MoonIllustration size={90} phase="distant" />
          </div>
        </div>

        {/* Windowsill with Glowing Lantern beside the boy */}
        <div className="relative my-auto w-full max-w-xs h-56 flex items-end justify-center rounded-2xl bg-[#0B1026]/75 border border-[#FFD58A]/20 backdrop-blur-md px-6 pb-2 overflow-hidden shadow-xl">
          <div className="absolute inset-x-0 bottom-0 h-6 bg-[#0E132E] border-t border-[#232A55] z-10" />

          {/* Golden glow from lantern spreading over sill */}
          <div
            className="absolute inset-0 pointer-events-none opacity-35"
            style={{
              background: "radial-gradient(circle at 75% 75%, rgba(255, 213, 138, 0.4) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-20 pb-2 mr-5">
            <BoySilhouette size={95} facing="moon" />
          </div>

          <div className="relative z-20 pb-1">
            <LanternIllustration size={85} intensity="warm" isInteractive={false} />
          </div>
        </div>

        {/* Narrative passage */}
        <div className="w-full flex flex-col items-center gap-3 mt-auto px-2">
          <p className="font-serif-display text-lg sm:text-xl text-[#FFD58A] font-light leading-relaxed glow-text-gold">
            {siteConfig.scenes.scene2.text}
          </p>

          <button
            onClick={() => scrollToScene("scene-3")}
            className="w-full max-w-xs h-11 mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#171B3A]/80 border border-[#FFD58A]/30 text-[#DCE5F2] hover:text-[#FFF7E8] active:scale-98 text-xs font-serif-display tracking-widest uppercase touch-manipulation cursor-pointer transition-all"
          >
            <span>When darkness came</span>
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
        {/* Clouds cover the moon */}
        <div className="w-full flex justify-center pt-2">
          <div className="opacity-25 scale-75">
            <MoonIllustration size={85} phase="obscured" />
          </div>
        </div>

        {/* Boy turns toward the lantern bathed in warm golden illumination */}
        <div className="relative my-auto w-full max-w-xs h-60 flex items-end justify-center rounded-2xl bg-gradient-to-t from-[#1C1838]/95 to-[#0B1026]/85 border border-[#FFD58A]/30 backdrop-blur-md px-6 pb-2 overflow-hidden shadow-2xl">
          <div className="absolute inset-x-0 bottom-0 h-6 bg-[#0E132E] border-t border-[#FFD58A]/25 z-10" />

          {/* Warm radiant golden illumination filling the scene */}
          <div
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{
              background: "radial-gradient(circle at 65% 70%, rgba(255, 213, 138, 0.5) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-20 pb-2 mr-3">
            <BoySilhouette size={100} facing="lantern" />
          </div>

          <div className="relative z-20 pb-1">
            <LanternIllustration size={95} intensity="radiant" isInteractive={false} />
          </div>
        </div>

        {/* Emotional center texts */}
        <div className="w-full flex flex-col items-center gap-3.5 mt-auto px-2">
          <p className="font-serif-display text-base sm:text-lg text-[#FFF7E8]/90 font-light leading-relaxed">
            &ldquo;{siteConfig.scenes.scene3.text}&rdquo;
          </p>

          <div className="p-3.5 rounded-xl bg-[#171B3A]/70 border border-[#FFD58A]/35 w-full max-w-xs shadow-md">
            <p className="font-serif-display text-base text-[#FFD58A] font-light leading-relaxed glow-text-gold">
              {siteConfig.scenes.scene3.revelation}
            </p>
          </div>

          <button
            onClick={() => scrollToScene("scene-4")}
            className="w-full max-w-xs h-11 mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#232A55] to-[#171B3A] border border-[#FFD58A]/50 text-[#FFF7E8] active:scale-98 text-xs font-serif-display tracking-widest uppercase touch-manipulation cursor-pointer transition-all shadow-md"
          >
            <span>A letter for you</span>
            <ChevronDown className="w-4 h-4 text-[#FFD58A]" />
          </button>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SCENE 4 — THE LETTER & INTERACTION                             */}
      {/* ============================================================== */}
      <section
        id="scene-4"
        className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center py-8 text-center border-t border-[#FFD58A]/10"
        style={{
          paddingTop: "max(2.5rem, env(safe-area-inset-top, 2.5rem))",
          paddingBottom: "max(4.5rem, env(safe-area-inset-bottom, 4.5rem))",
        }}
      >
        {/* Header */}
        <div className="w-full text-center mb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#171B3A]/80 border border-[#FFD58A]/25 text-[#FFD58A] text-[11px] font-serif-display tracking-widest uppercase mb-2">
            <Heart className="w-3 h-3 text-[#FFD58A] fill-[#FFD58A]/50" />
            <span>A Midnight Letter</span>
          </div>

          <h2 className="font-serif-display text-xl sm:text-2xl text-[#FFF7E8] font-light leading-snug glow-text-gold">
            {siteConfig.letter.heading}
          </h2>
        </div>

        {/* Soft Ivory Letter Parchment */}
        <div className="relative my-auto w-full max-w-xs sm:max-w-sm rounded-2xl p-5 sm:p-6 bg-[#171B3A]/85 border border-[#FFD58A]/30 backdrop-blur-xl shadow-2xl text-left">
          <div className="space-y-3.5 font-serif-display text-sm sm:text-base text-[#FFF7E8]/90 font-light leading-relaxed">
            {siteConfig.letter.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={idx === siteConfig.letter.paragraphs.length - 1 ? "text-[#FFD58A] font-normal pt-1" : ""}
              >
                {p}
              </p>
            ))}

            {siteConfig.personalNote && (
              <p className="italic text-[#FFD58A]/90 pt-2 border-t border-[#FFD58A]/20 text-sm">
                {siteConfig.personalNote}
              </p>
            )}
          </div>

          <div className="mt-5 pt-4 border-t border-[#FFD58A]/20 flex items-center justify-between">
            <p className="font-romantic text-lg sm:text-xl text-[#FFD58A]">
              {siteConfig.myName ? `With warmth, ${siteConfig.myName} ♡` : siteConfig.letter.closing}
            </p>
            <Sparkles className="w-4 h-4 text-[#FFD58A]" />
          </div>
        </div>

        {/* Interactive Lantern: Tap to brighten & reveal hidden message */}
        <div className="w-full flex flex-col items-center mt-3 mb-2">
          <div className="relative flex items-center justify-center">
            {lanternSparks.map((spark) => (
              <span
                key={spark.id}
                className="absolute w-2 h-2 rounded-full bg-[#FFF7E8] shadow-[0_0_10px_#FFD58A] pointer-events-none animate-ping"
                style={{
                  transform: `translate(${spark.x}px, ${spark.y}px)`,
                  animationDuration: "1.4s",
                }}
              />
            ))}

            <button
              onClick={handleLanternTap}
              aria-label="Kindle the lantern"
              className="p-2 cursor-pointer touch-manipulation active:scale-95 transition-transform"
            >
              <LanternIllustration
                size={75}
                intensity={hasTappedLantern ? "intense" : "warm"}
                isInteractive={true}
                onClick={handleLanternTap}
              />
            </button>
          </div>

          {/* Reveal Hidden Message When Tapped */}
          <AnimatePresence>
            {hasTappedLantern ? (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-xs mt-2 px-3 py-2.5 rounded-xl bg-[#171B3A]/90 border border-[#FFD58A]/40 shadow-lg text-center"
              >
                <p className="font-serif-display text-xs sm:text-sm text-[#FFD58A] leading-relaxed">
                  &ldquo;{siteConfig.letter.hiddenLanternMessage}&rdquo;
                </p>
              </motion.div>
            ) : (
              <p className="text-[11px] font-serif-display text-[#DCE5F2]/60 uppercase tracking-widest mt-1">
                Tap the lantern
              </p>
            )}
          </AnimatePresence>

          {/* Replay Button (Min 48px height) */}
          <button
            onClick={handleReplay}
            id="read-again-btn"
            className="w-full max-w-xs h-12 mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#0B1026] border border-[#FFD58A]/40 text-[#DCE5F2] active:scale-98 active:border-[#FFD58A] active:text-[#FFD58A] shadow-lg text-xs font-serif-display tracking-widest uppercase touch-manipulation cursor-pointer transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#FFD58A]" />
            <span>{siteConfig.letter.replayButtonText}</span>
          </button>
        </div>
      </section>
    </div>
  );
}
