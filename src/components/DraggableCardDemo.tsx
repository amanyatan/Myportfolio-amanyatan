import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card";
import { LampContainer } from "@/components/ui/lamp";


import uiUxImg from "@/assets/Selected Works/services(UI/UX).jpeg";
import agenticAiImg from "@/assets/Selected Works/AGENTIC-AI.jpeg";
import fullstackImg from "@/assets/Selected Works/SERVICES(FULLSTACK).png";
import genAiImg from "@/assets/Selected Works/SERVICES(GEN-AI).jpeg";

export function DraggableCardDemo() {
  return (
    <section style={{
      padding: "var(--spacing-128) 0",
      position: "relative",
      zIndex: 2,
      overflow: "hidden",
    }}>
      {/* Services Heading - Aligned to left like Projects */}
      <div className="container" style={{ padding: '0 6%', marginBottom: 'var(--spacing-64)', position: 'relative', zIndex: 5 }}>
        <h1 style={{ 
          fontSize: 'clamp(40px, 8vw, 120px)', 
          textTransform: 'uppercase', 
          letterSpacing: '-0.04em', 
          margin: 0,
          lineHeight: 0.9,
          color: '#d1d1d1',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 900
        }}>
          SERVICES
        </h1>
      </div>

      <DraggableCardContainer
        style={{
          position: "relative",
          minHeight: "80vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Lamp Background */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
            <LampContainer className="bg-transparent">
              <div /> {/* Empty content for LampContainer to just show the light effect */}
            </LampContainer>
        </div>

        <DraggableCardBody
          style={{
            top: "8%",
            left: "15%",
            rotate: "-5deg",
          }}
        >
          <img
            src={uiUxImg}
            alt="UI/UX"
            style={{
              display: "block",
              width: "100%",
              height: "280px",
              objectFit: "cover",
              borderRadius: "8px",
              pointerEvents: "none",
              position: "relative",
              zIndex: 10,
            }}
            draggable={false}
          />
          <h3 style={{
            marginTop: "1rem",
            textAlign: "center",
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "rgba(255,255,255,0.85)",
            fontFamily: "'Inter', sans-serif,'latin'",
            letterSpacing: "-0.02em",
          }}>
            UI/UX
          </h3>
          {/* Add your unique data or links for UI/UX here */}
        </DraggableCardBody>

        <DraggableCardBody
          style={{
            top: "30%",
            left: "20%",
            rotate: "-7deg",
          }}
        >
          <img
            src={agenticAiImg}
            alt="AGENTIC AI"
            style={{
              display: "block",
              width: "100%",
              height: "280px",
              objectFit: "cover",
              borderRadius: "8px",
              pointerEvents: "none",
              position: "relative",
              zIndex: 10,
            }}
            draggable={false}
          />
          <h3 style={{
            marginTop: "1rem",
            textAlign: "center",
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "rgba(255,255,255,0.85)",
            fontFamily: "'Inter', sans-serif,'latin'",
            letterSpacing: "-0.02em",
          }}>
            AGENTIC AI
          </h3>
          {/* Add your unique data or links for AGENTIC AI here */}
        </DraggableCardBody>

        <DraggableCardBody
          style={{
            top: "4%",
            left: "38%",
            rotate: "8deg",
          }}
        >
          <img
            src={fullstackImg}
            alt="FULL-STACK"
            style={{
              display: "block",
              width: "100%",
              height: "280px",
              objectFit: "cover",
              borderRadius: "8px",
              pointerEvents: "none",
              position: "relative",
              zIndex: 10,
            }}
            draggable={false}
          />
          <h3 style={{
            marginTop: "1rem",
            textAlign: "center",
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "rgba(255,255,255,0.85)",
            fontFamily: "'Inter', sans-serif,'latin'",
            letterSpacing: "-0.02em",
          }}>
            FULL-STACK
          </h3>
          {/* Add your unique data or links for FULL-STACK here */}
        </DraggableCardBody>

        <DraggableCardBody
          style={{
            top: "25%",
            left: "54%",
            rotate: "10deg",
          }}
        >
          <img
            src={genAiImg}
            alt="GEN-AI"
            style={{
              display: "block",
              width: "100%",
              height: "280px",
              objectFit: "cover",
              borderRadius: "8px",
              pointerEvents: "none",
              position: "relative",
              zIndex: 10,
            }}
            draggable={false}
          />
          <h3 style={{
            marginTop: "1rem",
            textAlign: "center",
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "rgba(255,255,255,0.85)",
            fontFamily: "'Inter', sans-serif,'latin'",
            letterSpacing: "-0.02em",
          }}>
            GEN-AI
          </h3>
          {/* Add your unique data or links for GEN-AI here */}
        </DraggableCardBody>
      </DraggableCardContainer>
    </section>
  );
}

export default DraggableCardDemo;
