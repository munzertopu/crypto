import React from 'react';

interface CrossIconProps {
  className?: string;
  strokeColor?: string;
  width?: number;
  height?: number;
}

const CrossIcon: React.FC<CrossIconProps> = ({
  className = '',
  strokeColor = 'currentColor',
  width = 16,
  height = 16,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 12L12 4"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12L4 4"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CrossIcon;
