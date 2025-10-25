interface BoardEditIconProps {
  width?: number | string;
  height?: number | string;
}

const BoardEditIcon = ({ width = 20, height = 20 }: BoardEditIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-gray-600 dark:text-gray-400"
    >
      <path
        d="M5.83301 8.5H11.6663"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.83301 11.8334H9.48301"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.33366 5.00002H11.667C13.3337 5.00002 13.3337 4.16669 13.3337 3.33335C13.3337 1.66669 12.5003 1.66669 11.667 1.66669H8.33366C7.50033 1.66669 6.66699 1.66669 6.66699 3.33335C6.66699 5.00002 7.50033 5.00002 8.33366 5.00002Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3333 3.35004C16.1083 3.50004 17.5 4.52504 17.5 8.33337V10.5M6.66667 3.35004C3.89167 3.50004 2.5 4.53337 2.5 8.33337V13.3334C2.5 16.6667 3.33333 18.3334 7.5 18.3334H10.3814"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.3956 13.0057L12.8292 16.0595C12.7323 16.1754 12.6386 16.4039 12.6198 16.562L12.5041 17.7006C12.4635 18.1117 12.7261 18.3928 13.0887 18.3226L14.0952 18.1293C14.2359 18.1012 14.4328 17.9852 14.5297 17.8657L17.096 14.812C17.5399 14.2848 17.7399 13.6839 17.0491 12.9495C16.3614 12.2221 15.8394 12.4786 15.3956 13.0057Z"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BoardEditIcon;
