"use client";

import React, { useEffect, useRef } from "react";

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  vy: number;
  vx: number;
  wobble: number;
  wobbleSpeed: number;
  alpha: number;
  color: string;
  glow: boolean;
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = width < 640;

    // Subtle, gentle romantic falling snow particles
    const flakeCount = isMobile ? 85 : 135;
    const colors = [
      "rgba(255, 255, 255, 0.7)",
      "rgba(242, 248, 255, 0.65)",
      "rgba(255, 250, 240, 0.65)",
      "rgba(255, 225, 160, 0.6)", // Warm lantern stardust
    ];

    const flakes: Snowflake[] = Array.from({ length: flakeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 1.5, // 1.5px - 3.7px
      vy: Math.random() * 0.85 + 0.45,  // Peaceful downward snowfall
      vx: Math.random() * 0.4 - 0.2,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.025 + 0.01,
      alpha: Math.random() * 0.25 + 0.3, // Soft subtle opacity: 0.3 to 0.55
      color: colors[Math.floor(Math.random() * colors.length)],
      glow: Math.random() > 0.35,
    }));

    // Dreamy soft bokeh snowflakes (larger, subtle glow)
    const bokehCount = isMobile ? 16 : 26;
    const bokehFlakes: Snowflake[] = Array.from({ length: bokehCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 3.2, // 3.2px - 5.7px
      vy: Math.random() * 0.55 + 0.3,
      vx: Math.random() * 0.3 - 0.15,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.018 + 0.008,
      alpha: Math.random() * 0.15 + 0.18, // Very delicate bokeh glow
      color: Math.random() > 0.3 ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 220, 150, 0.45)",
      glow: true,
    }));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render regular falling snowflakes
      for (const f of flakes) {
        if (!prefersReducedMotion) {
          f.y += f.vy;
          f.wobble += f.wobbleSpeed;
          f.x += f.vx + Math.sin(f.wobble) * 0.45;

          if (f.y > height + 8) {
            f.y = -8;
            f.x = Math.random() * width;
          }
          if (f.x > width + 8) f.x = -8;
          if (f.x < -8) f.x = width + 8;
        }

        ctx.save();
        ctx.fillStyle = f.color;
        ctx.globalAlpha = f.alpha;
        if (f.glow) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = f.color;
        }
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Render larger glowing bokeh snowflakes
      for (const b of bokehFlakes) {
        if (!prefersReducedMotion) {
          b.y += b.vy;
          b.wobble += b.wobbleSpeed;
          b.x += b.vx + Math.sin(b.wobble) * 0.35;

          if (b.y > height + 12) {
            b.y = -12;
            b.x = Math.random() * width;
          }
          if (b.x > width + 12) b.x = -12;
          if (b.x < -12) b.x = width + 12;
        }

        ctx.save();
        ctx.fillStyle = b.color;
        ctx.globalAlpha = b.alpha;
        ctx.shadowBlur = 6;
        ctx.shadowColor = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-70"
      aria-hidden="true"
    />
  );
}
