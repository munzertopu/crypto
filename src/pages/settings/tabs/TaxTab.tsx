/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from "react";

interface TaxTabProps {}

const TaxTab: React.FC<TaxTabProps> = () => {
  return (
    <div className="text-center py-12 text-gray-600 dark:text-gray-400">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-150">
        Tax Settings
      </h3>
      <p>Tax settings will be implemented here.</p>
    </div>
  );
};

export default TaxTab;
