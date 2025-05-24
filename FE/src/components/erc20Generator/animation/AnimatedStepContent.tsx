import React from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface AnimatedStepContentProps {
  currentStepKey: string;
  animationDirection: number;
  slideVariants: Variants;
  children: React.ReactNode;
}

const AnimatedStepContent: React.FC<AnimatedStepContentProps> = ({
  currentStepKey,
  animationDirection,
  slideVariants,
  children,
}) => {
  return (
    <div className="flex-grow relative overflow-hidden md:px-4 lg:px-6">
      <AnimatePresence initial={false} custom={animationDirection} mode="wait">
        <motion.div
          key={currentStepKey}
          custom={animationDirection}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full"
        >
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 text-center mb-6 md:mb-8 pb-4 border-b border-gray-200">
              ERC20 Token Generator (StarkNet)
            </h2>
            <div className="min-h-[300px]">
              {children}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedStepContent;