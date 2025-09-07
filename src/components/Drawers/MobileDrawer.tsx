import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  header?: string;
  height?: number;
  children: React.ReactNode;
  leftButtonText?: string;
  rightButtonText?: string;
  onLeftButtonClick?: () => void;
  onRightButtonClick?: () => void;
  disableRightButton?: boolean;
  marginBottom?: boolean;
}

const MobileDrawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  header = "",
  height = 400,
  children,
  leftButtonText = "Cancel",
  rightButtonText = "Confirm",
  onLeftButtonClick,
  onRightButtonClick,
  disableRightButton = false,
  marginBottom = false,
}) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed sm:hidden inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        ></div>
      )}

      {/* MobileDrawer */}
      <div
        className={`fixed bottom-0 left-0 w-[99.8%] bg-white z-50 transition-transform duration-300 transform ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } rounded-t-[24px] sm:hidden py-6 px-5 dark:bg-[#0E201E] flex flex-col`}
        style={{ height: `${height}px` }}
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-[#F3F5F7]">
            {header}
          </h2>
          <button
            onClick={onClose}
            className={`flex-shrink-0 text-[#7C7C7C] transition-colors dark:text-[#F3F5F7] z-10 ${
              marginBottom ? "-mb-[24px]" : ""
            } `}
          >
            <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto pt-2 flex-1">{children}</div>

        {/* Footer Buttons */}
        <div className="flex justify-between pt-3 mt-auto">
          <button
            onClick={onLeftButtonClick || onClose}
            className="w-[90px] font-medium focus:outline-none dark:text-[#F3F5F7]"
            style={{ color: "rgba(77,80,80,1)" }}
            aria-label="leftButtonText"
          >
            {leftButtonText}
          </button>

          <button
            type="submit"
            className={`w-4/12 flex justify-center py-3 px-5 border border-transparent text-md font-medium rounded-xl text-gray-900 shadow-[0px_1px_2px_0px_rgba(20,21,26,0.05)] leading-5 ${
              !disableRightButton
                ? "bg-[#90C853] cursor-pointer"
                : "bg-gray-300 dark:bg-[#2F3232] dark:text-[#8C8E90] cursor-not-allowed"
            }`}
            aria-label="rightButtonText"
            onClick={onRightButtonClick || onClose}
            disabled={disableRightButton}
          >
            {rightButtonText}
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;
