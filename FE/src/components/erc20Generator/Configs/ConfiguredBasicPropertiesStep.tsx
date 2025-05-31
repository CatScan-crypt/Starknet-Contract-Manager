// src/components/erc20Generator/Steps/ConfiguredBasicPropertiesStep.tsx
import React from 'react';
import BasicPropertiesStep from 'BasicPropertiesStep'; // The original component
import { useERC20FormContext } from "../context/ERC20FormContext";

const ConfiguredBasicPropertiesStep: React.FC = () => {
  const {
    tokenName, setTokenName,
    symbol, setSymbol,
    decimals, setDecimals,
    totalSupply, setTotalSupply,
    isMintable, setIsMintable,
    isBurnable, setIsBurnable,
    // Note: Only destructure what BasicPropertiesStep actually needs
  } = useERC20FormContext();

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