import React from "react";

interface BadgeProps {
  label: string;
  variant?: "blue" | "orange";
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "blue",
  className = "",
}) => {
  const variantStyles: Record<"blue" | "orange", { bg: string; text: string }> =
    {
      blue: {
        bg: "bg-background_badge_blue-light dark:bg-background_badge_blue-dark",
        text: "text-text_badge_blue-light dark:text-text_badge_blue-dark",
      },
      orange: {
        bg: "bg-background_badge_orange-light dark:bg-background_badge_orange-dark",
        text: "text-text_badge_orange-light dark:text-text_badge_orange-dark",
      },
    };

  const selected = variantStyles[variant];

  return (
    <span
      className={`flex flex-row justify-center items-center 
        px-1.5 py-1 rounded-[8px] 
        text-sm font-medium 
        ${selected.bg} ${selected.text} ${className}`}
    >
      {label}
    </span>
  );
};

export default Badge;
