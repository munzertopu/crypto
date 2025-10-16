type BadgeProps = {
  content: number;
  color?: "red" | "blue" | "green" | "gray";
  max?: number;
  invisible?: boolean;
  children?: React.ReactNode;
};

const TopBadge = ({
  content,
  color = "red",
  max = 99,
  invisible = false,
  children,
}: BadgeProps) => {
  // Handle content display (e.g., cap at max value)
  const displayContent = content > max ? `${max}+` : content;

  return (
    <div className="relative inline-flex">
      {children}
      {!invisible && (
        <span
          className={`
            absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2
            flex items-center justify-center
            min-w-[1.25rem] h-5 px-1 rounded-full
            text-xs font-medium text-white
            ${
              color === "red"
                ? "bg-red-500"
                : color === "blue"
                ? "bg-blue-500"
                : color === "green"
                ? "bg-green-600"
                : "bg-gray-500"
            }
          `}
        >
          {displayContent}
        </span>
      )}
    </div>
  );
};

export default TopBadge;
