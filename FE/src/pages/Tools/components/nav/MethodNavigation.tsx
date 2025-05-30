
import React from 'react';
import { navMethods, type MethodKey } from '../constants/toolNavMethods';

interface MethodNavigationProps {
  currentMethod: MethodKey;
  onNavClick: (methodKey: MethodKey) => void;
}

const MethodNavigation: React.FC<MethodNavigationProps> = ({ currentMethod, onNavClick }) => {
  return (
    <nav className="md:w-64 mb-8 md:mb-0 flex-shrink-0">
      <div className="sticky top-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 px-2">Tools</h3>
        <ul className="space-y-1">
          {navMethods.map((method) => (
            <li key={method.key}>
              <button
                onClick={() => onNavClick(method.key)}
                className={`
                  w-full text-left px-3 py-2.5 rounded-md text-sm font-medium
                  transition-colors duration-150 ease-in-out
                  flex items-center space-x-3
                  ${currentMethod === method.key 
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <span>{method.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default MethodNavigation;