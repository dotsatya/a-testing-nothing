"use client";

import React, { useState, useEffect } from "react";
import { MoonIllustration } from "./MoonIllustration";
import { LanternIllustration } from "./LanternIllustration";
import { BoySilhouette } from "./BoySilhouette";
import { Sparkles, ChevronDown, ArrowDown } from "lucide-react";

interface ChapterData {
  id: number;
  roman: string;
  title: string;
  paragraphs: string[];
  highlight?: string;
  phase: "moon" | "distance" | "lantern-reveal" | "darkness" | "realization" | "understanding";
  boyFacing: "moon" | "contemplating" | "lantern";
  moonPhase: "full" | "distant" | "obscured";
  lanternIntensity: "subtle" | "warm" | "radiant" | "intense";
  bgGradient: string;
}

const chaptersData: ChapterData[] = [
  {
    id: 1,
    roman: "Chapter I",
    title: "The Boy Who Loved the Moon",
    paragraphs: [
      "There was once a boy who spent every night looking at the moon.",
      "He admired its beauty, waited for its light, and wished that one day it would come a little closer to him.",
    ],
    highlight: "He admired its beauty, waited for its light, and wished that one day it would come a little closer.",
    phase: "moon",
    boyFacing: "moon",
    moonPhase: "full",
    lanternIntensity: "subtle",
    bgGradient: "radial-gradient(circle at 30% 25%, rgba(27, 36, 75, 0.45) 0%, rgba(11, 16, 38, 0.95) 70%)",
  },
  {
    id: 2,
    roman: "Chapter II",
    title: "The Distance",
    paragraphs: [
      "But the moon was far away, beyond his reach.",
      "No matter how long he waited, the distance between them remained the same.",
    ],
    highlight: "No matter how long he waited, the distance between them remained the same.",
    phase: "distance",
    boyFacing: "moon",
    moonPhase: "distant",
    lanternIntensity: "subtle",
    bgGradient: "radial-gradient(circle at 70% 20%, rgba(23, 27, 58, 0.5) 0%, rgba(11, 16, 38, 0.98) 75%)",
  },
  {
    id: 3,
    roman: "Chapter III",
    title: "The Little Lantern",
    paragraphs: [
      "Meanwhile, a little lantern burned beside his window every night.",
      "It never demanded his attention or complained about being unnoticed. It simply offered its gentle light whenever the darkness grew too heavy.",
      "Yet the boy barely looked at it. He was too busy wishing for the moon.",
    ],
    highlight: "It simply offered its gentle light whenever the darkness grew too heavy.",
    phase: "lantern-reveal",
    boyFacing: "moon",
    moonPhase: "full",
    lanternIntensity: "warm",
    bgGradient: "radial-gradient(circle at 75% 65%, rgba(255, 213, 138, 0.12) 0%, rgba(23, 27, 58, 0.5) 45%, rgba(11, 16, 38, 0.95) 80%)",
  },
  {
    id: 4,
    roman: "Chapter IV",
    title: "The Night the Moon Disappeared",
    paragraphs: [
      "One night, the wind grew cold, and clouds covered the sky. The moon disappeared, and the boy sat alone in the darkness.",
      "That was when he finally noticed the little lantern still glowing beside him.",
    ],
    highlight: "That was when he finally noticed the little lantern still glowing beside him.",
    phase: "darkness",
    boyFacing: "contemplating",
    moonPhase: "obscured",
    lanternIntensity: "radiant",
    bgGradient: "radial-gradient(circle at 50% 50%, rgba(6, 8, 21, 0.98) 0%, rgba(11, 16, 38, 1) 100%)",
  },
  {
    id: 5,
    roman: "Chapter V",
    title: "The Realization",
    paragraphs: [
      "He wondered how many nights it had spent lighting his window while he was busy longing for something distant.",
      "And for the first time, he understood that the moon had never been wrong for staying far away, and the lantern had never been wrong for shining beside him.",
      "Perhaps the only mistake was believing that because one light was beyond his reach, no other light deserved his attention.",
    ],
    highlight: "The moon had never been wrong for staying far away, and the lantern had never been wrong for shining beside him.",
    phase: "realization",
    boyFacing: "lantern",
    moonPhase: "full",
    lanternIntensity: "intense",
    bgGradient: "radial-gradient(ellipse at 50% 65%, rgba(45, 38, 80, 0.5) 0%, rgba(11, 16, 38, 0.95) 75%)",
  },
  {
    id: 6,
    roman: "Chapter VI",
    title: "A Little More Understanding",
    paragraphs: [
      "The boy didn't suddenly fall in love with the lantern. Hearts don't work that way.",
      "But he learned to stop taking its warmth for granted, and to see its kindness for what it truly was.",
    ],
    highlight: "Sometimes, we become so captivated by what we cannot have that we overlook the quiet beauty of what is already around us.",
    phase: "understanding",
    boyFacing: "lantern",
    moonPhase: "full",
    lanternIntensity: "radiant",
    bgGradient: "radial-gradient(circle at 50% 50%, rgba(35, 42, 85, 0.4) 0%, rgba(11, 16, 38, 0.95) 80%)",
  },
];

