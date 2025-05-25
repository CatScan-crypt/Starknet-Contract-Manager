import React from 'react';

interface FeatureToggleProps {
  id: string;
  title: string;
  description: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

const FeatureToggle: React.FC<FeatureToggleProps> = ({
  id,
  title,
  description,
  isChecked,
  onChange,
}) => {
  return (
    <div>
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <label
        htmlFor={id}
        className={`
          flex items-center p-4 border rounded-lg cursor-pointer
          transition-colors duration-200 ease-in-out
          hover:border-gray-300 hover:shadow-sm
          peer-checked:bg-indigo-50 peer-checked:border-indigo-500 peer-checked:ring-1 peer-checked:ring-indigo-500
          bg-white border-gray-200
        `}
      >
        <span className={`
          h-5 w-5 border rounded-full flex-shrink-0
          flex items-center justify-center mr-3
          transition-colors duration-200 ease-in-out
          ${isChecked ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 bg-white'}
        `}>
          {isChecked && <span className="h-2.5 w-2.5 bg-white rounded-full"></span>}
        </span>
        <div className="text-sm">
          <span className="font-medium text-gray-800">{title}</span>
          <p className="text-xs text-gray-500 mt-0.5">
            {description}
          </p>
        </div>
      </label>
    </div>
  );
};

export default FeatureToggle;