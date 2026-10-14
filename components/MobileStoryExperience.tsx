"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig, StoryPart } from "@/config/personalization";
import { RotateCcw, ArrowRight, ArrowLeft } from "lucide-react";
import { AmbientAudio } from "./AmbientAudio";

interface MobileStoryExperienceProps {
  onStepChange?: (step: number) => void;
}

export function MobileStoryExperience({ onStepChange }: MobileStoryExperienceProps) {
  // 0 = Initial Screen, 1 = Part 1, 2 = Part 2, 3 = Part 3, 4 = Part 4
  const [currentStep, setCurrentStep] = useState(0);

  const setStep = (step: number) => {
    setCurrentStep(step);
    if (onStepChange) onStepChange(step);
  };

  const handleStartStory = () => {
    setStep(1);
  };

  const handleNextPart = () => {
    if (currentStep < 4) {
      setStep(currentStep + 1);
    }
  };

  const handlePrevPart = () => {
    if (currentStep > 1) {
      setStep(currentStep - 1);
    } else {
      setStep(0);
    }
  };

  const handleReadAgain = () => {
    setStep(0);
  };

  const currentPartData: StoryPart | undefined =
    currentStep >= 1 && currentStep <= 4 ? siteConfig.storyParts[currentStep - 1] : undefined;

  return (
    <div
      className="relative w-full h-[100svh] max-h-[100svh] flex flex-col justify-between items-center overflow-hidden px-3 sm:px-4 select-none z-10"
      style={{
        paddingTop: "max(0.75rem, env(safe-area-inset-top, 0.75rem))",
        paddingBottom: "max(1rem, env(safe-area-inset-bottom, 1rem))",
        paddingLeft: "max(0.75rem, env(safe-area-inset-left, 0.75rem))",
        paddingRight: "max(0.75rem, env(safe-area-inset-right, 0.75rem))",
      }}
    >
      {/* ============================================================== */}
      {/* 1. TOP HEADER: DEDICATION TITLE CENTERED AT THE VERY TOP       */}
      {/* Full width across the top with zero overlap                    */}
      {/* ============================================================== */}
      <header className="w-full text-center pt-1 z-20">
        <p className="font-serif-display text-xs sm:text-sm tracking-widest uppercase text-[#FFD58A] glow-text-gold px-2">
          {siteConfig.herName
            ? `A little story for ${siteConfig.herName} ♡`
            : siteConfig.intro.badge}
        </p>
      </header>

      {/* ============================================================== */}
      {/* 2. MUSIC BUTTON: DOWN SIDE OF THE HEADER ON THE RIGHT SIDE     */}
      {/* Placed below the header line on the right, completely separate */}
      {/* ============================================================== */}
      <div
        className="fixed z-40 touch-manipulation right-3 sm:right-5"
        style={{
          top: "max(2.5rem, calc(env(safe-area-inset-top, 0.75rem) + 1.8rem))",
        }}
      >
        <AmbientAudio isStandalone={false} />
      </div>

      {/* ============================================================== */}
      {/* 3. CONTENT OF THE STEPS IN THE EXACT MIDDLE OF THE SCREEN      */}
      {/* Vertically and horizontally centered with my-auto              */}
      {/* ============================================================== */}
      <main className="w-full max-w-sm sm:max-w-md my-auto flex flex-col items-center justify-center text-center px-2 py-2 z-20">
        <AnimatePresence mode="wait">
          {currentStep === 0 ? (
            /* ---------------------------------------------------------- */
            /* INITIAL SCREEN                                             */
            /* ---------------------------------------------------------- */
            <motion.div
              key="intro-screen"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-center justify-center"
            >
              {/* Main Heading */}
              <h1 className="font-serif-display text-[clamp(1.6rem,5.6vw,2.3rem)] font-light text-[#FFF7E8] leading-tight glow-text-moon mb-3 sm:mb-4 px-1">
                {siteConfig.intro.heading}
              </h1>

              {/* Short Introductory Passage */}
              <p className="font-serif-display text-[clamp(1.1rem,4.5vw,1.3rem)] text-[#DCE5F2]/95 font-light leading-[1.68] max-w-sm sm:max-w-md mb-5 sm:mb-6 px-1 drop-shadow-[0_2px_10px_rgba(11,16,38,0.95)]">
                {siteConfig.intro.passage}
              </p>

              {/* Refined "Read the story ✨" Button */}
              <button
                onClick={handleStartStory}
                id="read-story-btn"
                type="button"
                className="min-h-[48px] h-12 w-full max-w-[240px] sm:max-w-[260px] inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#171B3A]/90 via-[#232A55]/90 to-[#171B3A]/90 backdrop-blur-md border border-[#FFD58A]/50 text-[#FFF7E8] hover:border-[#FFD58A] active:scale-98 shadow-[0_0_22px_rgba(255,213,138,0.25)] text-sm sm:text-base font-serif-display tracking-widest uppercase touch-manipulation cursor-pointer transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD58A]"
              >
                <span>{siteConfig.intro.buttonText}</span>
              </button>
            </motion.div>
          ) : (
            /* ---------------------------------------------------------- */
            /* STORYTELLING VIEW (PARTS 1 TO 4) — MIDDLE OF THE SCREEN    */
            /* ---------------------------------------------------------- */
            <motion.div
              key={`story-part-${currentStep}`}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-center justify-center"
            >
              {/* Progress Indicator */}
              <div className="inline-flex items-center gap-2 mb-2.5">
                <span className="text-xs sm:text-[13px] font-serif-display uppercase tracking-widest text-[#FFD58A]/90 px-3.5 py-0.5 rounded-full bg-[#171B3A]/85 border border-[#FFD58A]/30 backdrop-blur-md shadow-sm">
                  {currentStep} of 4
                </span>
              </div>

              {/* Part Subtitle */}
              <h2 className="font-serif-display text-[clamp(1.38rem,4.8vw,1.85rem)] font-light text-[#FFF7E8] leading-tight glow-text-moon mb-2 sm:mb-3 px-1">
                Part {currentStep} — {currentPartData?.subtitle}
              </h2>

              {/* Story Part Passage */}
              <p className="font-serif-display text-[clamp(1.1rem,4.5vw,1.3rem)] text-[#FFF7E8]/95 font-light leading-[1.68] max-w-sm sm:max-w-md mb-5 sm:mb-6 px-1 drop-shadow-[0_2px_10px_rgba(11,16,38,0.95)]">
                {currentPartData?.text}
              </p>

              {/* Navigation Controls */}
              <div className="flex items-center justify-center gap-3 w-full">
                {/* Back button (Parts 2, 3, 4) */}
                {currentStep > 1 && (
                  <button
                    onClick={handlePrevPart}
                    type="button"
                    aria-label="Previous story part"
                    className="min-h-[48px] h-12 w-12 inline-flex items-center justify-center rounded-full bg-[#171B3A]/85 backdrop-blur-md border border-[#FFD58A]/35 text-[#DCE5F2] hover:text-[#FFF7E8] active:scale-95 transition-all shadow-md touch-manipulation cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 text-[#FFD58A]" />
                  </button>
                )}

                {/* Primary Action Button */}
                {currentStep < 4 ? (
                  <button
                    onClick={handleNextPart}
                    id="next-part-btn"
                    type="button"
                    className="min-h-[48px] h-12 px-8 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#171B3A]/90 via-[#232A55]/90 to-[#171B3A]/90 backdrop-blur-md border border-[#FFD58A]/50 text-[#FFF7E8] hover:border-[#FFD58A] active:scale-98 shadow-[0_0_18px_rgba(255,213,138,0.22)] text-sm sm:text-base font-serif-display tracking-widest uppercase touch-manipulation cursor-pointer transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD58A]"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4 text-[#FFD58A]" />
                  </button>
                ) : (
                  <button
                    onClick={handleReadAgain}
                    id="read-again-btn"
                    type="button"
                    className="min-h-[48px] h-12 px-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#171B3A]/90 backdrop-blur-md border border-[#FFD58A]/45 text-[#FFD58A] hover:text-[#FFF7E8] hover:border-[#FFD58A] active:scale-98 shadow-lg text-sm sm:text-base font-serif-display tracking-wider uppercase touch-manipulation cursor-pointer transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD58A]"
                  >
                    <RotateCcw className="w-4 h-4 text-[#FFD58A]" />
                    <span>{siteConfig.replayButtonText}</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ============================================================== */}
      {/* 4. FOOTER: CREATOR CREDIT                                      */}
      {/* ============================================================== */}
      <footer className="w-full flex items-center justify-center pb-1 sm:pb-2 z-20 pointer-events-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#171B3A]/60 backdrop-blur-md border border-[#FFD58A]/20 shadow-[0_4px_16px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-[#FFD58A]/45 hover:bg-[#171B3A]/80">
          <p className="text-xs sm:text-sm font-serif-display tracking-widest text-[#DCE5F2]/80">
            Created by{" "}
            <span className="text-[#FFD58A] font-medium glow-text-gold">
              {siteConfig.creatorName || "Ranajit"}
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}
