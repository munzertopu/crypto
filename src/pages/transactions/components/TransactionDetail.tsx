import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost, faExchange } from "@fortawesome/free-solid-svg-icons";
import { Card, Typography, CardBody, Avatar } from "@material-tailwind/react";
import { ledgerData, costAnalysisData } from "../../../data/transactionAssets";
import useScreenSize from "../../../hooks/useScreenSize";
import { Popover } from "../../../components";
import EyeIcon from "../../../components/Icons/EyeIcon";
import RefreshIcon from "../../../components/Icons/RefreshIcon";
import MobileDrawer from "../../../components/Drawers/MobileDrawer";
import WalletConfigureForm from "../../../components/Forms/WalletConfigureForm";
import SuccessNotification from "../../../components/SuccessNotification";

interface TransactionDetailProps {
  selectedRow?: {
    status: string;
    sent: string;
    received: string;
    wallet: {
      address: string;
      name: string;
    };
    date: string;
    result: string;
    transactionId: string;
  } | null;
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({
  selectedRow,
}) => {
  const screenSize = useScreenSize();
  const defaultTabs = ["Details", "Ledger", "Cost analysis"];
  const mobileTabs = ["Transaction"];
  const [activeTab, setActiveTab] = useState(
    screenSize.width <= 768 ? "Transaction" : "Details"
  );
  const tabs =
    screenSize.width <= 768 ? [...mobileTabs, ...defaultTabs] : defaultTabs;

  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [isWalletAddressValid, setIsWalletAddressValid] = useState(false);

  const [openConfigure, setOpenConfigure] = useState(false);

  const handleCloseModal = () => {
    setOpenConfigure(false);
  };

  const handleConfigureSuccess = () => {
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
    setSelectedPlatform("");
  };
  return (
    <div className="w-full sm:w-[auto] md:space-y-2 md:mx-4 md:px-2 md:py-4 rounded-xl bg-transparent md:bg-white dark:bg-transparent md:dark:bg-gray-800 ">
      {/* Tabs */}
      <div className="w-full sm:w-[auto] flex border-b border-gray-200 ">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`"w-full sm:w-[auto] mx-4 md:mx-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === tab
                ? "border-[#75AE46] dark:text-gray-250"
                : `border-transparent text-gray-500 hover:text-gray-700 dark: text-gray-400 dark: hover:text-gray-300`
            }`}
            aria-label={`View transaction ${tab.toLowerCase()}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="pb-6 sm:pb-0"></div>
      {activeTab === "Transaction" && (
        <div className="flex flex-col gap-6 w-full">
          <>
            <div className="flex flex-col justify-start items-start w-full px-4">
              <div className="flex justify-between items-center w-full ">
                <span className="text-base  text-[#4D5050] dark:text-gray-250">
                  Sent Amount:
                </span>

                {selectedRow?.wallet?.name.includes("Avax") ? (
                  <Popover
                    trigger={
                      <div className="flex flex-col">
                        <span className="text-right">-</span>
                        <div className="px-3 py-2 border border-gray-150 rounded-[12px] bg-gray-150 dark:bg-gray-800">
                          <span className="text-gray-600 text-sm">
                            {" "}
                            Cypto Com
                          </span>
                        </div>
                      </div>
                    }
                    position="bottom-right"
                  >
                    <div className="py-2 px-3 min-w-[200px] flex flex-col gap-2">
                      {" "}
                      <div
                        onClick={() => setOpenConfigure(true)}
                        className="flex gap-2 items-center py-1.5 cursor-pointer"
                      >
                        <RefreshIcon />
                        <span className="text-sm text-gray-900 dark:text-gray-100">
                          Configure Address
                        </span>
                      </div>
                      <div className="flex gap-2 items-center py-1.5">
                        <EyeIcon />
                        <span className="text-sm text-gray-900 dark:text-gray-100">
                          View interactions
                        </span>
                      </div>
                    </div>
                  </Popover>
                ) : (
                  <span className="text-base font-medium text-[#0e201e] dark:text-gray-250 transform capitalize">
                    "-1,000 USDT"
                  </span>
                )}
              </div>
            </div>
          </>

          {selectedRow?.received !== "" && (
            <>
              <div className="flex flex-col justify-start items-start w-full px-4">
                <div className="flex justify-between items-center w-full ">
                  <span className="text-base  text-[#4D5050] dark:text-gray-250">
                    Receive Amount:
                  </span>
                  <div className="flex flex-col gap-0.5 justify-start items-end">
                    <span className="text-base font-medium text-[#0e201e] dark:text-gray-250 transform capitalize">
                      {selectedRow?.received}
                    </span>
                    <span className="text-base font-medium text-gray-600 dark:text-gray-250 transform capitalize">
                      = $50,000
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex flex-col justify-start items-start w-full px-4">
            <div className="flex justify-between items-center w-full ">
              <span className="text-base  text-[#4D5050] dark:text-gray-250">
                Result:
              </span>
              <span className="text-base font-medium text-green-500 dark:text-gray-250 transform capitalize">
                {selectedRow?.result}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start w-full px-4">
            <div className="flex justify-between items-center w-full ">
              <span className="text-base  text-[#4D5050] dark:text-gray-250">
                Date & Time:
              </span>
              <span className="text-base font-medium text-[#0e201e] dark:text-gray-250 transform capitalize">
                May 15, 2025, 12:38 AM
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start w-full px-4">
            <div className="flex justify-between items-center w-full ">
              <span className="text-base  text-[#4D5050] dark:text-gray-250">
                Transaction ID:
              </span>
              <span className="text-base font-medium text-[#0e201e] dark:text-gray-250 transform capitalize">
                {selectedRow?.transactionId}
              </span>
            </div>
          </div>
        </div>
      )}
      {activeTab === "Details" && (
        <div className="flex flex-col md:flex-row justify-start md:justify-between items-start py-2 px-4 md:px-0">
          {/* Transaction Type and Date - Left Side */}
          <div className="md:w-1/4 flex flex-col items-start md:items-start">
            <h3 className="text-lg font-semibold mb-2 dark:text-gray-250">
              Transfer
            </h3>
            <p className={`text-sm text-gray-600 dark:text-gray-400`}>
              May 11, 2025, 8:37 PM
            </p>
          </div>

          {/* Transfer Card - Right Side */}
          <Card
            className={`md:bg-white mt-3 md:mt-0 border-none md:border border-gray-200 w-full md:w-2/4 dark:bg-transparent shadow-none md:shadow-lg`}
          >
            <CardBody className="md:p-6 px-0 py-0">
              <div className="flex items-center justify-between">
                {/* Phantom (Sent) */}
                <div className="flex flex-col items-start justify-start md:flex-row md:items-center md:space-x-3 gap-2 md:gap-0">
                  <Avatar src="crypto/Phantom.png" />
                  <div className="flex flex-col items-start gap-2 md:gap-0 ">
                    <Typography
                      variant="small"
                      className="font-normal dark:text-gray-250"
                    >
                      Phantom
                    </Typography>
                    <Typography variant="small" className="text-sm font-medium">
                      -0.32348600 ETH
                    </Typography>
                  </div>
                </div>

                {/* Transfer Arrow */}
                <div className="flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faExchange}
                      className="w-5 h-5 text-[#75AE46]"
                    />
                  </div>
                </div>

                {/* Bitcoin (Received) */}
                <div className="flex flex-col-reverse md:flex-row items-end md:items-center md:space-x-3 gap-2 md:gap-0">
                  <div className="flex flex-col items-end gap-2 md:gap-0">
                    <Typography
                      variant="small"
                      className="font-normal dark:text-gray-250"
                    >
                      Bitcoin
                    </Typography>
                    <Typography variant="small" className="text-sm font-medium">
                      +0.292096470 ETH
                    </Typography>
                  </div>
                  <Avatar src="crypto/bitcoin-btc-logo.png" />

                  {/* <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">₿</span>
                  </div> */}
                </div>
              </div>

              {/* Financial Metrics */}
              <div className="mt-4 space-y-3">
                <div className="flex justify-between">
                  <Typography
                    variant="small"
                    className={`text-base text-gray-700 dark:text-gray-250`}
                  >
                    Fiat Value:
                  </Typography>
                  <Typography
                    variant="small"
                    className="test-sm font-medium text-gray-900 dark:text-gray-150"
                  >
                    $780.98
                  </Typography>
                </div>
                <div>
                  <hr className="border-dashed border-gray-500 opacity-20 dark:border-[#2F3232]" />
                </div>
                <div className="flex justify-between">
                  <Typography
                    variant="small"
                    className={`text-base text-gray-700 dark:text-gray-250`}
                  >
                    Cost Basis:
                  </Typography>
                  <Typography
                    variant="small"
                    className="test-sm font-medium text-gray-900 dark:text-gray-150"
                  >
                    $579.60
                  </Typography>
                </div>
                <div>
                  <hr className="border-dashed border-gray-500 opacity-20 dark:border-[#2F3232]" />
                </div>
                <div className="flex justify-between">
                  <Typography
                    variant="small"
                    className={`text-base text-gray-700 dark:text-gray-250`}
                  >
                    Gain:
                  </Typography>
                  <Typography
                    variant="small"
                    className="test-sm font-medium text-gray-900 dark:text-gray-150"
                  >
                    $0.00
                  </Typography>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {activeTab === "Ledger" && (
        <div className="sm:py-2">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full table-auto text-left">
              <thead className="hidden md:table-header-group">
                <tr>
                  <th className="py-3 px-4 font-normal text-sm">
                    <span className={`text-gray-600 dark:text-[#B6B8BA]`}>
                      Identifier
                    </span>
                  </th>
                  <th className="py-3 px-4 font-normal text-sm">
                    <div className="flex items-center space-x-1">
                      <span className={`text-gray-600 dark:text-[#B6B8BA]`}>
                        Date
                      </span>
                      <div className="flex flex-col">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                          />
                        </svg>
                      </div>
                    </div>
                  </th>
                  <th className="py-3 px-4 font-normal text-sm">
                    <div className="flex items-center space-x-1">
                      <span className={`text-gray-600 dark:text-[#B6B8BA]`}>
                        Type
                      </span>
                      <div className="flex flex-col">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                          />
                        </svg>
                      </div>
                    </div>
                  </th>
                  <th className="py-3 px-4 font-normal text-sm">
                    <span className={`text-gray-600 dark:text-[#B6B8BA]`}>
                      Leger
                    </span>
                  </th>
                  <th className="py-3 px-4 font-normal text-sm">
                    <span className={`text-gray-600 dark:text-[#B6B8BA]`}>
                      Change
                    </span>
                  </th>
                  <th className="py-3 px-4 font-normal text-sm">
                    <div className="flex items-center space-x-1">
                      <span className={`text-gray-600 dark:text-[#B6B8BA]`}>
                        Balance
                      </span>
                      <div className="flex flex-col">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                          />
                        </svg>
                      </div>
                    </div>
                  </th>
                  <th className="py-3 px-4 font-medium text-sm">
                    <span
                      className={`text-gray-700 dark:text-[#B6B8BA]`}
                    ></span>
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {ledgerData.map((row) => (
                  <tr key={row.id} className={`border-b border-gray-100 `}>
                    <td className="sm:hidden py-3 pl-4 sm:pl-0 sm:px-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex justify-center items-center">
                          <div
                            className={`w-11 h-11 sm:w-8 sm:h-8 ${row.identifier.color} rounded-full flex items-center justify-center`}
                          >
                            <span className="text-white text-sm font-bold">
                              {row.identifier.icon}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span
                            className={`text-abse font-medium ${
                              row.type === "Send"
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            {row.type}
                          </span>
                          <span
                            className={`sm:hidden text-base opacity-70 sm:opacity-100  text-gray-900 dark:text-gray-150`}
                          >
                            {row.date}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell py-3 pl-4 ">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-11 h-11 sm:w-8 sm:h-8 ${row.identifier.color} rounded-full flex items-center justify-center`}
                        >
                          <span className="text-white text-sm font-bold">
                            {row.identifier.icon}
                          </span>
                        </div>
                        <span
                          className={`text-base text-gray-900 dark:text-gray-150`}
                        >
                          {row.identifier.text}
                        </span>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell py-3 px-4">
                      <span
                        className={`text-base text-gray-900 dark:text-gray-150`}
                      >
                        {row.date}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell md:py-3 md:px-4">
                      <div className="flex flex-col">
                        <span
                          className={`text-abse font-medium ${
                            row.type === "Send"
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {row.type}
                        </span>
                        <span
                          className={`sm:hidden text-base text-gray-900 dark:text-gray-150`}
                        >
                          {row.date}
                        </span>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell py-3 px-4">
                      <span
                        className={`text-base text-gray-900 dark:text-gray-150`}
                      >
                        {row.ledger}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span
                          className={`text-base text-gray-900 dark:text-gray-150 text-right sm:text-left`}
                        >
                          {row.change}
                        </span>
                        <span
                          className={`sm:hidden text-base font-medium text-right sm:text-left ${
                            row.balance.startsWith("-")
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {row.balance}
                        </span>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell py-3 px-4">
                      <span
                        className={`text-base font-medium ${
                          row.balance.startsWith("-")
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {row.balance}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell py-3 px-4">
                      <div className="w-6 h-6 flex items-center justify-center text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "Cost analysis" && (
        <div className="py-2">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full table-auto text-left ">
              <thead className="hidden sm:table-header-group">
                <tr>
                  <th className="py-3 px-4 font-normal text-sm text-left">
                    <span className={`text-gray-700 dark:text-[#B6B8BA]`}>
                      Date
                    </span>
                  </th>
                  <th className="py-3 px-4 font-normal text-sm text-left">
                    <span className={`text-gray-700 dark:text-[#B6B8BA]`}>
                      Info
                    </span>
                  </th>
                  <th className="py-3 px-4 font-normal text-sm text-left">
                    <span className={`text-gray-700 dark:text-[#B6B8BA]`}>
                      Holding period
                    </span>
                  </th>
                  <th className="py-3 px-4 font-normal text-sm text-left">
                    <span className={`text-gray-700 dark:text-[#B6B8BA]`}>
                      Amount
                    </span>
                  </th>
                  <th className="py-3 px-4 font-normal text-sm text-left">
                    <span className={`text-gray-700 dark:text-[#B6B8BA]`}>
                      Cost(USD)
                    </span>
                  </th>
                  <th className="py-3 px-4 font-normal text-sm text-left">
                    <div className="flex items-center justify-end space-x-1">
                      <span className={`text-gray-700 dark:text-[#B6B8BA]`}>
                        Gain(USD)
                      </span>
                    </div>
                  </th>
                  <th className="py-3 px-4 font-normal text-sm text-left"></th>
                </tr>
              </thead>
              <tbody>
                {costAnalysisData.map((row, index) => (
                  <tr key={row.id} className={`bg-white dark:bg-gray-900`}>
                    <td
                      className={`hidden sm:table-cell py-2.5 px-5
                        ${
                          index === costAnalysisData.length - 1
                            ? "rounded-bl-lg"
                            : ""
                        }
                      `}
                    >
                      <span
                        className={`text-base text-gray-700 dark:text-[#B6B8BA]`}
                      >
                        {row.date}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span
                          className={`text-base text-gray-900 dark:text-[#B6B8BA]`}
                        >
                          {row.info}
                        </span>
                        <span
                          className={`sm:hidden text-base text-gray-900 dark:text-gray-150 opacity-70`}
                        >
                          {row.holdingPeriod}
                        </span>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell py-3 px-4">
                      <span
                        className={`text-base text-gray-700 dark:text-[#B6B8BA]`}
                      >
                        {row.holdingPeriod}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex flex-col">
                        <div className="flex gap-1 w-full justify-end sm:justify-start items-center">
                          <span
                            className={`text-base text-gray-900 dark:text-[#B6B8BA]`}
                          >
                            {row.amount}
                          </span>
                          {index === 0 && (
                            <>
                              {" "}
                              <span
                                className={`sm:hidden text-base text-green-500 dark:text-[#B6B8BA]`}
                              >
                                +2.5%
                              </span>
                            </>
                          )}
                        </div>

                        <span
                          className={`sm:hidden font-medium text-base text-gray-900 dark:text-gray-150 opacity-70`}
                        >
                          {row.costUSD}
                        </span>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell py-3 px-4 text-right">
                      <span
                        className={`text-base text-gray-700 dark:text-[#B6B8BA]`}
                      >
                        {row.costUSD}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell py-3 px-4 text-right">
                      <span
                        className={`text-base font-medium ${
                          row.gainUSD === "0.00"
                            ? "text-gray-500"
                            : row.gainUSD.startsWith("-")
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {row.gainUSD}
                      </span>
                    </td>
                    <td
                      className={`hidden sm:table-cell py-3 px-4 text-right
                        ${
                          index === costAnalysisData.length - 1
                            ? "rounded-br-lg"
                            : ""
                        }
                      `}
                    >
                      {row.isMarked && (
                        <svg
                          className="w-5 h-5 mx-2 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01"
                          />
                        </svg>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <MobileDrawer
        isOpen={openConfigure}
        key={selectedRow?.wallet?.name}
        onClose={() => setOpenConfigure(false)}
        header={`Configure ${selectedRow?.wallet?.name} address`}
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
            key={selectedRow?.wallet?.name}
            isOpen={openConfigure}
            onClose={handleCloseModal}
            platformName={selectedRow?.wallet?.name ?? selectedPlatform}
            onConfigureSuccess={handleConfigureSuccess}
            showHeader={false}
            showFooter={false}
            setIsWalletAddressValid={setIsWalletAddressValid}
          />
        </div>
      </MobileDrawer>
      {/* Success Notification */}
      <SuccessNotification
        message={`${selectedRow?.wallet?.name} wallet configured successfully`}
        isVisible={showNotification}
        onClose={handleCloseNotification}
        duration={5000}
      />
    </div>
  );
};

export default TransactionDetail;
