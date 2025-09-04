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
}

const MobileDrawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  header,
  height = 400,
  children,
  leftButtonText = "Cancel",
  rightButtonText = "Confirm",
  onLeftButtonClick,
  onRightButtonClick,
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
        } rounded-t-[24px] sm:hidden py-6 px-5`}
        style={{ height: `${height}px` }}
      >
        {/* Header */}
        {(header || onClose) && (
          <div className="flex justify-between items-start">
            {header && (
              <h2 className="text-lg font-semibold text-gray-800">{header}</h2>
            )}
            <button
              onClick={onClose}
              className="flex-shrink-0 text-[#7C7C7C] transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Content */}
        <div
          className="overflow-y-auto flex flex-col justify-between items-start pt-2"
          style={{ height: `${height - 140}px` }}
        >
          {children}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between pt-3">
          <button
            onClick={onLeftButtonClick || onClose}
            className="w-[90px] font-medium focus:outline-none"
            style={{ color: "rgba(77,80,80,1)" }}
            aria-label="leftButtonText"
          >
            {leftButtonText}
          </button>

          <button
            type="submit"
            className="w-4/12 flex justify-center py-3 px-5 border border-transparent text-md font-medium rounded-xl text-gray-900"
            style={{ backgroundColor: "#90C853" }}
            aria-label="rightButtonText"
            onClick={onRightButtonClick || onClose}
          >
            {rightButtonText}
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;
