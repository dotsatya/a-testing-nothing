"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { siteConfig } from "@/config/personalization";

interface AmbientAudioProps {
  className?: string;
  isStandalone?: boolean;
}

export function AmbientAudio({ className = "", isStandalone = false }: AmbientAudioProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userPausedRef = useRef(false);
  const wasPlayingBeforeLeaveRef = useRef(false);
  const volume = siteConfig.music.defaultVolume ?? 0.3;

  useEffect(() => {
    if (!siteConfig.music.customAudioUrl) return;

    const audio = new Audio(siteConfig.music.customAudioUrl);
    audio.loop = true;
    audio.volume = volume;
    audio.preload = "auto";
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    // Function to attempt autoplay
    const attemptAutoplay = () => {
      if (userPausedRef.current) return;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            wasPlayingBeforeLeaveRef.current = true;
          })
          .catch(() => {
            // Autoplay blocked by browser policy until user gesture
            setIsPlaying(false);
          });
      }
    };

    // 1. Automatically play when website opens
    attemptAutoplay();

    // 2. Fallback: If blocked by browser autoplay policy, start on first user interaction anywhere
    const handleFirstInteraction = () => {
      if (!userPausedRef.current && audio.paused) {
        attemptAutoplay();
      }
      removeInteractionListeners();
    };

    const interactionEvents = ["click", "touchstart", "pointerdown", "keydown"];
    const removeInteractionListeners = () => {
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, handleFirstInteraction);
      });
    };

    interactionEvents.forEach((event) => {
      window.addEventListener(event, handleFirstInteraction, { passive: true });
    });

    // 3. When user leaves the website (tab hidden, window minimized, navigation away) -> stop music
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Left the website / tab switched
        if (!audio.paused) {
          wasPlayingBeforeLeaveRef.current = true;
          audio.pause();
        }
      } else {
        // Returned to website
        if (wasPlayingBeforeLeaveRef.current && !userPausedRef.current) {
          audio.play().catch(() => {});
        }
      }
    };

    const handleLeave = () => {
      audio.pause();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handleLeave);
    window.addEventListener("beforeunload", handleLeave);

    return () => {
      removeInteractionListeners();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handleLeave);
      window.removeEventListener("beforeunload", handleLeave);
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.src = "";
    };
  }, [volume]);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      userPausedRef.current = true;
      wasPlayingBeforeLeaveRef.current = false;
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      userPausedRef.current = false;
      wasPlayingBeforeLeaveRef.current = true;
      audioRef.current.volume = volume;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {});
    }
  };

  const containerClasses = isStandalone
    ? `fixed z-50 touch-manipulation top-3 right-3 sm:top-4 sm:right-4 ${className}`
    : `relative z-30 touch-manipulation flex items-center shrink-0 ${className}`;

  return (
    <div
      aria-label="Audio Controls"
      className={containerClasses}
      style={
        isStandalone
          ? {
              top: "max(0.75rem, env(safe-area-inset-top, 0.75rem))",
              right: "max(0.75rem, env(safe-area-inset-right, 0.75rem))",
            }
          : undefined
      }
    >
      <button
        onClick={toggleAudio}
        aria-label={isPlaying ? "Pause background music" : "Play gentle background music"}
        className="flex items-center gap-1.5 min-h-[36px] h-9 px-3 rounded-full bg-[#171B3A]/85 backdrop-blur-md border border-[#FFD58A]/35 text-[#DCE5F2] hover:text-[#FFF7E8] hover:border-[#FFD58A] active:scale-95 transition-all shadow-lg shadow-[#0B1026]/80 text-[11px] cursor-pointer select-none"
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

        <span className="font-serif-display tracking-widest text-[10px] uppercase text-[#FFF7E8]">
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
    </div>
  );
}
