import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Popover from "../UI/Popover";
import SecondaryButton from "../UI/Buttons/SecondaryButton";
import ThreeDotIcon from "../Icons/ThreeDotIcon";

interface DrawerProps {
  isOpen: boolean;
  noPadding?: boolean;
  onClose: () => void;
  showLogo?: boolean;
  header?: string;
  height?: string;
  children: React.ReactNode;
  noChildPadding?: boolean;
  showMoreIcon?: boolean;
  showMoreContent?: React.ReactNode;
  headerClassName?: string;
  childrenClassName?: string;
}

const MobileFormDrawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  header,
  height = "92vh",
  children,
  showLogo = false,
  noPadding = false,
  noChildPadding = false,
  showMoreIcon = false,
  showMoreContent,
  headerClassName,
  childrenClassName,
}) => {
  return (
    <>
      {/* MobileFormDrawer */}
      <div
        className={`fixed bottom-0 left-0 w-[99.7%] bg-white z-50 transition-transform duration-300 transform ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } rounded-t-[24px] sm:hidden ${
          noChildPadding ? "p-0" : "px-5 pt-8"
        } dark:bg-[#0E201E]`}
        style={{ height }}
      >
        {/* Header */}

        <div
          className={`flex justify-between items-center ${headerClassName} ${
            !noChildPadding ? "p-0" : "px-4 pt-6"
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onClose}
              className="text-[#7C7C7C] dark:text-gray-250 flex items-center justify-center "
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5005 16.5999L7.06719 11.1666C6.42552 10.5249 6.42552 9.4749 7.06719 8.83324L12.5005 3.3999"
                  stroke="currentColor"
                  stroke-width="1.2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              {/* <FontAwesomeIcon icon={faChevronLeft} className="w-6 h-6" /> */}
            </button>

            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-150">
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
          {showMoreIcon && (
            <Popover
              trigger={
                <SecondaryButton
                  icon={<ThreeDotIcon />}
                  className="flex sm:hidden !border-none !shadow-none !bg-transparent dark:!bg-transparent"
                />
              }
              position="bottom-right"
            >
              <div className="py-2 px-3 min-w-[180px] flex flex-col gap-2">
                {showMoreContent}
              </div>
            </Popover>
          )}
        </div>

        {/* Content */}
        <div
          className={`${
            noPadding ? "py-4" : "p-4"
          }  overflow-y-auto flex flex-col justify-between items-start ${childrenClassName}`}
          style={{ height: `calc(${height} - 140px)` }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default MobileFormDrawer;
