import React from "react";

export interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  activeColor?: string;
  inactiveColor?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  enabled,
  onChange,
  className = "",
  size = "md",
  disabled = false,
  activeColor = "bg-[#90C853]",
  inactiveColor = "bg-[#CDCFD1] dark:bg-gray-700",
}) => {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!enabled);
    }
  };

  // Size configurations
  const sizeConfig = {
    sm: {
      container: "h-5 w-9",
      thumb: "h-3 w-3",
      translateOn: "translate-x-5",
      translateOff: "translate-x-1",
    },
    md: {
      container: "h-6 w-11",
      thumb: "h-4 w-4",
      translateOn: "translate-x-6",
      translateOff: "translate-x-1",
    },
    lg: {
      container: "h-7 w-14",
      thumb: "h-5 w-5",
      translateOn: "translate-x-8",
      translateOff: "translate-x-1",
    },
  };

  const config = sizeConfig[size];

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={disabled}
      className={`relative inline-flex ${config.container} items-center rounded-full transition-colors ${
        enabled ? activeColor : inactiveColor
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
      role="switch"
      aria-checked={enabled}
    >
      <span
        className={`inline-block ${config.thumb} transform rounded-full bg-white transition-transform ${
          enabled ? config.translateOn : config.translateOff
        }`}
      />
    </button>
  );
};

export default Toggle;

