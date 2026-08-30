import { getTechIcon } from './techIcons';

interface TechLogoProps {
  name: string;
  size?: number;
  className?: string;
}

export const TechLogo: React.FC<TechLogoProps> = ({ name, size = 40, className }) => {
  const icon = getTechIcon(name);

  if (!icon) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: '14px',
          background: 'rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: size * 0.3,
          color: 'var(--text-secondary)',
          fontWeight: 700,
          border: '1px solid var(--border)',
        }}
      >
        {name.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        background: `linear-gradient(135deg, #${icon.hex} 0%, rgba(255,255,255,0.1) 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={`#${icon.hex}`}
        role="img"
        aria-label={icon.name}
        style={{ flexShrink: 0 }}
      >
        <path d={icon.path} />
      </svg>
    </div>
  );
};

export default TechLogo;