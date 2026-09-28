"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  Heart,
  Share2,
  Check,
  Shuffle,
  Send,
  MessageCircle,
  Quote,
} from "lucide-react";
import { useState, useId, useEffect } from "react";
import { WishItem, birthdayConfig } from "@/lib/birthday-config";

interface WishesModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishes: WishItem[];
  whatsappPhone: string;
  name: string;
}

export function WishesModal({
  isOpen,
  onClose,
  wishes,
  whatsappPhone,
  name,
}: WishesModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [customAuthor, setCustomAuthor] = useState("");
  const [customWish, setCustomWish] = useState("");
  const [localWishes, setLocalWishes] = useState<WishItem[]>(wishes);
  const authorInputId = useId();
  const wishInputId = useId();

  // Reset or close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const categories = [
    "Tous",
    ...Array.from(new Set(localWishes.map((w) => w.category))),
  ];

  const filteredWishes =
    selectedCategory === "Tous"
      ? localWishes
      : localWishes.filter((w) => w.category === selectedCategory);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRandomWish = () => {
    const randomIndex = Math.floor(Math.random() * localWishes.length);
    const chosen = localWishes[randomIndex];
    setSelectedCategory("Tous");
    setHighlightedId(chosen.id);

    // Scroll to the chosen wish
    setTimeout(() => {
      const el = document.getElementById(`wish-card-${chosen.id}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const handleAddCustomWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customWish.trim()) return;

    const newWish: WishItem = {
      id: `custom-${Date.now()}`,
      category: "Amour",
      icon: "💌",
      title: customAuthor ? `Vœu de ${customAuthor}` : "Vœu du cœur",
      text: customWish.trim(),
      highlighted: true,
    };

    setLocalWishes([newWish, ...localWishes]);
    setHighlightedId(newWish.id);
    setCustomWish("");
    setCustomAuthor("");
    setSelectedCategory("Tous");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="wishes-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="wishes-modal-title"
        >
          <motion.div
            className="wishes-modal-content"
            initial={{ scale: 0.94, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 24, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="wishes-modal-header">
              <div className="wishes-header-text">
                <span className="wishes-badge">
                  <Sparkles size={14} /> {localWishes.length} Pensées & Vœux
                </span>
                <h2 id="wishes-modal-title" className="wishes-title">
                  Souhaits pour <em>{name}</em>
                </h2>
                <p className="wishes-subtitle">
                  Des messages chaleureux, inspirants et pleins d&apos;amour pour célébrer ses 21 ans.
                </p>
              </div>
              <button
                className="wishes-close-btn"
                onClick={onClose}
                aria-label="Fermer la fenêtre des souhaits"
              >
                <X size={20} />
              </button>
            </div>

            {/* Controls Bar */}
            <div className="wishes-controls-bar">
              <div className="wishes-categories" role="tablist">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={selectedCategory === cat}
                    className={`category-pill ${
                      selectedCategory === cat ? "active" : ""
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <button
                className="random-wish-btn"
                onClick={handleRandomWish}
                title="Découvrir un vœu au hasard"
              >
                <Shuffle size={15} />
                <span>Vœu surprise</span>
              </button>
            </div>

            {/* Wishes Grid / List */}
            <div className="wishes-cards-container">
              {filteredWishes.map((w, index) => {
                const isCopied = copiedId === w.id;
                const isSelected = highlightedId === w.id;
                const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                  `Joyeux Anniversaire ${name} ! 🎂✨\n\n"${w.text}"\n\n${birthdayConfig.signature}`
                )}`;

                return (
                  <motion.article
                    id={`wish-card-${w.id}`}
                    key={w.id}
                    className={`wish-card ${w.highlighted ? "highlighted" : ""} ${
                      isSelected ? "selected-flash" : ""
                    }`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="wish-card-top">
                      <span className="wish-card-cat">
                        <span>{w.icon}</span> {w.category}
                      </span>
                      <Quote className="wish-quote-icon" size={18} />
                    </div>

                    <h3 className="wish-card-title">{w.title}</h3>
                    <p className="wish-card-text">&ldquo;{w.text}&rdquo;</p>

                    <div className="wish-card-actions">
                      <button
                        className="wish-action-btn"
                        onClick={() => handleCopy(w.id, w.text)}
                        title="Copier le vœu"
                      >
                        {isCopied ? (
                          <>
                            <Check size={14} className="text-green-400" />
                            <span>Copié !</span>
                          </>
                        ) : (
                          <>
                            <Share2 size={14} />
                            <span>Copier</span>
                          </>
                        )}
                      </button>

                      <a
                        className="wish-action-btn whatsapp-btn"
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="Envoyer ce vœu directement sur WhatsApp"
                      >
                        <MessageCircle size={14} />
                        <span>Envoyer</span>
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {/* Custom wish composer */}
            <div className="custom-wish-section">
              <div className="custom-wish-header">
                <Heart size={16} className="text-pink-400" />
                <h4>Écrire un mot doux pour {name}</h4>
              </div>
              <form onSubmit={handleAddCustomWish} className="custom-wish-form">
                <div className="custom-wish-inputs">
                  <input
                    id={authorInputId}
                    type="text"
                    placeholder="Ton prénom (optionnel)"
                    value={customAuthor}
                    onChange={(e) => setCustomAuthor(e.target.value)}
                    className="custom-input author"
                  />
                  <input
                    id={wishInputId}
                    type="text"
                    placeholder="Écris ton vœu d'anniversaire..."
                    value={customWish}
                    onChange={(e) => setCustomWish(e.target.value)}
                    className="custom-input wish-text"
                    required
                  />
                </div>
                <div className="custom-wish-actions">
                  <button type="submit" className="custom-submit-btn">
                    <Sparkles size={15} />
                    <span>Ajouter à la liste</span>
                  </button>
                  {customWish.trim() && (
                    <a
                      href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                        `Joyeux 21e anniversaire ${name} ! ❤️\n\n"${customWish}"${
                          customAuthor ? `\n— ${customAuthor}` : ""
                        }`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="custom-whatsapp-btn"
                    >
                      <Send size={14} />
                      <span>Envoyer à Believe</span>
                    </a>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
