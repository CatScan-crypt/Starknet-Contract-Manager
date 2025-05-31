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
    const requestId = Date.now().toString();
    const userAddress = "01234561789"; // Replace with actual source if available
  
    const json = {
      requestId,
      userAddress,
      properties: {
        tokenName,
        symbol,
        totalSupply,
        decimals,
      },
      methods: {
        isMintable,
        isBurnable
      }
    };
  
    setGeneratedCode(JSON.stringify(json, null, 2));
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
