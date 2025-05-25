export interface BasicPropertiesStepProps {
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

export interface ProtectionStepProps {
  defaultExchangeEnabled: boolean;
  setDefaultExchangeEnabled: (enabled: boolean) => void;
  antiBotCooldownEnabled: boolean;
  setAntiBotCooldownEnabled: (enabled: boolean) => void;
  swappableEnabled: boolean;
  setSwappableEnabled: (enabled: boolean) => void;
  maxAmountPerWalletEnabled: boolean;
  setMaxAmountPerWalletEnabled: (enabled: boolean) => void;
  maxTxLimitEnabled: boolean;
  setMaxTxLimitEnabled: (enabled: boolean) => void;
  pausableEnabled: boolean;
  setPausableEnabled: (enabled: boolean) => void;
  blacklistEnabled: boolean;
  setBlacklistEnabled: (enabled: boolean) => void;
  transferableOwnerEnabled: boolean;
  setTransferableOwnerEnabled: (enabled: boolean) => void;
  permitEnabled: boolean;
  setPermitEnabled: (enabled: boolean) => void;
}

export interface RatesStepProps {
  enableDividendDEX: boolean;
  setEnableDividendDEX: (enabled: boolean) => void;
  selectedDividendDEXs: string[];
  setSelectedDividendDEXs: (dexs: string[]) => void;
  currentDEXSelection: string;
  setCurrentDEXSelection: (dex: string) => void;
  dividendDistributionMode: 'even' | 'custom';
  setDividendDistributionMode: (mode: 'even' | 'custom') => void;
  dexPercentages: Record<string, number>;
  setDexPercentages: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

export interface SummaryStepProps {
  tokenName: string;
  symbol: string;
  decimals: number | string;
  totalSupply: number | string;
  isMintable: boolean;
  isBurnable: boolean;
  generatedCode: string;
  handleGenerateCode: () => void;
  // Protection features for summary
  defaultExchangeEnabled: boolean;
  antiBotCooldownEnabled: boolean;
  swappableEnabled: boolean;
  maxAmountPerWalletEnabled: boolean;
  maxTxLimitEnabled: boolean;
  pausableEnabled: boolean;
  blacklistEnabled: boolean;
  transferableOwnerEnabled: boolean;
  permitEnabled: boolean;
  // Rates features for summary
  enableDividendDEX: boolean;
  selectedDividendDEXs: string[];
  dividendDistributionMode: 'even' | 'custom';
  dexPercentages: Record<string, number>;
}

// It might also be good to have a comprehensive type for all form data
export interface ERC20FormData {
  // Basic Properties
  tokenName: string;
  symbol: string;
  decimals: number | string;
  totalSupply: number | string;
  isMintable: boolean;
  isBurnable: boolean;
  // Protection
  defaultExchangeEnabled: boolean;
  antiBotCooldownEnabled: boolean;
  swappableEnabled: boolean;
  maxAmountPerWalletEnabled: boolean;
  maxTxLimitEnabled: boolean;
  pausableEnabled: boolean;
  blacklistEnabled: boolean;
  transferableOwnerEnabled: boolean;
  permitEnabled: boolean;
  // Rates
  enableDividendDEX: boolean;
  selectedDividendDEXs: string[];
  currentDEXSelection: string; // This might be more UI state than form data
  dividendDistributionMode: 'even' | 'custom';
  dexPercentages: Record<string, number>;
  generatedCode: string; // For storing the final generated code
}