import React, { useState, useEffect } from 'react';

export const ContactCharacter: React.FC = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [frames, setFrames] = useState<string[]>([]);
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
    const frameModules = import.meta.glob<{ default: string }>(
      '@/assets/Video Frame Extractor 2026-08-26 6_36_29 GMT+5_30/*.png',
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

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length);
    }, 100);

    return () => clearInterval(interval);
  }, [frames]);

  if (frames.length === 0) {
    return null;
  }

  // Desktop: absolute positioning
  if (!isMobile) {
    return (
      <div
        style={{
          position: 'absolute',
          right: '5%',
          bottom: '15%',
          width: '200px',
          height: '200px',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <img
          src={frames[currentFrame]}
          alt="Character animation"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            imageRendering: 'pixelated',
          }}
        />
      </div>
    );
  }

  // Mobile: relative positioning with centered layout
  return (
    <div
      style={{
        position: 'relative',
        width: '140px',
        height: '140px',
        margin: '40px auto 0',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      <img
        src={frames[currentFrame]}
        alt="Character animation"
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
