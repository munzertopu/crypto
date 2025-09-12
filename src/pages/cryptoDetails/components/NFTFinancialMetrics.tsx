import React, { useState } from "react";
import Card from "../../../components/FinancialCard";

interface NFTSectionProps {
  totalNFTs: string;
  totalPurchaseValue: string;
  totalEstimatedValue: string;
  estimatedGainLoss: string;
  gainLossPercentage: string;
  isDarkMode?: boolean;
}

const NFTSection: React.FC<NFTSectionProps> = ({
  totalNFTs = "13",
  totalPurchaseValue = "$21,200",
  totalEstimatedValue = "$35,800",
  estimatedGainLoss = "$17,150",
  gainLossPercentage = "+5.15%",
}) => {
  // SVG Icons for NFT Cards
  const totalNFTsSvg = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 8.38086H13.6846C14.7231 8.38086 15.5654 9.31548 15.5654 10.2616C15.5654 11.3001 14.7231 12.1424 13.6846 12.1424H9V8.38086Z"
        stroke="#7C7C7C"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12.1309H14.3539C15.5423 12.1309 16.5 12.9732 16.5 14.0116C16.5 15.0501 15.5423 15.8924 14.3539 15.8924H9V12.1309Z"
        stroke="#7C7C7C"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.2769 15.8809V17.7616"
        stroke="#7C7C7C"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.93457 15.8809V17.7616"
        stroke="#7C7C7C"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.2769 6.5V8.38077"
        stroke="#7C7C7C"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.93457 6.5V8.38077"
        stroke="#7C7C7C"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.7769 8.38086H7.5"
        stroke="#7C7C7C"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.7769 15.8809H7.5"
        stroke="#7C7C7C"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke="#7C7C7C"
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
    </svg>
  );

  const totalPurchaseValueSvg = (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="24.000000"
      height="24.000000"
      fill="none"
    >
      <rect
        id="Property 2=coin"
        width="24.000000"
        height="24.000000"
        x="0.000000"
        y="0.000000"
        fill="rgb(255,255,255)"
        fillOpacity="0"
      />
      <g id="vuesax/linear/coin">
        <path
          id="Vector"
          d="M18.5 16.3499C18.5 19.4699 15.59 21.9999 12 21.9999C8.41 21.9999 5.5 19.4699 5.5 16.3499L5.5 12.6499C5.5 15.7699 8.41 17.9999 12 17.9999C15.59 17.9999 18.5 15.7699 18.5 12.6499L18.5 16.3499Z"
          fillRule="nonzero"
          stroke="rgb(124,124,124)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          id="Vector"
          d="M17.81 10.12C16.74 11.88 14.54 13 12 13C9.46 13 7.26 11.88 6.19 10.12C5.75 9.4 5.5 8.56 5.5 7.65C5.5 6.09 6.22999 4.68 7.39999 3.66C8.57999 2.63 10.2 2 12 2C13.8 2 15.42 2.63 16.6 3.65C17.77 4.68 18.5 6.09 18.5 7.65C18.5 8.56 18.25 9.4 17.81 10.12Z"
          fillRule="nonzero"
          stroke="rgb(124,124,124)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          id="Vector"
          d="M18.5 12.65C18.5 15.77 15.59 18 12 18C8.41 18 5.5 15.77 5.5 12.65L5.5 7.65C5.5 4.53 8.41 2 12 2C13.8 2 15.42 2.63 16.6 3.65C17.77 4.68 18.5 6.09 18.5 7.65L18.5 12.65Z"
          fillRule="nonzero"
          stroke="rgb(124,124,124)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path id="Vector" opacity="0" />
      </g>
    </svg>
  );

  const totalEstimatedValueSvg = (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="24.000000"
      height="24.000000"
      fill="none"
    >
      <rect
        id="Property 2=status-up"
        width="24.000000"
        height="24.000000"
        x="0.000000"
        y="0.000000"
        fill="rgb(255,255,255)"
        fillOpacity="0"
      />
      <g id="vuesax/linear/status-up">
        <g id="status-up">
          <path
            id="Vector"
            d="M2.07 0L0 0"
            stroke="rgb(124,124,124)"
            strokeLinecap="round"
            strokeWidth="1.5"
            transform="matrix(0,1,-1,0,6.88,16.0801)"
          />
          <path
            id="Vector"
            d="M4.14 0L0 0"
            stroke="rgb(124,124,124)"
            strokeLinecap="round"
            strokeWidth="1.5"
            transform="matrix(0,1,-1,0,12,14.0098)"
          />
          <path
            id="Vector"
            d="M6.22 0L0 0"
            stroke="rgb(124,124,124)"
            strokeLinecap="round"
            strokeWidth="1.5"
            transform="matrix(0,1,-1,0,17.12,11.9302)"
          />
          <path
            id="Vector"
            d="M17.12 5.8501L16.66 6.3901C14.11 9.3701 10.69 11.4801 6.88 12.4301"
            fillRule="nonzero"
            stroke="rgb(124,124,124)"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <path
            id="Vector"
            d="M14.19 5.8501L17.12 5.8501L17.12 8.7701"
            fillRule="nonzero"
            stroke="rgb(124,124,124)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            id="Vector"
            d="M15 22C20 22 22 20 22 15L22 9C22 4 20 2 15 2L9 2C4 2 2 4 2 9L2 15C2 20 4 22 9 22L15 22Z"
            fillRule="nonzero"
            stroke="rgb(124,124,124)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path id="Vector" opacity="0" />
        </g>
      </g>
    </svg>
  );

  const estimatedGainLossSvg = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke="#7C7C7C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 15L15 9"
        stroke="#7C7C7C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.4945 14.5H14.5035"
        stroke="#7C7C7C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.49451 9.5H9.50349"
        stroke="#7C7C7C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  return (
    <div className="px-2 my-6 md:my-0">
      <div
        className={`grid grid-cols-2 gap-8 md:gap-0 md:grid md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] lg:flex lg:flex-row lg:justify-between lg:items-stretch lg:flex-wrap `}
      >
        <Card
          title="Total number of NFTs"
          value={totalNFTs}
          svgIcon={totalNFTsSvg}
        />

        {/* Divider */}
        <div className="hidden xl:block flex-shrink-0 w-px h-20 bg-[#E1E3E5] dark:bg-[#8C8E90] mx-10 "></div>

        <Card
          title="Total Purchase Value"
          value={totalPurchaseValue}
          svgIcon={totalPurchaseValueSvg}
        />

        {/* Divider */}
        <div className="hidden xl:block flex-shrink-0 w-px h-20 bg-[#E1E3E5] dark:bg-[#8C8E90] mx-10 "></div>

        <Card
          title="Total Estimated Value"
          value={totalEstimatedValue}
          svgIcon={totalEstimatedValueSvg}
        />

        {/* Divider */}
        <div className="hidden xl:block flex-shrink-0 w-px h-20 bg-[#E1E3E5] dark:bg-[#8C8E90] mx-10 "></div>

        <Card
          title="Estimated Gain/Loss"
          value={estimatedGainLoss}
          change={gainLossPercentage}
          isPositive={gainLossPercentage.startsWith("+")}
          svgIcon={estimatedGainLossSvg}
        />
      </div>
    </div>
  );
};

export default NFTSection;
