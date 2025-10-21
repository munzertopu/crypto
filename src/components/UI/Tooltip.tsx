import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

interface TooltipProps {
  title: string | React.ReactNode;
  placement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end";
  children: React.ReactElement;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  placement = "bottom",
  children,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [adjustedPlacement, setAdjustedPlacement] = useState(placement);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Adjust tooltip position to keep it within viewport
  useLayoutEffect(() => {
    const adjustPosition = () => {
      if (contentRef.current && tooltipRef.current) {
        const tooltipRect = contentRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let newPlacement = placement;

        // Check horizontal overflow
        if (tooltipRect.right > viewportWidth - 10) {
          // Tooltip overflows right
          if (placement === "bottom" || placement === "top") {
            newPlacement = placement === "bottom" ? "bottom-end" : "top-end";
          } else if (
            placement === "bottom-start" ||
            placement === "top-start"
          ) {
            newPlacement =
              placement === "bottom-start" ? "bottom-end" : "top-end";
          }
        } else if (tooltipRect.left < 10) {
          // Tooltip overflows left
          if (placement === "bottom" || placement === "top") {
            newPlacement =
              placement === "bottom" ? "bottom-start" : "top-start";
          } else if (placement === "bottom-end" || placement === "top-end") {
            newPlacement =
              placement === "bottom-end" ? "bottom-start" : "top-start";
          }
        }

        // Check vertical overflow
        if (tooltipRect.bottom > viewportHeight - 10) {
          // Tooltip overflows bottom, switch to top
          if (placement.includes("bottom")) {
            newPlacement = newPlacement.replace("bottom", "top") as any;
          }
        } else if (tooltipRect.top < 10) {
          // Tooltip overflows top, switch to bottom
          if (placement.includes("top")) {
            newPlacement = newPlacement.replace("top", "bottom") as any;
          }
        }

        setAdjustedPlacement(newPlacement);
      }
    };

    if (isVisible) {
      // Adjust position immediately
      adjustPosition();

      // Also adjust on window resize and scroll
      window.addEventListener("resize", adjustPosition);
      window.addEventListener("scroll", adjustPosition, true);

      return () => {
        window.removeEventListener("resize", adjustPosition);
        window.removeEventListener("scroll", adjustPosition, true);
      };
    } else {
      // Reset to original placement when closed
      setAdjustedPlacement(placement);
    }
  }, [isVisible, placement]);

  // Handle clicks outside tooltip to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  // Position classes based on placement
  const getPositionClasses = () => {
    switch (adjustedPlacement) {
      case "top":
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
      case "top-start":
        return "bottom-full left-0 mb-2";
      case "top-end":
        return "bottom-full right-0 mb-2";
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1/2 mt-2";
      case "bottom-start":
        return "top-full left-0 mt-2";
      case "bottom-end":
        return "top-full right-0 mt-2";
      case "left":
        return "right-full top-1/2 transform -translate-y-1/2 mr-2";
      case "right":
        return "left-full top-1/2 transform -translate-y-1/2 ml-2";
      default:
        return "top-full left-1/2 transform -translate-x-1/2 mt-2";
    }
  };

  // Arrow position classes based on placement
  const getArrowClasses = () => {
    switch (adjustedPlacement) {
      case "top":
        return "top-full left-1/2 transform -translate-x-1/2 -mt-1 rotate-45 border-b border-r";
      case "top-start":
        return "top-full left-4 -mt-1 rotate-45 border-b border-r";
      case "top-end":
        return "top-full right-4 -mt-1 rotate-45 border-b border-r";
      case "bottom":
        return "bottom-full left-1/2 transform -translate-x-1/2 -mb-1 rotate-45 border-l border-t";
      case "bottom-start":
        return "bottom-full left-4 -mb-1 rotate-45 border-l border-t";
      case "bottom-end":
        return "bottom-full right-4 -mb-1 rotate-45 border-l border-t";
      case "left":
        return "left-full top-1/2 transform -translate-y-1/2 -ml-1 rotate-45 border-t border-r";
      case "right":
        return "right-full top-1/2 transform -translate-y-1/2 -mr-1 rotate-45 border-b border-l";
      default:
        return "bottom-full left-1/2 transform -translate-x-1/2 -mb-1 rotate-45 border-l border-t";
    }
  };

  return (
    <div className="relative inline-block" ref={tooltipRef}>
      {/* Clone the child element and add onClick handler */}
      {React.cloneElement(children, {
        onClick: (e: React.MouseEvent) => {
          e.stopPropagation();
          setIsVisible(!isVisible);
          // Call original onClick if it exists
          if (children.props.onClick) {
            children.props.onClick(e);
          }
        },
      })}

      {/* Tooltip */}
      {isVisible && (
        <div
          ref={contentRef}
          className={`absolute z-50 w-72 sm:w-64 p-3 text-sm text-white bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-700 dark:border-gray-600 ${getPositionClasses()} ${className}`}
          style={{ maxWidth: "calc(100vw - 20px)" }}
        >
          {/* Arrow */}
          <div
            className={`absolute w-2 h-2 bg-gray-900 dark:bg-gray-800 border-gray-700 dark:border-gray-600 ${getArrowClasses()}`}
          ></div>

          {/* Content */}
          {typeof title === "string" ? (
            <p className="text-xs leading-relaxed">{title}</p>
          ) : (
            title
          )}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
