import React from 'react';
import { navSteps } from 'navSteps';

interface NavStepItem {
  key: string;
  label: string;
  
}

interface StepNavigationProps {
  currentStep: string;
  onNavClick: (stepKey: string) => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  handlePreviousClick: () => void;
  handleNextClick: () => void;
  
}

const StepNavigation: React.FC<StepNavigationProps> = ({ currentStep, onNavClick, canGoPrevious, canGoNext, handlePreviousClick, handleNextClick }) => {
  return (
    <nav className="md:w-64 mb-8 md:mb-0 flex-shrink-0">
      <div className="sticky top-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 px-2">Navigation</h3>
        <ul className="space-y-1">
          {navSteps.map((step: NavStepItem) => (
            <li key={step.key}>
              <button
                onClick={() => onNavClick(step.key)}
                className={`
                  w-full text-left px-3 py-2.5 rounded-md text-sm font-medium
                  transition-colors duration-150 ease-in-out
                  flex items-center space-x-3
                  ${currentStep === step.key 
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <span>{step.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center gap-8 mt-8">
            <button
              type="button"
              className={`
                font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50
                ${canGoPrevious
                  ? 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500'
                  : 'bg-gray-300 text-gray-800 cursor-not-allowed focus:ring-gray-500'
                }
              `}
              onClick={canGoPrevious ? handlePreviousClick : undefined} // Only call onClick if enabled
              disabled={!canGoPrevious} // Disable the button element if not possible
            >
              Previous
            </button>
            <button
              type="button"
              className={`
                font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50
                ${canGoNext
                  ? 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500'
                  : 'bg-gray-300 text-gray-800 cursor-not-allowed focus:ring-gray-500'
                }
              `}
              onClick={canGoNext ? handleNextClick : undefined} // Only call onClick if enabled
              disabled={!canGoNext} // Disable the button element if not possible
            >
              Next
            </button>
          </div>
    </nav>
  );
};

export default StepNavigation;