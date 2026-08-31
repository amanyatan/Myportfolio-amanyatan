import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import resumeImage from '@/assets/Resume.png';

// â”€â”€ Independent SVG logos from src/assets/ALLMYTECHSTACK â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Languages
import pythonIcon from '@/assets/ALLMYTECHSTACK/Languages/python.svg';
import cplusplusIcon from '@/assets/ALLMYTECHSTACK/Languages/cplusplus.svg';
import javascriptIcon from '@/assets/ALLMYTECHSTACK/Languages/javascript.svg';

// Full-Stack
import reactIcon from '@/assets/ALLMYTECHSTACK/Full-Stack/react-dark.svg';
import nextjsIcon from '@/assets/ALLMYTECHSTACK/Full-Stack/nextjs.svg';
import nodejsIcon from '@/assets/ALLMYTECHSTACK/Full-Stack/nodejs.svg';
import postgresqlIcon from '@/assets/ALLMYTECHSTACK/Full-Stack/postgresql.svg';
import mongodbIcon from '@/assets/ALLMYTECHSTACK/Full-Stack/mongodb.svg';
import threedotjsIcon from '@/assets/ALLMYTECHSTACK/Full-Stack/threedotjs.svg';

// UIUX
import figmaIcon from '@/assets/ALLMYTECHSTACK/UIUX/figma.svg';
import framerIcon from '@/assets/ALLMYTECHSTACK/UIUX/framer-dark.svg';

// Tools
import gitIcon from '@/assets/ALLMYTECHSTACK/Tools/git.svg';
import githubIcon from '@/assets/ALLMYTECHSTACK/Tools/github-dark.svg';
import dockerIcon from '@/assets/ALLMYTECHSTACK/Tools/docker.svg';
import vercelIcon from '@/assets/ALLMYTECHSTACK/Tools/vercel.svg';
import renderIcon from '@/assets/ALLMYTECHSTACK/Tools/render.svg';
import n8nIcon from '@/assets/ALLMYTECHSTACK/Tools/n8n.svg';
import numpyIcon from '@/assets/ALLMYTECHSTACK/Tools/numpy.svg';
import pytorchIcon from '@/assets/ALLMYTECHSTACK/Tools/pytorch.svg';
import tensorflowIcon from '@/assets/ALLMYTECHSTACK/Tools/tensorflow.svg';

// Microservices
import redisIcon from '@/assets/ALLMYTECHSTACK/Microservices/redis.svg';
import langgraphIcon from '@/assets/ALLMYTECHSTACK/Microservices/langgraph.svg';
import twilioIcon from '@/assets/ALLMYTECHSTACK/Microservices/twilio.svg';
import huggingfaceIcon from '@/assets/ALLMYTECHSTACK/Microservices/hugging-face (1).svg';

interface TechItem {
  name: string;
  sub: string;
  icon: string;
  link: string;
}

interface TechCategory {
  title: string;
  sub: string;
  items: TechItem[];
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    title: 'Languages',
    sub: 'Core programming languages',
    items: [
      { name: 'Python', sub: 'AI Â· Data Â· Scripting', icon: pythonIcon, link: 'https://docs.python.org/3/' },
      { name: 'C++', sub: 'High-performance', icon: cplusplusIcon, link: 'https://en.cppreference.com/w/' },
      { name: 'JavaScript', sub: 'Web interactivity', icon: javascriptIcon, link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    ],
  },
  {
    title: 'Full-Stack',
    sub: 'Frontend Â· backend Â· databases',
    items: [
      { name: 'React', sub: 'UI components', icon: reactIcon, link: 'https://react.dev/' },
      { name: 'Next.js', sub: 'Full-stack framework', icon: nextjsIcon, link: 'https://nextjs.org/docs' },
      { name: 'Node.js', sub: 'Server runtime', icon: nodejsIcon, link: 'https://nodejs.org/docs/' },
      { name: 'PostgreSQL', sub: 'Relational database', icon: postgresqlIcon, link: 'https://www.postgresql.org/docs/' },
      { name: 'MongoDB', sub: 'NoSQL database', icon: mongodbIcon, link: 'https://www.mongodb.com/docs/' },
      { name: 'Three.js', sub: '3D Â· WebGL', icon: threedotjsIcon, link: 'https://threejs.org/docs/' },
    ],
  },
  {
    title: 'UIUX',
    sub: 'Design & prototyping',
    items: [
      { name: 'Figma', sub: 'UI/UX design', icon: figmaIcon, link: 'https://www.figma.com/community/docs' },
      { name: 'Framer', sub: 'Interactive design', icon: framerIcon, link: 'https://www.framer.com/docs/' },
    ],
  },
  {
    title: 'Tools',
    sub: 'Dev, cloud & automation',
    items: [
      { name: 'Git', sub: 'Version control', icon: gitIcon, link: 'https://git-scm.com/doc' },
      { name: 'GitHub', sub: 'Collaboration', icon: githubIcon, link: 'https://docs.github.com/' },
      { name: 'Docker', sub: 'Containerization', icon: dockerIcon, link: 'https://docs.docker.com/' },
      { name: 'Vercel', sub: 'Deployment', icon: vercelIcon, link: 'https://vercel.com/docs' },
      { name: 'Render', sub: 'Cloud hosting', icon: renderIcon, link: 'https://render.com/docs' },
      { name: 'n8n', sub: 'Workflow automation', icon: n8nIcon, link: 'https://docs.n8n.io/' },
      { name: 'NumPy', sub: 'Numerical computing', icon: numpyIcon, link: 'https://numpy.org/doc/' },
      { name: 'PyTorch', sub: 'Deep learning', icon: pytorchIcon, link: 'https://pytorch.org/docs/' },
      { name: 'TensorFlow', sub: 'ML framework', icon: tensorflowIcon, link: 'https://www.tensorflow.org/' },
    ],
  },
  {
    title: 'Microservices',
    sub: 'Backend services & AI infra',
    items: [
      { name: 'Redis', sub: 'Cache Â· queue', icon: redisIcon, link: 'https://redis.io/documentation' },
      { name: 'LangGraph', sub: 'Agent workflows', icon: langgraphIcon, link: 'https://langchain-ai.github.io/langgraph/' },
      { name: 'Twilio', sub: 'Communication APIs', icon: twilioIcon, link: 'https://www.twilio.com/docs/' },
      { name: 'Hugging Face', sub: 'AI models & hub', icon: huggingfaceIcon, link: 'https://huggingface.co/docs/' },
    ],
  },
];

