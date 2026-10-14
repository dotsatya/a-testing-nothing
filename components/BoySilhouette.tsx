"use client";

import React from "react";

interface BoySilhouetteProps {
  facing?: "moon" | "lantern" | "contemplating";
  className?: string;
  size?: number;
}

export function BoySilhouette({
  facing = "moon",
  className = "",
  size = 140,
}: BoySilhouetteProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center transition-all duration-1000 ${className}`}
      style={{ width: size, height: size * 1.25 }}
    >
      <svg
        viewBox="0 0 100 120"
        className="w-full h-full filter drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
      >
        <defs>
          <linearGradient id="boySilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1B2240" />
            <stop offset="70%" stopColor="#0B1026" />
            <stop offset="100%" stopColor="#060918" />
          </linearGradient>

          {/* Golden rim highlight when facing lantern */}
          <linearGradient id="warmRimLight" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FFD58A" stopOpacity="0.5" />
            <stop offset="25%" stopColor="#FFB347" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          {/* Moonlight rim highlight when facing moon */}
          <linearGradient id="moonRimLight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DCE5F2" stopOpacity="0.6" />
            <stop offset="25%" stopColor="#8196B5" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {facing === "moon" && (
          /* Boy sitting on sill, leaning back slightly, head tilted upward towards the distant moon */
          <g>
            {/* Torso & Coat */}
            <path
              d="M 45 48 C 45 48, 55 52, 60 68 C 64 78, 62 90, 60 98 L 32 98 C 30 88, 34 76, 36 64 C 38 56, 42 50, 45 48 Z"
              fill="url(#boySilGrad)"
            />
            {/* Bent Legs drawn up on sill */}
            <path
              d="M 32 98 C 24 92, 18 80, 16 68 C 15 62, 22 60, 26 68 C 29 74, 32 86, 38 98 Z"
              fill="url(#boySilGrad)"
            />
            <path
              d="M 38 98 C 42 90, 48 85, 52 82 C 55 80, 58 84, 54 89 C 48 94, 44 97, 40 98 Z"
              fill="url(#boySilGrad)"
            />
            {/* Arms resting on knees */}
            <path
              d="M 42 58 C 36 62, 28 66, 24 72 C 22 75, 25 78, 28 75 C 33 70, 40 66, 45 64 Z"
              fill="url(#boySilGrad)"
            />
            {/* Neck */}
            <rect x="42" y="42" width="6" height="8" rx="2" fill="url(#boySilGrad)" />
            {/* Head tilted back gazing up */}
            <circle cx="43" cy="34" r="10.5" fill="url(#boySilGrad)" />
            {/* Gentle hair tufts caught in night breeze */}
            <path
              d="M 34 32 C 32 26, 38 22, 45 22 C 52 22, 54 28, 53 34 C 49 32, 42 30, 36 33 Z"
              fill="url(#boySilGrad)"
            />
            {/* Moonlight edge highlight */}
            <path
              d="M 33 28 C 34 22, 42 22, 48 23"
              stroke="url(#moonRimLight)"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        )}

        {facing === "contemplating" && (
          /* Boy sitting quietly in darkness, head slightly bowed */
          <g>
            <path
              d="M 46 48 C 46 48, 54 54, 58 70 C 60 80, 58 92, 56 98 L 34 98 C 32 90, 34 78, 38 66 C 40 58, 44 51, 46 48 Z"
              fill="url(#boySilGrad)"
            />
            <path
              d="M 34 98 C 26 94, 20 84, 18 72 C 17 66, 24 64, 28 72 C 31 78, 34 88, 40 98 Z"
              fill="url(#boySilGrad)"
            />
            <rect x="44" y="44" width="6" height="7" rx="2" fill="url(#boySilGrad)" />
            {/* Bowed Head */}
            <circle cx="43" cy="37" r="10.5" fill="url(#boySilGrad)" />
            <path
              d="M 34 35 C 33 29, 39 25, 46 25 C 52 25, 54 31, 52 37 Z"
              fill="url(#boySilGrad)"
            />
          </g>
        )}

        {facing === "lantern" && (
          /* Boy turned toward the right, looking down at the warm glowing lantern */
          <g>
            {/* Torso facing forward-right */}
            <path
              d="M 44 48 C 44 48, 56 50, 62 66 C 66 78, 64 90, 62 98 L 34 98 C 32 88, 36 76, 38 64 C 40 56, 42 50, 44 48 Z"
              fill="url(#boySilGrad)"
            />
            {/* Knees pulled close */}
            <path
              d="M 34 98 C 28 92, 24 82, 22 70 C 21 64, 28 62, 32 70 C 35 76, 38 86, 44 98 Z"
              fill="url(#boySilGrad)"
            />
            {/* Hand extending gently towards lantern warmth */}
            <path
              d="M 52 64 C 58 68, 68 72, 74 74 C 76 75, 75 78, 72 78 C 66 78, 56 74, 50 68 Z"
              fill="url(#boySilGrad)"
            />
            <rect x="46" y="42" width="6" height="8" rx="2" fill="url(#boySilGrad)" />
            {/* Head tilted forward and down towards the lantern */}
            <circle cx="48" cy="35" r="10.5" fill="url(#boySilGrad)" />
            {/* Hair */}
            <path
              d="M 39 34 C 38 27, 44 23, 51 23 C 58 23, 60 29, 57 35 Z"
              fill="url(#boySilGrad)"
            />
            {/* Warm Golden rim light reflecting on the boy's face and shoulder */}
            <path
              d="M 56 31 C 59 34, 58 39, 56 42"
              stroke="#FFD58A"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 60 62 C 64 70, 64 78, 62 86"
              stroke="#FFD58A"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
