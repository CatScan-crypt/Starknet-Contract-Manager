import React from 'react';
import type { StarkNetExchange } from '../../../../constants/erc20Generator.constants';

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

  const finalizePercentage = (inputValue: string) => {
    let value = parseFloat(inputValue);

    if (isNaN(value) || value < 0) {
      value = 0;
    }

    if (dividendDistributionMode === 'custom' && selectedDividendDEXs.length === 2) {
      const otherDexUrl = selectedDividendDEXs.find(url => url !== dexUrl);
      if (otherDexUrl) {
        if (value >= 100) {
          handlePercentageChange(dexUrl, "99");
          handlePercentageChange(otherDexUrl, "1");
        } else {
          handlePercentageChange(dexUrl, value.toString());
          handlePercentageChange(otherDexUrl, (100 - value).toFixed(2)); 
        }
      } else {
        if (value > 100) value = 100;
        handlePercentageChange(dexUrl, value.toString());
      }
    } else {
      if (value > 100) {
        value = 100;
      }
      handlePercentageChange(dexUrl, value.toString());
    }
  };

  const step = 0.01;
  const minPercentage = 0;

  const handleIncrement = () => {
    let currentValue = parseFloat(String(dexPercentages[dexUrl]));
    if (isNaN(currentValue)) currentValue = 0;
    const newValue = parseFloat((currentValue + step).toFixed(2));
    finalizePercentage(newValue.toString());
  };

  const handleDecrement = () => {
    let currentValue = parseFloat(String(dexPercentages[dexUrl]));
    if (isNaN(currentValue)) currentValue = 0;
    let newValue = parseFloat((currentValue - step).toFixed(2));
    if (newValue < minPercentage) newValue = minPercentage;
    finalizePercentage(newValue.toString());
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    finalizePercentage(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      finalizePercentage(event.currentTarget.value);
      event.currentTarget.blur(); 
    }
  };

  return (
    <li className="p-3 bg-white border border-gray-200 rounded-md shadow-sm flex items-center justify-between">
      {/* DEX Name */}
      <span className="text-sm font-medium text-gray-800">
        {dexName}
      </span>

      {/* Group for Input (conditional) and Remove Button */}
      <div className="flex items-center ml-4">
        {dividendDistributionMode === 'custom' && isCustomModeEligible && (
          // --- Custom Percentage Input Field (Number Input + % Symbol + Up/Down Arrows) ---
          <div className="group flex items-center mr-2 rounded-md focus-within:ring-2 focus-within:ring-indigo-400"> 
            <input
              type="text"
              value={currentPercentage === undefined || isNaN(currentPercentage) ? '' : currentPercentage.toString()}
              onChange={(e) => handlePercentageChange(dexUrl, e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder="0.00"
              // Adjust width (e.g., w-8) in className below
              className="w-8 pl-2 text-xs text-gray-700 bg-gray-50 border-t border-b border-l border-gray-300 group-focus-within:border-t-indigo-400 group-focus-within:border-b-indigo-400 group-focus-within:border-l-indigo-400 rounded-l-md focus:outline-none h-[30px] box-border"
            />
            <span className="px-2 text-xs text-gray-700 bg-gray-100 border-t border-b border-gray-300 group-focus-within:border-t-indigo-400 group-focus-within:border-b-indigo-400 flex items-center h-[30px] box-border">
              %
            </span>
            <div className="flex flex-col h-[30px] box-border"> {/* Arrow buttons container */}
              <button 
                onClick={handleIncrement}
                className="px-1 border-t border-r border-gray-300 group-focus-within:border-t-indigo-400 group-focus-within:border-r-indigo-400 rounded-tr-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200 flex items-center justify-center h-1/2 box-border text-gray-600"
                aria-label="Increment percentage"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" /></svg>
              </button>
              <button 
                onClick={handleDecrement}
                className="px-1 border-b border-r border-gray-300 group-focus-within:border-b-indigo-400 group-focus-within:border-r-indigo-400 rounded-br-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200 flex items-center justify-center h-1/2 box-border text-gray-600"
                aria-label="Decrement percentage"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
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