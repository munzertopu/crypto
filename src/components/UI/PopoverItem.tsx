import React, { ReactNode } from "react";

export interface PopoverItemProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
}

const PopoverItem: React.FC<PopoverItemProps> = ({
  children,
  onClick,
  icon,
  className = "",
  disabled = false,
}) => {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`
        flex items-center gap-2 px-3 py-2 w-full text-left text-sm text-gray-900 dark:text-gray-150
        ${disabled 
          ? "opacity-50 cursor-not-allowed" 
          : "hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
        }
        transition-colors duration-150
        ${className}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="flex-1">{children}</span>
    </div>
  );
};

export default PopoverItem;

