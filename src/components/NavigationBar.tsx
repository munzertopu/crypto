import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faCrown,
  faBars,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import ThemeToggle from "./ThemeToggle";

interface NavigationBarProps {
  userName?: string;
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
  onLogout?: () => void;
  currentPage?: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  userName = "Kristin Watson",
  isDarkMode = false,
  onThemeToggle,
  onLogout,
  currentPage = "",
}) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  const userList = [
    { name: "Arlene Watson", photo: "arlene.png" },
    { name: "Kristin Watson", photo: "kristin.png" },
    { name: "Jane Cooper", photo: "jane.png" },
  ];

  const navigationItems = [
    { name: "Wallets", href: "/wallets" },
    { name: "Transactions", href: "/transactions" },
    { name: "Tax Reports", href: "/tax-reports" },
    { name: "Tax Optimization", href: "/tax-optimization" },
    { name: "Clients", href: "/clients" },
  ];

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    }
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    }
    if (isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileDropdownOpen]);
  return (
    <nav
      className={`px-4 sm:px-6 lg:px-9 py-2 sm:py-2 lg:py-3.5 bg-white border-b 
        dark:bg-[#0E201E] dark:border-[#2F3232]`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/dashboard" className="flex items-center">
            <img
              src="logo.png"
              alt="Portal"
              className="h-6 sm:h-7 lg:h-7 w-auto block dark:hidden"
            />
            <img
              src="logo-dark.png"
              alt="Portal"
              className="h-6 sm:h-7 lg:h-7 w-auto hidden dark:block"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1 lg:space-x-1">
          {navigationItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`px-1 lg:px-3 py-2 text-sm lg:text-md text-[#0E201E] 
                dark:text-[#B6B8BA]
                ${
                  currentPage === item.name.toLowerCase()
                    ? "!text-green-600"
                    : ``
                }`}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Right Side Icons and Profile */}
        <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
          {/* Desktop Theme Toggle */}
          <div className="hidden sm:block">
            <ThemeToggle isDarkMode={theme === "dark"} onToggle={toggleTheme} />
          </div>

          {/* Desktop Settings Button */}
          <Link to="/settings">
            <button
              className="hidden lg:block bg-transparent border border-[#E1E3E5] text-[#7C7C7C] px-3 py-1.5 lg:px-2 lg:py-2 rounded-xl
              dark:text-[#B6B8BA] dark:border-[#4D5050]"
              aria-label="Open settings"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>
          </Link>

          {/* Go Pro Button */}
          <button
            className={`hidden sm:flex items-center space-x-1 sm:space-x-2 bg-transparent border border-[#E1E3E5] px-2 lg:px-3 lg:py-1 rounded-lg text-xs sm:text-sm font-medium
              dark:text-[#75AE46] dark:border-[#4D5050]
             `}
            aria-label="Upgrade to Pro plan"
          >
            {/* Crown Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              fill="currentColor"
              className="size-6"
            >
              <path d="M230.9,73.6A15.85,15.85,0,0,0,212,77.39l-33.67,36.29-35.8-80.29a1,1,0,0,1,0-.1,16,16,0,0,0-29.06,0,1,1,0,0,1,0,.1l-35.8,80.29L44,77.39A16,16,0,0,0,16.25,90.81c0,.11,0,.21.07.32L39,195a16,16,0,0,0,15.72,13H201.29A16,16,0,0,0,217,195L239.68,91.13c0-.11,0-.21.07-.32A15.85,15.85,0,0,0,230.9,73.6ZM201.35,191.68l-.06.32H54.71l-.06-.32L32,88l.14.16,42,45.24a8,8,0,0,0,13.18-2.18L128,40l40.69,91.25a8,8,0,0,0,13.18,2.18l42-45.24L224,88Z" />
            </svg>
            <span className="hidden lg:inline text-lg lg:text-md font-normal text-[#5F9339] dark:text-[#75AE46]">
              Go Pro
            </span>
          </button>

          {/* Profile */}
          <div className="relative space-x-6 px-3 sm:px-0">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center justify-between space-x-6 lg:border lg:border-[#E1E3E5] lg:px-3 lg:py-1.5 lg:rounded-xl
              dark:border-[#4D5050]"
              aria-label="Open profile menu"
              aria-expanded={isProfileDropdownOpen}
              aria-haspopup="true"
            >
              {/* Image and Name Container */}
              <div className="flex items-center space-x-1 sm:space-x-2">
                <img
                  src="/kristin.png"
                  alt={userName}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span
                  className={`hidden sm:inline text-xs sm:text-sm lg:text-md text-[#0E201E] 
                    dark:text-[#CDCFD1]`}
                >
                  {userName}
                </span>
              </div>

              {/* Desktop Dropdown Icon Container */}
              <div className="hidden lg:block">
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`w-3 h-3 text-[#7C7C7C]
                    dark:text-[#CDCFD1]
                  `}
                />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div
                ref={profileMenuRef}
                className={`absolute right-0 mt-2 w-48  border ${
                  isDarkMode
                    ? "bg-[#0E201E] border-[#4D5050]"
                    : "bg-white border-[#E1E3E5]"
                } rounded-lg shadow-lg py-1 z-50`}
                role="menu"
                aria-label="Profile menu"
              >
                {/* Switch account title */}
                <div
                  className={`px-3 py-1.5 ${
                    isDarkMode ? "bg-[#0E201E]" : "bg-white"
                  }`}
                >
                  <h3
                    className={`text-xs font-semibold ${
                      isDarkMode ? "text-[#F3F5F7]" : "text-[#0E201E]"
                    } text-left`}
                  >
                    Switch account
                  </h3>
                </div>
                {/* Account list */}
                <div className="py-1">
                  {/* Arlene Watson */}
                  {userList.map((user) => (
                    <div
                      key={user.name}
                      className={`flex items-center px-2 py-1 cursor-pointer ${
                        isDarkMode ? "hover:bg-[#2F3232]" : "hover:bg-[#F3F5F7]"
                      }
                          ${
                            user.name === "Kristin Watson"
                              ? isDarkMode
                                ? "bg-[#2F3232]"
                                : "bg-[#F3F5F7]"
                              : ""
                          }
                          `}
                      role="menuitem"
                      aria-label={`Switch to ${user.name} account`}
                    >
                      <img
                        src={user.photo}
                        alt={user.name}
                        className="w-6 h-6 rounded-full object-cover mr-2"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.nextElementSibling?.classList.remove("hidden");
                        }}
                      />
                      <span
                        className={`text-xs font-medium ${
                          isDarkMode ? "text-[#F3F5F7]" : "text-[#0E201E]"
                        } mr-auto
                        `}
                      >
                        {user.name}
                      </span>
                      {/* Checkmark icon */}
                      {user.name === "Kristin Watson" && (
                        <svg
                          className={`w-3 h-3 ${
                            isDarkMode ? "text-[#F3F5F7]" : "text-[#7C7C7C]"
                          } text-gray-600`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>

                {/* Separator */}
                <div
                  className="border-t border-gray-100 my-1"
                  role="separator"
                ></div>

                {/* Log out option */}
                <div
                  className={`flex items-center px-2 py-1 cursor-pointer`}
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    if (onLogout) {
                      onLogout();
                    }
                  }}
                  role="menuitem"
                  aria-label="Log out of account"
                >
                  {/* Logout icon - FontAwesome */}
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className={`w-3 h-3 ${
                      isDarkMode ? "text-[#A1A3A5]" : "text-[#7C7C7C]"
                    } mr-2 rotate-180`}
                  />
                  <span
                    className={`text-xs ${
                      isDarkMode ? "text-[#B6B8BA]" : "text-[#0E201E]"
                    } mr-auto`}
                  >
                    Log out
                  </span>
                  {/* Right arrow */}
                  <svg
                    className={`w-2 h-2 ${
                      isDarkMode ? "text-[#A1A3A5]" : "text-[#7C7C7C]"
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 8 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden px-2 py-1.5 bg-transparent border border-[#E1E3E5] text-[#7C7C7C] rounded-lg hover:bg-gray-50 transition-colors"
            aria-label="Open mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <FontAwesomeIcon icon={faBars} className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute top-12 right-0 w-[240px] bg-white shadow-lg rounded-[12px] border border-gray-150 py-3 z-50 flex flex-col justify-center items-start  dark:bg-[#0E201E] dark:border-[#2F3232]"
        >
          <div className="w-full flex flex-col justify-start items-start gap-2 px-4 ">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 text-gray-600 hover:text-gray-900 hover:bg-gray-50 block text-sm font-medium rounded-lg transition-colors`}
                onClick={() => setIsMobileMenuOpen(false)}
                role="menuitem"
              >
                {item.name}
              </a>
            ))}
          </div>{" "}
          <div
            className={`w-full h-px  my-2 ${
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          ></div>
          <div className="flex justify-between items-center w-full  py-1 px-3">
            <div className="flex justify-normal items-center gap-1.5">
              <span
                className="bg-transparent  text-[#7C7C7C] px-1 py-1.5 rounded-xl
              dark:text-[#B6B8BA] "
                aria-label="Open settings"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </span>

              <p className="text-gray-900 dark:text-[#B6B8BA] text-sm">
                Settings
              </p>
            </div>
            <button
              className="bg-transparent  text-[#7C7C7C] px-1 py-1.5 rounded-xl
              dark:text-[#B6B8BA] flex items-center justify-center"
              aria-label="Open settings"
            >
              <svg
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="16.000000"
                height="16.000000"
                fill="none"
              >
                <rect
                  id="Icon-16px"
                  width="16.000000"
                  height="16.000000"
                  x="0.000000"
                  y="0.000000"
                  fill="rgb(255,255,255)"
                  fill-opacity="0"
                />
                <g id="vuesax/linear/arrow-right">
                  <g id="arrow-right">
                    <path
                      id="Vector"
                      d="M5.94043 13.2797L10.2871 8.93306C10.8004 8.41973 10.8004 7.57973 10.2871 7.06639L5.94043 2.71973"
                      fill-rule="nonzero"
                      stroke="rgb(124,124,124)"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                    />
                    <path
                      id="Vector"
                      opacity="0"
                      transform="matrix(-1,-1.22465e-16,1.22465e-16,-1,16,16)"
                    />
                  </g>
                </g>
              </svg>
            </button>
          </div>
          <div className="flex justify-between items-center w-full  py-1 px-3">
            <div className="flex justify-normal items-center gap-1.5">
              <span
                className="bg-transparent  text-[#7C7C7C] px-1 py-1.5 rounded-xl
              dark:text-[#B6B8BA] "
                aria-label="Open settings"
              >
                <svg
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="16.000000"
                  height="16.000000"
                  fill="none"
                >
                  <rect
                    id="Icon-16px"
                    width="16.000000"
                    height="16.000000"
                    x="0.000000"
                    y="0.000000"
                    fill="rgb(255,255,255)"
                    fill-opacity="0"
                  />
                  <path
                    id="Vector"
                    d="M8.00033 12.3332C5.60709 12.3332 3.66699 10.3931 3.66699 7.99984C3.66699 5.6066 5.60709 3.6665 8.00033 3.6665C10.3936 3.6665 12.3337 5.6066 12.3337 7.99984C12.3337 10.3931 10.3936 12.3332 8.00033 12.3332Z"
                    stroke="rgb(124,124,124)"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                  />
                  <path
                    id="Vector"
                    d="M12.7597 3.24016L12.673 3.32683L12.7597 3.24016ZM3.32634 12.6735L3.23967 12.7602L3.32634 12.6735ZM7.99967 1.3335L7.99967 1.38683L7.99967 1.3335ZM7.99967 14.6135L7.99967 14.6668L7.99967 14.6135ZM1.33301 8.00016L1.38634 8.00016L1.33301 8.00016ZM14.613 8.00016L14.6663 8.00016L14.613 8.00016ZM3.23967 3.24016L3.32634 3.32683L3.23967 3.24016ZM12.7597 12.7602L12.673 12.6735"
                    fill-rule="nonzero"
                    stroke="rgb(124,124,124)"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.33333337"
                  />
                </svg>
              </span>

              <p className="text-gray-900 dark:text-[#B6B8BA] text-sm">
                Light Theme
              </p>
            </div>

            <ThemeToggle isDarkMode={theme === "dark"} onToggle={toggleTheme} />
          </div>
          <div className="px-4 w-full mt-2">
            {" "}
            <button
              className={`w-full flex items-center justify-center bg-transparent border border-[#75AE46] px-5 py-2.5 rounded-lg text-sm
             text-[#75AE46] dark:border-[#4D5050]
             `}
              aria-label="Upgrade to Pro plan"
            >
              {/* Crown Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                fill="currentColor"
                className="size-6"
              >
                <path d="M230.9,73.6A15.85,15.85,0,0,0,212,77.39l-33.67,36.29-35.8-80.29a1,1,0,0,1,0-.1,16,16,0,0,0-29.06,0,1,1,0,0,1,0,.1l-35.8,80.29L44,77.39A16,16,0,0,0,16.25,90.81c0,.11,0,.21.07.32L39,195a16,16,0,0,0,15.72,13H201.29A16,16,0,0,0,217,195L239.68,91.13c0-.11,0-.21.07-.32A15.85,15.85,0,0,0,230.9,73.6ZM201.35,191.68l-.06.32H54.71l-.06-.32L32,88l.14.16,42,45.24a8,8,0,0,0,13.18-2.18L128,40l40.69,91.25a8,8,0,0,0,13.18,2.18l42-45.24L224,88Z" />
              </svg>
              <span className="hidden lg:inline text-lg lg:text-md font-normal text-[#5F9339] dark:text-[#75AE46]">
                Go Pro
              </span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
