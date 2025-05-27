import React from 'react';
import Select from 'react-select';
import type { StarkNetExchange } from 'starknetExchanges';

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
  // Map exchanges to react-select format
  const options = starknetExchanges.map(dex => ({
    value: dex.url,
    label: dex.name,
    url: dex.url,
    isDisabled: selectedDividendDEXs.includes(dex.url),
  }));

  // Find the currently selected option
  const selectedOption = options.find(opt => opt.value === currentDEXSelection) || null;

  // Placeholder logic
  const placeholder = selectedDividendDEXs.length === 0 ? 'Select an exchange...' : 'Add an additional exchange.';

  return (
    <div className="flex items-center space-x-2">
      <div className="w-full">
        <Select
          options={options}
          value={selectedOption}
          onChange={option => setCurrentDEXSelection(option ? option.value : '')}
          placeholder={placeholder}
          isOptionDisabled={option => option.isDisabled}
          isClearable
          components={{
            Option: (props) => {
              const { data, innerProps, isDisabled } = props;
              return (
                <div
                  {...innerProps}
                  className={`flex items-center px-3 py-2 cursor-pointer ${isDisabled ? 'opacity-50' : ''}`}
                >
                  <span className="flex items-center gap-1">
                    {data.label}
                    <a
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()} // Prevent select from closing when clicking icon
                      className="text-gray-500 hover:text-indigo-600"
                      tabIndex={-1}
                    >
                      {/* External link SVG icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7m0 0v7m0-7L10 14m-4 0v7a2 2 0 002 2h7a2 2 0 002-2v-7" />
                      </svg>
                    </a>
                  </span>
                </div>
              );
            }
          }}
        />
      </div>
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