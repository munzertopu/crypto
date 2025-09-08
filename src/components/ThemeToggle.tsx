import React from "react";

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-[22px] w-[52px] lg:h-7 lg:w-14 items-center rounded-full transition-colors bg-[#E1E3E5]
        dark:bg-[#2F3232]`}
      role="switch"
      aria-checked={isDarkMode}
      aria-label="Toggle theme"
    >
      <span
        className={`inline-block h-[18px] w-[18px] lg:h-6 lg:w-6 transform rounded-full transition-transform translate-x-0.5 bg-[#FFFFFF]
          dark:translate-x-7 dark:bg-[#4D5050]
          `}
      >
        <div
          className={`flex items-center justify-center h-full w-full text-[#0E201E] dark:text-[#CDCFD1]`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
        </div>
      </span>
    </button>
  );
};

export default ThemeToggle;
