import React from 'react';

export interface ToggleCardProps {
  id: string;
  title: string;
  description: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  comingSoon?: boolean;
}

const ToggleCard: React.FC<ToggleCardProps> = ({ id, title, description, isChecked, onChange, comingSoon }) => {
  return (
    <div>
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={comingSoon}
        className="sr-only peer"
      />
      <label
        htmlFor={id}
        className={`
          flex items-start p-4 border rounded-lg cursor-pointer
          transition-colors duration-200 ease-in-out
          hover:border-gray-400 hover:shadow-sm
          peer-checked:bg-indigo-50 peer-checked:border-indigo-500 peer-checked:ring-1 peer-checked:ring-indigo-500
          ${comingSoon ? 'bg-gray-100 opacity-70 cursor-not-allowed' : 'bg-white border-gray-300'}
        `}
      >
        <span className={`
          h-5 w-5 border rounded-full flex-shrink-0
          flex items-center justify-center mr-4 mt-1
          transition-colors duration-200 ease-in-out
          ${isChecked && !comingSoon ? 'bg-indigo-600 border-indigo-600' : 'border-gray-400 bg-white'}
          ${comingSoon && isChecked ? 'bg-gray-400 border-gray-400' : ''}
        `}>
          {isChecked && !comingSoon && <span className="h-2.5 w-2.5 bg-white rounded-full"></span>}
        </span>
        <div className="text-sm flex-grow">
          <span className="font-medium text-gray-800">{title}</span>
          {comingSoon && <span className="ml-2 text-xs font-semibold text-orange-500 bg-orange-100 px-2 py-0.5 rounded-full">Coming Soon</span>}
          <p className="text-xs text-gray-500 mt-1">
            {description}
          </p>
        </div>
      </label>
    </div>
  );
};

export default ToggleCard;