import React from 'react';

interface InfoCircleIconProps {
  className?: string;
  strokeColor?: string;
  width?: number;
  height?: number;
}

const InfoCircleIcon: React.FC<InfoCircleIconProps> = ({
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
        d="M7.99992 14.6668C11.6666 14.6668 14.6666 11.6668 14.6666 8.00016C14.6666 4.3335 11.6666 1.3335 7.99992 1.3335C4.33325 1.3335 1.33325 4.3335 1.33325 8.00016C1.33325 11.6668 4.33325 14.6668 7.99992 14.6668Z"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 5.3335V8.66683"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99634 10.6665H8.00233"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default InfoCircleIcon;
