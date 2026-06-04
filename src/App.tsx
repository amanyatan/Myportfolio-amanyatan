/**
 * Aman Yatan - Portfolio Main Application
 * 
 * Architecture & Design Concept:
 * 1. Smooth Scrolling: Integrated with @studio-freight/lenis to provide a fluid, premium scroll feel.
 * 2. Sticky Panel Stacking: Screen sections (panels) are styled as sticky overlays that stack on top of each other.
 * 3. Dynamic Scroll Transitions: Custom JavaScript inside the Lenis scroll callback animates elements (scale, opacity, blur) 
 *    as they enter and exit the viewport.
 * 4. WebGL/Shader Background: Interactive WebGL shader background rendered on the Hero panel.
 * 5. Neo-Brutalism & Modern UI: Bold borders, distinct shadows, and premium interactive elements.
 */

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { CustomCursor } from './components/CustomCursor';
import { useScrollReveal } from './hooks/useScrollReveal';
import myProfileImage from './assets/Selected Works/MYPROFILE.png';
import { DraggableCardDemo } from './components/DraggableCardDemo';
import { WebGLShader } from './components/ui/web-gl-shader';
import { ProjectsSection } from './components/ProjectsSection';
import { GetInTouch } from './components/GetInTouch';

function App() {
  // Hook to handle scroll reveal animations (adding .active class to .reveal elements)
  useScrollReveal();

  useEffect(() => {
    // 1. Initialize Lenis for premium smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // RequestAnimationFrame loop for Lenis smooth scrolling
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    /**
     * setPanelBounds:
     * Calculates and adjusts the top position of sticky panels.
     * If a panel is taller than the viewport (e.g. on smaller screens or content-heavy pages),
     * it adjusts the top position so the user can scroll to the bottom of the panel before it sticks.
     */
    const setPanelBounds = () => {
      const vh = window.innerHeight;
      const panels = document.querySelectorAll('.stack-panel');
      panels.forEach((panel) => {
        const htmlPanel = panel as HTMLElement;
        const height = htmlPanel.offsetHeight;
        if (height > vh) {
          htmlPanel.style.top = `-${height - vh}px`;
        } else {
          htmlPanel.style.top = '0px';
        }
      });
    };

    // Initialize bounds and listen to window resize
    setTimeout(setPanelBounds, 100);
    window.addEventListener('resize', setPanelBounds);

    /**
     * onScroll:
     * Dynamic scroll transition handler.
     * Evaluates the current scroll offset relative to each panel's top/bottom bounds
     * and applies a smooth transition (scale, opacity, blur) to content elements.
     */
    const onScroll = ({ scroll }: any) => {
      const vh = window.innerHeight;
      const panels = document.querySelectorAll('.stack-panel');

      panels.forEach((panel) => {
        const htmlPanel = panel as HTMLElement;
        // Select direct content containers inside the sticky panels to apply transition effects
        const contentElements = htmlPanel.querySelectorAll('.container, .hero-content, nav, canvas, section:not(.stack-panel)');

        const offsetTop = htmlPanel.offsetTop;
        const offsetHeight = htmlPanel.offsetHeight;

        // Transition ranges
        const enterStart = offsetTop - vh;
        const enterEnd = offsetTop;
        const exitStart = offsetTop + offsetHeight - vh;
        const exitEnd = offsetTop + offsetHeight;

        contentElements.forEach((el) => {
          const contentEl = el as HTMLElement;
          contentEl.style.willChange = 'transform, opacity, filter';

          if (scroll > enterStart && scroll <= enterEnd) {
            // A. ENTERING STATE: Panel is rising up from below the viewport
            const progress = (scroll - enterStart) / (enterEnd - enterStart);
            const scale = 0.9 + (progress * 0.1);
            const opacity = Math.min(1, progress * 1.5);
            const blur = (1 - progress) * 15;

            contentEl.style.transform = `scale(${scale})`;
            contentEl.style.opacity = `${opacity}`;
            contentEl.style.filter = `blur(${blur}px)`;
          }
          else if (scroll > exitStart && scroll <= exitEnd) {
            // B. EXITING STATE: Panel is being covered/overlapped by the next incoming panel
            const progress = (scroll - exitStart) / (exitEnd - exitStart);
            const scale = 1 + (progress * 0.05);
            const opacity = Math.max(0, 1 - (progress * 1.2));
            const blur = progress * 15;

            contentEl.style.transform = `scale(${scale})`;
            contentEl.style.opacity = `${opacity}`;
            contentEl.style.filter = `blur(${blur}px)`;
          }
          else if (scroll > enterEnd && scroll <= exitStart) {
            // C. ACTIVE/FOCUS STATE: Panel is fully visible in viewport
            contentEl.style.transform = `scale(1)`;
            contentEl.style.opacity = `1`;
            contentEl.style.filter = `blur(0px)`;
          }
          else {
            // D. OFF-SCREEN STATE: Panel is out of view (hidden)
            contentEl.style.transform = `scale(0.9)`;
            contentEl.style.opacity = '0';
            contentEl.style.filter = `blur(15px)`;
          }
        });
      });
    };

    lenis.on('scroll', onScroll);

    return () => {
      lenis.destroy();
      window.removeEventListener('resize', setPanelBounds);
    };
  }, []);

  return (
    <>
      <div className="noise" />
      <CustomCursor />

      <div className="stack-container">
        {/* 1. Hero Sticky Panel */}
        <div className="stack-panel hero">
          <WebGLShader />

          {/* Navigation - Restored to top */}
          <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 'var(--spacing-40) 0',
            position: 'absolute',
            top: 0,
            left: '6%',
            right: '6%',
            zIndex: 10,
            textTransform: 'uppercase',
            fontSize: '14px',
            alignItems: 'center'
          }}>
            <div style={{ fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              AMAN©
            </div>
            <div style={{ display: 'flex', gap: 'var(--spacing-40)', fontWeight: 500 }}>
              <button onClick={() => window.scrollTo(0, 0)} className="link-underline" style={{ background: 'none', border: 'none', fontSize: 'inherit', fontFamily: 'Inter', textTransform: 'inherit', color: 'var(--text-primary)' }}>HOME?</button>
              <button onClick={() => { document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }) }} className="link-underline" style={{ background: 'none', border: 'none', fontSize: 'inherit', fontFamily: 'Inter', textTransform: 'inherit' }}>WHOAMI?</button>
              <button onClick={() => { document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }} className="link-underline" style={{ background: 'none', border: 'none', fontSize: 'inherit', fontFamily: 'Inter', textTransform: 'inherit' }}>TALK?</button>
              <button onClick={() => { document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }} className="link-underline" style={{ background: 'none', border: 'none', fontSize: 'inherit', fontFamily: 'Inter', textTransform: 'inherit' }}>PROJECTS?</button>
            </div>
            <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
              CDMX 08:33:08 PM
            </div>
          </nav>

          <div className="container hero-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', alignItems: 'center', flex: 1 }}>
            <h1 style={{
              fontSize: 'clamp(60px, 14vw, 220px)',
              textTransform: 'uppercase',
              letterSpacing: '-0.04em',
              textAlign: 'center',
              margin: 0,
              lineHeight: 1,
              whiteSpace: 'nowrap',
              color: 'white'
            }}>
              AMAN YATAN
            </h1>
          </div>
        </div>

        {/* 3. About Sticky Panel — clean solid background, no animation */}
        <div id="about" className="stack-panel about" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <div className="container" style={{ paddingTop: 'var(--spacing-96)', paddingBottom: 'var(--spacing-128)' }}>
            <div className="grid" style={{ alignItems: 'center' }}>
              <div style={{ gridColumn: 'span 6' }}>
                <div className="reveal">
                  <h2 style={{
                    fontSize: 'clamp(40px, 8vw, 120px)',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.04em',
                    margin: '0 0 var(--spacing-40) 0',
                    lineHeight: 0.9,
                    color: 'white',
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 900
                  }}>About</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
                  <p className="reveal stagger-1">Full-Stack Developer · UI/UX Designer · Generative &amp; Agentic AI Engineer — crafting end-to-end digital experiences from pixel-perfect interfaces to intelligent, autonomous systems.</p>
                  <p className="reveal stagger-2">4+ internships across diverse companies, startups &amp; firms — shipping production-grade work and leaving a real-world impact at every stage.</p>
                  <p className="reveal stagger-3">Relentlessly passionate about everything tech — from pixels to pipelines, always building, always evolving.</p>
                </div>
              </div>

              <div style={{ gridColumn: 'span 1' }}></div>

              <div style={{ gridColumn: 'span 5' }}>
                <div className="reveal slide-right" style={{ width: '100%', aspectRatio: '9/16', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <img src={myProfileImage} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center -20%' }} alt="Portrait Profile" />
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* 3. Services Sticky Panel */}
        <div className="stack-panel services" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <div className="container">
            <DraggableCardDemo />
          </div>
        </div>

        {/* 4. Projects Sticky Panel */}
        <ProjectsSection />

        {/* 5. Contact / Footer Sticky Panel */}
        <div id="contact" className="stack-panel stunning" style={{ backgroundColor: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--spacing-40)' }}>
            <div className="reveal active">
              <h2 className="glow-text" style={{
                fontSize: 'clamp(40px, 8vw, 120px)',
                textTransform: 'uppercase',
                letterSpacing: '-0.04em',
                margin: 0,
                lineHeight: 0.9,
                color: 'white',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 900,
                textAlign: 'center'
              }}>
                GET IN TOUCH
              </h2>
            </div>
            
            <div className="reveal active" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <GetInTouch />
            </div>

            <div className="reveal active" style={{ marginTop: 'var(--spacing-16)', color: 'var(--text-secondary)', fontSize: '14px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              © {new Date().getFullYear()} AMAN YATAN. ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>

      </div>    {/* closes .stack-container */}
    </>
  );
}

export default App;
