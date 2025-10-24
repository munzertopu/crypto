import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Typography, Input, Button } from "@material-tailwind/react";
import { countriesData } from "../../../data/settingsAssets";
import { Tooltip } from "../../../components";

interface FormInfoTabProps {}

const FormInfoTab: React.FC<FormInfoTabProps> = ({}) => {
  const [formData, setFormData] = useState({
    name: "",
    personalId: "",
    city: "",
    postalCode: "",
    phoneNumber: "201-555-3333",
    state: "",
    inn: "",
  });

  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countriesData[0]);
  const [showInnTooltip, setShowInnTooltip] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCountrySelect = (country: (typeof countriesData)[0]) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
  };

  const handleSaveChanges = () => {
    // Handle save logic here
    console.log("Saving form info changes:", formData);
  };

  // Handle clicks outside tooltip to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setShowInnTooltip(false);
      }
    };

    if (showInnTooltip) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showInnTooltip]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <Typography
          variant="h4"
          className="font-bold text-lg text-left mb-2 text-gray-900 dark:text-gray-150"
        >
          Form Info
        </Typography>
        <Typography
          variant="small"
          className="text-left text-sm text-gray-600 dark:text-gray-400"
        >
          You do not need to fill in anything on this page unless you want this
          information to be shown on your tax reports
        </Typography>
      </div>

      {/* Form Fields */}
      {/* Name Field - Full Width */}
      <div className="space-y-6">
        <div>
          <label
            className={`block text-sm font-medium text-left mb-2 text-[#2F3232] dark:text-gray-300`}
          >
            Name (optional)
          </label>
          <Input
            type="text"
            placeholder="Type your name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={`text-base bg-transparent py-3 px-4 border-[#E1E3E5] dark:border-gray-700 dark:text-gray-100 focus:outline-none focus:ring-0 focus:border-[#E1E3E5] focus:shadow-none`}
          />
        </div>
      </div>

      {/* Other Form Fields - 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-left mb-2 text-[#2F3232] dark:text-gray-300">
              Personal ID Number (optional)
            </label>
            <Input
              type="text"
              placeholder="000000000"
              value={formData.personalId}
              onChange={(e) => handleInputChange("personalId", e.target.value)}
              className={`text-base bg-transparent py-3 px-4 border-[#E1E3E5] dark:border-gray-700 dark:text-gray-100 focus:outline-none focus:ring-0 focus:border-[#E1E3E5] focus:shadow-none`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-left mb-2 text-[#2F3232] dark:text-gray-300">
              City
            </label>
            <Input
              type="text"
              placeholder="Type your city"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className={`text-base bg-transparent py-3 px-4 border-[#E1E3E5] dark:border-gray-700 dark:text-gray-100 focus:outline-none focus:ring-0 focus:border-[#E1E3E5] focus:shadow-none`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-left mb-2 text-[#2F3232] dark:text-gray-300">
              Postal Code
            </label>
            <Input
              type="text"
              placeholder="00000"
              value={formData.postalCode}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
              className={`text-base bg-transparent py-3 px-4 border-[#E1E3E5] dark:border-gray-700 dark:text-gray-100 focus:outline-none focus:ring-0 focus:border-[#E1E3E5] focus:shadow-none`}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-left mb-2 text-[#2F3232] dark:text-gray-300">
              Phone number (optional)
            </label>
            <div
              className="relative flex border border-[#E1E3E5] rounded-lg overflow-hidden bg-transparent dark:border-gray-700
            "
            >
              {/* Country Dropdown Section */}
              <div className="relative flex" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() =>
                    setIsCountryDropdownOpen(!isCountryDropdownOpen)
                  }
                  className={`flex items-center px-4 py-3 focus:outline-none focus:ring-0 focus:shadow-none ${"text-gray-900 dark:text-gray-150"}`}
                >
                  <img
                    src={selectedCountry.flag}
                    className="mr-2 w-8 h-5"
                  ></img>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`w-3 h-3 transition-transform ${
                      isCountryDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {/* Vertical Separator */}
                <div className="w-px bg-[#E1E3E5] dark:bg-gray-600"></div>

                {/* Phone Number Input Section */}
                <div className="flex-1">
                  <input
                    type="tel"
                    placeholder={`(${selectedCountry.dialCode}) 201-555-3333`}
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    className={`w-full px-3 py-2 focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-none bg-transparent text-gray-900 
                      dark:text-gray-150`}
                  />
                </div>
              </div>
            </div>
            {/* Country Dropdown Menu */}
            {isCountryDropdownOpen && (
              <div
                className={`absolute z-50 w-full mt-1 border border-gray-300 rounded-lg ${"bg-white dark:bg-gray-700 dark:border-gray-600"}`}
              >
                {countriesData.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className={`w-full px-3 py-2.5 flex items-center hover:bg-gray-50 ${"text-gray-900 dark:text-gray-150 dark:hover:bg-gray-600"} ${
                      selectedCountry.code === country.code
                        ? "bg-gray-100 dark:bg-gray-600"
                        : ""
                    }`}
                  >
                    <img src={country.flag} className="mr-2 w-4 h-3"></img>
                    <span className="font-medium">{country.name}</span>
                    <span className="ml-auto text-sm text-gray-500">
                      ({country.dialCode})
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-left mb-2 text-[#2F3232] dark:text-gray-300">
              State (optional)
            </label>
            <Input
              type="text"
              placeholder="00000"
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              className={`text-base bg-transparent py-3 px-4 border-[#E1E3E5] dark:border-gray-700 dark:text-gray-100 focus:outline-none focus:ring-0 focus:border-[#E1E3E5] focus:shadow-none`}
            />
          </div>

          <div>
            <div className="flex items-center space-x-2 ">
              <label className="block text-sm font-medium text-left mb-2 text-[#2F3232] dark:text-gray-300">
                INN
              </label>
              <Tooltip
                title={
                  <div className="text-gray-900 dark:text-gray-100">
                    <strong>
                      INN (Individual Taxpayer Identification Number)
                    </strong>{" "}
                    is a unique identifier used for tax purposes. This field is
                    optional and only required if you want this information to
                    appear on your tax reports.
                  </div>
                }
                placement="bottom"
              >
                <button
                  type="button"
                  // onClick={() => setShowInnTooltip(!showInnTooltip)}
                  className="w-4 h-4 mx-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label="INN help information"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01"
                    />
                  </svg>
                </button>
              </Tooltip>
            </div>
            <Input
              type="text"
              placeholder="000000000"
              value={formData.inn}
              onChange={(e) => handleInputChange("inn", e.target.value)}
              className={`text-base bg-transparent py-3 px-4 border-[#E1E3E5] dark:border-gray-700 dark:text-gray-100 focus:outline-none focus:ring-0 focus:border-[#E1E3E5] focus:shadow-none`}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex md:justify-end pt-6">
        <button
          onClick={handleSaveChanges}
          className="w-full md:w-auto text-base bg-[#90C853] text-[#0E201E] px-5 py-3 border-0 rounded-lg font-medium"
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

export default FormInfoTab;
