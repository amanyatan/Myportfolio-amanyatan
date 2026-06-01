import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Media query to check if it's a touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    let requestRef: number;
    
    const onMouseMove = (e: MouseEvent) => {
      setDotPosition({ x: e.clientX, y: e.clientY });
    };

    const updateCursor = () => {
      // Lerp for the outline - reduced for tighter tracking consistency
      setPosition((prev) => {
        const dx = dotPosition.x - prev.x;
        const dy = dotPosition.y - prev.y;
        return {
          x: prev.x + dx * 0.2, 
          y: prev.y + dy * 0.2,
        };
      });
      requestRef = requestAnimationFrame(updateCursor);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('project-card') ||
        target.closest('.project-card') ||
        target.classList.contains('link-underline') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    requestRef = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(requestRef);
    };
  }, [dotPosition]);

  return (
    <>
      <div 
        className={`cursor-dot ${isHovering ? 'hovering' : ''}`} 
        style={{ left: `${dotPosition.x}px`, top: `${dotPosition.y}px` }} 
      />
      <div 
        className={`cursor-outline ${isHovering ? 'hovering' : ''}`} 
        style={{ left: `${position.x}px`, top: `${position.y}px` }} 
      
      />
    </>
  );
};
