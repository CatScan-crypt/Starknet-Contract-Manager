import React from 'react';
import type { RatesStepProps } from '../../types/erc20Generator.types';
import ToggleCard from '../../../ToggleCard/ToggleCard';
import { starknetExchanges } from '../../constants/erc20Generator.constants';
import { useDexManagement } from '../../hooks/useDexManagement';
import DexSelectionInput from './components/DexDividends/DexSelectionInput';
import SelectedDexItem from './components/DexDividends/SelectedDexItem';
import DistributionModeSwitch from './components/DexDividends/DistributionModeSwitch';
import DividendRate from './components/DexDividends/DividendRate';

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
  const {
    totalCustomPercentage,
    handleAddDEX,
    handleRemoveDEX,
    handlePercentageChange,
  } = useDexManagement({
    enableDividendDEX,
    selectedDividendDEXs,
    setSelectedDividendDEXs,
    currentDEXSelection,
    setCurrentDEXSelection,
    dividendDistributionMode,
    dexPercentages,
    setDexPercentages,
  });

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
          <DexSelectionInput 
            currentDEXSelection={currentDEXSelection}
            setCurrentDEXSelection={setCurrentDEXSelection}
            handleAddDEX={handleAddDEX}
            starknetExchanges={starknetExchanges}
            selectedDividendDEXs={selectedDividendDEXs}
          />

          {selectedDividendDEXs.length > 0 && (
            <div className="mt-3">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-medium text-gray-600">Selected Exchanges:</p>
                <DistributionModeSwitch 
                  dividendDistributionMode={dividendDistributionMode}
                  setDividendDistributionMode={setDividendDistributionMode}
                  isSwitchEnabled={selectedDividendDEXs.length >= 2}
                />
              </div>
              <ul className="space-y-2">
                {selectedDividendDEXs.map(dexUrl => (
                  <SelectedDexItem
                    key={dexUrl}
                    dexUrl={dexUrl}
                    starknetExchanges={starknetExchanges}
                    dexPercentages={dexPercentages}
                    handleRemoveDEX={handleRemoveDEX}
                    handlePercentageChange={handlePercentageChange}
                    dividendDistributionMode={dividendDistributionMode}
                    isCustomModeEligible={selectedDividendDEXs.length >= 2}
                    selectedDividendDEXs={selectedDividendDEXs}
                  />
                ))}
              </ul>
              <DividendRate />
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