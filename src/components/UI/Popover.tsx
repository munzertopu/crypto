import React, { useState, useEffect, useRef, ReactNode } from "react";

export interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right" | "bottom-center" | "top-center";
  offset?: number;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  className = "",
  contentClassName = "",
  position = "bottom-left",
  offset = 8,
  isOpen: controlledIsOpen,
  onOpenChange,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  
  const handleToggle = () => {
    const newState = !isOpen;
    if (onOpenChange) {
      onOpenChange(newState);
    } else {
      setInternalIsOpen(newState);
    }
  };

  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false);
    } else {
      setInternalIsOpen(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  // Position classes mapping
  const positionClasses = {
    "bottom-left": "top-full left-0",
    "bottom-right": "top-full right-0",
    "bottom-center": "top-full left-1/2 -translate-x-1/2",
    "top-left": "bottom-full left-0",
    "top-right": "bottom-full right-0",
    "top-center": "bottom-full left-1/2 -translate-x-1/2",
  };

  return (
    <div className={`relative inline-block ${className}`} ref={popoverRef}>
      <div onClick={handleToggle} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div
          className={`absolute ${positionClasses[position]} z-50 ${contentClassName}`}
          style={{ 
            marginTop: position.startsWith('bottom') ? `${offset}px` : undefined,
            marginBottom: position.startsWith('top') ? `${offset}px` : undefined,
          }}
        >
          <div
            className="flex flex-col justify-center items-start gap-0.5 py-2 px-0 box-border border border-default rounded-xl bg-white dark:bg-gray-900 dark:border-gray-700 min-w-max"
            style={{
              boxShadow: "2px -1px 6px 0px rgba(0, 0, 0, 0.05)",
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Popover;

