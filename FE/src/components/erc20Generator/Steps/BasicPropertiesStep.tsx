import React from 'react';

interface BasicPropertiesStepProps {
  tokenName: string;
  setTokenName: (name: string) => void;
  symbol: string;
  setSymbol: (symbol: string) => void;
  decimals: number | string;
  setDecimals: (decimals: number | string) => void;
  totalSupply: number | string;
  setTotalSupply: (supply: number | string) => void;
  isMintable: boolean;
  setIsMintable: (mintable: boolean) => void;
  isBurnable: boolean;
  setIsBurnable: (burnable: boolean) => void;
}

const BasicPropertiesStep: React.FC<BasicPropertiesStepProps> = ({
  tokenName,
  setTokenName,
  symbol,
  setSymbol,
  decimals,
  setDecimals,
  totalSupply,
  setTotalSupply,
  isMintable,
  setIsMintable,
  isBurnable,
  setIsBurnable,
}) => {
  return (
    <>
      <div className="mb-6">
        <label htmlFor="tokenName" className="block text-sm font-medium text-gray-700 mb-1">
          Token Name:
          <input 
            id="tokenName"
            type="text" 
            value={tokenName} 
            onChange={(e) => setTokenName(e.target.value)} 
            placeholder="e.g., MyStarkToken" 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
      </div>

      <div className="mb-6">
        <label htmlFor="symbol" className="block text-sm font-medium text-gray-700 mb-1">
          Symbol:
          <input 
            id="symbol"
            type="text" 
            value={symbol} 
            onChange={(e) => setSymbol(e.target.value)} 
            placeholder="e.g., MSTK"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
      </div>

      <div className="mb-6">
        <label htmlFor="decimals" className="block text-sm font-medium text-gray-700 mb-1">
          Decimals:
          <input 
            id="decimals"
            type="number" 
            value={decimals} 
            onChange={(e) => setDecimals(e.target.value === '' ? '' : Number(e.target.value))} 
            placeholder="e.g., 18"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
      </div>

      <div className="mb-8">
        <label htmlFor="totalSupply" className="block text-sm font-medium text-gray-700 mb-1">
          Total Supply (Premine):
          <input 
            id="totalSupply"
            type="number" 
            value={totalSupply} 
            onChange={(e) => setTotalSupply(e.target.value === '' ? '' : Number(e.target.value))} 
            placeholder="e.g., 1000000"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
      </div>

      {/* Feature Toggles Start */}
      <div className="mb-6">
        <span className="block text-sm font-medium text-gray-700 mb-3">Features:</span>
        <div className="space-y-3">
          {/* Mintable Feature Card */}
          <div>
            <input
              id="mintableFeatureStep"
              type="checkbox"
              checked={isMintable}
              onChange={(e) => setIsMintable(e.target.checked)}
              className="sr-only peer"
            />
            <label
              htmlFor="mintableFeatureStep"
              className={`
                flex items-center p-4 border rounded-lg cursor-pointer
                transition-colors duration-200 ease-in-out
                hover:border-gray-300 hover:shadow-sm
                peer-checked:bg-indigo-50 peer-checked:border-indigo-500 peer-checked:ring-1 peer-checked:ring-indigo-500
                bg-white border-gray-200
              `}
            >
              <span className={`
                h-5 w-5 border rounded-full flex-shrink-0
                flex items-center justify-center mr-3
                transition-colors duration-200 ease-in-out
                ${isMintable ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 bg-white'}
              `}>
                {isMintable && <span className="h-2.5 w-2.5 bg-white rounded-full"></span>}
              </span>
              <div className="text-sm">
                <span className="font-medium text-gray-800">Mintable</span>
                <p className="text-xs text-gray-500 mt-0.5">
                  Allows new tokens to be created after initial deployment.
                </p>
              </div>
            </label>
          </div>

          {/* Burnable Feature Card */}
          <div>
            <input
              id="burnableFeatureStep"
              type="checkbox"
              checked={isBurnable}
              onChange={(e) => setIsBurnable(e.target.checked)}
              className="sr-only peer"
            />
            <label
              htmlFor="burnableFeatureStep"
              className={`
                flex items-center p-4 border rounded-lg cursor-pointer
                transition-colors duration-200 ease-in-out
                hover:border-gray-300 hover:shadow-sm
                peer-checked:bg-indigo-50 peer-checked:border-indigo-500 peer-checked:ring-1 peer-checked:ring-indigo-500
                bg-white border-gray-200
              `}
            >
              <span className={`
                h-5 w-5 border rounded-full flex-shrink-0
                flex items-center justify-center mr-3
                transition-colors duration-200 ease-in-out
                ${isBurnable ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 bg-white'}
              `}>
                {isBurnable && <span className="h-2.5 w-2.5 bg-white rounded-full"></span>}
              </span>
              <div className="text-sm">
                <span className="font-medium text-gray-800">Burnable</span>
                <p className="text-xs text-gray-500 mt-0.5">
                  Allows tokens to be destroyed, reducing total supply.
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>
      {/* Feature Toggles End */}
    </>
  );
};

export default BasicPropertiesStep;