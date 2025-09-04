import React, { useState, type ReactNode } from "react";

interface AccordionProps {
  children: ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ children }) => {
  return <div className="w-full">{children}</div>;
};

interface AccordionItemProps {
  title: string;
  children: ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center  py-3 text-left focus:outline-none"
      >
        <span className="font-medium text-gray-800">{title}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
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
