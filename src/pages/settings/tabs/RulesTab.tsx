import React, { useState, useRef } from "react";
import { Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faChevronDown,
  faChevronUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Typography } from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddRuleModal from "../components/AddRuleModal";
import SuccessNotification from "../../../components/SuccessNotification";
import SearchField from "../../../components/UI/SearchField";
import SecondaryButton from "../../../components/UI/Buttons/SecondaryButton";
import FilterIcon from "../../../components/Icons/FilterIcon";
import TrashIcon from "../../../components/Icons/TrashIcon";
import MobileDrawer from "../../../components/Drawers/MobileDrawer";
import Dropdown from "../../../components/UI/Dropdown";
import dayjs from "dayjs";

interface Rule {
  id: string;
  name: string;
  wallet: string;
  token: string;
  quantity: string;
  tags: string[];
}

interface RulesTabProps {}

const RulesTab: React.FC<RulesTabProps> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("Type");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isAddRuleModalOpen, setIsAddRuleModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Mock data for rules
  const rules: Rule[] = [
    {
      id: "1",
      name: "$5000 Reward at (web2shi...",
      wallet: "Metamask",
      token: "SOL",
      quantity: "48",
      tags: ["Income"],
    },
    {
      id: "2",
      name: "Claim: Deccheckai.top",
      wallet: "Phantom",
      token: "USDT",
      quantity: "12",
      tags: ["Boring"],
    },
  ];

  const typeOptions = ["All", "Income", "Expense", "Transfer", "Swap"];

  const handleRemoveTag = (ruleId: string, tagIndex: number) => {
    // Handle tag removal logic
    console.log("Remove tag", ruleId, tagIndex);
  };

  const handleSaveChanges = () => {
    console.log("Save changes clicked");
  };

  const handleDeleteRule = (ruleId: string) => {
    // Handle rule deletion logic
    console.log("Delete rule", ruleId);
  };

  const handleAddRuleClick = () => {
    setIsAddRuleModalOpen(true);
  };

  const handleCloseAddRuleModal = () => {
    setIsAddRuleModalOpen(false);
  };

  const handleRuleAdded = () => {
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-3 md:gap-0">
        <div>
          <Typography
            variant="h5"
            className="text-left text-lg font-bold text-gray-900 dark:text-gray-150"
          >
            Rules
          </Typography>
          <Typography
            variant="small"
            className="mt-2 text-sm text-left text-gray-600 dark:text-gray-300"
          >
            Set rules to automatically hide spam and unwanted transactions, so
            your reports stay clean.
          </Typography>
        </div>

        <button
          onClick={handleAddRuleClick}
          className="w-full md:w-auto flex items-center justify-center md:justify-start space-x-2 px-5 py-3 rounded-lg border border-[#E1E3E5] text-[#0E201E] dark:border-gray-600 dark:text-green-400"
        >
          <FontAwesomeIcon icon={faPlus} className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">Add rule</span>
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex items-center space-x-5 my-6">
        {/* Search Bar */}
        <div className="flex-1 md:flex-none">
          <SearchField
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search"
            ariaLabel="Search"
            className=" border-default dark:border-[#4D5050]"
            size="lg"
          />
        </div>

        <SecondaryButton
          onClick={() => setShowMobileFilters(true)}
          icon={<FilterIcon />}
          className="flex sm:hidden"
        />

        {/* Type Filter */}
        <div className="relative hidden md:block" ref={datePickerRef}>
          <button
            onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
            className={`flex items-center space-x-6 px-4 py-2.5 border rounded-xl 
              bg-transparent text-[#0E201E] border-default
              dark:border-gray-600 dark:text-white`}
          >
            <span className="text-sm">{selectedType}</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`w-3 h-3 text-gray-500 transition-transform ${
                isTypeDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Date Filter */}
        <div className="relative hidden md:block" ref={datePickerRef}>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className={`w-full px-3 py-[8px] text-sm border border-[#E1E3E5] rounded-lg focus:outline-none flex items-center justify-between cursor-pointer ${"bg-transparent text-[#0E201E] dark:border-gray-600 dark:text-gray-100"}`}
            placeholderText="Date"
            dateFormat="MM/dd/yyyy"
            wrapperClassName="w-full"
            popperPlacement="bottom-start"
            popperClassName="z-[9999]"
            popperContainer={({ children }) => (
              <div style={{ zIndex: 9999, position: "relative" }}>
                {children}
              </div>
            )}
            customInput={
              <div className="flex items-center justify-between w-full space-x-6">
                <span
                  className={`flex-1 text-left ${
                    !selectedDate ? "text-gray-400 dark:text-gray-100" : ""
                  }`}
                >
                  {selectedDate
                    ? selectedDate.toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })
                    : "Date"}
                </span>
                <svg
                  className="text-[#7C7C7C] size-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                  />
                </svg>
              </div>
            }
          />
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-150 dark:border-gray-700 p-5"
          >
            {/* Header Section */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                {/* Crypto Icon - using a generic icon for now */}
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {rule.token.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <Typography
                    variant="small"
                    className="text-lg font-bold text-gray-900 dark:text-gray-100"
                  >
                    {rule.wallet} ({rule.token})
                  </Typography>
                  <Typography
                    variant="small"
                    className="text-sm text-gray-600 dark:text-gray-400 text-left"
                  >
                    Quantity: {rule.quantity}
                  </Typography>
                </div>
              </div>
              {/* Delete Button */}
              <SecondaryButton
                onClick={() => handleDeleteRule(rule.id)}
                icon={<TrashIcon />}
              />
            </div>

            {/* Reward Information */}
            <div className="mb-4">
              <Typography
                variant="small"
                className="text-base  text-gray-900 dark:text-gray-100 text-left"
              >
                {rule.name}
              </Typography>
            </div>

            {/* Tags Section */}
            <div className="flex items-center space-x-2">
              {rule.tags.slice(0, 2).map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1"
                >
                  <span className="text-sm text-gray-900 dark:text-gray-100">
                    {tag}
                  </span>
                  <button
                    onClick={() => handleRemoveTag(rule.id, index)}
                    className="text-gray-400 dark:text-gray-300 hover:text-gray-600"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              {rule.tags.length > 2 && (
                <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-1">
                  +{rule.tags.length - 2}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block bg-transparent rounded-lg border border-default overflow-hidden">
        <table className="w-full">
          <thead className={`bg-table-header dark:bg-gray-800`}>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <span>Rule name</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <span>Wallet</span>
                  <div className="flex flex-col">
                    <FontAwesomeIcon
                      icon={faChevronUp}
                      className="w-2 h-2 text-gray-400"
                    />
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="w-2 h-2 text-gray-400"
                    />
                  </div>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <span>Token</span>
                  <div className="flex flex-col">
                    <FontAwesomeIcon
                      icon={faChevronUp}
                      className="w-2 h-2 text-gray-400"
                    />
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="w-2 h-2 text-gray-400"
                    />
                  </div>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <span>Quantity</span>
                  <div className="flex flex-col">
                    <FontAwesomeIcon
                      icon={faChevronUp}
                      className="w-2 h-2 text-gray-400"
                    />
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="w-2 h-2 text-gray-400"
                    />
                  </div>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Tag
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-default">
            {rules.map((rule) => (
              <tr key={rule.id}>
                <td className="text-left px-6 py-4 whitespace-nowrap text-base text-gray-900 dark:text-gray-150">
                  {rule.name}
                </td>
                <td className="text-left px-6 py-4 whitespace-nowrap text-base text-gray-900 dark:text-gray-150">
                  {rule.wallet}
                </td>
                <td className="text-left px-6 py-4 whitespace-nowrap text-base text-gray-900 dark:text-gray-150">
                  {rule.token}
                </td>
                <td className="text-left px-6 py-4 whitespace-nowrap text-base text-gray-900 dark:text-gray-150">
                  {rule.quantity}
                </td>
                <td className="text-left px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {rule.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-1 bg-gray-100 border border-default rounded-full px-3 py-1 dark:bg-gray-800"
                      >
                        <span className="text-sm text-gray-900 dark:text-gray-100">
                          {tag}
                        </span>
                        <button
                          onClick={() => handleRemoveTag(rule.id, index)}
                          className="text-gray-400 dark:text-gray-100 hover:text-gray-600"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                    {rule.tags.length > 1 && (
                      <span className="text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-1">
                        +{rule.tags.length - 1}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDeleteRule(rule.id)}
                    className="text-[#7C7C7C] border border-default p-1 rounded-md dark:text-gray-700 dark:border-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Action Buttons */}
      <div className="hidden md:flex justify-end pt-6 my-8">
        <Button
          onClick={handleSaveChanges}
          className="bg-[#90C853] text-[#0E201E] px-5 py-3 rounded-lg font-medium border-0"
        >
          Save changes
        </Button>
      </div>

      <MobileDrawer
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        header="Filters"
        leftButtonText="Clear All"
        disableRightButton={selectedType === "Type" || !selectedDate}
      >
        {/* Type Filter */}

        <div className="flex flex-col gap-2 pt-3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-100 text-left">
            Type
          </label>
          <Dropdown
            options={["Expense", "Income", "Transfer"]}
            onSelect={(value) => {
              setSelectedType(value);
              setIsTypeDropdownOpen(false);
            }}
            defaultValue=""
          />
          <label className="text-sm font-medium text-gray-700 dark:text-gray-100 text-left">
            Date
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className={`w-full px-3 py-[8px] text-sm border border-[#E1E3E5] rounded-lg focus:outline-none flex items-center justify-between cursor-pointer ${"bg-transparent text-[#0E201E] dark:border-gray-600 dark:text-gray-100"}`}
            placeholderText="Date"
            dateFormat="MM/dd/yyyy"
            wrapperClassName="w-full"
            popperPlacement="bottom-start"
            popperClassName="z-[9999]"
            popperContainer={({ children }) => (
              <div style={{ zIndex: 9999, position: "relative" }}>
                {children}
              </div>
            )}
            customInput={
              <div className="flex items-center justify-between w-full space-x-6">
                <svg
                  className="text-[#7C7C7C] size-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                  />
                </svg>
                <span
                  className={`flex-1 text-left ${
                    !selectedDate ? "text-gray-400 dark:text-gray-100" : ""
                  }`}
                >
                  {selectedDate
                    ? dayjs(selectedDate).format("MMM D, YYYY")
                    : "Set Date"}
                </span>
              </div>
            }
          />
        </div>
      </MobileDrawer>

      {/* Add Rule Modal */}
      <AddRuleModal
        isOpen={isAddRuleModalOpen}
        onClose={handleCloseAddRuleModal}
        onRuleAdded={handleRuleAdded}
      />

      {/* Add Rule Modal
      <AddRuleModal
        isOpen={isAddRuleModalOpen}
        onClose={handleCloseAddRuleModal}
        onRuleAdded={handleRuleAdded}
      /> */}

      {/* Success Notification */}
      <SuccessNotification
        message="Rule added successfully"
        isVisible={showNotification}
        onClose={handleCloseNotification}
        duration={5000}
      />
    </div>
  );
};

export default RulesTab;
