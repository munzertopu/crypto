import React from 'react';

interface ButtonArrowCircleIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const ButtonArrowCircleIcon: React.FC<ButtonArrowCircleIconProps> = ({
  className = '',
  width = 20,
  height = 20,
}) => {
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
        d="M12.4087 4.23333C11.6837 4.01667 10.8837 3.875 10.0004 3.875C6.00872 3.875 2.77539 7.10833 2.77539 11.1C2.77539 15.1 6.00872 18.3333 10.0004 18.3333C13.9921 18.3333 17.2254 15.1 17.2254 11.1083C17.2254 9.625 16.7754 8.24167 16.0087 7.09167" 
        stroke="currentColor" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M13.4415 4.43317L11.0332 1.6665" 
        stroke="currentColor" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M13.4411 4.43311L10.6328 6.48311" 
        stroke="currentColor" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ButtonArrowCircleIcon;
