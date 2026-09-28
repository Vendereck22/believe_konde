"use client";

import confetti from "canvas-confetti";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Gift,
  MessageCircleHeart,
  Mic,
  Sparkles,
  Wind,
  Images,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  RotateCcw,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { birthdayConfig } from "@/lib/birthday-config";
import { Cake } from "./Cake";
import { FloatingParticles } from "./FloatingParticles";
import { MusicControl, triggerGlobalMusic } from "./MusicControl";
import { PhotoLightbox } from "./PhotoLightbox";
import { WishesModal } from "./WishesModal";
import { BirthdayLoader } from "./BirthdayLoader";

type Stage = "welcome" | "gift" | "cake" | "wish" | "final";
const flowers = ["✦", "✿", "♡", "✾", "✧", "❀", "♥"];

export function BirthdayExperience() {
  const [isLoading, setIsLoading] = useState(true);
  const [stage, setStage] = useState<Stage>("welcome");
  const [blown, setBlown] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);
  const [mic, setMic] = useState<"idle" | "listening" | "denied">("idle");
  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  const [showWishesModal, setShowWishesModal] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const reduced = useReducedMotion();
  const stream = useRef<MediaStream | null>(null);

  const allPhotos = [
    birthdayConfig.photo,
    ...birthdayConfig.gallery.filter((p) => p !== birthdayConfig.photo),
  ].filter(Boolean);

  const celebrate = useCallback(() => {
    if (!reduced) {
      confetti({
        particleCount: 130,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#ffe4a8", "#f9a8d4", "#c4b5fd", "#ffffff"],
      });
      setTimeout(
        () =>
          confetti({
            particleCount: 85,
            angle: 60,
            spread: 65,
            origin: { x: 0 },
          }),
        400,
      );
      setTimeout(
        () =>
          confetti({
            particleCount: 85,
            angle: 120,
            spread: 65,
            origin: { x: 1 },
          }),
        700,
      );
    }
    setTimeout(() => setStage("final"), 1300);
  }, [reduced]);

  // Animated blowing sequence: avatar leans forward and blows, flames flicker & go out
  const triggerBlowing = useCallback(() => {
    if (blown || isBlowing) return;
    setIsBlowing(true);
    triggerGlobalMusic();

    setTimeout(() => {
      setBlown(true);
      setIsBlowing(false);
      stream.current?.getTracks().forEach((t) => t.stop());
      setMic("idle");
      setStage("wish");
      setTimeout(celebrate, 1100);
    }, 1100);
  }, [blown, isBlowing, celebrate]);

  const startMic = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.current = s;
      setMic("listening");
      const audioCtx = new AudioContext();
      const analyser = audioCtx.createAnalyser();
      const source = audioCtx.createMediaStreamSource(s);
      source.connect(analyser);
      const data = new Uint8Array(analyser.fftSize);
      const check = () => {
        analyser.getByteTimeDomainData(data);
        const v = data.reduce((n, x) => n + Math.abs(x - 128), 0) / data.length;
        if (v > 12) {
          triggerBlowing();
        } else if (!blown && !isBlowing) {
          requestAnimationFrame(check);
        }
      };
      check();
    } catch {
      setMic("denied");
    }
  };

  const handleNextWish = () => {
    setCurrentWishIndex((prev) => (prev + 1) % birthdayConfig.wishes.length);
  };

  const handlePrevWish = () => {
    setCurrentWishIndex(
      (prev) =>
        (prev - 1 + birthdayConfig.wishes.length) %
        birthdayConfig.wishes.length,
    );
  };

  const restartExperience = () => {
    setBlown(false);
    setIsBlowing(false);
    setStage("welcome");
  };

  const goToGiftStage = () => {
    triggerGlobalMusic();
    setStage("gift");
  };

  useEffect(
    () => () => stream.current?.getTracks().forEach((t) => t.stop()),
    [],
  );

  return (
    <div className={`experience ${stage}`}>
      <AnimatePresence>
        {isLoading && <BirthdayLoader onLoaded={() => setIsLoading(false)} />}
      </AnimatePresence>

      <FloatingParticles />
      <MusicControl />

      {/* Rain of flowers when on final stage */}
      {stage === "final" && (
        <div className="flower-rain" aria-hidden="true">
          {Array.from({ length: 32 }, (_, i) => (
            <i
              key={i}
              style={{
                left: `${(i * 23) % 100}%`,
                animationDelay: `${-(i % 9) * 0.55}s`,
              }}
            >
              {flowers[i % flowers.length]}
            </i>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* Stage 1: Welcome */}
        {stage === "welcome" && (
          <Scene key="welcome">
            <Eyebrow>Pour quelqu&apos;un d&apos;exceptionnel</Eyebrow>
            <h1>
              Une petite
              <br />
              <em>surprise</em> t&apos;attend…
            </h1>
            <p>Prends un instant, cette expérience est créée juste pour toi.</p>
            <div className="welcome-buttons">
              <Primary onClick={goToGiftStage}>
                <Gift size={18} />
                Découvrir ma surprise
              </Primary>
            </div>
          </Scene>
        )}

        {/* Stage 2: Gift box */}
        {stage === "gift" && (
          <Scene key="gift">
            <motion.div
              className="gift"
              animate={{ rotate: [-2, 2, -2], y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="ribbon v" />
              <div className="ribbon h" />
              <div className="gift-lid" />
            </motion.div>
            <Eyebrow>un petit mystère</Eyebrow>
            <h2>
              Prête à découvrir
              <br />
              ce qui t&apos;attend ?
            </h2>
            <Primary
              onClick={() => {
                triggerGlobalMusic();
                setStage("cake");
              }}
            >
              <Sparkles size={18} />
              Ouvrir le cadeau
            </Primary>
          </Scene>
        )}

        {/* Stage 3: Birthday Cake with Avatar */}
        {(stage === "cake" || stage === "wish") && (
          <Scene key="cake">
            <Cake blown={blown} isBlowing={isBlowing} />

            {stage === "cake" && (
              <>
                <Eyebrow>ferme les yeux un instant</Eyebrow>
                <h2>
                  Fais un vœu… <span>✨</span>
                </h2>
                <p>
                  {isBlowing
                    ? "Believe souffle ses bougies… ✨"
                    : "L'avatar de Believe attend ton signal pour souffler les bougies !"}
                </p>
                <div className="actions">
                  <button
                    className="primary blow-cake-btn"
                    onClick={triggerBlowing}
                    disabled={isBlowing || blown}
                    id="blow-cake-button"
                  >
                    <Wind
                      size={19}
                      className={isBlowing ? "animate-spin" : ""}
                    />
                    {isBlowing ? "Souffle en cours…" : "Souffle le gâteau 🎂💨"}
                  </button>

                  <button
                    className="mic-button"
                    onClick={startMic}
                    disabled={mic === "listening" || isBlowing || blown}
                  >
                    <Mic size={18} />
                    {mic === "listening"
                      ? "J'écoute ton souffle…"
                      : "Souffler au micro"}
                  </button>
                </div>
                {mic === "denied" && (
                  <small>
                    Le micro n&apos;est pas accessible — clique simplement sur
                    le bouton &ldquo;Souffle le gâteau&rdquo;.
                  </small>
                )}
              </>
            )}

            {stage === "wish" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Eyebrow>chut…</Eyebrow>
                <h2>Vœu accepté… ✨</h2>
              </motion.div>
            )}
          </Scene>
        )}

        {/* Stage 4: Final celebration */}
        {stage === "final" && (
          <Scene key="final">
            <Eyebrow>une journée inoubliable • 21 ans</Eyebrow>
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Joyeux anniversaire
              <br />
              <em>{birthdayConfig.name}</em> <span>❤️</span>
            </motion.h1>

            {/* Clickable Portrait Avatar */}
            <motion.button
              type="button"
              className="portrait portrait-interactive"
              initial={{ opacity: 0, scale: 0.65, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                delay: 0.22,
                type: "spring",
                stiffness: 160,
                damping: 13,
              }}
              onClick={() => setLightboxIndex(0)}
              title="Cliquer pour agrandir la photo"
              aria-label={`Agrandir la photo de ${birthdayConfig.name}`}
            >
              {birthdayConfig.photo ? (
                <img
                  src={birthdayConfig.photo}
                  alt={`Portrait de ${birthdayConfig.name}`}
                />
              ) : (
                <span>
                  {birthdayConfig.name
                    .split(" ")
                    .map((x) => x[0])
                    .join("")}
                </span>
              )}
              <span className="portrait-badge">
                <Images size={12} />
              </span>
            </motion.button>

            {/* Active Wish Quote Box with Carousel controls */}
            <motion.div
              className="featured-wish-box"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="wish-box-nav">
                <button
                  onClick={handlePrevWish}
                  className="wish-nav-arrow"
                  aria-label="Vœu précédent"
                  title="Vœu précédent"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="wish-counter">
                  Souhait {currentWishIndex + 1} /{" "}
                  {birthdayConfig.wishes.length}
                </span>
                <button
                  onClick={handleNextWish}
                  className="wish-nav-arrow"
                  aria-label="Vœu suivant"
                  title="Vœu suivant"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={currentWishIndex}
                  className="message"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  &ldquo;{birthdayConfig.wishes[currentWishIndex]}&rdquo;
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* MAIN BUTTON: Voir tous les souhaits */}
            <motion.div
              className="wishes-button-wrapper"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 }}
            >
              <button
                className="view-all-wishes-btn"
                onClick={() => setShowWishesModal(true)}
                id="open-wishes-btn"
              >
                <Sparkles size={18} className="btn-sparkle-icon" />
                <span>
                  Voir tous les vœux & souhaits (
                  {birthdayConfig.wishesDetails.length})
                </span>
              </button>
            </motion.div>

            {/* Gallery of Memories */}
            {allPhotos.length > 0 && (
              <motion.div
                className="gallery-section"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
              >
                <div className="gallery-header">
                  <Images size={15} />
                  <span>Album souvenirs</span>
                </div>
                <div className="gallery" aria-label="Souvenirs en photo">
                  {allPhotos.map((src, index) => (
                    <motion.div
                      key={src}
                      className="gallery-item-wrapper"
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setLightboxIndex(index)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Agrandir la photo ${index + 1}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setLightboxIndex(index);
                        }
                      }}
                    >
                      <img
                        src={src}
                        alt={`Souvenir ${index + 1} de ${birthdayConfig.name}`}
                      />
                      <div className="gallery-hover-overlay">
                        <Sparkles size={16} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Signature */}
            <motion.p
              className="signature"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {birthdayConfig.signature}
            </motion.p>

            {/* WhatsApp Link and replay actions */}
            <div className="final-actions-row">
              <motion.a
                className="message-link"
                href={`https://wa.me/${birthdayConfig.whatsappPhone}?text=${encodeURIComponent(
                  "Merci infiniment pour cette magnifique surprise pour mes 21 ans ! ❤️🎂",
                )}`}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <MessageCircleHeart size={18} />
                Laisser un message WhatsApp
              </motion.a>

              <button
                className="replay-btn"
                onClick={restartExperience}
                title="Rejouer l'animation depuis le début"
              >
                <RotateCcw size={15} />
                <span>Rejouer</span>
              </button>
            </div>

            <div className="final-flower">✿　✦　❀　✦　✿</div>
          </Scene>
        )}
      </AnimatePresence>

      {/* Wishes Modal */}
      <WishesModal
        isOpen={showWishesModal}
        onClose={() => setShowWishesModal(false)}
        wishes={birthdayConfig.wishesDetails}
        whatsappPhone={birthdayConfig.whatsappPhone}
        name={birthdayConfig.name}
      />

      {/* Photo Lightbox */}
      <PhotoLightbox
        images={allPhotos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={() =>
          setLightboxIndex((prev) =>
            prev !== null ? (prev + 1) % allPhotos.length : 0,
          )
        }
        onPrev={() =>
          setLightboxIndex((prev) =>
            prev !== null
              ? (prev - 1 + allPhotos.length) % allPhotos.length
              : 0,
          )
        }
        name={birthdayConfig.name}
      />
    </div>
  );
}

function Scene({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      className="scene"
      initial={{ opacity: 0, scale: 0.98, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.02, y: -8 }}
      transition={{ duration: 0.55 }}
    >
      {children}
    </motion.section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow">
      <span /> {children} <span />
    </div>
  );
}

function Primary({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button className="primary" onClick={onClick}>
      {children}
    </button>
  );
}
