import React from "react";

type CheckboxProps = {
  checked: boolean;
  onChange: () => void;
  label?: string;
  className?: string;
  size?: number; // in rem or px
  withPadding?: boolean; // manually control padding
};

export default function Checkbox({
  checked,
  onChange,
  label,
  className = "",
  size = 20, // default 20px (same as w-5 h-5)
  withPadding = false,
}: CheckboxProps) {
  const hasPadding = label || withPadding;

  return (
    <div
      className={`flex items-center justify-start cursor-pointer gap-2 w-full ${
        hasPadding ? "p-1.5" : ""
      } ${className}`}
      onClick={onChange}
      role="menuitemcheckbox"
      aria-checked={checked}
      aria-label={label ? `Toggle ${label}` : "Toggle checkbox"}
    >
      <div
        className={`flex items-center justify-center rounded-[4px] border-2 transition-colors ${
          checked
            ? "bg-green-600 dark:bg-[#5F9339] border-[#90C853]"
            : "border-[rgba(124,124,124,0.15)]"
        }`}
        style={{ width: size, height: size }}
      >
        {checked && (
          <svg
            width={size * 0.6}
            height={size * 0.4}
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white dark:text-gray-900"
          >
            <path
              d="M1.5 4L4.49647 7L10.5 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {label && (
        <span className="text-[#0E201E] dark:text-primary text-base leading-5 opacity-80">
          {label}
        </span>
      )}
    </div>
  );
}
