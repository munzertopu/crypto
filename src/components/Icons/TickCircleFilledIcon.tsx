import React from 'react';

interface TickCircleFilledIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const TickCircleFilledIcon: React.FC<TickCircleFilledIconProps> = ({
  className = '',
  width = 21,
  height = 20,
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 21 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M10.4993 18.3332C15.0827 18.3332 18.8327 14.5832 18.8327 9.99984C18.8327 5.4165 15.0827 1.6665 10.4993 1.6665C5.91602 1.6665 2.16602 5.4165 2.16602 9.99984C2.16602 14.5832 5.91602 18.3332 10.4993 18.3332Z" 
        fill="#90C853" 
        stroke="#90C853" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M6.95898 9.99993L9.31732 12.3583L14.0423 7.6416" 
        stroke="white" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TickCircleFilledIcon;
