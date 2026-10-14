"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/personalization";
import { Heart, Sparkles, Feather, Image as ImageIcon } from "lucide-react";

export function LetterSection() {
  const [isOpened, setIsOpened] = useState(true);

  return (
    <section
      id="letter"
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-4 sm:px-6 md:px-8 overflow-hidden"
    >
      {/* Ambient background glow for intimate letter reading */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 213, 138, 0.15) 0%, rgba(217, 166, 176, 0.08) 45%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Section Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171B3A]/80 border border-[#FFD58A]/30 text-[#FFD58A] text-xs font-serif-display tracking-widest uppercase mb-4 shadow-sm">
          <Feather className="w-3.5 h-3.5" />
          <span>A midnight note</span>
        </div>

        <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#FFF7E8] font-light leading-snug glow-text-gold">
          And perhaps, this is what I wanted you to know...
        </h2>
      </div>

      {/* The Parchment Letter Container */}
      <div className="relative z-20 w-full max-w-3xl mx-auto">
        {/* Subtle decorative outer corner flourishes */}
        <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#FFD58A]/50 rounded-tl-lg pointer-events-none" />
        <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-[#FFD58A]/50 rounded-tr-lg pointer-events-none" />
        <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-[#FFD58A]/50 rounded-bl-lg pointer-events-none" />
        <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#FFD58A]/50 rounded-br-lg pointer-events-none" />

        <div className="parchment-card parchment-gold-border rounded-3xl p-6 sm:p-10 md:p-14 relative backdrop-blur-2xl shadow-2xl">
          {/* Subtle Wax Seal Motif at top center */}
          <div className="flex justify-center -mt-2 mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8C3B4E] to-[#451B27] border-2 border-[#FFD58A]/50 shadow-[0_0_15px_rgba(217,166,176,0.4)] flex items-center justify-center text-[#FFF7E8]">
              <Heart className="w-5 h-5 fill-[#FFD58A]/80 text-[#FFD58A]" />
            </div>
          </div>

          {/* Letter Salutation */}
          <div className="mb-8">
            <p className="font-romantic text-2xl sm:text-3xl text-[#FFD58A]">
              {siteConfig.herName ? `Dearest ${siteConfig.herName},` : "To someone very dear,"}
            </p>
          </div>

          {/* Main Poetic Letter Text */}
          <div className="space-y-6 text-[#FFF7E8]/95 font-serif-display text-lg sm:text-xl md:text-2xl font-light leading-relaxed">
            <p className="font-normal text-[#FFD58A] glow-text-gold">
              Not every light is meant to become our moon.
            </p>

            <p>
              Some lights enter our lives quietly. They stay through ordinary nights, offer warmth without asking for attention, and make the darkness feel a little less lonely.
            </p>

            <p>
              Maybe we spend so much time wishing for the extraordinary that we forget to appreciate the beautiful things already within our reach.
            </p>

            <p>
              And if there is one thing this little story reminds me of, it is this: the people who bring warmth into our lives deserve to be seen, appreciated, and treated with care.
            </p>

            <p className="p-4 rounded-xl bg-[#171B3A]/40 border-l-2 border-[#FFD58A]/60 italic text-[#FFF7E8]">
              Because being someone&apos;s light is a beautiful thing — but being seen, understood, and genuinely chosen is beautiful too.
            </p>

            {/* Optional Personal Note from Config */}
            {siteConfig.personalNote && (
              <div className="mt-8 pt-6 border-t border-[#FFD58A]/20">
                <p className="font-serif-display italic text-[#FFD58A]/90 text-lg sm:text-xl">
                  {siteConfig.personalNote}
                </p>
              </div>
            )}
          </div>

          {/* Optional Photo Memories / Polaroids if added to config */}
          {siteConfig.photos && siteConfig.photos.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#FFD58A]/20">
              <div className="flex items-center gap-2 mb-6 text-[#FFD58A] text-xs font-serif-display tracking-widest uppercase">
                <ImageIcon className="w-4 h-4" />
                <span>Quiet Memories</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {siteConfig.photos.map((photo, i) => (
                  <div
                    key={i}
                    className="p-3 bg-[#0B1026] rounded-xl border border-[#FFD58A]/20 shadow-lg group hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div className="w-full h-48 bg-[#171B3A] rounded-lg overflow-hidden flex items-center justify-center">
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-romantic text-lg text-[#FFF7E8] mt-3 text-center">
                      {photo.caption}
                    </p>
                    {photo.date && (
                      <p className="text-[11px] font-mono text-[#FFD58A]/60 text-center">
                        {photo.date}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Signature Block */}
          <div className="mt-12 pt-8 border-t border-[#FFD58A]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#DCE5F2]/50 font-mono mb-1">
                From a quiet corner of the night
              </p>
              <p className="font-romantic text-2xl sm:text-3xl text-[#FFD58A]">
                {siteConfig.myName
                  ? `Written with warmth, by ${siteConfig.myName} ♡`
                  : "Written with a little warmth, just for you. ♡"}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-serif-display text-[#DCE5F2]/60 bg-[#171B3A]/60 px-3 py-1.5 rounded-full border border-[#FFD58A]/15">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD58A]" />
              <span>A light that stays</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
