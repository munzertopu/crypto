import React, { useState, type ReactNode } from "react";

interface AccordionProps {
  children: ReactNode;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`w-full flex flex-col gap-4 pt-3 ${className}`}>
      {children}
    </div>
  );
};

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`bg-white dark:bg-[#0E201E] ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-1.5 text-left focus:outline-none opacity-80"
      >
        <span className="text-base font-medium text-gray-800 dark:text-[#F3F5F7] ">
          {title}
        </span>
        <svg
          className={`w-5 h-5 text-gray-800 dark:text-[#F3F5F7] transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && <div className=" text-gray-600">{children}</div>}
    </div>
  );
};
