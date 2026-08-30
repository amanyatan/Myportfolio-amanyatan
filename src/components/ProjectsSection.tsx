import { StackedCards } from "../components/ui/glass-cards";

export const ProjectsSection = () => {
  return (
    <div id="projects" className="stack-panel projects" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
      <div className="container" style={{ padding: 'var(--spacing-96) 6%', display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', zIndex: 5, justifyContent: 'center' }}>
        <div className="reveal active" style={{ marginBottom: 'var(--spacing-56)', position: 'relative', zIndex: 5 }}>
          <h1 style={{ fontSize: 'clamp(40px, 8vw, 120px)', textTransform: 'uppercase', letterSpacing: '-0.04em', margin: 0, lineHeight: 0.9, color: 'white', fontFamily: "'Montserrat', sans-serif", fontWeight: 900 }}>
            PROJECTS
          </h1>
        </div>
        <StackedCards />
      </div>
    </div>
  );
};