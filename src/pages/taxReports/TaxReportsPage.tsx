import React from "react";
import NavigationBar from "../../components/NavigationBar";

interface TaxReportsPageProps {
  onLogout: () => void;
}

const TaxReportsPage: React.FC<TaxReportsPageProps> = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavigationBar onLogout={onLogout} currentPage="tax-reports" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-250 mb-4">
            Tax Reports
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            No content available yet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaxReportsPage;
