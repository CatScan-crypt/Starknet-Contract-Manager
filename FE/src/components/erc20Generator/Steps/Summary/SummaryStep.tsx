import React from 'react';
import type { SummaryStepProps } from 'SummaryStepProps';

const SummaryStep: React.FC<SummaryStepProps> = ({
  tokenName,
  symbol,
  decimals,
  totalSupply,
  isMintable,
  isBurnable,
  generatedCode,
  handleGenerateCode,
}) => {
  const allBasicPropertiesSet = tokenName && symbol && decimals !== '' && totalSupply !== '';

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-700">Configuration Summary</h3>
      <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
        <p className="text-gray-700 leading-relaxed">
          Token Name: <span className="font-medium text-gray-900">{tokenName || 'Not set'}</span><br />
          Symbol: <span className="font-medium text-gray-900">{symbol || 'Not set'}</span><br />
          Decimals: <span className="font-medium text-gray-900">{String(decimals) || 'Not set'}</span><br />
          Total Supply: <span className="font-medium text-gray-900">{String(totalSupply) || 'Not set'}</span><br />
          Mintable: <span className="font-medium text-gray-900">{isMintable ? 'Yes' : 'No'}</span><br />
          Burnable: <span className="font-medium text-gray-900">{isBurnable ? 'Yes' : 'No'}</span><br />
          {/* Add summaries for Protection and Rates when implemented */}
        </p>
      </div>
      
      {!allBasicPropertiesSet && (
        <div className="p-3 bg-yellow-50 border border-yellow-300 rounded-md">
          <p className="text-sm text-yellow-700">Warning: Please ensure all basic properties are filled out before generating code.</p>
        </div>
      )}

      <button 
        onClick={handleGenerateCode} 
        disabled={!allBasicPropertiesSet}
        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Generate Code
      </button>

      {generatedCode && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Generated StarkNet Contract Code (Illustrative):</h3>
          <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto text-sm border border-gray-200 shadow-inner whitespace-pre-wrap break-words leading-relaxed">
            {generatedCode}
          </pre>
        </div>
      )}
    </div>
  );
};

export default SummaryStep;