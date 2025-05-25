import React from 'react';

interface DistributionModeSwitchProps {
  dividendDistributionMode: 'even' | 'custom';
  setDividendDistributionMode: (mode: 'even' | 'custom') => void;
  isSwitchEnabled: boolean; // True if selectedDividendDEXs.length >= 2
}

const DistributionModeSwitch: React.FC<DistributionModeSwitchProps> = ({
  dividendDistributionMode,
  setDividendDistributionMode,
  isSwitchEnabled,
}) => {
  if (!isSwitchEnabled) {
    return null; // Don't render the switch if not enough DEXs are selected
  }

  return (
    <div>
      <div className="flex items-center">
        <span className="text-xs font-medium text-gray-600 mr-4">Distribution Mode:</span>
        <div className="flex items-center space-x-4">
          {(['even', 'custom'] as const).map((mode) => (
            <label key={mode} className="flex items-center text-xs cursor-pointer">
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
    </div>
  );
};

export default DistributionModeSwitch;