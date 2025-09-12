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

interface TaxLossHarvestingTableProps {
  isDarkMode?: boolean;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string) => void;
}

const TaxLossHarvestingTable: React.FC<TaxLossHarvestingTableProps> = ({
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
    <Card className="h-full w-full border-transparent bg-transprent shadow-none">
      <CardBody className="px-0 rounded-lg sm:overflow-x-auto">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max table-auto text-left"
            role="table" 
            aria-label="Tax loss harvesting cryptocurrency holdings">
            <thead className="bg-table-header dark:bg-gray-800 hidden sm:table-header-group">
              <tr role="row">
                {tableHeaders.map(({ key, label }) => (
                  <th 
                    key={key}
                    className={`cursor-pointer p-6 ${
                      key === 'asset' ? "rounded-l-xl" : ""
                    } ${
                      key === 'gainsLosses' ? "rounded-r-xl" : ""
                    }`}
                    role="columnheader"
                    scope="col"
                    onClick={() => onSort(key)}
                  >
                    <div className="flex items-center space-x-2">
                      <Typography variant="small" className={`font-normal text-gray-600 
                        dark:text-gray-300`}>
                        {label}
                      </Typography>
                      { key !== 'asset' && getSortIcon(key)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {taxLossHarvestingAssets.map((asset) => (
                <tr 
                  key={asset.id}
                  role="row"
                >
                  {/* Asset */}
                  <td className="px-6 py-4" role="cell">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={asset.logo} 
                        alt={`${asset.name} logo`}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex items-center">
                        <Typography variant="small" className={`text-base text-primary dark:text-white`}>
                          {asset.name}
                        </Typography>
                      </div>
                    </div>
                  </td>

                  {/* Amount Held */}
                  <td className="px-6 py-4" role="cell">
                    <Typography variant="small" className={`text-base text-primary dark:text-white`}>
                      {asset.amountHeld}
                    </Typography>
                  </td>

                  {/* Potential Loss */}
                  <td className="px-6 py-4" role="cell">
                    <Typography variant="small" className="text-base text-error-500">
                      {asset.potentialLoss}
                    </Typography>
                  </td>

                  {/* Cost Basis */}
                  <td className="px-6 py-4" role="cell">
                    <Typography variant="small" className={`text-base text-primary dark:text-white`}>
                      {asset.costBasis}
                    </Typography>
                  </td>

                  {/* Market Value */}
                  <td className="px-6 py-4" role="cell">
                    <Typography variant="small" className={`text-base text-primary dark:text-white`}>
                      {asset.marketValue}
                    </Typography>
                  </td>

                  {/* Gains/Losses */}
                  <td className="px-6 py-4" role="cell">
                    <div>
                      <Typography variant="small" className="font-base text-error-500">
                        {asset.gainsLosses} ({asset.gainsLossesPercentage})
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
