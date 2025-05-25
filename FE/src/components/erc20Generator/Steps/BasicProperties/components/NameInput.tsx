import React from 'react';

interface NameInputProps {
  value: string;
  onChange: (value: string) => void;
}

const NameInput: React.FC<NameInputProps> = ({ value, onChange }) => {
  return (
    <div className="mb-6">
      <label htmlFor="tokenName" className="block text-sm font-medium text-gray-700 mb-1">
        Token Name:
        <input 
          id="tokenName"
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          placeholder="e.g., MyStarkToken" 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </label>
    </div>
  );
};

export default NameInput;