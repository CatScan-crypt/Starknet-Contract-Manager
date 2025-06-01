import React from 'react';
import ConfiguredProtectionStep from 'ConfiguredProtectionStep';
import ConfiguredRatesStep from 'ConfiguredRatesStep';
import ConfiguredSummaryStep from 'ConfiguredSummaryStep';
import { useERC20FormContext } from './context/ERC20FormContext';
import { navSteps } from 'navSteps';
import ConfiguredBasicPropertiesStep from 'ConfiguredBasicPropertiesStep'; 
import StepNavigation from 'StepNavigation';
import AnimatedStepContent from 'AnimatedStepContent';
import { motion } from 'framer-motion';
import { slideVariants, pageTransitionVariants } from 'animationVariants'; // Adjusted import path

interface ERC20GeneratorProps {}

const ERC20Generator: React.FC<ERC20GeneratorProps> = () => {
  const {
  } = useERC20FormContext();

  const [currentStep, setCurrentStep] = React.useState('basic');
  const currentIndex = navSteps.findIndex(step => step.key === currentStep);

const canGoPrevious = currentIndex > 0;
const canGoNext = currentIndex < navSteps.length - 1;
  const [animationDirection, setAnimationDirection] = React.useState(0); // 0: no direction, 1: down, -1: up

  const handleNavClick = (stepKey: string) => {
    const currentIndex = navSteps.findIndex(step => step.key === currentStep);
    const newIndex = navSteps.findIndex(step => step.key === stepKey);
    
    if (newIndex > currentIndex) {
      setAnimationDirection(1); // Sliding Down
    } else if (newIndex < currentIndex) {
      setAnimationDirection(-1); // Sliding Up
    } else {
      setAnimationDirection(0); // No change or same step
    }
    setCurrentStep(stepKey);
  };

  const handleNextClick = () => {
    const currentIndex = navSteps.findIndex(step => step.key === currentStep);
    if (currentIndex < navSteps.length - 1) {
      handleNavClick(navSteps[currentIndex + 1].key);
    }
  };

  const handlePreviousClick = () => {
    const currentIndex = navSteps.findIndex(step => step.key === currentStep);
    if (currentIndex > 0) {
      handleNavClick(navSteps[currentIndex - 1].key);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'basic':
        return (
          <ConfiguredBasicPropertiesStep />
        );
      case 'protection':
        return (
          <ConfiguredProtectionStep />
        );
      case 'rates':
        return (
          <ConfiguredRatesStep />
        );
      case 'summary':
        return (
          <ConfiguredSummaryStep />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mr-20 w-full"
    >
      <div className="flex flex-col md:flex-row md:space-x-8">
        <AnimatedStepContent
          currentStepKey={currentStep}
          animationDirection={animationDirection}
          slideVariants={slideVariants}
        >
          {renderStepContent()}
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
        </AnimatedStepContent>
        <StepNavigation currentStep={currentStep} onNavClick={handleNavClick} canGoPrevious={canGoPrevious} canGoNext={canGoNext} handlePreviousClick={handlePreviousClick} handleNextClick={handleNextClick} />
      </div>
    </motion.div>
    
  );
};

export default ERC20Generator;