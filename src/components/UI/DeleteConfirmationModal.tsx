import React from 'react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
  drawerHeight?: string; // e.g., "70%", "80vh", "400px"
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName = 'item',
  drawerHeight = '35%',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black transition-opacity md:bg-opacity-50 bg-opacity-30"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="flex min-h-full md:items-center md:justify-center md:p-4">
        {/* Mobile Drawer */}
        <div 
          className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-100 rounded-t-2xl shadow-xl flex flex-col transition-transform duration-300 ease-in-out transform translate-y-0"
          style={{ height: drawerHeight }}
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-3 ">
            <h3 className="text-lg font-bold text-gray-11 text-left">
              Are you sure you want to delete?
            </h3>
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

          {/* Mobile Content */}
          <div className="flex-1 p-3 flex flex-col">
            <p className="text-gray-11 mb-6 text-left text-sm">
              This action will permanently remove the imported file and all associated transaction records from history.
            </p>

            {/* Mobile Action Buttons */}
            <div className="flex justify-between mt-auto">
              <button
                onClick={onClose}
                className="py-2 text-gray-700 rounded-xl transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-xl font-bold text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Modal */}
        <div className="hidden md:block relative bg-white dark:bg-gray-100 rounded-xl shadow-xl max-w-md w-full p-8 flex flex-col">
          {/* Desktop Header */}
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-lg font-bold text-gray-11 text-left">
              Are you sure you want to delete?
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Desktop Warning Message */}
          <p className="text-gray-11 mb-6 text-left text-base">
            This action will permanently remove the imported file and all associated transaction records from history.
          </p>

          {/* Desktop Action Buttons */}
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="py-3 text-gray-700 rounded-xl transition-colors text-base"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-3 bg-red-500 text-white rounded-xl font-bold text-base"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
 };

export default DeleteConfirmationModal;
