import React, { useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import SearchField from "../../components/UI/SearchField";
import Dropdown from "../../components/UI/Dropdown";
import AddClientDrawer from "./components/AddClientDrawer";
import SuccessNotification from "../../components/SuccessNotification";
import ErrorNotification from "../../components/ErrorNotification";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Typography, Card, CardBody } from "@material-tailwind/react";
import RedirectWindowIcon from "../../components/Icons/RedirectWindowIcon";
import TickCircleIcon from "../../components/Icons/TickCircleIcon";
import CrossIcon from "../../components/Icons/CrossIcon";
import SecondaryButton from "../../components/UI/Buttons/SecondaryButton";
import FilterIcon from "../../components/Icons/FilterIcon";

interface ClientsPageProps {
  onLogout: () => void;
}

interface Client {
  id: string;
  name: string;
  email: string;
  avatar: string;
  lastActive: string;
  licenseStatus: "Licensed" | "Unlicensed";
  transactions: number;
  assignedTo?: {
    name: string;
    avatar: string;
  };
  ownership: "Owned by Client" | "Shared with Client";
}

const ClientsPage: React.FC<ClientsPageProps> = ({ onLogout }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [, setSelectedSort] = useState("Recently added");
  const [isUnassignedFilterActive, setIsUnassignedFilterActive] =
    useState(false);
  const [isUnlicensedFilterActive, setIsUnlicensedFilterActive] =
    useState(false);
  const [isAddClientDrawerOpen, setIsAddClientDrawerOpen] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleClientAdded = (clientName: string) => {
    if (clientName.toLowerCase() === "priya kapoor") {
      // Show success notification for Priya Kapoor
      setSuccessMessage(`"${clientName}" successfully added`);
      setShowSuccessNotification(true);
    } else {
      // Show error notification for other names
      setErrorMessage(`"${clientName}" wasn't added`);
      setShowErrorNotification(true);
    }
  };

  const handleCloseNotification = () => {
    setShowSuccessNotification(false);
  };

  const handleCloseErrorNotification = () => {
    setShowErrorNotification(false);
  };

  const TABLE_HEAD = [
    "Client",
    "Last Active",
    "License Status",
    "Transactions",
    "Assigned To",
    "Ownership",
  ];

  const assigneesOptions = [
    {
      label: "Daniel Foster",
      value: "Daniel Foster",
      subtitle: "daniel@gmail.com",
    },
    {
      label: "Arman Lelevier",
      value: "Arman Lelevier",
      subtitle: "arman@gmail.com",
    },
    {
      label: "Brendan Lammond",
      value: "Brendan Lammond",
      subtitle: "btlammond@gmail.com",
    },
    {
      label: "Jonathan Porush",
      value: "Jonathan Porush",
      subtitle: "jonathanp@gmail.com",
    },
  ];

  const sortOptions = [
    { label: "Recently added", value: "Recently added" },
    { label: "Most transactions", value: "Most transactions" },
    { label: "Name ASC", value: "Name ASC" },
  ];

  const clients: Client[] = [
    {
      id: "0503",
      name: "Brendan Lammond",
      email: "btlammond@gmail.com",
      avatar: "/avatars/lammond.png",
      lastActive: "13 minutes ago",
      licenseStatus: "Licensed",
      transactions: 4849,
      assignedTo: {
        name: "Daniel Foster",
        avatar: "/avatars/porush.png",
      },
      ownership: "Owned by Client",
    },
    {
      id: "0501",
      name: "Jonathan Porush",
      email: "jonathanp@email.com",
      avatar: "/avatars/porush.png",
      lastActive: "35 minutes ago",
      licenseStatus: "Licensed",
      transactions: 482,
      assignedTo: {
        name: "Arman Lelevier",
        avatar: "/avatars/martinez.png",
      },
      ownership: "Shared with Client",
    },
    {
      id: "0505",
      name: "Anthony Martinez",
      email: "anthony.martinez@email.com",
      avatar: "/avatars/martinez.png",
      lastActive: "2 hours ago",
      licenseStatus: "Unlicensed",
      transactions: 1250,
      ownership: "Owned by Client",
    },
    {
      id: "0506",
      name: "Ethan Green",
      email: "emily.rodriguez@email.com",
      avatar: "/avatars/green.png",
      lastActive: "1 day ago",
      licenseStatus: "Unlicensed",
      transactions: 3200,
      assignedTo: {
        name: "Daniel Foster",
        avatar: "/avatars/martinez.png",
      },
      ownership: "Shared with Client",
    },
    {
      id: "0507",
      name: "Marcus WHite",
      email: "david.kim@email.com",
      avatar: "/avatars/white.png",
      lastActive: "3 days ago",
      licenseStatus: "Licensed",
      transactions: 750,
      ownership: "Owned by Client",
    },
  ];

  const filteredClients = clients.filter((client) => {
    // Search filter
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.id.includes(searchTerm);

    // Assignee filter
    const matchesAssignee =
      selectedFilter === "All" ||
      (selectedFilter === "Daniel Foster" &&
        client.assignedTo?.name === "Daniel Foster") ||
      (selectedFilter === "Arman Lelevier" &&
        client.assignedTo?.name === "Arman Lelevier");

    // Unassigned filter
    const matchesUnassignedFilter =
      !isUnassignedFilterActive || !client.assignedTo;

    // Unlicensed filter
    const matchesUnlicensedFilter =
      !isUnlicensedFilterActive || client.licenseStatus === "Unlicensed";

    return (
      matchesSearch &&
      matchesAssignee &&
      matchesUnassignedFilter &&
      matchesUnlicensedFilter
    );
  });

  return (
    <div className="min-h-screen bg-background dark:bg-[#0E201E]">
      <NavigationBar onLogout={onLogout} currentPage="clients" />

      <div className="px-4 md:px-10 sm:px-6 md:pt-5 w-full">
        {/* Header */}

        <div className="flex flex-row sm:items-center justify-between px-1 sm:px-2 lg:pl-0 mb-6 md:mb-8">
          <div className="flex gap-2 justify-start items-end">
            <h4
              className="text-lg sm:text-2xl font-semibold text-gray-900
               dark:text-gray-250"
            >
              Clients
            </h4>{" "}
            <h1
              className="text-base md:text-xl font-semibold text-[rgba(77,80,80,1)] 
              dark:text-[#E1E3E5]"
            >
              (258)
            </h1>{" "}
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button
              onClick={() => setIsAddClientDrawerOpen(true)}
              className={`text-base font-medium px-3 py-1 sm:px-6 sm:py-3 md:py-3 rounded-md sm:rounded-2xl bg-[#90C853] text-[#0E201E]`}
              aria-label={"Add new transaction"}
            >
              <span className="hidden sm:inline">Add Client</span>
              <span className="block sm:hidden text-white">+</span>
            </button>
          </div>
        </div>
        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex flex-row gap-4 flex-1">
            {/* Search */}
            <div className="flex-1 md:max-w-md">
              <SearchField
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder="Search"
                ariaLabel="Search clients"
                className="!w-full border-default dark:border-[#4D5050]"
              />
            </div>
            <SecondaryButton
              onClick={() => setShowMobileFilters(true)}
              icon={<FilterIcon />}
              className="flex md:hidden"
            />
            {/* Filters */}
            <div className="hidden md:flex gap-3">
              <Dropdown
                options={assigneesOptions}
                onSelect={(value) => setSelectedFilter(value)}
                searchable={true}
                searchPlaceholder="Type name"
                defaultValue="Assignees"
                inputClassName="!py-2.5"
                multiline={true}
                showTickMark={true}
              />

              <button
                onClick={() =>
                  setIsUnassignedFilterActive(!isUnassignedFilterActive)
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-lg
                  border border-default dark:border-gray-700 bg-white dark:bg-transparent text-gray-11 dark:text-white`}
              >
                {isUnassignedFilterActive && (
                  <TickCircleIcon className="text-gray-500 dark:text-gray-300" />
                )}
                Unassigned
                {isUnassignedFilterActive && (
                  <CrossIcon className="text-gray-500 dark:text-gray-300" />
                )}
              </button>

              <button
                onClick={() =>
                  setIsUnlicensedFilterActive(!isUnlicensedFilterActive)
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-lg
                  border border-default dark:border-gray-700 bg-white dark:bg-transparent text-gray-11 dark:text-white`}
              >
                {isUnlicensedFilterActive && (
                  <TickCircleIcon className="text-gray-500 dark:text-gray-300" />
                )}
                Unlicensed
                {isUnlicensedFilterActive && (
                  <CrossIcon className="text-gray-500 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {/* Sort */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Sort by:
            </span>
            <Dropdown
              options={sortOptions}
              onSelect={(value) => setSelectedSort(value)}
              className="!py-2.5"
            />
          </div>
        </div>

        {/* Mobile Client Cards */}
        <div className="sm:hidden space-y-4 mb-4">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm"
            >
              {/* Header Section */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                    {client.avatar ? (
                      <img
                        src={client.avatar}
                        alt={client.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      client.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Typography
                        variant="small"
                        className="text-base font-semibold text-gray-900 dark:text-gray-100"
                      >
                        {client.name}
                      </Typography>
                      <Typography
                        variant="small"
                        className="text-base font-semibold text-gray-900 dark:text-gray-100"
                      >
                        | {client.id}
                      </Typography>
                    </div>
                    <Typography
                      variant="small"
                      className="text-left text-sm text-gray-600 dark:text-gray-250"
                    >
                      {client.email}
                    </Typography>
                  </div>
                </div>
                <div className="p-2 border border-gray-150 dark:border-gray-700 rounded-[8px]">
                  <RedirectWindowIcon
                    width={16}
                    height={16}
                    strokeColor="#9CA3AF"
                    className="cursor-pointer mt-1"
                  />
                </div>
              </div>

              {/* Details Section */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Transactions:
                  </span>
                  <span className="text-base dark:text-gray-100">
                    {client.transactions.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Last Active:
                  </span>
                  <span className="text-base dark:text-gray-100">
                    {client.lastActive}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    License Status:
                  </span>
                  <span
                    className={`inline-flex px-2 py-1 text-sm font-medium rounded-[8px] ${
                      client.licenseStatus === "Licensed"
                        ? "bg-green-200 text-[#4D772F] dark:bg-green-900 dark:text-green-200"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {client.licenseStatus}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Assigned To:
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {client.assignedTo ? client.assignedTo.name : "Unassigned"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Ownership:
                  </span>
                  <div className="flex items-center gap-2">
                    {client?.assignedTo?.avatar && (
                      <img
                        src={client?.assignedTo?.avatar}
                        alt={client?.assignedTo?.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )}

                    <span
                      className={`inline-flex px-2 py-1 text-sm font-medium rounded-[8px] ${
                        client.ownership === "Owned by Client"
                          ? "bg-[#ECDFFB] text-[#5314A3] dark:bg-purple-900 dark:text-purple-200"
                          : "bg-[#E3EAFD] text-[#133A9A] dark:bg-blue-900 dark:text-blue-200"
                      }`}
                    >
                      {client.ownership}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Clients Table */}
        <Card className="hidden sm:block h-full w-full border-default dark:border-gray-700 bg-transparent shadow-sm">
          <CardBody className="px-0 py-0 rounded-lg sm:overflow-x-auto">
            <table className="w-full min-w-max table-auto text-left">
              <thead className="bg-table-header dark:bg-gray-800">
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className={`cursor-pointer py-5 ${
                        index === 0 ? "rounded-l-xl px-3.5" : ""
                      } ${
                        index === TABLE_HEAD.length - 1 ? "rounded-r-md" : ""
                      }`}
                    >
                      <Typography
                        variant="small"
                        className="flex items-center justify-start gap-2 font-normal text-sm leading-none text-[#666868] dark:text-[#B6B8BA]"
                      >
                        {head}
                        {index !== TABLE_HEAD.length - 1 && (
                          <ChevronUpDownIcon
                            strokeWidth={2}
                            className="h-4 w-4"
                            role="button"
                            aria-label={`Sort by ${head}`}
                          />
                        )}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-[#0E201E] divide-gray-200 dark:divide-[#2F3232]">
                {filteredClients.map((client) => (
                  <tr key={client.id}>
                    {/* Client */}
                    <td className="px-5 py-2.5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                          {client.avatar ? (
                            <img
                              src={client.avatar}
                              alt={client.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            client.name.charAt(0)
                          )}
                        </div>
                        <div className="py-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-md text-gray-900 dark:text-gray-400">
                              {client.id} |
                            </span>
                            <Typography
                              variant="small"
                              className="text-base text-[#0E201E] dark:text-gray-100"
                            >
                              {client.name}
                            </Typography>
                          </div>
                          <Typography
                            variant="small"
                            className="text-sm text-gray-600 dark:text-gray-400"
                          >
                            {client.email}
                          </Typography>
                        </div>
                      </div>
                    </td>

                    {/* Last Active */}
                    <td className="md:p-1 sm:p-5">
                      <Typography
                        variant="small"
                        className="text-base text-gray-900 dark:text-gray-100"
                      >
                        {client.lastActive}
                      </Typography>
                    </td>

                    {/* License Status */}
                    <td className="md:p-1 sm:p-5">
                      <span
                        className={`inline-flex px-1.5 py-1 text-xs font-medium rounded-lg ${
                          client.licenseStatus === "Licensed"
                            ? "bg-green-200 text-[#4D772F] dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {client.licenseStatus}
                      </span>
                    </td>

                    {/* Transactions */}
                    <td className="md:p-1 sm:p-5">
                      <Typography
                        variant="small"
                        className="text-base text-gray-900 dark:text-gray-100"
                      >
                        {client.transactions.toLocaleString()}
                      </Typography>
                    </td>

                    {/* Assigned To */}
                    <td className="md:p-1 sm:p-5">
                      {client.assignedTo ? (
                        <div className="flex items-center gap-2">
                          <img
                            src={client.assignedTo.avatar}
                            alt={client.assignedTo.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <Typography
                            variant="small"
                            className="text-base text-gray-900 dark:text-gray-100"
                          >
                            {client.assignedTo.name}
                          </Typography>
                        </div>
                      ) : (
                        <Typography
                          variant="small"
                          className="text-base text-gray-900 dark:text-gray-400"
                        >
                          Unassigned
                        </Typography>
                      )}
                    </td>

                    {/* Ownership */}
                    <td className="md:p-1 sm:p-5">
                      <div className="flex items-center justify-between pr-5">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-medium rounded-lg ${
                            client.ownership === "Owned by Client"
                              ? "bg-[#ECDFFB] text-[#5314A3] dark:bg-purple-900 dark:text-purple-200"
                              : "bg-[#E3EAFD] text-[#133A9A] dark:bg-blue-900 dark:text-blue-200"
                          }`}
                        >
                          {client.ownership}
                        </span>
                        <RedirectWindowIcon
                          width={16}
                          height={16}
                          strokeColor="#9CA3AF"
                          className="cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>

        {/* Pagination */}
        <div className="hidden md:flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Show
            </span>
            <select className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none">
              <option>7</option>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              on page 7 of 77
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-2 py-[9px] border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button className="px-3.5 py-1.5 bg-green-500 text-dark-900 rounded-lg font-medium hover:bg-green-700 transition-colors">
              1
            </button>
            <button className="px-2.5 py-1.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300">
              2
            </button>
            <button className="px-2.5 py-1.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300">
              3
            </button>
            <button className="px-2.5 py-1.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300">
              ...
            </button>

            <button className="px-2 py-1.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300">
              13
            </button>

            <button className="px-2 py-[9px] border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Add Client Drawer */}
      <AddClientDrawer
        isOpen={isAddClientDrawerOpen}
        onClose={() => setIsAddClientDrawerOpen(false)}
        onClientAdded={handleClientAdded}
      />

      {/* Success Notification */}
      <SuccessNotification
        message={successMessage}
        onClose={handleCloseNotification}
        isVisible={showSuccessNotification}
        duration={3000}
      />

      {/* Error Notification */}
      <ErrorNotification
        message={errorMessage}
        onClose={handleCloseErrorNotification}
        isVisible={showErrorNotification}
        duration={5000}
      />
    </div>
  );
};

export default ClientsPage;
