import React from 'react';

interface CloudUploadIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const CloudUploadIcon: React.FC<CloudUploadIconProps> = ({
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
        d="M13.6997 7.4165C16.6997 7.67484 17.9247 9.2165 17.9247 12.5915V12.6998C17.9247 16.4248 16.4331 17.9165 12.7081 17.9165H7.28307C3.55807 17.9165 2.06641 16.4248 2.06641 12.6998V12.5915C2.06641 9.2415 3.27474 7.69984 6.22474 7.42484" 
        stroke="currentColor" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M10 12.4999V3.0166" 
        stroke="currentColor" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M12.7923 4.87516L10.0007 2.0835L7.20898 4.87516" 
        stroke="currentColor" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CloudUploadIcon;
