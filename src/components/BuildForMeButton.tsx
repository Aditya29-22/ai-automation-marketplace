import React from 'react';

interface Props {
  onClick: () => void;
  className?: string;
}

export function BuildForMeButton({ onClick, className = '' }: Props) {
  return (
    <div className={`cyber-button-container ${className}`}>
      <div className="cyber-btn-border-mask">
        <div className="ide-border-spin" />
      </div>
      <button className="cyber-button" onClick={onClick}>
        <div className="cyber-text">Build for Me</div>
      </button>
    </div>
  );
}
