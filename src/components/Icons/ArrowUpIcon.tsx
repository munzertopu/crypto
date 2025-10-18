import React from 'react';

interface ArrowUpIconProps {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
}

const ArrowUpIcon: React.FC<ArrowUpIconProps> = ({
  className = '',
  color = 'currentColor',
  width = 24,
  height = 24,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={color}
      className={className}
      width={width}
      height={height}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};

export default ArrowUpIcon;
