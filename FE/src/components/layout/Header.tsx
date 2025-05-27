import React from 'react';
import { StarknetKitWalletButton } from "../starknetkit";

const Header: React.FC = () => {
  return (
    <header className="bg-sky-600 text-white py-4 mb-5">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left: Title */}
        <div className="text-2xl font-bold flex-shrink-0">
          StarkNet Contract Manager
        </div>
        {/* Center: Nav */}
        <nav className="flex space-x-6 text-lg">
          {['Wizards', 'Tools', 'Deployments', 'Guides'].map((item) => (
            <button
              key={item}
              className="hover:text-sky-200 transition-colors duration-150 focus:outline-none"
              onClick={() => { /* TODO: Implement navigation */ }}
              type="button"
            >
              {item}
            </button>
          ))}
        </nav>
        {/* Right: Connect Wallet */}
        <div>
          {/* Wallet Connect Button */}
          {/* Adjust the import path if needed */}
          <StarknetKitWalletButton />
        </div>
      </div>
    </header>
  );
};

export default Header;