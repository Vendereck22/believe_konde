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
  RotateCcw,
  Heart,
  Crown,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { birthdayConfig } from "@/lib/birthday-config";
import { Cake } from "./Cake";
import { FloatingPetals } from "./FloatingPetals";
import { LuxuryGift } from "./LuxuryGift";
import { MusicControl, triggerGlobalMusic } from "./MusicControl";
import { PhotoLightbox } from "./PhotoLightbox";
import { WishesModal } from "./WishesModal";
import { BirthdayLoader } from "./BirthdayLoader";

type Stage = "welcome" | "gift" | "cake" | "wish" | "final";
const flowers = ["✦", "✿", "♡", "✾", "✧", "❀", "♥", "🌸"];

const photoCaptions = [
  "Sourire d'ange & douceur 🌸",
  "Élégance & style iconique ✨",
  "Éclat & joie de vivre 💖",
];

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
        particleCount: 140,
        spread: 85,
        origin: { y: 0.6 },
        colors: ["#ffe4a8", "#f9a8d4", "#f472b6", "#ffffff", "#ffd166"],
      });
      setTimeout(
        () =>
          confetti({
            particleCount: 90,
            angle: 60,
            spread: 70,
            origin: { x: 0 },
            colors: ["#fbcfe8", "#f472b6", "#ffe4a8"],
          }),
        350
      );
      setTimeout(
        () =>
          confetti({
            particleCount: 90,
            angle: 120,
            spread: 70,
            origin: { x: 1 },
            colors: ["#fbcfe8", "#f472b6", "#ffe4a8"],
          }),
        650
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
        const v =
          data.reduce((n, x) => n + Math.abs(x - 128), 0) / data.length;
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
      (prev) => (prev - 1 + birthdayConfig.wishes.length) % birthdayConfig.wishes.length
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

  useEffect(() => () => stream.current?.getTracks().forEach((t) => t.stop()), []);

  return (
    <div className={`experience ${stage}`}>
      <AnimatePresence>
        {isLoading && (
          <BirthdayLoader onLoaded={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Floating Rose Petals & Interactive Touch Sparkle Trail */}
      <FloatingPetals />
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
            <Eyebrow>Pour une femme d&apos;exception • 21 ans d&apos;éclat</Eyebrow>
            <h1>
              Pour la plus radieuse,
              <br />
              <em>{birthdayConfig.name}</em> ✨
            </h1>
            <p>
              Prends un instant rien que pour toi. Cette surprise a été créée
              pour célébrer ta beauté, ta grâce et ton grand cœur.
            </p>
            <div className="welcome-buttons">
              <Primary onClick={goToGiftStage}>
                <Gift size={18} />
                Découvrir ma surprise
              </Primary>
            </div>
          </Scene>
        )}

        {/* Stage 2: Haute Couture Luxury Gift Box */}
        {stage === "gift" && (
          <Scene key="gift">
            <Eyebrow>un présent tout en délicatesse</Eyebrow>
            <h2>
              Un petit trésor
              <br />
              pour toi… 🌸
            </h2>
            <LuxuryGift
              name={birthdayConfig.name}
              onOpen={() => {
                triggerGlobalMusic();
                setStage("cake");
              }}
            />
            <p className="gift-subtext">
              Dénoue le ruban de soie dorée pour révéler ce qui t&apos;attend.
            </p>
          </Scene>
        )}

        {/* Stage 3: Birthday Cake with Princess Avatar */}
        {(stage === "cake" || stage === "wish") && (
          <Scene key="cake">
            <Cake blown={blown} isBlowing={isBlowing} />

            {stage === "cake" && (
              <>
                <Eyebrow>ferme les yeux un instant</Eyebrow>
                <h2>
                  Fais un vœu secret… <span>💖</span>
                </h2>
                <p>
                  {isBlowing
                    ? "Believe souffle ses bougies avec grâce… ✨"
                    : "L'avatar royal de Believe attend ton signal pour souffler les 21 bougies !"}
                </p>
                <div className="actions">
                  <button
                    className="primary blow-cake-btn"
                    onClick={triggerBlowing}
                    disabled={isBlowing || blown}
                    id="blow-cake-button"
                  >
                    <Wind size={19} className={isBlowing ? "animate-spin" : ""} />
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
                    Le micro n&apos;est pas accessible — clique simplement sur le bouton
                    &ldquo;Souffle le gâteau&rdquo;.
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
                <h2>Vœu confié aux étoiles… ✨</h2>
              </motion.div>
            )}
          </Scene>
        )}

        {/* Stage 4: Final celebration */}
        {stage === "final" && (
          <Scene key="final">
            <Eyebrow>notre reine du jour • 21 ans d&apos;amour</Eyebrow>
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Joyeux 21e anniversaire
              <br />
              <em>{birthdayConfig.name}</em> <span>👑❤️</span>
            </motion.h1>

            {/* Clickable Portrait Avatar with Crown & Halo */}
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
              title="Cliquer pour admirer en grand écran"
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

            {/* Romantic Love Note / Mots doux Card */}
            <motion.div
              className="love-letter-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div className="love-letter-header">
                <Crown size={15} className="text-amber-300" />
                <span>Mots doux pour Believe</span>
                <Heart size={14} className="text-rose-400" />
              </div>
              <p className="love-letter-text">
                &ldquo;À 21 ans, le monde t&apos;appartient. Que cette année soit
                celle de tes plus belles réussites, d&apos;une joie inaltérable
                et d&apos;un bonheur sans nuage. Reste toujours cette femme forte,
                lumineuse et merveilleuse.&rdquo;
              </p>
            </motion.div>

            {/* Active Wish Quote Box with Carousel controls */}
            <motion.div
              className="featured-wish-box"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
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
                  Pensée {currentWishIndex + 1} / {birthdayConfig.wishes.length}
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
                  Voir tous les vœux & souhaits ({birthdayConfig.wishesDetails.length}) ✨
                </span>
              </button>
            </motion.div>

            {/* Polaroid Photo Gallery with Pins & Captions */}
            {allPhotos.length > 0 && (
              <motion.div
                className="gallery-section"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
              >
                <div className="gallery-header">
                  <Images size={15} />
                  <span>Galerie de souvenirs précieux</span>
                </div>
                <div className="polaroid-gallery" aria-label="Souvenirs précieux en photo">
                  {allPhotos.map((src, index) => (
                    <motion.div
                      key={src}
                      className="polaroid-card"
                      whileHover={{ scale: 1.08, y: -8, rotate: 0 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setLightboxIndex(index)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Agrandir la photo souvenir ${index + 1}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setLightboxIndex(index);
                        }
                      }}
                    >
                      <span className="polaroid-pin" />
                      <div className="polaroid-photo-wrapper">
                        <img
                          src={src}
                          alt={`Souvenir ${index + 1} de ${birthdayConfig.name}`}
                        />
                      </div>
                      <span className="polaroid-caption">
                        {photoCaptions[index % photoCaptions.length]}
                      </span>
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
                  "Merci infiniment pour cette magnifique surprise pour mes 21 ans ! ❤️🎂✨"
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
            prev !== null ? (prev + 1) % allPhotos.length : 0
          )
        }
        onPrev={() =>
          setLightboxIndex((prev) =>
            prev !== null
              ? (prev - 1 + allPhotos.length) % allPhotos.length
              : 0
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
