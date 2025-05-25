// src/components/erc20Generator/Steps/ConfiguredBasicPropertiesStep.tsx
import React from 'react';
import { useERC20Form } from '../hooks/useERC20Form'; // Adjust path if needed
import BasicPropertiesStep from '../Steps/BasicProperties/BasicPropertiesStep'; // The original component

const ConfiguredBasicPropertiesStep: React.FC = () => {
  const {
    tokenName, setTokenName,
    symbol, setSymbol,
    decimals, setDecimals,
    totalSupply, setTotalSupply,
    isMintable, setIsMintable,
    isBurnable, setIsBurnable,
    // Note: Only destructure what BasicPropertiesStep actually needs
  } = useERC20Form();

  return (
    <BasicPropertiesStep
      tokenName={tokenName}
      setTokenName={setTokenName}
      symbol={symbol}
      setSymbol={setSymbol}
      decimals={decimals}
      setDecimals={setDecimals}
      totalSupply={totalSupply}
      setTotalSupply={setTotalSupply}
      isMintable={isMintable}
      setIsMintable={setIsMintable}
      isBurnable={isBurnable}
      setIsBurnable={setIsBurnable}
    />
  );
};

export default ConfiguredBasicPropertiesStep;