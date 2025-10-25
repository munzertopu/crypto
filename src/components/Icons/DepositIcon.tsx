interface DepositIconProps {
  width?: number | string;
  height?: number | string;
}

const DepositIcon = ({ width = 20, height = 20 }: DepositIconProps) => {
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
        d="M13 20H22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35 26.1494V28.3518C35 32.0682 34.021 33 30.116 33H17.884C13.979 33 13 32.0682 13 28.3518V19.6482C13 15.9318 13.979 15 17.884 15H23.65"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.3822 27.1113L24.1949 27.3137L26.9473 24"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.1946 27.3137L23.9922 25.1263"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.1357 20.4795C29.1357 21.0103 29.5493 21.4445 30.0525 21.4445H31.0865C31.5276 21.4445 31.886 21.0654 31.886 20.6036C31.886 20.1004 31.6655 19.9212 31.3415 19.804L29.6872 19.225C29.3563 19.1078 29.1357 18.9286 29.1357 18.4254C29.1357 17.9636 29.4942 17.5845 29.9353 17.5845H30.9693C31.4794 17.5914 31.8929 18.0187 31.8929 18.5495"
        stroke="currentColor"
        strokeWidth="1.22593"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.5075 25.015C33.5492 25.015 36.015 22.5492 36.015 19.5075C36.015 16.4658 33.5492 14 30.5075 14C27.4658 14 25 16.4658 25 19.5075C25 22.5492 27.4658 25.015 30.5075 25.015Z"
        stroke="currentColor"
        strokeWidth="1.53242"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DepositIcon;
