import React, { useState } from 'react';

interface ImportTransactionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletName: string;
}

const ImportTransactionsModal: React.FC<ImportTransactionsModalProps> = ({ 
  isOpen, 
  onClose, 
  walletName = "Coinbase"
}) => {
  const [timezone, setTimezone] = useState("UTC");
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop logic here
    console.log("Files dropped:", e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file input logic here
    console.log("Files selected:", e.target.files);
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
      <div className="flex min-h-full items-center justify-center">
        <div className="relative bg-white dark:bg-gray-100 rounded-2xl shadow-xl max-w-4xl w-full p-8">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-gray-11 text-left">
                Import transactions for {walletName}
              </h3>
              <p className="text-gray-11 text-left">
                Download your transaction files for all years of trading and upload them here.
              </p>
              <p className="text-sm text-gray-11 text-left">
                Every deposit, withdrawal & trade should be added.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Content */}
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
              {/* Left Section - File Upload */}
              <div className="space-y-6">
                {/* File Upload Area */}
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors border-gray-300 bg-transparent`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center space-y-4">
                    {/* Green Folder Icon */}
                    <div className="w-16 h-16 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    </div>
                    
                    <p className="text-gray-600 font-medium">
                      Drag and drop your file or Browse
                    </p>
                    
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      multiple
                      onChange={handleFileInput}
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer text-blue-600 hover:text-blue-800 underline"
                    >
                      Browse files
                    </label>
                  </div>
                </div>

                {/* OR Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">OR</span>
                  </div>
                </div>

                {/* Google Drive Upload Button */}
                <button className="w-full py-3 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors">
                  Upload from Google Drive
                </button>

                {/* Timezone Selector */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700">
                      Timezone
                    </label>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">EST</option>
                    <option value="PST">PST</option>
                    <option value="CST">CST</option>
                  </select>
                </div>

              </div>

              {/* Right Section - Instructions */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Instructions for {walletName}
                </h4>
                
                <ol className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-medium">1</span>
                    <span>Log in to the {walletName} app</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-medium">2</span>
                    <span>Select account balance in the top left.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-medium">3</span>
                    <span>Select send CSV to email.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-medium">4</span>
                    <span className='text-left'>
                      Your CSV file will be sent to the email associated with your {walletName} account -{' '}
                      <span className="font-bold">download</span> it from here.
                    </span>
                  </li>
                </ol>

                <button className="mt-6 w-full py-3 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors">
                  Watch video
                </button>
              </div>
            </div>

             {/* Bottom Actions */}
             <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
               <button className="px-6 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors">
                 View Import history
               </button>
               <button
                 onClick={onClose}
                 className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
               >
                 Import
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportTransactionsModal;
