import React from 'react';

interface RedirectWindowIconProps {
  className?: string;
  strokeColor?: string;
  width?: number;
  height?: number;
}

const RedirectWindowIcon: React.FC<RedirectWindowIconProps> = ({
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
        d="M10.8334 9.16683L17.6667 2.3335"
        stroke={strokeColor}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3333 5.6665V1.6665H14.3333"
        stroke={strokeColor}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.16663 1.6665H7.49996C3.33329 1.6665 1.66663 3.33317 1.66663 7.49984V12.4998C1.66663 16.6665 3.33329 18.3332 7.49996 18.3332H12.5C16.6666 18.3332 18.3333 16.6665 18.3333 12.4998V10.8332"
        stroke={strokeColor}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RedirectWindowIcon;
