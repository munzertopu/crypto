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
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
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
                   className={`border-[1px] border-dashed rounded-lg p-6 text-center transition-colors border-gray-250 bg-transparent cursor-pointer`}
                   onDragEnter={handleDrag}
                   onDragLeave={handleDrag}
                   onDragOver={handleDrag}
                   onDrop={handleDrop}
                   onClick={() => document.getElementById('file-upload')?.click()}
                 >
                   <input
                     type="file"
                     id="file-upload"
                     className="hidden"
                     onChange={handleFileInput}
                     accept=".csv,.zip,.xlsx,.xls"
                   />
                   
                   <div className="flex flex-col items-center">
                     {/* Green Folder Icon */}
                     <div className="pb-3 rounded-lg flex items-center justify-center text-green-500">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="size-12" fill="currentColor">
                         <path d="M128 512L512 512C547.3 512 576 483.3 576 448L576 208C576 172.7 547.3 144 512 144L362.7 144C355.8 144 349 141.8 343.5 137.6L305.1 108.8C294 100.5 280.5 96 266.7 96L128 96C92.7 96 64 124.7 64 160L64 448C64 483.3 92.7 512 128 512z"/>
                       </svg>
                     </div>
                     
                     <p className="text-gray-900 font-normal text-sm">
                       Drag and drop your file or <span className="text-[#5F9339]">Browse</span>
                     </p>
                   </div>
                 </div>

                 {/* File Display Area - Shows after file selection */}
                 {selectedFile && (
                   <div className="border border-default rounded-xl p-4">
                     <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-3">
                         {/* Green Folder Icon */}
                         <div className="w-8 h-8 text-green-500 rounded flex items-center justify-center">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="size-12" fill="currentColor">
                            <path d="M128 512L512 512C547.3 512 576 483.3 576 448L576 208C576 172.7 547.3 144 512 144L362.7 144C355.8 144 349 141.8 343.5 137.6L305.1 108.8C294 100.5 280.5 96 266.7 96L128 96C92.7 96 64 124.7 64 160L64 448C64 483.3 92.7 512 128 512z"/>
                          </svg>
                         </div>
                         
                         <div>
                           <p className="text-gray-900 font-medium text-sm">{selectedFile.name}</p>
                           <p className="text-gray-700 text-xs text-left">{formatFileSize(selectedFile.size)}</p>
                         </div>
                       </div>
                       
                       {/* Remove File Button */}
                       <button
                         onClick={handleRemoveFile}
                         className="text-gray-500"
                         aria-label="Remove file"
                       >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.5 6.64994C14.725 6.37494 11.9333 6.23328 9.15 6.23328C7.5 6.23328 5.85 6.31661 4.2 6.48328L2.5 6.64994" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M7.08301 5.80837L7.26634 4.71671C7.39967 3.92504 7.49967 3.33337 8.90801 3.33337H11.0913C12.4997 3.33337 12.608 3.95837 12.733 4.72504L12.9163 5.80837" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M15.7087 6.78333L15.167 15.175C15.0753 16.4833 15.0003 17.5 12.6753 17.5H7.32533C5.00033 17.5 4.92533 16.4833 4.83366 15.175L4.29199 6.78333" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                       </button>
                     </div>
                   </div>
                 )}

                {/* OR Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-900">OR</span>
                  </div>
                </div>

                {/* Google Drive Upload Button */}
                <button className="w-full text-sm font-medium py-3 px-4 border-2 border-default rounded-xl bg-transparent text-gray-900">
                  Upload from Google Drive
                </button>

                 {/* Timezone Selector */}
                 <div className="space-y-2">
                   <div className="flex items-center space-x-2">
                     <label className="text-sm font-medium text-gray-900">
                       Timezone
                     </label>
                     <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                   </div>
                   <div className="relative">
                     <select
                       value={timezone}
                       onChange={(e) => setTimezone(e.target.value)}
                       className="w-full px-4 py-3 border border-default text-base rounded-xl bg-transparent text-gray-900 focus:ring-none focus:outline-none appearance-none pr-12"
                     >
                       <option value="UTC">UTC</option>
                       <option value="EST">EST</option>
                       <option value="PST">PST</option>
                       <option value="CST">CST</option>
                     </select>
                     {/* Custom dropdown arrow with 16px margin from right */}
                     <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                       <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                       </svg>
                     </div>
                   </div>
                 </div>
              </div>

              {/* Right Section - Instructions */}
              <div className="bg-gray-100 rounded-xl p-5 h-min">
                <ol className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-white text-gray-900 border border-default rounded-full flex items-center justify-center text-xs font-medium">1</span>
                    <span className='text-base font-medium text-gray-700'><span className='text-gray-900'>Log in</span> to the {walletName} app</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-white text-gray-900 border border-default rounded-full flex items-center justify-center text-xs font-medium">2</span>
                    <span className='text-base font-medium text-gray-700'>Select <span className='text-gray-900'>account balance</span> in the top left.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-white text-gray-900 border border-default rounded-full flex items-center justify-center text-xs font-medium">3</span>
                    <span className='text-base font-medium text-gray-700'>Select send  <span className='text-gray-900'>CSV</span> to email.</span>
                  </li>
                  <li className="flex items-start space-x-2 text-left">
                    <span className="flex-shrink-0 w-6 h-6 bg-white text-gray-900 border border-default rounded-full flex items-center justify-center text-xs font-medium">4</span>
                    <span className='text-base font-medium text-gray-700'>Your CSV file will be sent to the email associated with your {walletName} account -{' '}  
                      <span className='text-gray-900'>download</span> it from here.</span>
                  </li>
                </ol>
                <button className="mt-5 w-full py-3 px-5 border border-default rounded-xl bg-white text-gray-900">
                  Watch video
                </button>
              </div>
            </div>

             {/* Bottom Actions */}
             <div className="flex justify-between mt-6">
               <button className="px-5 py-3 border-2 border-default text-base font-medium rounded-lg bg-transparent text-gray-700">
                 View Import history
               </button>
               <button
                 onClick={onClose}
                 className="px-5 py-3 bg-green-500 text-gray-900 rounded-xl text-base font-medium"
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
