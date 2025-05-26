import React from 'react';
import { navSteps } from 'navSteps';

interface NavStepItem {
  key: string;
  label: string;
}

interface StepNavigationProps {
  currentStep: string;
  onNavClick: (stepKey: string) => void;
}

const StepNavigation: React.FC<StepNavigationProps> = ({ currentStep, onNavClick }) => {
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
    </nav>
  );
};

export default StepNavigation;