type PrimaryButtonProps = {
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function PrimaryButton({
  icon,
  onClick,
  className,
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-11 h-11 flex justify-center items-center gap-1 p-3 
        box-border border border-gray-150 dark:border-gray-700 rounded-xl 
        shadow-[0px_1px_2px_0px_rgba(20,21,26,0.05)] text-gray-900 dark:text-gray-400
        bg-green-500 dark:bg-gray-900  
         ${className}`}
    >
      {icon}
    </button>
  );
}
