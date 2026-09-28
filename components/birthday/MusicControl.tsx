"use client";

import { Music2, VolumeX, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { birthdayConfig } from "@/lib/birthday-config";

// Global reference so any interaction can trigger music playback seamlessly
let globalStartMusic: (() => void) | null = null;

export function triggerGlobalMusic() {
  if (globalStartMusic) {
    globalStartMusic();
  }
}

export function MusicControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | undefined>(undefined);
  const isPlayingRef = useRef(false);

  const stopMusic = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    isPlayingRef.current = false;
    setIsPlaying(false);
  }, []);

  const playMelody = useCallback(() => {
    if (isPlayingRef.current) return;

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Resume context in case browser held it in suspended state
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Happy Birthday notes (frequency in Hz, duration in seconds)
      const melody: ReadonlyArray<[number, number]> = [
        [392, 0.3], // Sol
        [392, 0.3], // Sol
        [440, 0.6], // La
        [392, 0.6], // Sol
        [523.25, 0.6], // Do
        [493.88, 1.1], // Si
        [392, 0.3], // Sol
        [392, 0.3], // Sol
        [440, 0.6], // La
        [392, 0.6], // Sol
        [587.33, 0.6], // Ré
        [523.25, 1.1], // Do
        [392, 0.3], // Sol
        [392, 0.3], // Sol
        [783.99, 0.6], // Sol haut
        [659.25, 0.6], // Mi
        [523.25, 0.6], // Do
        [493.88, 0.6], // Si
        [440, 0.9], // La
        [698.46, 0.35], // Fa
        [698.46, 0.35], // Fa
        [659.25, 0.6], // Mi
        [523.25, 0.6], // Do
        [587.33, 0.6], // Ré
        [523.25, 1.3], // Do
      ];

      const scheduleLoop = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === "closed")
          return;

        let at = ctx.currentTime + 0.08;

        melody.forEach(([freq, dur]) => {
          // Main oscillator (sine + triangle for music-box chime warmth)
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();

          osc1.type = "triangle";
          osc1.frequency.setValueAtTime(freq, at);

          osc2.type = "sine";
          osc2.frequency.setValueAtTime(freq * 2, at); // harmonic shimmer

          // Music box envelope: instant pluck, exponential soft decay
          gain.gain.setValueAtTime(0.0001, at);
          gain.gain.exponentialRampToValueAtTime(0.09, at + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, at + dur * 0.92);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);

          osc1.start(at);
          osc2.start(at);
          osc1.stop(at + dur);
          osc2.stop(at + dur);

          at += dur;
        });

        // Loop the melody after a brief 1.2s peaceful pause
        const nextLoopDelay = Math.max(0, (at - ctx.currentTime + 1.2) * 1000);
        timerRef.current = window.setTimeout(scheduleLoop, nextLoopDelay);
      };

      scheduleLoop();
      isPlayingRef.current = true;
      setIsPlaying(true);
    } catch {
      // Audio autoplay policy might defer execution until first touch
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      stopMusic();
    } else {
      playMelody();
    }
  }, [isPlaying, playMelody, stopMusic]);

  useEffect(() => {
    globalStartMusic = () => {
      if (!isPlayingRef.current) {
        playMelody();
      }
    };

    // Attempt autoplay immediately on page load
    playMelody();

    // In case browser requires user gesture, automatically start on the very first touch/click anywhere!
    const handleFirstGesture = () => {
      if (!isPlayingRef.current) {
        playMelody();
      }
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener("pointerdown", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
    };

    window.addEventListener("pointerdown", handleFirstGesture, { once: true });
    window.addEventListener("touchstart", handleFirstGesture, { once: true });
    window.addEventListener("click", handleFirstGesture, { once: true });
    window.addEventListener("keydown", handleFirstGesture, { once: true });

    return () => {
      cleanupListeners();
      stopMusic();
      globalStartMusic = null;
    };
  }, [playMelody, stopMusic]);

  return (
    <button
      className={`music ${isPlaying ? "music-active" : ""}`}
      onClick={toggle}
      aria-label={
        isPlaying
          ? "Couper la musique d'anniversaire"
          : "Lancer la musique d'anniversaire"
      }
      title={
        isPlaying
          ? "Musique activée (Cliquer pour couper)"
          : "Cliquer pour activer la musique"
      }
    >
      {isPlaying ? (
        <>
          <Music2 size={17} className="music-icon-playing" />
          <span>Musique en cours</span>
          <span className="music-bars" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </>
      ) : (
        <>
          <VolumeX size={17} />
          <span>Activer la musique</span>
        </>
      )}
    </button>
  );
}
