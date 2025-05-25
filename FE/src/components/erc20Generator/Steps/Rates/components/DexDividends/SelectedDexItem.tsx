import React from 'react';
import type { StarkNetExchange } from '../../../../constants/erc20Generator.constants';
import PercentageInput from '../../../../common/PercentageInput';

interface SelectedDexItemProps {
  dexUrl: string;
  starknetExchanges: StarkNetExchange[];
  dexPercentages: Record<string, number>;
  handleRemoveDEX: (dexToRemove: string) => void;
  handlePercentageChange: (dexUrl: string, value: string) => void;
  dividendDistributionMode: 'even' | 'custom';
  isCustomModeEligible: boolean;
  selectedDividendDEXs: string[];
}

const SelectedDexItem: React.FC<SelectedDexItemProps> = ({
  dexUrl,
  starknetExchanges,
  dexPercentages,
  handleRemoveDEX,
  handlePercentageChange,
  dividendDistributionMode,
  isCustomModeEligible,
  selectedDividendDEXs,
}) => {
  const dexName = starknetExchanges.find(dex => dex.url === dexUrl)?.name || dexUrl;
  const currentPercentage = dexPercentages[dexUrl];

  const handleNewPercentageChange = (newValue: number | undefined) => {
    let numericValue = newValue === undefined ? 0 : newValue;

    if (numericValue < 0) numericValue = 0;
    if (numericValue > 100) numericValue = 100;

    if (dividendDistributionMode === 'custom' && selectedDividendDEXs.length === 2) {
      const otherDexUrl = selectedDividendDEXs.find(url => url !== dexUrl);
      if (otherDexUrl) {
        if (numericValue >= 100) {
          handlePercentageChange(dexUrl, "100");
          handlePercentageChange(otherDexUrl, "0");
        } else if (numericValue <= 0) {
          handlePercentageChange(dexUrl, "0");
          handlePercentageChange(otherDexUrl, "100");
        } else {
          const decimals = (0.01).toString().split('.')[1]?.length || 2;
          handlePercentageChange(dexUrl, numericValue.toFixed(decimals));
          handlePercentageChange(otherDexUrl, (100 - numericValue).toFixed(decimals));
        }
      } else {
        const decimals = (0.01).toString().split('.')[1]?.length || 2;
        handlePercentageChange(dexUrl, numericValue.toFixed(decimals));
      }
    } else {
      const decimals = (0.01).toString().split('.')[1]?.length || 2;
      handlePercentageChange(dexUrl, numericValue.toFixed(decimals));
    }
  };

  const step = 0.01;
  const minPercentage = 0;
  const maxPercentage = 100;

  return (
    <li className="p-3 bg-white border border-gray-200 rounded-md shadow-sm flex items-center justify-between">
      <span className="text-sm font-medium text-gray-800">
        {dexName}
      </span>

      <div className="flex items-center ml-4">
        {dividendDistributionMode === 'custom' && isCustomModeEligible && (
          <div className="group flex items-center mr-2 rounded-md focus-within:ring-2 focus-within:ring-indigo-400">
            <PercentageInput
              value={currentPercentage}
              onValueChange={handleNewPercentageChange}
              min={minPercentage}
              max={maxPercentage}
              step={step}
              placeholder="0.00"
              widthClass="w-10"
              ariaLabel={`Percentage for ${dexName}`}
              id={`percentage-${dexUrl}`}
            />
          </div>
        )}
        <button 
          onClick={() => handleRemoveDEX(dexUrl)}
          className="text-red-500 hover:text-red-700 p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </li>
  );
};

export default SelectedDexItem;