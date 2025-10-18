import React from 'react';

interface ArrowDownIconProps {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
}

const ArrowDownIcon: React.FC<ArrowDownIconProps> = ({
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
        d="m4.5 15.75 7.5-7.5 7.5 7.5"
      />
    </svg>
  );
};

export default ArrowDownIcon;