export function StorySection({ onComplete }: { onComplete: () => void }) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  // Track active chapter during scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.45;
      for (let i = 0; i < chaptersData.length; i++) {
        const el = document.getElementById(`chapter-${i + 1}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveChapterIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToChapter = (idx: number) => {
    const el = document.getElementById(`chapter-${idx + 1}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="story" className="relative w-full">
      {/* Sticky Floating Chapter Progress Bar */}
      <div className="sticky top-16 z-30 w-full py-3 px-4 sm:px-8 bg-[#0B1026]/90 backdrop-blur-md border-y border-[#FFD58A]/10 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-serif-display tracking-widest uppercase">
            <span className="text-[#FFD58A] font-semibold">
              {chaptersData[activeChapterIndex].roman}
            </span>
            <span className="text-[#DCE5F2]/40 hidden sm:inline">•</span>
            <span className="text-[#FFF7E8]/90 hidden sm:inline">
              {chaptersData[activeChapterIndex].title}
            </span>
          </div>

          {/* Clickable Chapter Nav Dots */}
          <div className="flex items-center gap-2 sm:gap-3">
            {chaptersData.map((chap, idx) => (
              <button
                key={chap.id}
                onClick={() => scrollToChapter(idx)}
                aria-label={`Jump to ${chap.roman}: ${chap.title}`}
                className={`group flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                  idx === activeChapterIndex
                    ? "text-[#FFD58A]"
                    : "text-[#DCE5F2]/40 hover:text-[#FFF7E8]"
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeChapterIndex
                      ? "bg-[#FFD58A] scale-125 shadow-[0_0_8px_#FFD58A]"
                      : "bg-white/20 group-hover:bg-white/50"
                  }`}
                />
                <span className="hidden lg:inline text-[11px] font-mono">
                  {chap.roman}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Render All 6 Chapters Spaciously as Distinct Sections */}
      {chaptersData.map((chap, idx) => {
        const isReversed = idx % 2 === 1;

        return (
          <section
            key={chap.id}
            id={`chapter-${chap.id}`}
            className="relative min-h-[92vh] sm:min-h-screen w-full flex items-center justify-center py-20 px-4 sm:px-8 lg:px-14 border-b border-[#FFD58A]/10 transition-colors duration-1000 overflow-hidden"
            style={{ background: chap.bgGradient }}
          >
            {/* Ambient Background Aura */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                background:
                  chap.phase === "darkness"
                    ? "radial-gradient(circle at 75% 75%, rgba(255, 213, 138, 0.12) 0%, transparent 65%)"
                    : chap.phase === "realization" || chap.phase === "understanding"
                    ? "radial-gradient(circle at 65% 65%, rgba(255, 213, 138, 0.22) 0%, transparent 70%)"
                    : "radial-gradient(circle at 35% 35%, rgba(220, 229, 242, 0.15) 0%, transparent 70%)",
              }}
            />

            <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
              {/* Visual Scene Stage Container */}
              <div
                className={`relative w-full max-w-md sm:max-w-lg h-80 sm:h-96 md:h-[420px] rounded-3xl p-6 sm:p-8 flex items-center justify-center border border-[#FFD58A]/20 bg-[#0B1026]/80 backdrop-blur-2xl shadow-2xl shadow-[#060918]/90 overflow-hidden ${
                  isReversed ? "lg:order-2" : "lg:order-1"
                }`}
              >
                {/* Arched Window Sill Frame Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-12 border-t-2 border-[#232A55] bg-[#0E132E]/95 flex items-center justify-around z-20">
                  <span className="w-1/3 h-0.5 bg-[#FFD58A]/20" />
                  <span className="w-1/3 h-0.5 bg-[#FFD58A]/20" />
                </div>

                {/* The Moon Actor */}
                <div
                  className={`absolute z-10 transition-all duration-1000 ${
                    chap.phase === "moon"
                      ? "top-6 left-8 scale-105 opacity-100"
                      : chap.phase === "distance"
                      ? "top-4 right-8 scale-65 opacity-80"
                      : chap.phase === "darkness"
                      ? "top-6 left-8 scale-75 opacity-10 filter blur-[2px]"
                      : "top-6 left-8 scale-80 opacity-75"
                  }`}
                >
                  <MoonIllustration
                    size={chap.phase === "moon" ? 170 : 130}
                    phase={chap.moonPhase}
                  />
                </div>

                {/* The Boy Silhouette Actor */}
                <div
                  className={`absolute bottom-8 transition-all duration-1000 z-20 ${
                    chap.boyFacing === "lantern"
                      ? "left-14 sm:left-20"
                      : "left-10 sm:left-14"
                  }`}
                >
                  <BoySilhouette
                    size={135}
                    facing={chap.boyFacing}
                  />
                </div>

                {/* The Lantern Actor */}
                <div
                  className={`absolute bottom-8 right-8 sm:right-16 transition-all duration-1000 z-20 ${
                    chap.phase === "moon" || chap.phase === "distance"
                      ? "opacity-35 scale-90"
                      : "opacity-100 scale-105"
                  }`}
                >
                  <LanternIllustration
                    size={115}
                    intensity={chap.lanternIntensity}
                    isInteractive={true}
                  />
                </div>

                {/* Atmospheric Phase Tag */}
                <div className="absolute top-4 right-4 z-20 text-[10px] sm:text-xs tracking-widest uppercase font-mono px-3 py-1 rounded-full bg-[#0B1026]/85 border border-[#FFD58A]/25 text-[#FFD58A]/90 shadow-sm">
                  {chap.phase === "moon" && "The Moon's Glory"}
                  {chap.phase === "distance" && "Unreachable Distance"}
                  {chap.phase === "lantern-reveal" && "Quiet Light"}
                  {chap.phase === "darkness" && "Cold Solitude"}
                  {chap.phase === "realization" && "Waking Eyes"}
                  {chap.phase === "understanding" && "Gentle Peace"}
                </div>
              </div>

              {/* Story Text Narrative Column */}
              <div
                className={`w-full lg:w-1/2 flex flex-col justify-center text-left ${
                  isReversed ? "lg:order-1" : "lg:order-2"
                }`}
              >
                {/* Chapter Title & Subtitle */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171B3A]/80 border border-[#FFD58A]/25 text-[#FFD58A] text-xs font-serif-display tracking-widest uppercase mb-3">
                    <Sparkles className="w-3 h-3" />
                    <span>{chap.roman}</span>
                  </div>
                  <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#FFF7E8] font-light leading-snug glow-text-moon">
                    {chap.title}
                  </h2>
                  <div className="w-20 h-0.5 bg-gradient-to-r from-[#FFD58A] to-transparent mt-3" />
                </div>

                {/* Narrative Paragraphs */}
                <div className="space-y-5 mb-8">
                  {chap.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="font-serif-display text-lg sm:text-xl md:text-2xl text-[#FFF7E8]/90 font-light leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {/* Poetic Highlight Box */}
                {chap.highlight && (
                  <div className="relative p-5 rounded-2xl bg-[#171B3A]/50 border-l-3 border-[#FFD58A] backdrop-blur-sm shadow-md mb-6">
                    <p className="font-serif-display italic text-[#FFD58A] text-base sm:text-lg md:text-xl leading-relaxed">
                      &ldquo;{chap.highlight}&rdquo;
                    </p>
                  </div>
                )}

                {/* Chapter 6 Special Story Moral Card */}
                {chap.id === 6 && (
                  <div className="mt-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#171B3A] via-[#232A55] to-[#171B3A] border border-[#FFD58A]/40 shadow-2xl shadow-[#0B1026]">
                    <div className="flex items-center gap-2 mb-3 text-[#FFD58A] text-xs font-serif-display tracking-widest uppercase">
                      <Sparkles className="w-4 h-4 text-[#FFD58A]" />
                      <span className="font-semibold">Moral of the Story</span>
                    </div>
                    <p className="font-serif-display text-lg sm:text-xl text-[#FFF7E8] font-light leading-relaxed">
                      &ldquo;Sometimes, we become so captivated by what we cannot have that we overlook the quiet beauty of what is already around us. Not every light is meant to become our moon, but no light deserves to be treated as though it never mattered.&rdquo;
                    </p>
                  </div>
                )}

                {/* Pacing Scroll Cue */}
                <div className="mt-8 flex items-center gap-3 text-xs sm:text-sm font-serif-display tracking-widest text-[#DCE5F2]/50 uppercase">
                  {chap.id < 6 ? (
                    <button
                      onClick={() => scrollToChapter(chap.id)}
                      className="flex items-center gap-2 hover:text-[#FFD58A] transition-colors cursor-pointer group"
                    >
                      <span>Next chapter</span>
                      <ChevronDown className="w-4 h-4 text-[#FFD58A] group-hover:translate-y-1 transition-transform" />
                    </button>
                  ) : (
                    <button
                      onClick={onComplete}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#171B3A] border border-[#FFD58A]/50 text-[#FFF7E8] hover:text-[#FFD58A] hover:border-[#FFD58A] shadow-lg transition-all cursor-pointer group"
                    >
                      <span>Read the personal letter</span>
                      <ArrowDown className="w-4 h-4 text-[#FFD58A] group-hover:translate-y-1 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
