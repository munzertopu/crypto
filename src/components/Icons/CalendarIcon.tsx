import React from 'react';

interface CalendarIconProps {
  className?: string;
  strokeColor?: string;
  width?: number;
  height?: number;
}

const CalendarIcon: React.FC<CalendarIconProps> = ({
  className = '',
  strokeColor = '#7C7C7C',
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
        d="M5.33398 1.33334V3.33334"
        stroke={strokeColor}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.666 1.33334V3.33334"
        stroke={strokeColor}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.33398 6.05997H13.6673"
        stroke={strokeColor}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 5.66668V11.3333C14 13.3333 13 14.6667 10.6667 14.6667H5.33333C3 14.6667 2 13.3333 2 11.3333V5.66668C2 3.66668 3 2.33334 5.33333 2.33334H10.6667C13 2.33334 14 3.66668 14 5.66668Z"
        stroke={strokeColor}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.4625 9.13332H10.4685"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.4625 11.1333H10.4685"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99764 9.13332H8.00363"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99764 11.1333H8.00363"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.52889 9.13332H5.53488"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.52889 11.1333H5.53488"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CalendarIcon;
