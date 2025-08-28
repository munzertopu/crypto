import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEye, 
  faSort,
  faSortUp,
  faSortDown
} from '@fortawesome/free-solid-svg-icons';
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { taxLossHarvestingAssets } from '../../../../data/cryptoAssets';
import type { TaxLossHarvestingAsset } from '../../../../data/cryptoAssets';

interface TaxLossHarvestingTableProps {
  isDarkMode?: boolean;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string) => void;
}

const TaxLossHarvestingTable: React.FC<TaxLossHarvestingTableProps> = ({
  isDarkMode = false,
  sortField,
  sortDirection,
  onSort
}) => {
  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return <FontAwesomeIcon icon={faSort} className="w-3 h-3 text-gray-400" />;
    }
    return sortDirection === 'asc' 
      ? <FontAwesomeIcon icon={faSortUp} className="w-3 h-3 text-gray-600" />
      : <FontAwesomeIcon icon={faSortDown} className="w-3 h-3 text-gray-600" />;
  };

  const tableHeaders = [
    { key: 'asset', label: 'Asset' },
    { key: 'amountHeld', label: 'Amount Held' },
    { key: 'potentialLoss', label: 'Potential Loss' },
    { key: 'costBasis', label: 'Cost Basis' },
    { key: 'marketValue', label: 'Market Value' },
    { key: 'gainsLosses', label: 'Gains/Losses' }
  ];

  return (
    <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} border border-gray-200`}>
      <CardBody className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full" role="table" aria-label="Tax loss harvesting cryptocurrency holdings">
            <thead>
              <tr className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`} role="row">
                {tableHeaders.map(({ key, label }) => (
                  <th 
                    key={key}
                    className="px-6 py-4 text-left cursor-pointer" 
                    role="columnheader" 
                    scope="col"
                    onClick={() => onSort(key)}
                  >
                    <div className="flex items-center space-x-2">
                      <Typography variant="small" className={`font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {label}
                      </Typography>
                      {getSortIcon(key)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {taxLossHarvestingAssets.map((asset) => (
                <tr 
                  key={asset.id}
                  className={`border-b border-gray-200 ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}
                  role="row"
                >
                  {/* Asset */}
                  <td className="px-6 py-4" role="cell">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={asset.logo} 
                        alt={`${asset.name} logo`}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex items-center space-x-2">
                        <div>
                          <Typography variant="small" className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {asset.name}
                          </Typography>
                          <Typography variant="small" className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {asset.symbol}
                          </Typography>
                        </div>
                        <FontAwesomeIcon 
                          icon={faEye} 
                          className={`w-3 h-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} cursor-pointer`}
                          aria-label="View asset details"
                        />
                      </div>
                    </div>
                  </td>

                  {/* Amount Held */}
                  <td className="px-6 py-4" role="cell">
                    <Typography variant="small" className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {asset.amountHeld}
                    </Typography>
                  </td>

                  {/* Potential Loss */}
                  <td className="px-6 py-4" role="cell">
                    <Typography variant="small" className="font-medium text-red-600">
                      {asset.potentialLoss}
                    </Typography>
                  </td>

                  {/* Cost Basis */}
                  <td className="px-6 py-4" role="cell">
                    <Typography variant="small" className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {asset.costBasis}
                    </Typography>
                  </td>

                  {/* Market Value */}
                  <td className="px-6 py-4" role="cell">
                    <Typography variant="small" className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {asset.marketValue}
                    </Typography>
                  </td>

                  {/* Gains/Losses */}
                  <td className="px-6 py-4" role="cell">
                    <div>
                      <Typography variant="small" className="font-medium text-red-600">
                        {asset.gainsLosses}
                      </Typography>
                      <Typography variant="small" className="text-red-600">
                        {asset.gainsLossesPercentage}
                      </Typography>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default TaxLossHarvestingTable;
