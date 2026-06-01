"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect, useCallback, memo } from "react";

interface RevealTextProps {
  text?: string;
  /** Tailwind class for the resting (white) state */
  textColor?: string;
  /** Tailwind class for the sweep-overlay colour */
  overlayColor?: string;
  /**
   * Tailwind font-size class OR a raw CSS value via Tailwind arbitrary value.
   * Prefer clamp()-based classes for responsiveness.
   */
  fontSize?: string;
  /** Gap (in seconds) between each letter's entrance stagger */
  letterDelay?: number;
  /** Gap (in seconds) between each letter's overlay sweep stagger */
  overlayDelay?: number;
  /** How long each letter's sweep overlay lasts (seconds) */
  overlayDuration?: number;
  /**
   * Approximate spring settle time in ms — used to calculate when to
   * trigger the sweep overlay (after all letters have entered).
   */
  springDuration?: number;
  /** One image URL per letter (extras are cycled). */
  letterImages?: string[];
}

// ─── Single letter — memoised to prevent cross-sibling re-renders ─────────────
const AnimatedLetter = memo(function AnimatedLetter({
  letter,
  index,
  isHovered,
  showOverlay,
  imageUrl,
  fontSize,
  textColor,
  overlayColor,
  letterDelay,
  overlayDelay,
  overlayDuration,
  onMouseEnter,
  onMouseLeave,
  prefersReducedMotion,
}: {
  letter: string;
  index: number;
  isHovered: boolean;
  showOverlay: boolean;
  imageUrl: string;
  fontSize: string;
  textColor: string;
  overlayColor: string;
  letterDelay: number;
  overlayDelay: number;
  overlayDuration: number;
  onMouseEnter: (i: number) => void;
  onMouseLeave: () => void;
  prefersReducedMotion: boolean;
}) {
  return (
    <motion.span
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={onMouseLeave}
      className={`font-black leading-none cursor-pointer relative select-none whitespace-pre`}
      style={{ letterSpacing: "-0.03em", fontSize: fontSize }}
      initial={prefersReducedMotion ? false : { scale: 0.6, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
            delay: index * letterDelay,
            type: "spring",
            stiffness: 260,
            damping: 22,
            mass: 0.6,
          }
      }
    >
      {/* ── Layer 1: solid white text ─────────────────────────────── */}
      <motion.span
        className={`absolute inset-0 ${textColor}`}
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        aria-hidden={isHovered}
      >
        {letter}
      </motion.span>

      {/* ── Layer 2: image fill (bg-clip-text trick) ──────────────── */}
      <motion.span
        className="text-transparent bg-clip-text bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          backgroundSize: isHovered ? "130%" : "110%",
        }}
        transition={{
          opacity: { duration: 0.22, ease: "easeOut" },
          backgroundSize: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
        }}
        aria-hidden={!isHovered}
      >
        {letter}
      </motion.span>

      {/* ── Layer 3: coloured sweep overlay (runs once after entrance) */}
      {showOverlay && (
        <motion.span
          className={`absolute inset-0 ${overlayColor} pointer-events-none`}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scaleX: [0, 1, 1, 1],
          }}
          transition={{
            delay: index * overlayDelay,
            duration: overlayDuration,
            times: [0, 0.08, 0.65, 1],
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "left center" }}
        >
          {letter}
        </motion.span>
      )}

      {/*
       * Invisible layer that always takes space so the container
       * keeps its width regardless of which layer is "showing".
       */}
      <span className="invisible">{letter}</span>
    </motion.span>
  );
});

// ─── Main Export ──────────────────────────────────────────────────────────────
export function RevealText({
  text = "STUNNING",
  textColor = "text-white",
  overlayColor = "text-red-500",
  fontSize = "clamp(80px, 14vw, 210px)",
  letterDelay = 0.07,
  overlayDelay = 0.045,
  overlayDuration = 0.48,
  springDuration = 700,
  letterImages = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=800&q=80",
  ],
}: RevealTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const prefersReducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (prefersReducedMotion) {
      setShowOverlay(true);
      return;
    }
    // Wait until the last letter's spring has settled, then run the sweep.
    const totalDelay = (text.length - 1) * letterDelay * 1000 + springDuration;
    const id = setTimeout(() => setShowOverlay(true), totalDelay);
    return () => clearTimeout(id);
  }, [text.length, letterDelay, springDuration, prefersReducedMotion]);

  // Stable callbacks — prevent re-renders of sibling letters on hover changes
  const handleMouseEnter = useCallback((i: number) => setHoveredIndex(i), []);
  const handleMouseLeave = useCallback(() => setHoveredIndex(null), []);

  return (
    <div
      className="flex items-center justify-center flex-wrap gap-0 w-full"
      role="text"
      aria-label={text}
    >
      {text.split("").map((letter, index) => (
        <AnimatedLetter
          key={index}
          letter={letter === " " ? "\u00A0" : letter}
          index={index}
          isHovered={hoveredIndex === index}
          showOverlay={showOverlay}
          imageUrl={letterImages[index % letterImages.length]}
          fontSize={fontSize}
          textColor={textColor}
          overlayColor={overlayColor}
          letterDelay={letterDelay}
          overlayDelay={overlayDelay}
          overlayDuration={overlayDuration}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </div>
  );
}
