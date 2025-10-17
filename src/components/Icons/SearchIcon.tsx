import React from 'react';

interface SearchIconProps {
  className?: string;
  strokeColor?: string;
  width?: number;
  height?: number;
}

const SearchIcon: React.FC<SearchIconProps> = ({
  className = '',
  strokeColor = '#7C7C7C',
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
        d="M9.6 17.2C13.7974 17.2 17.2 13.7974 17.2 9.6C17.2 5.40264 13.7974 2 9.6 2C5.40264 2 2 5.40264 2 9.6C2 13.7974 5.40264 17.2 9.6 17.2Z"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.9999 18L16.3999 16.4"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchIcon;
