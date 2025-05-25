import React, { useState, useEffect, useCallback } from 'react';

interface PercentageInputProps {
  value: number | undefined; // Current numeric value, undefined for empty/initial
  onValueChange: (value: number | undefined) => void; // Called when value is committed (blur, enter, spinner click)
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  widthClass?: string; // e.g. "w-8", "w-10", "w-12"
  id?: string;
  ariaLabel?: string;
}

const PercentageInput: React.FC<PercentageInputProps> = ({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 0.01,
  placeholder = "0.00",
  widthClass = "w-10", // Default width
  id,
  ariaLabel = "Percentage input",
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    // Update internal input string when the external value prop changes
    setInputValue(value === undefined || isNaN(value) ? '' : value.toString());
  }, [value]);

  const commitValue = useCallback((valStr: string) => {
    let numVal = parseFloat(valStr);

    if (valStr.trim() === '' || isNaN(numVal)) {
      onValueChange(undefined); // Notify parent of undefined/empty
      // setInputValue(''); // Let useEffect handle this based on prop 'value'
      return;
    }

    // Apply min/max constraints
    if (min !== undefined && numVal < min) numVal = min;
    if (max !== undefined && numVal > max) numVal = max;
    
    // Format to a fixed number of decimal places based on step
    const decimals = step.toString().split('.')[1]?.length || 2;
    const formattedVal = parseFloat(numVal.toFixed(decimals));

    onValueChange(formattedVal); // Notify parent of the committed, validated value
    // The useEffect will update inputValue if the parent's 'value' prop changes as a result
  }, [min, max, step, onValueChange]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Allow user to type freely, validation on blur/commit
  };

  const handleBlur = () => {
    commitValue(inputValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      commitValue(inputValue);
      event.currentTarget.blur();
    }
  };

  const handleIncrement = () => {
    // Use the prop 'value' as the source of truth for incrementing, or 0 if undefined/NaN
    const currentNumericValue = (value === undefined || isNaN(value)) ? 0 : value;
    let newValue = parseFloat((currentNumericValue + step).toFixed(step.toString().split('.')[1]?.length || 2));
    
    if (max !== undefined && newValue > max) newValue = max;
    if (min !== undefined && newValue < min) newValue = min; // Check min again, e.g. if current was < min
    
    commitValue(newValue.toString());
  };

  const handleDecrement = () => {
    const currentNumericValue = (value === undefined || isNaN(value)) ? 0 : value;
    let newValue = parseFloat((currentNumericValue - step).toFixed(step.toString().split('.')[1]?.length || 2));

    if (min !== undefined && newValue < min) newValue = min;
    if (max !== undefined && newValue > max) newValue = max; // Check max again
    
    commitValue(newValue.toString());
  };

  return (
    <div className={`group flex items-center rounded-md focus-within:ring-2 focus-within:ring-indigo-400`}>
      <input
        id={id}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={`${widthClass} pl-2 text-xs text-gray-700 bg-gray-50 border-t border-b border-l border-gray-300 group-focus-within:border-t-indigo-400 group-focus-within:border-b-indigo-400 group-focus-within:border-l-indigo-400 rounded-l-md focus:outline-none h-[30px] box-border`}
      />
      <span className="px-2 text-xs text-gray-700 bg-gray-100 border-t border-b border-gray-300 group-focus-within:border-t-indigo-400 group-focus-within:border-b-indigo-400 flex items-center h-[30px] box-border">
        %
      </span>
      <div className="flex flex-col h-[30px] box-border"> 
        <button 
          onClick={handleIncrement}
          type="button" // Important for forms
          className="px-1 border-t border-r border-gray-300 group-focus-within:border-t-indigo-400 group-focus-within:border-r-indigo-400 rounded-tr-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200 flex items-center justify-center h-1/2 box-border text-gray-600"
          aria-label={`Increment ${ariaLabel}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" /></svg>
        </button>
        <button 
          onClick={handleDecrement}
          type="button" // Important for forms
          className="px-1 border-b border-r border-gray-300 group-focus-within:border-b-indigo-400 group-focus-within:border-r-indigo-400 rounded-br-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200 flex items-center justify-center h-1/2 box-border text-gray-600"
          aria-label={`Decrement ${ariaLabel}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
        </button>
      </div>
    </div>
  );
};

export default PercentageInput;