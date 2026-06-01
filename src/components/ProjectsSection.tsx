import React from 'react';
import Card from './Card';

export const ProjectsSection = () => {
  return (
    <div id="projects" className="stack-panel projects" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
      <div className="container" style={{ padding: 'var(--spacing-96) 6%', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="reveal active" style={{ marginBottom: 'var(--spacing-64)' }}>
          <h1 style={{ 
            fontSize: 'clamp(40px, 8vw, 120px)', 
            textTransform: 'uppercase', 
            letterSpacing: '-0.04em', 
            margin: 0,
            lineHeight: 0.9,
            color: 'white',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900
          }}>
            PROJECTS
          </h1>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: 'var(--spacing-40)',
          flex: 1,
          alignItems: 'start'
        }}>
          <Card bgColor="#FFADAD" /> {/* Pastel Pink */}
          <Card bgColor="#CAFFBF" /> {/* Pastel Green */}
          <Card bgColor="#9BF6FF" /> {/* Pastel Blue */}
          <Card bgColor="#FFD6A5" /> {/* Pastel Orange */}
          <Card bgColor="#FDFFB6" /> {/* Pastel Yellow */}
          <Card bgColor="#BDB2FF" /> {/* Pastel Purple */}
        </div>
      </div>
    </div>
  );
};
