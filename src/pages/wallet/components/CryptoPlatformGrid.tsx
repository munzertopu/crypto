import React, { useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ConfigureModal from "./ConfigureModal";
import SuccessNotification from "../../../components/SuccessNotification";
import useScreenSize from "../../../hooks/useScreenSize";
import MobileDrawer from "../../../components/Drawers/MobileDrawer";
import WalletConfigureForm from "../../../components/Forms/WalletConfigureForm";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isVisible && containerRef.current && tooltipRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const padding = 8;

      // Preferred position: bottom
      let top = containerRect.bottom + 8;
      let left =
        containerRect.left + containerRect.width / 2 - tooltipRect.width / 2;

      // Clamp horizontally
      if (left < padding) left = padding;
      if (left + tooltipRect.width > window.innerWidth - padding) {
        left = window.innerWidth - tooltipRect.width - padding;
      }

      // If bottom overflows, place on top
      if (top + tooltipRect.height > window.innerHeight - padding) {
        top = containerRect.top - tooltipRect.height - 8;
        if (top < padding) {
          // If even top overflows, stick to top edge
          top = padding;
        }
      }

      setStyle({
        position: "fixed",
        top,
        left,
        zIndex: 50,
      });
    }
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          style={style}
          className="hidden md:block px-3 py-2 text-base font-medium rounded-lg shadow-lg whitespace-nowrap bg-[#0E201E] dark:bg-[#2F3232] text-white"
        >
          {text}
        </div>
      )}
    </div>
  );
};

interface CryptoPlatform {
  name: string;
  logo: string;
  status: "add" | "connected" | "error";
  bgColor: string;
}

interface CryptoPlatformGridProps {}

const CryptoPlatformGrid: React.FC<CryptoPlatformGridProps> = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [isWalletAddressValid, setIsWalletAddressValid] = useState(false);

  const screenSize = useScreenSize();
  const [openConfigure, setOpenConfigure] = useState(false);

  const handlePlatformClick = (platform: CryptoPlatform) => {
    setSelectedPlatform(platform.name);
    
    // If status is error, show configure modal
    if (platform.status === "error") {
      if (screenSize.width < 640) {
        setOpenConfigure(false);
        setTimeout(() => {
          setOpenConfigure(true);
        }, 500);
        return;
      }
      setIsModalOpen(true);
    } else {
      // Otherwise, navigate to wallet details page
      const platformSlug = platform.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      navigate(`/wallet/${platformSlug}`);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    setOpenConfigure(false);
  };

  const handleConfigureSuccess = () => {
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
    setSelectedPlatform("");
  };
  const cryptoPlatforms: CryptoPlatform[] = [
    {
      name: "Bitcoin",
      logo: "crypto/bitcoin-btc-logo.png",
      status: "add",
      bgColor: "bg-orange-500",
    },
    {
      name: "Coinbase",
      logo: "crypto/coinbase.png",
      status: "connected",
      bgColor: "bg-blue-500",
    },
    {
      name: "Meta mask",
      logo: "crypto/metamask.png",
      status: "add",
      bgColor: "bg-orange-500",
    },
    {
      name: "Phantom",
      logo: "crypto/pahton.png",
      status: "add",
      bgColor: "bg-purple-500",
    },
    {
      name: "Kraken",
      logo: "crypto/kraken.png",
      status: "connected",
      bgColor: "bg-purple-500",
    },
    {
      name: "Gemini",
      logo: "crypto/gemini.png",
      status: "error",
      bgColor: "bg-gray-800",
    },
    {
      name: "Crypto.com",
      logo: "crypto/crypto.png",
      status: "add",
      bgColor: "bg-blue-500",
    },
    {
      name: "Exodus",
      logo: "crypto/exodus.png",
      status: "add",
      bgColor: "bg-blue-500",
    },
    {
      name: "Trezor",
      logo: "crypto/trezor.png",
      status: "connected",
      bgColor: "bg-gray-800",
    },
    {
      name: "Zengo",
      logo: "crypto/zengo.png",
      status: "connected",
      bgColor: "bg-gray-800",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "add":
        return <FontAwesomeIcon icon={faPlus} className="w-4 h-4 text-white" />;
      case "connected":
        return (
          <svg
            className="w-4 h-4 text-black"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "error":
        return (
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "add":
        return "bg-[#419F45]";
      case "connected":
        return "bg-[#CDCFD1]";
      case "error":
        return "bg-[#D8382C]";
      default:
        return "bg-[#419F45]";
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-10 md:gap-5 mt-5 sm:mt-10 md:mt-6">
        {cryptoPlatforms.map((platform) => (
          <Tooltip
            key={platform.name}
            text={`${platform.name} does not match API balance`}
          >
            <div
              className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity justify-center rounded-[12px] px-6 py-2 sm:px-0 sm:py-0 sm:px-6 md:px-5 sm:py-4 md:py-5 
              border border-gray-150 dark:border-[#B6B8BA]"
              onClick={() => handlePlatformClick(platform)}
            >
              <div className="relative mb-6">
                <div
                  className={`max-w-15 max-h-15 rounded-full flex items-center justify-center`}
                >
                  <img src={platform.logo} height={"60px"} width={"60px"} />
                </div>
                <div
                  className={`absolute -bottom-1 -right-1 w-7 h-7 ${getStatusColor(
                    platform.status
                  )} rounded-full border-2 border-white flex items-center justify-center`}
                >
                  {getStatusIcon(platform.status)}
                </div>
              </div>
              <span
                className={`text-lg font-medium text-center text-gray-800
                  dark:text-[#B6B8BA]`}
              >
                {platform.name}
              </span>
            </div>
          </Tooltip>
        ))}
      </div>

      <ConfigureModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        platformName={selectedPlatform}
        onConfigureSuccess={handleConfigureSuccess}
      />
      <MobileDrawer
        isOpen={openConfigure}
        key={selectedPlatform}
        onClose={() => setOpenConfigure(false)}
        header={`Configure ${selectedPlatform} address`}
        height={isWalletAddressValid ? 400 : 260}
        leftButtonText="Cancel"
        rightButtonText="Configure"
        disableRightButton={!isWalletAddressValid}
        onLeftButtonClick={() => setOpenConfigure(false)}
        onRightButtonClick={() => {
          setOpenConfigure(false);
          setShowNotification(true);
        }}
      >
        <div
          key={selectedPlatform}
          className="flex items-center justify-center w-full"
        >
          <WalletConfigureForm
            key={selectedPlatform}
            isOpen={openConfigure}
            onClose={handleCloseModal}
            platformName={selectedPlatform}
            onConfigureSuccess={handleConfigureSuccess}
            showHeader={false}
            showFooter={false}
            setIsWalletAddressValid={setIsWalletAddressValid}
          />
        </div>
      </MobileDrawer>
      {/* Success Notification */}
      <SuccessNotification
        message={`${selectedPlatform} wallet configured successfully`}
        isVisible={showNotification}
        onClose={handleCloseNotification}
        duration={5000}
      />
    </>
  );
};

export default CryptoPlatformGrid;
