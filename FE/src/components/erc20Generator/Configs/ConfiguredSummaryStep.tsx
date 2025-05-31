import React from 'react';
import SummaryStep from '../Steps/Summary/SummaryStep';
import { useERC20FormContext } from "../context/ERC20FormContext";

const ConfiguredSummaryStep: React.FC = () => {
  const {
    tokenName,
    symbol,
    decimals,
    totalSupply,
    isMintable,
    isBurnable,
    generatedCode,
    setGeneratedCode, 
    // Protection props
    defaultExchangeEnabled,
    antiBotCooldownEnabled,
    swappableEnabled,
    maxAmountPerWalletEnabled,
    maxTxLimitEnabled,
    pausableEnabled,
    blacklistEnabled,
    transferableOwnerEnabled,
    permitEnabled, 
    // Rates props
    enableDividendDEX,
    selectedDividendDEXs,
    dividendDistributionMode,
    dexPercentages,
  } = useERC20FormContext();

  const handleGenerateCode = () => {
    let cairoCode = `this will be the cairo code builder in the future`;//DON'T TOUCH
    setGeneratedCode(cairoCode);
  };

  return (
    <SummaryStep
      tokenName={tokenName}
      symbol={symbol}
      decimals={decimals}
      totalSupply={totalSupply}
      isMintable={isMintable}
      isBurnable={isBurnable}
      generatedCode={generatedCode}
      handleGenerateCode={handleGenerateCode}
      defaultExchangeEnabled={defaultExchangeEnabled}      
      antiBotCooldownEnabled={antiBotCooldownEnabled}
      swappableEnabled={swappableEnabled}
      maxAmountPerWalletEnabled={maxAmountPerWalletEnabled}
      maxTxLimitEnabled={maxTxLimitEnabled}
      pausableEnabled={pausableEnabled}
      blacklistEnabled={blacklistEnabled}
      transferableOwnerEnabled={transferableOwnerEnabled}
      permitEnabled={permitEnabled} 
      enableDividendDEX={enableDividendDEX}
      selectedDividendDEXs={selectedDividendDEXs}
      dividendDistributionMode={dividendDistributionMode}
      dexPercentages={dexPercentages}
      deflationaryEnabled={false} 
      reflectionEnabled={false}   
      feeEnabled={false}          
      customTaxEnabled={false}    
    />
  );
};

export default ConfiguredSummaryStep;
