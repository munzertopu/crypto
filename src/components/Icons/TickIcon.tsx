import React from 'react';

interface TickIconProps {
  className?: string;
  strokeColor?: string;
  width?: number;
  height?: number;
}

const TickIcon: React.FC<TickIconProps> = ({
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
        d="M3.99512 8.00016L6.66178 10.6668L12.0045 5.3335"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TickIcon;
