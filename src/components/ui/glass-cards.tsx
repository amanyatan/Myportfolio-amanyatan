import React from "react";

export type StackedCardData = {
  title: string;
  description: string;
  techStack?: string;
  link?: string;
  buttonText?: string;
  bgColor?: string;
};

const defaultCards: StackedCardData[] = [
  {
    title: "Lexmind",
    description:
      "A legal assistant platform where users can summarize documents, generate interactive mindmaps, and ask questions with a dedicated AI legal assistant.",
    techStack: "AI / RAG",
    link: "https://lexmind-psi.vercel.app/",
    buttonText: "Explore AI",
    bgColor: "#FFADAD",
  },
  {
    title: "Cloud Code",
    description:
      "A cloud-based collaborative IDE where users can code, deploy full-stack applications, and participate in an active coding community in real-time.",
    techStack: "React / Node",
    link: "https://cloud-hqdu.vercel.app/",
    buttonText: "Launch IDE",
    bgColor: "#CAFFBF",
  },
  {
    title: "Personal Assistant",
    description:
      "A multi-functional personal AI companion featuring voice command capabilities, files and image upload, multi-session chat persistence, and fully customizable themes.",
    techStack: "AI / Voice",
    link: "https://my-personal-assistant-livid.vercel.app/",
    buttonText: "Interact",
    bgColor: "#BDB2FF",
  },
  {
    title: "Churn Prediction",
    description:
      "Predictive analytics system designed to identify high-risk customers likely to churn, leveraging advanced machine learning, automated feature engineering, and a premium interactive dashboard.",
    techStack: "ML / Analytics",
    link: "https://customer-churn-segmentation.onrender.com",
    buttonText: "View Model",
    bgColor: "#9BF6FF",
  },
];
/**
 * StackedCards – Responsive, interactive project showcase.
 *
 * Cards are laid out as a clean grid so every project is fully visible and
 * directly interactive: the entire card is a link, each card lifts with a
 * crisp hover state, and none are hidden or covered by overlapping siblings
 * (as the previous absolutely-stacked design did, which made all but the top
 * card unresponsive). Pass `content` to override the default project cards,
 * or render <StackedCards /> with no props.
 */
export const StackedCards: React.FC<{ content?: StackedCardData[] }> = ({
  content = defaultCards,
}) => {
  return (
    <ul className="projects-showcase">
      {content.map((card) => (
        <li key={card.title} className="project-entry">
          <a
            href={card.link}
            target={card.link ? "_blank" : undefined}
            rel={card.link ? "noopener noreferrer" : undefined}
            className="project-card-neo"
            style={{ backgroundColor: card.bgColor ?? "#1a1a1a" }}
            aria-label={`${card.title} — ${card.buttonText ?? "Explore"}`}
          >
            <div className="project-card-neo-inner">
              {card.techStack ? (
                <span className="project-tag">{card.techStack}</span>
              ) : null}

              <div className="project-card-neo-body">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>

              <span className="project-link">
                {card.buttonText ?? "Explore"}
                <svg
                  viewBox="0 0 16 16"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M1 8h13M9 3l5 5-5 5" />
                </svg>
              </span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default StackedCards;