import React from 'react';

interface TableSortIconProps {
  className?: string;
  fillColor?: string;
  width?: number | string;
  height?: number | string;
}

const TableSortIcon: React.FC<TableSortIconProps> = ({ 
  className = "", 
  fillColor = "#666868",
  width = 8,
  height = 16
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 8 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        opacity="0.5" 
        d="M4.00273 6.61561H2.75183C1.20108 6.61561 0.563914 5.51462 1.34163 4.17001L1.96943 3.08777L2.59722 2.00553C3.37494 0.660919 4.64458 0.660919 5.4223 2.00553L6.0501 3.08777L6.67789 4.17001C7.45561 5.51462 6.81844 6.61561 5.26769 6.61561H4.00273Z" 
        fill={fillColor}
      />
      <path 
        opacity="0.5" 
        d="M4.0168 8.72277L5.2677 8.72277C6.81845 8.72277 7.45562 9.82376 6.6779 11.1684L6.05011 12.2506L5.42231 13.3329C4.64459 14.6775 3.37495 14.6775 2.59723 13.3329L1.96943 12.2506L1.34164 11.1684C0.563924 9.82376 1.20109 8.72277 2.75184 8.72277L4.0168 8.72277Z" 
        fill={fillColor}
      />
    </svg>
  );
};

export default TableSortIcon;
