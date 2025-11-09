import React, { useRef, useEffect } from 'react';
import { modalTableData } from '../../../data/cryptoAssets';

interface AssetDetailModalProps {
  isOpen: boolean;
  selectedAsset: any;
  modalPosition: { top: number; left: number };
  onClose: () => void;
}

const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  isOpen,
  selectedAsset,
  modalPosition,
  onClose
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const MODAL_TABLE_HEAD = ["Wallet", "Balance", "Price ($)", "Value ($)"];

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !selectedAsset) {
    return null;
  }

  return (
    <div
      ref={modalRef}
      className={`fixed z-50 w-1/2 rounded-lg shadow-sm border
        border-gray-500 border-opacity-15 text-gray-900
        bg-background-light dark:bg-background-dark
        dark:text-gray-250 dark:border-gray-700 `}
      style={{
        top: `${modalPosition.top}px`
      }}
    >
      <div className="p-2">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead className={`bg-table-header dark:bg-gray-800`}>
              <tr>
                {MODAL_TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className={`cursor-pointer p-3 ${index === 0 ? 'rounded-l-md' : ''} ${index === MODAL_TABLE_HEAD.length - 1 ? 'rounded-r-md' : ''}`}
                  >
                    <div className={`flex text-sm items-center gap-1.5 font-normal leading-none 
                      dark:text-[#B6B8BA] text-gray-600`}>
                      {head}
                      <div className="flex flex-col" role="button" aria-label={`Sort by ${head}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                          <path fillRule="evenodd" d="M11.47 4.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 0 1-1.06-1.06l3.75-3.75Zm-3.75 9.75a.75.75 0 0 1 1.06 0L12 17.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {modalTableData.map((row) => (
                <tr key={row.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center`}>
                        <img src={row.logo} />
                      </div>
                      <span className={`text-primary text-base dark:text-gray-250`}>
                        {row.wallet}
                      </span>
                    </div>
                  </td>
                  <td className={`p-3 text-left text-primary dark:text-gray-250`}>
                    {row.balance}
                  </td>
                  <td className={`p-3 text-left text-primary dark:text-gray-250`}>
                    {row.price}
                  </td>
                  <td className={`p-3 text-left text-primary dark:text-gray-250`}>
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssetDetailModal;
