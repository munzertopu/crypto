import React, { useState } from 'react';
import MissingHistoricalPrice from '../components/MissingHistoricalPrice';
import CurrencyTable from '../components/CurrencyTable';
import SuccessNotification from '../../../components/SuccessNotification';

interface CustomPriceTabProps {}

const CustomPriceTab: React.FC<CustomPriceTabProps> = () => {
  const [currentView, setCurrentView] = useState<'missing' | 'currency'>('missing');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const handleEditMissingPrice = (platforms: string[]) => {
    setSelectedPlatforms(platforms);
    setCurrentView('currency');
  };

  const handleBackToMissing = () => {
    setCurrentView('missing');
    setSelectedPlatforms([]);
  };

  const handleShowNotification = () => {
    setShowSuccessNotification(true);
  };

  const handleCloseNotification = () => {
    setShowSuccessNotification(false);
  };

  return (
    <div>
      {/* Success Notification */}
      <SuccessNotification
        message="New Coinbase price has been added"
        isVisible={showSuccessNotification}
        onClose={handleCloseNotification}
        duration={3000}
      />
      {currentView === 'missing' ? (
        <MissingHistoricalPrice
          onEditMissingPrice={handleEditMissingPrice}
        />
      ) : (
        <CurrencyTable
          selectedPlatforms={selectedPlatforms}
          onBack={handleBackToMissing}
          showNotification={handleShowNotification}
        />
      )}
    </div>
  );
};

export default CustomPriceTab;
