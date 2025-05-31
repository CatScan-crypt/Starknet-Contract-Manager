import React from 'react';
import RatesStep from '../Steps/Rates/RatesStep';
import { useERC20FormContext } from "../context/ERC20FormContext";

const ConfiguredRatesStep: React.FC = () => {
  const {
    enableDividendDEX, setEnableDividendDEX,
    selectedDividendDEXs, setSelectedDividendDEXs,
    currentDEXSelection, setCurrentDEXSelection,
    dividendDistributionMode, setDividendDistributionMode,
    dexPercentages, setDexPercentages,
  } = useERC20FormContext();

  return (
    <RatesStep
      enableDividendDEX={enableDividendDEX}
      setEnableDividendDEX={setEnableDividendDEX}
      selectedDividendDEXs={selectedDividendDEXs}
      setSelectedDividendDEXs={setSelectedDividendDEXs}
      currentDEXSelection={currentDEXSelection}
      setCurrentDEXSelection={setCurrentDEXSelection}
      dividendDistributionMode={dividendDistributionMode}
      setDividendDistributionMode={setDividendDistributionMode}
      dexPercentages={dexPercentages}
      setDexPercentages={setDexPercentages}
    />
  );
};

export default ConfiguredRatesStep;
