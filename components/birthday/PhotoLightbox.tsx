"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useEffect } from "react";

interface PhotoLightboxProps {
  images: string[];
  currentIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  name: string;
}

export function PhotoLightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  name,
}: PhotoLightboxProps) {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < images.length;

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              onClick={onClose}
              aria-label="Fermer la vue plein écran"
            >
              <X size={22} />
            </button>

            {images.length > 1 && (
              <>
                <button
                  className="lightbox-nav prev"
                  onClick={onPrev}
                  aria-label="Image précédente"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  className="lightbox-nav next"
                  onClick={onNext}
                  aria-label="Image suivante"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <motion.div
              key={currentIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="lightbox-img-wrapper"
            >
              <img
                src={images[currentIndex!]}
                alt={`Photo de ${name} (${currentIndex! + 1}/${images.length})`}
                className="lightbox-img"
              />
            </motion.div>

            <div className="lightbox-footer">
              <span className="lightbox-tag">
                <Sparkles size={14} /> {name}
              </span>
              <span className="lightbox-counter">
                {currentIndex! + 1} / {images.length}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
