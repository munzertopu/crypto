import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";

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
  children: React.ReactElement<any>;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  placement = "bottom",
  children,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [bestPlacement, setBestPlacement] = useState(placement);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties | null>(
    null
  );
  const anchorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bestPlacementRef = useRef(bestPlacement);

  useEffect(() => {
    bestPlacementRef.current = bestPlacement;
  }, [bestPlacement]);

  const getVert = (p: string): "top" | "bottom" =>
    p.includes("top") ? "top" : "bottom";
  const getHoriz = (p: string): string => {
    if (p.includes("-start")) return "-start";
    if (p.includes("-end")) return "-end";
    return "";
  };
  const getProjectedLeft = (anchorRect: DOMRect, tw: number, horiz: string) => {
    const anchorCenterX = anchorRect.left + anchorRect.width / 2;
    if (horiz === "-start") return anchorRect.left;
    if (horiz === "-end") return anchorRect.right - tw;
    return anchorCenterX - tw / 2;
  };
  const isVerticalPlacement = (p: string) => !["left", "right"].includes(p);

  // Arrow position classes based on placement
  const getArrowClasses = () => {
    switch (bestPlacement) {
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

  const adjustPosition = useCallback(() => {
    if (!anchorRef.current || !contentRef.current || !isVisible) return;

    const anchorRect = anchorRef.current.getBoundingClientRect();
    const tooltipEl = contentRef.current;
    const tw = tooltipEl.offsetWidth;
    const th = tooltipEl.offsetHeight;
    const margin = 10;
    const spaceTop = anchorRect.top;
    const spaceBottom = window.innerHeight - anchorRect.bottom;
    const spaceLeft = anchorRect.left;
    const spaceRight = window.innerWidth - anchorRect.right;
    const anchorCenterX = anchorRect.left + anchorRect.width / 2;
    const anchorCenterY = anchorRect.top + anchorRect.height / 2;

    let currPlacement = bestPlacementRef.current;
    let newPlacement = currPlacement;

    const isVertical = isVerticalPlacement(currPlacement);
    if (isVertical) {
      let vert = getVert(currPlacement);
      const needsTop = spaceTop >= th + margin;
      const needsBottom = spaceBottom >= th + margin;
      if (vert === "bottom" && !needsBottom && needsTop) {
        vert = "top";
      } else if (vert === "top" && !needsTop && needsBottom) {
        vert = "bottom";
      }

      let horiz = getHoriz(currPlacement);
      let projectedLeft = getProjectedLeft(anchorRect, tw, horiz);
      if (projectedLeft < margin) {
        const endLeft = anchorRect.right - tw;
        if (endLeft + tw <= window.innerWidth - margin) {
          horiz = "-end";
        }
      } else if (projectedLeft + tw > window.innerWidth - margin) {
        const startLeft = anchorRect.left;
        if (startLeft + tw <= window.innerWidth - margin) {
          horiz = "-start";
        }
      }
      newPlacement = vert + horiz;
    } else {
      let hor = currPlacement;
      const needsLeft = spaceLeft >= tw + margin;
      const needsRight = spaceRight >= tw + margin;
      if (hor === "right" && !needsRight && needsLeft) {
        newPlacement = "left";
      } else if (hor === "left" && !needsLeft && needsRight) {
        newPlacement = "right";
      }
    }

    if (newPlacement !== bestPlacementRef.current) {
      setBestPlacement(newPlacement);
    }

    // Calculate position based on newPlacement
    let calcTop: number;
    let calcLeft: number;
    switch (newPlacement) {
      case "top":
      case "top-start":
      case "top-end":
        calcTop = anchorRect.top - th - margin;
        if (newPlacement === "top-start") {
          calcLeft = anchorRect.left;
        } else if (newPlacement === "top-end") {
          calcLeft = anchorRect.right - tw;
        } else {
          calcLeft = anchorCenterX - tw / 2;
        }
        break;
      case "bottom":
      case "bottom-start":
      case "bottom-end":
        calcTop = anchorRect.bottom + margin;
        if (newPlacement === "bottom-start") {
          calcLeft = anchorRect.left;
        } else if (newPlacement === "bottom-end") {
          calcLeft = anchorRect.right - tw;
        } else {
          calcLeft = anchorCenterX - tw / 2;
        }
        break;
      case "left":
        calcLeft = anchorRect.left - tw - margin;
        calcTop = anchorCenterY - th / 2;
        break;
      case "right":
        calcLeft = anchorRect.right + margin;
        calcTop = anchorCenterY - th / 2;
        break;
      default:
        calcTop = anchorRect.bottom + margin;
        calcLeft = anchorCenterX - tw / 2;
    }

    // Clamp to viewport
    calcLeft = Math.max(
      margin,
      Math.min(calcLeft, window.innerWidth - tw - margin)
    );
    calcTop = Math.max(
      margin,
      Math.min(calcTop, window.innerHeight - th - margin)
    );

    setTooltipStyle({
      top: `${calcTop}px`,
      left: `${calcLeft}px`,
      visibility: "visible",
    });
  }, [placement, isVisible]);

  // Adjust tooltip position to keep it within viewport
  useLayoutEffect(() => {
    if (isVisible) {
      // Adjust position immediately
      adjustPosition();

      // Add event listeners for resize and scroll with throttling
      let timeoutId: number | null = null;

      const throttledAdjustPosition = () => {
        if (timeoutId) return;
        timeoutId = window.setTimeout(() => {
          adjustPosition();
          timeoutId = null;
        }, 16); // ~60fps
      };

      window.addEventListener("resize", throttledAdjustPosition);
      window.addEventListener("scroll", throttledAdjustPosition, {
        passive: true,
      });

      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        window.removeEventListener("resize", throttledAdjustPosition);
        window.removeEventListener("scroll", throttledAdjustPosition);
      };
    } else {
      // Reset when closed
      setTooltipStyle(null);
      setBestPlacement(placement);
    }
  }, [isVisible, placement, adjustPosition]);

  // Handle clicks outside tooltip to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
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

  return (
    <div className="relative inline-block" ref={anchorRef}>
      {/* Clone the child element and add onClick handler */}
      {React.cloneElement(children, {
        onClick: (e: React.MouseEvent) => {
          e.stopPropagation();
          setIsVisible(!isVisible);
          // Call original onClick if it exists
          if (
            children.props &&
            typeof children.props === "object" &&
            "onClick" in children.props
          ) {
            (children.props as any).onClick(e);
          }
        },
      })}

      {/* Tooltip */}
      {isVisible && (
        <div
          ref={contentRef}
          style={{
            position: "fixed",
            zIndex: 1300,
            visibility: tooltipStyle ? "visible" : "hidden",
            top: tooltipStyle?.top ?? "-9999px",
            left: tooltipStyle?.left ?? "0px",
            ...tooltipStyle,
          }}
          className={`w-72 sm:w-64 max-w-[calc(100vw-20px)] p-3 text-sm text-white bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-700 dark:border-gray-600 ${className}`}
        >
          {/* Arrow */}
          <div
            className={`absolute w-2 h-2 bg-white dark:bg-gray-800 border border-gray-700 dark:border-gray-600 ${getArrowClasses()}`}
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
