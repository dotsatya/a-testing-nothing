"use client";

import React from "react";
import { StarField } from "@/components/StarField";
import { AmbientAudio } from "@/components/AmbientAudio";
import { MobileStoryExperience } from "@/components/MobileStoryExperience";

export default function Home() {
  return (
    <main className="relative min-h-[100dvh] w-full bg-[#0B1026] text-[#DCE5F2] selection:bg-[#FFD58A]/30 selection:text-[#FFF7E8] overflow-x-hidden">
      {/* Lightweight Celestial Starry Sky Canvas */}
      <StarField />

      {/* Floating Audio Controller (Love Story by Indila - 30% Vol) */}
      <AmbientAudio />

      {/* Mobile-First 4-Scene Romantic Narrative */}
      <MobileStoryExperience />
    </main>
  );
}