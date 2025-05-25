import { useState, useEffect, useCallback } from 'react';

export interface UseDexManagementProps {
  enableDividendDEX: boolean;
  selectedDividendDEXs: string[];
  setSelectedDividendDEXs: (dexs: string[]) => void;
  currentDEXSelection: string;
  setCurrentDEXSelection: (dex: string) => void;
  dividendDistributionMode: 'even' | 'custom';
  dexPercentages: Record<string, number>;
  setDexPercentages: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

export const useDexManagement = ({
  enableDividendDEX,
  selectedDividendDEXs,
  setSelectedDividendDEXs,
  currentDEXSelection,
  setCurrentDEXSelection,
  dividendDistributionMode,
  dexPercentages,
  setDexPercentages,
}: UseDexManagementProps) => {
  const [totalCustomPercentage, setTotalCustomPercentage] = useState(0);

  const handleAddDEX = useCallback(() => {
    if (currentDEXSelection && !selectedDividendDEXs.includes(currentDEXSelection)) {
      setSelectedDividendDEXs([...selectedDividendDEXs, currentDEXSelection]);
      setCurrentDEXSelection(''); // Reset dropdown after adding
    }
  }, [currentDEXSelection, selectedDividendDEXs, setSelectedDividendDEXs, setCurrentDEXSelection]);

  const handleRemoveDEX = useCallback((dexToRemove: string) => {
    setSelectedDividendDEXs(selectedDividendDEXs.filter(dex => dex !== dexToRemove));
    // Also remove its percentage
    setDexPercentages(prev => {
      const newPercentages = { ...prev };
      delete newPercentages[dexToRemove];
      return newPercentages;
    });
  }, [selectedDividendDEXs, setSelectedDividendDEXs, setDexPercentages]);

  // Effect to initialize/update dexPercentages when selectedDEXs or mode changes
  useEffect(() => {
    if (!enableDividendDEX) {
      return;
    }

    const newPercentages: Record<string, number> = {};
    const numDEXs = selectedDividendDEXs.length;

    if (numDEXs === 0) {
      setDexPercentages({});
      return;
    }

    if (dividendDistributionMode === 'even' || numDEXs < 2) {
      const evenPercentage = parseFloat((100 / numDEXs).toFixed(2));
      let sum = 0;
      selectedDividendDEXs.forEach((dex, index) => {
        if (index < numDEXs - 1) {
          newPercentages[dex] = evenPercentage;
          sum += evenPercentage;
        } else {
          newPercentages[dex] = parseFloat((100 - sum).toFixed(2));
        }
      });
    } else { // Custom mode and numDEXs >= 2
      let currentTotal = 0;
      selectedDividendDEXs.forEach(dex => {
        const existingPercentage = dexPercentages[dex];
        if (typeof existingPercentage === 'number' && !isNaN(existingPercentage)) {
          newPercentages[dex] = existingPercentage;
          currentTotal += existingPercentage;
        } else {
          newPercentages[dex] = 0; 
        }
      });
    }
    setDexPercentages(newPercentages);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableDividendDEX, selectedDividendDEXs, dividendDistributionMode, setDexPercentages
 ]);

  // Effect to calculate total custom percentage for display/warning
  useEffect(() => {
    if (dividendDistributionMode === 'custom' && selectedDividendDEXs.length > 0) {
      const total = selectedDividendDEXs.reduce((acc, dex) => acc + (dexPercentages[dex] || 0), 0);
      setTotalCustomPercentage(parseFloat(total.toFixed(2)));
    } else {
      setTotalCustomPercentage(0); // Reset if not in custom mode or no DEXs
    }
  }, [selectedDividendDEXs, dexPercentages, dividendDistributionMode]);

  const handlePercentageChange = useCallback((dexUrl: string, value: string) => {
    let numericValue = parseFloat(value);
    if (value === '' || isNaN(numericValue)) {
        // Allow empty input for user to clear, or treat invalid as 0 for calculation
        // but store it such that the input field can be empty
        setDexPercentages(prev => ({
            ...prev,
            [dexUrl]: NaN, // Use NaN to signify empty/invalid for controlled input
        }));
        return; 
    }
    if (numericValue < 0) numericValue = 0;
    // Do not cap at 100 here to allow intermediate states where total might exceed 100
    // The warning for totalCustomPercentage will handle user feedback

    setDexPercentages(prev => ({
      ...prev,
      [dexUrl]: parseFloat(numericValue.toFixed(2)),
    }));
  }, [setDexPercentages]);

  return {
    totalCustomPercentage,
    handleAddDEX,
    handleRemoveDEX,
    handlePercentageChange,
  };
};