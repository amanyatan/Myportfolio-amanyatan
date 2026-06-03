"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()".split("");

const getRandomChar = () => alphabets[Math.floor(Math.random() * alphabets.length)];

interface HyperTextProps {
  text: string;
  duration?: number;
  framerProps?: Variants;
  className?: string;
  animateOnLoad?: boolean;
  style?: React.CSSProperties;
}

export default function HyperText({
  text,
  duration = 800,
  framerProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
  },
  className,
  animateOnLoad = true,
  style,
}: HyperTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState(text);
  const [triggerCount, setTriggerCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggerCount(prev => prev + 1);
          if (animateOnLoad) {
            // Once triggered on load, we can stop observing if we want it to only happen once
            // observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [animateOnLoad]);

  useEffect(() => {
    let iteration = 0;
    const maxIterations = text.length;

    // Initial scramble or reset to target text
    if (triggerCount === 0) {
      setDisplayText(text);
      return;
    }

    const interval = setInterval(() => {
      if (iteration < maxIterations) {
        setDisplayText(() =>
          text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i <= Math.floor(iteration)) return text[i];
              return getRandomChar();
            })
            .join("")
        );
        iteration += 0.2;
      } else {
        setDisplayText(text);
        clearInterval(interval);
      }
    }, duration / (maxIterations * 5));

    return () => clearInterval(interval);
  }, [text, duration, triggerCount]);

  return (
    <div
      ref={containerRef}
      className="flex cursor-default overflow-hidden"
      onMouseEnter={() => setTriggerCount(prev => prev + 1)}
    >
      <motion.h1
        className={className}
        style={{ ...style, display: 'flex', whiteSpace: 'pre' }}
        {...framerProps}
      >
        {displayText.split("").map((char, i) => (
          <span key={i} style={{ display: 'inline-block' }}>
            {char === " " ? "\u00A0" : char.toUpperCase()}
          </span>
        ))}
      </motion.h1>
    </div>
  );
}
