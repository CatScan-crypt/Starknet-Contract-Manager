import React, { useEffect, useState } from 'react';

interface RatesStepProps {
  enableDividendDEX: boolean;
  setEnableDividendDEX: (enabled: boolean) => void;
  selectedDividendDEXs: string[];
  setSelectedDividendDEXs: (dexs: string[]) => void;
  currentDEXSelection: string;
  setCurrentDEXSelection: (dex: string) => void;
  dividendDistributionMode: 'even' | 'custom';
  setDividendDistributionMode: (mode: 'even' | 'custom') => void;
  dexPercentages: Record<string, number>;
  setDexPercentages: (percentages: Record<string, number>) => void;
}

interface ToggleCardProps {
  id: string;
  title: string;
  description: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleCard: React.FC<ToggleCardProps> = ({ id, title, description, isChecked, onChange }) => {
  return (
    <div>
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <label
        htmlFor={id}
        className={`
          flex items-start p-4 border rounded-lg cursor-pointer
          transition-colors duration-200 ease-in-out bg-white border-gray-300
          hover:border-gray-400 hover:shadow-sm
          peer-checked:bg-indigo-50 peer-checked:border-indigo-500 peer-checked:ring-1 peer-checked:ring-indigo-500
        `}
      >
        <span className={`
          h-5 w-5 border rounded-full flex-shrink-0
          flex items-center justify-center mr-4 mt-1
          transition-colors duration-200 ease-in-out
          ${isChecked ? 'bg-indigo-600 border-indigo-600' : 'border-gray-400 bg-white'}
        `}>
          {isChecked && <span className="h-2.5 w-2.5 bg-white rounded-full"></span>}
        </span>
        <div className="text-sm flex-grow">
          <span className="font-medium text-gray-800">{title}</span>
          <p className="text-xs text-gray-500 mt-1">
            {description}
          </p>
        </div>
      </label>
    </div>
  );
};

const starknetExchanges = [
  { id: 'myswap', name: 'mySwap', url: 'app.myswap.xyz' },
  { id: 'ekubo', name: 'Ekubo', url: 'app.ekubo.org' },
  // Add more exchanges here if needed
];

const RatesStep: React.FC<RatesStepProps> = ({
  enableDividendDEX,
  setEnableDividendDEX,
  selectedDividendDEXs,
  setSelectedDividendDEXs,
  currentDEXSelection,
  setCurrentDEXSelection,
  dividendDistributionMode,
  setDividendDistributionMode,
  dexPercentages,
  setDexPercentages,
}) => {

  const [totalCustomPercentage, setTotalCustomPercentage] = useState(0);

  const handleAddDEX = () => {
    if (currentDEXSelection && !selectedDividendDEXs.includes(currentDEXSelection)) {
      setSelectedDividendDEXs([...selectedDividendDEXs, currentDEXSelection]);
      setCurrentDEXSelection(''); // Reset dropdown after adding
    }
  };

  const handleRemoveDEX = (dexToRemove: string) => {
    setSelectedDividendDEXs(selectedDividendDEXs.filter(dex => dex !== dexToRemove));
  };

  // Effect to initialize/update dexPercentages when selectedDEXs or mode changes
  useEffect(() => {
    if (!enableDividendDEX) {
      setDexPercentages({});
      return;
    }

    const newPercentages: Record<string, number> = {};
    const numDEXs = selectedDividendDEXs.length;

    if (numDEXs === 0) {
      setDexPercentages({});
      return;
    }

    if (dividendDistributionMode === 'even' || numDEXs < 2) {
      const evenPercentage = parseFloat((100 / numDEXs).toFixed(2));
      let sum = 0;
      selectedDividendDEXs.forEach((dex, index) => {
        if (index < numDEXs - 1) {
          newPercentages[dex] = evenPercentage;
          sum += evenPercentage;
        } else {
          // Adjust last one to ensure total is 100 due to potential floating point issues
          newPercentages[dex] = parseFloat((100 - sum).toFixed(2));
        }
      });
    } else { // Custom mode and numDEXs >= 2
      // Preserve existing custom percentages if possible, or initialize to even
      let currentTotal = 0;
      selectedDividendDEXs.forEach(dex => {
        const existingPercentage = dexPercentages[dex];
        if (typeof existingPercentage === 'number' && !isNaN(existingPercentage)) {
          newPercentages[dex] = existingPercentage;
          currentTotal += existingPercentage;
        } else {
          // If a new DEX is added in custom mode, initialize its share for now
          // This might need more sophisticated handling if we want to auto-adjust others
          newPercentages[dex] = 0; // Or distribute remaining from 100 if logic allows
        }
      });
      // If a DEX was removed, or if the total is off, re-distribute evenly as a base
      // This part can be complex. For now, if a DEX is removed, custom percentages might need manual readjustment by user.
      // Or, if total is not 100, we might default to even distribution for the current set.
      const allDEXsHavePercentage = selectedDividendDEXs.every(dex => typeof newPercentages[dex] === 'number');
      if (!allDEXsHavePercentage || Object.keys(newPercentages).length !== numDEXs) {
        const evenPercentage = parseFloat((100 / numDEXs).toFixed(2));
        let sum = 0;
        selectedDividendDEXs.forEach((dex, index) => {
          if (index < numDEXs - 1) {
            newPercentages[dex] = evenPercentage;
            sum += evenPercentage;
          } else {
            newPercentages[dex] = parseFloat((100 - sum).toFixed(2));
          }
        });
      }
    }
    setDexPercentages(newPercentages);
  }, [enableDividendDEX, selectedDividendDEXs, dividendDistributionMode, setDexPercentages]);

  // Effect to calculate total custom percentage for display/warning
  useEffect(() => {
    if (dividendDistributionMode === 'custom' && selectedDividendDEXs.length > 0) {
      const total = selectedDividendDEXs.reduce((acc, dex) => acc + (dexPercentages[dex] || 0), 0);
      setTotalCustomPercentage(parseFloat(total.toFixed(2)));
    }
  }, [dexPercentages, dividendDistributionMode, selectedDividendDEXs]);

  const handlePercentageChange = (dexUrl: string, value: string) => {
    const percentage = parseFloat(value);
    if (isNaN(percentage) && value !== "" && value !== "-") return; // Allow empty or negative sign temporarily

    let newDEXPercentages = { ...dexPercentages };

    if (value === "" || (percentage >=0 && percentage <=100) ) {
        newDEXPercentages[dexUrl] = value === "" ? 0 : percentage; // Store 0 for empty string for calculation
    }
    
    // If exactly 2 DEXs, auto-adjust the other
    if (selectedDividendDEXs.length === 2) {
      const otherDEX = selectedDividendDEXs.find(d => d !== dexUrl);
      if (otherDEX) {
        const currentVal = value === "" ? 0 : (isNaN(percentage) ? (newDEXPercentages[dexUrl] || 0) : percentage) ;
        let otherVal = 100 - currentVal;
        if (otherVal < 0) otherVal = 0;
        if (otherVal > 100) otherVal = 100;
        newDEXPercentages[otherDEX] = parseFloat(otherVal.toFixed(2));
        // If current input makes otherVal invalid, cap current input
        if (currentVal + otherVal > 100 && currentVal > 0) {
            newDEXPercentages[dexUrl] = parseFloat((100 - otherVal).toFixed(2));
        }
      }
    }
    setDexPercentages(newDEXPercentages);
  };

  return (
    <div className="space-y-6">
      <ToggleCard 
        id="enableDividendDEX"
        title="Enable Dividend DEX Rewards"
        description="Distribute a portion of transaction fees as dividends to token holders through selected StarkNet Decentralized Exchanges."
        isChecked={enableDividendDEX}
        onChange={setEnableDividendDEX}
      />

      {enableDividendDEX && (
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Configure Dividend DEXs</h3>
          <div className="flex items-center space-x-2">
            <select 
              value={currentDEXSelection}
              onChange={(e) => setCurrentDEXSelection(e.target.value)}
              className="block w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select an exchange...</option>
              {starknetExchanges.map(dex => (
                <option key={dex.id} value={dex.url}>
                  {dex.name} ({dex.url})
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddDEX}
              disabled={!currentDEXSelection || selectedDividendDEXs.includes(currentDEXSelection)}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>

          {selectedDividendDEXs.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-medium text-gray-600 mb-2">Selected Exchanges:</p>
              <ul className="space-y-2">
                {selectedDividendDEXs.map(dexUrl => (
                  <li key={dexUrl} className="p-3 bg-white border border-gray-200 rounded-md shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-800">
                        {starknetExchanges.find(d => d.url === dexUrl)?.name || dexUrl}
                      </span>
                      <button 
                        onClick={() => handleRemoveDEX(dexUrl)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    {dividendDistributionMode === 'custom' && selectedDividendDEXs.length >= 2 && (
                      <div className="mt-2">
                        <input 
                          type="number"
                          value={dexPercentages[dexUrl] === undefined || isNaN(dexPercentages[dexUrl]) ? '' : dexPercentages[dexUrl]} // Handle undefined/NaN for input display
                          onChange={(e) => handlePercentageChange(dexUrl, e.target.value)}
                          onBlur={(e) => { // Final validation on blur
                            let val = parseFloat(e.target.value);
                            if (isNaN(val) || val < 0) val = 0;
                            if (val > 100) val = 100;
                            handlePercentageChange(dexUrl, val.toString());
                          }}
                          min="0"
                          max="100"
                          step="0.01"
                          className="w-full px-2 py-1 text-xs border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="0.00"
                        />
                      </div>
                    )}
                    {dividendDistributionMode === 'even' && selectedDividendDEXs.length >= 1 && (
                         <p className="text-xs text-gray-500 mt-1">Share: {typeof dexPercentages[dexUrl] === 'number' ? dexPercentages[dexUrl].toFixed(2) : 'N/A'}%</p>
                    )}
                  </li>
                ))}
              </ul>
              {/* Distribution Mode Radio Buttons */}
              {selectedDividendDEXs.length >= 2 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs font-medium text-gray-600 mb-2">Distribution Mode:</p>
                  <div className="flex items-center space-x-4">
                    {(['even', 'custom'] as const).map((mode) => (
                      <label key={mode} className="flex items-center text-xs">
                        <input 
                          type="radio"
                          name="distributionMode"
                          value={mode}
                          checked={dividendDistributionMode === mode}
                          onChange={() => setDividendDistributionMode(mode)}
                          className="form-radio h-3 w-3 text-indigo-600 transition duration-150 ease-in-out"
                        />
                        <span className="ml-2 text-gray-700">{mode.charAt(0).toUpperCase() + mode.slice(1)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Total Percentage Warning for Custom Mode with >2 DEXs */}
              {dividendDistributionMode === 'custom' && selectedDividendDEXs.length > 2 && totalCustomPercentage !== 100 && (
                <p className="mt-3 text-xs text-red-600 bg-red-50 p-2 rounded-md">
                  Warning: Custom percentages sum to {totalCustomPercentage.toFixed(2)}%. Please ensure the total is 100%.
                </p>
              )}
               {dividendDistributionMode === 'custom' && selectedDividendDEXs.length > 0 && (
                 <p className="mt-2 text-xs text-gray-500">
                    Total Allocated: <span className={`font-semibold ${totalCustomPercentage === 100 ? 'text-green-600' : 'text-red-600'}`}>{totalCustomPercentage.toFixed(2)}%</span>
                 </p>
               )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RatesStep;