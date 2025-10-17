import React from 'react';

interface TrashIconProps {
  className?: string;
  strokeColor?: string;
  width?: number | string;
  height?: number | string;
}

const TrashIcon: React.FC<TrashIconProps> = ({ 
  className = "", 
  strokeColor = "#7C7C7C",
  width = 20,
  height = 20
}) => {
  // Convert currentColor to actual currentColor value if needed
  const finalStrokeColor = strokeColor === "currentColor" ? "currentColor" : strokeColor;
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M17.5 6.64994C14.725 6.37494 11.9333 6.23328 9.15 6.23328C7.5 6.23328 5.85 6.31661 4.2 6.48328L2.5 6.64994" 
        stroke={finalStrokeColor} 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M7.08301 5.80837L7.26634 4.71671C7.39967 3.92504 7.49967 3.33337 8.90801 3.33337H11.0913C12.4997 3.33337 12.608 3.95837 12.733 4.72504L12.9163 5.80837" 
        stroke={finalStrokeColor} 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M15.7087 6.78333L15.167 15.175C15.0753 16.4833 15.0003 17.5 12.6753 17.5H7.32533C5.00033 17.5 4.92533 16.4833 4.83366 15.175L4.29199 6.78333" 
        stroke={finalStrokeColor} 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TrashIcon;
