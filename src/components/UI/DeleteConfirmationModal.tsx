import React from 'react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName = 'item',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-xl w-1/2 p-8 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="text-lg font-bold text-gray-11 text-left">
            Are you sure you want to delete?
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Warning Message */}
        <p className="text-gray-11 mb-6 text-left text-base">
          This action will permanently remove the imported file and all associated transaction records from history.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="py-3 text-gray-700 rounded-xl transition-colors"
          >
            Cancel
          </button>
           <button
             onClick={onConfirm}
             className="px-4 py-3 bg-red-500 text-white rounded-xl font-bold"
           >
             Delete
           </button>
         </div>
       </div>
     </div>
   );
 };

export default DeleteConfirmationModal;
