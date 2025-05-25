import React from 'react';
import type { StarkNetExchange } from '../../../../constants/erc20Generator.constants'; // Corrected path

interface DexSelectionInputProps {
  currentDEXSelection: string;
  setCurrentDEXSelection: (value: string) => void;
  handleAddDEX: () => void;
  starknetExchanges: StarkNetExchange[];
  selectedDividendDEXs: string[];
}

const DexSelectionInput: React.FC<DexSelectionInputProps> = ({
  currentDEXSelection,
  setCurrentDEXSelection,
  handleAddDEX,
  starknetExchanges,
  selectedDividendDEXs,
}) => {
  return (
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
  );
};

export default DexSelectionInput;