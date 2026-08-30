import React, { useState, useEffect } from 'react';

export const InstaCharacter = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [frames, setFrames] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and window resize
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Import all PNG frames from the assets folder
    const frameModules = import.meta.glob(
      '@/assets/Video Frame Extractor 2026-08-26 9_16_43 GMT+5_30/*.png',
      { eager: true }
    );

    // Extract and sort frames by name to ensure correct order
    const frameList = Object.entries(frameModules)
      .map(([, module]) => module.default)
      .sort((a, b) => {
        const aNum = parseInt(a.match(/(\d+)\.png/)?.[1] || '0');
        const bNum = parseInt(b.match(/(\d+)\.png/)?.[1] || '0');
        return aNum - bNum;
      });

    setFrames(frameList);
  }, []);

  useEffect(() => {
    if (frames.length === 0) return;

    // Slower speed (copied from character 1 logic) — slows the fast flicker of the insta frames
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length);
    }, 400);

    return () => clearInterval(interval);
  }, [frames]);

  if (frames.length === 0) {
    return null;
  }

  // Size similar to character 1: 200px desktop, 140px mobile
  const size = isMobile ? 140 : 200;

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: 0,
        width: `${size}px`,
        height: `${size}px`,
        imageRendering: 'pixelated',
        zIndex: 15,
        pointerEvents: 'none',
      }}
    >
      <img
        src={frames[currentFrame]}
        alt="Insta character animation"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
};