import React from 'react';
import type { BasicPropertiesStepProps } from '../../types/erc20Generator.types';
import NameInput from './components/NameInput';
import SymbolInput from './components/SymbolInput';
import NumericPropertyInput from './components/TotalSupplyInput';
import FeatureToggle from './components/FeatureToggle';

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
      <NameInput value={tokenName} onChange={setTokenName} />
      <SymbolInput value={symbol} onChange={setSymbol} />
      <NumericPropertyInput 
        id="decimals"
        label="Decimals:"
        value={decimals}
        onChange={setDecimals}
        placeholder="e.g., 18"
      />
      <NumericPropertyInput 
        id="totalSupply"
        label="Total Supply (Premine):"
        value={totalSupply}
        onChange={setTotalSupply}
        placeholder="e.g., 1000000"
        className="mb-8" 
      />

      {/* Feature Toggles Start */}
      <div className="mb-6">
        <span className="block text-sm font-medium text-gray-700 mb-3">Features:</span>
        <div className="space-y-3">
          <FeatureToggle 
            id="mintableFeatureStep"
            title="Mintable"
            description="Allows new tokens to be created after initial deployment."
            isChecked={isMintable}
            onChange={setIsMintable}
          />
          <FeatureToggle 
            id="burnableFeatureStep"
            title="Burnable"
            description="Allows tokens to be destroyed, reducing total supply."
            isChecked={isBurnable}
            onChange={setIsBurnable}
          />
        </div>
      </div>
      {/* Feature Toggles End */}
    </>
  );
};

export default BasicPropertiesStep;