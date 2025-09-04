import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

interface DrawerProps {
  isOpen: boolean;
  noPadding?: boolean;
  onClose: () => void;
  showLogo?: boolean;
  header?: string;
  height?: string;
  children: React.ReactNode;
}

const MobileFormDrawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  header,
  height = "92vh",
  children,
  showLogo = false,
  noPadding = false,
}) => {
  return (
    <>
      {/* MobileFormDrawer */}
      <div
        className={`fixed bottom-0 left-0 w-[99.7%] bg-white z-50 transition-transform duration-300 transform ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } rounded-t-[24px] sm:hidden p-8 dark:bg-[#0E201E]`}
        style={{ height }}
      >
        {/* Header */}

        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onClose}
              className="text-[#7C7C7C] dark:text-[#F3F5F7] flex items-center justify-center "
            >
              <FontAwesomeIcon icon={faChevronLeft} className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#F3F5F7]">
              {header}
            </h2>
          </div>
          {showLogo && (
            <div className="flex items-center">
              <img
                src="/logo-only.png"
                alt="Portal"
                className="h-6 sm:h-7 lg:h-7 w-auto"
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className={`${
            noPadding ? "py-4" : "p-4"
          }  overflow-y-auto flex flex-col justify-between items-start`}
          style={{ height: `calc(${height} - 140px)` }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default MobileFormDrawer;
