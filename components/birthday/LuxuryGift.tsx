"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { useState } from "react";

interface LuxuryGiftProps {
  onOpen: () => void;
  name: string;
}

export function LuxuryGift({ onOpen, name }: LuxuryGiftProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Play fairy chime sound effect
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioCtx();
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
      let time = ctx.currentTime;
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, time + i * 0.08);
        gain.gain.setValueAtTime(0.0001, time + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.08, time + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + i * 0.08 + 0.7);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time + i * 0.08);
        osc.stop(time + i * 0.08 + 0.75);
      });
    } catch {}

    setTimeout(onOpen, 750);
  };

  return (
    <div className="luxury-gift-container" onClick={handleOpen}>
      {/* Floating magical butterfly & hearts around box */}
      <motion.div
        className="gift-butterfly b1"
        animate={{ y: [-8, 8, -8], x: [-6, 6, -6], rotate: [-8, 8, -8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        🦋
      </motion.div>
      <motion.div
        className="gift-butterfly b2"
        animate={{ y: [6, -10, 6], x: [8, -8, 8], rotate: [10, -10, 10] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        ✨
      </motion.div>

      {/* Haute Couture Luxury Gift Box */}
      <motion.div
        className={`luxury-gift-box ${isOpening ? "opening" : ""}`}
        animate={
          isOpening
            ? { scale: [1, 1.15, 1.25], opacity: [1, 1, 0] }
            : { y: [0, -8, 0], rotate: [-1.5, 1.5, -1.5] }
        }
        transition={
          isOpening
            ? { duration: 0.75, ease: "easeOut" }
            : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
        }
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        title="Cliquer pour dénouer le ruban et ouvrir"
      >
        {/* Glow halo */}
        <div className="gift-halo" />

        {/* Gift Box Lid with Satin Bow */}
        <motion.div
          className="gift-box-lid"
          animate={isOpening ? { y: -80, rotate: -15, opacity: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Silken ribbon bow */}
          <div className="satin-bow">
            <span className="bow-loop left" />
            <span className="bow-knot" />
            <span className="bow-loop right" />
            <span className="bow-ribbon-tail left" />
            <span className="bow-ribbon-tail right" />
          </div>
        </motion.div>

        {/* Gift Box Body */}
        <div className="gift-box-body">
          <div className="gift-ribbon-vertical" />
          <div className="gift-ribbon-horizontal" />

          {/* Luxury embossed label */}
          <div className="gift-tag-pendant">
            <Heart size={11} className="text-rose-400" />
            <span>Pour {name}</span>
          </div>
        </div>
      </motion.div>

      <span className="gift-tap-hint">
        <Sparkles size={13} className="text-amber-300" /> Touche le paquet pour l&apos;ouvrir
      </span>
    </div>
  );
}
