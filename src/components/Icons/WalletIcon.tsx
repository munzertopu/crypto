interface WalletIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const WalletIcon = ({
  width = 24,
  height = 24,
  className = "",
}: WalletIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="none"
      className={className || undefined}
    >
      <rect x="0" y="0" width="24" height="24" />
      <g>
        <path
          d="M17.0014 6.99998L7.00141 6.99998C6.72141 6.99998 6.45141 7.01998 6.19141 7.05998C6.33141 6.77998 6.53141 6.52001 6.77141 6.28001L10.0214 3.02C11.3914 1.66 13.6114 1.66 14.9814 3.02L16.7314 4.78996C17.3714 5.41996 17.7114 6.21997 17.7514 7.04997C17.5114 7.00997 17.2614 6.99998 17.0014 6.99998Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fillRule="nonzero"
        />
        <path
          d="M8.42 21.06C7.73 22.22 6.46 23 5 23C3.54 23 2.27 22.22 1.58 21.06C1.21 20.46 1 19.75 1 19C1 16.79 2.79 15 5 15C7.21 15 9 16.79 9 19C9 19.75 8.79 20.46 8.42 21.06Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fillRule="nonzero"
        />
        <path
          d="M6.49172 18.9795L3.51172 18.9795"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0 0L2.98999 0"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="matrix(0,1,-1,0,5,17.5195)"
        />
        <path
          d="M22 17C22 20 20 22 17 22L7.63 22C7.94 21.74 8.21 21.42 8.42 21.06C8.79 20.46 9 19.75 9 19C9 16.79 7.21 15 5 15C3.8 15 2.73 15.53 2 16.36L2 12C2 9.28 3.64 7.38 6.19 7.06C6.45 7.02 6.72 7 7 7L17 7C17.26 7 17.51 7.00999 17.75 7.04999C20.33 7.34999 22 9.26 22 12L22 17Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fillRule="nonzero"
        />
        <path
          d="M22 12.5L19 12.5C17.9 12.5 17 13.4 17 14.5C17 15.6 17.9 16.5 19 16.5L22 16.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
};

export default WalletIcon;



