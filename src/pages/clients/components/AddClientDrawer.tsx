import React, { useState } from 'react';
import { Input } from "@material-tailwind/react";
import CrossIcon from '../../../utils/icons/CrossIcon';
import InfoCircleIcon from '../../../utils/icons/InfoCircleIcon';
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
  const [clientName, setClientName] = useState('');
  const [shareAccess, setShareAccess] = useState('');
  const [clientType, setClientType] = useState('Personal');
  const [assignedTo, setAssignedTo] = useState('Jessica Wong');
  const [assignLicense, setAssignLicense] = useState(false);

  const clientTypeOptions = [
    { label: 'Personal', value: 'Personal' },
    { label: 'Business', value: 'Business' },
    { label: 'Corporate', value: 'Corporate' }
  ];

  const assignedToOptions = [
    { label: 'Jessica Wong', value: 'Jessica Wong', subtitle: 'jessica.wong@company.com' },
    { label: 'Daniel Foster', value: 'Daniel Foster', subtitle: 'daniel@gmail.com' },
    { label: 'Arman Lelevier', value: 'Arman Lelevier', subtitle: 'arman@gmail.com' }
  ];

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving client:', {
      clientName,
      shareAccess,
      clientType,
      assignedTo,
      assignLicense
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
      
      {/* Drawer */}
      <div className="fixed left-0 top-0 h-full w-96 bg-white dark:bg-[#0E201E] z-50 transform transition-transform duration-300 ease-in-out shadow-xl">
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="pb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-h5 font-bold text-gray-900 dark:text-white">
                Add client
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <CrossIcon 
                height={20}
                width={20}
                />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-3">
              {/* Client name */}
              <div className="text-left">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-300">
                  Client name
                </label>
                <div className="mt-1.5">
                  <Input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Enter client name"
                    className="w-full border border-default focus:ring-0 focus:outline-none"
                  />
                </div>
              </div>

              {/* Share access */}
              <div className="text-left">
                 <div className="flex items-center gap-2 mb-1.5">
                   <label className="text-sm font-medium text-gray-900 dark:text-gray-300">
                     Share access
                   </label>
                   <InfoCircleIcon className="text-gray-500" />
                 </div>
                <div className="mt-1.5">
                  <Input
                    type="email"
                    value={shareAccess}
                    onChange={(e) => setShareAccess(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full border border-default focus:ring-0 focus:outline-none"
                  />
                </div>
              </div>

              {/* Client type */}
              <div className="text-left">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-300">
                  Client type
                </label>
                <div className="mt-1.5">
                  <Dropdown
                    options={clientTypeOptions}
                    selectedValue={clientType}
                    onSelect={(value) => setClientType(value)}
                    className="w-full"
                    showTickMark={true}
                  />
                </div>
              </div>

              {/* Assign to */}
              <div className="text-left">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-300">
                  Assign to
                </label>
                <div className="mt-1.5">
                  <Dropdown
                    options={assignedToOptions}
                    selectedValue={assignedTo}
                    onSelect={(value) => setAssignedTo(value)}
                    className="w-full"
                  />
                </div>
              </div>

               {/* Assign license */}
               <div className="text-left !my-6">
                 <div className="flex items-center gap-2">
                   <div
                     className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-colors cursor-pointer ${
                       assignLicense
                         ? "bg-green-600 border-green-600"
                         : "border-gray-300"
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
               <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                 <div className="flex items-start gap-3">
                   <InfoCircleIcon className="text-gray-400 mt-0.5 flex-shrink-0" />
                   <p className="text-left text-sm text-gray-600 dark:text-gray-400">
                     If client already has an account then ask them to invite 'client@gmail.com' to it instead.
                   </p>
                 </div>
               </div>

            </div>
          </div>

          {/* Footer */}
          <div>
            <button
              onClick={handleSave}
              className="w-full px-5 py-3 rounded-xl font-medium transition-colors bg-green-500 text-gray-900 hover:bg-green-600"
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
