import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MethodNavigation from './nav/MethodNavigation';
import { slideVariants } from './animations/toolAnimationVariants';
import { navMethods, type MethodKey } from './constants/toolNavMethods';

// Import all method components
import AirDropMethod from './Methods/AirDropMethod';
import ModifyAuthoritiesMethod from './Methods/ModifyAuthoritiesMethod';
import RevokeAuthoritiesMethod from './Methods/RevokeAuthoritiesMethod';
import MintTokensMethod from './Methods/MintTokensMethod';
import BurnTokensMethod from './Methods/BurnTokensMethod';
import FreezeUnfreezeAddressMethod from './Methods/FreezeUnfreezeAddressMethod';
import ChangeTaxSettingsMethod from './Methods/ChangeTaxSettingsMethod';
import WithdrawFeesMethod from './Methods/WithdrawFeesMethod';

const ToolsForm: React.FC = () => {
  const [currentMethod, setCurrentMethod] = useState<MethodKey>(navMethods[0].key);
  const [animationDirection, setAnimationDirection] = useState(0);

  const handleMethodSelect = (methodKey: MethodKey) => {
    const currentIndex = navMethods.findIndex(method => method.key === currentMethod);
    const newIndex = navMethods.findIndex(method => method.key === methodKey);

    setAnimationDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentMethod(methodKey);
  };

  const renderMethodContent = () => {
    switch (currentMethod) {
      case 'airdrop':
        return <AirDropMethod />;
      case 'modifyAuthorities':
        return <ModifyAuthoritiesMethod />;
      case 'revokeAuthorities':
        return <RevokeAuthoritiesMethod />;
      case 'mintTokens':
        return <MintTokensMethod />;
      case 'burnTokens':
        return <BurnTokensMethod />;
      case 'freezeUnfreeze':
        return <FreezeUnfreezeAddressMethod />;
      case 'changeTax':
        return <ChangeTaxSettingsMethod />;
      case 'withdrawFees':
        return <WithdrawFeesMethod />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="flex flex-col md:flex-row md:space-x-8">
        <MethodNavigation 
          currentMethod={currentMethod} 
          onNavClick={handleMethodSelect} 
        />
        <div className="w-full md:w-3/4">
          <motion.div
            key={currentMethod}
            custom={animationDirection}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-white shadow-xl rounded-lg p-6"
          >
            {renderMethodContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ToolsForm;