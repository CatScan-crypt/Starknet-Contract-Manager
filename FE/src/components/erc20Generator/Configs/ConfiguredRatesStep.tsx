import React from 'react';
import { useERC20Form } from '../hooks/useERC20Form';
import RatesStep from '../Steps/RatesStep';

const ConfiguredRatesStep: React.FC = () => {
  const {
    enableDividendDEX, setEnableDividendDEX,
    selectedDividendDEXs, setSelectedDividendDEXs,
    currentDEXSelection, setCurrentDEXSelection,
    dividendDistributionMode, setDividendDistributionMode,
    dexPercentages, setDexPercentages,
  } = useERC20Form();

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
