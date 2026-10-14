"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/config/personalization";
import { Sparkles } from "lucide-react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-3.5 px-4 sm:px-8 flex items-center justify-between ${
        scrolled
          ? "bg-[#0B1026]/85 backdrop-blur-md border-b border-[#FFD58A]/10 shadow-lg shadow-[#060918]/60"
          : "bg-transparent"
      }`}
    >
      {/* Brand / Logo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex items-center gap-2 group cursor-pointer text-left"
      >
        <span className="text-[#FFD58A] transition-transform duration-300 group-hover:scale-110">
          🌙
        </span>
        <span className="font-serif-display text-sm sm:text-base tracking-widest uppercase text-[#FFF7E8] font-light group-hover:text-[#FFD58A] transition-colors">
          {siteConfig.title}
        </span>
      </button>

      {/* Center Nav Links */}
      <nav className="hidden md:flex items-center gap-6">
        <button
          onClick={() => scrollTo("story")}
          className="text-xs font-serif-display tracking-widest uppercase text-[#DCE5F2]/70 hover:text-[#FFD58A] transition-colors cursor-pointer"
        >
          The Story
        </button>
        <button
          onClick={() => scrollTo("letter")}
          className="text-xs font-serif-display tracking-widest uppercase text-[#DCE5F2]/70 hover:text-[#FFD58A] transition-colors cursor-pointer"
        >
          The Letter
        </button>
        <button
          onClick={() => scrollTo("kindle")}
          className="text-xs font-serif-display tracking-widest uppercase text-[#DCE5F2]/70 hover:text-[#FFD58A] transition-colors cursor-pointer"
        >
          Kindle Warmth
        </button>
      </nav>

      {/* Spacer to balance top-right audio widget */}
      <div className="w-28 sm:w-36" />
    </header>
  );
}
