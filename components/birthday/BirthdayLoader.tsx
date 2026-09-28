"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { birthdayConfig } from "@/lib/birthday-config";
import { triggerGlobalMusic } from "./MusicControl";

interface BirthdayLoaderProps {
  onLoaded: () => void;
}

const statusMessages = [
  "Chargement des souvenirs précieux…",
  "Allumage des 21 bougies… ✨",
  "Préparation de la mélodie secrète… 🎵",
  "Création d'un instant magique… 💖",
  "La surprise est prête pour Believe ! 🎉",
];

export function BirthdayLoader({ onLoaded }: BirthdayLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 1. Preload images in parallel
    const imagesToPreload = [
      birthdayConfig.photo,
      ...birthdayConfig.gallery,
    ].filter(Boolean);

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // 2. Smoothly increment progress
    const startTime = Date.now();
    const duration = 2200; // 2.2 seconds of emotional anticipation

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculated = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(calculated);

      if (calculated >= 100) {
        clearInterval(timer);
        setIsReady(true);
        // Automatic smooth dismiss after reaching 100%
        setTimeout(() => {
          triggerGlobalMusic();
          onLoaded();
        }, 550);
      }
    }, 35);

    return () => clearInterval(timer);
  }, [onLoaded]);

  const handleManualEnter = () => {
    triggerGlobalMusic();
    onLoaded();
  };

  const currentMessageIndex = Math.min(
    statusMessages.length - 1,
    Math.floor((progress / 100) * statusMessages.length)
  );

  return (
    <motion.div
      className="birthday-loader-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
      transition={{ duration: 0.65, ease: "easeInOut" }}
      onClick={isReady ? handleManualEnter : undefined}
    >
      {/* Background ambient lighting */}
      <div className="loader-ambient-glow" />

      <motion.div
        className="loader-card"
        initial={{ opacity: 0, y: 15, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Emblem with rotating ring */}
        <div className="loader-emblem-wrapper">
          <motion.div
            className="loader-ring"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="loader-ring inner"
            animate={{ rotate: -360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          />
          <div className="loader-emblem-core">
            <span className="loader-monogram">BK</span>
            <span className="loader-age">21 ANS</span>
          </div>
        </div>

        {/* Name and greeting */}
        <h2 className="loader-title">
          Pour <em>{birthdayConfig.name}</em>
        </h2>

        {/* Progress bar container */}
        <div className="loader-progress-box">
          <div className="loader-progress-track">
            <motion.div
              className="loader-progress-fill"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <div className="loader-percentage-row">
            <span className="loader-percent-num">{progress}%</span>
            <span className="loader-sparkle">
              <Sparkles size={13} className="text-amber-300 animate-spin" />
            </span>
          </div>
        </div>

        {/* Dynamic status message */}
        <AnimatePresence mode="wait">
          <motion.p
            key={currentMessageIndex}
            className="loader-status-text"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            {statusMessages[currentMessageIndex]}
          </motion.p>
        </AnimatePresence>

        {/* Fast enter button if ready or impatient */}
        <div className="loader-footer-hint">
          {isReady ? (
            <motion.button
              type="button"
              className="loader-enter-btn"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={handleManualEnter}
            >
              <Heart size={14} className="text-rose-400" />
              <span>Entrer dans la surprise</span>
            </motion.button>
          ) : (
            <span className="loader-subhint">Un instant précieux se prépare…</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
