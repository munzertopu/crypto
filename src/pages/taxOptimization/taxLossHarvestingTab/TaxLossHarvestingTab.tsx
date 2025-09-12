import React, { useState } from 'react';
import TaxLossHarvestingCards from './components/TaxLossHarvestingCards';
import TaxLossHarvestingFilters from './components/TaxLossHarvestingFilters';
import TaxLossHarvestingTable from './components/TaxLossHarvestingTable';



interface TaxLossHarvestingTabProps {}

const TaxLossHarvestingTab: React.FC<TaxLossHarvestingTabProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');



  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Cards Section */}
      <TaxLossHarvestingCards />

      {/* Search and Filter Section */}
      <TaxLossHarvestingFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Table Section */}
      <TaxLossHarvestingTable 
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
    </div>
  );
};

export default TaxLossHarvestingTab;
