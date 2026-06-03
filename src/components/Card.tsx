import React from 'react';
import styled from 'styled-components';

interface CardProps {
  title: string;
  description: string;
  bgColor?: string;
  buttonText?: string;
  link?: string;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  description, 
  bgColor = '#ff66a3', 
  buttonText = 'Explore', 
  link 
}) => {
  return (
    <StyledWrapper $bgColor={bgColor}>
      <div className="card">
        <div className="head">{title}</div>
        <div className="content">
          <p className="description">{description}</p>
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button className="button">{buttonText}</button>
            </a>
          ) : (
            <button className="button">{buttonText}</button>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div<{ $bgColor: string }>`
  width: 100%;
  
  .card {
    font-family: Montserrat, sans-serif;
    width: 100%;
    min-height: 260px;
    display: flex;
    flex-direction: column;
    translate: -6px -6px;
    background: ${props => props.$bgColor};
    border: 3px solid #000000;
    box-shadow: 12px 12px 0 #000000;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .head {
    font-family: Montserrat, sans-serif;
    font-size: 15px;
    font-weight: 900;
    width: 100%;
    height: auto;
    min-height: 38px;
    background: #ffffff;
    padding: 8px 14px;
    color: #000000;
    border-bottom: 3px solid #000000;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    letter-spacing: -0.01em;
  }

  .content {
    padding: 16px 14px;
    font-size: 14px;
    font-weight: 600;
    color: #000000;
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
  }

  .description {
    margin: 0 0 16px 0;
    flex-grow: 1;
  }

  .button {
    align-self: flex-start;
    padding: 6px 14px;
    border: 3px solid #000000;
    box-shadow: 3px 3px 0 #000000;
    font-weight: 750;
    background: #ffffff;
    transition: all 0.3s ease;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 12px;
    font-family: Montserrat, sans-serif;
  }

  .button:hover {
    translate: 1.5px 1.5px;
    box-shadow: 1.5px 1.5px 0 #000000;
    background: #000000;
    color: #ffffff;
  }

  .button:active {
    translate: 3px 3px;
    box-shadow: 0 0 0 #000000;
  }

  .card:hover {
    translate: -12px -12px;
    box-shadow: 18px 18px 0 #000000;
  }
`;

export default Card;

