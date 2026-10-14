"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { siteConfig } from "@/config/personalization";

export function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volume = siteConfig.music.defaultVolume ?? 0.3;

  useEffect(() => {
    if (siteConfig.music.customAudioUrl) {
      const audio = new Audio(siteConfig.music.customAudioUrl);
      audio.loop = true;
      audio.volume = volume;
      audioRef.current = audio;

      audio.addEventListener("play", () => setIsPlaying(true));
      audio.addEventListener("pause", () => setIsPlaying(false));

      return () => {
        audio.pause();
        audio.src = "";
      };
    }
  }, [volume]);

  const toggleAudio = () => {
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

  return (
    <aside
      aria-label="Audio Controls"
      className="fixed z-50 flex items-center touch-manipulation"
      style={{
        top: "max(12px, env(safe-area-inset-top, 12px))",
        right: "max(12px, env(safe-area-inset-right, 12px))",
      }}
    >
      <button
        onClick={toggleAudio}
        aria-label={isPlaying ? "Pause background music" : "Play gentle background music"}
        className="flex items-center gap-2 h-10 px-3.5 rounded-full bg-[#171B3A]/90 backdrop-blur-md border border-[#FFD58A]/30 text-[#DCE5F2] hover:text-[#FFF7E8] active:scale-95 transition-all shadow-xl shadow-[#0B1026]/90 text-xs cursor-pointer select-none"
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

        <span className="font-serif-display tracking-widest text-xs uppercase text-[#FFF7E8]">
          Music
        </span>

        {isPlaying && (
          <span className="flex items-center gap-0.5 ml-0.5">
            <span className="w-0.5 h-2 bg-[#FFD58A]/80 animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-0.5 h-3 bg-[#FFD58A]/80 animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-0.5 h-1.5 bg-[#FFD58A]/80 animate-bounce" style={{ animationDelay: "300ms" }} />
          </span>
        )}
      </button>
    </aside>
  );
}
