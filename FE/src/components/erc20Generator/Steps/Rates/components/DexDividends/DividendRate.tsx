import React, { useState } from 'react';
import PercentageInput from './common/PercentageInput';

interface DividendRateProps {
  // Define any props if needed, e.g., for passing data up
}

const DividendRate: React.FC<DividendRateProps> = () => {
  const [buyTaxEnabled, setBuyTaxEnabled] = useState(false);
  const [sellTaxEnabled, setSellTaxEnabled] = useState(true); // Default to checked
  const [transferTaxEnabled, setTransferTaxEnabled] = useState(false);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  // State for the percentage values
  const [buyTaxPercentage, setBuyTaxPercentage] = useState<number | undefined>(undefined);
  const [sellTaxPercentage, setSellTaxPercentage] = useState<number | undefined>(1); // Default to 1% if enabled
  const [transferTaxPercentage, setTransferTaxPercentage] = useState<number | undefined>(undefined);

  const handleCheckboxChange = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    currentValue: boolean,
    isTryingToUncheck: boolean
  ) => {
    const currentlyCheckedCount =
      (buyTaxEnabled ? 1 : 0) +
      (sellTaxEnabled ? 1 : 0) +
      (transferTaxEnabled ? 1 : 0);

    if (isTryingToUncheck && currentlyCheckedCount === 1) {
      setWarningMessage('Minimum is one rate, check another box to uncheck this box.');
      return; // Prevent unchecking
    }

    setter(!currentValue);
    setWarningMessage(null); // Clear warning if action is valid
  };

  // Handlers for PercentageInput components
  const handleBuyTaxPercentageChange = (value: number | undefined) => {
    setBuyTaxPercentage(value);
  };

  const handleSellTaxPercentageChange = (value: number | undefined) => {
    setSellTaxPercentage(value);
  };

  const handleTransferTaxPercentageChange = (value: number | undefined) => {
    setTransferTaxPercentage(value);
  };

  return (
    <div className="space-y-6 p-4 bg-gray-800 rounded-lg shadow-md mt-4">
      <div className="flex justify-between items-center mb-4 min-h-[36px]">
        <h3 className="text-xl font-semibold text-white">Dividend Tax Rates</h3>
        {warningMessage ? (
          <div className="p-2 text-xs text-yellow-300 bg-yellow-800 border border-yellow-700 rounded-md ml-4" role="alert">
            {warningMessage}
          </div>
        ) : (
          <div className="p-2 text-xs ml-4">&nbsp;</div>
        )}
      </div>

      <div className="space-y-4">
        {/* Buy Tax Rate */}
        <div className="flex items-start p-3 bg-gray-700 rounded-md">
          <div className="flex items-center h-5">
            <input
              id="buy-tax-rate"
              name="buy-tax-rate"
              type="checkbox"
              checked={buyTaxEnabled}
              onChange={() => handleCheckboxChange(setBuyTaxEnabled, buyTaxEnabled, buyTaxEnabled)}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-500 rounded bg-gray-800"
            />
          </div>
          <div className="ml-3 text-sm flex-grow flex justify-between items-center">
            <div>
              <label htmlFor="buy-tax-rate" className="font-medium text-gray-200">
                Buy tax rate
              </label>
              <p className="text-gray-400 text-xs mt-1">
                Specify the exact rate of tax to be charged on buys.
              </p>
            </div>
            {buyTaxEnabled && (
              <div className="ml-4">
                <PercentageInput
                  value={buyTaxPercentage}
                  onValueChange={handleBuyTaxPercentageChange}
                  min={0}
                  max={100} // Or a more practical max like 25?
                  step={0.01}
                  placeholder="0.00"
                  widthClass="w-12"
                  ariaLabel="Buy tax percentage"
                  id="buy-tax-percentage"
                />
              </div>
            )}
          </div>
        </div>

        {/* Sell Tax Rate */}
        <div className="flex items-start p-3 bg-gray-700 rounded-md">
          <div className="flex items-center h-5">
            <input
              id="sell-tax-rate"
              name="sell-tax-rate"
              type="checkbox"
              checked={sellTaxEnabled}
              onChange={() => handleCheckboxChange(setSellTaxEnabled, sellTaxEnabled, sellTaxEnabled)}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-500 rounded bg-gray-800"
            />
          </div>
          <div className="ml-3 text-sm flex-grow flex justify-between items-center">
            <div>
              <label htmlFor="sell-tax-rate" className="font-medium text-gray-200">
                Sell tax rate
              </label>
              <p className="text-gray-400 text-xs mt-1">
                Specify the exact rate of tax to be charged on sells.
              </p>
            </div>
            {sellTaxEnabled && (
              <div className="ml-4">
                <PercentageInput
                  value={sellTaxPercentage}
                  onValueChange={handleSellTaxPercentageChange}
                  min={0}
                  max={100} // Or a more practical max like 25?
                  step={0.01}
                  placeholder="0.00"
                  widthClass="w-12"
                  ariaLabel="Sell tax percentage"
                  id="sell-tax-percentage"
                />
              </div>
            )}
          </div>
        </div>

        {/* Transfer Tax Rate */}
        <div className="flex items-start p-3 bg-gray-700 rounded-md">
          <div className="flex items-center h-5">
            <input
              id="transfer-tax-rate"
              name="transfer-tax-rate"
              type="checkbox"
              checked={transferTaxEnabled}
              onChange={() => handleCheckboxChange(setTransferTaxEnabled, transferTaxEnabled, transferTaxEnabled)}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-500 rounded bg-gray-800"
            />
          </div>
          <div className="ml-3 text-sm flex-grow flex justify-between items-center">
            <div>
              <label htmlFor="transfer-tax-rate" className="font-medium text-gray-200">
                Transfer tax rate
              </label>
              <p className="text-gray-400 text-xs mt-1">
                Specify the exact rate of tax to be charged on transfers (other types of transactions).
              </p>
            </div>
            {transferTaxEnabled && (
              <div className="ml-4">
                <PercentageInput
                  value={transferTaxPercentage}
                  onValueChange={handleTransferTaxPercentageChange}
                  min={0}
                  max={100} // Or a more practical max
                  step={0.01}
                  placeholder="0.00"
                  widthClass="w-12"
                  ariaLabel="Transfer tax percentage"
                  id="transfer-tax-percentage"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DividendRate;