export const TechStackSection: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useScrollReveal();

  // Lock body scroll while the resume lightbox is open.
  useEffect(() => {
    if (lightboxOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [lightboxOpen]);

  // Close the lightbox on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section
      id="techstack"
      className="stack-panel techstack"
      style={{
        minHeight: '100vh',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid var(--border)',
        boxShadow: '0 -20px 50px rgba(0,0,0,0.6)',
      }}
    >
      <div
        className="container techstack-inner"
        style={{
          position: 'relative',
          zIndex: 3,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(48px, 8vw, 96px) 6%',
        }}
      >
        <h1
          className="reveal techstack-title"
          style={{
            fontSize: 'clamp(40px, 8vw, 120px)',
            textTransform: 'uppercase',
            letterSpacing: '-0.04em',
            margin: 0,
            marginBottom: 'clamp(32px, 5vw, 64px)',
            lineHeight: 0.9,
            color: 'white',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
          }}
        >
          TECH STACK
        </h1>

        <div
          className="techstack-grid reveal stagger-1"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
            gap: 'clamp(24px, 5vw, 72px)',
            alignItems: 'start',
          }}
        >
          {/* LEFT: tech categories â€” standalone SVG logos + name & sub-heading */}
          <div className="techstack-categories">
            {TECH_CATEGORIES.map((category, ci) => (
              <div
                key={category.title}
                className="reveal techstack-category"
                style={{ animationDelay: `${ci * 60}ms` }}
              >
                <div className="techstack-category-head">
                  <h3 className="techstack-category-title">{category.title}</h3>
                </div>
                <div className="tech-logo-grid">
                  {category.items.map((item) => (
                    <div className="tech-logo-item" key={item.name}>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Learn more about ${item.name} (opens in new tab)`}
                      >
                        <img
                          className="tech-logo-img"
                          src={item.icon}
                          alt={item.name}
                          loading="lazy"
                          draggable={false}
                        />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: resume with expand */}
          <div
            className="techstack-resume reveal stagger-2"
            style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid var(--border)',
              background: 'rgba(255,255,255,0.03)',
              alignSelf: 'stretch',
            }}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label="Expand resume"
              className="techstack-resume-btn"
              style={{
                display: 'block',
                width: '100%',
                padding: 0,
                border: 'none',
                background: 'transparent',
                cursor: 'zoom-in',
              }}
            >
              <img
                src={resumeImage}
                alt="My resume"
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  maxHeight: '70vh',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                }}
              />
            </button>

            {/* sub-heading + expand control */}
            <div
              className="techstack-resume-foot"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%)',
              }}
            >
              <span
                style={{
                  color: 'white',
                  fontWeight: 600,
                  fontSize: 'clamp(14px, 1.5vw, 17px)',
                  letterSpacing: '0.02em',
                }}
              >
                My resume
              </span>
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label="Expand resume"
                className="techstack-expand"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 38,
                  height: 38,
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.25)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  cursor: 'zoom-in',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / modal */}
      {lightboxOpen && (
        <div
          className="techstack-lightbox"
          onClick={() => setLightboxOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(16px, 4vw, 56px)',
            animation: 'techstackFade 0.2s ease',
          }}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
            className="techstack-close"
            style={{
              position: 'absolute',
              top: 'clamp(16px, 3vw, 32px)',
              right: 'clamp(16px, 3vw, 32px)',
              width: 44,
              height: 44,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.25)',
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              fontSize: 22,
              lineHeight: 1,
              cursor: 'pointer',
            }}
          >
            &times;
          </button>
          <img
            src={resumeImage}
            alt="My resume"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '92vw',
              maxHeight: '88vh',
              width: 'auto',
              height: 'auto',
              borderRadius: '12px',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          />
        </div>
      )}
    </section>
  );
};

export default TechStackSection;
