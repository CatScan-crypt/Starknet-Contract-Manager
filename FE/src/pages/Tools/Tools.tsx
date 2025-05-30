import React from 'react';
import ToolsForm from './components/ToolsForm';
import { motion } from 'framer-motion';
import { pageTransitionVariants } from './components/animations/toolAnimationVariants';

const Tools: React.FC = () => {
  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="container mx-auto p-4"
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Contract Tools</h1>
      <ToolsForm />
    </motion.div>
  );
};

export default Tools;