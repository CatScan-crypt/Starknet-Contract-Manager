import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StarknetKitWalletButton } from "../StarknetKit/starknetkit";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-30 bg-transparent text-black py-4 ">
        <div className="px-4 flex items-center relative min-h-[56px]">
          {/* Left: Title */}
          <button
            className="text-2xl font-bold flex-shrink-0 pl-2 z-10 bg-transparent border-none cursor-pointer focus:outline-none hover:text-sky-200 transition-colors duration-150"
            onClick={() => navigate('/')}
            type="button"
            aria-label="Go to Home"
          >
            SNCM
          </button>

          {/* Right: Wallet Button and Gear */}

          <div className="flex-shrink-0 z-10 ml-auto w-[260px] flex justify-end items-center space-x-4">
          <button
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            onClick={() => setShowSettings(true)}
            aria-label="Open Settings"
            type="button"
          >
            <img src="/gear.svg"alt="Settings" className="h-6 w-6 scale-250" />
            </button>
            <StarknetKitWalletButton />
            {/* Gear Button */}

          </div>
        </div>
      </header>

      {/* Modal */}
      {showSettings && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setShowSettings(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-8 min-w-[300px] relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowSettings(false)}
              aria-label="Close Settings"
              type="button"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            {/* Settings content goes here */}
            <p className="text-gray-600">Settings window content...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;