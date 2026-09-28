"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: "petal" | "sparkle" | "heart";
  color: string;
}

interface TouchSparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  char: string;
}

export function FloatingPetals() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Rose petals and glowing stars
    const petalColors = [
      "rgba(255, 182, 193, 0.75)", // Light pink
      "rgba(255, 192, 203, 0.8)",  // Pink
      "rgba(255, 218, 185, 0.7)",  // Peach puff
      "rgba(244, 143, 177, 0.65)", // Rose
      "rgba(255, 228, 225, 0.85)", // Misty rose
      "rgba(255, 235, 180, 0.75)", // Champagne gold
    ];

    const particles: Particle[] = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8 + 0.3,
      vy: Math.random() * 1.2 + 0.6,
      size: Math.random() * 10 + 8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      opacity: Math.random() * 0.5 + 0.4,
      type: Math.random() > 0.3 ? "petal" : Math.random() > 0.5 ? "heart" : "sparkle",
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    }));

    // Interactive finger / pointer touch trail (magic wand effect)
    const touchSparkles: TouchSparkle[] = [];
    const sparkleChars = ["✨", "💖", "🌸", "⭐", "✦"];

    const addSparkleAt = (x: number, y: number) => {
      for (let i = 0; i < 2; i++) {
        touchSparkles.push({
          x: x + (Math.random() - 0.5) * 16,
          y: y + (Math.random() - 0.5) * 16,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 1.2,
          size: Math.random() * 8 + 10,
          alpha: 1,
          color: petalColors[Math.floor(Math.random() * petalColors.length)],
          char: sparkleChars[Math.floor(Math.random() * sparkleChars.length)],
        });
      }
      if (touchSparkles.length > 40) {
        touchSparkles.splice(0, touchSparkles.length - 40);
      }
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      const y = "touches" in e ? e.touches[0].clientY : e.clientY;
      addSparkleAt(x, y);
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    // Draw realistic organic petal
    const drawPetal = (
      pCtx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rot: number,
      color: string,
      alpha: number
    ) => {
      pCtx.save();
      pCtx.translate(x, y);
      pCtx.rotate(rot);
      pCtx.globalAlpha = alpha;
      pCtx.fillStyle = color;

      // Draw curved petal path
      pCtx.beginPath();
      pCtx.moveTo(0, -size);
      pCtx.bezierCurveTo(size * 0.7, -size * 0.6, size * 0.8, size * 0.4, 0, size);
      pCtx.bezierCurveTo(-size * 0.8, size * 0.4, -size * 0.7, -size * 0.6, 0, -size);
      pCtx.fill();

      // Soft petal vein
      pCtx.strokeStyle = "rgba(255, 255, 255, 0.35)";
      pCtx.lineWidth = 0.8;
      pCtx.beginPath();
      pCtx.moveTo(0, -size * 0.8);
      pCtx.quadraticCurveTo(size * 0.1, 0, 0, size * 0.8);
      pCtx.stroke();

      pCtx.restore();
    };

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Render and update falling petals
      particles.forEach((p) => {
        p.x += p.vx + Math.sin(p.y * 0.015) * 0.6; // gentle sway
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        if (p.type === "petal") {
          drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.color, p.opacity);
        } else if (p.type === "heart") {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = p.opacity * 0.7;
          ctx.font = `${p.size * 1.1}px sans-serif`;
          ctx.fillText("♡", 0, 0);
          ctx.restore();
        } else {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.18, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      // 2. Render and update touch sparkles (magic dust)
      for (let i = touchSparkles.length - 1; i >= 0; i--) {
        const s = touchSparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.025;

        if (s.alpha <= 0) {
          touchSparkles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.font = `${s.size}px serif`;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 10;
        ctx.fillText(s.char, s.x, s.y);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="romantic-petals-canvas"
      aria-hidden="true"
    />
  );
}
