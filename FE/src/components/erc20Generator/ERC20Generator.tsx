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
        </AnimatedStepContent>
        <StepNavigation currentStep={currentStep} onNavClick={handleNavClick} />
      </div>
    </motion.div>
  );
};

export default ERC20Generator;