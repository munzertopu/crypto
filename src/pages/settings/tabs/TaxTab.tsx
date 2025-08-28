import React from 'react';

interface TaxTabProps {
  isDarkMode: boolean;
}

const TaxTab: React.FC<TaxTabProps> = ({ isDarkMode }) => {
  return (
    <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
      <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Tax Settings
      </h3>
      <p>Tax settings will be implemented here.</p>
    </div>
  );
};

export default TaxTab;
