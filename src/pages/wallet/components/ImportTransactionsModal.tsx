import React, { useState } from "react";
import { Accordion, AccordionItem } from "../../../components/Accordion";
import TrashIcon from "../../../components/Icons/TrashIcon";

interface ImportTransactionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletName: string;
}

const ImportTransactionsModal: React.FC<ImportTransactionsModalProps> = ({
  isOpen,
  onClose,
  walletName = "Coinbase",
}) => {
  const [timezone, setTimezone] = useState("UTC");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Clear selected file when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setSelectedFile(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    // Reset the file input
    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="flex min-h-full items-end md:items-center md:justify-center md:p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-t-3xl md:rounded-2xl shadow-xl max-w-4xl w-full p-4 md:p-8 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 md:mb-0 mt-2 md:mt-0">
            <div>
              <h3 className="text-lg md:text-2xl font-semibold text-gray-900 dark:text-gray-100 text-left">
                Import transactions for {walletName}
              </h3>
              <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 text-left mt-1">
                Download your transaction files for all years of trading and
                upload them here. Every deposit, withdrawal & trade should be
                added.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 transition-colors"
              aria-label="Close modal"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-6 lg:gap-8 mt-2 md:mt-6">
              {/* Left Section - File Upload */}
              <div className="space-y-4 md:space-y-6">
                {/* File Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-4 md:p-6 text-center transition-colors border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 cursor-pointer`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileInput}
                    accept=".csv,.zip,.xlsx,.xls"
                  />

                  <div className="flex flex-col items-center space-y-4">
                    {/* Mobile Layout */}
                    <div className="block md:hidden w-full">
                      {/* Browse file section */}
                      <div className="flex flex-col items-center space-y-3">
                        {/* Green Folder Icon */}
                        <div className="flex items-center justify-center text-green-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 640"
                            className="size-12"
                            fill="currentColor"
                          >
                            <path d="M128 512L512 512C547.3 512 576 483.3 576 448L576 208C576 172.7 547.3 144 512 144L362.7 144C355.8 144 349 141.8 343.5 137.6L305.1 108.8C294 100.5 280.5 96 266.7 96L128 96C92.7 96 64 124.7 64 160L64 448C64 483.3 92.7 512 128 512z" />
                          </svg>
                        </div>
                        <span className="text-gray-900 dark:text-gray-100 font-normal text-sm">
                          Browse file
                        </span>
                      </div>

                      {/* OR Divider */}
                      <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                        </div>
                        <div className="relative flex justify-center">
                          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-medium">
                            OR
                          </span>
                        </div>
                      </div>

                      {/* Google Drive Button */}
                      <button
                        className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle Google Drive upload
                        }}
                      >
                        Upload from Google Drive
                      </button>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:block">
                      {/* Green Folder Icon */}
                      <div className="pb-3 rounded-lg flex items-center justify-center text-green-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 640 640"
                          className="size-12"
                          fill="currentColor"
                        >
                          <path d="M128 512L512 512C547.3 512 576 483.3 576 448L576 208C576 172.7 547.3 144 512 144L362.7 144C355.8 144 349 141.8 343.5 137.6L305.1 108.8C294 100.5 280.5 96 266.7 96L128 96C92.7 96 64 124.7 64 160L64 448C64 483.3 92.7 512 128 512z" />
                        </svg>
                      </div>
                      <p className="text-gray-900 dark:text-gray-100 font-normal text-sm">
                        Drag and drop your file or{" "}
                        <span className="text-[#5F9339]">Browse file</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* File Display Area - Shows after file selection */}
                {selectedFile && (
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-3 md:p-4 bg-white dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 md:space-x-3">
                        {/* Green Folder Icon */}
                        <div className="w-6 h-6 md:w-8 md:h-8 text-green-500 rounded flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 640"
                            className="size-6 md:size-12"
                            fill="currentColor"
                          >
                            <path d="M128 512L512 512C547.3 512 576 483.3 576 448L576 208C576 172.7 547.3 144 512 144L362.7 144C355.8 144 349 141.8 343.5 137.6L305.1 108.8C294 100.5 280.5 96 266.7 96L128 96C92.7 96 64 124.7 64 160L64 448C64 483.3 92.7 512 128 512z" />
                          </svg>
                        </div>

                        <div>
                          <p className="text-gray-900 dark:text-gray-100 font-medium text-xs md:text-sm">
                            {selectedFile.name}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300 text-xs text-left">
                            {formatFileSize(selectedFile.size)}
                          </p>
                        </div>
                      </div>

                      {/* Remove File Button */}
                      <button
                        onClick={handleRemoveFile}
                        className="text-gray-500 dark:text-gray-400"
                        aria-label="Remove file"
                      >
                        <TrashIcon strokeColor="currentColor" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Timezone Selector */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm md:text-sm font-medium text-gray-900 dark:text-gray-100">
                      Timezone
                    </label>
                    <svg
                      className="w-4 h-4 md:w-4 md:h-4 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="relative">
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full px-4 md:px-4 py-3 md:py-3 border border-gray-300 dark:border-gray-600 text-sm md:text-base rounded-xl bg-transparent dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-none focus:outline-none appearance-none pr-10 md:pr-12"
                    >
                      <option value="UTC">UTC</option>
                      <option value="EST">EST</option>
                      <option value="PST">PST</option>
                      <option value="CST">CST</option>
                    </select>
                    {/* Custom dropdown arrow with 16px margin from right */}
                    <div className="absolute right-4 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-4 h-4 md:w-4 md:h-4 text-gray-900 dark:text-gray-100"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Instructions */}
              <div className="">
                {/* Mobile Accordion Instructions */}
                <div className="block md:hidden">
                  <Accordion className="!bg-gray-100 dark:!bg-gray-900 p-3">
                    <AccordionItem
                      title="Instructions"
                      className="!bg-gray-100 dark:!bg-gray-900"
                    >
                      <div className="md:hidden">
                        <ol className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                          <li className="flex items-start space-x-2">
                            <span className="flex-shrink-0 w-6 h-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center text-xs font-medium">
                              1
                            </span>
                            <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                              <span className="text-gray-900 dark:text-gray-100">
                                Log in
                              </span>{" "}
                              to the {walletName} app
                            </span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="flex-shrink-0 w-6 h-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center text-xs font-medium">
                              2
                            </span>
                            <span className="text-base text-left font-medium text-gray-700 dark:text-gray-300">
                              Select{" "}
                              <span className="text-gray-900 dark:text-gray-100">
                                account balance
                              </span>{" "}
                              in the top left.
                            </span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="flex-shrink-0 w-6 h-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center text-xs font-medium">
                              3
                            </span>
                            <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                              Select send{" "}
                              <span className="text-gray-900 dark:text-gray-100">
                                CSV
                              </span>{" "}
                              to email.
                            </span>
                          </li>
                          <li className="flex items-start space-x-2 text-left">
                            <span className="flex-shrink-0 w-6 h-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center text-xs font-medium">
                              4
                            </span>
                            <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                              Your CSV file will be sent to the email associated
                              with your {walletName} account -{" "}
                              <span className="text-gray-900 dark:text-gray-100">
                                download
                              </span>{" "}
                              it from here.
                            </span>
                          </li>
                        </ol>
                      </div>
                      <div className="pt-2">
                        <button className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm font-medium">
                          Watch video
                        </button>
                      </div>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* Desktop Instructions */}
                <div className="hidden md:block">
                  <ol className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-6 h-6 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center text-xs font-medium">
                        1
                      </span>
                      <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                        <span className="text-gray-900 dark:text-gray-100">
                          Log in
                        </span>{" "}
                        to the {walletName} app
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-6 h-6 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center text-xs font-medium">
                        2
                      </span>
                      <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                        Select{" "}
                        <span className="text-gray-900 dark:text-gray-100">
                          account balance
                        </span>{" "}
                        in the top left.
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-6 h-6 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center text-xs font-medium">
                        3
                      </span>
                      <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                        Select send{" "}
                        <span className="text-gray-900 dark:text-gray-100">
                          CSV
                        </span>{" "}
                        to email.
                      </span>
                    </li>
                    <li className="flex items-start space-x-2 text-left">
                      <span className="flex-shrink-0 w-6 h-6 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center text-xs font-medium">
                        4
                      </span>
                      <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                        Your CSV file will be sent to the email associated with
                        your {walletName} account -{" "}
                        <span className="text-gray-900 dark:text-gray-100">
                          download
                        </span>{" "}
                        it from here.
                      </span>
                    </li>
                  </ol>
                  <button className="mt-5 w-full py-3 px-5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    Watch video
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Actions */}
          <div className="flex  md:flex-row justify-between mt-6 md:mt-6 gap-3">
            <button className="px-4 md:px-5 py-3 md:py-3 border-2 border-gray-300 dark:border-gray-600 text-sm md:text-base font-medium rounded-lg bg-transparent dark:bg-gray-800 text-gray-700 dark:text-gray-100">
              View history
            </button>
            <button
              onClick={onClose}
              className="px-4 md:px-5 py-3 md:py-3 bg-green-500 text-gray-900  rounded-xl text-sm md:text-base font-medium"
            >
              Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportTransactionsModal;
