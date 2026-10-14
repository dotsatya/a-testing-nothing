"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  twinkleSpeed: number;
  color: string;
}

interface Ember {
  x: number;
  y: number;
  vy: number;
  size: number;
  alpha: number;
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

    // Mobile-optimized count: fewer stars to preserve mobile battery & GPU
    const starCount = isMobile ? 45 : 90;
    const colors = ["#DCE5F2", "#FFF7E8", "#FFD58A"];

    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      twinkleSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    // Floating micro-embers
    const emberCount = isMobile ? 12 : 25;
    const embers: Ember[] = Array.from({ length: emberCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vy: -(Math.random() * 0.35 + 0.15),
      size: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.6 + 0.2,
    }));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render stars
      for (const s of stars) {
        if (!prefersReducedMotion) {
          s.alpha += s.twinkleSpeed;
          if (s.alpha > 0.95 || s.alpha < 0.15) {
            s.twinkleSpeed = -s.twinkleSpeed;
          }
        }

        ctx.save();
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, s.alpha));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Render warm motes
      if (!prefersReducedMotion) {
        for (const e of embers) {
          e.y += e.vy;
          if (e.y < -10) {
            e.y = height + 10;
            e.x = Math.random() * width;
          }

          ctx.save();
          ctx.fillStyle = "#FFD58A";
          ctx.globalAlpha = e.alpha * 0.6;
          ctx.shadowBlur = 6;
          ctx.shadowColor = "#FFD58A";
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
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
      className="fixed inset-0 pointer-events-none z-0 opacity-75"
      aria-hidden="true"
    />
  );
}
