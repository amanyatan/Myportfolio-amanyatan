export function WebcamPixelGridDemo() {
  const handleClick = () => {
    const contact = document.querySelector('#contact');
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Contact section not built yet — scroll to bottom
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100vh",
      background: "#0a0a0a", // Matching the site's primary background
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <button
        onClick={handleClick}
        style={{
          background: "none",
          border: "none",
          cursor: "none",
          padding: 0,
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(4rem, 13vw, 13rem)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          color: "#ffffff",
          lineHeight: 1,
          textAlign: "center",
          textTransform: "uppercase",
          userSelect: "none",
          zIndex: 10,
          transition: "opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.opacity = "0.75";
          e.currentTarget.style.transform = "scale(1.03)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.transform = "scale(1)";
        }}
        onMouseDown={e => {
          e.currentTarget.style.transform = "scale(0.97)";
        }}
        onMouseUp={e => {
          e.currentTarget.style.transform = "scale(1.03)";
        }}
      >
        LET'S TALK
      </button>
    </div>
  );
}

export default WebcamPixelGridDemo;
