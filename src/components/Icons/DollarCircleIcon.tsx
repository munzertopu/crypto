interface DollarCircleIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const DollarCircleIcon = ({
  width = 20,
  height = 20,
  className = "",
}: DollarCircleIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="none"
      className={className || undefined}
    >
      <rect width="20" height="20" x="0" y="0" />
      <g>
        <path
          d="M7.22656 11.9417C7.22656 13.0167 8.05156 13.8834 9.07656 13.8834L11.1682 13.8834C12.0599 13.8834 12.7849 13.125 12.7849 12.1917C12.7849 11.175 12.3432 10.8167 11.6849 10.5834L8.32656 9.4167C7.66823 9.18337 7.22656 8.82503 7.22656 7.80837C7.22656 6.87503 7.95156 6.1167 8.84323 6.1167L10.9349 6.1167C11.9599 6.1167 12.7849 6.98337 12.7849 8.05837"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fillRule="nonzero"
        />
        <path
          d="M0 0L10 0"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="matrix(0,1,-1,0,10,5)"
        />
        <path
          d="M10.0003 18.3332C5.39795 18.3332 1.66699 14.6022 1.66699 9.99984C1.66699 5.39746 5.39795 1.6665 10.0003 1.6665C14.6027 1.6665 18.3337 5.39746 18.3337 9.99984C18.3337 14.6022 14.6027 18.3332 10.0003 18.3332Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default DollarCircleIcon;



