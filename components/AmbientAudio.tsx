"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/personalization";

export function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(siteConfig.music.defaultVolume ?? 0.3);
  const [showSlider, setShowSlider] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (siteConfig.music.customAudioUrl) {
      const audio = new Audio(siteConfig.music.customAudioUrl);
      audio.loop = true;
      audio.volume = siteConfig.music.defaultVolume ?? 0.3;
      audioRef.current = audio;

      audio.addEventListener("play", () => setIsPlaying(true));
      audio.addEventListener("pause", () => setIsPlaying(false));

      return () => {
        audio.pause();
        audio.src = "";
      };
    }
  }, []);

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  const toggleAudio = () => {
    setHasInteracted(true);
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = volume;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  // Safe first tap interaction to start audio (browser policy)
  useEffect(() => {
    const startOnFirstTap = () => {
      if (!hasInteracted && audioRef.current && !isPlaying) {
        setHasInteracted(true);
        audioRef.current.volume = volume;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
      window.removeEventListener("touchstart", startOnFirstTap);
    };

    window.addEventListener("touchstart", startOnFirstTap, { once: true });
    return () => window.removeEventListener("touchstart", startOnFirstTap);
  }, [hasInteracted, isPlaying, volume]);

  return (
    <div
      className="fixed z-50 flex items-center gap-1.5 touch-manipulation"
      style={{
        top: "max(12px, env(safe-area-inset-top, 12px))",
        right: "max(12px, env(safe-area-inset-right, 12px))",
      }}
    >
      {/* Volume slider (toggles on tap/click) */}
      {showSlider && (
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#171B3A]/95 border border-[#FFD58A]/30 backdrop-blur-md shadow-xl animate-fade-in">
          <span className="text-[10px] font-mono text-[#FFD58A]">
            {Math.round(volume * 100)}%
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            aria-label="Audio Volume"
            className="w-14 h-1 bg-[#0B1026] rounded-lg appearance-none cursor-pointer accent-[#FFD58A]"
          />
        </div>
      )}

      {/* Main Touch Button (Minimum 44px height for mobile usability) */}
      <button
        onClick={toggleAudio}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowSlider((prev) => !prev);
        }}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className="relative flex items-center gap-2 h-11 px-3.5 rounded-full bg-[#171B3A]/85 backdrop-blur-md border border-[#FFD58A]/30 text-[#DCE5F2] active:scale-95 transition-all shadow-lg shadow-[#0B1026]/80 text-xs cursor-pointer select-none"
      >
        <span className="relative flex h-2 w-2">
          {isPlaying && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD58A] opacity-75" />
          )}
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isPlaying ? "bg-[#FFD58A]" : "bg-white/40"
            }`}
          />
        </span>

        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 text-[#FFD58A]" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 opacity-60" />
        )}

        <span className="font-serif-display tracking-widest text-[11px] uppercase text-[#FFF7E8]">
          {isPlaying ? "Love Story" : "Music"}
        </span>

        {isPlaying && (
          <span className="flex items-center gap-0.5 ml-0.5">
            <span className="w-0.5 h-2 bg-[#FFD58A]/80 animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-0.5 h-3 bg-[#FFD58A]/80 animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-0.5 h-1.5 bg-[#FFD58A]/80 animate-bounce" style={{ animationDelay: "300ms" }} />
          </span>
        )}
      </button>

      {/* Subtle helper tooltip prompt on first load */}
      {!hasInteracted && !isPlaying && (
        <button
          onClick={() => setShowSlider((prev) => !prev)}
          aria-label="Volume settings"
          className="p-2 text-[#FFD58A]/70 text-[10px] hidden sm:inline"
        >
          <Sparkles className="w-3 h-3 text-[#FFD58A]" />
        </button>
      )}
    </div>
  );
}
