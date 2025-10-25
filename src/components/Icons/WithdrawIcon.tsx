interface WithdrawIconProps {
  width?: number | string;
  height?: number | string;
}

const WithdrawIcon = ({ width = 20, height = 20 }: WithdrawIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-gray-600 dark:text-gray-400"
    >
      <path
        d="M21.5 25.75C21.5 26.72 22.25 27.5 23.17 27.5H25.05C25.85 27.5 26.5 26.82 26.5 25.97C26.5 25.06 26.1 24.73 25.51 24.52L22.5 23.47C21.91 23.26 21.51 22.94 21.51 22.02C21.51 21.18 22.16 20.49 22.96 20.49H24.84C25.76 20.49 26.51 21.27 26.51 22.24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 19.5V28.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34 24C34 29.52 29.52 34 24 34C18.48 34 14 29.52 14 24C14 18.48 18.48 14 24 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34 18V14H30"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29 19L34 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default WithdrawIcon;
