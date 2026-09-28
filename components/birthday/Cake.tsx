"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wind, Crown, Heart } from "lucide-react";
import { useEffect } from "react";
import { birthdayConfig } from "@/lib/birthday-config";

interface CakeProps {
  blown: boolean;
  isBlowing?: boolean;
}

export function Cake({ blown, isBlowing = false }: CakeProps) {
  // Synthesize a soft wind whoosh when blowing starts
  useEffect(() => {
    if (isBlowing || blown) {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        const ctx = new AudioCtx();
        const bufferSize = ctx.sampleRate * 0.85;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(380, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.3);
        filter.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.8);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.25);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
      } catch {
        // Audio policy fallback
      }
    }
  }, [isBlowing, blown]);

  return (
    <div className="cake-stage-container">
      {/* Interactive Birthday Avatar waiting or blowing */}
      <motion.div
        className={`cake-avatar-wrapper ${isBlowing ? "avatar-blowing" : ""} ${
          blown ? "avatar-happy" : "avatar-waiting"
        }`}
        animate={
          isBlowing
            ? { y: [0, 16, 12], scale: [1, 1.1, 1.06], rotate: [-1, 2, 0] }
            : blown
            ? { y: [0, -6, 0], scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }
            : { y: [0, -5, 0], scale: [1, 1.02, 1] }
        }
        transition={
          isBlowing
            ? { duration: 0.8, ease: "easeOut" }
            : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {/* Crown on top of avatar */}
        <motion.div
          className="avatar-crown"
          animate={{ rotate: [-3, 3, -3], y: [0, -2, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <Crown size={22} className="crown-icon" />
          <span className="crown-jewel" />
        </motion.div>

        {/* Avatar Portrait Picture */}
        <div className="cake-avatar-circle">
          <img
            src={birthdayConfig.photo || "/images/IMG_3887.jpg"}
            alt={`Avatar de ${birthdayConfig.name}`}
            className="cake-avatar-img"
          />
          <div className="cake-avatar-glow" />
        </div>

        {/* Speech/Emotion Bubble */}
        <AnimatePresence mode="wait">
          {!blown && !isBlowing && (
            <motion.div
              key="waiting-bubble"
              className="avatar-bubble"
              initial={{ opacity: 0, scale: 0.8, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <span>J&apos;attends ton signal… ✨</span>
            </motion.div>
          )}

          {isBlowing && (
            <motion.div
              key="blowing-bubble"
              className="avatar-bubble blowing"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.1 }}
              exit={{ opacity: 0 }}
            >
              <span>Ffffouuuuh ! 💨</span>
            </motion.div>
          )}

          {blown && (
            <motion.div
              key="blown-bubble"
              className="avatar-bubble happy"
              initial={{ opacity: 0, scale: 0.8, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Heart size={14} className="bubble-heart" />
              <span>Vœu envoyé aux étoiles ! ✨</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wind Gust stream shooting from Avatar to the candles when blowing */}
        {isBlowing && (
          <div className="wind-gust-effect" aria-hidden="true">
            <motion.div
              className="wind-stream stream-1"
              initial={{ opacity: 0, scaleY: 0, y: -10 }}
              animate={{ opacity: [0, 0.9, 0], scaleY: [0.5, 1.4, 0.8], y: [0, 60, 90] }}
              transition={{ duration: 0.7, repeat: 2 }}
            />
            <motion.div
              className="wind-stream stream-2"
              initial={{ opacity: 0, scaleY: 0, y: -10 }}
              animate={{ opacity: [0, 0.9, 0], scaleY: [0.4, 1.3, 0.7], y: [0, 65, 95] }}
              transition={{ duration: 0.65, delay: 0.1, repeat: 2 }}
            />
            <motion.div
              className="wind-stream stream-3"
              initial={{ opacity: 0, scaleY: 0, y: -10 }}
              animate={{ opacity: [0, 0.9, 0], scaleY: [0.5, 1.2, 0.6], y: [0, 55, 85] }}
              transition={{ duration: 0.6, delay: 0.05, repeat: 2 }}
            />
            <motion.span
              className="wind-particle p1"
              initial={{ opacity: 0, x: -10, y: 0 }}
              animate={{ opacity: [0, 1, 0], x: [-10, -25, -35], y: [0, 45, 80] }}
              transition={{ duration: 0.6 }}
            >
              💨
            </motion.span>
            <motion.span
              className="wind-particle p2"
              initial={{ opacity: 0, x: 10, y: 0 }}
              animate={{ opacity: [0, 1, 0], x: [10, 25, 35], y: [0, 50, 85] }}
              transition={{ duration: 0.65, delay: 0.08 }}
            >
              💨
            </motion.span>
          </div>
        )}
      </motion.div>

      {/* Birthday Cake */}
      <motion.div
        className="cake-wrap"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Gâteau d'anniversaire avec cinq bougies"
      >
        <div className="candles">
          {[0, 1, 2, 3, 4].map((c) => (
            <div className="candle" key={c}>
              <motion.i
                className="flame"
                animate={
                  blown
                    ? { scale: 0, opacity: 0 }
                    : isBlowing
                    ? {
                        scale: [1, 0.5, 0.1],
                        rotate: [-15, 25, -30],
                        opacity: [1, 0.7, 0.3],
                      }
                    : { scale: [1, 0.8, 1], rotate: [-4, 4, -4] }
                }
                transition={{
                  duration: blown ? 0.4 : isBlowing ? 0.3 : 0.42,
                  repeat: blown ? 0 : isBlowing ? 3 : Infinity,
                }}
              />
              {(blown || isBlowing) && <span className="smoke" />}
            </div>
          ))}
        </div>
        <div className="cake-top" />
        <div className="cake-body">
          <span />
          <span />
          <span />
        </div>
        <div className="cake-base" />
      </motion.div>
    </div>
  );
}
