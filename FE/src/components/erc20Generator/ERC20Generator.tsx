import React from 'react';
import ConfiguredProtectionStep from './Configs/ConfiguredProtectionStep.tsx';
import ConfiguredRatesStep from './Configs/ConfiguredRatesStep.tsx';
import ConfiguredSummaryStep from './Configs/ConfiguredSummaryStep.tsx';
import { useERC20Form } from './hooks/useERC20Form.ts';
import { navSteps } from './constants/erc20Generator.constants.ts';
import ConfiguredBasicPropertiesStep from './Configs/ConfiguredBasicPropertiesStep.tsx'; 
import StepNavigation from './nav/StepNavigation.tsx';
import AnimatedStepContent from './animation/AnimatedStepContent.tsx';
import { slideVariants } from './animation/animationVariants.tsx';

interface ERC20GeneratorProps {}

const ERC20Generator: React.FC<ERC20GeneratorProps> = () => {
  const {
  } = useERC20Form();

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:space-x-8">
        <StepNavigation currentStep={currentStep} onNavClick={handleNavClick} />
        <AnimatedStepContent
          currentStepKey={currentStep}
          animationDirection={animationDirection}
          slideVariants={slideVariants}
        >
          {renderStepContent()}
        </AnimatedStepContent>
      </div>
    </div>
  );
};

export default ERC20Generator;