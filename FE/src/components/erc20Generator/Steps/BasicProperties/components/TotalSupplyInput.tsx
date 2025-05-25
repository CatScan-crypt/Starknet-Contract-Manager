import React from 'react';

interface NumericPropertyInputProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder: string;
  className?: string;
}

const NumericPropertyInput: React.FC<NumericPropertyInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  className = "mb-6", // Default margin, can be overridden for totalSupply if needed
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        <input 
          id={id}
          type="number" 
          value={value} 
          // Ensure that we pass a number or an empty string to the parent's setter
          onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))} 
          placeholder={placeholder}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </label>
    </div>
  );
};

export default NumericPropertyInput;