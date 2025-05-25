import React from 'react';

interface SymbolInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SymbolInput: React.FC<SymbolInputProps> = ({ value, onChange }) => {
  return (
    <div className="mb-6">
      <label htmlFor="symbol" className="block text-sm font-medium text-gray-700 mb-1">
        Symbol:
        <input 
          id="symbol"
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          placeholder="e.g., MSTK"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </label>
    </div>
  );
};

export default SymbolInput;