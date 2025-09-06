import React, { useState } from "react";
import WalletConfigureForm from "../../../components/Forms/WalletConfigureForm";

interface ConfigureModalProps {
  isOpen: boolean;
  onClose: () => void;
  platformName: string;
  isDarkMode: boolean;
  onConfigureSuccess?: () => void;
}

const ConfigureModal: React.FC<ConfigureModalProps> = ({
  isOpen,
  onClose,
  platformName,
  isDarkMode,
  onConfigureSuccess,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <WalletConfigureForm
        isOpen={isOpen}
        onClose={onClose}
        platformName={platformName}
        isDarkMode={isDarkMode}
        onConfigureSuccess={onConfigureSuccess}
      />
    </div>
  );
};

export default ConfigureModal;
