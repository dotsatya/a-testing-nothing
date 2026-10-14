"use client";

import React, { useState } from "react";
import { CinematicBackground } from "@/components/CinematicBackground";
import { StarField } from "@/components/StarField";
import { MobileStoryExperience } from "@/components/MobileStoryExperience";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <main className="fixed inset-0 w-full h-[100svh] max-h-[100svh] overflow-hidden bg-[#0B1026] text-[#DCE5F2] selection:bg-[#FFD58A]/30 selection:text-[#FFF7E8] flex flex-col justify-between">
      {/* 1. Cinematic Background Artwork with Responsive Positioning & Atmosphere */}
      <CinematicBackground currentStep={currentStep} />

      {/* 2. Visible Romantic Falling Snow Canvas */}
      <StarField />

      {/* 3. Single-Screen In-Place Storytelling Experience with Integrated Header */}
      <MobileStoryExperience onStepChange={setCurrentStep} />
    </main>
  );
}