import { useState, useEffect } from 'react';

export const useERC20Form = () => {
  const [tokenName, setTokenName] = useState<string>('');
  const [symbol, setSymbol] = useState<string>('');
  const [decimals, setDecimals] = useState<number | string>(18);
  const [totalSupply, setTotalSupply] = useState<number | string>('');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isMintable, setIsMintable] = useState<boolean>(false);
  const [isBurnable, setIsBurnable] = useState<boolean>(false);

  // Protection Step States
  const [defaultExchangeEnabled, setDefaultExchangeEnabled] = useState<boolean>(false);
  const [antiBotCooldownEnabled, setAntiBotCooldownEnabled] = useState<boolean>(false);
  const [swappableEnabled, setSwappableEnabled] = useState<boolean>(false);
  const [maxAmountPerWalletEnabled, setMaxAmountPerWalletEnabled] = useState<boolean>(false);
  const [maxTxLimitEnabled, setMaxTxLimitEnabled] = useState<boolean>(false);
  const [pausableEnabled, setPausableEnabled] = useState<boolean>(false);
  const [blacklistEnabled, setBlacklistEnabled] = useState<boolean>(false);
  const [transferableOwnerEnabled, setTransferableOwnerEnabled] = useState<boolean>(false);
  const [permitEnabled, setPermitEnabled] = useState<boolean>(false);

  // Rates Step States
  const [enableDividendDEX, setEnableDividendDEX] = useState<boolean>(false);
  const [selectedDividendDEXs, setSelectedDividendDEXs] = useState<string[]>([]);
  const [currentDEXSelection, setCurrentDEXSelection] = useState<string>('');
  const [dividendDistributionMode, setDividendDistributionMode] = useState<'even' | 'custom'>('even');
  const [dexPercentages, setDexPercentages] = useState<Record<string, number>>({});

  // Effect from ERC20Generator related to dividend distribution mode
  useEffect(() => {
    if (selectedDividendDEXs.length < 2 && dividendDistributionMode === 'custom') {
      setDividendDistributionMode('even');
    }
  }, [selectedDividendDEXs, dividendDistributionMode]);

  return {
    tokenName, setTokenName,
    symbol, setSymbol,
    decimals, setDecimals,
    totalSupply, setTotalSupply,
    generatedCode, setGeneratedCode,
    isMintable, setIsMintable,
    isBurnable, setIsBurnable,
    defaultExchangeEnabled, setDefaultExchangeEnabled,
    antiBotCooldownEnabled, setAntiBotCooldownEnabled,
    swappableEnabled, setSwappableEnabled,
    maxAmountPerWalletEnabled, setMaxAmountPerWalletEnabled,
    maxTxLimitEnabled, setMaxTxLimitEnabled,
    pausableEnabled, setPausableEnabled,
    blacklistEnabled, setBlacklistEnabled,
    transferableOwnerEnabled, setTransferableOwnerEnabled,
    permitEnabled, setPermitEnabled,
    enableDividendDEX, setEnableDividendDEX,
    selectedDividendDEXs, setSelectedDividendDEXs,
    currentDEXSelection, setCurrentDEXSelection,
    dividendDistributionMode, setDividendDistributionMode,
    dexPercentages, setDexPercentages,
  };
};