import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import CrossIcon from '../../../components/Icons/CrossIcon';
import InfoCircleIcon from '../../../components/Icons/InfoCircleIcon';
import Dropdown from '../../../components/UI/Dropdown';

interface AddClientDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onClientAdded: (clientName: string) => void;
}

const AddClientDrawer: React.FC<AddClientDrawerProps> = ({
  isOpen,
  onClose,
  onClientAdded,
}) => {
  const [clientName, setClientName] = useState("");
  const [shareAccess, setShareAccess] = useState("");
  const [clientType, setClientType] = useState("Personal");
  const [assignedTo, setAssignedTo] = useState("Jessica Wong");
  const [assignLicense, setAssignLicense] = useState(false);

  const clientTypeOptions = [
    { label: "Personal", value: "Personal" },
    { label: "Business", value: "Business" },
    { label: "Corporate", value: "Corporate" },
  ];

  const assignedToOptions = [
    {
      label: "Jessica Wong",
      value: "Jessica Wong",
      subtitle: "jessica.wong@company.com",
    },
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
  ];

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving client:", {
      clientName,
      shareAccess,
      clientType,
      assignedTo,
      assignLicense,
    });

    // Notify parent component about successful client addition
    onClientAdded(clientName);

    // Close drawer immediately
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Drawer - Mobile Bottom Sheet / Desktop Sidebar */}
      <div className={`fixed bottom-0 left-0 right-0 md:left-0 md:right-auto md:top-0 md:bottom-auto h-[93vh] md:h-full w-full md:w-96 bg-white dark:bg-gray-800 z-50 transform transition-transform duration-300 ease-in-out shadow-xl rounded-t-3xl md:rounded-none ${isOpen ? 'translate-y-0' : 'translate-y-full'} md:translate-y-0 md:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 md:p-6 pb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg md:text-h5 font-bold text-gray-11 dark:text-gray-100">
                Add client
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 dark:text-gray-400 p-1 focus:outline-none focus:ring-0"
              >
                <CrossIcon
                  height={20}
                  width={20}
                />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-6">
            <div className="space-y-4 md:space-y-5">
              {/* Client name */}
              <div className="text-left">
                <label className="text-left text-sm font-medium text-gray-700 dark:text-gray-100">
                  Client name
                </label>
                <div className="mt-1.5">
                  <Input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Type name"
                    className="w-full border border-gray-300 sm:border-default dark:border-gray-700 rounded-lg focus:ring-0 focus:outline-none focus:border-default bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm md:text-base"
                  />
                </div>
              </div>

              {/* Share access */}
              <div className="text-left">
                <div className="flex items-center gap-2 mb-2 sm:mb-1.5">
                  <label className="text-left text-sm font-medium text-gray-700 dark:text-gray-100">
                    Share access
                  </label>
                  <div className="relative group">
                    <InfoCircleIcon className="text-gray-500 dark:text-gray-500" />
                    {/* Tooltip */}
                    <div className="absolute top-full -left-2 transform mt-2 px-3 py-2 text-sm rounded-lg
                    bg-gray-900 dark:bg-gray-700 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 w-max">
                      {/* Arrow pointing up */}
                      <div className="absolute bottom-full left-3 transform border-4 border-transparent border-b-gray-900 dark:border-b-gray-700"></div>
                      <div className="text-center leading-tight">
                        <div>There should be an explanation</div>
                        <div>of what shared access is.</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-1.5">
                  <Input
                    type="email"
                    value={shareAccess}
                    onChange={(e) => setShareAccess(e.target.value)}
                    placeholder="client@email.com"
                    className="w-full border border-gray-300 sm:border-default dark:border-gray-700 rounded-lg focus:ring-0 focus:outline-none focus:border-default bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm md:text-base"
                  />
                </div>
              </div>

              {/* Client type */}
              <div className="text-left">
                <label className="text-left text-sm font-medium text-gray-700 dark:text-gray-100">
                  Client type
                </label>
                <div className="mt-1.5">
                  <Dropdown
                    options={clientTypeOptions}
                    selectedValue={clientType}
                    onSelect={(value) => setClientType(value)}
                    className="w-full"
                    showTickMark={true}
                    inputClassName='dark:bg-transparent text-sm md:text-base'
                  />
                </div>
              </div>

              {/* Assign to */}
              <div className="text-left">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-300 mb-2 sm:mb-0 block">
                  Assign to
                </label>
                <div className="mt-1.5">
                  <Dropdown
                    options={assignedToOptions}
                    selectedValue={assignedTo}
                    onSelect={(value) => setAssignedTo(value)}
                    className="w-full"
                    inputClassName='dark:bg-transparent text-sm md:text-base'
                  />
                </div>
              </div>

              {/* Assign license */}
              <div className="text-left">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus:ring-0 ${
                      assignLicense
                        ? "bg-green-600 border-green-600"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    onClick={() => setAssignLicense(!assignLicense)}
                  >
                    {assignLicense && (
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <label
                    className="text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                    onClick={() => setAssignLicense(!assignLicense)}
                  >
                    Assign license
                  </label>
                </div>
              </div>

              {/* Information box */}
              <div className="bg-gray-100 dark:bg-[#232726] rounded-lg p-3 md:p-4 border border-gray-200 dark:border-gray-700 justify-start text-left">
                <div className="flex items-start gap-3">
                  <InfoCircleIcon className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    If client already has an account then ask them to invite
                    "client@gmail.com" to it instead.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 p-4 md:p-6 pt-4">
            <button
              onClick={handleSave}
              className={`w-full px-5 py-3 rounded-lg md:rounded-xl font-medium transition-colors text-base focus:outline-none focus:ring-0 ${
                clientName && shareAccess
                  ? 'bg-green-500 text-gray-900 hover:bg-green-500' 
                  : 'bg-default dark:bg-gray-700 text-gray-400 dark:text-gray-300 cursor-not-allowed'
              }`}
              disabled={!clientName || !shareAccess}
            >
              Add client
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddClientDrawer;
