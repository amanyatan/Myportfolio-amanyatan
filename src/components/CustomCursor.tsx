import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const COLOR = '#e40707';
const DOT_SIZE = 8;
const HOVER_DOT_SIZE = 14;
const TRAIL_PARTICLE_SIZE = 4;
const TRAIL_SPAWN_RATE = 48; // 60 se kam kiya, performance ke liye
const TRAIL_LIFETIME = 620; // 900 se kam, jaldi fade hoga
const SMOOTHING = 0.55; // tight follow = koi bounce nahi jab cursor rukta hai
const SNAP_DISTANCE = 0.5;
const MAX_PARTICLES = 160; // 700 bahut zyada tha

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  life: number;
}

export interface CustomCursorProps {
  color?: string;
  dotSize?: number;
  hoverDotSize?: number;
  particleSize?: number;
  spawnRate?: number;
  lifetime?: number;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({
  color = COLOR,
  dotSize = DOT_SIZE,
  hoverDotSize = HOVER_DOT_SIZE,
  particleSize: particleSizeProp = TRAIL_PARTICLE_SIZE,
  spawnRate = TRAIL_SPAWN_RATE,
  lifetime = TRAIL_LIFETIME,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ballRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef(0);
  const lastSpawnRef = useRef(0);
  const radiusRef = useRef(dotSize / 2);
  const particlesRef = useRef<Particle[]>([]);
  const poolRef = useRef<Particle[]>([]);
  const isInteractiveRef = useRef(false);

  const lerp = (from: number, to: number, amt: number) => from + (to - from) * amt;

  const getParticle = (x: number, y: number, vx: number, vy: number, size: number, life: number): Particle => {
    const p = poolRef.current.pop() || ({} as Particle);
    p.x = x; p.y = y; p.vx = vx; p.vy = vy;
    p.size = size; p.alpha = 1; p.maxAlpha = 1; p.life = life;
    return p;
  };

  const recycleParticle = (p: Particle) => {
    if (poolRef.current.length < 200) poolRef.current.push(p);
  };

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!ballRef.current.x &&!ballRef.current.y) {
        const cx = w / 2, cy = h / 2;
        ballRef.current = { x: cx, y: cy };
        targetRef.current = { x: cx, y: cy };
      }
    };

    resize();

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;

      const t = e.target as HTMLElement;
      isInteractiveRef.current =!!(
        t.closest('a, button, [role="button"], [data-cursor-interactive], input, textarea, select')
      );
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', resize);

    const animate = (timestamp: number) => {
      if (!canvasRef.current) return;
      const dt = Math.min(timestamp - lastTimeRef.current, 32);
      lastTimeRef.current = timestamp;

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      const b = ballRef.current;
      const t = targetRef.current;

      // FIX 1: NO BOUNCE - Simple smooth follow, no velocity/spring
      const dx = t.x - b.x;
      const dy = t.y - b.y;
      const dist = Math.hypot(dx, dy);

      if (dist < SNAP_DISTANCE) {
        b.x = t.x;
        b.y = t.y;
      } else {
        // Frame-rate independent lerp
        const lerpFactor = 1 - Math.pow(1 - SMOOTHING, dt / 16.667);
        b.x = lerp(b.x, t.x, lerpFactor);
        b.y = lerp(b.y, t.y, lerpFactor);
      }

      // Trail spawn
      lastSpawnRef.current += dt;
      const spawnInterval = 1000 / spawnRate;
      const speed = dist; // actual mouse speed

      while (lastSpawnRef.current >= spawnInterval && particlesRef.current.length < MAX_PARTICLES) {
        lastSpawnRef.current -= spawnInterval;
        if (speed < 3) continue; // idle pe spawn mat karo

        const count = Math.min(4, 1 + Math.floor(speed / 10));
        const intensity = Math.min(1, 0.85 + speed * 0.02);

        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const mag = (3 + Math.random() * 4) + speed * 0.08;
          const p = getParticle(b.x, b.y, Math.cos(angle) * mag, Math.sin(angle) * mag, particleSizeProp * (0.8 + Math.random() * 0.8), lifetime * (0.6 + Math.random() * 0.4));
          p.maxAlpha = intensity;
          particlesRef.current.push(p);
        }
      }

      // Particles update - optimized
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= dt;
        p.alpha = (p.life / lifetime) * p.maxAlpha;

        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
          recycleParticle(p);
          continue;
        }
        ctx.fillStyle = hexToRgba(color, p.alpha);
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }

      // Main dot - instant response
      const targetRadius = isInteractiveRef.current? hoverDotSize / 2 : dotSize / 2;
      radiusRef.current = lerp(radiusRef.current, targetRadius, 0.25);

      ctx.save();
      ctx.translate(b.x, b.y);
      if (isInteractiveRef.current) {
        ctx.strokeStyle = hexToRgba(color, 0.8);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, radiusRef.current, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.fillStyle = hexToRgba(color, 1);
        ctx.beginPath();
        ctx.arc(0, 0, radiusRef.current / 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      animRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    animRef.current = requestAnimationFrame(animate);

    // Hide default cursor
    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none!important; }`;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
      style.remove();
    };
  }, [color, dotSize, hoverDotSize, particleSizeProp, spawnRate, lifetime]);

  if (typeof window === 'undefined' || typeof document === 'undefined') return null;

  return createPortal(
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        display: 'block',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />,
    document.body,
  );
};

function hexToRgba(color: string, alpha: number): string {
  if (!color) return `rgba(255,255,255,${alpha})`;
  if (color.startsWith('rgba')) return color.replace(/[\d.]+\)$/, `${alpha})`);
  if (color.startsWith('rgb(')) return color.replace('rgb(', 'rgba(').replace(')', `,${alpha})`);
  if (color.startsWith('#')) {
    let r=0,g=0,b=0;
    if (color.length === 4) {
      r = parseInt(color[1]+color[1],16); g = parseInt(color[2]+color[2],16); b = parseInt(color[3]+color[3],16);
    } else if (color.length === 7) {
      r = parseInt(color.slice(1,3),16); g = parseInt(color.slice(3,5),16); b = parseInt(color.slice(5,7),16);
    }
    return `rgba(${r},${g},${b},${alpha})`;
  }
  return `rgba(255,255,255,${alpha})`;
}