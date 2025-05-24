import React from 'react';
import { useERC20Form } from '../hooks/useERC20Form';
import SummaryStep from '../Steps/SummaryStep';

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
  } = useERC20Form();

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
    />
  );
};

export default ConfiguredSummaryStep;
