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
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: 'var(--spacing-40)',
          flex: 1,
          alignItems: 'start'
        }}>
          <Card 
            title="Lexmind" 
            description="A legal assistant platform where users can summarize documents, generate interactive mindmaps, and ask questions with a dedicated AI legal assistant." 
            bgColor="#FFADAD" 
            buttonText="Explore AI" 
            link="https://lexmind-psi.vercel.app/"
          />
          <Card 
            title="Cloud Code" 
            description="A cloud-based collaborative IDE where users can code, deploy full-stack applications, and participate in an active coding community in real-time." 
            bgColor="#CAFFBF" 
            buttonText="Launch IDE" 
            link="https://cloud-hqdu.vercel.app/"
          />
          <Card 
            title="Personal Assistant" 
            description="A multi-functional personal AI companion featuring voice command capabilities, files and images uploading, multi-session chat persistence, and fully customizable themes." 
            bgColor="#BDB2FF" 
            buttonText="Interact" 
            link="https://my-personal-assistant-livid.vercel.app/"
          />
          <Card 
            title="Customer Churn Prediction" 
            description="Predictive analytics system designed to identify high-risk customers likely to churn, leveraging advanced machine learning, automated feature engineering, and a premium interactive dashboard." 
            bgColor="#9BF6FF" 
            buttonText="View Model" 
            link="https://github.com/amanyatan/Predictive-Modeling-and-Risk-Scoring-for-Bank-Customer-Churn"
          />
        </div>
      </div>
    </div>
  );
};

